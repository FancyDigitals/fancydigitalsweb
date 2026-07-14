// Aspect-ratio-aware safe padding
const PADDINGS = {
  "9:16": { edge: 90, top: 100, bottom: 100 },
  "16:9": { edge: 80, top: 60, bottom: 60 },
  "1:1": { edge: 70, top: 70, bottom: 70 },
};

const SIZES = {
  small: { w: 70, h: 70 },
  medium: { w: 110, h: 110 },
  large: { w: 160, h: 160 },
};

const POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export function getLogoStyle({ position, size, aspectRatio, width, height }) {
  const pad = PADDINGS[aspectRatio] || PADDINGS["9:16"];
  const dims = SIZES[size] || SIZES.medium;

  const style = {
    position: "absolute",
    width: dims.w,
    height: dims.h,
    objectFit: "contain",
  };

  const [vertical, horizontal] = normalizePosition(position);

  // Vertical
  if (vertical === "top") style.top = pad.top;
  if (vertical === "bottom") style.bottom = pad.bottom;
  if (vertical === "center") style.top = "50%";

  // Horizontal
  if (horizontal === "left") style.left = pad.edge;
  if (horizontal === "right") style.right = pad.edge;
  if (horizontal === "center") style.left = "50%";

  // Centering transforms
  let tx = 0;
  let ty = 0;
  if (horizontal === "center") tx = -dims.w / 2;
  if (vertical === "center") ty = -dims.h / 2;
  if (tx || ty) style.transform = `translate(${tx}px, ${ty}px)`;

  return style;
}

// Returns { top, right, bottom, left } exclusion rectangle in pixels
// This is what AnimatedText / CaptionRenderer read to avoid overlap
export function getLogoSafeArea({
  position,
  size,
  aspectRatio,
  width,
  height,
}) {
  const pad = PADDINGS[aspectRatio] || PADDINGS["9:16"];
  const dims = SIZES[size] || SIZES.medium;
  const buffer = 40; // breathing room around logo

  const [vertical, horizontal] = normalizePosition(position);

  const zone = { top: 0, right: 0, bottom: 0, left: 0 };

  const verticalExtent = dims.h + buffer + (vertical === "top" ? pad.top : pad.bottom);
  const horizontalExtent = dims.w + buffer + pad.edge;

  if (vertical === "top") zone.top = verticalExtent;
  if (vertical === "bottom") zone.bottom = verticalExtent;

  if (horizontal === "left") zone.left = horizontalExtent;
  if (horizontal === "right") zone.right = horizontalExtent;

  // Center positions don't push text sideways — they push vertically
  if (horizontal === "center" && vertical !== "center") {
    // no horizontal exclusion needed
  }

  return zone;
}

// Returns the recommended text anchor when logo is placed
// so text naturally avoids the logo zone
export function suggestTextLayoutForLogo(position) {
  const map = {
    "top-left": "bottom",
    "top-center": "bottom",
    "top-right": "bottom",
    "center-left": "right",
    "center": "bottom",
    "center-right": "left",
    "bottom-left": "top",
    "bottom-center": "top",
    "bottom-right": "top",
  };
  return map[position] || null;
}

function normalizePosition(position) {
  const p = position || "top-left";
  const parts = p.split("-");
  if (parts.length === 1) return ["center", parts[0]];
  return parts;
}

export { POSITIONS, SIZES, PADDINGS };