"use client";

import { useState, useEffect } from "react";

const TIPS = [
  "Press B to quickly go to Browse",
  "Press / to search from anywhere",
  "Try the Konami code for a surprise ↑↑↓↓←→←→BA",
  "Click the backpack to see your inventory",
  "Use ← → arrow keys on NFT pages to navigate",
  "Click 'Surprise me' for a random trait filter",
  "Every robot has a unique rarity score",
  "The claw chooses randomly — good luck!",
  "All 1,000 robots are stored on IPFS",
  "This project is 100% open source",
  "Add NFTs to favorites with the heart button",
  "Compare up to 4 NFTs side-by-side",
];

export default function TipOfTheDay() {
  const [tip, setTip] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Pick a random tip based on the day
    const today = new Date().getDate();
    setTip(TIPS[today % TIPS.length]);
    
    // Check if already dismissed today
    const lastDismissed = localStorage.getItem("tip_dismissed_date");
    if (lastDismissed === new Date().toDateString()) {
      setDismissed(true);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem("tip_dismissed_date", new Date().toDateString());
  };

  if (dismissed || !tip) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-sm mx-4">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl p-4 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium">Did you know?</p>
          <p className="text-sm mt-1">{tip}</p>
        </div>
        <button
          onClick={dismiss}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
