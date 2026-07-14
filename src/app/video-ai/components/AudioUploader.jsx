"use client";

import { useRef, useState } from "react";

const ACCEPTED = "audio/mpeg,audio/mp3,audio/wav,audio/m4a,audio/aac";
const MAX_SIZE = 15 * 1024 * 1024; // 15MB

export default function AudioUploader({ label, value, onChange, placeholder }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    setError(null);
    if (!file) return;

    if (file.size > MAX_SIZE) {
      setError("File must be under 15MB");
      return;
    }
    if (!/^audio\//.test(file.type)) {
      setError("Use MP3, WAV, M4A, or AAC");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({ name: file.name, data: e.target.result });
    };
    reader.onerror = () => setError("Could not read file");
    reader.readAsDataURL(file);
  };

  if (value?.data) {
    return (
      <div
        style={{
          padding: 12,
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
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "linear-gradient(180deg, #0E7A43, #0A5D33)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 3l6 4-6 4V3zM10 3v8"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "#FAFAFA",
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value.name}
          </div>
          <div
            style={{
              color: "#666",
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Will override AI generation
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
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        style={{
          padding: 14,
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
            color: "#FAFAFA",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {placeholder || "MP3, WAV, M4A · under 15MB"}
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