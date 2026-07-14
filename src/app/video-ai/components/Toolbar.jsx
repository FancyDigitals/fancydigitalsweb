"use client";

export default function Toolbar() {
  return (
    <header
      style={{
        height: 72,
        background: "#0A0A0A",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
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
            fontSize: 12,
            marginTop: 3,
            fontWeight: 500,
          }}
        >
          Create premium AI commercials
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button style={button}>Save</button>
        <button style={{ ...button, ...primary }}>Export</button>
      </div>
    </header>
  );
}

const button = {
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