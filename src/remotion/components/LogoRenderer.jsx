import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { getLogoStyle } from "../utils/logoPositions";

export function LogoRenderer({ brand, aspectRatio = "9:16" }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!brand?.logo) return null;

  const position = brand.logoPosition || "top-left";
  const size = brand.logoSize || "medium";
  const animation = brand.logoAnimation || "fade";

  const style = getLogoStyle({ position, size, aspectRatio });

  // Entrance animation
  const entrance = spring({
    fps,
    frame,
    config: { damping: 22, stiffness: 90, mass: 1 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  let extraTransform = "";

  switch (animation) {
    case "scale": {
      const s = interpolate(entrance, [0, 1], [0.85, 1]);
      extraTransform = ` scale(${s})`;
      break;
    }
    case "slide-up": {
      const y = interpolate(entrance, [0, 1], [24, 0]);
      extraTransform = ` translateY(${y}px)`;
      break;
    }
    case "slide-down": {
      const y = interpolate(entrance, [0, 1], [-24, 0]);
      extraTransform = ` translateY(${y}px)`;
      break;
    }
    case "none":
      break;
    case "fade":
    default:
      break;
  }

  const combinedTransform = `${style.transform || ""}${extraTransform}`.trim();

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Img
        src={brand.logo}
        style={{
          ...style,
          opacity: animation === "none" ? 1 : opacity,
          transform: combinedTransform || undefined,
          filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.35))",
        }}
      />
    </AbsoluteFill>
  );
}