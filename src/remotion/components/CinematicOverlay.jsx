import { AbsoluteFill } from "remotion";

export function CinematicOverlay({
  scene,
}) {
  const overlays = {
    none: {
      top: "transparent",
      bottom: "transparent",
      vignette: "transparent",
    },

    soft: {
      top: "rgba(0,0,0,.10)",
      bottom: "rgba(0,0,0,.38)",
      vignette: "rgba(0,0,0,.20)",
    },

    luxury: {
      top: "rgba(8,8,14,.18)",
      bottom: "rgba(8,8,14,.55)",
      vignette: "rgba(0,0,0,.30)",
    },

    dramatic: {
      top: "rgba(0,0,0,.30)",
      bottom: "rgba(0,0,0,.72)",
      vignette: "rgba(0,0,0,.45)",
    },
  };

  const overlay =
    overlays[
      scene?.overlayStyle || "soft"
    ];

  return (
    <>
      <AbsoluteFill
        style={{
          background: `
linear-gradient(
180deg,
${overlay.top},
transparent 28%,
transparent 72%,
${overlay.bottom}
)
`,
        }}
      />

      <AbsoluteFill
        style={{
          background: `
radial-gradient(
ellipse at center,
transparent 42%,
${overlay.vignette} 82%,
rgba(0,0,0,.65)
)
`,
        }}
      />
    </>
  );
}