import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { launchTokens, getAccent } from "../tokens";

/**
 * Animated cursor that moves to a target, clicks with pulse, ripple effect.
 */
export function CursorClick({
  scene,
  from = { x: "10%", y: "80%" },
  to = { x: "50%", y: "50%" },
  delay = 0,
  travel = 30,
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = getAccent(scene);

  const enter = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.smooth,
    durationInFrames: travel,
  });

  const clickFrame = delay + travel;
  const clickPulse = spring({
    fps,
    frame: frame - clickFrame,
    config: launchTokens.spring.pop,
    durationInFrames: 6,
  });

  const cursorScale = frame >= clickFrame && frame < clickFrame + 8 ? 0.85 : 1;

  // Ripple effect
  const rippleProgress = interpolate(
    frame,
    [clickFrame, clickFrame + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rippleScale = interpolate(rippleProgress, [0, 1], [0.4, 2.4]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.4, 1], [0.5, 0.3, 0]);

  const currentX = `calc(${from.x} + (${to.x} - ${from.x}) * ${enter})`;
  const currentY = `calc(${from.y} + (${to.y} - ${from.y}) * ${enter})`;

  const cursorOpacity = interpolate(frame, [delay - 6, delay], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Ripple */}
      {frame >= clickFrame && (
        <div
          style={{
            position: "absolute",
            left: currentX,
            top: currentY,
            width: 60,
            height: 60,
            marginLeft: -30,
            marginTop: -30,
            borderRadius: "50%",
            border: `2px solid ${accent}`,
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          left: currentX,
          top: currentY,
          transform: `scale(${cursorScale})`,
          opacity: cursorOpacity,
          pointerEvents: "none",
          transition: "none",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 3l14 8-6 2-2 6L5 3z"
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}