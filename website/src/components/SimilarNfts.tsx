"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { imageUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier, TRAIT_WEIGHTS } from "@/lib/rarity";

interface SimilarNftsProps {
  currentId: number;
  traits: Record<string, string>;
}

interface NftMatch {
  id: number;
  matchingTraits: string[];
  rarityScore: number;
}

export default function SimilarNfts({ currentId, traits }: SimilarNftsProps) {
  const [similar, setSimilar] = useState<NftMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function findSimilar() {
      try {
        const res = await fetch("/trait-manifest.json");
        const manifest: Array<{ id: number; traits: Record<string, string> }> = await res.json();

        // Find NFTs that share the rarest traits
        const currentRareTraits = Object.entries(traits)
          .filter(([cat, val]) => {
            const weight = TRAIT_WEIGHTS[cat]?.[val] || 10;
            return weight <= 8; // Only consider rare traits (weight 8 or less)
          })
          .map(([cat]) => cat);

        if (currentRareTraits.length === 0) {
          // If no rare traits, just pick some with same common traits
          const matches = manifest
            .filter((n) => n.id !== currentId)
            .map((n) => {
              const matching = Object.entries(n.traits)
                .filter(([cat, val]) => traits[cat] === val)
                .map(([cat]) => cat);
              return {
                id: n.id,
                matchingTraits: matching,
                rarityScore: calculateRarityScore(n.traits),
              };
            })
            .filter((n) => n.matchingTraits.length >= 2)
            .sort((a, b) => b.matchingTraits.length - a.matchingTraits.length)
            .slice(0, 4);

          setSimilar(matches);
        } else {
          // Find NFTs with matching rare traits
          const matches = manifest
            .filter((n) => n.id !== currentId)
            .map((n) => {
              const matching = currentRareTraits.filter(
                (cat) => n.traits[cat] === traits[cat]
              );
              return {
                id: n.id,
                matchingTraits: matching,
                rarityScore: calculateRarityScore(n.traits),
              };
            })
            .filter((n) => n.matchingTraits.length > 0)
            .sort((a, b) => {
              // Sort by number of matching traits, then by rarity
              if (b.matchingTraits.length !== a.matchingTraits.length) {
                return b.matchingTraits.length - a.matchingTraits.length;
              }
              return b.rarityScore - a.rarityScore;
            })
            .slice(0, 4);

          setSimilar(matches);
        }
      } catch (err) {
        console.error("Failed to load similar NFTs:", err);
      }
      setLoading(false);
    }

    if (Object.keys(traits).length > 0) {
      findSimilar();
    }
  }, [currentId, traits]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Similar DeClaws</h2>
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (similar.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Similar DeClaws</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {similar.map((nft) => {
          const tier = getRarityTier(nft.rarityScore);
          return (
            <Link
              key={nft.id}
              href={`/declaw/${nft.id}`}
              className="group rounded-lg border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="aspect-square bg-gray-50">
                <img
                  src={imageUrl(nft.id)}
                  alt={`DeClaw #${nft.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">#{nft.id}</span>
                  <span className={`text-xs ${tier.color}`}>{tier.label}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {nft.matchingTraits.length} shared trait{nft.matchingTraits.length !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
