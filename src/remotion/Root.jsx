import { Composition } from "remotion";
import { VideoComposition } from "./compositions/VideoComposition";

/**
 * Reads duration + dimensions from the incoming project.
 * Runs both in the Player (browser) and in headless render (export).
 * Falls back to sane defaults if project is missing.
 */
function calculateMetadata({ props }) {
  const project = props?.project;

  if (!project) {
    return {
      durationInFrames: 900,
      fps: 30,
      width: 1080,
      height: 1920,
    };
  }

  const fps = project.fps || 30;

  // Prefer explicit durationInFrames if present
  let durationInFrames = project.durationInFrames;

  // Otherwise compute from totalSeconds or sum of scene durations
  if (!durationInFrames) {
    const totalSeconds =
      project.totalSeconds ||
      (project.scenes || []).reduce(
        (sum, s) => sum + (s.duration || 5),
        0
      ) ||
      30;
    durationInFrames = Math.max(1, Math.round(totalSeconds * fps));
  }

  return {
    durationInFrames,
    fps,
    width: project.width || 1080,
    height: project.height || 1920,
  };
}

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="FancyDigitalsVideo"
        component={VideoComposition}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          project: null,
        }}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};