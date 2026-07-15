import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { WordByWord } from "../components/WordByWord";
import { GlassPanel } from "../components/GlassPanel";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { launchTokens, getSurface, getAccent } from "../tokens";

export default function CardRevealScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const enter = spring({ fps, frame: frame - 4, config: launchTokens.spring.punch });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.75, 1]);
  const rotate = interpolate(enter, [0, 1], [-4, 0]);

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="left" delay={0} duration={10} />
      <PulseGlow color={accent} size={800} intensity={0.35} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isVertical ? "80px 60px" : "60px 100px",
        }}
      >
        <div style={{ opacity, transform: `scale(${scale}) rotate(${rotate}deg)`, width: "100%", maxWidth: 760 }}>
          <GlassPanel scene={scene} padding={52} elevation="xl">
            <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "center", alignItems: "center" }}>
              {scene.mediaUrl && (
                <Img
                  src={scene.mediaUrl}
                  style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: launchTokens.radius.md, boxShadow: launchTokens.shadow.lg }}
                />
              )}
              <WordByWord scene={scene} text={scene.title} variant="title" align="center" delay={14} />
              {scene.subtitle && (
                <WordByWord scene={scene} text={scene.subtitle} variant="body" align="center" delay={22} wordDelay={2} style={{ opacity: 0.85 }} />
              )}
            </div>
          </GlassPanel>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}