"use client";

import SwapPanel from "./SwapPanel";

export default function SwapSection() {
  return (
    <section className="mx-auto max-w-lg px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900">Swap</h2>
      <p className="mt-2 text-gray-500">
        Trade between CLAW tokens and DeClaw NFTs
      </p>
      <div className="mt-8">
        <SwapPanel />
      </div>
    </section>
  );
}
