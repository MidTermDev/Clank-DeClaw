"use client";

import { useEffect, useState } from "react";
import { CLAW_TOKEN_MINT, ESCROW_ADDRESS, RPC_URL } from "@/lib/constants";
import { fetchEscrowNfts } from "@/lib/das";

interface EscrowData {
  nftsInEscrow: number;
  tokenBalance: number;
  loading: boolean;
  error: string | null;
}

interface EscrowStatsProps {
  dark?: boolean;
}

export default function EscrowStats({ dark = false }: EscrowStatsProps) {
  const [data, setData] = useState<EscrowData>({
    nftsInEscrow: 0,
    tokenBalance: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchEscrowData() {
      try {
        // Fetch NFT count via DAS API (Core assets, not SPL tokens)
        const nfts = await fetchEscrowNfts();
        const nftCount = nfts.length;

        // Fetch DeClaws token balance via JSON-RPC
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
  }, []);

  if (data.loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className={`animate-pulse rounded-lg p-4 ${dark ? "bg-white/10" : "bg-gray-100"}`}>
            <div className={`h-4 w-20 rounded ${dark ? "bg-white/20" : "bg-gray-200"}`} />
            <div className={`mt-2 h-6 w-16 rounded ${dark ? "bg-white/20" : "bg-gray-200"}`} />
          </div>
        ))}
      </div>
    );
  }

  if (data.error) {
    return (
      <div className={`rounded-lg p-4 text-sm ${dark ? "bg-red-500/20 text-red-300" : "bg-red-50 text-red-600"}`}>
        {data.error}
      </div>
    );
  }

  if (dark) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-emerald-500/20 p-4">
          <p className="text-sm font-medium text-emerald-300">NFTs in Escrow</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {data.nftsInEscrow.toLocaleString()}
            <span className="ml-1 text-sm font-normal text-emerald-300">/ 1,000</span>
          </p>
        </div>
        <div className="rounded-lg bg-purple-500/20 p-4">
          <p className="text-sm font-medium text-purple-300">DeClaws in Pool</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {(data.tokenBalance / 1_000_000).toFixed(1)}
            <span className="ml-1 text-sm font-normal text-purple-300">M</span>
          </p>
        </div>
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
