"use client";

import { ReactNode } from "react";

interface OverlayProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  blur?: boolean;
  className?: string;
}

export default function Overlay({
  children,
  isOpen,
  onClose,
  blur = true,
  className = "",
}: OverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        blur ? "backdrop-blur-sm" : ""
      } bg-black/50 ${className}`}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
