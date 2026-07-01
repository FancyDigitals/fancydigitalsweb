import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";

export const BoldTemplate = ({ scenes, brandColor, logoUrl }) => {
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate frame boundaries for each scene
  let currentFrame = 0;
  const scenesWithFrames = scenes.map((scene) => {
    const startFrame = currentFrame;
    const durationFrames = scene.duration * fps;
    currentFrame += durationFrames;
    return { ...scene, startFrame, durationFrames };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {scenesWithFrames.map((scene, index) => (
        <Sequence
          key={index}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          <SceneRenderer
            text={scene.text}
            background={scene.background}
            brandColor={brandColor}
            logoUrl={logoUrl}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const SceneRenderer = ({ text, background, brandColor, logoUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text entrance animation (spring physics)
  const textScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Text fade in
  const textOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background zoom (Ken Burns effect)
  const bgScale = interpolate(frame, [0, 90], [1.1, 1.25], {
    extrapolateRight: "clamp",
  });

  // Dark overlay for text readability
  const overlayOpacity = 0.5;

  return (
    <AbsoluteFill>
      {/* Background image with Ken Burns zoom */}
      {background && (
        <AbsoluteFill
          style={{
            transform: `scale(${bgScale})`,
          }}
        >
          <Img
            src={background}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      )}

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
      />

      {/* Big Bold Text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 120,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
              margin: 0,
            }}
          >
            {text}
          </h1>
        </div>
      </AbsoluteFill>

      {/* Brand accent bar at bottom */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          padding: 60,
        }}
      >
        <div
          style={{
            width: 80,
            height: 6,
            backgroundColor: brandColor || "#075a01",
            borderRadius: 3,
          }}
        />
      </AbsoluteFill>

      {/* Logo overlay (optional) */}
      {logoUrl && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            padding: 60,
          }}
        >
          <img
            src={logoUrl}
            style={{
              width: 120,
              height: 120,
              objectFit: "contain",
              opacity: 0.9,
            }}
          />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};