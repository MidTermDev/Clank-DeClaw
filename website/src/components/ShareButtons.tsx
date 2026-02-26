"use client";

import { useState } from "react";
import { imageUrl as getImageUrl } from "@/lib/constants";

interface ShareButtonsProps {
  nftId: number;
}

export default function ShareButtons({ nftId }: ShareButtonsProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = `https://declaws.com/declaw/${nftId}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const imgUrl = getImageUrl(nftId);
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `DeClaw-${nftId}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
    }
    setDownloading(false);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=Check out DeClaw %23${nftId} 🤖&url=${encodeURIComponent(url)}&via=ClankDeClaw`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-w-[100px] rounded-xl bg-black p-3 text-center text-sm font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Share on X
      </a>
      <button
        onClick={copyLink}
        className={`flex-1 min-w-[100px] rounded-xl p-3 text-center text-sm font-medium transition-colors ${
          copied 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {copied ? "✓ Copied!" : "Copy Link"}
      </button>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex-1 min-w-[100px] rounded-xl bg-emerald-100 p-3 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-200 transition-colors disabled:opacity-50"
      >
        {downloading ? "..." : "⬇ Download"}
      </button>
    </div>
  );
}
