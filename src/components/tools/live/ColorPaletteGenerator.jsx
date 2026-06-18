"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

/* ============================================
   ICONS
============================================ */
function Ico({ d, className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const IC = {
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check: "M4.5 12.75l6 6 9-13.5",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  upload: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  save: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  palette: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  x: "M6 18L18 6M6 6l12 12",
  lock: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  image: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
};

/* ============================================
   COLOR MATH
============================================ */
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

function hslToHex(hsl) { return rgbToHex(hslToRgb(hsl)); }

function rotateHue(hex, degrees) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + degrees + 360) % 360;
  return hslToHex(hsl);
}

function adjustLightness(hex, amount) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl);
}

function adjustSaturation(hex, amount) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl);
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

function getWCAG(ratio) {
  if (ratio >= 7) return { label: "AAA", color: "#075a01", desc: "Excellent — passes all WCAG levels" };
  if (ratio >= 4.5) return { label: "AA", color: "#0ea5e9", desc: "Good — passes WCAG AA for normal text" };
  if (ratio >= 3) return { label: "AA Large", color: "#f59e0b", desc: "Passes AA for large text only (18px+)" };
  return { label: "Fail", color: "#ef4444", desc: "Fails WCAG — avoid for text on this background" };
}

function isLight(hex) {
  return getLuminance(hex) > 0.35;
}

function generateHarmony(baseHex, type) {
  switch (type) {
    case "complementary":
      return [baseHex, rotateHue(baseHex, 180)];
    case "analogous":
      return [rotateHue(baseHex, -30), baseHex, rotateHue(baseHex, 30)];
    case "triadic":
      return [baseHex, rotateHue(baseHex, 120), rotateHue(baseHex, 240)];
    case "split-complementary":
      return [baseHex, rotateHue(baseHex, 150), rotateHue(baseHex, 210)];
    case "tetradic":
      return [baseHex, rotateHue(baseHex, 90), rotateHue(baseHex, 180), rotateHue(baseHex, 270)];
    case "monochromatic":
      return [
        adjustLightness(baseHex, -30),
        adjustLightness(baseHex, -15),
        baseHex,
        adjustLightness(baseHex, 15),
        adjustLightness(baseHex, 30),
      ];
    case "shades":
      return [
        adjustLightness(baseHex, -40),
        adjustLightness(baseHex, -25),
        adjustLightness(baseHex, -10),
        baseHex,
        adjustLightness(baseHex, 10),
        adjustLightness(baseHex, 25),
        adjustLightness(baseHex, 40),
      ];
    default:
      return [baseHex];
  }
}

function generateFullPalette(baseHex) {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb);
  return {
    base: baseHex,
    hex: baseHex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hslObj: hsl,
  };
}

/* ============================================
   CONSTANTS
============================================ */
const HARMONY_TYPES = [
  { id: "complementary", label: "Complementary", desc: "Opposite on color wheel — high contrast" },
  { id: "analogous", label: "Analogous", desc: "Adjacent colors — harmonious and calm" },
  { id: "triadic", label: "Triadic", desc: "3 evenly spaced — vibrant and balanced" },
  { id: "split-complementary", label: "Split-Complementary", desc: "Softer contrast than complementary" },
  { id: "tetradic", label: "Tetradic", desc: "4 colors — rich and complex" },
  { id: "monochromatic", label: "Monochromatic", desc: "One hue, varied lightness — clean" },
  { id: "shades", label: "Shades & Tints", desc: "Full range from dark to light" },
];

