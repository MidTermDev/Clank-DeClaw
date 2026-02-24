// Compose 1,000 unique DeClaw PFP images from trait layers
// Weighted random selection with deduplication, then layer compositing

import { createCanvas, loadImage } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join } from "path";
import { TRAITS, pickTrait, type TraitVariant } from "./traits.js";

const SIZE = 1000;
const TOTAL = 1000;
const LAYERS_DIR = join(process.cwd(), "assets", "layers");
const OUTPUT_DIR = join(process.cwd(), "output", "images");
const MANIFEST_PATH = join(process.cwd(), "output", "trait-manifest.json");

// Seeded PRNG for reproducibility (mulberry32)
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface NFTTraits {
  id: number;
  traits: Record<string, string>;
}

function generateTraitSets(): NFTTraits[] {
  const rng = mulberry32(42069); // Fixed seed for reproducibility
  const seen = new Set<string>();
  const results: NFTTraits[] = [];

  let attempts = 0;
  const maxAttempts = TOTAL * 20;

  while (results.length < TOTAL && attempts < maxAttempts) {
    attempts++;
    const traitSet: Record<string, string> = {};

    for (const category of TRAITS) {
      const variant = pickTrait(category, rng);
      traitSet[category.name] = variant.name;
    }

    // Dedup key
    const key = TRAITS.map((c) => traitSet[c.name]).join("|");
    if (seen.has(key)) continue;

    seen.add(key);
    results.push({ id: results.length, traits: traitSet });
  }

  if (results.length < TOTAL) {
    console.error(`Only generated ${results.length} unique combos after ${attempts} attempts`);
    process.exit(1);
  }

  return results;
}

async function compositeImage(nft: NFTTraits): Promise<Buffer> {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext("2d");

  // Draw layers in order (background first, expression last)
  const layerOrder = ["Background", "Aura", "Body", "Chassis", "Claw", "Visor", "Accessory", "Expression"];

  for (const category of layerOrder) {
    const traitName = nft.traits[category];
    if (!traitName || traitName === "None") {
      // Still draw background even if somehow "None"
      if (category === "Background") {
        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, SIZE, SIZE);
      }
      continue;
    }

    const layerPath = join(LAYERS_DIR, category, `${traitName}.png`);
    if (!existsSync(layerPath)) {
      console.warn(`Missing layer: ${layerPath}`);
      continue;
    }

    const img = await loadImage(readFileSync(layerPath));
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
  }

  return canvas.toBuffer("image/png");
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Generating 1,000 unique trait combinations...");
  const nfts = generateTraitSets();
  console.log(`Generated ${nfts.length} unique combinations`);

  // Save trait manifest
  writeFileSync(MANIFEST_PATH, JSON.stringify(nfts, null, 2));
  console.log(`Trait manifest saved to ${MANIFEST_PATH}`);

  // Composite images
  console.log("Compositing images...");
  for (let i = 0; i < nfts.length; i++) {
    const buf = await compositeImage(nfts[i]);
    writeFileSync(join(OUTPUT_DIR, `${i}.png`), buf);

    if ((i + 1) % 100 === 0 || i === 0) {
      console.log(`  ${i + 1}/${TOTAL} images composed`);
    }
  }

  console.log(`\nDone! ${TOTAL} images saved to ${OUTPUT_DIR}`);
}

main().catch(console.error);
