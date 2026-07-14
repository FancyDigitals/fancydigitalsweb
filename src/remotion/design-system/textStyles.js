export const textStyles = {
  hero: {
    title: 104,
    subtitle: 40,
    caption: 26,
    weight: 600,
    subtitleWeight: 400,
    spacing: "-0.045em",
    subtitleSpacing: "-0.015em",
    lineHeight: 0.94,
    subtitleLineHeight: 1.35,
  },

  display: {
    title: 118,
    subtitle: 42,
    caption: 26,
    weight: 700,
    subtitleWeight: 400,
    spacing: "-0.05em",
    subtitleSpacing: "-0.015em",
    lineHeight: 0.92,
    subtitleLineHeight: 1.32,
  },

  editorial: {
    title: 82,
    subtitle: 36,
    caption: 24,
    weight: 500,
    subtitleWeight: 400,
    spacing: "-0.025em",
    subtitleSpacing: "-0.01em",
    lineHeight: 1.02,
    subtitleLineHeight: 1.4,
  },

  luxury: {
    title: 92,
    subtitle: 34,
    caption: 24,
    weight: 400,
    subtitleWeight: 300,
    spacing: "-0.02em",
    subtitleSpacing: "0em",
    lineHeight: 1.05,
    subtitleLineHeight: 1.45,
  },

  minimal: {
    title: 72,
    subtitle: 32,
    caption: 22,
    weight: 500,
    subtitleWeight: 400,
    spacing: "-0.015em",
    subtitleSpacing: "-0.005em",
    lineHeight: 1.08,
    subtitleLineHeight: 1.42,
  },

  bold: {
    title: 110,
    subtitle: 42,
    caption: 28,
    weight: 800,
    subtitleWeight: 500,
    spacing: "-0.05em",
    subtitleSpacing: "-0.02em",
    lineHeight: 0.92,
    subtitleLineHeight: 1.3,
  },

  caption: {
    title: 60,
    subtitle: 30,
    caption: 22,
    weight: 600,
    subtitleWeight: 400,
    spacing: "-0.015em",
    subtitleSpacing: "-0.005em",
    lineHeight: 1.15,
    subtitleLineHeight: 1.45,
  },
};

export function getTextStyle(name) {
  return textStyles[name] || textStyles.hero;
}