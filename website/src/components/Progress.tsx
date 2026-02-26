"use client";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "emerald" | "purple" | "blue" | "amber" | "gray";
  showLabel?: boolean;
  className?: string;
}

const sizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const colors = {
  emerald: "bg-emerald-500",
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  gray: "bg-gray-500",
};

export default function Progress({
  value,
  max = 100,
  size = "md",
  color = "emerald",
  showLabel = false,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value.toLocaleString()}</span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`${sizes[size]} ${colors[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
