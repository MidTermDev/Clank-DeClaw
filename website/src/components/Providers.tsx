"use client";

import { useMemo, useEffect, type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useUmiStore } from "@/hooks/useUmiStore";
import { RPC_URL } from "@/lib/constants";
import "@solana/wallet-adapter-react-ui/styles.css";

function UmiSync({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  const { setWalletSigner, resetSigner } = useUmiStore();

  useEffect(() => {
    if (wallet.publicKey && wallet.signTransaction) {
      const signer = createSignerFromWalletAdapter(wallet);
      setWalletSigner(signer);
    } else {
      resetSigner();
    }
  }, [wallet.publicKey, wallet.signTransaction, setWalletSigner, resetSigner]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${RPC_URL}`;
    }
    return "https://api.mainnet-beta.solana.com";
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint} config={{ wsEndpoint: " ", commitment: "confirmed" }}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <UmiSync>{children}</UmiSync>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
