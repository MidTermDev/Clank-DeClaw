"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Don't trigger if modifier keys are held (except for the ones we want)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "b":
          router.push("/browse");
          break;
        case "f":
          router.push("/favorites");
          break;
        case "c":
          router.push("/compare");
          break;
        case "r":
          router.push("/rarity");
          break;
        case "h":
          router.push("/");
          break;
        case "/":
          // Focus search on browse page
          const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
          if (searchInput) {
            e.preventDefault();
            searchInput.focus();
          } else {
            router.push("/browse");
          }
          break;
        case "?":
          // Show shortcuts help
          console.log("Shortcuts: B=Browse, F=Favorites, C=Compare, R=Rarity, H=Home, /=Search");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
