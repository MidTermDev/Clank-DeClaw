interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "default" | "white" | "emerald";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

const colors = {
  default: "border-gray-300 border-t-gray-600",
  white: "border-white/30 border-t-white",
  emerald: "border-emerald-200 border-t-emerald-500",
};

export default function Spinner({ size = "md", color = "default", className = "" }: SpinnerProps) {
  return (
    <div 
      className={`rounded-full animate-spin ${sizes[size]} ${colors[color]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
