import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from "remotion";

import { SceneRenderer } from "./SceneRenderer";
import { AudioTrack } from "./AudioTrack";

export function VideoComposition({ project }) {
  const { fps } = useVideoConfig();

  if (!project || !Array.isArray(project.scenes)) {
    return <AbsoluteFill style={{ background: "#000" }} />;
  }

  // Precompute durations first (avoid mutation during render)
  const scenesWithTiming = project.scenes.map((scene) => {
    const durationInFrames = Math.max(
      1,
      Math.round((scene.duration || 5) * fps)
    );

    return {
      ...scene,
      durationInFrames,
    };
  });

  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {scenesWithTiming.map((scene, index) => {
        const start = currentFrame;
        currentFrame += scene.durationInFrames;

        return (
          <Sequence
            key={scene.id || `scene-${index}`}
            from={start}
            durationInFrames={scene.durationInFrames}
          >
            <SceneRenderer scene={scene} project={project} />
          </Sequence>
        );
      })}

      {/* Audio layer spans full timeline */}
      <AudioTrack project={project} />
    </AbsoluteFill>
  );
}