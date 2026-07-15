import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { launchTokens } from "../tokens";

/**
 * Animated cursor — moves from one point to another, then clicks.
 */
export function CursorAnimation({
  from = { x: "10%", y: "10%" },
  to = { x: "50%", y: "50%" },
  delay = 0,
  travelDuration = 40,
  click = true,
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame,
    [delay, delay + travelDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const smoothed = spring({
    fps,
    frame: frame - delay,
    config: launchTokens.spring.smooth,
    durationInFrames: travelDuration,
  });

  const clickPulse = click
    ? interpolate(
        frame,
        [delay + travelDuration, delay + travelDuration + 8, delay + travelDuration + 16],
        [1, 0.85, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  const opacity = interpolate(frame, [delay - 6, delay], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${from.x} + (${to.x} - ${from.x}) * ${smoothed})`,
        top: `calc(${from.y} + (${to.y} - ${from.y}) * ${smoothed})`,
        transform: `scale(${clickPulse})`,
        opacity,
        pointerEvents: "none",
        transition: "none",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3l14 8-6 2-2 6L5 3z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}