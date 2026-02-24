"use client";

import { useEffect, type ReactNode } from "react";
import {
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useUmiStore } from "@/hooks/useUmiStore";
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
  return (
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <UmiSync>{children}</UmiSync>
      </WalletModalProvider>
    </WalletProvider>
  );
}
