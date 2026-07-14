import { AbsoluteFill } from "remotion";

import { MediaRenderer } from "../compositions/MediaRenderer";
import { AnimatedText } from "../compositions/AnimatedText";

export default function SplitLayout({
  scene,
}) {
  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
      }}
    >
      <AbsoluteFill
        style={{
          width: "50%",
        }}
      >
        <MediaRenderer
          scene={scene}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          left: "50%",
          width: "50%",
          padding: 80,
          justifyContent: "center",
        }}
      >
        <AnimatedText
          title={scene.title}
          subtitle={scene.subtitle}
          themeName={scene.theme}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}