// Upload all 1,000 PNGs to Pinata IPFS as a folder
// Saves the folder CID to output/images-cid.txt

import { PinataSDK } from "pinata";
import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

const OUTPUT_DIR = join(process.cwd(), "output", "images");
const CID_FILE = join(process.cwd(), "output", "images-cid.txt");

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

  // Collect all PNG files
  const files = readdirSync(OUTPUT_DIR)
    .filter((f) => f.endsWith(".png"))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Found ${files.length} images to upload`);

  if (files.length === 0) {
    console.error("No images found. Run `npm run generate-art` first.");
    process.exit(1);
  }

  // Create File objects from disk
  const fileObjects: File[] = files.map((filename) => {
    const buf = readFileSync(join(OUTPUT_DIR, filename));
    return new File([buf], filename, { type: "image/png" });
  });

  console.log("Uploading folder to Pinata IPFS...");
  console.log("This may take several minutes for 1,000 images...");

  const result = await pinata.upload.public
    .fileArray(fileObjects)
    .name("declaw-images");

  console.log(`Upload complete!`);
  console.log(`CID: ${result.cid}`);
  console.log(`Files: ${result.number_of_files}`);

  // Save CID
  writeFileSync(CID_FILE, result.cid);
  console.log(`CID saved to ${CID_FILE}`);

  if (gateway) {
    console.log(`\nImages accessible at:`);
    console.log(`  https://${gateway}/ipfs/${result.cid}/0.png`);
    console.log(`  https://${gateway}/ipfs/${result.cid}/999.png`);
  }
}

main().catch(console.error);
