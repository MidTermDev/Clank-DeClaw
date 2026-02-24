// Initialize MPL-404 escrow linking DeClaw collection → CLAW token
// Users swap 1M CLAW ↔ 1 NFT bidirectionally

import { publicKey } from "@metaplex-foundation/umi";
import { initEscrowV1 } from "@metaplex-foundation/mpl-hybrid";
import { string, publicKey as publicKeySerializer } from "@metaplex-foundation/umi/serializers";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import {
  getUmi,
  CLAW_TOKEN_MINT,
  CLAW_AMOUNT,
  COLLECTION_NAME,
  TOTAL_SUPPLY,
} from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");
const ESCROW_FILE = join(process.cwd(), "output", "escrow-address.txt");

function findEscrowPda(umi: any, collectionPubkey: any) {
  const MPL_HYBRID_PROGRAM_ID = publicKey(
    "MPL4o4wMzndgh8T1NVDxELQCj5UQfYTYEkabX3wNKtb"
  );
  return umi.eddsa.findPda(MPL_HYBRID_PROGRAM_ID, [
    string({ size: "variable" }).serialize("escrow"),
    publicKeySerializer().serialize(collectionPubkey),
  ]);
}

async function main() {
  const umi = getUmi();

  if (!existsSync(COLLECTION_FILE)) {
    console.error("Collection not found. Run `npm run create-collection` first.");
    process.exit(1);
  }

  const collectionAddress = publicKey(
    readFileSync(COLLECTION_FILE, "utf-8").trim()
  );
  const tokenMint = publicKey(CLAW_TOKEN_MINT);

  // Get base URI
  let baseUri = "https://github.com/MidTermDev/Clank-DeClaw";
  if (existsSync(BASE_URI_FILE)) {
    baseUri = readFileSync(BASE_URI_FILE, "utf-8").trim();
  }

  // Derive escrow PDA
  const escrowPda = findEscrowPda(umi, collectionAddress);

  console.log("Initializing MPL-404 escrow...");
  console.log(`  Collection: ${collectionAddress}`);
  console.log(`  Token: ${CLAW_TOKEN_MINT}`);
  console.log(`  Amount per NFT: ${CLAW_AMOUNT} (1M CLAW with decimals)`);
  console.log(`  Escrow PDA: ${escrowPda[0]}`);

  const tx = initEscrowV1(umi, {
    escrow: escrowPda,
    collection: collectionAddress,
    token: tokenMint,
    feeLocation: umi.identity.publicKey,
    name: COLLECTION_NAME,
    uri: baseUri,
    max: TOTAL_SUPPLY - 1, // 999
    min: 0,
    amount: CLAW_AMOUNT,
    feeAmount: 0,
    solFeeAmount: 0,
    path: 1, // No metadata rerolling — static NFTs
  });

  const result = await tx.sendAndConfirm(umi);

  const escrowAddress = escrowPda[0].toString();
  writeFileSync(ESCROW_FILE, escrowAddress);

  console.log(`\nEscrow initialized!`);
  console.log(`  Address: ${escrowAddress}`);
  console.log(`  Saved to: ${ESCROW_FILE}`);
  console.log(`\nNext: Run \`npm run fund-escrow\` to transfer NFTs to the escrow.`);
}

main().catch(console.error);
