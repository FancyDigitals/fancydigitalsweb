"use client";

export default function GenerateButton({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: "100%",
        height: 48,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        cursor: loading ? "default" : "pointer",
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        background: loading ? "#1F1F1F" : "#0E7A43",
        transition: "all 0.15s ease",
        boxShadow: loading
          ? "none"
          : "0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 24px -8px rgba(14,122,67,0.5)",
        letterSpacing: "-0.01em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {loading ? (
        <>
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
          Generating
        </>
      ) : (
        "Generate Video"
      )}

      <style>{`
        @keyframes fd-btn-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}