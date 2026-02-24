// Batch mint 1,000 NFTs into the DeClaw collection
// Mints in groups of 5 with resume support via progress file

import {
  generateSigner,
  publicKey,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { create, fetchCollectionV1 } from "@metaplex-foundation/mpl-core";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi, COLLECTION_NAME, TOTAL_SUPPLY } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");
const PROGRESS_FILE = join(process.cwd(), "output", "mint-progress.json");
const ASSETS_FILE = join(process.cwd(), "output", "minted-assets.json");
const BATCH_SIZE = 5;

interface MintProgress {
  lastMinted: number;
  assets: { id: number; address: string }[];
}

function loadProgress(): MintProgress {
  if (existsSync(PROGRESS_FILE)) {
    return JSON.parse(readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return { lastMinted: -1, assets: [] };
}

function saveProgress(progress: MintProgress) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const umi = getUmi();

  if (!existsSync(COLLECTION_FILE)) {
    console.error(
      "Collection not found. Run `npm run create-collection` first."
    );
    process.exit(1);
  }

  if (!existsSync(BASE_URI_FILE)) {
    console.error("Base URI not found. Run `npm run upload-metadata` first.");
    process.exit(1);
  }

  const collectionAddress = publicKey(
    readFileSync(COLLECTION_FILE, "utf-8").trim()
  );
  const baseUri = readFileSync(BASE_URI_FILE, "utf-8").trim();

  console.log(`Collection: ${collectionAddress}`);
  console.log(`Base URI: ${baseUri}`);

  // Fetch collection to pass to create()
  const collection = await fetchCollectionV1(umi, collectionAddress);

  // Load progress for resume support
  const progress = loadProgress();
  const startFrom = progress.lastMinted + 1;

  if (startFrom >= TOTAL_SUPPLY) {
    console.log(`All ${TOTAL_SUPPLY} NFTs already minted!`);
    writeFileSync(ASSETS_FILE, JSON.stringify(progress.assets, null, 2));
    return;
  }

  if (startFrom > 0) {
    console.log(`Resuming from NFT #${startFrom} (${startFrom} already minted)`);
  }

  console.log(`Minting NFTs ${startFrom} to ${TOTAL_SUPPLY - 1}...`);

  for (let i = startFrom; i < TOTAL_SUPPLY; i += BATCH_SIZE) {
    const batchEnd = Math.min(i + BATCH_SIZE, TOTAL_SUPPLY);
    const batchAssets: { id: number; address: string }[] = [];

    // Build batch transaction
    let builder = transactionBuilder();

    for (let j = i; j < batchEnd; j++) {
      const assetSigner = generateSigner(umi);
      batchAssets.push({ id: j, address: assetSigner.publicKey.toString() });

      builder = builder.add(
        create(umi, {
          asset: assetSigner,
          name: `${COLLECTION_NAME} #${j}`,
          uri: `${baseUri}${j}.json`,
          collection,
        })
      );
    }

    // Send batch with retry
    let retries = 3;
    while (retries > 0) {
      try {
        await builder.sendAndConfirm(umi);
        break;
      } catch (err: any) {
        retries--;
        if (retries === 0) {
          console.error(`Failed to mint batch ${i}-${batchEnd - 1}:`, err.message || err);
          console.log("Progress saved. Re-run to resume.");
          saveProgress(progress);
          process.exit(1);
        }
        console.warn(`Retry (${3 - retries}/3) for batch ${i}-${batchEnd - 1}...`);
        await sleep(2000);
      }
    }

    // Update progress
    progress.assets.push(...batchAssets);
    progress.lastMinted = batchEnd - 1;
    saveProgress(progress);

    if ((batchEnd) % 50 === 0 || batchEnd === TOTAL_SUPPLY) {
      console.log(`  ${batchEnd}/${TOTAL_SUPPLY} minted`);
    }

    // Small delay between batches to avoid rate limiting
    if (batchEnd < TOTAL_SUPPLY) {
      await sleep(500);
    }
  }

  // Save final asset list
  writeFileSync(ASSETS_FILE, JSON.stringify(progress.assets, null, 2));
  console.log(`\nDone! ${TOTAL_SUPPLY} NFTs minted.`);
  console.log(`Asset list saved to ${ASSETS_FILE}`);
}

main().catch(console.error);
