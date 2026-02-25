import { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  gap?: "none" | "sm" | "md" | "lg";
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  className?: string;
}

const gaps = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const directions = {
  row: "flex-row",
  col: "flex-col",
};

const aligns = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifies = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export default function Stack({
  children,
  gap = "md",
  direction = "col",
  align = "stretch",
  justify = "start",
  className = "",
}: StackProps) {
  return (
    <div className={`flex ${directions[direction]} ${gaps[gap]} ${aligns[align]} ${justifies[justify]} ${className}`}>
      {children}
    </div>
  );
}
