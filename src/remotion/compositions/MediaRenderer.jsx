import { AbsoluteFill, Img, Video } from "remotion";
import { useEffect, useRef, useState } from "react";

import { useCameraMotion } from "../hooks/useCameraMotion";
import { getColorGrade } from "../utils/colorGrade";

/**
 * Detects source aspect ratio and adapts:
 * - Matched aspect → cover (fills frame, no bars)
 * - Mismatched aspect → blurred backdrop + contained foreground (CapCut / Reels style)
 */
export function MediaRenderer({ scene }) {
  const camera = useCameraMotion(scene) || {};
  const [sourceAspect, setSourceAspect] = useState(null);
  const measured = useRef(false);

  // Reset when the media URL changes
  useEffect(() => {
    measured.current = false;
    setSourceAspect(null);
  }, [scene?.mediaUrl]);

  const handleImageLoad = (e) => {
    if (measured.current) return;
    const w = e.target.naturalWidth;
    const h = e.target.naturalHeight;
    if (w && h) {
      measured.current = true;
      setSourceAspect(w / h);
    }
  };

  const handleVideoLoad = (e) => {
    if (measured.current) return;
    const w = e.target.videoWidth;
    const h = e.target.videoHeight;
    if (w && h) {
      measured.current = true;
      setSourceAspect(w / h);
    }
  };

  const cameraTransform = `
    translateX(${camera.x ?? 0}px)
    translateY(${camera.y ?? 0}px)
    scale(${camera.scale ?? 1})
    rotate(${camera.rotate ?? 0}deg)
  `;

  const colorGrade = getColorGrade(scene);

  if (!scene?.mediaUrl) {
    return <AbsoluteFill style={{ background: "#111" }} />;
  }

  const isVideo = scene.mediaType === "video";

  // Decide fit mode based on target vs source aspect
  // Target aspect is inferred from stage (parent AbsoluteFill = full frame)
  // We compare source aspect to a reasonable "portrait" threshold (1.0)
  // If we don't know yet, default to cover (matches most uploads reasonably)
  const knownAspect = sourceAspect != null;
  const isLandscape = knownAspect && sourceAspect > 1.15;
  const isPortrait = knownAspect && sourceAspect < 0.85;
  const isSquare = knownAspect && !isLandscape && !isPortrait;

  // If we don't know yet OR portrait/square-ish → cover fills the frame
  // If landscape → contain with blurred backdrop
  const useContainMode = isLandscape || isSquare;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      {/* BLURRED BACKDROP — only when using contain mode */}
      {useContainMode && (
        <AbsoluteFill
          style={{
            filter: "blur(60px) saturate(1.3) brightness(0.7)",
            transform: "scale(1.25)",
            opacity: 0.9,
          }}
        >
          {isVideo ? (
            <Video
              src={scene.mediaUrl}
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Img
              src={scene.mediaUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </AbsoluteFill>
      )}

      {/* Backdrop darkening layer — improves foreground contrast */}
      {useContainMode && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      )}

      {/* MAIN MEDIA */}
      <AbsoluteFill
        style={{
          transform: cameraTransform,
          filter: colorGrade,
          willChange: "transform",
        }}
      >
        {isVideo ? (
          <Video
            src={scene.mediaUrl}
            onLoadedMetadata={handleVideoLoad}
            style={{
              width: "100%",
              height: "100%",
              objectFit: useContainMode ? "contain" : "cover",
            }}
          />
        ) : (
          <Img
            src={scene.mediaUrl}
            onLoad={handleImageLoad}
            style={{
              width: "100%",
              height: "100%",
              objectFit: useContainMode ? "contain" : "cover",
            }}
          />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}