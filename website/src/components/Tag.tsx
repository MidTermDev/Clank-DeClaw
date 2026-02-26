import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "solid" | "outline";
  color?: "gray" | "emerald" | "purple" | "blue" | "amber" | "red";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const solidColors = {
  gray: "bg-gray-100 text-gray-700",
  emerald: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

const outlineColors = {
  gray: "border-gray-300 text-gray-700",
  emerald: "border-emerald-300 text-emerald-700",
  purple: "border-purple-300 text-purple-700",
  blue: "border-blue-300 text-blue-700",
  amber: "border-amber-300 text-amber-700",
  red: "border-red-300 text-red-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Tag({
  children,
  variant = "solid",
  color = "gray",
  size = "sm",
  removable = false,
  onRemove,
  className = "",
}: TagProps) {
  const colorClass = variant === "solid" ? solidColors[color] : `border ${outlineColors[color]}`;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${colorClass} ${sizes[size]} ${className}`}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      )}
    </span>
  );
}
