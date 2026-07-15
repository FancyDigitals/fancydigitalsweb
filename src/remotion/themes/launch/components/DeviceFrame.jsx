import { launchTokens, getSurface } from "../tokens";

/**
 * Device frames for embedding screenshots.
 * Supports: browser, laptop, phone, tablet.
 */

export function BrowserFrame({
  scene,
  children,
  url = "example.com",
  width = 900,
  height = 560,
  style = {},
}) {
  const surface = getSurface(scene);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: launchTokens.radius.device,
        background: surface.isDark ? "#1a1a1e" : "#FFFFFF",
        border: `1px solid ${surface.border}`,
        boxShadow: launchTokens.shadow.device,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 44,
          background: surface.isDark ? "#25252b" : "#F5F5F7",
          borderBottom: `1px solid ${surface.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        </div>

        {/* URL pill */}
        <div
          style={{
            flex: 1,
            marginLeft: 16,
            height: 26,
            borderRadius: launchTokens.radius.sm,
            background: surface.isDark ? "#1a1a1e" : "#FFFFFF",
            border: `1px solid ${surface.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            fontFamily: launchTokens.font.mono,
            fontSize: 12,
            color: surface.muted,
          }}
        >
          {url}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function LaptopFrame({ scene, children, width = 900, style = {} }) {
  const surface = getSurface(scene);
  const screenHeight = width * 0.62;
  const baseHeight = width * 0.04;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...style }}>
      {/* Screen */}
      <div
        style={{
          width,
          height: screenHeight,
          borderRadius: `${launchTokens.radius.lg}px ${launchTokens.radius.lg}px 4px 4px`,
          background: "#0A0A0B",
          padding: 12,
          boxShadow: launchTokens.shadow.device,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: launchTokens.radius.sm,
            background: surface.isDark ? "#1a1a1e" : "#FFFFFF",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>

      {/* Base */}
      <div
        style={{
          width: width * 1.1,
          height: baseHeight,
          background: "linear-gradient(180deg, #2a2a30 0%, #0A0A0B 100%)",
          borderRadius: `0 0 ${launchTokens.radius.lg}px ${launchTokens.radius.lg}px`,
          boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.12,
            height: baseHeight * 0.4,
            background: "#0A0A0B",
            borderRadius: `0 0 ${launchTokens.radius.sm}px ${launchTokens.radius.sm}px`,
          }}
        />
      </div>
    </div>
  );
}

export function PhoneFrame({ scene, children, width = 340, style = {} }) {
  const surface = getSurface(scene);
  const height = width * 2.05; // iPhone-ish aspect

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 48,
        background: "#0A0A0B",
        padding: 8,
        boxShadow: launchTokens.shadow.device,
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 42,
          background: surface.isDark ? "#1a1a1e" : "#FFFFFF",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Dynamic Island / notch */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: width * 0.32,
            height: 28,
            background: "#0A0A0B",
            borderRadius: 20,
            zIndex: 2,
          }}
        />
        {children}
      </div>
    </div>
  );
}

export function TabletFrame({ scene, children, width = 700, style = {} }) {
  const surface = getSurface(scene);
  const height = width * 1.33;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 32,
        background: "#0A0A0B",
        padding: 14,
        boxShadow: launchTokens.shadow.device,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          background: surface.isDark ? "#1a1a1e" : "#FFFFFF",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}