"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TAGLINES = [
  "Insert tokens. Try your luck.",
  "Every robot wants to escape.",
  "The claw chooses who it releases.",
  "1,000,000 DeClaws. One chance.",
  "Provably fair. Randomly captured.",
];

export default function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const goToRandom = () => {
    const randomId = Math.floor(Math.random() * 1000);
    router.push(`/declaw/${randomId}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-emerald-700">Live on Solana Mainnet</span>
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
          De<span className="text-emerald-600">Claw</span>
        </h1>
        
        <p className="mt-4 text-xl text-gray-500 sm:text-2xl">
          1,000 Claw-Machine Robot PFPs
        </p>
        
        <p
          className={`mt-4 h-6 text-base font-medium text-emerald-600 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {TAGLINES[taglineIndex]}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <span className="text-gray-500">Supply</span>
            <span className="font-mono font-bold text-gray-900">1,000</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <span className="text-gray-500">Traits</span>
            <span className="font-mono font-bold text-gray-900">65</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <span className="text-gray-500">Swap Rate</span>
            <span className="font-mono font-bold text-gray-900">1M DeClaws</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#swap"
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-gray-800 hover:shadow-lg transition-all"
          >
            🎰 Try the Claw Machine
          </a>
          <button
            onClick={goToRandom}
            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all"
          >
            🎲 Random DeClaw
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          MPL-404 hybrid bridge &mdash; swap between tokens and NFTs, anytime
        </p>
      </div>
    </section>
  );
}
