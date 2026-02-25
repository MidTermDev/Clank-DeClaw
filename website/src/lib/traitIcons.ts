export const TRAIT_ICONS: Record<string, string> = {
  Background: "🎨",
  Body: "🤖",
  Chassis: "📦",
  Claw: "🦀",
  Visor: "👁️",
  Accessory: "🎩",
  Aura: "✨",
  Expression: "😀",
};

export function getTraitIcon(category: string): string {
  return TRAIT_ICONS[category] || "•";
}
