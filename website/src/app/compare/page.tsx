"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IPFS_GATEWAY, IMAGES_CID, metadataUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier, getTraitRarity } from "@/lib/rarity";

interface NftData {
  id: number;
  name: string;
  attributes: Array<{ trait_type: string; value: string }>;
  rarityScore: number;
}

export default function ComparePage() {
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");
  const [leftNft, setLeftNft] = useState<NftData | null>(null);
  const [rightNft, setRightNft] = useState<NftData | null>(null);
  const [loading, setLoading] = useState({ left: false, right: false });

  const loadNft = async (id: string, side: "left" | "right") => {
    const num = parseInt(id, 10);
    if (isNaN(num) || num < 0 || num > 999) return;

    setLoading((prev) => ({ ...prev, [side]: true }));

    try {
      const res = await fetch(metadataUrl(num));
      const data = await res.json();
      const traits: Record<string, string> = {};
      for (const attr of data.attributes || []) {
        traits[attr.trait_type] = attr.value;
      }
      const nft: NftData = {
        id: num,
        name: data.name,
        attributes: data.attributes || [],
        rarityScore: calculateRarityScore(traits),
      };
      if (side === "left") setLeftNft(nft);
      else setRightNft(nft);
    } catch (err) {
      console.error("Failed to load NFT:", err);
    }

    setLoading((prev) => ({ ...prev, [side]: false }));
  };

  const loadRandom = (side: "left" | "right") => {
    const randomId = Math.floor(Math.random() * 1000).toString();
    if (side === "left") {
      setLeftId(randomId);
      loadNft(randomId, "left");
    } else {
      setRightId(randomId);
      loadNft(randomId, "right");
    }
  };

  const NftCard = ({ nft, loading: isLoading }: { nft: NftData | null; loading: boolean }) => {
    if (isLoading) {
      return (
        <div className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-xl" />
          <div className="mt-4 h-6 bg-gray-200 rounded w-1/2" />
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/3" />
        </div>
      );
    }

    if (!nft) {
      return (
        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          Enter an ID above
        </div>
      );
    }

    const tier = getRarityTier(nft.rarityScore);

    return (
      <div>
        <Link href={`/declaw/${nft.id}`}>
          <img
            src={`${IPFS_GATEWAY}/${IMAGES_CID}/${nft.id}.png`}
            alt={nft.name}
            className="aspect-square w-full rounded-xl object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">#{nft.id}</h3>
            <span className={`font-semibold ${tier.color}`}>{tier.label}</span>
          </div>
          <p className="text-sm text-gray-500">Score: {nft.rarityScore}</p>
        </div>
        <div className="mt-4 space-y-2">
          {nft.attributes.map((attr) => {
            const rarity = getTraitRarity(attr.trait_type, attr.value);
            return (
              <div
                key={attr.trait_type}
                className="flex items-center justify-between text-sm rounded-lg bg-gray-50 px-3 py-2"
              >
                <span className="text-gray-500">{attr.trait_type}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{attr.value}</span>
                  <span className="text-xs text-gray-400">{rarity.percentage.toFixed(0)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-purple-100 mb-4">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Compare <span className="text-gradient">DeClaws</span>
          </h1>
          <p className="mt-2 text-gray-500">
            Put two robots side by side to compare traits and rarity
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={leftId}
                onChange={(e) => setLeftId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadNft(leftId, "left")}
                placeholder="Enter ID (0-999)"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => loadNft(leftId, "left")}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Load
              </button>
              <button
                onClick={() => loadRandom("left")}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
              >
                🎲
              </button>
            </div>
            <NftCard nft={leftNft} loading={loading.left} />
          </div>

          {/* Right */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={rightId}
                onChange={(e) => setRightId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadNft(rightId, "right")}
                placeholder="Enter ID (0-999)"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <button
                onClick={() => loadNft(rightId, "right")}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Load
              </button>
              <button
                onClick={() => loadRandom("right")}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
              >
                🎲
              </button>
            </div>
            <NftCard nft={rightNft} loading={loading.right} />
          </div>
        </div>

        {/* Comparison summary */}
        {leftNft && rightNft && (
          <div className="mt-12 rounded-xl bg-gray-50 p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Comparison</h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-white p-4 border border-gray-100">
                <p className="text-sm text-gray-500">Rarer Robot</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  #{leftNft.rarityScore > rightNft.rarityScore ? leftNft.id : rightNft.id}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-gray-100">
                <p className="text-sm text-gray-500">Score Difference</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.abs(leftNft.rarityScore - rightNft.rarityScore)} pts
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-gray-100">
                <p className="text-sm text-gray-500">Shared Traits</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {leftNft.attributes.filter(
                    (la) => rightNft.attributes.some(
                      (ra) => ra.trait_type === la.trait_type && ra.value === la.value
                    )
                  ).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
