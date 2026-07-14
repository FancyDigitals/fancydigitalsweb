import {
  AbsoluteFill,
  Img,
} from "remotion";

export function LogoRenderer({
  brand,
}) {
  if (!brand?.logo) return null;

  const pos = {
    position: "absolute",

    zIndex: 100,

    width:
      brand.size === "small"
        ? 90
        : brand.size === "large"
        ? 180
        : 130,

    opacity: brand.opacity,
  };

  switch (brand.position) {
    case "top-left":
      pos.top = brand.padding;
      pos.left = brand.padding;
      break;

    case "top-center":
      pos.top = brand.padding;
      pos.left = "50%";
      pos.transform = "translateX(-50%)";
      break;

    case "top-right":
      pos.top = brand.padding;
      pos.right = brand.padding;
      break;

    case "bottom-left":
      pos.bottom = brand.padding;
      pos.left = brand.padding;
      break;

    case "bottom-center":
      pos.bottom = brand.padding;
      pos.left = "50%";
      pos.transform = "translateX(-50%)";
      break;

    default:
      pos.bottom = brand.padding;
      pos.right = brand.padding;
  }

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
      }}
    >
      <Img
        src={brand.logo}
        style={pos}
      />
    </AbsoluteFill>
  );
}