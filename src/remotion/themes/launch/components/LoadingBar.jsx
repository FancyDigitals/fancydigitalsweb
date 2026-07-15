import { interpolate, useCurrentFrame } from "remotion";
import { launchTokens, getAccent } from "../tokens";

/**
 * Animated loading bar — used inside browser windows and reveals.
 */
export function LoadingBar({
  scene,
  delay = 0,
  duration = 30,
  width = 200,
  height = 3,
  style = {},
}) {
  const frame = useCurrentFrame();
  const accent = getAccent(scene);

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width,
        height,
        background: "rgba(0,0,0,0.08)",
        borderRadius: launchTokens.radius.pill,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: accent,
          borderRadius: launchTokens.radius.pill,
          transition: "none",
        }}
      />
    </div>
  );
}