"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a"
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activated) return;
      
      const newSequence = [...sequence, e.key].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setActivated(true);
        
        // Epic confetti burst
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#10b981', '#8b5cf6', '#f59e0b'],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#10b981', '#8b5cf6', '#f59e0b'],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        
        frame();
        
        // Show secret message
        const msg = document.createElement("div");
        msg.innerHTML = "🤖 You found the secret! The claw chooses you.";
        msg.className = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-2xl animate-bounce";
        document.body.appendChild(msg);
        
        setTimeout(() => {
          msg.remove();
          setActivated(false);
          setSequence([]);
        }, 4000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, activated]);

  return null;
}
