import { AbsoluteFill } from "remotion";

// Inline SVG noise texture — no external fetch, renders identically in preview and export
const NOISE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

const NOISE_URL = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;

export function Noise() {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.035,
        backgroundImage: NOISE_URL,
        backgroundRepeat: "repeat",
        mixBlendMode: "overlay",
        pointerEvents: "none",
      }}
    />
  );
}