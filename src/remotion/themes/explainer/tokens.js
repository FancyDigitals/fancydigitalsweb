/**
 * Explainer template — friendly, warm, animated 2D style.
 * Think Duolingo, Powtoon, Vyond — but modern and premium.
 */

export const explainerTokens = {
  bg: {
    cream: "#FFF8F0",
    mint: "#E8F5F0",
    sky: "#EAF4FB",
    peach: "#FEF0E8",
    lavender: "#F1EDFB",
    warmGray: "#F5F3F0",
    darkTeal: "#1A3A3F",
    inkBlack: "#0F1419",
  },
  ink: {
    primary: "#1A1A1A",
    secondary: "#4A4A52",
    muted: "#8A8A94",
    inverted: "#FFFFFF",
  },
  accent: {
    coral: "#FF6B6B",
    sunshine: "#FFD93D",
    grass: "#6BCB77",
    ocean: "#4D96FF",
    lilac: "#B084EE",
    tangerine: "#FF914D",
    default: "#0E7A43",
  },
  skin: {
    light: "#FCD9B8",
    medium: "#D9A574",
    tan: "#B87A54",
    deep: "#754C29",
    dark: "#4A2E1A",
  },
  outfit: {
    business: "#2C3E50",
    casual: "#E74C3C",
    creative: "#9B59B6",
    sporty: "#3498DB",
    formal: "#34495E",
  },
  shadow: {
    soft: "0 4px 12px rgba(0,0,0,0.08)",
    md: "0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
    lg: "0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
    prop: "0 6px 16px rgba(0,0,0,0.15)",
  },

  font: {
    // Rounded, friendly for explainer
    family: `"Nunito", "SF Pro Rounded", -apple-system, system-ui, sans-serif`,
    display: `"Nunito", "Fredoka", "SF Pro Rounded", system-ui, sans-serif`,
    hand: `"Kalam", "Caveat", cursive`,
  },
  size: {
    hero: 96,
    display: 76,
    headline: 56,
    title: 42,
    body: 26,
    caption: 18,
    label: 14,
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 800,
    heavy: 900,
  },

  radius: {
    sm: 12,
    md: 18,
    lg: 26,
    xl: 34,
    bubble: 28,
    pill: 999,
  },

  spring: {
    bounce: { damping: 10, stiffness: 200, mass: 0.6 }, // characters
    pop: { damping: 12, stiffness: 240, mass: 0.5 }, // icons
    gentle: { damping: 22, stiffness: 100, mass: 0.8 },
    snap: { damping: 16, stiffness: 220, mass: 0.5 },
  },
};

/**
 * Choose surface based on scene background style.
 * Explainer uses warm, friendly backgrounds — never harsh black/white.
 */
export function getExplainerSurface(scene) {
  const style = scene.backgroundStyle || "cream";
  const surfaces = {
    cream: { bg: explainerTokens.bg.cream, isDark: false },
    mint: { bg: explainerTokens.bg.mint, isDark: false },
    sky: { bg: explainerTokens.bg.sky, isDark: false },
    peach: { bg: explainerTokens.bg.peach, isDark: false },
    lavender: { bg: explainerTokens.bg.lavender, isDark: false },
    warm: { bg: explainerTokens.bg.warmGray, isDark: false },
    dark: { bg: explainerTokens.bg.darkTeal, isDark: true },
  };
  const surface = surfaces[style] || surfaces.cream;
  return {
    ...surface,
    ink: surface.isDark ? explainerTokens.ink.inverted : explainerTokens.ink.primary,
    muted: surface.isDark ? "rgba(255,255,255,0.7)" : explainerTokens.ink.secondary,
  };
}

export function getExplainerAccent(scene, fallback = "coral") {
  const brandColor = scene?.__brand?.color;
  if (brandColor) return brandColor;
  return explainerTokens.accent[fallback] || explainerTokens.accent.coral;
}

/**
 * Pick a character preset based on business type + scene role.
 */
export function pickCharacterPreset(scene) {
  const explicit = scene.character;
  if (explicit && typeof explicit === "object") return explicit;

  // Defaults based on scene purpose
  const purpose = String(scene.purpose || "").toLowerCase();
  const skin = ["light", "medium", "tan", "deep"][
    Math.abs((scene.sceneNumber || 0) % 4)
  ];

  const outfit =
    purpose === "problem" ? "casual" :
    purpose === "solution" ? "business" :
    purpose === "product" ? "creative" :
    "business";

  return {
    skin: explainerTokens.skin[skin],
    outfit: explainerTokens.outfit[outfit],
    hair: "short-dark",
    accessory: null,
  };
}
/**
 * Extract keywords worth highlighting from a title.
 * Picks the last 1-2 impactful words (nouns/adjectives).
 */
export function autoHighlight(text) {
  if (!text) return [];
  const words = String(text)
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .filter((w) => !/^(the|and|for|with|from|that|this|your|our|are|was|will|can|but|not|you|any|all|how|why|what)$/i.test(w));

  if (words.length === 0) return [];
  if (words.length === 1) return [words[0]];

  // Highlight last meaningful word (usually the punchline)
  return [words[words.length - 1].replace(/[.,!?;:]$/, "")];
}