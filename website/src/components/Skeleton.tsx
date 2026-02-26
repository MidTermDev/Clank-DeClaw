interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const defaultHeight = variant === "text" ? "1em" : undefined;

  return (
    <div
      className={`animate-pulse bg-gray-200 ${variantClasses[variant]} ${className}`}
      style={{
        width: width,
        height: height || defaultHeight,
      }}
    />
  );
}
