"use client";

import { useState, useEffect } from "react";

interface SwipeHintProps {
  prevId: number;
  nextId: number;
}

export default function SwipeHint({ prevId, nextId }: SwipeHintProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on mobile
    const isMobile = window.innerWidth < 768;
    const hasSeenHint = localStorage.getItem("declaw_swipe_hint_seen");
    
    if (isMobile && !hasSeenHint) {
      setVisible(true);
      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setDismissed(true);
        localStorage.setItem("declaw_swipe_hint_seen", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div 
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-gray-900 text-white px-4 py-2 rounded-full text-sm flex items-center gap-3 shadow-lg"
      onClick={() => {
        setVisible(false);
        setDismissed(true);
        localStorage.setItem("declaw_swipe_hint_seen", "true");
      }}
    >
      <span>← #{prevId}</span>
      <span className="text-gray-500">Swipe</span>
      <span>#{nextId} →</span>
    </div>
  );
}
