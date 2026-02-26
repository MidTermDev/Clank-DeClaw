"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RobotLoader from "@/components/RobotLoader";
import { imageUrl } from "@/lib/constants";

interface TraitData {
  category: string;
  trait: string;
  count: number;
  percentage: number;
}

interface NftTraits {
  id: number;
  traits: Record<string, string>;
  rarityScore: number;
}

const TRAIT_WEIGHTS: Record<string, Record<string, number>> = {
  Background: {
    "Midnight Blue": 15, "Neon Pink": 10, "Cyber Green": 12, "Sunset Orange": 10,
    "Deep Purple": 12, "Electric Teal": 10, "Bloodmoon Red": 8, "Arctic White": 8,
    "Golden Hour": 7, "Void Black": 5
  },
  Body: {
    "Chrome": 15, "Matte Black": 12, "Neon Blue": 10, "Rust": 10,
    "Gold Plated": 8, "Holographic": 7, "Camo": 6, "Diamond": 5
  },
  Chassis: {
    "Standard Box": 18, "Rounded": 15, "Hexagonal": 12, "Spiked": 10,
    "Sleek": 10, "Bulky Tank": 8, "Skeletal": 5
  },
  Claw: {
    "Classic Tri-Claw": 15, "Pincer": 12, "Magnet": 10, "Suction Cup": 10,
    "Laser Grip": 8, "Chain Hook": 8, "Tentacle": 7, "Buzz Saw": 7,
    "Frost Claw": 6, "Phantom": 4
  },
  Visor: {
    "LED Strip": 15, "Mono Eye": 12, "Dual Lens": 12, "X-Ray": 10,
    "Pixel Grid": 10, "Cyclops": 8, "Stealth": 6, "Holo Display": 5
  },
  Accessory: {
    "None": 20, "Antenna": 14, "Hard Hat": 12, "Crown": 6,
    "Headphones": 10, "Halo": 5, "Mohawk": 8, "Satellite Dish": 7
  },
  Aura: {
    "None": 25, "Electric Sparks": 12, "Fire Ring": 10, "Frost Mist": 10,
    "Shadow Wisps": 8, "Rainbow": 5, "Glitch": 6
  },
  Expression: {
    "Neutral": 18, "Happy": 15, "Angry": 12, "Confused": 10,
    "Sleepy": 10, "Excited": 8, "Menacing": 5
  }
};

function getRarityTier(score: number): { label: string; color: string } {
  if (score >= 150) return { label: "Legendary", color: "text-yellow-500" };
  if (score >= 120) return { label: "Epic", color: "text-purple-500" };
  if (score >= 100) return { label: "Rare", color: "text-blue-500" };
  if (score >= 80) return { label: "Uncommon", color: "text-green-500" };
  return { label: "Common", color: "text-gray-500" };
}

