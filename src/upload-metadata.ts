// Upload metadata folder to Pinata IPFS
// Saves the base URI to output/base-uri.txt
// MPL-Hybrid appends /<index>.json to the base URI

import { PinataSDK } from "pinata";
import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const METADATA_DIR = join(process.cwd(), "output", "metadata");
const BASE_URI_FILE = join(process.cwd(), "output", "base-uri.txt");

async function main() {
  const jwt = process.env.PINATA_JWT;
  const gateway = process.env.PINATA_GATEWAY;

  if (!jwt || jwt === "your_pinata_jwt_here") {
    console.error("Set PINATA_JWT in .env");
    process.exit(1);
  }

  const pinata = new PinataSDK({
    pinataJwt: jwt,
    pinataGateway: gateway || undefined,
  });

  // Test auth
  try {
    await pinata.testAuthentication();
    console.log("Pinata authentication successful");
  } catch (e) {
    console.error("Pinata auth failed:", e);
    process.exit(1);
  }

  // Collect metadata files
  const files = readdirSync(METADATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Found ${files.length} metadata files to upload`);

  if (files.length === 0) {
    console.error("No metadata found. Run `npm run generate-metadata` first.");
    process.exit(1);
  }

  // Create File objects
  const fileObjects: File[] = files.map((filename) => {
    const buf = readFileSync(join(METADATA_DIR, filename));
    return new File([buf], filename, { type: "application/json" });
  });

  console.log("Uploading metadata folder to Pinata IPFS...");

  const result = await pinata.upload.public
    .fileArray(fileObjects)
    .name("declaw-metadata");

  console.log(`Upload complete!`);
  console.log(`CID: ${result.cid}`);

  // Base URI for MPL-Hybrid: gateway/ipfs/<CID>/
  // MPL-Hybrid will append <id>.json
  const gw = gateway || "gateway.pinata.cloud";
  const baseUri = `https://${gw}/ipfs/${result.cid}/`;

  writeFileSync(BASE_URI_FILE, baseUri);
  console.log(`Base URI saved to ${BASE_URI_FILE}`);
  console.log(`Base URI: ${baseUri}`);
  console.log(`\nExample: ${baseUri}0.json`);
}

main().catch(console.error);
