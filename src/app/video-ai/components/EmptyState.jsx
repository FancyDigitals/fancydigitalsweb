"use client";

export default function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 360,
          padding: 24,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            margin: "0 auto 20px",
            borderRadius: 14,
            background:
              "linear-gradient(180deg, #151515 0%, #0D0D0D 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#A1A1A1",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          style={{
            color: "#FAFAFA",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            margin: "0 0 8px",
          }}
        >
          Your commercial will appear here
        </h2>

        <p
          style={{
            color: "#888",
            lineHeight: 1.55,
            fontSize: 13,
            fontWeight: 500,
            margin: 0,
          }}
        >
          Enter your business brief, choose a theme, then
          generate a premium commercial.
        </p>
      </div>
    </div>
  );
}