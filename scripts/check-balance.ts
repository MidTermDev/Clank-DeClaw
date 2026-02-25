import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import fs from "fs";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const CLAW_TOKEN_MINT = "b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW";

async function main() {
  const keypairData = JSON.parse(fs.readFileSync("./keypair.json", "utf-8"));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  
  console.log("Wallet address:", keypair.publicKey.toBase58());
  
  const connection = new Connection(RPC_URL, "confirmed");
  
  // Get SOL balance
  const solBalance = await connection.getBalance(keypair.publicKey);
  console.log("SOL balance:", solBalance / 1e9);
  
  // Get DeClaws token balance
  const tokenMint = new PublicKey(CLAW_TOKEN_MINT);
  const ata = await getAssociatedTokenAddress(tokenMint, keypair.publicKey);
  
  try {
    const tokenAccount = await getAccount(connection, ata);
    console.log("DeClaws balance:", Number(tokenAccount.amount) / 1e6);
  } catch {
    console.log("No DeClaws token account found");
  }
}

main().catch(console.error);
