// Generate Metaplex-standard JSON metadata for each NFT
// Reads trait-manifest.json and images CID, outputs metadata JSONs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const OUTPUT_DIR = join(process.cwd(), "output", "metadata");
const MANIFEST_PATH = join(process.cwd(), "output", "trait-manifest.json");
const CID_FILE = join(process.cwd(), "output", "images-cid.txt");

const COLLECTION_NAME = "DeClaw";
const SYMBOL = "DCLAW";
const DESCRIPTION = "DeClaw #%ID% — A unique claw-machine robot from the DeClaw collection. 1,000 generative PFPs with MPL-404 hybrid bridge on Solana.";
const EXTERNAL_URL = "https://github.com/MidTermDev/Clank-DeClaw";
const SELLER_FEE_BASIS_POINTS = 500; // 5%

interface NFTTraits {
  id: number;
  traits: Record<string, string>;
}

function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error("trait-manifest.json not found. Run `npm run generate-art` first.");
    process.exit(1);
  }

  if (!existsSync(CID_FILE)) {
    console.error("images-cid.txt not found. Run `npm run upload-images` first.");
    console.log("Using placeholder CID — you can regenerate metadata after upload.");
  }

  const imagesCid = existsSync(CID_FILE)
    ? readFileSync(CID_FILE, "utf-8").trim()
    : "PLACEHOLDER_CID";

  const gateway = process.env.PINATA_GATEWAY || "gateway.pinata.cloud";
  const manifest: NFTTraits[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating metadata for ${manifest.length} NFTs...`);
  console.log(`Image base: https://${gateway}/ipfs/${imagesCid}/`);

  for (const nft of manifest) {
    const metadata = {
      name: `${COLLECTION_NAME} #${nft.id}`,
      symbol: SYMBOL,
      description: DESCRIPTION.replace("%ID%", String(nft.id)),
      image: `https://${gateway}/ipfs/${imagesCid}/${nft.id}.png`,
      external_url: EXTERNAL_URL,
      seller_fee_basis_points: SELLER_FEE_BASIS_POINTS,
      attributes: Object.entries(nft.traits).map(([trait_type, value]) => ({
        trait_type,
        value,
      })),
      properties: {
        category: "image",
        files: [
          {
            uri: `https://${gateway}/ipfs/${imagesCid}/${nft.id}.png`,
            type: "image/png",
          },
        ],
        creators: [],
      },
    };

    writeFileSync(
      join(OUTPUT_DIR, `${nft.id}.json`),
      JSON.stringify(metadata, null, 2)
    );
  }

  console.log(`Done! ${manifest.length} metadata files saved to ${OUTPUT_DIR}`);
}

main();
