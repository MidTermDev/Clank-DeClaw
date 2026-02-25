export const TRAIT_WEIGHTS: Record<string, Record<string, number>> = {
  Background: {
    "Midnight Blue": 15, "Neon Pink": 10, "Cyber Green": 12, "Sunset Orange": 10,
    "Deep Purple": 12, "Electric Teal": 10, "Bloodmoon Red": 8, "Arctic White": 8,
    "Golden Hour": 7, "Void Black": 5
  },
  Body: {
    "Chrome": 15, "Matte Black": 12, "Neon Blue": 10, "Rust": 10,
    "Gold Plated": 8, "Holographic": 7, "Camo": 6, "Diamond": 5
  },
  Chassis: {
    "Standard Box": 18, "Rounded": 15, "Hexagonal": 12, "Spiked": 10,
    "Sleek": 10, "Bulky Tank": 8, "Skeletal": 5
  },
  Claw: {
    "Classic Tri-Claw": 15, "Pincer": 12, "Magnet": 10, "Suction Cup": 10,
    "Laser Grip": 8, "Chain Hook": 8, "Tentacle": 7, "Buzz Saw": 7,
    "Frost Claw": 6, "Phantom": 4
  },
  Visor: {
    "LED Strip": 15, "Mono Eye": 12, "Dual Lens": 12, "X-Ray": 10,
    "Pixel Grid": 10, "Cyclops": 8, "Stealth": 6, "Holo Display": 5
  },
  Accessory: {
    "None": 20, "Antenna": 14, "Hard Hat": 12, "Crown": 6,
    "Headphones": 10, "Halo": 5, "Mohawk": 8, "Satellite Dish": 7
  },
  Aura: {
    "None": 25, "Electric Sparks": 12, "Fire Ring": 10, "Frost Mist": 10,
    "Shadow Wisps": 8, "Rainbow": 5, "Glitch": 6
  },
  Expression: {
    "Neutral": 18, "Happy": 15, "Angry": 12, "Confused": 10,
    "Sleepy": 10, "Excited": 8, "Menacing": 5
  }
};

export interface RarityTier {
  label: string;
  color: string;
  bgColor: string;
}

export function calculateRarityScore(traits: Record<string, string>): number {
  let score = 0;
  for (const [category, trait] of Object.entries(traits)) {
    const weight = TRAIT_WEIGHTS[category]?.[trait] || 10;
    score += (100 / weight); // Lower weight = rarer = higher score
  }
  return Math.round(score);
}

export function getRarityTier(score: number): RarityTier {
  if (score >= 150) return { label: "Legendary", color: "text-yellow-500", bgColor: "bg-yellow-50 border-yellow-200" };
  if (score >= 120) return { label: "Epic", color: "text-purple-500", bgColor: "bg-purple-50 border-purple-200" };
  if (score >= 100) return { label: "Rare", color: "text-blue-500", bgColor: "bg-blue-50 border-blue-200" };
  if (score >= 80) return { label: "Uncommon", color: "text-green-500", bgColor: "bg-green-50 border-green-200" };
  return { label: "Common", color: "text-gray-500", bgColor: "bg-gray-50 border-gray-200" };
}

export function getTraitRarity(category: string, trait: string): { percentage: number; label: string } {
  const weight = TRAIT_WEIGHTS[category]?.[trait] || 10;
  const totalWeight = Object.values(TRAIT_WEIGHTS[category] || {}).reduce((a, b) => a + b, 0);
  const percentage = (weight / totalWeight) * 100;
  
  if (percentage <= 5) return { percentage, label: "Legendary" };
  if (percentage <= 8) return { percentage, label: "Rare" };
  if (percentage <= 12) return { percentage, label: "Uncommon" };
  return { percentage, label: "Common" };
}
