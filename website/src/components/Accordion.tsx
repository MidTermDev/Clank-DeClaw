"use client";

import { useState, ReactNode } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export default function Accordion({ items, className = "" }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={`divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              <span className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                ↓
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-sm text-gray-600">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
