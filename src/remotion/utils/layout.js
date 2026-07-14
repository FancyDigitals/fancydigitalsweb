export function getLayout(name = "hero") {
  const layouts = {
    hero: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "100px 90px",
      maxWidth: 820,
      captionAnchor: "bottom",
    },

    left: {
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "left",
      padding: "100px",
      maxWidth: 640,
      captionAnchor: "bottom",
    },

    right: {
      justifyContent: "center",
      alignItems: "flex-end",
      textAlign: "right",
      padding: "100px",
      maxWidth: 640,
      captionAnchor: "bottom",
    },

    top: {
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
      padding: "120px 90px 90px",
      maxWidth: 760,
      captionAnchor: "bottom",
    },

    bottom: {
      justifyContent: "flex-end",
      alignItems: "center",
      textAlign: "center",
      padding: "90px 90px 200px",
      maxWidth: 760,
      captionAnchor: "top",
    },

    "bottom-left": {
      justifyContent: "flex-end",
      alignItems: "flex-start",
      textAlign: "left",
      padding: "90px 90px 200px",
      maxWidth: 600,
      captionAnchor: "top",
    },

    "bottom-right": {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      textAlign: "right",
      padding: "90px 90px 200px",
      maxWidth: 600,
      captionAnchor: "top",
    },

    "top-left": {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      textAlign: "left",
      padding: "120px 90px 90px",
      maxWidth: 600,
      captionAnchor: "bottom",
    },

    "top-right": {
      justifyContent: "flex-start",
      alignItems: "flex-end",
      textAlign: "right",
      padding: "120px 90px 90px",
      maxWidth: 600,
      captionAnchor: "bottom",
    },

    editorial: {
      justifyContent: "center",
      alignItems: "flex-start",
      textAlign: "left",
      padding: "120px 100px",
      maxWidth: 680,
      captionAnchor: "bottom",
    },

    quote: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "140px 110px",
      maxWidth: 900,
      captionAnchor: "bottom",
    },

    cta: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "100px",
      maxWidth: 780,
      captionAnchor: "bottom",
    },
  };

  return layouts[name] || layouts.hero;
}
// Append to layout.js
import { getLogoSafeArea } from "./logoPositions";

export function getLayoutWithLogo({ layoutName, brand, aspectRatio }) {
  const base = getLayout(layoutName);

  if (!brand?.logo) return base;

  const safe = getLogoSafeArea({
    position: brand.logoPosition || "top-left",
    size: brand.logoSize || "medium",
    aspectRatio: aspectRatio || "9:16",
  });

  // Parse existing padding into 4 values
  const [top, right, bottom, left] = parsePadding(base.padding);

  return {
    ...base,
    padding: `${Math.max(top, safe.top)}px ${Math.max(right, safe.right)}px ${Math.max(
      bottom,
      safe.bottom
    )}px ${Math.max(left, safe.left)}px`,
  };
}

function parsePadding(padding) {
  const parts = String(padding).trim().split(/\s+/).map((p) => parseInt(p, 10) || 0);
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0], parts[1], parts[2], parts[3]];
}