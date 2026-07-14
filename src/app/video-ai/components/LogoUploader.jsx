"use client";

import { useRef, useState } from "react";

const ACCEPTED = "image/png,image/svg+xml,image/webp,image/jpeg,image/jpg";
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default function LogoUploader({ logo, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = (file) => {
    setError(null);
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setError("Logo must be under 2MB");
      return;
    }

    if (!ACCEPTED.includes(file.type)) {
      setError("Use PNG, SVG, WebP or JPG");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.onerror = () => setError("Could not read file");
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  if (logo) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            padding: 16,
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background:
                "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "#FAFAFA",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Logo uploaded
            </div>
            <div
              style={{
                color: "#666",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              Ready to render
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            style={{
              padding: "6px 10px",
              background: "transparent",
              color: "#A1A1A1",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          padding: 20,
          borderRadius: 10,
          border: `1.5px dashed ${
            dragOver ? "#0E7A43" : "rgba(255,255,255,0.08)"
          }`,
          background: dragOver ? "rgba(14,122,67,0.05)" : "#141414",
          cursor: "pointer",
          textAlign: "center",
          transition: "all 0.15s ease",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            margin: "0 auto 8px",
            borderRadius: 8,
            background: "#0A0A0A",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#A1A1A1",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v9m0-9L4 4m3-3l3 3M2 13h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            color: "#FAFAFA",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          Upload your logo
        </div>
        <div
          style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          PNG · SVG · WebP · JPG · under 2MB
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />
      </div>
      {error && (
        <div
          style={{
            marginTop: 8,
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
    </>
  );
}