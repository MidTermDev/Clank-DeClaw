import { getTraitIcon } from "@/lib/traitIcons";

interface TraitBadgeProps {
  category: string;
  value: string;
  rarity?: number;
  className?: string;
}

export default function TraitBadge({ category, value, rarity, className = "" }: TraitBadgeProps) {
  const icon = getTraitIcon(category);
  
  // Color based on rarity
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";
  
  if (rarity !== undefined) {
    if (rarity <= 2) {
      bgColor = "bg-amber-100";
      textColor = "text-amber-800";
    } else if (rarity <= 5) {
      bgColor = "bg-purple-100";
      textColor = "text-purple-800";
    } else if (rarity <= 10) {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${bgColor} px-3 py-1 text-sm font-medium ${textColor} ${className}`}>
      <span>{icon}</span>
      <span>{value}</span>
      {rarity !== undefined && (
        <span className="text-xs opacity-70">({rarity.toFixed(0)}%)</span>
      )}
    </span>
  );
}
