"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", 
  "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", 
  "ArrowLeft", "ArrowRight", 
  "b", "a"
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;
      const newSequence = [...sequence, key].slice(-10);
      setSequence(newSequence);

      // Check if Konami code completed
      if (newSequence.length === 10 && 
          newSequence.every((k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase())) {
        triggerEasterEgg();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  function triggerEasterEgg() {
    if (activated) return;
    setActivated(true);

    // Epic confetti explosion
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Show secret message
    const toast = document.createElement("div");
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #10b981, #06b6d4);
        color: white;
        padding: 2rem 3rem;
        border-radius: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 9999;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        animation: bounce-in 0.5s ease-out;
      ">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🤖🎮</div>
        <div>KONAMI CODE ACTIVATED!</div>
        <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.8;">
          You found the secret! You're a true gamer.
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    // Add party mode to page
    document.body.style.animation = "party-mode 0.5s ease-in-out infinite";
    
    const style = document.createElement("style");
    style.textContent = `
      @keyframes party-mode {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(30deg); }
      }
      @keyframes bounce-in {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
    `;
    document.head.appendChild(style);

    // Clean up after 5 seconds
    setTimeout(() => {
      toast.remove();
      style.remove();
      document.body.style.animation = "";
      setActivated(false);
      setSequence([]);
    }, 5000);
  }

  return null; // This component doesn't render anything visible
}
