"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { imageUrl } from "@/lib/constants";
import { calculateRarityScore, getRarityTier, getTraitRarity } from "@/lib/rarity";
import { getTraitIcon } from "@/lib/traitIcons";
import traitManifest from "../../public/trait-manifest.json";

interface QuickViewProps {
  nftId: number;
  onClose: () => void;
}

export default function QuickView({ nftId, onClose }: QuickViewProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const nft = (traitManifest as Array<{ id: number; traits: Record<string, string> }>)
    .find((n) => n.id === nftId);
  
  if (!nft) return null;

  const traits = nft.traits;
  const rarityScore = calculateRarityScore(traits);
  const tier = getRarityTier(rarityScore);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        isVisible ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">DeClaw #{nftId}</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100">
              <img
                src={imageUrl(nftId)}
                alt={`DeClaw #${nftId}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${nftId}</text></svg>`;
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ${tier.bgColor}`}>
                <span className={`font-semibold ${tier.color}`}>{tier.label}</span>
                <span className="text-sm text-gray-500">Score: {rarityScore}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {Object.entries(traits).slice(0, 4).map(([traitType, value]) => {
                  const rarity = getTraitRarity(traitType, value as string);
                  return (
                    <div key={traitType} className="text-xs">
                      <span className="text-gray-400">{getTraitIcon(traitType)} {traitType}</span>
                      <p className="font-medium text-gray-700 truncate">{value as string}</p>
                      <p className="text-gray-400">{rarity.percentage.toFixed(0)}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* All traits */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">All Traits</p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(traits).map(([traitType, value]) => (
                <span
                  key={traitType}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  {value as string}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-gray-100 bg-gray-50">
          <Link
            href={`/declaw/${nftId}`}
            className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            View Full Details
          </Link>
          <Link
            href={`/compare?nfts=${nftId}`}
            className="rounded-lg bg-purple-100 px-4 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-200 transition-colors"
          >
            Compare
          </Link>
          <button
            onClick={() => {
              const url = `https://declaws.com/declaw/${nftId}`;
              navigator.clipboard.writeText(url);
            }}
            className="rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
