export function getColorGrade(scene = {}) {
  switch ((scene.colorGrade || "").toLowerCase()) {
    case "warm":
      return "brightness(1.04) saturate(1.18) hue-rotate(-3deg)";

    case "cold":
      return "brightness(.95) saturate(.90) hue-rotate(8deg)";

    case "cinematic":
      return "contrast(1.12) saturate(.95) brightness(.96)";

    case "luxury":
      return "contrast(1.15) brightness(.95) saturate(.90)";

    default:
      return "contrast(1.05) saturate(1.05)";
  }
}