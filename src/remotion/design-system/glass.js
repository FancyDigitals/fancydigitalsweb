export const glass = {
  none: null,

  // Barely-there frost — only when background is slightly busy
  light: {
    blur: 24,
    opacity: 0.05,
    border: 0.06,
    shadow: 0.18,
    radius: 22,
    padding: "18px 26px",
    hugContent: true,
  },

  // Floating card — for text-heavy scenes
  floating: {
    blur: 32,
    opacity: 0.08,
    border: 0.09,
    shadow: 0.32,
    radius: 26,
    padding: "24px 32px",
    hugContent: true,
  },

  // Caption-only strip — narrow horizontal pill
  strip: {
    blur: 28,
    opacity: 0.06,
    border: 0.08,
    shadow: 0.22,
    radius: 100,
    padding: "12px 24px",
    hugContent: true,
    inline: true,
  },

  // Rarely used — only for extremely busy backgrounds
  strong: {
    blur: 44,
    opacity: 0.12,
    border: 0.14,
    shadow: 0.4,
    radius: 30,
    padding: "28px 36px",
    hugContent: true,
  },

  // Legacy aliases — mapped to lighter equivalents
  medium: {
    blur: 32,
    opacity: 0.08,
    border: 0.09,
    shadow: 0.32,
    radius: 26,
    padding: "24px 32px",
    hugContent: true,
  },
};

export function getGlass(name) {
  if (!name || name === "none") return null;
  return glass[name] || null;
}