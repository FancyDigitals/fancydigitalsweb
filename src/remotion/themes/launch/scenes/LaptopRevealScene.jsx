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
import { LaptopFrame } from "../components/DeviceFrame";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent } from "../tokens";

export default function LaptopRevealScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const enter = spring({ fps, frame: frame - 4, config: launchTokens.spring.pop });
  const scale = interpolate(enter, [0, 1], [0.65, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const rotateX = interpolate(enter, [0, 1], [25, 0]);
  const y = interpolate(enter, [0, 1], [100, 0]);

  // Continuous subtle rock
  const rock = Math.sin(frame / 40) * 1.5;

  const laptopWidth = isVertical ? 800 : 1050;
  const isVideo = scene.mediaType === "video";

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="up" delay={0} duration={12} />
      <PulseGlow color={accent} size={900} intensity={0.35} />

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

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "320px 30px 180px" : "240px 60px 120px",
          perspective: 1400,
        }}
      >
        <div
          style={{
            opacity,
            transform: `scale(${scale}) rotateX(${rotateX}deg) translateY(${y}px) rotateZ(${rock}deg)`,
            transformOrigin: "center bottom",
          }}
        >
          <LaptopFrame scene={scene} width={laptopWidth}>
            {scene.mediaUrl ? (
              isVideo ? (
                <Video src={scene.mediaUrl} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Img src={scene.mediaUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )
            ) : (
              <div style={{ width: "100%", height: "100%", background: surface.bg }} />
            )}
          </LaptopFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}