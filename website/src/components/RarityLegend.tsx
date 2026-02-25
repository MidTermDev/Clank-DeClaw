const TIERS = [
  { name: "Legendary", color: "bg-amber-500", range: "150+" },
  { name: "Epic", color: "bg-purple-500", range: "120-149" },
  { name: "Rare", color: "bg-blue-500", range: "100-119" },
  { name: "Uncommon", color: "bg-emerald-500", range: "80-99" },
  { name: "Common", color: "bg-gray-400", range: "<80" },
];

export default function RarityLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {TIERS.map(({ name, color, range }) => (
        <div key={name} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <span className="text-sm text-gray-600">
            {name} <span className="text-gray-400">({range})</span>
          </span>
        </div>
      ))}
    </div>
  );
}
