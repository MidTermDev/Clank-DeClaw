import { ReactNode } from "react";

interface CenterProps {
  children: ReactNode;
  className?: string;
}

export default function Center({ children, className = "" }: CenterProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
