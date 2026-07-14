import { AbsoluteFill } from "remotion";

import { getTheme } from "../theme-loader";
import { useTransition } from "../hooks/useTransition";

export function SceneRenderer({
  scene,
  project,
}) {
  const theme = getTheme(
    scene.theme || "apple"
  );

  const Scene = theme.Scene;

  const transition = useTransition(
    scene.transition || "fade"
  );

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",

        background: "#000",

        opacity:
          transition.opacity ?? 1,

        filter: `blur(${transition.blur || 0}px)`,

        transform: `
          translateX(${transition.x || 0}px)
          translateY(${transition.y || 0}px)
          scale(${transition.scale || 1})
          rotate(${transition.rotate || 0}deg)
        `,

        willChange:
          "transform, opacity, filter",
      }}
    >
      <Scene
        scene={scene}
        project={project}
      />
    </AbsoluteFill>
  );
}