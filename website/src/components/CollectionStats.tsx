"use client";

import { useState, useEffect } from "react";
import { calculateRarityScore, getRarityTier } from "@/lib/rarity";

interface Stats {
  legendary: number;
  epic: number;
  rare: number;
  uncommon: number;
  common: number;
}

export default function CollectionStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/trait-manifest.json");
        const manifest = await res.json();
        
        const counts: Stats = { legendary: 0, epic: 0, rare: 0, uncommon: 0, common: 0 };
        
        manifest.forEach((nft: { traits: Record<string, string> }) => {
          const score = calculateRarityScore(nft.traits);
          const tier = getRarityTier(score);
          const key = tier.label.toLowerCase() as keyof Stats;
          if (key in counts) counts[key]++;
        });
        
        setStats(counts);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    }
    loadStats();
  }, []);

  if (!stats) return null;

  const tiers = [
    { name: "Legendary", count: stats.legendary, color: "bg-yellow-500" },
    { name: "Epic", count: stats.epic, color: "bg-purple-500" },
    { name: "Rare", count: stats.rare, color: "bg-blue-500" },
    { name: "Uncommon", count: stats.uncommon, color: "bg-green-500" },
    { name: "Common", count: stats.common, color: "bg-gray-400" },
  ];

  return (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mt-6">
      <h3 className="font-semibold text-gray-900 mb-3">Rarity Distribution</h3>
      <div className="space-y-2">
        {tiers.map((tier) => (
          <div key={tier.name} className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${tier.color}`} />
            <span className="text-sm text-gray-600 w-24">{tier.name}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${tier.color}`}
                style={{ width: `${(tier.count / 1000) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-12 text-right">{tier.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
