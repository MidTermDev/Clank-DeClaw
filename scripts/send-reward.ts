import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { 
  getAssociatedTokenAddress, 
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";
import fs from "fs";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const CLAW_TOKEN_MINT = "b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW";
const CLAW_DECIMALS = 6;

async function sendReward(recipientAddress: string, amount: number) {
  const keypairData = JSON.parse(fs.readFileSync("./keypair.json", "utf-8"));
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairData));
  
  console.log("Sender:", keypair.publicKey.toBase58());
  console.log("Recipient:", recipientAddress);
  console.log("Amount:", amount, "DeClaws");
  
  const connection = new Connection(RPC_URL, "confirmed");
  const tokenMint = new PublicKey(CLAW_TOKEN_MINT);
  const recipient = new PublicKey(recipientAddress);
  
  // Get sender's token account
  const senderAta = await getAssociatedTokenAddress(tokenMint, keypair.publicKey);
  
  // Get or create recipient's token account
  console.log("Getting/creating recipient token account...");
  const recipientAta = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    tokenMint,
    recipient
  );
  
  // Create transfer instruction
  const amountInSmallestUnit = BigInt(amount * Math.pow(10, CLAW_DECIMALS));
  
  const transferIx = createTransferInstruction(
    senderAta,
    recipientAta.address,
    keypair.publicKey,
    amountInSmallestUnit
  );
  
  // Build and send transaction
  const tx = new Transaction().add(transferIx);
  tx.feePayer = keypair.publicKey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  
  console.log("Sending transaction...");
  const sig = await connection.sendTransaction(tx, [keypair]);
  
  console.log("Transaction signature:", sig);
  console.log("Solscan:", `https://solscan.io/tx/${sig}`);
  
  // Wait for confirmation
  await connection.confirmTransaction(sig, "confirmed");
  console.log("Transaction confirmed!");
  
  return sig;
}

// Get recipient from command line
const recipient = process.argv[2];
const amount = parseInt(process.argv[3]) || 1_000_000;

if (!recipient) {
  console.log("Usage: npx ts-node scripts/send-reward.ts <recipient_address> [amount]");
  process.exit(1);
}

sendReward(recipient, amount).catch(console.error);
