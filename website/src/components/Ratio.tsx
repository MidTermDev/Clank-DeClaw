import { ReactNode } from "react";

interface RatioProps {
  ratio?: number;
  children: ReactNode;
  className?: string;
}

export default function Ratio({
  ratio = 1,
  children,
  className = "",
}: RatioProps) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
