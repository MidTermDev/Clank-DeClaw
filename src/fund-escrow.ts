// Transfer all 1,000 NFTs to the MPL-404 escrow PDA
// This funds the escrow so users can swap CLAW tokens for NFTs

import {
  publicKey,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import {
  transfer,
  fetchCollectionV1,
  fetchAssetsByCollection,
} from "@metaplex-foundation/mpl-core";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getUmi, TOTAL_SUPPLY } from "./config.js";

const COLLECTION_FILE = join(process.cwd(), "output", "collection-address.txt");
const ESCROW_FILE = join(process.cwd(), "output", "escrow-address.txt");
const FUND_PROGRESS_FILE = join(process.cwd(), "output", "fund-progress.json");
const BATCH_SIZE = 3; // Transfers are heavier, use smaller batches

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
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  const collectionAddress = publicKey(
    readFileSync(COLLECTION_FILE, "utf-8").trim()
  );
  const escrowAddress = publicKey(
    readFileSync(ESCROW_FILE, "utf-8").trim()
  );

  console.log(`Collection: ${collectionAddress}`);
  console.log(`Escrow: ${escrowAddress}`);

  // Fetch collection
  const collection = await fetchCollectionV1(umi, collectionAddress);

  // Fetch all assets in the collection owned by our wallet
  console.log("Fetching assets owned by wallet...");
  const allAssets = await fetchAssetsByCollection(umi, collectionAddress);
  const ownedAssets = allAssets.filter(
    (a) => a.owner.toString() === umi.identity.publicKey.toString()
  );

  console.log(`Found ${ownedAssets.length} assets owned by wallet (of ${allAssets.length} total)`);

  if (ownedAssets.length === 0) {
    console.log("No assets to transfer. Escrow may already be funded.");
    return;
  }

  // Load progress for resume
  const progress = loadProgress();
  const alreadyTransferred = new Set(progress.assetAddresses);
  const toTransfer = ownedAssets.filter(
    (a) => !alreadyTransferred.has(a.publicKey.toString())
  );

  if (toTransfer.length === 0) {
    console.log("All owned assets already transferred.");
    return;
  }

  if (progress.transferred > 0) {
    console.log(`Resuming: ${progress.transferred} already transferred, ${toTransfer.length} remaining`);
  }

  console.log(`Transferring ${toTransfer.length} NFTs to escrow...`);

  for (let i = 0; i < toTransfer.length; i += BATCH_SIZE) {
    const batch = toTransfer.slice(i, i + BATCH_SIZE);

    let builder = transactionBuilder();
    for (const asset of batch) {
      builder = builder.add(
        transfer(umi, {
          asset: {
            publicKey: asset.publicKey,
            owner: asset.owner,
            oracles: (asset as any).oracles || [],
            lifecycleHooks: (asset as any).lifecycleHooks || [],
          },
          collection,
          newOwner: escrowAddress,
        })
      );
    }

    // Retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await builder.sendAndConfirm(umi);
        break;
      } catch (err: any) {
        retries--;
        if (retries === 0) {
          console.error(`Failed batch at ${i}:`, err.message || err);
          saveProgress(progress);
          console.log("Progress saved. Re-run to resume.");
          process.exit(1);
        }
        console.warn(`Retry (${3 - retries}/3)...`);
        await sleep(2000);
      }
    }

    // Update progress
    for (const asset of batch) {
      progress.assetAddresses.push(asset.publicKey.toString());
    }
    progress.transferred += batch.length;
    saveProgress(progress);

    const total = progress.transferred;
    if (total % 50 === 0 || i + BATCH_SIZE >= toTransfer.length) {
      console.log(`  ${total}/${toTransfer.length + (alreadyTransferred.size)} transferred`);
    }

    if (i + BATCH_SIZE < toTransfer.length) {
      await sleep(500);
    }
  }

  console.log(`\nDone! ${progress.transferred} NFTs transferred to escrow.`);
  console.log("The escrow is now funded and ready for CLAW ↔ NFT swaps.");
}

main().catch(console.error);
