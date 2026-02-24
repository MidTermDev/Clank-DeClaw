import { publicKey, type Umi } from "@metaplex-foundation/umi";
import { fetchEscrowV1, type EscrowV1 } from "@metaplex-foundation/mpl-hybrid";
import { ESCROW_ADDRESS } from "./constants";

export async function fetchEscrow(umi: Umi): Promise<EscrowV1> {
  return fetchEscrowV1(umi, publicKey(ESCROW_ADDRESS));
}
