"use client";

import SwapPanel from "./SwapPanel";
import EscrowStats from "./EscrowStats";
import EscrowPreview from "./EscrowPreview";
import RarityBreakdown from "./RarityBreakdown";

export default function SwapSection() {
  return (
    <section id="swap" className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-sm font-medium text-emerald-400">Swap is Live</span>
          </div>
          <h2 className="text-4xl font-bold text-white">The Claw Machine</h2>
          <p className="mt-3 text-lg text-gray-400 max-w-xl mx-auto">
            Insert DeClaws tokens, try your luck. Every capture is random — will you get a rare one?
          </p>
        </div>

        {/* Main swap area */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Swap Panel */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <SwapPanel />
          </div>

          {/* Right: Info + Stats */}
          <div className="space-y-6">
            {/* How it works */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-semibold text-white mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-300 text-sm">Connect your Solana wallet</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-300 text-sm">Pay 1,000,000 DeClaws tokens to capture a random NFT</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-300 text-sm">Or release an NFT to get your tokens back anytime</p>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-semibold text-white mb-4">Live Escrow Stats</h3>
              <EscrowStats dark />
            </div>

            {/* Rarity breakdown */}
            <RarityBreakdown />

            {/* Token info */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-300">Need DeClaws tokens?</p>
                  <p className="text-xs text-emerald-400/70 mt-1">Trade on Jupiter or Raydium</p>
                </div>
                <a
                  href="https://jup.ag/swap/SOL-b2kxZYNewjsogqkF8RoR5MF9SXYEfpkyMmvvXpfCLAW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  Get DeClaws →
                </a>
              </div>
            </div>

            {/* Escrow preview */}
            <EscrowPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
