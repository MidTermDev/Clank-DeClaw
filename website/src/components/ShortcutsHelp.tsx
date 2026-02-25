"use client";

import { useState, useEffect } from "react";

const SHORTCUTS = [
  { key: "B", action: "Browse collection" },
  { key: "F", action: "View favorites" },
  { key: "C", action: "Compare NFTs" },
  { key: "R", action: "Rarity explorer" },
  { key: "H", action: "Go home" },
  { key: "/", action: "Search" },
  { key: "?", action: "Show this help" },
  { key: "← →", action: "Navigate NFTs" },
  { key: "Esc", action: "Close modals" },
];

export default function ShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.target?.toString().includes("Input")) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>⌨️</span>
            Keyboard Shortcuts
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            {SHORTCUTS.map(({ key, action }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-600">{action}</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-mono text-gray-800">
                  {key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
