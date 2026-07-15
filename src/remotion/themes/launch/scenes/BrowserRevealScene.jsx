import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Video,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { BrowserFrame } from "../components/DeviceFrame";
import { LoadingBar } from "../components/LoadingBar";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { NotificationPop } from "../components/NotificationPop";
import { CursorClick } from "../components/CursorClick";
import { launchTokens, getSurface, getAccent, getAccentSecondary } from "../tokens";

export default function BrowserRevealScene({ scene, project }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const accent2 = getAccentSecondary(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const business = project?.metadata?.businessName || "yourbrand";
  const url = `${String(business).toLowerCase().replace(/\s+/g, "")}.com`;

  const enter = spring({ fps, frame: frame - 4, config: launchTokens.spring.punch });
  const scale = interpolate(enter, [0, 1], [0.75, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [80, 0]);
  const rotate = interpolate(enter, [0, 1], [3, 0]);

  const browserWidth = isVertical ? 900 : 1200;
  const browserHeight = isVertical ? 640 : 740;

  const isVideo = scene.mediaType === "video";

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="right" delay={0} duration={10} />
      <PulseGlow color={accent2} size={800} intensity={0.3} />

      {/* Title top */}
      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px 0" : "60px 90px 0",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          zIndex: 3,
        }}
      >
        <div style={{ maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align="center" delay={0} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={10} wordDelay={2} style={{ opacity: 0.85, maxWidth: 700 }} />
          )}
        </div>
      </AbsoluteFill>

      {/* Browser */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "300px 40px 200px" : "220px 60px 120px",
        }}
      >
        <div
          style={{
            position: "relative",
            opacity,
            transform: `scale(${scale}) translateY(${y}px) rotate(${rotate}deg)`,
            transformOrigin: "center",
          }}
        >
          <BrowserFrame scene={scene} url={url} width={browserWidth} height={browserHeight}>
            {frame < 40 && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 5 }}>
                <LoadingBar scene={scene} delay={4} duration={30} height={3} style={{ width: "100%", borderRadius: 0 }} />
              </div>
            )}

            {scene.mediaUrl ? (
              isVideo ? (
                <Video src={scene.mediaUrl} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Img src={scene.mediaUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )
            ) : (
              <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${accent}22, ${surface.bg})` }} />
            )}

            {/* Cursor clicks somewhere on the page */}
            <CursorClick scene={scene} from={{ x: "20%", y: "90%" }} to={{ x: "70%", y: "45%" }} delay={50} travel={25} />
          </BrowserFrame>

          {/* Notification popup */}
          {frame > 65 && (
            <NotificationPop
              scene={scene}
              title="New user signed up"
              subtitle={`from ${url}`}
              delay={65}
              from="right"
              x={-20}
              y={80}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}