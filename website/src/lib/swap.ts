import { publicKey, type Umi } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { captureV1, releaseV1 } from "@metaplex-foundation/mpl-hybrid";
import {
  COLLECTION_ADDRESS,
  ESCROW_ADDRESS,
  CLAW_TOKEN_MINT,
  FEE_LOCATION,
} from "./constants";

function sigToString(sig: Uint8Array): string {
  return base58.deserialize(sig)[0];
}

export async function executeCaptureV1(umi: Umi, assetAddress: string) {
  const tx = captureV1(umi, {
    owner: umi.identity,
    escrow: publicKey(ESCROW_ADDRESS),
    asset: publicKey(assetAddress),
    collection: publicKey(COLLECTION_ADDRESS),
    token: publicKey(CLAW_TOKEN_MINT),
    feeProjectAccount: publicKey(FEE_LOCATION),
  });
  const sig = await tx.send(umi);
  return sigToString(sig);
}

export async function executeReleaseV1(umi: Umi, assetAddress: string) {
  const tx = releaseV1(umi, {
    owner: umi.identity,
    escrow: publicKey(ESCROW_ADDRESS),
    asset: publicKey(assetAddress),
    collection: publicKey(COLLECTION_ADDRESS),
    token: publicKey(CLAW_TOKEN_MINT),
    feeProjectAccount: publicKey(FEE_LOCATION),
  });
  const sig = await tx.send(umi);
  return sigToString(sig);
}
