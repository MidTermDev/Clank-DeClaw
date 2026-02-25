"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IPFS_GATEWAY, IMAGES_CID } from "@/lib/constants";
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
    <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">⭐</span>
        <h3 className="font-semibold text-amber-900">NFT of the Day</h3>
      </div>
      <Link href={`/declaw/${nft.id}`} className="flex items-center gap-4 group">
        <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-amber-200 group-hover:border-amber-400 transition-colors">
          <img
            src={`${IPFS_GATEWAY}/${IMAGES_CID}/${nft.id}.png`}
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
