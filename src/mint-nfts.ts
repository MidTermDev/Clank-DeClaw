// Batch mint 1,000 NFTs into the DeClaw collection
// Sends multiple transactions concurrently for speed
// Resume support via progress file

import {
  generateSigner,
  publicKey,
} from "@metaplex-foundation/umi";
import { create, fetchCollectionV1 } from "@metaplex-foundation/mpl-core";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi, COLLECTION_NAME, TOTAL_SUPPLY } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");
const PROGRESS_FILE = join(process.cwd(), "output", "mint-progress.json");
const ASSETS_FILE = join(process.cwd(), "output", "minted-assets.json");
const CONCURRENCY = 15; // Send 15 txs at once

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
  return new Promise((r) => setTimeout(r, ms));
}

async function mintOne(
  umi: any,
  collection: any,
  baseUri: string,
  id: number
): Promise<{ id: number; address: string }> {
  const assetSigner = generateSigner(umi);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      await create(umi, {
        asset: assetSigner,
        name: `${COLLECTION_NAME} #${id}`,
        uri: `${baseUri}${id}.json`,
        collection,
      }).sendAndConfirm(umi);

      return { id, address: assetSigner.publicKey.toString() };
    } catch (err: any) {
      if (attempt === 5) {
        throw new Error(`Failed #${id}: ${err.message || err}`);
      }
      await sleep(attempt * 2000);
    }
  }
  throw new Error(`Unreachable`);
}

async function main() {
  const umi = getUmi();

  if (!existsSync(COLLECTION_FILE)) {
    console.error("Collection not found. Run `npm run create-collection` first.");
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
  console.log(`Concurrency: ${CONCURRENCY}`);

  const collection = await fetchCollectionV1(umi, collectionAddress);
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
  const t0 = Date.now();

  for (let i = startFrom; i < TOTAL_SUPPLY; i += CONCURRENCY) {
    const batchEnd = Math.min(i + CONCURRENCY, TOTAL_SUPPLY);
    const indices = [];
    for (let j = i; j < batchEnd; j++) indices.push(j);

    // Send all in parallel
    const results = await Promise.allSettled(
      indices.map((id) => mintOne(umi, collection, baseUri, id))
    );

    // Process results
    let batchFailed = false;
    for (const [idx, result] of results.entries()) {
      if (result.status === "fulfilled") {
        progress.assets.push(result.value);
      } else {
        console.error(`  ${result.reason}`);
        batchFailed = true;
      }
    }

    // Update lastMinted to highest successful mint in this batch
    const successIds = results
      .filter((r): r is PromiseFulfilledResult<{ id: number; address: string }> =>
        r.status === "fulfilled"
      )
      .map((r) => r.value.id);

    if (successIds.length > 0) {
      // Sort assets by id for consistent ordering
      progress.assets.sort((a, b) => a.id - b.id);
      progress.lastMinted = progress.assets[progress.assets.length - 1].id;
    }

    saveProgress(progress);

    const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
    const minted = progress.assets.length;
    const rate = (minted - startFrom) / ((Date.now() - t0) / 1000);
    const remaining = TOTAL_SUPPLY - minted;
    const eta = remaining > 0 && rate > 0 ? (remaining / rate / 60).toFixed(1) : "?";
    console.log(`  ${minted}/${TOTAL_SUPPLY} minted (${elapsed}s, ${rate.toFixed(1)}/s, ETA: ${eta}min)`);

    if (batchFailed) {
      console.log("Some mints failed. Re-run to fill gaps.");
      // Don't exit — continue with next batch
    }
  }

  // Handle any gaps from failed mints
  const mintedIds = new Set(progress.assets.map((a) => a.id));
  const gaps = [];
  for (let i = 0; i < TOTAL_SUPPLY; i++) {
    if (!mintedIds.has(i)) gaps.push(i);
  }

  if (gaps.length > 0) {
    console.log(`\nFilling ${gaps.length} gaps: ${gaps.slice(0, 10).join(", ")}${gaps.length > 10 ? "..." : ""}`);
    for (let i = 0; i < gaps.length; i += CONCURRENCY) {
      const batch = gaps.slice(i, i + CONCURRENCY);
      const results = await Promise.allSettled(
        batch.map((id) => mintOne(umi, collection, baseUri, id))
      );
      for (const result of results) {
        if (result.status === "fulfilled") {
          progress.assets.push(result.value);
        } else {
          console.error(`  ${result.reason}`);
        }
      }
      progress.assets.sort((a, b) => a.id - b.id);
      if (progress.assets.length > 0) {
        progress.lastMinted = progress.assets[progress.assets.length - 1].id;
      }
      saveProgress(progress);
    }
  }

  saveProgress(progress);
  writeFileSync(ASSETS_FILE, JSON.stringify(progress.assets, null, 2));
  const totalTime = ((Date.now() - t0) / 1000 / 60).toFixed(1);
  console.log(`\nDone! ${progress.assets.length} NFTs minted in ${totalTime} minutes`);
  console.log(`Asset list saved to ${ASSETS_FILE}`);
}

main().catch(console.error);
