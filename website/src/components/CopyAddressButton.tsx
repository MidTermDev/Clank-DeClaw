"use client";

import { useState } from "react";

interface CopyAddressButtonProps {
  address: string;
  label?: string;
}

export default function CopyAddressButton({ address, label = "Copy Address" }: CopyAddressButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = address;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center justify-between rounded-xl p-4 border transition-colors w-full ${
        copied 
          ? "bg-emerald-50 border-emerald-200" 
          : "bg-gray-50 border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${copied ? "text-emerald-700" : "text-gray-900"}`}>
          {copied ? "✓ Copied!" : label}
        </span>
        <span className="text-xs text-gray-400 font-mono">{shortAddress}</span>
      </div>
      <span className={copied ? "text-emerald-400" : "text-gray-400"}>📋</span>
    </button>
  );
}
