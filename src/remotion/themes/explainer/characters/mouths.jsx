/**
 * SVG mouth shapes for lip sync.
 * Each returns a <path> or <ellipse> element.
 * All designed to fit inside a 40x20 viewBox.
 */

export function MouthClosed({ color = "#3A2820" }) {
  return (
    <svg viewBox="0 0 40 20" width="40" height="20">
      <path
        d="M 8 10 Q 20 12 32 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function MouthSmall({ color = "#3A2820" }) {
  return (
    <svg viewBox="0 0 40 20" width="40" height="20">
      <ellipse cx="20" cy="10" rx="8" ry="3" fill={color} />
    </svg>
  );
}

export function MouthMedium({ color = "#3A2820" }) {
  return (
    <svg viewBox="0 0 40 20" width="40" height="20">
      <ellipse cx="20" cy="10" rx="10" ry="5" fill={color} />
      <ellipse cx="20" cy="12" rx="7" ry="2" fill="#5A3830" />
    </svg>
  );
}

export function MouthWide({ color = "#3A2820" }) {
  return (
    <svg viewBox="0 0 40 20" width="40" height="20">
      <path
        d="M 8 8 Q 20 18 32 8 Q 26 14 20 14 Q 14 14 8 8 Z"
        fill={color}
      />
      <path
        d="M 12 10 Q 20 15 28 10"
        fill="#5A3830"
      />
    </svg>
  );
}

export function MouthRound({ color = "#3A2820" }) {
  return (
    <svg viewBox="0 0 40 20" width="40" height="20">
      <ellipse cx="20" cy="10" rx="5" ry="7" fill={color} />
      <ellipse cx="20" cy="11" rx="3" ry="4" fill="#5A3830" />
    </svg>
  );
}

export const MOUTHS = {
  closed: MouthClosed,
  small: MouthSmall,
  medium: MouthMedium,
  wide: MouthWide,
  round: MouthRound,
};