import { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  color?: "emerald" | "purple" | "blue" | "amber" | "pink";
  className?: string;
}

const colors = {
  emerald: "bg-emerald-100 text-emerald-800",
  purple: "bg-purple-100 text-purple-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  pink: "bg-pink-100 text-pink-800",
};

export default function Highlight({
  children,
  color = "emerald",
  className = "",
}: HighlightProps) {
  return (
    <mark className={`px-1 rounded ${colors[color]} ${className}`}>
      {children}
    </mark>
  );
}
