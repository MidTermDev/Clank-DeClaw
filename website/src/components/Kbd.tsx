import { ReactNode } from "react";

interface KbdProps {
  children: ReactNode;
  className?: string;
}

export default function Kbd({ children, className = "" }: KbdProps) {
  return (
    <kbd
      className={`inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm ${className}`}
    >
      {children}
    </kbd>
  );
}
