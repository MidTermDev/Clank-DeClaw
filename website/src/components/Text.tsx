import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "default" | "muted" | "subtle";
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const colors = {
  default: "text-gray-900",
  muted: "text-gray-600",
  subtle: "text-gray-400",
};

const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export default function Text({ children, size = "md", color = "default", weight = "normal", className = "" }: TextProps) {
  return (
    <p className={`${sizes[size]} ${colors[color]} ${weights[weight]} ${className}`}>
      {children}
    </p>
  );
}
