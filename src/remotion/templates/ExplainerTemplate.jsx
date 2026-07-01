import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/* ============================================================
   HELPERS
============================================================ */

const useSpringValue = (frame, fps, delay = 0) => {
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
};

// Lighten/darken hex color
const shadeColor = (hex, percent) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/* ============================================================
   BACKGROUND LAYERS
============================================================ */

const GradientBackground = ({ brandColor, frame }) => {
  const shift = interpolate(frame, [0, 300], [0, 360]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${shift}deg, ${brandColor} 0%, ${shadeColor(brandColor, -40)} 50%, #000000 100%)`,
      }}
    />
  );
};

const SolidBackground = ({ brandColor }) => (
  <AbsoluteFill style={{ background: shadeColor(brandColor, -30) }} />
);

const PatternBackground = ({ brandColor }) => {
  const dotColor = shadeColor(brandColor, 20);
  return (
    <AbsoluteFill
      style={{
        background: shadeColor(brandColor, -50),
        backgroundImage: `radial-gradient(circle, ${dotColor}55 2px, transparent 2px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
};

/* ============================================================
   MOTION GRAPHICS (Floating shapes on every scene)
============================================================ */

const MotionGraphics = ({ frame, fps, brandColor, width, height }) => {
  const shapes = [
    { x: width * 0.1, y: height * 0.15, size: 120, speed: 1, type: "circle" },
    { x: width * 0.85, y: height * 0.25, size: 80, speed: 1.5, type: "square" },
    { x: width * 0.15, y: height * 0.75, size: 100, speed: 0.8, type: "circle" },
    { x: width * 0.8, y: height * 0.85, size: 60, speed: 1.2, type: "triangle" },
    { x: width * 0.5, y: height * 0.05, size: 40, speed: 2, type: "circle" },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {shapes.map((shape, i) => {
        const floatY = Math.sin((frame / fps) * shape.speed + i) * 30;
        const floatX = Math.cos((frame / fps) * shape.speed + i) * 20;
        const rotation = (frame * shape.speed) % 360;
        const opacity = 0.15;

        const commonStyle = {
          position: "absolute",
          left: shape.x + floatX,
          top: shape.y + floatY,
          width: shape.size,
          height: shape.size,
          opacity,
          transform: `rotate(${rotation}deg)`,
        };

        if (shape.type === "circle") {
          return (
            <div
              key={i}
              style={{
                ...commonStyle,
                background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)`,
                borderRadius: "50%",
              }}
            />
          );
        }
        if (shape.type === "square") {
          return (
            <div
              key={i}
              style={{
                ...commonStyle,
                border: `4px solid ${brandColor}`,
                borderRadius: 16,
              }}
            />
          );
        }
        if (shape.type === "triangle") {
          return (
            <div
              key={i}
              style={{
                ...commonStyle,
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${brandColor}`,
                background: "transparent",
              }}
            />
          );
        }
        return null;
      })}
    </AbsoluteFill>
  );
};

/* ============================================================
   LOGO + WATERMARK
============================================================ */

const LogoCorner = ({ logoUrl }) => {
  if (!logoUrl) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 50,
        zIndex: 90,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 16,
        padding: 10,
        backdropFilter: "blur(6px)",
      }}
    >
      <Img
        src={logoUrl}
        style={{ width: 90, height: 90, objectFit: "contain", borderRadius: 8 }}
      />
    </div>
  );
};

const Watermark = () => (
  <div
    style={{
      position: "absolute",
      bottom: 40,
      right: 40,
      background: "rgba(0,0,0,0.45)",
      color: "#ffffff",
      fontSize: 22,
      fontFamily: "sans-serif",
      padding: "8px 18px",
      borderRadius: 8,
      opacity: 0.85,
      zIndex: 100,
    }}
  >
    fancydigitals.com.ng
  </div>
);

/* ============================================================
   IMAGE LAYER (respects contentStyle)
============================================================ */

const SceneImage = ({ scene, frame, fps, contentStyle }) => {
  if (!scene.imageUrl) return null;

  const imageSpring = useSpringValue(frame, fps, 4);
  const scale = interpolate(imageSpring, [0, 1], [0.85, 1]);
  const opacity = imageSpring;

  if (contentStyle === "images-only") {
    // Full-screen image with Ken Burns
    const kenBurns = interpolate(frame, [0, fps * 6], [1, 1.08], {
      extrapolateRight: "clamp",
    });
    return (
      <AbsoluteFill>
        <Img
          src={scene.imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${kenBurns})`,
            opacity,
          }}
        />
        <AbsoluteFill style={{ background: "rgba(0,0,0,0.35)" }} />
      </AbsoluteFill>
    );
  }

  if (contentStyle === "image-text") {
    // Floating card image
    return (
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: `translate(-50%, 0) scale(${scale})`,
          opacity,
          width: "70%",
          maxHeight: "35%",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <Img
          src={scene.imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  return null;
};

/* ============================================================
   TEXT LAYER (respects contentStyle)
============================================================ */

const SceneText = ({ scene, frame, fps, brandColor, contentStyle }) => {
  // Hide text if images-only
  if (contentStyle === "images-only") {
    return null;
  }

  const titleSpring = useSpringValue(frame, fps, 0);
  const subtitleSpring = useSpringValue(frame, fps, 8);
  const numberSpring = useSpringValue(frame, fps, 0);

  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [40, 0]);

  const topPosition = contentStyle === "image-text" ? "20%" : "35%";

  // STEP SCENE
  if (scene.type === "step") {
    return (
      <div
        style={{
          position: "absolute",
          top: topPosition,
          left: "8%",
          right: "8%",
          textAlign: "left",
        }}
      >
        {/* Step badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
            opacity: numberSpring,
            transform: `scale(${interpolate(numberSpring, [0, 1], [0.5, 1])})`,
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: brandColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 900,
              color: "#ffffff",
              fontFamily: "sans-serif",
              boxShadow: `0 8px 30px ${brandColor}aa`,
            }}
          >
            {scene.stepNumber || "•"}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            Step {scene.stepNumber}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "sans-serif",
            lineHeight: 1.1,
            letterSpacing: -1,
            transform: `translateY(${titleY}px)`,
            opacity: titleSpring,
            marginBottom: 24,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          {scene.title}
        </div>

        {/* Subtitle */}
        {scene.subtitle && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "sans-serif",
              lineHeight: 1.4,
              transform: `translateY(${subtitleY}px)`,
              opacity: subtitleSpring,
              maxWidth: "90%",
            }}
          >
            {scene.subtitle}
          </div>
        )}
      </div>
    );
  }

  // CTA SCENE
  if (scene.type === "cta") {
    const buttonSpring = useSpringValue(frame, fps, 14);
    const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.04, 1]);

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: "#ffffff",
            fontFamily: "sans-serif",
            lineHeight: 1.1,
            letterSpacing: -2,
            transform: `translateY(${titleY}px)`,
            opacity: titleSpring,
            marginBottom: 28,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          {scene.title}
        </div>

        {scene.subtitle && (
          <div
            style={{
              fontSize: 38,
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "sans-serif",
              opacity: titleSpring,
              marginBottom: 56,
              maxWidth: "80%",
            }}
          >
            {scene.subtitle}
          </div>
        )}

        <div
          style={{
            background: brandColor,
            color: "#ffffff",
            fontSize: 42,
            fontWeight: 800,
            fontFamily: "sans-serif",
            padding: "28px 64px",
            borderRadius: 999,
            transform: `scale(${interpolate(buttonSpring, [0, 1], [0.5, 1]) * pulse})`,
            opacity: buttonSpring,
            boxShadow: `0 16px 50px ${brandColor}99`,
          }}
        >
          {scene.ctaText || "Try It Free"}
        </div>

        {scene.ctaUrl && (
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "sans-serif",
              marginTop: 28,
              opacity: buttonSpring,
            }}
          >
            {scene.ctaUrl}
          </div>
        )}
      </div>
    );
  }

  // HEADLINE (default)
  return (
    <div
      style={{
        position: "absolute",
        top: topPosition,
        left: "8%",
        right: "8%",
        textAlign: "left",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          width: interpolate(titleSpring, [0, 1], [0, 140]),
          height: 6,
          background: brandColor,
          borderRadius: 3,
          marginBottom: 32,
        }}
      />

      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: "#ffffff",
          fontFamily: "sans-serif",
          lineHeight: 1.1,
          letterSpacing: -1,
          transform: `translateY(${titleY}px)`,
          opacity: titleSpring,
          marginBottom: 24,
          textShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {scene.title}
      </div>

      {scene.subtitle && (
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            fontFamily: "sans-serif",
            lineHeight: 1.4,
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleSpring,
            maxWidth: "90%",
          }}
        >
          {scene.subtitle}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   MAIN TEMPLATE
============================================================ */

export const ExplainerTemplate = ({
  scenes = [],
  brandColor = "#075a01",
  contentStyle = "image-text",
  backgroundStyle = "gradient",
  logoUrl = null,
  showWatermark = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Find current scene
  let elapsed = 0;
  let currentScene = null;
  let frameWithinScene = 0;

  for (const scene of scenes) {
    const sceneDuration = (scene.duration || 5) * fps;
    if (frame < elapsed + sceneDuration) {
      currentScene = scene;
      frameWithinScene = frame - elapsed;
      break;
    }
    elapsed += sceneDuration;
  }

  if (!currentScene) {
    return <AbsoluteFill style={{ background: "#000" }} />;
  }

  return (
    <AbsoluteFill style={{ background: "#000", fontFamily: "sans-serif" }}>
      {/* Background layer */}
      {backgroundStyle === "gradient" && (
        <GradientBackground brandColor={brandColor} frame={frame} />
      )}
      {backgroundStyle === "solid" && <SolidBackground brandColor={brandColor} />}
      {backgroundStyle === "pattern" && <PatternBackground brandColor={brandColor} />}

      {/* Motion graphics on every scene */}
      <MotionGraphics
        frame={frame}
        fps={fps}
        brandColor={brandColor}
        width={width}
        height={height}
      />

      {/* Image layer */}
      <SceneImage
        scene={currentScene}
        frame={frameWithinScene}
        fps={fps}
        contentStyle={contentStyle}
      />

      {/* Text layer */}
      <SceneText
        scene={currentScene}
        frame={frameWithinScene}
        fps={fps}
        brandColor={brandColor}
        contentStyle={contentStyle}
      />

      {/* Logo corner */}
      <LogoCorner logoUrl={logoUrl} />

      {/* Watermark */}
      {showWatermark && <Watermark />}
    </AbsoluteFill>
  );
};