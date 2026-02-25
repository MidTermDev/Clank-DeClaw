"use client";

import { useState } from "react";

interface CopyFeedbackProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export default function CopyFeedback({ text, children, className = "" }: CopyFeedbackProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative ${className}`}
    >
      {children}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs text-white animate-bounce-in">
          Copied!
        </span>
      )}
    </button>
  );
}
