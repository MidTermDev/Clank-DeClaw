"use client";

import { useEffect, useState } from "react";
import { ESCROW_ADDRESS, CLAW_TOKEN_MINT } from "@/lib/constants";
import { useUmiStore } from "@/hooks/useUmiStore";

interface EscrowData {
  nftsInEscrow: number;
  tokenBalance: number;
  loading: boolean;
  error: string | null;
}

export default function EscrowStats() {
  const getUmi = useUmiStore((s) => s.getUmi);
  const [data, setData] = useState<EscrowData>({
    nftsInEscrow: 0,
    tokenBalance: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchEscrowData() {
      try {
        const endpoint = getUmi().rpc.getEndpoint();

        // Direct JSON-RPC call to get parsed token accounts (no Connection / no WebSocket)
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountsByOwner",
            params: [
              ESCROW_ADDRESS,
              { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
              { encoding: "jsonParsed" },
            ],
          }),
        });

        const json = await res.json();
        const accounts = json.result?.value ?? [];

        let nftCount = 0;
        let tokenBalance = 0;

        for (const { account } of accounts) {
          const parsed = account.data.parsed?.info;
          if (!parsed) continue;

          const mint = parsed.mint;
          const amount = parsed.tokenAmount;

          if (mint === CLAW_TOKEN_MINT) {
            tokenBalance = amount.uiAmount || 0;
          } else if (amount.decimals === 0 && amount.uiAmount === 1) {
            nftCount++;
          }
        }

        setData({
          nftsInEscrow: nftCount,
          tokenBalance,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Failed to fetch escrow data:", err);
        setData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load escrow data",
        }));
      }
    }

    fetchEscrowData();

    // Refresh every 30 seconds
    const interval = setInterval(fetchEscrowData, 30000);
    return () => clearInterval(interval);
  }, [getUmi]);

  if (data.loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-gray-100 p-4">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="mt-2 h-6 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        {data.error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-emerald-50 p-4">
        <p className="text-sm font-medium text-emerald-600">NFTs in Escrow</p>
        <p className="mt-1 text-2xl font-bold text-emerald-900">
          {data.nftsInEscrow.toLocaleString()}
          <span className="ml-1 text-sm font-normal text-emerald-600">/ 1,000</span>
        </p>
      </div>
      <div className="rounded-lg bg-purple-50 p-4">
        <p className="text-sm font-medium text-purple-600">DeClaws in Pool</p>
        <p className="mt-1 text-2xl font-bold text-purple-900">
          {(data.tokenBalance / 1_000_000).toFixed(1)}
          <span className="ml-1 text-sm font-normal text-purple-600">M</span>
        </p>
      </div>
    </div>
  );
}
