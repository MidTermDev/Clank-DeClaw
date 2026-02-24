"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchClawBalance } from "@/lib/tokens";

export function useClawBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!publicKey) {
      setBalance(0);
      return;
    }
    try {
      setLoading(true);
      const bal = await fetchClawBalance(publicKey.toBase58());
      setBalance(bal);
    } catch {
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, loading, refresh };
}
