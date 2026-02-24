// Create the DeClaw Metaplex Core collection on Solana mainnet
// Saves collection address to output/collection-address.txt

import { generateSigner, publicKey } from "@metaplex-foundation/umi";
import { createCollection, ruleSet } from "@metaplex-foundation/mpl-core";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import {
  getUmi,
  COLLECTION_NAME,
  ROYALTY_BASIS_POINTS,
} from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");

async function main() {
  const umi = getUmi();

  // Check if collection already exists
  if (existsSync(COLLECTION_FILE)) {
    const existing = readFileSync(COLLECTION_FILE, "utf-8").trim();
    console.log(`Collection already created: ${existing}`);
    console.log("Delete output/collection-address.txt to recreate.");
    return;
  }

  // Get base URI for collection metadata
  let collectionUri = "https://github.com/MidTermDev/Clank-DeClaw";
  if (existsSync(BASE_URI_FILE)) {
    const baseUri = readFileSync(BASE_URI_FILE, "utf-8").trim();
    collectionUri = `${baseUri}collection.json`;
  }

  console.log("Creating DeClaw collection...");

  const collectionSigner = generateSigner(umi);

  const tx = createCollection(umi, {
    collection: collectionSigner,
    name: COLLECTION_NAME,
    uri: collectionUri,
    plugins: [
      {
        type: "Royalties",
        basisPoints: ROYALTY_BASIS_POINTS,
        creators: [
          {
            address: umi.identity.publicKey,
            percentage: 100,
          },
        ],
        ruleSet: ruleSet("None"),
      },
    ],
  });

  const result = await tx.sendAndConfirm(umi);

  const collectionAddress = collectionSigner.publicKey.toString();
  writeFileSync(COLLECTION_FILE, collectionAddress);

  console.log(`Collection created!`);
  console.log(`  Address: ${collectionAddress}`);
  console.log(`  Royalties: ${ROYALTY_BASIS_POINTS / 100}%`);
  console.log(`  Saved to: ${COLLECTION_FILE}`);
}

main().catch(console.error);
