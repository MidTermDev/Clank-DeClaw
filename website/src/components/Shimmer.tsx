"use client";

interface ShimmerProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export default function Shimmer({
  width = "100%",
  height = "1rem",
  className = "",
  rounded = "md",
}: ShimmerProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  );
}

export function ShimmerCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white p-4 ${className}`}>
      <Shimmer height="150px" rounded="lg" className="mb-4" />
      <Shimmer width="60%" height="1.25rem" className="mb-2" />
      <Shimmer width="40%" height="0.875rem" />
    </div>
  );
}

export function ShimmerText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          width={i === lines - 1 ? "70%" : "100%"}
          height="0.875rem"
        />
      ))}
    </div>
  );
}
