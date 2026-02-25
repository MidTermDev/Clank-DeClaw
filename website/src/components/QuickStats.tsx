"use client";

import AnimatedNumber from "./AnimatedNumber";

const STATS = [
  { label: "Total NFTs", value: 1000, icon: "🤖" },
  { label: "Trait Variants", value: 65, icon: "🎨" },
  { label: "Categories", value: 8, icon: "📦" },
  { label: "On IPFS", value: 100, suffix: "%", icon: "☁️" },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS.map(({ label, value, icon, suffix }) => (
        <div 
          key={label}
          className="rounded-xl bg-white border border-gray-100 p-4 text-center hover:border-emerald-200 hover:shadow-sm transition-all"
        >
          <div className="text-2xl mb-2">{icon}</div>
          <div className="text-2xl font-bold text-gray-900">
            <AnimatedNumber value={value} />
            {suffix}
          </div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
