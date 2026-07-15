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
import { PhoneFrame } from "../components/DeviceFrame";
import { PulseGlow } from "../components/PulseGlow";
import { PanelWipe } from "../components/PanelWipe";
import { NotificationPop } from "../components/NotificationPop";
import { launchTokens, getSurface, getAccent } from "../tokens";

export default function PhoneRevealScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const surface = getSurface(scene);
  const accent = getAccent(scene);
  const aspect = scene.__aspectRatio || "9:16";
  const isVertical = aspect === "9:16";

  const enter = spring({ fps, frame: frame - 4, config: launchTokens.spring.pop });
  const scale = interpolate(enter, [0, 1], [0.7, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const y = interpolate(enter, [0, 1], [120, 0]);
  const rotate = interpolate(enter, [0, 1], [-6, 0]);

  // Continuous float
  const floatY = Math.sin(frame / 30) * 8;
  const floatRotate = Math.sin(frame / 45) * 1;

  const phoneWidth = isVertical ? 400 : 340;
  const isVideo = scene.mediaType === "video";

  return (
    <AbsoluteFill>
      <PanelWipe color={accent} direction="left" delay={0} duration={12} />
      <PulseGlow color={accent} size={700} intensity={0.4} />

      <AbsoluteFill
        style={{
          padding: isVertical ? "120px 60px 0" : "0 90px 0 100px",
          justifyContent: isVertical ? "flex-start" : "center",
          alignItems: isVertical ? "center" : "flex-start",
          textAlign: isVertical ? "center" : "left",
          zIndex: 3,
        }}
      >
        <div style={{ maxWidth: isVertical ? 900 : 500, display: "flex", flexDirection: "column", gap: 18, alignItems: isVertical ? "center" : "flex-start" }}>
          <WordByWord scene={scene} text={scene.title} variant={isVertical ? "title" : "headline"} align={isVertical ? "center" : "left"} delay={0} />
          {scene.subtitle && (
            <WordByWord scene={scene} text={scene.subtitle} variant="body" align={isVertical ? "center" : "left"} delay={10} wordDelay={2} style={{ opacity: 0.85 }} />
          )}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: isVertical ? "center" : "flex-end",
          padding: isVertical ? "280px 40px 160px" : "60px 100px 60px 40px",
        }}
      >
        <div
          style={{
            position: "relative",
            opacity,
            transform: `scale(${scale}) translateY(${y + floatY}px) rotate(${rotate + floatRotate}deg)`,
          }}
        >
          <PhoneFrame scene={scene} width={phoneWidth}>
            {scene.mediaUrl ? (
              isVideo ? (
                <Video src={scene.mediaUrl} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Img src={scene.mediaUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )
            ) : (
              <div style={{ width: "100%", height: "100%", background: surface.bg }} />
            )}
          </PhoneFrame>

          {frame > 45 && (
            <NotificationPop
              scene={scene}
              title="New message"
              subtitle="Tap to open"
              delay={45}
              from="top"
              x={0}
              y={-40}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}