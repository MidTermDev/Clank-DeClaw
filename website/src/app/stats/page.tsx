"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ESCROW_ADDRESS, CLAW_TOKEN_MINT, imageUrl } from "@/lib/constants";
import { fetchEscrowNfts } from "@/lib/das";
import { calculateRarityScore, getRarityTier, TRAIT_WEIGHTS } from "@/lib/rarity";
import traitManifest from "../../../public/trait-manifest.json";

interface TraitStat {
  name: string;
  count: number;
  percentage: number;
}

interface RarityStat {
  tier: string;
  count: number;
  color: string;
}

export default function StatsPage() {
  const [escrowCount, setEscrowCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [traitStats, setTraitStats] = useState<Record<string, TraitStat[]>>({});
  const [rarityStats, setRarityStats] = useState<RarityStat[]>([]);

  useEffect(() => {
    // Calculate trait distribution from manifest
    const categories = Object.keys(TRAIT_WEIGHTS);
    const stats: Record<string, TraitStat[]> = {};
    
    for (const category of categories) {
      const counts: Record<string, number> = {};
      for (const nft of traitManifest as Array<{ id: number; traits: Record<string, string> }>) {
        const value = nft.traits[category];
        counts[value] = (counts[value] || 0) + 1;
      }
      stats[category] = Object.entries(counts)
        .map(([name, count]) => ({
          name,
          count,
          percentage: (count / 1000) * 100,
        }))
        .sort((a, b) => b.count - a.count);
    }
    setTraitStats(stats);

    // Calculate rarity distribution
    const rarityBuckets: Record<string, number> = {
      Legendary: 0,
      Epic: 0,
      Rare: 0,
      Uncommon: 0,
      Common: 0,
    };
    for (const nft of traitManifest as Array<{ id: number; traits: Record<string, string> }>) {
      const score = calculateRarityScore(nft.traits);
      const tier = getRarityTier(score);
      rarityBuckets[tier.label]++;
    }
    setRarityStats([
      { tier: "Legendary", count: rarityBuckets.Legendary, color: "text-amber-500" },
      { tier: "Epic", count: rarityBuckets.Epic, color: "text-purple-500" },
      { tier: "Rare", count: rarityBuckets.Rare, color: "text-blue-500" },
      { tier: "Uncommon", count: rarityBuckets.Uncommon, color: "text-emerald-500" },
      { tier: "Common", count: rarityBuckets.Common, color: "text-gray-500" },
    ]);

    // Fetch escrow count
    async function loadEscrow() {
      try {
        const nfts = await fetchEscrowNfts();
        setEscrowCount(nfts.length);
      } catch (err) {
        console.error("Failed to load escrow:", err);
      }
      setLoading(false);
    }
    loadEscrow();
  }, []);

  const circulatingNfts = escrowCount !== null ? 1000 - escrowCount : null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Collection Stats</h1>
          <p className="mt-2 text-gray-500">Real-time analytics for the DeClaw collection</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white">
            <p className="text-emerald-100 text-sm">Total Supply</p>
            <p className="text-4xl font-bold mt-1">1,000</p>
            <p className="text-emerald-100 text-xs mt-2">Unique robots</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
            <p className="text-purple-100 text-sm">In Escrow</p>
            <p className="text-4xl font-bold mt-1">
              {loading ? "..." : escrowCount ?? "—"}
            </p>
            <p className="text-purple-100 text-xs mt-2">Available to capture</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white">
            <p className="text-amber-100 text-sm">Circulating</p>
            <p className="text-4xl font-bold mt-1">
              {loading ? "..." : circulatingNfts ?? "—"}
            </p>
            <p className="text-amber-100 text-xs mt-2">Held by collectors</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 p-6 text-white">
            <p className="text-gray-300 text-sm">Swap Rate</p>
            <p className="text-4xl font-bold mt-1">1M</p>
            <p className="text-gray-300 text-xs mt-2">CLAW per NFT</p>
          </div>
        </div>

        {/* Rarity Distribution */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rarity Distribution</h2>
          <div className="grid gap-4 sm:grid-cols-5">
            {rarityStats.map((stat) => (
              <div key={stat.tier} className="rounded-xl bg-gray-50 p-4 border border-gray-100 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.tier}</p>
                <p className="text-xs text-gray-400">{(stat.count / 10).toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trait Distribution */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trait Distribution</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(traitStats).map(([category, traits]) => (
              <div key={category} className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2">
                  {traits.map((trait) => (
                    <div key={trait.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate flex-1">{trait.name}</span>
                      <div className="flex items-center gap-2 ml-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${trait.percentage}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs w-8 text-right">
                          {trait.percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href={`https://solscan.io/account/${ESCROW_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800 transition-colors"
          >
            View Escrow on Solscan ↗
          </a>
          <a
            href={`https://solscan.io/token/${CLAW_TOKEN_MINT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition-colors"
          >
            View CLAW Token ↗
          </a>
          <Link
            href="/rarity"
            className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-colors"
          >
            Rarity Explorer →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
