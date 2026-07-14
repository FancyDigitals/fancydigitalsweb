import {
  AbsoluteFill,
  Img,
} from "remotion";

import {
  useSceneAnimation,
} from "../../hooks/useSceneAnimation";

export default function AppleBackground({
  scene,
}) {
  const animation =
    useSceneAnimation(scene);

  if (!scene?.mediaUrl) {
    return (
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg,#07101C,#0B5D2E)",
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
      }}
    >
      <Img
        src={scene.mediaUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",

          transform: `
            translateX(${animation.x || 0}px)
            translateY(${animation.y || 0}px)
            scale(${animation.scale || 1})
            rotate(${animation.rotate || 0}deg)
          `,

          opacity:
            animation.opacity ?? 1,

          willChange:
            "transform",
        }}
      />
    </AbsoluteFill>
  );
}