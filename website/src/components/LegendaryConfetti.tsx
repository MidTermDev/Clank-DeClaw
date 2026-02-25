"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface LegendaryConfettiProps {
  rarityScore: number;
  nftId: number;
}

export default function LegendaryConfetti({ rarityScore, nftId }: LegendaryConfettiProps) {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    // Only fire for legendary NFTs (score >= 150) and only once per session per NFT
    if (rarityScore >= 150 && !fired) {
      const sessionKey = `legendary_confetti_${nftId}`;
      if (sessionStorage.getItem(sessionKey)) return;
      
      sessionStorage.setItem(sessionKey, "true");
      setFired(true);

      // Gold confetti for legendary
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
          colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff'],
        });
      }, 500);
    }
  }, [rarityScore, nftId, fired]);

  return null;
}
