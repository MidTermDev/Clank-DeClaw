"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchUserDeClawNfts, type DasAsset } from "@/lib/das";

export function useUserNfts() {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<DasAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!publicKey) {
      setNfts([]);
      return;
    }
    try {
      setLoading(true);
      const results = await fetchUserDeClawNfts(publicKey.toBase58());
      setNfts(results);
    } catch {
      setNfts([]);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { nfts, loading, refresh };
}
