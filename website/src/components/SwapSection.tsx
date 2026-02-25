"use client";

import SwapPanel from "./SwapPanel";
import EscrowStats from "./EscrowStats";

export default function SwapSection() {
  return (
    <section className="mx-auto max-w-lg px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Swap</h2>
      <p className="mt-2 text-gray-500">
        Trade between DeClaws tokens and DeClaw NFTs
      </p>
      
      {/* Live Escrow Stats */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
          Live Escrow Stats
        </p>
        <EscrowStats />
      </div>

      <div className="mt-8">
        <SwapPanel />
      </div>
    </section>
  );
}
