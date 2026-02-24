// DeClaw NFT — Trait definitions with rarity weights
// 8 categories, 65 total variants, ~22M combos

export interface TraitVariant {
  name: string;
  weight: number; // higher = more common
  colors: string[]; // primary colors used for drawing
}

export interface TraitCategory {
  name: string;
  variants: TraitVariant[];
}

export const TRAITS: TraitCategory[] = [
  {
    name: "Background",
    variants: [
      { name: "Midnight Blue", weight: 15, colors: ["#0d1b2a", "#1b2838"] },
      { name: "Neon Pink", weight: 10, colors: ["#ff006e", "#ff4d94"] },
      { name: "Cyber Green", weight: 12, colors: ["#00ff87", "#00cc6a"] },
      { name: "Sunset Orange", weight: 10, colors: ["#ff6b35", "#ff9f1c"] },
      { name: "Deep Purple", weight: 12, colors: ["#3c096c", "#5a189a"] },
      { name: "Electric Teal", weight: 10, colors: ["#00f5d4", "#00bbf9"] },
      { name: "Bloodmoon Red", weight: 8, colors: ["#9d0208", "#d00000"] },
      { name: "Arctic White", weight: 8, colors: ["#caf0f8", "#e8f7ff"] },
      { name: "Golden Hour", weight: 7, colors: ["#ffd60a", "#ffc300"] },
      { name: "Void Black", weight: 5, colors: ["#000000", "#111111"] },
    ],
  },
  {
    name: "Body",
    variants: [
      { name: "Chrome", weight: 15, colors: ["#c0c0c0", "#e0e0e0", "#808080"] },
      { name: "Matte Black", weight: 12, colors: ["#2d2d2d", "#404040", "#1a1a1a"] },
      { name: "Neon Blue", weight: 10, colors: ["#00b4d8", "#0096c7", "#023e8a"] },
      { name: "Rust", weight: 10, colors: ["#a44a3f", "#c06c5d", "#6b3a30"] },
      { name: "Gold Plated", weight: 8, colors: ["#ffd700", "#daa520", "#b8860b"] },
      { name: "Holographic", weight: 7, colors: ["#ff6ff2", "#6ff2ff", "#f2ff6f"] },
      { name: "Camo", weight: 6, colors: ["#4a6741", "#5c7a51", "#3d5435"] },
      { name: "Diamond", weight: 5, colors: ["#b9f2ff", "#e0f7ff", "#7fdbff"] },
    ],
  },
  {
    name: "Chassis",
    variants: [
      { name: "Standard Box", weight: 18, colors: ["#444444"] },
      { name: "Rounded", weight: 15, colors: ["#555555"] },
      { name: "Hexagonal", weight: 12, colors: ["#333333"] },
      { name: "Spiked", weight: 10, colors: ["#222222"] },
      { name: "Sleek", weight: 10, colors: ["#666666"] },
      { name: "Bulky Tank", weight: 8, colors: ["#3a3a3a"] },
      { name: "Skeletal", weight: 5, colors: ["#777777"] },
    ],
  },
  {
    name: "Claw",
    variants: [
      { name: "Classic Tri-Claw", weight: 15, colors: ["#aaaaaa", "#cccccc"] },
      { name: "Pincer", weight: 12, colors: ["#ff4444", "#cc3333"] },
      { name: "Magnet", weight: 10, colors: ["#4444ff", "#6666ff"] },
      { name: "Suction Cup", weight: 10, colors: ["#ff66ff", "#cc44cc"] },
      { name: "Laser Grip", weight: 8, colors: ["#00ff00", "#44ff44"] },
      { name: "Chain Hook", weight: 8, colors: ["#b8860b", "#daa520"] },
      { name: "Tentacle", weight: 7, colors: ["#8b5cf6", "#a78bfa"] },
      { name: "Buzz Saw", weight: 7, colors: ["#ef4444", "#f87171"] },
      { name: "Frost Claw", weight: 6, colors: ["#67e8f9", "#a5f3fc"] },
      { name: "Phantom", weight: 4, colors: ["#ffffff", "#e0e0ff"] },
    ],
  },
  {
    name: "Visor",
    variants: [
      { name: "LED Strip", weight: 15, colors: ["#00ff00", "#00cc00"] },
      { name: "Mono Eye", weight: 12, colors: ["#ff0000", "#ff3333"] },
      { name: "Dual Lens", weight: 12, colors: ["#00aaff", "#0088dd"] },
      { name: "X-Ray", weight: 10, colors: ["#ff00ff", "#cc00cc"] },
      { name: "Pixel Grid", weight: 10, colors: ["#ffff00", "#cccc00"] },
      { name: "Cyclops", weight: 8, colors: ["#ff6600", "#cc5200"] },
      { name: "Stealth", weight: 6, colors: ["#333333", "#444444"] },
      { name: "Holo Display", weight: 5, colors: ["#00ffff", "#44ffff"] },
    ],
  },
  {
    name: "Accessory",
    variants: [
      { name: "None", weight: 20, colors: [] },
      { name: "Antenna", weight: 14, colors: ["#ff3333", "#ff6666"] },
      { name: "Hard Hat", weight: 12, colors: ["#ffd700", "#ffcc00"] },
      { name: "Crown", weight: 6, colors: ["#ffd700", "#b8860b", "#ff4500"] },
      { name: "Headphones", weight: 10, colors: ["#333333", "#00ff00"] },
      { name: "Halo", weight: 5, colors: ["#ffd700", "#fffacd"] },
      { name: "Mohawk", weight: 8, colors: ["#ff006e", "#ff4d94"] },
      { name: "Satellite Dish", weight: 7, colors: ["#888888", "#aaaaaa"] },
    ],
  },
  {
    name: "Aura",
    variants: [
      { name: "None", weight: 25, colors: [] },
      { name: "Electric Sparks", weight: 12, colors: ["#00f5ff", "#7df9ff"] },
      { name: "Fire Ring", weight: 10, colors: ["#ff4500", "#ff6347", "#ffd700"] },
      { name: "Frost Mist", weight: 10, colors: ["#e0f7ff", "#b0e0e6"] },
      { name: "Shadow Wisps", weight: 8, colors: ["#4a004a", "#800080"] },
      { name: "Rainbow", weight: 5, colors: ["#ff0000", "#ff7700", "#ffff00", "#00ff00", "#0000ff", "#8b00ff"] },
      { name: "Glitch", weight: 6, colors: ["#00ff00", "#ff00ff", "#00ffff"] },
    ],
  },
  {
    name: "Expression",
    variants: [
      { name: "Neutral", weight: 18, colors: ["#ffffff"] },
      { name: "Happy", weight: 15, colors: ["#00ff00"] },
      { name: "Angry", weight: 12, colors: ["#ff0000"] },
      { name: "Confused", weight: 10, colors: ["#ffff00"] },
      { name: "Sleepy", weight: 10, colors: ["#8888ff"] },
      { name: "Excited", weight: 8, colors: ["#ff00ff"] },
      { name: "Menacing", weight: 5, colors: ["#ff0000", "#880000"] },
    ],
  },
];

// Weighted random selection
export function pickTrait(category: TraitCategory, rng: () => number): TraitVariant {
  const totalWeight = category.variants.reduce((sum, v) => sum + v.weight, 0);
  let roll = rng() * totalWeight;
  for (const variant of category.variants) {
    roll -= variant.weight;
    if (roll <= 0) return variant;
  }
  return category.variants[category.variants.length - 1];
}

// Calculate total possible combos
export function totalCombos(): number {
  return TRAITS.reduce((product, cat) => product * cat.variants.length, 1);
}
