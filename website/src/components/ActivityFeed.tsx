"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { imageUrl } from "@/lib/constants";

interface Activity {
  id: string;
  type: "capture" | "release";
  nftId: number;
  wallet: string;
  timestamp: Date;
}

// Generate realistic-looking activity
function generateMockActivity(): Activity[] {
  const activities: Activity[] = [];
  const now = Date.now();
  
  // Generate 10 random activities from the past 24 hours
  for (let i = 0; i < 10; i++) {
    const hoursAgo = Math.random() * 24;
    const nftId = Math.floor(Math.random() * 1000);
    const walletChars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let wallet = "";
    for (let j = 0; j < 44; j++) {
      wallet += walletChars[Math.floor(Math.random() * walletChars.length)];
    }
    
    activities.push({
      id: `${i}-${nftId}`,
      type: Math.random() > 0.4 ? "capture" : "release",
      nftId,
      wallet,
      timestamp: new Date(now - hoursAgo * 60 * 60 * 1000),
    });
  }
  
  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function shortenWallet(wallet: string): string {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActivities(generateMockActivity());
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-2 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {activities.slice(0, 6).map((activity) => (
        <Link
          key={activity.id}
          href={`/declaw/${activity.nftId}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
            <img
              src={imageUrl(activity.nftId)}
              alt={`DeClaw #${activity.nftId}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="%23e5e7eb" width="512" height="512"/><text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="48" fill="%236b7280">%23${activity.nftId}</text></svg>`;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                activity.type === "capture" 
                  ? "bg-emerald-100 text-emerald-700" 
                  : "bg-amber-100 text-amber-700"
              }`}>
                {activity.type === "capture" ? "🎰 Captured" : "🔓 Released"}
              </span>
              <span className="text-sm font-medium text-gray-900">#{activity.nftId}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400 font-mono">{shortenWallet(activity.wallet)}</span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-400">{formatTimeAgo(activity.timestamp)}</span>
            </div>
          </div>
          <span className="text-gray-300 group-hover:text-gray-400 transition-colors">→</span>
        </Link>
      ))}
      <div className="text-center pt-2">
        <Link href="/stats" className="text-sm text-emerald-600 hover:text-emerald-700">
          View all activity →
        </Link>
      </div>
    </div>
  );
}
