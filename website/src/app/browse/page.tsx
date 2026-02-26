"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { imageUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier, TRAIT_WEIGHTS } from "@/lib/rarity";
import SearchBar from "@/components/SearchBar";
import RobotLoader from "@/components/RobotLoader";

interface NftData {
  id: number;
  traits: Record<string, string>;
  rarityScore: number;
}

const TRAIT_CATEGORIES = Object.keys(TRAIT_WEIGHTS);
const ITEMS_PER_PAGE = 50;

export default function BrowsePage() {
  const [allNfts, setAllNfts] = useState<NftData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<"id" | "rarity">("id");
  const [page, setPage] = useState(1);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    async function loadManifest() {
      try {
        const res = await fetch("/trait-manifest.json");
        const data = await res.json();
        const scored = data.map((nft: { id: number; traits: Record<string, string> }) => ({
          id: nft.id,
          traits: nft.traits,
          rarityScore: calculateRarityScore(nft.traits),
        }));
        setAllNfts(scored);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load manifest:", err);
        setLoading(false);
      }
    }
    loadManifest();
  }, []);

  const filteredNfts = useMemo(() => {
    let result = allNfts;

    // Apply trait filters
    for (const [category, value] of Object.entries(filters)) {
      if (value) {
        result = result.filter((nft) => nft.traits[category] === value);
      }
    }

    // Apply ID search
    if (searchId) {
      const id = parseInt(searchId, 10);
      if (!isNaN(id)) {
        result = result.filter((nft) => nft.id === id);
      }
    }

    // Sort
    if (sortBy === "rarity") {
      result = [...result].sort((a, b) => b.rarityScore - a.rarityScore);
    } else {
      result = [...result].sort((a, b) => a.id - b.id);
    }

    return result;
  }, [allNfts, filters, sortBy, searchId]);

  const totalPages = Math.ceil(filteredNfts.length / ITEMS_PER_PAGE);
  const paginatedNfts = filteredNfts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const getTraitOptions = (category: string): string[] => {
    return Object.keys(TRAIT_WEIGHTS[category] || {});
  };

  const clearFilters = () => {
    setFilters({});
    setSearchId("");
    setPage(1);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length + (searchId ? 1 : 0);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <RobotLoader text="Loading collection..." />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Collection</h1>
            <p className="mt-1 text-gray-500">
              {filteredNfts.length} of 1,000 DeClaws
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="w-64">
              <SearchBar />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "id" | "rarity")}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="id">Sort by ID</option>
              <option value="rarity">Sort by Rarity</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-xl bg-gray-50 p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">Filter by Traits</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const randomCategory = TRAIT_CATEGORIES[Math.floor(Math.random() * TRAIT_CATEGORIES.length)];
                  const options = getTraitOptions(randomCategory);
                  const randomTrait = options[Math.floor(Math.random() * options.length)];
                  setFilters({ [randomCategory]: randomTrait });
                  setPage(1);
                }}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                🎲 Surprise me
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {TRAIT_CATEGORIES.map((category) => (
              <div key={category}>
                <label className="block text-xs text-gray-500 mb-1">{category}</label>
                <select
                  value={filters[category] || ""}
                  onChange={(e) => {
                    setFilters((prev) => ({ ...prev, [category]: e.target.value }));
                    setPage(1);
                  }}
                  className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">All</option>
                  {getTraitOptions(category).map((trait) => (
                    <option key={trait} value={trait}>
                      {trait}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {paginatedNfts.length === 0 ? (
          <div className="mt-12 text-center py-16">
            <p className="text-gray-500">No DeClaws match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-emerald-600 hover:text-emerald-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {paginatedNfts.map((nft) => {
                const tier = getRarityTier(nft.rarityScore);
                return (
                  <Link
                    key={nft.id}
                    href={`/declaw/${nft.id}`}
                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-square bg-gray-100">
                      <img
                        src={imageUrl(nft.id)}
                        alt={`DeClaw #${nft.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${nft.id}</text></svg>`;
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">#{nft.id}</span>
                        <span className={`text-xs font-medium ${tier.color}`}>
                          {tier.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Score: {nft.rarityScore}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← Prev
                </button>
                <span className="px-4 text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
