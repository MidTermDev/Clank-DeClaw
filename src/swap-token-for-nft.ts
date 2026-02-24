// Swap 1M CLAW tokens for a DeClaw NFT via the MPL-404 escrow
// captureV1 = user pays tokens, captures NFT from escrow

import { publicKey } from "@metaplex-foundation/umi";
import { captureV1, fetchEscrowV1 } from "@metaplex-foundation/mpl-hybrid";
import { fetchAsset } from "@metaplex-foundation/mpl-core";
import {
  string,
  publicKey as publicKeySerializer,
} from "@metaplex-foundation/umi/serializers";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi, CLAW_TOKEN_MINT } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const ESCROW_FILE = join(process.cwd(), "output", "escrow-address.txt");
const ASSETS_FILE = join(process.cwd(), "output", "minted-assets.json");

function findEscrowPda(umi: any, collectionPubkey: any) {
  const MPL_HYBRID_PROGRAM_ID = publicKey(
    "MPL4o4wMzndgh8T1NVDxELQCj5UQfYTYEkabX3wNKtb"
  );
  return umi.eddsa.findPda(MPL_HYBRID_PROGRAM_ID, [
    string({ size: "variable" }).serialize("escrow"),
    publicKeySerializer().serialize(collectionPubkey),
  ]);
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const umi = getUmi();

  if (!existsSync(COLLECTION_FILE) || !existsSync(ESCROW_FILE) || !existsSync(ASSETS_FILE)) {
    console.error("Missing required files. Ensure collection, escrow, and assets exist.");
    process.exit(1);
  }

  const collectionAddress = publicKey(readFileSync(COLLECTION_FILE, "utf-8").trim());
  const escrowAddress = publicKey(readFileSync(ESCROW_FILE, "utf-8").trim());
  const tokenMint = publicKey(CLAW_TOKEN_MINT);
  const mintedAssets: { id: number; address: string }[] = JSON.parse(
    readFileSync(ASSETS_FILE, "utf-8")
  );

  // Fetch escrow to get feeLocation and verify state
  const escrowPda = findEscrowPda(umi, collectionAddress);
  const escrow = await fetchEscrowV1(umi, escrowPda);

  console.log("\n--- Swap: 1M CLAW → NFT (captureV1) ---");
  console.log(`  Collection: ${collectionAddress}`);
  console.log(`  Escrow PDA: ${escrowPda[0]}`);
  console.log(`  Token: ${CLAW_TOKEN_MINT}`);
  console.log(`  Fee location: ${escrow.feeLocation}`);
  console.log(`  Escrow count: ${escrow.count}`);
  console.log(`  Swap amount: ${escrow.amount}`);

  // Pick a random asset from the list
  const randomIdx = Math.floor(Math.random() * mintedAssets.length);
  const chosenAsset = mintedAssets[randomIdx];
  console.log(`\n  Selected asset #${chosenAsset.id}: ${chosenAsset.address}`);

  // Verify asset is in escrow
  const assetOnChain = await fetchAsset(umi, publicKey(chosenAsset.address));
  console.log(`  Current owner: ${assetOnChain.owner}`);
  if (assetOnChain.owner.toString() !== escrowAddress.toString()) {
    console.error(`  Asset #${chosenAsset.id} is not owned by escrow. Trying another...`);
    // Find one that IS in escrow
    for (const asset of mintedAssets) {
      const a = await fetchAsset(umi, publicKey(asset.address));
      if (a.owner.toString() === escrowAddress.toString()) {
        console.log(`  Found asset #${asset.id} in escrow: ${asset.address}`);
        chosenAsset.id = asset.id;
        chosenAsset.address = asset.address;
        break;
      }
    }
  }
  console.log(`  Proceeding with asset #${chosenAsset.id}: ${chosenAsset.address}`);

  // Execute captureV1 (user pays tokens, receives NFT from escrow)
  const tx = captureV1(umi, {
    owner: umi.identity,
    escrow: escrowPda,
    asset: publicKey(chosenAsset.address),
    collection: collectionAddress,
    token: tokenMint,
    feeProjectAccount: escrow.feeLocation,
  });

  console.log(`  Sending transaction...`);
  const result = await tx.sendAndConfirm(umi);

  console.log(`\n  Swap transaction confirmed!`);
  console.log(`  Signature: ${Buffer.from(result.signature).toString("base64").slice(0, 44)}...`);

  // Wait a moment then verify ownership
  await sleep(3000);
  const updated = await fetchAsset(umi, publicKey(chosenAsset.address));
  console.log(`\n  --- Verification ---`);
  console.log(`  Asset: DeClaw #${chosenAsset.id}`);
  console.log(`  New owner:  ${updated.owner}`);
  console.log(`  Our wallet: ${umi.identity.publicKey}`);
  console.log(`  Owned by us: ${updated.owner.toString() === umi.identity.publicKey.toString()}`);
}

main().catch(console.error);
