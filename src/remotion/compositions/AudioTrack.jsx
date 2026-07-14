import { Audio, Sequence, useVideoConfig } from "remotion";

export function AudioTrack({ project }) {
  const { fps } = useVideoConfig();

  if (!project) return null;

  const hasVoiceover = !!project.voiceover?.audio;
  const musicVolume = hasVoiceover
    ? project.music?.duckVolume ?? 0.1
    : project.music?.volume ?? 0.28;

  const startPadding = project.voiceover?.startPadding || 0;
  const voiceoverStartFrame = Math.round(startPadding * fps);

  return (
    <>
      {project.music?.url && (
        <Audio src={project.music.url} volume={musicVolume} loop />
      )}

      {hasVoiceover && (
        <Sequence from={voiceoverStartFrame}>
          <Audio src={project.voiceover.audio} volume={1} />
        </Sequence>
      )}
    </>
  );
}