const EXPORT_FORMATS = [
  { id: "hex", label: "HEX" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
  { id: "css", label: "CSS Variables" },
  { id: "tailwind", label: "Tailwind" },
  { id: "scss", label: "SCSS" },
];

const PRESET_PALETTES = [
  { name: "Ocean Breeze", colors: ["#0077b6", "#00b4d8", "#90e0ef", "#caf0f8", "#023e8a"] },
  { name: "Forest", colors: ["#1b4332", "#2d6a4f", "#40916c", "#74c69d", "#b7e4c7"] },
  { name: "Sunset", colors: ["#ff6b6b", "#ee9b00", "#ffb703", "#fb8500", "#9b2226"] },
  { name: "Lavender", colors: ["#7400b8", "#6930c3", "#5e60ce", "#5390d9", "#48cae4"] },
  { name: "Earthy", colors: ["#582f0e", "#7f4f24", "#936639", "#a68a64", "#b6ad90"] },
  { name: "Neon", colors: ["#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#4cc9f0"] },
  { name: "Mint Fresh", colors: ["#023047", "#219ebc", "#8ecae6", "#95d5b2", "#d8f3dc"] },
  { name: "Rose Gold", colors: ["#590d22", "#800f2f", "#c9184a", "#ff4d6d", "#ffb3c6"] },
  { name: "Cyberpunk", colors: ["#12002c", "#6d00f7", "#ff00f5", "#00f5d4", "#f5ff00"] },
  { name: "Monochrome", colors: ["#212121", "#424242", "#757575", "#bdbdbd", "#f5f5f5"] },
  { name: "Brand Green", colors: ["#075a01", "#0a8f01", "#2dc653", "#6edc8f", "#d4f7dc"] },
  { name: "Warm Sand", colors: ["#d4a373", "#ccd5ae", "#e9edc9", "#fefae0", "#faedcd"] },
  { name: "Deep Sea", colors: ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#ade8f4"] },
  { name: "Cherry Blossom", colors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd"] },
  { name: "Tropical", colors: ["#2d6a4f", "#40916c", "#95d5b2", "#ffb703", "#fb8500"] },
  { name: "Nordic", colors: ["#2e3440", "#3b4252", "#434c5e", "#4c566a", "#d8dee9"] },
  { name: "Pastel Dream", colors: ["#ffd6ff", "#e7c6ff", "#c8b6ff", "#b8c0ff", "#bbd0ff"] },
  { name: "Fire", colors: ["#03071e", "#370617", "#6a040f", "#d00000", "#f48c06"] },
  { name: "Sky", colors: ["#03045e", "#023e8a", "#0077b6", "#0096c7", "#48cae4"] },
  { name: "Autumn", colors: ["#7c3f00", "#a5540b", "#cc6600", "#f4a620", "#ffd166"] },
];

const TABS = [
  { id: "generator", label: "Generator", icon: IC.palette },
  { id: "image", label: "From Image", icon: IC.image },
  { id: "presets", label: "Presets", icon: IC.star },
  { id: "saved", label: "Saved", icon: IC.save },
  { id: "contrast", label: "Contrast", icon: IC.eye },
];

/* ============================================
   COLOR CARD
============================================ */
function ColorCard({ hex, label, index, onCopy, onLock, locked, copiedHex }) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const light = isLight(hex);
  const textColor = light ? "#1a1a1a" : "#ffffff";
  const isCopied = copiedHex === hex;

  return (
    <div
      className="group relative flex-1 min-w-0 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      style={{ backgroundColor: hex, minHeight: "180px" }}
      onClick={() => onCopy(hex)}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
        <div className="flex items-start justify-between">
          {label && <span className="rounded-full bg-black/10 px-2 py-0.5 text-[9px] font-bold backdrop-blur-sm" style={{ color: textColor }}>{label}</span>}
          <button
            onClick={(e) => { e.stopPropagation(); onLock(index); }}
            className="rounded-full bg-black/10 p-1.5 backdrop-blur-sm transition hover:bg-black/20"
            title={locked ? "Unlock color" : "Lock color"}
          >
            <Ico d={locked ? IC.lock : IC.lock} className="h-3.5 w-3.5" style={{ color: textColor }} />
          </button>
        </div>

        <div>
          {isCopied ? (
            <div className="flex items-center gap-1.5 rounded-xl bg-black/20 px-3 py-2 backdrop-blur-sm w-fit">
              <Ico d={IC.check} className="h-3.5 w-3.5" style={{ color: textColor }} />
              <span className="text-xs font-bold" style={{ color: textColor }}>Copied!</span>
            </div>
          ) : (
            <div className="rounded-xl bg-black/10 px-3 py-2 backdrop-blur-sm w-fit group-hover:bg-black/20 transition">
              <p className="text-sm sm:text-base font-bold font-mono tracking-wider" style={{ color: textColor }}>{hex.toUpperCase()}</p>
              <p className="text-[10px] mt-0.5 opacity-70" style={{ color: textColor }}>rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
              <p className="text-[10px] opacity-70" style={{ color: textColor }}>hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#ec4899");
  const [harmonyType, setHarmonyType] = useState("analogous");
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [paletteName, setPaletteName] = useState("");
  const [activeTab, setActiveTab] = useState("generator");
  const [exportFormat, setExportFormat] = useState("hex");
  const [copiedHex, setCopiedHex] = useState(null);
  const [notification, setNotification] = useState("");
  const [contrastFg, setContrastFg] = useState("#000000");
  const [contrastBg, setContrastBg] = useState("#ffffff");
  const imageInputRef = useRef(null);
  const imageCanvasRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedPalette, setExtractedPalette] = useState([]);
  const [paletteView, setPaletteView] = useState("horizontal");

  function notify(msg) { setNotification(msg); setTimeout(() => setNotification(""), 2000); }

  // Generate palette
  const generate = useCallback((base = baseColor, type = harmonyType) => {
    const colors = generateHarmony(base, type);
    const merged = colors.map((c, i) => lockedColors[i] || c);
    setPalette(merged);
  }, [baseColor, harmonyType, lockedColors]);

  useEffect(() => { generate(); }, [baseColor, harmonyType]);

  function randomize() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40) + 60;
    const l = Math.floor(Math.random() * 30) + 35;
    const newBase = hslToHex({ h, s, l });
    setBaseColor(newBase);
    setLockedColors([]);
    notify("Randomized");
  }

  function copyColor(hex) {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
      notify(`${hex} copied`);
    });
  }

  function toggleLock(index) {
    setLockedColors((prev) => {
      const next = [...prev];
      next[index] = prev[index] ? null : palette[index];
      return next;
    });
  }

  // Export
  function getExportText(colors, format) {
    switch (format) {
      case "hex":
        return colors.map((c, i) => `Color ${i + 1}: ${c.toUpperCase()}`).join("\n");
      case "rgb":
        return colors.map((c, i) => {
          const { r, g, b } = hexToRgb(c);
          return `Color ${i + 1}: rgb(${r}, ${g}, ${b})`;
        }).join("\n");
      case "hsl":
        return colors.map((c, i) => {
          const hsl = rgbToHsl(hexToRgb(c));
          return `Color ${i + 1}: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }).join("\n");
      case "css":
        return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.toUpperCase()};`).join("\n")}\n}`;
      case "tailwind":
        return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colors.map((c, i) => `        'custom-${i + 1}': '${c.toUpperCase()}',`).join("\n")}\n      }\n    }\n  }\n}`;
      case "scss":
        return colors.map((c, i) => `$color-${i + 1}: ${c.toUpperCase()};`).join("\n");
      default:
        return colors.join("\n");
    }
  }

  function copyExport() {
    const text = getExportText(palette, exportFormat);
    navigator.clipboard.writeText(text).then(() => notify("Exported and copied"));
  }

  function downloadPalette() {
    const colors = palette;
    const canvas = document.createElement("canvas");
    canvas.width = colors.length * 200;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    colors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * 200, 0, 200, 240);
      ctx.fillStyle = isLight(c) ? "#1a1a1a" : "#ffffff";
      ctx.font = "bold 14px monospace";
      ctx.fillText(c.toUpperCase(), i * 200 + 16, 268);
    });
    const a = document.createElement("a");
    a.download = `palette-${Date.now()}.png`;
    a.href = canvas.toDataURL();
    a.click();
    notify("Palette downloaded");
  }

  function savePalette() {
    if (!palette.length) return;
    const name = paletteName || `Palette ${savedPalettes.length + 1}`;
    setSavedPalettes((prev) => [...prev, { name, colors: [...palette], ts: new Date().toLocaleTimeString() }]);
    setPaletteName("");
    notify(`"${name}" saved`);
  }

  // Image extraction
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      extractColorsFromImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function extractColorsFromImage(src) {
    const img = new Image();
    img.onload = () => {
      const canvas = imageCanvasRef.current || document.createElement("canvas");
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      // Sample pixels and cluster
      const pixels = [];
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a > 128) pixels.push({ r, g, b });
      }

      // Simple median cut — group by quantized color
      const buckets = {};
      pixels.forEach(({ r, g, b }) => {
        const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
        buckets[key] = (buckets[key] || 0) + 1;
      });

      const sorted = Object.entries(buckets).sort((a, b) => b[1] - a[1]);
      const topColors = sorted.slice(0, 8).map(([key]) => {
        const [r, g, b] = key.split(",").map(Number);
        return rgbToHex({ r, g, b });
      });

      // Filter out near-duplicates
      const unique = [];
      topColors.forEach((c) => {
        const isDupe = unique.some((u) => {
          const a = hexToRgb(c), b2 = hexToRgb(u);
          return Math.abs(a.r - b2.r) + Math.abs(a.g - b2.g) + Math.abs(a.b - b2.b) < 60;
        });
        if (!isDupe) unique.push(c);
      });

      setExtractedPalette(unique.slice(0, 6));
      notify(`${unique.slice(0, 6).length} colors extracted`);
    };
    img.src = src;
  }

  // Contrast
  const contrastRatio = useMemo(() => getContrastRatio(contrastFg, contrastBg), [contrastFg, contrastBg]);
  const wcag = getWCAG(contrastRatio);

  /* ============================================
     RENDER
  ============================================ */
  return (
    <div className="space-y-4 sm:space-y-5">

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notification}
        </div>
      )}

      {/* TABS */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-sm">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 rounded-xl py-2.5 px-1 text-[9px] sm:text-[10px] font-bold transition ${activeTab === tab.id ? "bg-[#ec4899] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
            <Ico d={tab.icon} className="h-4 w-4" />
            <span className="text-center leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ============ GENERATOR TAB ============ */}
      {activeTab === "generator" && (
        <div className="space-y-4">

          {/* Controls */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Base color */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Base Color</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)}
                    className="h-14 w-14 cursor-pointer rounded-2xl border-2 border-gray-100 bg-transparent p-0.5" />
                </div>
                <div className="flex-1">
                  <input type="text" value={baseColor} onChange={(e) => {
                    const v = e.target.value;
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setBaseColor(v);
                  }}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 font-mono text-sm uppercase outline-none focus:border-[#ec4899] focus:ring-2 focus:ring-[#ec4899]/10" />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["#ec4899", "#075a01", "#0ea5e9", "#f97316", "#8b5cf6", "#ef4444"].map((c) => (
                      <button key={c} onClick={() => setBaseColor(c)}
                        className="h-6 w-6 rounded-full border-2 border-white shadow-sm transition hover:scale-110"
                        style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <button onClick={randomize}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
                  title="Randomize">
                  <Ico d={IC.refresh} className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Harmony type */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Color Harmony</h3>
              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {HARMONY_TYPES.map((h) => (
                  <button key={h.id} onClick={() => setHarmonyType(h.id)}
                    className={`flex w-full items-start gap-2 rounded-xl p-2.5 text-left transition ${harmonyType === h.id ? "bg-[#ec4899]/10 border border-[#ec4899]/20" : "hover:bg-gray-50"}`}>
                    <div className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ${harmonyType === h.id ? "bg-[#ec4899]" : "bg-gray-300"}`} />
                    <div>
                      <p className={`text-xs font-bold ${harmonyType === h.id ? "text-[#ec4899]" : "text-gray-700"}`}>{h.label}</p>
                      <p className="text-[10px] text-gray-400 leading-tight">{h.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Palette display */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                Your Palette
                <span className="ml-2 text-[10px] font-normal text-gray-400">Click any color to copy</span>
              </h3>
              <div className="flex gap-2">
                <button onClick={() => setPaletteView(paletteView === "horizontal" ? "grid" : "horizontal")}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100 transition">
                  {paletteView === "horizontal" ? "Grid" : "Strip"}
                </button>
                <button onClick={() => generate()}
                  className="flex items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 px-3 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100 transition">
                  <Ico d={IC.refresh} className="h-3 w-3" /> Regenerate
                </button>
              </div>
            </div>

            {paletteView === "horizontal" ? (
              <div className="flex gap-2 sm:gap-3" style={{ minHeight: "200px" }}>
                {palette.map((hex, i) => (
                  <ColorCard key={i} hex={hex} index={i} onCopy={copyColor} onLock={toggleLock}
                    locked={!!lockedColors[i]} copiedHex={copiedHex}
                    label={lockedColors[i] ? "Locked" : null} />
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {palette.map((hex, i) => {
                  const rgb = hexToRgb(hex);
                  const hsl = rgbToHsl(rgb);
                  const light = isLight(hex);
                  return (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-sm cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
                      onClick={() => copyColor(hex)}>
                      <div className="h-20" style={{ backgroundColor: hex }} />
                      <div className="bg-white p-3">
                        <div className="flex items-center justify-between">
                          <div className="h-5 w-5 rounded-full border border-gray-100" style={{ backgroundColor: hex }} />
                          {lockedColors[i] && <span className="text-[10px] font-bold text-gray-400">Locked</span>}
                        </div>
                        <p className="mt-1.5 font-mono text-sm font-bold text-gray-900">{hex.toUpperCase()}</p>
                        <p className="text-[10px] text-gray-400">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                        <p className="text-[10px] text-gray-400">hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Export */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Export Format</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {EXPORT_FORMATS.map((f) => (
                  <button key={f.id} onClick={() => setExportFormat(f.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${exportFormat === f.id ? "bg-[#ec4899] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
              <pre className="overflow-x-auto rounded-xl bg-gray-950 p-3 text-[10px] sm:text-xs text-green-400 leading-relaxed whitespace-pre-wrap max-h-32">
                {getExportText(palette, exportFormat)}
              </pre>
              <button onClick={copyExport}
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-[#ec4899] py-2.5 text-xs font-bold text-white hover:bg-[#db2777] transition">
                <Ico d={IC.copy} className="h-3.5 w-3.5" /> Copy {EXPORT_FORMATS.find((f) => f.id === exportFormat)?.label}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">Save Palette</h3>
              <input type="text" value={paletteName} onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Give your palette a name..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ec4899] focus:ring-2 focus:ring-[#ec4899]/10" />
              <button onClick={savePalette}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-black transition">
                <Ico d={IC.save} className="h-3.5 w-3.5" /> Save to Collection
              </button>
              <button onClick={downloadPalette}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <Ico d={IC.download} className="h-3.5 w-3.5" /> Download as PNG
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ FROM IMAGE TAB ============ */}
      {activeTab === "image" && (
        <div className="space-y-4">
          <canvas ref={imageCanvasRef} className="hidden" />

          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="mb-1 text-xs sm:text-sm font-bold text-gray-900">Extract Colors from Image</h3>
            <p className="mb-4 text-xs text-gray-400">Upload any image and we will extract the dominant colors automatically.</p>

            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <button onClick={() => imageInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 py-10 hover:border-[#ec4899] hover:bg-[#ec4899]/5 transition">
              <Ico d={IC.image} className="h-10 w-10 text-gray-300" />
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">Upload an image</p>
                <p className="mt-1 text-xs text-gray-400">PNG, JPG, WEBP — any image works</p>
              </div>
            </button>
          </div>

          {imagePreview && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-xs font-bold text-gray-900">Source Image</h3>
                <img src={imagePreview} alt="Uploaded" className="w-full rounded-xl object-cover max-h-64" />
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="mb-3 text-xs font-bold text-gray-900">Extracted Colors</h3>
                {extractedPalette.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex gap-2 rounded-xl overflow-hidden h-16">
                      {extractedPalette.map((c, i) => (
                        <div key={i} className="flex-1 cursor-pointer transition hover:flex-[2]" style={{ backgroundColor: c }} onClick={() => copyColor(c)} title={c} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {extractedPalette.map((c, i) => (
                        <button key={i} onClick={() => copyColor(c)}
                          className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-2.5 hover:bg-gray-100 transition">
                          <div className="h-8 w-8 rounded-lg shrink-0 border border-gray-200" style={{ backgroundColor: c }} />
                          <div className="text-left min-w-0">
                            <p className="font-mono text-xs font-bold text-gray-800 truncate">{c.toUpperCase()}</p>
                            <p className="text-[10px] text-gray-400">{copiedHex === c ? "Copied!" : "Click to copy"}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setPalette(extractedPalette); setActiveTab("generator"); notify("Palette loaded into generator"); }}
                        className="flex-1 rounded-xl bg-[#ec4899] py-2.5 text-xs font-bold text-white hover:bg-[#db2777] transition">
                        Use in Generator
                      </button>
                      <button onClick={() => setSavedPalettes((p) => [...p, { name: "From Image", colors: extractedPalette, ts: new Date().toLocaleTimeString() }])}
                        className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                        Save Palette
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-sm text-gray-400">Extracting colors...</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============ PRESETS TAB ============ */}
      {activeTab === "presets" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
            <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">
              {PRESET_PALETTES.length} Curated Palettes
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRESET_PALETTES.map((preset) => (
                <div key={preset.name} className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden transition hover:shadow-md">
                  {/* Color strip */}
                  <div className="flex h-14 cursor-pointer" onClick={() => { setPalette(preset.colors); setActiveTab("generator"); notify(`"${preset.name}" loaded`); }}>
                    {preset.colors.map((c, i) => (
                      <div key={i} className="flex-1 transition hover:flex-[2]" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-800">{preset.name}</p>
                      <div className="flex gap-1">
                        {preset.colors.map((c, i) => (
                          <div key={i} className="h-4 w-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => { setPalette(preset.colors); setActiveTab("generator"); notify(`"${preset.name}" loaded`); }}
                        className="flex-1 rounded-xl bg-[#ec4899] py-1.5 text-[10px] font-bold text-white hover:bg-[#db2777] transition">
                        Use Palette
                      </button>
                      <button onClick={() => { navigator.clipboard.writeText(preset.colors.join(", ")); notify("Colors copied"); }}
                        className="rounded-xl border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-white transition">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ SAVED TAB ============ */}
      {activeTab === "saved" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">Saved Palettes ({savedPalettes.length})</h3>
            {savedPalettes.length > 0 && (
              <button onClick={() => setSavedPalettes([])}
                className="text-xs font-semibold text-red-400 hover:text-red-600 flex items-center gap-1">
                <Ico d={IC.trash} className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
          </div>

          {savedPalettes.length === 0 ? (
            <div className="py-16 text-center">
              <Ico d={IC.save} className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No saved palettes yet</p>
              <p className="text-xs text-gray-300 mt-1">Save palettes from the Generator or Presets tab</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {savedPalettes.map((p, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                  <div className="flex h-12">
                    {p.colors.map((c, j) => <div key={j} className="flex-1" style={{ backgroundColor: c }} />)}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-gray-800">{p.name}</p>
                      <span className="text-[10px] text-gray-400">{p.ts}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {p.colors.map((c, j) => (
                        <button key={j} onClick={() => copyColor(c)}
                          className="flex-1 h-6 rounded border border-white shadow-sm transition hover:scale-110"
                          style={{ backgroundColor: c }} title={c} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setPalette(p.colors); setActiveTab("generator"); notify("Palette loaded"); }}
                        className="flex-1 rounded-xl bg-[#ec4899] py-1.5 text-[10px] font-bold text-white hover:bg-[#db2777] transition">
                        Load
                      </button>
                      <button onClick={() => { navigator.clipboard.writeText(p.colors.join(", ")); notify("Copied"); }}
                        className="rounded-xl border border-gray-200 px-3 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-white transition">
                        Copy
                      </button>
                      <button onClick={() => setSavedPalettes((prev) => prev.filter((_, j) => j !== i))}
                        className="rounded-xl border border-red-100 px-3 py-1.5 text-[10px] font-bold text-red-400 hover:bg-red-50 transition">
                        <Ico d={IC.trash} className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============ CONTRAST TAB ============ */}
      {activeTab === "contrast" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-4">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900">WCAG Contrast Checker</h3>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Text Color (Foreground)</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={contrastFg} onChange={(e) => setContrastFg(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-xl border border-gray-100 bg-transparent p-0.5" />
                  <input type="text" value={contrastFg} onChange={(e) => setContrastFg(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm uppercase outline-none focus:border-[#ec4899]" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Background Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={contrastBg} onChange={(e) => setContrastBg(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-xl border border-gray-100 bg-transparent p-0.5" />
                  <input type="text" value={contrastBg} onChange={(e) => setContrastBg(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 font-mono text-sm uppercase outline-none focus:border-[#ec4899]" />
                </div>
              </div>

              {/* Quick picks from current palette */}
              {palette.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-600">Pick from current palette</p>
                  <div className="flex flex-wrap gap-2">
                    {palette.map((c, i) => (
                      <div key={i} className="flex flex-col gap-1 items-center">
                        <button onClick={() => setContrastFg(c)} className="h-7 w-7 rounded-lg border-2 border-white shadow-sm transition hover:scale-110" style={{ backgroundColor: c }} title={`Set ${c} as foreground`} />
                        <button onClick={() => setContrastBg(c)} className="h-5 w-7 rounded border border-gray-200 text-[8px] font-bold text-gray-500 hover:bg-gray-100 transition">BG</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Swap */}
              <button onClick={() => { setContrastFg(contrastBg); setContrastBg(contrastFg); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
                <Ico d={IC.refresh} className="h-3.5 w-3.5" /> Swap Colors
              </button>
            </div>

            {/* Results */}
            <div className="space-y-3">
              {/* Preview */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6" style={{ backgroundColor: contrastBg }}>
                  <p className="text-2xl font-bold mb-1" style={{ color: contrastFg }}>Sample Heading Text</p>
                  <p className="text-sm" style={{ color: contrastFg }}>This is what body text looks like with these color combinations. Make sure it is easy to read.</p>
                  <button className="mt-3 rounded-xl px-4 py-2 text-xs font-bold" style={{ backgroundColor: contrastFg, color: contrastBg }}>Button Example</button>
                </div>
                <div className="flex" style={{ backgroundColor: contrastBg }}>
                  <div className="flex-1 p-3 border-t border-white/10">
                    <p className="text-xs font-bold mb-1" style={{ color: contrastFg }}>Large Text (18px+)</p>
                    <p className="text-[10px]" style={{ color: contrastFg }}>Requires 3:1 minimum</p>
                  </div>
                  <div className="flex-1 p-3 border-t border-l border-white/10">
                    <p className="text-xs font-bold mb-1" style={{ color: contrastFg }}>Normal Text</p>
                    <p className="text-[10px]" style={{ color: contrastFg }}>Requires 4.5:1 minimum</p>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-900">Contrast Ratio</h3>
                  <span className="text-2xl font-bold" style={{ color: wcag.color }}>{contrastRatio}:1</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100 mb-3">
                  <div className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((contrastRatio / 21) * 100, 100)}%`, backgroundColor: wcag.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: wcag.color }}>{wcag.label}</span>
                  <p className="text-xs text-gray-600">{wcag.desc}</p>
                </div>

                {/* WCAG levels table */}
                <div className="mt-3 space-y-1.5">
                  {[
                    { level: "AA Normal Text", ratio: 4.5, passes: contrastRatio >= 4.5 },
                    { level: "AA Large Text", ratio: 3.0, passes: contrastRatio >= 3.0 },
                    { level: "AAA Normal Text", ratio: 7.0, passes: contrastRatio >= 7.0 },
                    { level: "AAA Large Text", ratio: 4.5, passes: contrastRatio >= 4.5 },
                  ].map((row) => (
                    <div key={row.level} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                      <span className="text-xs text-gray-600">{row.level}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">{row.ratio}:1 required</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${row.passes ? "bg-green-100 text-green-700" : "bg-red-50 text-red-500"}`}>
                          {row.passes ? "Pass" : "Fail"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-2xl border border-[#ec4899]/10 bg-[#ec4899]/5 p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#ec4899] flex items-center gap-1.5">
              <Ico d={IC.info} className="h-3.5 w-3.5" /> About WCAG Contrast
            </p>
            <ul className="space-y-1 text-[11px] sm:text-xs text-gray-700">
              <li className="flex gap-2"><span className="text-[#ec4899] font-bold shrink-0">→</span>WCAG AA requires 4.5:1 for normal text and 3:1 for large text (18px bold or 24px regular)</li>
              <li className="flex gap-2"><span className="text-[#ec4899] font-bold shrink-0">→</span>WCAG AAA requires 7:1 for normal text — recommended for body copy</li>
              <li className="flex gap-2"><span className="text-[#ec4899] font-bold shrink-0">→</span>Low contrast affects users with color blindness and in bright sunlight</li>
              <li className="flex gap-2"><span className="text-[#ec4899] font-bold shrink-0">→</span>Most countries require AA compliance for public-facing websites</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}