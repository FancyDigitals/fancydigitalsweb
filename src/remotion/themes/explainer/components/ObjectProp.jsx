import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { explainerTokens } from "../tokens";

/**
 * Animated 2D prop objects with bounce entry and gentle float.
 */
export function ObjectProp({
  type = "laptop",
  size = 200,
  delay = 0,
  color = "#4D96FF",
  rotate = 0,
  float = true,
  style = {},
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    fps,
    frame: frame - delay,
    config: explainerTokens.spring.bounce,
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.4, 1]);
  const entryRotate = interpolate(enter, [0, 1], [-15, 0]);

  const floatY = float ? Math.sin((frame - delay) / 30) * 6 : 0;

  const PropSVG = PROP_LIBRARY[type] || PROP_LIBRARY.laptop;

  return (
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        opacity,
        transform: `translateY(${floatY}px) scale(${scale}) rotate(${entryRotate + rotate}deg)`,
        filter: `drop-shadow(${explainerTokens.shadow.prop})`,
        ...style,
      }}
    >
      <PropSVG size={size} color={color} />
    </div>
  );
}

// ============================================
// PROP LIBRARY
// ============================================

const PROP_LIBRARY = {
  laptop: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <rect x="30" y="50" width="140" height="90" rx="8" fill="#2C3E50" />
      <rect x="38" y="58" width="124" height="74" rx="3" fill={color} />
      <rect x="20" y="140" width="160" height="12" rx="4" fill="#34495E" />
      <rect x="85" y="145" width="30" height="4" rx="2" fill="#1A252F" />
      {/* Screen content */}
      <rect x="46" y="66" width="60" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="46" y="76" width="40" height="4" rx="2" fill="white" opacity="0.6" />
      <rect x="46" y="90" width="80" height="30" rx="4" fill="white" opacity="0.2" />
    </svg>
  ),

  phone: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <rect x="65" y="20" width="70" height="160" rx="14" fill="#2C3E50" />
      <rect x="70" y="30" width="60" height="140" rx="6" fill={color} />
      <circle cx="100" cy="25" r="3" fill="#1A252F" />
      <rect x="90" y="172" width="20" height="3" rx="1.5" fill="#1A252F" />
      {/* Screen dots */}
      <circle cx="85" cy="60" r="4" fill="white" opacity="0.9" />
      <circle cx="100" cy="60" r="4" fill="white" opacity="0.9" />
      <circle cx="115" cy="60" r="4" fill="white" opacity="0.9" />
      <rect x="80" y="80" width="40" height="6" rx="3" fill="white" opacity="0.7" />
    </svg>
  ),

  coffee: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Steam */}
      <path d="M 80 40 Q 78 30 82 25 Q 85 20 82 12" stroke="#B8B8B8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 100 40 Q 98 28 102 20 Q 106 12 102 5" stroke="#B8B8B8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M 120 40 Q 118 30 122 25 Q 125 20 122 12" stroke="#B8B8B8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Cup */}
      <path d="M 60 60 L 140 60 L 130 160 Q 130 170 120 170 L 80 170 Q 70 170 70 160 Z" fill={color} />
      <ellipse cx="100" cy="60" rx="40" ry="6" fill="#3A2820" />
      {/* Handle */}
      <path d="M 140 80 Q 165 80 165 110 Q 165 140 140 140" stroke={color} strokeWidth="10" fill="none" />
    </svg>
  ),

  gift: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <rect x="30" y="80" width="140" height="90" rx="4" fill={color} />
      <rect x="90" y="80" width="20" height="90" fill="#FFD93D" />
      <rect x="30" y="70" width="140" height="20" rx="4" fill="#FFD93D" />
      {/* Bow */}
      <ellipse cx="80" cy="60" rx="20" ry="15" fill="#FF6B6B" />
      <ellipse cx="120" cy="60" rx="20" ry="15" fill="#FF6B6B" />
      <circle cx="100" cy="60" r="10" fill="#E74C3C" />
    </svg>
  ),

  book: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <rect x="40" y="40" width="120" height="130" rx="4" fill={color} />
      <rect x="45" y="45" width="110" height="120" rx="2" fill="white" />
      <rect x="55" y="60" width="90" height="4" rx="2" fill="#8A8A94" />
      <rect x="55" y="72" width="90" height="4" rx="2" fill="#8A8A94" />
      <rect x="55" y="84" width="70" height="4" rx="2" fill="#8A8A94" />
      <rect x="55" y="100" width="90" height="4" rx="2" fill="#8A8A94" />
      <rect x="55" y="112" width="90" height="4" rx="2" fill="#8A8A94" />
      <rect x="55" y="124" width="60" height="4" rx="2" fill="#8A8A94" />
      {/* Spine */}
      <rect x="38" y="40" width="6" height="130" fill="#2C3E50" opacity="0.3" />
    </svg>
  ),

  cart: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <path d="M 30 50 L 50 50 L 65 130 L 155 130 L 170 70 L 60 70" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="75" cy="160" r="14" fill={color} />
      <circle cx="145" cy="160" r="14" fill={color} />
      <circle cx="75" cy="160" r="5" fill="white" />
      <circle cx="145" cy="160" r="5" fill="white" />
    </svg>
  ),

  checkmark: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx="100" cy="100" r="80" fill={color} />
      <path d="M 60 100 L 90 130 L 145 75" stroke="white" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  star: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <path d="M 100 20 L 120 75 L 180 80 L 135 120 L 150 180 L 100 150 L 50 180 L 65 120 L 20 80 L 80 75 Z" fill={color} stroke="#FFF" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  ),

  heart: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <path d="M 100 175 L 30 105 Q 5 80 30 55 Q 55 30 80 55 L 100 75 L 120 55 Q 145 30 170 55 Q 195 80 170 105 Z" fill={color} />
    </svg>
  ),

  dollar: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <circle cx="100" cy="100" r="80" fill={color} />
      <text x="100" y="130" fontSize="100" fontWeight="900" fill="white" textAnchor="middle" fontFamily="Nunito, sans-serif">$</text>
    </svg>
  ),

  rocket: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Flame */}
      <path d="M 85 155 Q 100 190 115 155 Q 105 175 100 180 Q 95 175 85 155 Z" fill="#FF914D" />
      <path d="M 90 155 Q 100 175 110 155" fill="#FFD93D" />
      {/* Body */}
      <path d="M 70 60 Q 100 20 130 60 L 130 145 Q 130 155 120 155 L 80 155 Q 70 155 70 145 Z" fill={color} />
      {/* Window */}
      <circle cx="100" cy="80" r="18" fill="#EAF4FB" stroke="white" strokeWidth="4" />
      <circle cx="100" cy="80" r="10" fill="#4D96FF" />
      {/* Fins */}
      <path d="M 70 120 L 50 150 L 70 145 Z" fill="#FF6B6B" />
      <path d="M 130 120 L 150 150 L 130 145 Z" fill="#FF6B6B" />
    </svg>
  ),

  house: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Roof */}
      <path d="M 30 100 L 100 40 L 170 100 Z" fill="#E74C3C" />
      {/* Body */}
      <rect x="50" y="100" width="100" height="70" fill={color} />
      {/* Door */}
      <rect x="85" y="130" width="30" height="40" rx="2" fill="#5D4037" />
      <circle cx="108" cy="150" r="2" fill="#FFD93D" />
      {/* Windows */}
      <rect x="60" y="115" width="18" height="18" fill="#EAF4FB" stroke="white" strokeWidth="2" />
      <rect x="122" y="115" width="18" height="18" fill="#EAF4FB" stroke="white" strokeWidth="2" />
    </svg>
  ),

  cloud: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <ellipse cx="60" cy="120" rx="35" ry="30" fill={color} />
      <ellipse cx="100" cy="105" rx="45" ry="40" fill={color} />
      <ellipse cx="140" cy="120" rx="35" ry="30" fill={color} />
      <rect x="45" y="115" width="115" height="30" fill={color} />
    </svg>
  ),

  lightbulb: ({ size, color }) => (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* Light rays */}
      <line x1="100" y1="20" x2="100" y2="35" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="50" x2="60" y2="60" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
      <line x1="150" y1="50" x2="140" y2="60" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
      <line x1="30" y1="100" x2="45" y2="100" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
      <line x1="170" y1="100" x2="155" y2="100" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" />
      {/* Bulb */}
      <path d="M 60 100 Q 60 50 100 50 Q 140 50 140 100 Q 140 130 120 145 L 120 160 L 80 160 L 80 145 Q 60 130 60 100 Z" fill={color} />
      {/* Base */}
      <rect x="82" y="160" width="36" height="8" fill="#2C3E50" />
      <rect x="85" y="168" width="30" height="6" fill="#2C3E50" />
      <path d="M 90 174 L 110 174 L 105 182 L 95 182 Z" fill="#1A252F" />
    </svg>
  ),
};

export const PROP_TYPES = Object.keys(PROP_LIBRARY);