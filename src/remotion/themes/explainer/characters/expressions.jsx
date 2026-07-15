export function Eyes({ blinkFactor = 1, color = "#2A1810" }) {
  // blinkFactor: 1 = fully open, 0 = closed
  const eyeHeight = 10 * blinkFactor;

  return (
    <svg viewBox="0 0 80 30" width="80" height="30">
      {/* Left eye */}
      <ellipse
        cx="20"
        cy="15"
        rx="8"
        ry={eyeHeight}
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />
      {blinkFactor > 0.3 && (
        <>
          <circle cx="20" cy="15" r={5 * blinkFactor} fill={color} />
          <circle cx="22" cy="13" r="2" fill="white" />
        </>
      )}

      {/* Right eye */}
      <ellipse
        cx="60"
        cy="15"
        rx="8"
        ry={eyeHeight}
        fill="white"
        stroke={color}
        strokeWidth="1.5"
      />
      {blinkFactor > 0.3 && (
        <>
          <circle cx="60" cy="15" r={5 * blinkFactor} fill={color} />
          <circle cx="62" cy="13" r="2" fill="white" />
        </>
      )}
    </svg>
  );
}

export function Eyebrows({ mood = "neutral", color = "#2A1810" }) {
  const shapes = {
    neutral: "M 10 5 Q 20 3 30 5 M 50 5 Q 60 3 70 5",
    happy: "M 10 8 Q 20 3 30 8 M 50 8 Q 60 3 70 8",
    surprised: "M 10 3 Q 20 0 30 3 M 50 3 Q 60 0 70 3",
    focused: "M 8 7 L 32 5 M 48 5 L 72 7",
  };

  return (
    <svg viewBox="0 0 80 10" width="80" height="10">
      <path
        d={shapes[mood] || shapes.neutral}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}