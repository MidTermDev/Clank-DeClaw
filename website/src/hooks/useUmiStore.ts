"use client";

import { create } from "zustand";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplHybrid } from "@metaplex-foundation/mpl-hybrid";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
  type Umi,
  type Signer,
  signerIdentity,
  createNoopSigner,
  publicKey,
} from "@metaplex-foundation/umi";
import { RPC_URL } from "@/lib/constants";

interface UmiState {
  umi: Umi | null;
  getUmi: () => Umi;
  setWalletSigner: (signer: Signer) => void;
  resetSigner: () => void;
}

const NOOP_PUBKEY = publicKey("11111111111111111111111111111111");

function createConfiguredUmi(): Umi {
  const endpoint =
    typeof window !== "undefined" ? RPC_URL : "https://api.mainnet-beta.solana.com";
  return createUmi(endpoint)
    .use(mplHybrid())
    .use(mplCore())
    .use(mplToolbox())
    .use(signerIdentity(createNoopSigner(NOOP_PUBKEY)));
}

export const useUmiStore = create<UmiState>((set, get) => ({
  umi: null,
  getUmi: () => {
    let umi = get().umi;
    if (!umi) {
      umi = createConfiguredUmi();
      set({ umi });
    }
    return umi;
  },
  setWalletSigner: (signer: Signer) => {
    const umi = get().getUmi();
    umi.use(signerIdentity(signer));
    set({ umi });
  },
  resetSigner: () => {
    set({ umi: createConfiguredUmi() });
  },
}));
