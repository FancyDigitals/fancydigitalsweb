import { KineticText } from "./KineticText";

/**
 * Backwards-compatible wrapper — routes to KineticText.
 * Old scenes calling <TextCallout> keep working with better animation.
 */
export function TextCallout({
  scene,
  text,
  fontSize = 48,
  color,
  weight,
  align = "center",
  delay = 0,
  underlineColor,
  style = {},
}) {
  // Map fontSize → nearest variant
  let variant = "headline";
  if (fontSize >= 130) variant = "hero";
  else if (fontSize >= 96) variant = "display";
  else if (fontSize >= 60) variant = "headline";
  else if (fontSize >= 42) variant = "title";
  else variant = "body";

  return (
    <KineticText
      scene={scene}
      text={text}
      variant={variant}
      align={align}
      delay={delay}
      color={color}
      weight={weight}
      underline={!!underlineColor}
      style={style}
    />
  );
}