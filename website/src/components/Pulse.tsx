"use client";

interface PulseProps {
  color?: "green" | "red" | "yellow" | "blue";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colors = {
  green: "bg-emerald-500",
  red: "bg-red-500",
  yellow: "bg-amber-500",
  blue: "bg-blue-500",
};

const sizes = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

export default function Pulse({
  color = "green",
  size = "md",
  className = "",
}: PulseProps) {
  return (
    <span className={`relative flex ${sizes[size]} ${className}`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[color]} opacity-75`}
      />
      <span
        className={`relative inline-flex rounded-full ${sizes[size]} ${colors[color]}`}
      />
    </span>
  );
}
