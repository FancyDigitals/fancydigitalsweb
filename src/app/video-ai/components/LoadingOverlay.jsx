"use client";

export default function LoadingOverlay({ show, progress = [] }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(6,6,6,0.85)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#0C0C0C",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            border: "2px solid rgba(255,255,255,0.08)",
            borderTopColor: "#0E7A43",
            borderRadius: "50%",
            animation: "fd-spin 0.8s linear infinite",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#FAFAFA",
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Generating your video
          </div>
          <div
            style={{
              color: "#888",
              fontSize: 13,
              marginTop: 6,
              fontWeight: 500,
            }}
          >
            This usually takes 30 – 60 seconds
          </div>
        </div>

        {progress.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {progress.map((step, i) => (
              <ProgressStep key={i} step={step} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fd-spin { to { transform: rotate(360deg); } }
        @keyframes fd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function ProgressStep({ step }) {
  const { label, active, done, error } = step;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: error
          ? "#FF6B6B"
          : done
          ? "#FAFAFA"
          : active
          ? "#FAFAFA"
          : "#555",
        fontSize: 13,
        fontWeight: 500,
        transition: "color 0.2s ease",
      }}
    >
      <StepIcon active={active} done={done} error={error} />
      <span
        style={{
          animation: active ? "fd-pulse 1.4s ease-in-out infinite" : "none",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StepIcon({ active, done, error }) {
  const size = 16;

  if (error) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#FF6B6B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M2 2l4 4M6 2l-4 4"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (done) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#0E7A43",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
          <path
            d="M1.5 4.5l2 2 4-4"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (active) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.15)",
          borderTopColor: "#0E7A43",
          animation: "fd-spin 0.8s linear infinite",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.1)",
        flexShrink: 0,
      }}
    />
  );
}