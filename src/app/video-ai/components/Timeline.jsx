"use client";

import { useState } from "react";

export default function Timeline({ video }) {
  const { project, sceneIndex, seekToScene, reorderScenes } = video;
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const scenes = project?.scenes || [];
  const empty = scenes.length === 0;

  const handleDragStart = (i) => setDragIndex(i);
  const handleDragOver = (e, i) => {
    e.preventDefault();
    setDragOverIndex(i);
  };
  const handleDrop = (e, i) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== i) {
      reorderScenes(dragIndex, i);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <footer
      style={{
        background: "#080808",
        overflowX: "auto",
        overflowY: "hidden",
        padding: "16px clamp(16px, 4vw, 24px)",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            color: "#A1A1A1",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Timeline
        </div>
        <div
          style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {empty ? "No scenes" : `${scenes.length} scene${scenes.length === 1 ? "" : "s"}`}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        {empty
          ? Array.from({ length: 6 }).map((_, i) => (
              <PlaceholderCard key={i} index={i} />
            ))
          : scenes.map((scene, i) => (
              <SceneCard
                key={i}
                index={i}
                scene={scene}
                selected={i === sceneIndex}
                dragOver={dragOverIndex === i}
                dragging={dragIndex === i}
                onClick={() => seekToScene(i)}
                onDragStart={() => handleDragStart(i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={(e) => handleDrop(e, i)}
                onDragEnd={handleDragEnd}
              />
            ))}
      </div>
    </footer>
  );
}

function SceneCard({
  index,
  scene,
  selected,
  dragOver,
  dragging,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) {
  const title = scene.title || scene.headline || `Scene ${index + 1}`;
  const duration = scene.duration || 5;
  const thumb = scene.mediaUrl;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: 140,
        flexShrink: 0,
        cursor: "pointer",
        opacity: dragging ? 0.4 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <div
        style={{
          height: 78,
          borderRadius: 10,
          background: thumb
            ? `url(${thumb}) center/cover no-repeat, #141414`
            : "linear-gradient(180deg, #1A1A1A 0%, #141414 100%)",
          border: selected
            ? "1.5px solid #0E7A43"
            : dragOver
            ? "1.5px dashed rgba(14,122,67,0.6)"
            : "1px solid rgba(255,255,255,.06)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.15s ease",
          boxShadow: selected
            ? "0 0 0 3px rgba(14,122,67,0.15)"
            : "none",
        }}
      >
        {thumb && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            top: 6,
            left: 8,
            color: thumb ? "#fff" : "#666",
            fontSize: 10,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            textShadow: thumb ? "0 1px 2px rgba(0,0,0,0.6)" : "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 8,
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
            padding: "2px 6px",
            background: "rgba(0,0,0,0.5)",
            borderRadius: 4,
            backdropFilter: "blur(4px)",
          }}
        >
          {duration}s
        </div>
      </div>

      <div
        style={{
          color: selected ? "#FAFAFA" : "#888",
          marginTop: 8,
          textAlign: "center",
          fontSize: 12,
          fontWeight: selected ? 600 : 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "color 0.15s ease",
        }}
      >
        {title}
      </div>
    </div>
  );
}

function PlaceholderCard({ index }) {
  return (
    <div style={{ width: 140, flexShrink: 0 }}>
      <div
        style={{
          height: 78,
          borderRadius: 10,
          background:
            "linear-gradient(180deg, #101010 0%, #0C0C0C 100%)",
          border: "1px dashed rgba(255,255,255,.05)",
        }}
      />
      <div
        style={{
          color: "#333",
          marginTop: 8,
          textAlign: "center",
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        Scene {index + 1}
      </div>
    </div>
  );
}