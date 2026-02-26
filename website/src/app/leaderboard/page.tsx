"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { imageUrl } from "@/lib/constants";
import { fetchEscrowNfts, type DasAsset } from "@/lib/das";

interface Collector {
  wallet: string;
  count: number;
  nfts: number[];
}

// Generate mock leaderboard data based on real wallet patterns
function generateMockLeaderboard(): Collector[] {
  const wallets: Collector[] = [];
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  
  // Generate 20 mock collectors
  for (let i = 0; i < 20; i++) {
    let wallet = "";
    for (let j = 0; j < 44; j++) {
      wallet += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Random number of NFTs (more for top collectors)
    const count = Math.floor(Math.random() * (20 - i)) + 1;
    const nfts: number[] = [];
    for (let k = 0; k < count; k++) {
      nfts.push(Math.floor(Math.random() * 1000));
    }
    
    wallets.push({ wallet, count, nfts: [...new Set(nfts)] });
  }
  
  return wallets.sort((a, b) => b.count - a.count);
}

function shortenWallet(wallet: string): string {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
}

function getRankBadge(rank: number): { emoji: string; bg: string } {
  if (rank === 1) return { emoji: "🥇", bg: "bg-amber-100 text-amber-800" };
  if (rank === 2) return { emoji: "🥈", bg: "bg-gray-100 text-gray-600" };
  if (rank === 3) return { emoji: "🥉", bg: "bg-orange-100 text-orange-700" };
  return { emoji: "", bg: "bg-gray-50 text-gray-500" };
}

export default function LeaderboardPage() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setCollectors(generateMockLeaderboard());
      setLoading(false);
    }, 500);
  }, []);

  const totalCirculating = collectors.reduce((sum, c) => sum + c.count, 0);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
          <p className="mt-2 text-gray-500">Top DeClaw collectors</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-5 text-white text-center">
            <p className="text-emerald-100 text-sm">Total Collectors</p>
            <p className="text-3xl font-bold mt-1">{loading ? "..." : collectors.length}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-5 text-white text-center">
            <p className="text-purple-100 text-sm">NFTs Held</p>
            <p className="text-3xl font-bold mt-1">{loading ? "..." : totalCirculating}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white text-center">
            <p className="text-amber-100 text-sm">Top Holder</p>
            <p className="text-3xl font-bold mt-1">{loading ? "..." : collectors[0]?.count || 0}</p>
          </div>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse rounded-xl bg-gray-100 h-20" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {collectors.map((collector, idx) => {
              const rank = idx + 1;
              const { emoji, bg } = getRankBadge(rank);
              
              return (
                <div
                  key={collector.wallet}
                  className={`rounded-xl border ${rank <= 3 ? "border-amber-200" : "border-gray-100"} bg-white p-4 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center font-bold`}>
                      {emoji || `#${rank}`}
                    </div>

                    {/* Wallet */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm text-gray-900">{shortenWallet(collector.wallet)}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {collector.count} DeClaw{collector.count !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Preview of NFTs */}
                    <div className="hidden sm:flex -space-x-2">
                      {collector.nfts.slice(0, 5).map((nftId) => (
                        <Link
                          key={nftId}
                          href={`/declaw/${nftId}`}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform z-10 hover:z-20"
                        >
                          <img
                            src={imageUrl(nftId)}
                            alt={`#${nftId}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="120" fill="%236b7280">%23</text></svg>`;
                            }}
                          />
                        </Link>
                      ))}
                      {collector.nfts.length > 5 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          +{collector.nfts.length - 5}
                        </div>
                      )}
                    </div>

                    {/* Count badge */}
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                      {collector.count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note */}
        <div className="mt-8 rounded-xl bg-gray-50 border border-gray-100 p-4 text-center text-sm text-gray-500">
          <p>🚧 Live on-chain tracking coming soon</p>
          <p className="mt-1">Currently showing simulated data for demo purposes</p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
          >
            Start Collecting →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
