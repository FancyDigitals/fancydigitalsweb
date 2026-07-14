"use client";

import { Player } from "@remotion/player";
import { useMemo, useState } from "react";
import { VideoComposition } from "@/remotion/compositions/VideoComposition";
import EmptyState from "./EmptyState";
import ExportModal from "./ExportModal";

export default function Preview({ video }) {
  const {
    project,
    playerRef,
    isPlaying,
    play,
    pause,
    nextScene,
    prevScene,
    sceneIndex,
  } = video;

  const [exportOpen, setExportOpen] = useState(false);

  const dimensions = useMemo(() => {
    if (!project) return { w: 1080, h: 1920 };
    return {
      w: project.width || 1080,
      h: project.height || 1920,
    };
  }, [project]);

  return (
    <section
      style={{
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: "clamp(20px, 4vw, 40px)",
        flex: 1,
        minWidth: 0,
        minHeight: 480,
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {project && (
        <button
          onClick={() => setExportOpen(true)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 5,
            padding: "8px 16px",
            background: "#0E7A43",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 24px -8px rgba(14,122,67,0.5)",
            transition: "all 0.15s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v8m0 0l-3-3m3 3l3-3M2 11h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          minHeight: 320,
          position: "relative",
        }}
      >
        {!project ? (
          <EmptyState />
        ) : (
          <PlayerFrame
            project={project}
            playerRef={playerRef}
            dimensions={dimensions}
          />
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {project && (
          <SceneCounter
            current={sceneIndex + 1}
            total={project.scenes?.length || 0}
          />
        )}

        <div
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 10px",
            background: "#0F0F0F",
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 14,
          }}
        >
          <button
            style={btn}
            onClick={prevScene}
            disabled={!project}
            aria-label="Previous scene"
          >
            <Icon path="M6 4l-4 4 4 4M14 4l-4 4 4 4" />
          </button>

          {isPlaying ? (
            <button
              style={play_btn}
              onClick={pause}
              disabled={!project}
              aria-label="Pause"
            >
              <Icon path="M5 3v10M11 3v10" />
            </button>
          ) : (
            <button
              style={play_btn}
              onClick={play}
              disabled={!project}
              aria-label="Play"
            >
              <Icon path="M5 3l8 5-8 5V3z" fill />
            </button>
          )}

          <button
            style={btn}
            onClick={nextScene}
            disabled={!project}
            aria-label="Next scene"
          >
            <Icon path="M2 4l4 4-4 4M10 4l4 4-4 4" />
          </button>
        </div>
      </div>

      {exportOpen && (
        <ExportModal
          project={project}
          onClose={() => setExportOpen(false)}
        />
      )}
    </section>
  );
}

function PlayerFrame({ project, playerRef, dimensions }) {
  const durationInFrames = project.durationInFrames || 900;
  const fps = project.fps || 30;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        maxHeight: "100%",
        aspectRatio: `${dimensions.w} / ${dimensions.h}`,
        maxWidth: "100%",
        borderRadius: 28,
        overflow: "hidden",
        background: "#000",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <Player
  ref={playerRef}
  component={VideoComposition}
  inputProps={{ project }}
  durationInFrames={durationInFrames}
  compositionWidth={dimensions.w}
  compositionHeight={dimensions.h}
  fps={fps}
  numberOfSharedAudioTags={20}
  style={{
    width: "100%",
    height: "100%",
  }}
  acknowledgeRemotionLicense
/>
    </div>
  );
}

function SceneCounter({ current, total }) {
  return (
    <div
      style={{
        padding: "8px 14px",
        background: "#0F0F0F",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 14,
        color: "#A1A1A1",
        fontSize: 12,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {String(current).padStart(2, "0")}
      <span style={{ color: "#444", margin: "0 4px" }}>/</span>
      {String(total).padStart(2, "0")}
    </div>
  );
}

function Icon({ path, fill }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill ? "currentColor" : "none"}
      />
    </svg>
  );
}

const btn = {
  width: 38,
  height: 38,
  borderRadius: 10,
  border: 0,
  background: "transparent",
  color: "#A1A1A1",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
};

const play_btn = {
  ...btn,
  width: 42,
  height: 42,
  borderRadius: 12,
  background: "#0E7A43",
  color: "#fff",
  boxShadow: "0 1px 0 rgba(255,255,255,0.12) inset",
};