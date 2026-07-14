"use client";

export default function Topbar({ video }) {
  return (
    <header
      style={{
        height: 72,
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #0E7A43, #0A5D33)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          F
        </div>
        <div>
          <div
            style={{
              color: "#FAFAFA",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            AI Video Generator
          </div>
          <div
            style={{
              color: "#666",
              marginTop: 2,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Premium AI Commercial Studio
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button style={btn}>Save</button>
        <button style={{ ...btn, ...primary }}>Export</button>
      </div>
    </header>
  );
}

const btn = {
  height: 38,
  padding: "0 16px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.08)",
  background: "#151515",
  color: "#FAFAFA",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  transition: "all 0.15s ease",
};

const primary = {
  background: "#0E7A43",
  border: "1px solid rgba(255,255,255,.1)",
  boxShadow: "0 1px 0 rgba(255,255,255,0.1) inset",
};