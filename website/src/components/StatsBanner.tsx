"use client";

import { useEffect, useState } from "react";
import { CLAW_TOKEN_MINT, ESCROW_ADDRESS, RPC_URL } from "@/lib/constants";
import { fetchEscrowNfts } from "@/lib/das";

export default function StatsBanner() {
  const [stats, setStats] = useState({
    nftsInEscrow: 0,
    nftsCaptured: 0,
    tokenPool: 0,
    loading: true,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const nfts = await fetchEscrowNfts();
        const nftCount = nfts.length;

        const res = await fetch(RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "getTokenAccountsByOwner",
            params: [
              ESCROW_ADDRESS,
              { mint: CLAW_TOKEN_MINT },
              { encoding: "jsonParsed" },
            ],
          }),
        });

        const json = await res.json();
        const accounts = json.result?.value ?? [];
        let tokenBalance = 0;
        if (accounts.length > 0) {
          tokenBalance = accounts[0].account.data.parsed?.info?.tokenAmount?.uiAmount || 0;
        }

        setStats({
          nftsInEscrow: nftCount,
          nftsCaptured: 1000 - nftCount,
          tokenPool: tokenBalance,
          loading: false,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }

    loadStats();
    const interval = setInterval(loadStats, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (stats.loading) {
    return (
      <div className="bg-gray-900 text-white py-3">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-center gap-8 text-sm animate-pulse">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-4 w-32 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Available:</span>
            <span className="font-semibold text-emerald-400">{stats.nftsInEscrow.toLocaleString()}</span>
            <span className="text-gray-500">NFTs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Captured:</span>
            <span className="font-semibold text-purple-400">{stats.nftsCaptured.toLocaleString()}</span>
            <span className="text-gray-500">NFTs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Pool:</span>
            <span className="font-semibold text-blue-400">{(stats.tokenPool / 1_000_000).toFixed(1)}M</span>
            <span className="text-gray-500">DeClaws</span>
          </div>
        </div>
      </div>
    </div>
  );
}
