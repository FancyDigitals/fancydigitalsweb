import { AbsoluteFill } from "remotion";

import { AnimatedText } from "../compositions/AnimatedText";

export default function CTALayout({
  scene,
}) {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg,#075A01,#07101C)",
      }}
    >
      <AnimatedText
        title={scene.title}
        subtitle={scene.subtitle}
        themeName={scene.theme}
      />
    </AbsoluteFill>
  );
}