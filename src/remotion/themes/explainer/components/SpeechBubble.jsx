import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { explainerTokens, getExplainerAccent } from "../tokens";

/**
 * Speech bubble with animated tail and bounce entry.
 * Grows from tail point toward the text.
 */
export function SpeechBubble({
  scene,
  text,
  tailSide = "left", // left | right | bottom | top
  color,
  textColor = "#1A1A1A",
  delay = 0,
  maxWidth = 320,
  fontSize = 22,
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bg = color || "#FFFFFF";
  const accent = getExplainerAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: explainerTokens.spring.bounce,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.3, 1]);

  const tailOrigin = {
    left: "left center",
    right: "right center",
    top: "center top",
    bottom: "center bottom",
  }[tailSide];

  const tailStyle = {
    position: "absolute",
    width: 0,
    height: 0,
  };

  const tail = {
    left: { ...tailStyle, left: -18, top: "50%", marginTop: -12, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderRight: `20px solid ${bg}` },
    right: { ...tailStyle, right: -18, top: "50%", marginTop: -12, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `20px solid ${bg}` },
    bottom: { ...tailStyle, bottom: -18, left: "50%", marginLeft: -12, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: `20px solid ${bg}` },
    top: { ...tailStyle, top: -18, left: "50%", marginLeft: -12, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: `20px solid ${bg}` },
  }[tailSide];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 28px",
        borderRadius: explainerTokens.radius.bubble,
        background: bg,
        border: `3px solid ${accent}`,
        boxShadow: explainerTokens.shadow.md,
        maxWidth,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: tailOrigin,
        fontFamily: explainerTokens.font.family,
        fontSize,
        fontWeight: 700,
        color: textColor,
        lineHeight: 1.35,
        textAlign: "center",
        ...style,
      }}
    >
      <div style={tail} />
      {text}
    </div>
  );
}