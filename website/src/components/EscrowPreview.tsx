"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchEscrowNfts, type DasAsset } from "@/lib/das";
import { imageUrl } from "@/lib/constants";

export default function EscrowPreview() {
  const [previewNfts, setPreviewNfts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreview() {
      try {
        const nfts = await fetchEscrowNfts();
        // Pick 5 random NFTs from escrow
        const shuffled = [...nfts].sort(() => Math.random() - 0.5);
        const ids = shuffled.slice(0, 5).map((nft) => {
          const match = nft.content.metadata.name.match(/#(\d+)/);
          return match ? parseInt(match[1]) : 0;
        });
        setPreviewNfts(ids);
      } catch (err) {
        console.error("Failed to load escrow preview:", err);
      }
      setLoading(false);
    }
    loadPreview();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-12 h-12 rounded-lg bg-white/10 animate-pulse" />
        ))}
      </div>
    );
  }

  if (previewNfts.length === 0) return null;

  return (
    <div className="mt-6">
      <p className="text-xs text-gray-400 mb-2">Some robots waiting in the claw machine:</p>
      <div className="flex gap-2">
        {previewNfts.map((id) => (
          <Link
            key={id}
            href={`/declaw/${id}`}
            className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 hover:border-white/50 transition-colors"
          >
            <img
              src={imageUrl(id)}
              alt={`DeClaw #${id}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23374151" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%239ca3af">%23${id}</text></svg>`;
              }}
            />
          </Link>
        ))}
        <span className="flex items-center text-xs text-gray-500 ml-2">
          + {995 - previewNfts.length} more
        </span>
      </div>
    </div>
  );
}
