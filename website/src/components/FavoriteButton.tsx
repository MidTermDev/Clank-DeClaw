"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  nftId: number;
  className?: string;
}

export default function FavoriteButton({ nftId, className = "" }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorited(isFavorite(nftId));
  }, [nftId]);

  const handleToggle = () => {
    const result = toggleFavorite(nftId);
    setFavorited(result.isFavorite);
  };

  if (!mounted) {
    return (
      <button className={`p-2 rounded-lg bg-gray-100 text-gray-400 ${className}`} disabled>
        ♡
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-colors ${
        favorited
          ? "bg-red-100 text-red-500 hover:bg-red-200"
          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
      } ${className}`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      {favorited ? "♥" : "♡"}
    </button>
  );
}
