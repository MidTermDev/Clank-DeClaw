"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function WelcomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show for first-time visitors
    const hasVisited = localStorage.getItem("declaw_visited");
    if (!hasVisited) {
      setShow(true);
      localStorage.setItem("declaw_visited", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-purple-600 text-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-xl">🤖</span>
            <p className="text-sm font-medium">
              Welcome to DeClaw! 1,000 claw-machine robots on Solana.
              <span className="hidden sm:inline"> Try your luck at the claw machine.</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/#swap"
              className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Try the Claw
            </Link>
            <button
              onClick={() => setShow(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
