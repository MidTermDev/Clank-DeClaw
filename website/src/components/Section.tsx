import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  bg?: "white" | "gray" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

const bgs = {
  white: "bg-white",
  gray: "bg-gray-50",
  dark: "bg-gray-900 text-white",
};

const paddings = {
  none: "",
  sm: "py-8",
  md: "py-16",
  lg: "py-24",
};

export default function Section({ children, id, bg = "white", padding = "md", className = "" }: SectionProps) {
  return (
    <section id={id} className={`${bgs[bg]} ${paddings[padding]} ${className}`}>
      {children}
    </section>
  );
}
