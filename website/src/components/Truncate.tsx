import { ReactNode } from "react";

interface TruncateProps {
  children: ReactNode;
  lines?: number;
  className?: string;
}

export default function Truncate({
  children,
  lines = 1,
  className = "",
}: TruncateProps) {
  if (lines === 1) {
    return (
      <span className={`block truncate ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={`block overflow-hidden ${className}`}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
      }}
    >
      {children}
    </span>
  );
}
