// End-to-end verification of the DeClaw NFT collection
// Checks collection, escrow state, sample assets, and metadata

import { publicKey } from "@metaplex-foundation/umi";
import {
  fetchCollectionV1,
  fetchAsset,
} from "@metaplex-foundation/mpl-core";
import { fetchEscrowV1 } from "@metaplex-foundation/mpl-hybrid";
import {
  string,
  publicKey as publicKeySerializer,
} from "@metaplex-foundation/umi/serializers";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi, CLAW_TOKEN_MINT, TOTAL_SUPPLY, CLAW_AMOUNT } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const ESCROW_FILE = join(process.cwd(), "output", "escrow-address.txt");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");
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

async function main() {
  const umi = getUmi();
  let passed = 0;
  let failed = 0;

  function check(label: string, ok: boolean, detail?: string) {
    if (ok) {
      console.log(`  PASS: ${label}${detail ? ` (${detail})` : ""}`);
      passed++;
    } else {
      console.log(`  FAIL: ${label}${detail ? ` (${detail})` : ""}`);
      failed++;
    }
  }

  // 1. Collection
  console.log("\n--- Collection ---");
  if (!existsSync(COLLECTION_FILE)) {
    console.log("  SKIP: No collection-address.txt found");
  } else {
    const collectionAddress = publicKey(
      readFileSync(COLLECTION_FILE, "utf-8").trim()
    );
    console.log(`  Address: ${collectionAddress}`);

    try {
      const collection = await fetchCollectionV1(umi, collectionAddress);
      check("Collection exists on-chain", true);
      check("Collection name", collection.name === "DeClaw", collection.name);
      console.log(`  URI: ${collection.uri}`);
      console.log(`  Num minted: ${collection.numMinted}`);
      check("Num minted >= 1000", Number(collection.numMinted) >= TOTAL_SUPPLY, String(collection.numMinted));
    } catch (e: any) {
      console.log(`  FAIL: Could not fetch collection: ${e.message}`);
      failed++;
    }
  }

  // 2. Sample assets — check first, middle, last
  console.log("\n--- Sample Assets ---");
  if (existsSync(ASSETS_FILE)) {
    const assets: { id: number; address: string }[] = JSON.parse(
      readFileSync(ASSETS_FILE, "utf-8")
    );
    check("Asset list has 1000 entries", assets.length === TOTAL_SUPPLY, String(assets.length));

    const escrowAddress = existsSync(ESCROW_FILE)
      ? readFileSync(ESCROW_FILE, "utf-8").trim()
      : null;

    for (const idx of [0, 499, 999]) {
      const asset = assets[idx];
      if (!asset) continue;
      try {
        const onChain = await fetchAsset(umi, publicKey(asset.address));
        check(`Asset #${idx} exists on-chain`, true);
        check(`Asset #${idx} name`, onChain.name === `DeClaw #${idx}`, onChain.name);
        if (escrowAddress) {
          check(
            `Asset #${idx} owned by escrow`,
            onChain.owner.toString() === escrowAddress,
            onChain.owner.toString().slice(0, 12) + "..."
          );
        }
      } catch (e: any) {
        check(`Asset #${idx} fetchable`, false, e.message);
      }
    }
  } else {
    console.log("  SKIP: No minted-assets.json found");
  }

  // 3. Escrow
  console.log("\n--- Escrow ---");
  if (!existsSync(COLLECTION_FILE)) {
    console.log("  SKIP: No collection");
  } else {
    const collectionAddress = publicKey(
      readFileSync(COLLECTION_FILE, "utf-8").trim()
    );
    const escrowPda = findEscrowPda(umi, collectionAddress);
    console.log(`  PDA: ${escrowPda[0]}`);

    try {
      const escrow = await fetchEscrowV1(umi, escrowPda);
      check("Escrow exists on-chain", true);
      check("Escrow collection matches",
        escrow.collection.toString() === collectionAddress.toString());
      check("Escrow token is CLAW",
        escrow.token.toString() === CLAW_TOKEN_MINT);
      check("Swap amount correct (1M CLAW)",
        escrow.amount === CLAW_AMOUNT,
        `${escrow.amount}`);
      check("Min = 0", escrow.min === BigInt(0));
      check("Max = 999", escrow.max === BigInt(TOTAL_SUPPLY - 1));
      check("Path = 1 (static)", escrow.path === 1);
      check("Fee = 0", escrow.feeAmount === BigInt(0));
      check("SOL fee = 0", escrow.solFeeAmount === BigInt(0));
      console.log(`  Count: ${escrow.count}`);
    } catch {
      console.log("  Escrow not initialized yet");
      failed++;
    }
  }

  // 4. Metadata
  console.log("\n--- Metadata ---");
  if (!existsSync(BASE_URI_FILE)) {
    console.log("  SKIP: No base-uri.txt found");
  } else {
    const baseUri = readFileSync(BASE_URI_FILE, "utf-8").trim();
    console.log(`  Base URI: ${baseUri}`);

    for (const id of [0, 999]) {
      const url = `${baseUri}${id}.json`;
      try {
        const res = await fetch(url);
        check(`Metadata ${id} accessible`, res.ok, `${res.status}`);
        if (res.ok) {
          const json = await res.json();
          check(`Metadata ${id} has name`,
            json.name === `DeClaw #${id}`, json.name);
          check(`Metadata ${id} has 8 attributes`,
            Array.isArray(json.attributes) && json.attributes.length === 8,
            `${json.attributes?.length} traits`);
        }
      } catch {
        check(`Metadata ${id} accessible`, false, "fetch failed");
      }
    }
  }

  // Summary
  console.log("\n--- Summary ---");
  console.log(`  Passed: ${passed}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Result: ${failed === 0 ? "ALL CHECKS PASSED" : "SOME CHECKS FAILED"}`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(console.error);
