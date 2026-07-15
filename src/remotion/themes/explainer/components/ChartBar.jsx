import { interpolate, useCurrentFrame } from "remotion";
import { explainerTokens, getExplainerAccent, getExplainerSurface } from "../tokens";

/**
 * Animated bar chart — bars grow from bottom with staggered delay.
 */
export function ChartBar({
  scene,
  data = [
    { label: "Q1", value: 40 },
    { label: "Q2", value: 65 },
    { label: "Q3", value: 82 },
    { label: "Q4", value: 100 },
  ],
  delay = 0,
  width = 500,
  height = 300,
  color,
}) {
  const frame = useCurrentFrame();
  const accent = color || getExplainerAccent(scene);
  const surface = getExplainerSurface(scene);

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = (width - 40) / data.length;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        padding: "20px 0 40px",
      }}
    >
      {/* Axis line */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          height: 3,
          background: surface.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
          borderRadius: 2,
        }}
      />

      {/* Bars */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: height - 60,
          padding: "0 20px",
        }}
      >
        {data.map((d, i) => {
          const barDelay = delay + i * 6;
          const growProgress = interpolate(
            frame,
            [barDelay, barDelay + 24],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const barHeight = (d.value / maxValue) * (height - 100) * growProgress;

          const labelOpacity = interpolate(
            frame,
            [barDelay + 20, barDelay + 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Value on top */}
              <div
                style={{
                  fontFamily: explainerTokens.font.family,
                  fontSize: 20,
                  fontWeight: 800,
                  color: accent,
                  opacity: growProgress > 0.9 ? 1 : 0,
                }}
              >
                {Math.round(d.value * growProgress)}
                {d.suffix || ""}
              </div>

              {/* Bar */}
              <div
                style={{
                  width: barWidth * 0.6,
                  height: barHeight,
                  background: `linear-gradient(180deg, ${accent}, ${accent}CC)`,
                  borderRadius: `${explainerTokens.radius.md}px ${explainerTokens.radius.md}px 0 0`,
                  boxShadow: `0 4px 12px ${accent}44`,
                }}
              />

              {/* Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  fontFamily: explainerTokens.font.family,
                  fontSize: 14,
                  fontWeight: 600,
                  color: surface.ink,
                  opacity: labelOpacity,
                }}
              >
                {d.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}