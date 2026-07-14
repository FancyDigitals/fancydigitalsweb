"use client";

import { useState } from "react";
import { Player } from "@remotion/player";
import { VideoComposition } from "@/remotion/compositions/VideoComposition";

export default function TestVideoAI() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setProject(null);

    try {
      const res = await fetch("/api/tools/ai-video-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: "Fancy Digitals",
          description:
            "AI-powered digital agency helping businesses grow online.",
          audience: "Business owners",
          goal: "Generate more leads",
          tone: "Premium",
          duration: 30,
          aspectRatio: "9:16",
          uploadedImages: [],
        }),
      });

      const json = await res.json();
      console.log("[project]", json);

      if (json.success) {
        setProject(json.project);
      } else {
        setError(json.error || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  const durationInFrames = project?.durationInFrames || 900;
  const fps = project?.fps || 30;

  return (
    <main
      style={{
        padding: 40,
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>
        AI Video Generator — Test
      </h1>

      <button
        onClick={generate}
        disabled={loading}
        style={{
          padding: "14px 28px",
          background: loading ? "#333" : "#0E7A43",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: 24,
        }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {error && (
        <div
          style={{
            padding: 16,
            background: "#3a0f0f",
            border: "1px solid #6b1f1f",
            borderRadius: 8,
            color: "#ff8a8a",
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {project && (
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "#888", marginBottom: 12 }}>
              {project.scenes?.length || 0} scenes · {durationInFrames} frames · {fps}fps
            </p>

            <Player
  component={VideoComposition}
  durationInFrames={project.durationInFrames || 900}
  compositionWidth={project.width || 1080}
  compositionHeight={project.height || 1920}
  fps={project.fps || 30}
  controls
  style={{
    width: 390,
    background: "#000",
  }}
  inputProps={{ project }}
/>
          </div>

          <pre
            style={{
              flex: 1,
              color: "#8fef8f",
              maxHeight: 700,
              overflow: "auto",
              fontSize: 11,
              background: "#111",
              padding: 16,
              borderRadius: 8,
              border: "1px solid #222",
            }}
          >
            {JSON.stringify(project.scenes, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}