"use client";

import { useState, useEffect, useCallback } from "react";
import { type EscrowV1 } from "@metaplex-foundation/mpl-hybrid";
import { fetchEscrow } from "@/lib/escrow";
import { useUmiStore } from "./useUmiStore";

export function useEscrow() {
  const getUmi = useUmiStore((s) => s.getUmi);
  const [escrow, setEscrow] = useState<EscrowV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEscrow(getUmi());
      setEscrow(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch escrow");
    } finally {
      setLoading(false);
    }
  }, [getUmi]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { escrow, loading, error, refresh };
}
