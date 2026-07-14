import { AbsoluteFill } from "remotion";

import { MediaRenderer } from "../compositions/MediaRenderer";
import { AnimatedText } from "../compositions/AnimatedText";

export default function HeroLayout({
  scene,
}) {
  return (
    <AbsoluteFill>
      <MediaRenderer scene={scene} />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.05))",
        }}
      />

      <AnimatedText
        title={scene.title}
        subtitle={scene.subtitle}
        themeName={scene.theme}
      />
    </AbsoluteFill>
  );
}