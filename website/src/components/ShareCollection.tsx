"use client";

import { useState } from "react";

interface ShareCollectionProps {
  nftIds: number[];
  title?: string;
}

export default function ShareCollection({ nftIds, title = "My DeClaw Collection" }: ShareCollectionProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/compare?nfts=${nftIds.join(",")}`
    : "";

  const shareText = `Check out ${title} (${nftIds.length} DeClaws)`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&via=ClankDeClaw`;
    window.open(url, "_blank");
  };

  if (nftIds.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareToX}
        className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        <span>𝕏</span>
        <span>Share</span>
      </button>
      <button
        onClick={copyLink}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          copied 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {copied ? "✓ Copied!" : "🔗 Copy Link"}
      </button>
    </div>
  );
}
