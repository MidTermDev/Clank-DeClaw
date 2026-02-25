const STORAGE_KEY = "declaw_recently_viewed";
const MAX_ITEMS = 10;

export function getRecentlyViewed(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(nftId: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = getRecentlyViewed();
    // Remove if already exists, then add to front
    const filtered = current.filter((id) => id !== nftId);
    const updated = [nftId, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silent fail
  }
}

export function clearRecentlyViewed(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent fail
  }
}
