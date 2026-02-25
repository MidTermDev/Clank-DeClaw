import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

const styles = {
  1: "text-4xl font-bold text-gray-900",
  2: "text-3xl font-bold text-gray-900",
  3: "text-2xl font-semibold text-gray-900",
  4: "text-xl font-semibold text-gray-900",
};

export default function Heading({ children, level = 2, className = "" }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
}
