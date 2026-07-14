"use client";

import { useRef, useState } from "react";

const ACCEPTED = "image/jpeg,image/jpg,image/png,image/webp";
const MAX_SIZE = 15 * 1024 * 1024; // 15MB raw input (compressed below)
const MAX_COUNT = 20;

// Compression targets
const MAX_DIMENSION = 1920; // longest edge
const JPEG_QUALITY = 0.85;

const ROLES = [
  { id: "auto", label: "AI decide" },
  { id: "hero", label: "Hero" },
  { id: "opening", label: "Opening" },
  { id: "ending", label: "Ending" },
  { id: "logo", label: "Logo" },
  { id: "product", label: "Product" },
  { id: "team", label: "Team" },
  { id: "office", label: "Office" },
];

/**
 * Downscale + recompress an image file to a JPEG data URL.
 * Preserves quality while dramatically shrinking payload size.
 */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        let targetW = width;
        let targetH = height;

        // Scale down longest edge to MAX_DIMENSION
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width >= height) {
            targetW = MAX_DIMENSION;
            targetH = Math.round((height / width) * MAX_DIMENSION);
          } else {
            targetH = MAX_DIMENSION;
            targetW = Math.round((width / height) * MAX_DIMENSION);
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, targetW, targetH);

        // Preserve PNG transparency for logos
        const isPng = file.type === "image/png";
        const output = isPng
          ? canvas.toDataURL("image/png")
          : canvas.toDataURL("image/jpeg", JPEG_QUALITY);

        resolve({
          data: output,
          originalSize: file.size,
          compressedSize: Math.round((output.length * 3) / 4),
          width: targetW,
          height: targetH,
        });
      };
      img.onerror = () => reject(new Error("Image decode failed"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

export default function AssetUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [reorderFrom, setReorderFrom] = useState(null);

  const addFiles = async (files) => {
    setError(null);
    const list = Array.from(files || []);
    if (!list.length) return;

    const remaining = MAX_COUNT - images.length;
    if (remaining <= 0) {
      setError(`Limit is ${MAX_COUNT} images`);
      return;
    }

    const accepted = list.slice(0, remaining).filter((f) => {
      if (f.size > MAX_SIZE) return false;
      if (!ACCEPTED.includes(f.type)) return false;
      return true;
    });

    if (!accepted.length) {
      setError("No valid images (JPG/PNG/WebP, under 15MB)");
      return;
    }

    setProcessing(true);
    try {
      const results = await Promise.all(
        accepted.map(async (file) => {
          try {
            const { data, originalSize, compressedSize, width, height } =
              await compressImage(file);
            console.log(
              `[Upload] "${file.name}": ${(originalSize / 1024).toFixed(
                0
              )}KB → ${(compressedSize / 1024).toFixed(0)}KB (${width}×${height})`
            );
            return {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              name: file.name,
              data,
              role: "auto",
              note: "",
              width,
              height,
            };
          } catch (err) {
            console.warn(`[Upload] Failed to process ${file.name}:`, err);
            return null;
          }
        })
      );

      const clean = results.filter(Boolean);
      onChange([...(images || []), ...clean]);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setProcessing(false);
    }
  };

  const remove = (id) => {
    onChange(images.filter((i) => i.id !== id));
    if (openId === id) setOpenId(null);
  };

  const patch = (id, delta) => {
    onChange(images.map((i) => (i.id === id ? { ...i, ...delta } : i)));
  };

  const moveTo = (from, to) => {
    if (from === to || from == null || to == null) return;
    const arr = [...images];
    const [x] = arr.splice(from, 1);
    arr.splice(to, 0, x);
    onChange(arr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        onClick={() => !processing && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        style={{
          padding: 16,
          borderRadius: 10,
          border: `1.5px dashed ${
            dragOver ? "#0E7A43" : "rgba(255,255,255,0.08)"
          }`,
          background: dragOver ? "rgba(14,122,67,0.05)" : "#141414",
          cursor: processing ? "wait" : "pointer",
          textAlign: "center",
          transition: "all 0.15s ease",
          opacity: processing ? 0.6 : 1,
        }}
      >
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {processing ? "Compressing images…" : "Upload images"}
        </div>
        <div
          style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          JPG · PNG · WebP · up to {MAX_COUNT} · auto-optimized
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          onChange={(e) => addFiles(e.target.files)}
          style={{ display: "none" }}
        />
      </div>

      {error && (
        <div
          style={{
            padding: "8px 12px",
            background: "rgba(255,107,107,0.08)",
            border: "1px solid rgba(255,107,107,0.2)",
            borderRadius: 8,
            color: "#FF6B6B",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: 8,
          }}
        >
          {images.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => setReorderFrom(idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                moveTo(reorderFrom, idx);
                setReorderFrom(null);
              }}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                borderRadius: 8,
                overflow: "hidden",
                border:
                  img.role !== "auto"
                    ? "1.5px solid #0E7A43"
                    : "1px solid rgba(255,255,255,0.06)",
                background: "#141414",
                cursor: "grab",
              }}
            >
              <img
                src={img.data}
                alt={img.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 4,
                  left: 4,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              {img.role !== "auto" && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    right: 4,
                    padding: "3px 6px",
                    borderRadius: 4,
                    background: "rgba(14,122,67,0.85)",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    textAlign: "center",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {img.role}
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  display: "flex",
                  gap: 4,
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenId(openId === img.id ? null : img.id);
                  }}
                  style={iconBtn}
                  aria-label="Edit"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 7l6-6 2 2-6 6H1V7z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(img.id);
                  }}
                  style={iconBtn}
                  aria-label="Remove"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 2l6 6M8 2l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {openId &&
        (() => {
          const img = images.find((i) => i.id === openId);
          if (!img) return null;
          return (
            <div
              style={{
                padding: 12,
                background: "#141414",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  color: "#A1A1A1",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {img.name}
              </div>

              <div>
                <label style={label}>Role</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                  }}
                >
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => patch(img.id, { role: r.id })}
                      style={{
                        padding: "5px 10px",
                        borderRadius: 6,
                        border:
                          img.role === r.id
                            ? "1px solid #0E7A43"
                            : "1px solid rgba(255,255,255,0.06)",
                        background:
                          img.role === r.id
                            ? "rgba(14,122,67,0.15)"
                            : "#0A0A0A",
                        color: img.role === r.id ? "#FAFAFA" : "#A1A1A1",
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={label}>Note (optional)</label>
                <input
                  value={img.note || ""}
                  onChange={(e) => patch(img.id, { note: e.target.value })}
                  placeholder="e.g. use in scene 3"
                  style={inputStyle}
                />
              </div>
            </div>
          );
        })()}
    </div>
  );
}

const iconBtn = {
  width: 22,
  height: 22,
  border: 0,
  borderRadius: 6,
  background: "rgba(0,0,0,0.7)",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const label = {
  display: "block",
  color: "#A1A1A1",
  marginBottom: 6,
  fontWeight: 500,
  fontSize: 11,
};

const inputStyle = {
  width: "100%",
  background: "#0A0A0A",
  color: "#FAFAFA",
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: 8,
  padding: "8px 10px",
  outline: "none",
  fontSize: 12,
  fontWeight: 500,
  fontFamily: "inherit",
};