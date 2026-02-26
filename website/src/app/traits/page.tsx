"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { imageUrl } from "@/lib/constants";
import { TRAIT_WEIGHTS, getTraitRarity } from "@/lib/rarity";
import traitManifest from "../../../public/trait-manifest.json";

type NftData = { id: number; traits: Record<string, string> };
const allNfts = traitManifest as NftData[];

const CATEGORIES = Object.keys(TRAIT_WEIGHTS);

export default function TraitsPage() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);

  const traitsInCategory = useMemo(() => {
    return Object.keys(TRAIT_WEIGHTS[selectedCategory] || {}).sort();
  }, [selectedCategory]);

  const nftsWithTrait = useMemo(() => {
    if (!selectedTrait) return [];
    return allNfts.filter((nft) => nft.traits[selectedCategory] === selectedTrait);
  }, [selectedCategory, selectedTrait]);

  const traitCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const trait of traitsInCategory) {
      counts[trait] = allNfts.filter((nft) => nft.traits[selectedCategory] === trait).length;
    }
    return counts;
  }, [selectedCategory, traitsInCategory]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Trait Explorer</h1>
          <p className="mt-2 text-gray-500">Browse NFTs by their traits</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTrait(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Random button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              const randomCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
              const traits = Object.keys(TRAIT_WEIGHTS[randomCat] || {});
              const randomTrait = traits[Math.floor(Math.random() * traits.length)];
              setSelectedCategory(randomCat);
              setSelectedTrait(randomTrait);
            }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            🎲 Surprise me
          </button>
        </div>

        {/* Trait Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
          {traitsInCategory.map((trait) => {
            const count = traitCounts[trait];
            const rarity = getTraitRarity(selectedCategory, trait);
            const isSelected = selectedTrait === trait;
            
            return (
              <button
                key={trait}
                onClick={() => setSelectedTrait(isSelected ? null : trait)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{trait}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    rarity.percentage < 10 
                      ? "bg-purple-100 text-purple-700" 
                      : rarity.percentage < 15 
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {rarity.percentage.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{count} NFTs</p>
              </button>
            );
          })}
        </div>

        {/* Results */}
        {selectedTrait && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedCategory}: {selectedTrait}
              </h2>
              <span className="text-gray-500">{nftsWithTrait.length} NFTs</span>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {nftsWithTrait.map((nft) => (
                <Link
                  key={nft.id}
                  href={`/declaw/${nft.id}`}
                  className="group aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-400 transition-colors"
                >
                  <img
                    src={imageUrl(nft.id)}
                    alt={`#${nft.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${nft.id}</text></svg>`;
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {!selectedTrait && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-4xl mb-4">👆</p>
            <p>Select a trait above to see all NFTs with that trait</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
