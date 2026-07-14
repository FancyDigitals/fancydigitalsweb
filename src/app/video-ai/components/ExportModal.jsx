"use client";

import { useState } from "react";
import { sanitizeProjectForExport } from "@/lib/video-ai/export-project";

const FORMATS = [
  {
    id: "mp4-vertical",
    label: "Vertical",
    dimensions: "1080 × 1920",
    subtitle: "TikTok, Reels, Shorts",
    icon: "vertical",
  },
  {
    id: "mp4-landscape",
    label: "Landscape",
    dimensions: "1920 × 1080",
    subtitle: "YouTube, Web",
    icon: "landscape",
  },
  {
    id: "mp4-square",
    label: "Square",
    dimensions: "1080 × 1080",
    subtitle: "Instagram Feed",
    icon: "square",
  },
  {
    id: "gif",
    label: "GIF",
    dimensions: "720 × 1280",
    subtitle: "Animated preview",
    icon: "vertical",
  },
];

/**
 * Patch scenes with missing mediaUrl by fetching a stock image.
 * Runs in the browser right before export so we don't need to regenerate.
 */
async function patchMissingMedia(project) {
  if (!project?.scenes?.length) return project;

  const patched = await Promise.all(
    project.scenes.map(async (scene) => {
      if (scene.mediaUrl) return scene;

      const queries = [
        ...(scene.searchQueries || []),
        scene.imageIntent,
        scene.title,
        "professional",
        "business",
      ].filter(Boolean);

      try {
        const res = await fetch("/api/tools/ai-video-generator/stock-fallback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ queries }),
        });

        if (res.ok) {
          const { url } = await res.json();
          if (url) {
            console.log(`[patch] Scene ${scene.sceneNumber}: filled with stock`);
            return { ...scene, mediaUrl: url, mediaSource: "stock", assetType: "stock" };
          }
        }
      } catch (err) {
        console.warn(`[patch] Scene ${scene.sceneNumber} stock fetch failed`, err);
      }

      // Last resort: SVG gradient data URL
      const brand = project.brand?.color || "#0E7A43";
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920"><defs><linearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"><stop offset="0%25" stop-color="${brand}" stop-opacity="0.6"/><stop offset="100%25" stop-color="#000"/></linearGradient></defs><rect width="1080" height="1920" fill="url(%23g)"/></svg>`;
      const dataUrl = `data:image/svg+xml;utf8,${svg}`;
      console.log(`[patch] Scene ${scene.sceneNumber}: gradient fallback`);
      return { ...scene, mediaUrl: dataUrl, mediaSource: "gradient", assetType: "fallback" };
    })
  );

  return { ...project, scenes: patched };
}

export default function ExportModal({ project, onClose }) {
  const [selected, setSelected] = useState("mp4-vertical");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState("");

  const handleExport = async () => {
    setStatus("rendering");
    setError(null);

    try {
      setProgress("Filling missing scene images…");
      const patchedProject = await patchMissingMedia(project);

      setProgress("Preparing payload…");
      const cleanProject = sanitizeProjectForExport(patchedProject);

      setProgress("Rendering video on server…");
      const res = await fetch("/api/tools/ai-video-generator/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: cleanProject, format: selected }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || `Export failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fancy-digitals-${Date.now()}.${
        selected === "gif" ? "gif" : "mp4"
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("done");
      setTimeout(onClose, 1200);
    } catch (err) {
      console.error("[export]", err);
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <div
      onClick={status === "rendering" ? undefined : onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,6,6,0.85)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#0C0C0C",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                color: "#666",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Export
            </div>
            <h2
              style={{
                margin: 0,
                color: "#FAFAFA",
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Choose format
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={status === "rendering"}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#141414",
              color: "#A1A1A1",
              cursor: status === "rendering" ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: status === "rendering" ? 0.4 : 1,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {FORMATS.map((f) => (
            <FormatCard
              key={f.id}
              format={f}
              selected={selected === f.id}
              disabled={status === "rendering"}
              onClick={() => setSelected(f.id)}
            />
          ))}
        </div>

        {error && (
          <div
            style={{
              padding: 12,
              background: "rgba(255,107,107,0.08)",
              border: "1px solid rgba(255,107,107,0.2)",
              borderRadius: 10,
              color: "#FF6B6B",
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleExport}
          disabled={status === "rendering" || status === "done"}
          style={{
            width: "100%",
            height: 48,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            cursor:
              status === "rendering" || status === "done"
                ? "default"
                : "pointer",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            background:
              status === "done"
                ? "#0E7A43"
                : status === "rendering"
                ? "#1F1F1F"
                : "#0E7A43",
            transition: "all 0.15s ease",
            boxShadow:
              status === "rendering"
                ? "none"
                : "0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 24px -8px rgba(14,122,67,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {status === "rendering" && (
            <span
              style={{
                width: 14,
                height: 14,
                border: "1.5px solid rgba(255,255,255,0.25)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "fd-btn-spin 0.7s linear infinite",
              }}
            />
          )}
          {status === "idle" && "Render & Download"}
          {status === "rendering" && (progress || "Rendering… this may take 30–90s")}
          {status === "done" && "✓ Downloaded"}
          {status === "error" && "Try again"}
        </button>

        <p
          style={{
            color: "#555",
            fontSize: 11,
            fontWeight: 500,
            margin: "16px 0 0",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Rendering happens on our servers. Do not close this window.
        </p>

        <style>{`
          @keyframes fd-btn-spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}

function FormatCard({ format, selected, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: 16,
        borderRadius: 12,
        background: selected ? "rgba(14,122,67,0.08)" : "#141414",
        border: selected
          ? "1.5px solid #0E7A43"
          : "1px solid rgba(255,255,255,0.06)",
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
        opacity: disabled ? 0.5 : 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <FormatIcon type={format.icon} selected={selected} />

      <div>
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {format.label}
        </div>
        <div
          style={{
            color: "#888",
            fontSize: 11,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {format.dimensions}
        </div>
        <div
          style={{
            color: "#555",
            fontSize: 10,
            fontWeight: 500,
            marginTop: 4,
          }}
        >
          {format.subtitle}
        </div>
      </div>
    </button>
  );
}

function FormatIcon({ type, selected }) {
  const color = selected ? "#0E7A43" : "#666";
  const dims = {
    vertical: { w: 16, h: 22 },
    landscape: { w: 22, h: 14 },
    square: { w: 18, h: 18 },
  };
  const { w, h } = dims[type];

  return (
    <div
      style={{
        width: 22,
        height: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          border: `1.5px solid ${color}`,
          borderRadius: 3,
          transition: "border-color 0.15s ease",
        }}
      />
    </div>
  );
}