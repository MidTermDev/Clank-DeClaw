"use client";

import { useState } from "react";

export default function ShareCollection() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = "https://declaws.com";
    const text = "Check out DeClaw — 1,000 claw-machine robot NFTs on Solana, fully open source 🤖";

    if (navigator.share) {
      try {
        await navigator.share({ title: "DeClaw", text, url });
        return;
      } catch {
        // Fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = `${text} ${url}`;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        copied
          ? "bg-emerald-100 text-emerald-700"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {copied ? "✓ Copied!" : "🔗 Share Collection"}
    </button>
  );
}
