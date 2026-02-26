const STORAGE_KEY = "declaw_favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: number): number[] {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(id: number): number[] {
  const favorites = getFavorites().filter((f) => f !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return favorites;
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: number): { favorites: number[]; isFavorite: boolean } {
  if (isFavorite(id)) {
    return { favorites: removeFavorite(id), isFavorite: false };
  } else {
    return { favorites: addFavorite(id), isFavorite: true };
  }
}

export function importFavorites(ids: number[]): number[] {
  const current = getFavorites();
  const merged = [...new Set([...current, ...ids])].filter(id => id >= 0 && id <= 999);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

export function clearFavorites(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
