import { interpolate, useCurrentFrame } from "remotion";
import { explainerTokens } from "../tokens";

/**
 * Illustrated scene backdrops.
 * Placed behind characters to add environment context.
 */
export function SceneBackdrop({ type = "office", opacity = 0.9 }) {
  const frame = useCurrentFrame();

  const Backdrop = BACKDROPS[type] || BACKDROPS.office;

  const fadeIn = interpolate(frame, [0, 20], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fadeIn,
        pointerEvents: "none",
      }}
    >
      <Backdrop frame={frame} />
    </div>
  );
}

const BACKDROPS = {
  office: ({ frame }) => (
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Floor */}
      <rect y="1400" width="1080" height="520" fill="#D9C4A8" />
      {/* Back wall */}
      <rect width="1080" height="1400" fill="#F5EBD8" />
      {/* Window frame */}
      <rect x="150" y="200" width="350" height="450" fill="#87CEEB" />
      <rect x="150" y="200" width="350" height="450" fill="none" stroke="#4A3C28" strokeWidth="12" />
      <line x1="325" y1="200" x2="325" y2="650" stroke="#4A3C28" strokeWidth="6" />
      <line x1="150" y1="425" x2="500" y2="425" stroke="#4A3C28" strokeWidth="6" />
      {/* Sun in window */}
      <circle cx="380" cy="320" r="40" fill="#FFD93D" />
      {/* Plant */}
      <rect x="850" y="1100" width="120" height="140" fill="#8B5E3C" rx="8" />
      <ellipse cx="910" cy="1050" rx="80" ry="60" fill="#6BCB77" />
      <ellipse cx="880" cy="990" rx="60" ry="50" fill="#57B863" />
      <ellipse cx="940" cy="1000" rx="55" ry="45" fill="#6BCB77" />
      {/* Desk */}
      <rect x="80" y="1350" width="920" height="60" fill="#8B5E3C" rx="4" />
      <rect x="120" y="1410" width="30" height="200" fill="#6B4423" />
      <rect x="930" y="1410" width="30" height="200" fill="#6B4423" />
    </svg>
  ),

  home: ({ frame }) => (
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="1080" height="1400" fill="#FEF0E8" />
      <rect y="1400" width="1080" height="520" fill="#B87A54" />
      {/* Picture frame */}
      <rect x="200" y="300" width="200" height="260" fill="white" stroke="#8B5E3C" strokeWidth="15" />
      <rect x="220" y="320" width="160" height="220" fill="#87CEEB" />
      <circle cx="300" cy="400" r="30" fill="#FFD93D" />
      <path d="M 220 500 L 280 450 L 340 480 L 380 460 L 380 540 L 220 540 Z" fill="#6BCB77" />
      {/* Lamp */}
      <rect x="820" y="1000" width="20" height="350" fill="#2C3E50" />
      <path d="M 780 900 L 880 900 L 860 1000 L 800 1000 Z" fill="#FFD93D" />
      {/* Couch back */}
      <rect x="0" y="1250" width="1080" height="200" fill="#E74C3C" rx="20" />
    </svg>
  ),

  city: ({ frame }) => {
    const cloudX = ((frame * 0.5) % 1200) - 100;
    return (
      <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {/* Sky */}
        <rect width="1080" height="1300" fill="#87CEEB" />
        {/* Ground */}
        <rect y="1300" width="1080" height="620" fill="#5D6D7E" />
        {/* Buildings */}
        <rect x="0" y="700" width="200" height="600" fill="#34495E" />
        <rect x="200" y="500" width="180" height="800" fill="#2C3E50" />
        <rect x="380" y="800" width="150" height="500" fill="#3E5266" />
        <rect x="530" y="400" width="220" height="900" fill="#1F2E3D" />
        <rect x="750" y="650" width="180" height="650" fill="#34495E" />
        <rect x="930" y="750" width="150" height="550" fill="#2C3E50" />
        {/* Windows */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={550 + col * 60}
              y={450 + row * 90}
              width="30"
              height="40"
              fill={(row + col + Math.floor(frame / 30)) % 3 === 0 ? "#FFD93D" : "#5D6D7E"}
            />
          ))
        )}
        {/* Sun */}
        <circle cx="850" cy="300" r="80" fill="#FFD93D" />
        {/* Moving cloud */}
        <ellipse cx={cloudX} cy="250" rx="80" ry="30" fill="white" opacity="0.8" />
        <ellipse cx={cloudX + 40} cy="230" rx="60" ry="30" fill="white" opacity="0.8" />
      </svg>
    );
  },

  park: ({ frame }) => (
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="1080" height="900" fill="#87CEEB" />
      <ellipse cx="540" cy="1000" rx="1200" ry="200" fill="#6BCB77" />
      <rect y="1100" width="1080" height="820" fill="#57B863" />
      {/* Sun */}
      <circle cx="180" cy="300" r="70" fill="#FFD93D" />
      {/* Trees */}
      <rect x="80" y="800" width="40" height="200" fill="#8B5E3C" />
      <circle cx="100" cy="780" r="90" fill="#4A9E5C" />
      <rect x="880" y="700" width="50" height="300" fill="#8B5E3C" />
      <circle cx="905" cy="680" r="110" fill="#4A9E5C" />
      {/* Flowers */}
      {[200, 350, 500, 650, 800].map((x, i) => (
        <g key={i} transform={`translate(${x}, 1400)`}>
          <rect x="0" y="0" width="4" height="60" fill="#4A9E5C" />
          <circle cx="2" cy="0" r="12" fill={["#FF6B6B", "#FFD93D", "#B084EE", "#FF914D", "#4D96FF"][i]} />
        </g>
      ))}
    </svg>
  ),

  cafe: ({ frame }) => (
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="1080" height="1400" fill="#F5EBD8" />
      <rect y="1400" width="1080" height="520" fill="#8B5E3C" />
      {/* Menu chalkboard */}
      <rect x="200" y="200" width="680" height="400" fill="#2C3E50" rx="10" />
      <rect x="220" y="220" width="640" height="360" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4" rx="4" />
      <text x="540" y="320" fontFamily="Nunito, sans-serif" fontSize="60" fontWeight="800" fill="white" textAnchor="middle">MENU</text>
      <line x1="300" y1="380" x2="780" y2="380" stroke="#FFD93D" strokeWidth="3" />
      <text x="300" y="440" fontFamily="Nunito, sans-serif" fontSize="30" fill="white">Coffee</text>
      <text x="780" y="440" fontFamily="Nunito, sans-serif" fontSize="30" fill="#FFD93D" textAnchor="end">$4</text>
      <text x="300" y="490" fontFamily="Nunito, sans-serif" fontSize="30" fill="white">Latte</text>
      <text x="780" y="490" fontFamily="Nunito, sans-serif" fontSize="30" fill="#FFD93D" textAnchor="end">$5</text>
      <text x="300" y="540" fontFamily="Nunito, sans-serif" fontSize="30" fill="white">Espresso</text>
      <text x="780" y="540" fontFamily="Nunito, sans-serif" fontSize="30" fill="#FFD93D" textAnchor="end">$3</text>
      {/* Hanging lamp */}
      <line x1="200" y1="0" x2="200" y2="150" stroke="#2C3E50" strokeWidth="4" />
      <path d="M 150 150 L 250 150 L 240 220 L 160 220 Z" fill="#FFD93D" />
    </svg>
  ),

  plain: () => (
    <svg viewBox="0 0 1080 1920" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="1080" height="1400" fill="#FFF8F0" />
      <rect y="1400" width="1080" height="520" fill="#F5EBD8" />
    </svg>
  ),
};

export const BACKDROP_TYPES = Object.keys(BACKDROPS);