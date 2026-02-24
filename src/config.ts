// Shared Umi setup — RPC, keypair, MPL-Core + MPL-Hybrid plugins

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { mplHybrid } from "@metaplex-foundation/mpl-hybrid";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
  keypairIdentity,
  type Keypair,
} from "@metaplex-foundation/umi";
import { readFileSync } from "fs";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config();

export function getUmi() {
  const rpcUrl = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
  const keypairPath = resolve(process.env.KEYPAIR_PATH || "./keypair.json");

  // Load secret key from JSON file (array of bytes)
  const secretKeyArray: number[] = JSON.parse(
    readFileSync(keypairPath, "utf-8")
  );
  const secretKey = new Uint8Array(secretKeyArray);

  // Create Umi instance with all plugins
  const umi = createUmi(rpcUrl)
    .use(mplCore())
    .use(mplHybrid())
    .use(mplToolbox());

  // Derive keypair from secret key and set as identity + payer
  const keypair: Keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
  umi.use(keypairIdentity(keypair));

  // Mask RPC URL to avoid leaking API keys in logs
  const maskedRpc = rpcUrl.replace(/api-key=[^&]+/, "api-key=***");
  console.log(`Umi configured:`);
  console.log(`  RPC: ${maskedRpc}`);
  console.log(`  Wallet: ${keypair.publicKey}`);

  return umi;
}

// CLAW token mint address
export const CLAW_TOKEN_MINT = "b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW";

// Collection config
export const COLLECTION_NAME = "DeClaw";
export const COLLECTION_SYMBOL = "DCLAW";
export const TOTAL_SUPPLY = 1000;
export const ROYALTY_BASIS_POINTS = 500; // 5%

// Escrow config
export const CLAW_PER_NFT = 1_000_000; // 1M CLAW tokens (before decimals)
export const CLAW_DECIMALS = 6;
export const CLAW_AMOUNT = BigInt(CLAW_PER_NFT) * BigInt(10 ** CLAW_DECIMALS); // 1M × 10^6
