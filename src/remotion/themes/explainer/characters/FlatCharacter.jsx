import { Lottie } from "@remotion/lottie";
import { useEffect, useState } from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  delayRender,
  continueRender,
  staticFile,
} from "remotion";

/**
 * Professional Lottie-based character.
 * Uses pre-rigged animations from LottieFiles.
 *
 * Poses: waving | pointing | presenting | thinking | explaining | celebrating | standing | confused | talking
 */
const POSE_MAP = {
  waving: "waving.json",
  pointing: "pointing.json",
  presenting: "presenting.json",
  thinking: "thinking.json",
  celebrating: "celebrating.json",
  standing: "standing.json",
  confused: "confused.json",
  explaining: "talking.json",
  talking: "talking.json",
};

export function FlatCharacter({
  scene,
  pose = "presenting",
  size = 520,
  delay = 0,
  facing = "right",
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [animationData, setAnimationData] = useState(null);
  const [handle] = useState(() => delayRender("Loading Lottie character"));

  const file = POSE_MAP[pose] || POSE_MAP.presenting;
  const src = staticFile(`/lotties/characters/${file}`);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("[Lottie] Failed to load character:", err);
        continueRender(handle);
      });
  }, [src, handle]);

  // Entry animation
  const enter = spring({
    fps,
    frame: frame - delay,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });
  const entryOpacity = interpolate(enter, [0, 1], [0, 1]);
  const entryScale = interpolate(enter, [0, 1], [0.7, 1]);
  const entryY = interpolate(enter, [0, 1], [60, 0]);

  // Continuous subtle motion
  const bob = Math.sin(frame / 45) * 3;

  if (!animationData) {
    return (
      <div
        style={{
          width: size,
          height: size * 1.4,
          ...style,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size * 1.4,
        opacity: entryOpacity,
        transform: `translateY(${entryY + bob}px) scale(${entryScale}) ${
          facing === "left" ? "scaleX(-1)" : ""
        }`,
        transformOrigin: "center bottom",
        ...style,
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}