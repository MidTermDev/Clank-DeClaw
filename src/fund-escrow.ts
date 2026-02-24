// Transfer all 1,000 NFTs to the MPL-404 escrow PDA
// Uses the minted-assets.json list instead of on-chain scan

import { publicKey } from "@metaplex-foundation/umi";
import {
  transfer,
  fetchCollectionV1,
  fetchAsset,
} from "@metaplex-foundation/mpl-core";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const ESCROW_FILE = join(process.cwd(), "output", "escrow-address.txt");
const ASSETS_FILE = join(process.cwd(), "output", "minted-assets.json");
const FUND_PROGRESS_FILE = join(process.cwd(), "output", "fund-progress.json");
const CONCURRENCY = 15;

interface FundProgress {
  transferred: number;
  assetAddresses: string[];
}

function loadProgress(): FundProgress {
  if (existsSync(FUND_PROGRESS_FILE)) {
    return JSON.parse(readFileSync(FUND_PROGRESS_FILE, "utf-8"));
  }
  return { transferred: 0, assetAddresses: [] };
}

function saveProgress(progress: FundProgress) {
  writeFileSync(FUND_PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function transferOne(
  umi: any,
  assetAddress: string,
  collection: any,
  escrowAddress: any,
  walletKey: string
): Promise<string> {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const asset = await fetchAsset(umi, publicKey(assetAddress));

      // Skip if already transferred (owned by escrow or not by wallet)
      if (asset.owner.toString() !== walletKey) {
        return assetAddress; // Already transferred
      }

      await transfer(umi, {
        asset: {
          publicKey: asset.publicKey,
          owner: asset.owner,
          oracles: (asset as any).oracles || [],
          lifecycleHooks: (asset as any).lifecycleHooks || [],
        },
        collection,
        newOwner: escrowAddress,
      }).sendAndConfirm(umi);
      return assetAddress;
    } catch (err: any) {
      if (attempt === 5) throw new Error(`Failed ${assetAddress}: ${err.message || err}`);
      await sleep(attempt * 2000);
    }
  }
  throw new Error("Unreachable");
}

async function main() {
  const umi = getUmi();

  if (!existsSync(COLLECTION_FILE)) {
    console.error("Collection not found. Run `npm run create-collection` first.");
    process.exit(1);
  }
  if (!existsSync(ESCROW_FILE)) {
    console.error("Escrow not found. Run `npm run init-escrow` first.");
    process.exit(1);
  }
  if (!existsSync(ASSETS_FILE)) {
    console.error("Asset list not found. Run `npm run mint-nfts` first.");
    process.exit(1);
  }

  const collectionAddress = publicKey(readFileSync(COLLECTION_FILE, "utf-8").trim());
  const escrowAddress = publicKey(readFileSync(ESCROW_FILE, "utf-8").trim());
  const mintedAssets: { id: number; address: string }[] = JSON.parse(
    readFileSync(ASSETS_FILE, "utf-8")
  );

  console.log(`Collection: ${collectionAddress}`);
  console.log(`Escrow: ${escrowAddress}`);
  console.log(`Total assets: ${mintedAssets.length}`);
  console.log(`Concurrency: ${CONCURRENCY}`);

  const collection = await fetchCollectionV1(umi, collectionAddress);
  const walletKey = umi.identity.publicKey.toString();

  // Load progress for resume
  const progress = loadProgress();
  const alreadyTransferred = new Set(progress.assetAddresses);
  const toTransfer = mintedAssets.filter((a) => !alreadyTransferred.has(a.address));

  if (toTransfer.length === 0) {
    console.log("All assets already transferred to escrow.");
    return;
  }

  if (progress.transferred > 0) {
    console.log(`Resuming: ${progress.transferred} already done, ${toTransfer.length} remaining`);
  }

  console.log(`Transferring ${toTransfer.length} NFTs to escrow...`);
  const t0 = Date.now();

  for (let i = 0; i < toTransfer.length; i += CONCURRENCY) {
    const batch = toTransfer.slice(i, i + CONCURRENCY);

    const results = await Promise.allSettled(
      batch.map((a) => transferOne(umi, a.address, collection, escrowAddress, walletKey))
    );

    for (const result of results) {
      if (result.status === "fulfilled") {
        progress.assetAddresses.push(result.value);
        progress.transferred++;
      } else {
        console.error(`  ${result.reason}`);
      }
    }

    saveProgress(progress);

    const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
    const done = progress.transferred;
    const total = mintedAssets.length;
    const rate = (done - (total - toTransfer.length)) / ((Date.now() - t0) / 1000);
    const remaining = toTransfer.length - (i + batch.length);
    const eta = remaining > 0 && rate > 0 ? (remaining / rate / 60).toFixed(1) : "0";
    console.log(`  ${done}/${total} transferred (${elapsed}s, ${rate.toFixed(1)}/s, ETA: ${eta}min)`);
  }

  const totalTime = ((Date.now() - t0) / 1000 / 60).toFixed(1);
  console.log(`\nDone! ${progress.transferred} NFTs transferred to escrow in ${totalTime} minutes.`);
  console.log("The escrow is now funded and ready for CLAW <-> NFT swaps.");
}

main().catch(console.error);
