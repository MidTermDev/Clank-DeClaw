"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { imageUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier } from "@/lib/rarity";

interface NftData {
  id: number;
  traits: Record<string, string>;
}

function getDailyNftId(): number {
  // Deterministic "random" based on date
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % 1000;
}

export default function NftOfTheDay() {
  const [nft, setNft] = useState<NftData | null>(null);
  const dailyId = getDailyNftId();

  useEffect(() => {
    async function loadNft() {
      try {
        const res = await fetch("/trait-manifest.json");
        const manifest = await res.json();
        const found = manifest.find((n: NftData) => n.id === dailyId);
        if (found) setNft(found);
      } catch (err) {
        console.error("Failed to load NFT of the day:", err);
      }
    }
    loadNft();
  }, [dailyId]);

  if (!nft) return null;

  const rarityScore = calculateRarityScore(nft.traits);
  const tier = getRarityTier(rarityScore);

  return (
    <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 relative overflow-hidden">
      {/* Animated sparkles */}
      <div className="absolute top-2 right-8 text-amber-400 animate-pulse">✦</div>
      <div className="absolute top-6 right-4 text-amber-300 animate-pulse" style={{ animationDelay: '0.5s' }}>✧</div>
      <div className="absolute bottom-4 right-12 text-amber-400 animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg animate-bounce">⭐</span>
        <h3 className="font-semibold text-amber-900">NFT of the Day</h3>
      </div>
      <Link href={`/declaw/${nft.id}`} className="flex items-center gap-4 group">
        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-colors">
          <img
            src={imageUrl(nft.id)}
            alt={`DeClaw #${nft.id}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-gray-900">DeClaw #{nft.id}</p>
          <p className={`text-sm ${tier.color}`}>{tier.label}</p>
          <p className="text-xs text-gray-500 mt-1">Click to view →</p>
        </div>
      </Link>
    </div>
  );
}
