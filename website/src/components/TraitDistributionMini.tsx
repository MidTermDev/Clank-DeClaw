interface TraitDistributionMiniProps {
  percentage: number;
  label?: string;
}

export default function TraitDistributionMini({ percentage, label }: TraitDistributionMiniProps) {
  // Color based on rarity
  let barColor = "bg-gray-400";
  if (percentage <= 2) {
    barColor = "bg-amber-500";
  } else if (percentage <= 5) {
    barColor = "bg-purple-500";
  } else if (percentage <= 10) {
    barColor = "bg-blue-500";
  } else if (percentage <= 20) {
    barColor = "bg-emerald-500";
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage * 5, 100)}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-12 text-right">
        {percentage.toFixed(1)}%
      </span>
    </div>
  );
}
