/**
 * Launch template — HIGH ENERGY tokens.
 * Faster springs. Bolder colors. Real motion.
 */

export const launchTokens = {
  bg: {
    white: "#FFFFFF",
    offWhite: "#FAFAFA",
    lightGray: "#F5F5F7",
    darkCharcoal: "#0A0A0B",
    midnight: "#111114",
    inkBlack: "#050506",
  },
  ink: {
    primary: "#0A0A0B",
    secondary: "#4B4B52",
    muted: "#8E8E93",
    inverted: "#FFFFFF",
  },
  accent: {
    default: "#0E7A43",
    blue: "#0071E3",
    purple: "#7C3AED",
    pink: "#EC4899",
    orange: "#FB923C",
  },
  glass: {
    light: "rgba(255, 255, 255, 0.7)",
    dark: "rgba(20, 20, 24, 0.7)",
    border: "rgba(0, 0, 0, 0.06)",
    borderDark: "rgba(255, 255, 255, 0.08)",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
    md: "0 4px 12px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)",
    lg: "0 12px 32px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.12)",
    xl: "0 24px 64px rgba(0,0,0,0.10), 0 48px 128px rgba(0,0,0,0.16)",
    device:
      "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.10)",
    glow: (color) => `0 0 60px ${color}66, 0 0 120px ${color}33`,
  },

  font: {
    family: `-apple-system, "SF Pro Display", "Inter", system-ui, sans-serif`,
    mono: `"SF Mono", "JetBrains Mono", ui-monospace, monospace`,
  },
  size: {
    mega: 160,
    hero: 128,
    display: 96,
    headline: 72,
    title: 52,
    body: 30,
    caption: 20,
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
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    device: 22,
    pill: 999,
  },

  // ⚡ FASTER, SNAPPIER SPRINGS
  spring: {
    // Everyday snappy — quick entry, tight settle
    snap: { damping: 16, stiffness: 220, mass: 0.5 },
    // Bounce-in for hero elements
    pop: { damping: 12, stiffness: 260, mass: 0.6 },
    // Smooth but fast
    smooth: { damping: 22, stiffness: 180, mass: 0.6 },
    // Punchy — for stats, big reveals
    punch: { damping: 14, stiffness: 300, mass: 0.5 },
    // Gentle for continuous animations
    gentle: { damping: 22, stiffness: 90, mass: 1 },
  },

  // Timing (in frames at 30fps)
  time: {
    fast: 6,
    quick: 10,
    normal: 16,
    slow: 24,
  },
};

export function getSurface(scene) {
  const style = scene.backgroundStyle || "light";
  if (style === "dark" || style === "spotlight") {
    return {
      bg: launchTokens.bg.midnight,
      bgSecondary: launchTokens.bg.inkBlack,
      ink: launchTokens.ink.inverted,
      muted: "rgba(255,255,255,0.6)",
      glass: launchTokens.glass.dark,
      border: launchTokens.glass.borderDark,
      isDark: true,
    };
  }
  return {
    bg: launchTokens.bg.offWhite,
    bgSecondary: launchTokens.bg.lightGray,
    ink: launchTokens.ink.primary,
    muted: launchTokens.ink.secondary,
    glass: launchTokens.glass.light,
    border: launchTokens.glass.border,
    isDark: false,
  };
}

export function getAccent(scene) {
  return (
    scene?.__brand?.color ||
    scene?.__brand?.accent ||
    launchTokens.accent.default
  );
}

/**
 * Secondary accent — used for gradient meshes, glows, highlights.
 */
export function getAccentSecondary(scene) {
  const primary = getAccent(scene);
  const map = {
    "#0E7A43": launchTokens.accent.blue,
    "#0071E3": launchTokens.accent.purple,
    "#7C3AED": launchTokens.accent.pink,
    "#EC4899": launchTokens.accent.orange,
  };
  return map[primary] || launchTokens.accent.blue;
}