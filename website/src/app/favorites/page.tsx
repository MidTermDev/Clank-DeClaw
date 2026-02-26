"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { imageUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier, TRAIT_WEIGHTS } from "@/lib/rarity";
import ShareCollection from "@/components/ShareCollection";

interface FavoriteNft {
  id: number;
  traits: Record<string, string>;
  rarityScore: number;
}

type SortOption = "added" | "id" | "rarity-high" | "rarity-low";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteNft[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<SortOption>("added");

  useEffect(() => {
    setMounted(true);
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const ids = getFavorites();
    if (ids.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/trait-manifest.json");
      const manifest = await res.json();

      const favNfts = ids.map((id) => {
        const nft = manifest.find((n: { id: number }) => n.id === id);
        if (!nft) return null;
        return {
          id: nft.id,
          traits: nft.traits,
          rarityScore: calculateRarityScore(nft.traits),
        };
      }).filter(Boolean) as FavoriteNft[];

      setFavorites(favNfts);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
    setLoading(false);
  };

  const handleRemove = (id: number) => {
    removeFavorite(id);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sort) {
      case "id":
        return a.id - b.id;
      case "rarity-high":
        return b.rarityScore - a.rarityScore;
      case "rarity-low":
        return a.rarityScore - b.rarityScore;
      default:
        return 0; // Keep original order (order added)
    }
  });

  if (!mounted) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your <span className="text-gradient">Favorites</span>
              </h1>
              <p className="mt-1 text-gray-500">
                {favorites.length} saved DeClaw{favorites.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {favorites.length > 0 && (
            <div className="flex items-center gap-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-emerald-500 focus:outline-none"
              >
                <option value="added">Order Added</option>
                <option value="id">ID (Low → High)</option>
                <option value="rarity-high">Rarest First</option>
                <option value="rarity-low">Common First</option>
              </select>
              <Link
                href="/compare"
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Compare →
              </Link>
              <ShareCollection nftIds={favorites.map(f => f.id)} title="My Favorites" />
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center py-16">
            <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl bg-gradient-to-br from-pink-50 to-red-50 border border-pink-100">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <span className="text-4xl animate-pulse">💔</span>
            </div>
            <p className="text-xl font-semibold text-gray-800">No favorites yet</p>
            <p className="mt-2 text-gray-500 max-w-xs mx-auto">
              Explore the collection and click the heart icon on any DeClaw to save it here
            </p>
            <Link
              href="/browse"
              className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedFavorites.map((nft) => {
              const tier = getRarityTier(nft.rarityScore);
              return (
                <div
                  key={nft.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all"
                >
                  <Link href={`/declaw/${nft.id}`}>
                    <div className="aspect-square bg-gray-50">
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
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemove(nft.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                    title="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
