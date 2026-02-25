"use client";

const RARITY_CHANCES = [
  { tier: "Legendary", chance: "~2%", color: "text-yellow-500", bg: "bg-yellow-500" },
  { tier: "Epic", chance: "~8%", color: "text-purple-500", bg: "bg-purple-500" },
  { tier: "Rare", chance: "~20%", color: "text-blue-500", bg: "bg-blue-500" },
  { tier: "Uncommon", chance: "~30%", color: "text-green-500", bg: "bg-green-500" },
  { tier: "Common", chance: "~40%", color: "text-gray-400", bg: "bg-gray-400" },
];

export default function RarityBreakdown() {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <h4 className="text-xs font-medium text-gray-400 mb-3">Capture Odds</h4>
      <div className="space-y-2">
        {RARITY_CHANCES.map((r) => (
          <div key={r.tier} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${r.bg}`} />
            <span className={`text-xs ${r.color}`}>{r.tier}</span>
            <span className="text-xs text-gray-500 ml-auto">{r.chance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
