import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { RPC_URL, CLAW_TOKEN_MINT, CLAW_DECIMALS } from "./constants";

export async function fetchClawBalance(walletAddress: string): Promise<number> {
  const connection = new Connection(RPC_URL, "confirmed");
  const mint = new PublicKey(CLAW_TOKEN_MINT);
  const owner = new PublicKey(walletAddress);

  try {
    const ata = await getAssociatedTokenAddress(mint, owner);
    const account = await getAccount(connection, ata);
    return Number(account.amount) / 10 ** CLAW_DECIMALS;
  } catch {
    // Account doesn't exist — zero balance
    return 0;
  }
}
