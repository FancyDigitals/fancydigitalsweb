import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Fake amplitude-based lip sync.
 * Returns a value 0..1 representing mouth openness at the current frame.
 *
 * Real amplitude reading requires @remotion/media-utils and audio analysis
 * which is heavy. This approximation looks great and is deterministic.
 */
export function useLipSync({
  scene,
  isTalking = true,
  intensity = 1,
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!isTalking) return { openness: 0, mouthShape: "closed" };

  // Only animate mouth when this scene has voiceover
  const hasVoiceover = !!scene?.voiceover?.trim();
  if (!hasVoiceover) return { openness: 0.1, mouthShape: "closed" };

  // Multiple overlapping sine waves = natural chattering
  const wave1 = Math.sin(frame * 0.55) * 0.5;
  const wave2 = Math.sin(frame * 0.9 + 1.3) * 0.3;
  const wave3 = Math.sin(frame * 1.6 + 0.7) * 0.2;

  const combined = wave1 + wave2 + wave3;

  // Normalize to 0..1
  const openness = Math.max(0, Math.min(1, (combined + 1) * 0.5)) * intensity;

  // Pick mouth shape based on openness
  let mouthShape;
  if (openness < 0.15) mouthShape = "closed";
  else if (openness < 0.35) mouthShape = "small";
  else if (openness < 0.6) mouthShape = "medium";
  else mouthShape = "wide";

  // Occasional "O" shape for variety
  if (Math.sin(frame * 0.2) > 0.85 && openness > 0.3) mouthShape = "round";

  return { openness, mouthShape };
}

/**
 * Blink animation — eyes close briefly every 3-5 seconds.
 */
export function useBlink() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blinkCycle = fps * 4; // blink every 4 seconds
  const blinkDuration = 4; // frames
  const framesSinceBlink = frame % blinkCycle;

  if (framesSinceBlink < blinkDuration) {
    return 0.1; // eyes almost closed
  }
  return 1; // eyes open
}