export default function RarityPage() {
  const [manifest, setManifest] = useState<Array<{ id: number; traits: Record<string, string> }>>([]);
  const [traitStats, setTraitStats] = useState<TraitData[]>([]);
  const [topRare, setTopRare] = useState<NftTraits[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<NftTraits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch("/trait-manifest.json");
        const data = await res.json();
        setManifest(data);

        // Calculate trait stats
        const counts: Record<string, Record<string, number>> = {};
        for (const cat of Object.keys(TRAIT_WEIGHTS)) {
          counts[cat] = {};
          for (const trait of Object.keys(TRAIT_WEIGHTS[cat])) {
            counts[cat][trait] = 0;
          }
        }

        for (const nft of data) {
          for (const [cat, trait] of Object.entries(nft.traits)) {
            if (counts[cat] && counts[cat][trait as string] !== undefined) {
              counts[cat][trait as string]++;
            }
          }
        }

        const stats: TraitData[] = [];
        for (const [cat, traits] of Object.entries(counts)) {
          for (const [trait, count] of Object.entries(traits)) {
            stats.push({
              category: cat,
              trait,
              count,
              percentage: (count / 1000) * 100
            });
          }
        }
        stats.sort((a, b) => a.percentage - b.percentage);
        setTraitStats(stats);

        // Calculate rarity scores
        const scored: NftTraits[] = data.map((nft: { id: number; traits: Record<string, string> }) => {
          let score = 0;
          for (const [cat, trait] of Object.entries(nft.traits)) {
            const weight = TRAIT_WEIGHTS[cat]?.[trait as string] || 10;
            score += (100 / weight); // Lower weight = higher score
          }
          return { id: nft.id, traits: nft.traits, rarityScore: Math.round(score) };
        });

        scored.sort((a, b) => b.rarityScore - a.rarityScore);
        setTopRare(scored.slice(0, 10));
        setLoading(false);
      } catch (err) {
        console.error("Failed to load manifest:", err);
        setLoading(false);
      }
    }
    loadManifest();
  }, []);

  const handleSearch = () => {
    const id = parseInt(searchId);
    if (isNaN(id) || id < 0 || id >= 1000) {
      setSearchResult(null);
      return;
    }
    const nft = manifest.find(n => n.id === id);
    if (nft) {
      let score = 0;
      for (const [cat, trait] of Object.entries(nft.traits)) {
        const weight = TRAIT_WEIGHTS[cat]?.[trait as string] || 10;
        score += (100 / weight);
      }
      setSearchResult({ id: nft.id, traits: nft.traits, rarityScore: Math.round(score) });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <RobotLoader text="Analyzing rarity data..." />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header with gradient accent */}
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-emerald-500 to-purple-500 rounded-full" />
          <h1 className="text-4xl font-bold text-gray-900">
            Rarity <span className="text-gradient">Explorer</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Discover trait rarity and find the most unique DeClaws in the collection
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">🏆 Top 10 rarest</span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">📊 65 trait variants</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">🎯 Score lookup</span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Check Rarity by ID</h2>
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Enter DeClaw ID (0-999)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="rounded-lg bg-emerald-600 px-6 py-2 font-medium text-white hover:bg-emerald-700"
            >
              Check
            </button>
          </div>

          {searchResult && (
            <Link href={`/declaw/${searchResult.id}`} className="mt-6 flex gap-6 rounded-lg p-2 -m-2 hover:bg-gray-100 transition-colors">
              <img
                src={imageUrl(searchResult.id)}
                alt={`DeClaw #${searchResult.id}`}
                className="h-32 w-32 rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${searchResult.id}</text></svg>`;
                }}
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl font-bold text-gray-900">DeClaw #{searchResult.id}</h3>
                  <span className={`font-semibold ${getRarityTier(searchResult.rarityScore).color}`}>
                    {getRarityTier(searchResult.rarityScore).label}
                  </span>
                  <span className="text-sm text-gray-500">Score: {searchResult.rarityScore}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Object.entries(searchResult.traits).map(([cat, trait]) => (
                    <span key={cat} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      {cat}: <span className="font-medium">{trait}</span>
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-emerald-600 font-medium">View full details →</p>
              </div>
            </Link>
          )}
        </div>

        {/* Top 10 Rarest */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Top 10 Rarest</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {topRare.map((nft, i) => {
              const tier = getRarityTier(nft.rarityScore);
              return (
                <Link key={nft.id} href={`/declaw/${nft.id}`} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
                  <div className="relative">
                    <img
                      src={imageUrl(nft.id)}
                      alt={`DeClaw #${nft.id}`}
                      className="aspect-square w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${nft.id}</text></svg>`;
                      }}
                    />
                    <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-bold text-white">
                      #{i + 1}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold text-gray-900">#{nft.id}</span>
                      <span className={`text-sm font-medium ${tier.color}`}>{tier.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">Score: {nft.rarityScore}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Rarest Traits */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Rarest Traits</h2>
          <p className="mt-1 text-sm text-gray-500">Sorted by scarcity</p>
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Trait</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Count</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {traitStats.slice(0, 20).map((stat, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{stat.trait}</td>
                    <td className="px-4 py-3 text-gray-500">{stat.category}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{stat.count}</td>
                    <td className="px-4 py-3 text-right text-gray-500">{stat.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
