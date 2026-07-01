"use client";

/* ============================================================
   CANVAS VIDEO ENGINE — CORE
   Frame-by-frame rendering with time management,
   interpolation, image preloading, and text wrapping.
============================================================ */

/* ─────────────────────────────────────────────────────────
   INTERPOLATION HELPERS
───────────────────────────────────────────────────────── */

/**
 * Linear interpolation: value between start and end at t (0-1)
 */
export function lerp(start, end, t) {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Interpolate value from one range to another
 * e.g. interpolate(0.5, [0, 1], [100, 200]) === 150
 */
export function interpolate(value, inputRange, outputRange, options = {}) {
  const { extrapolate = "clamp" } = options;
  const [inStart, inEnd] = inputRange;
  const [outStart, outEnd] = outputRange;

  let t = (value - inStart) / (inEnd - inStart);

  if (extrapolate === "clamp") {
    t = clamp(t, 0, 1);
  }

  return outStart + (outEnd - outStart) * t;
}

/**
 * Clamp value between min and max
 */
export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* ─────────────────────────────────────────────────────────
   EASING FUNCTIONS
───────────────────────────────────────────────────────── */

export const easing = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeOutElastic: (t) => {
    if (t === 0 || t === 1) return t;
    const c4 = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

/**
 * Spring animation approximation (0 → 1)
 * @param {number} t - Progress (0 to 1)
 * @param {number} stiffness - 0.1 to 1.0 (higher = snappier)
 */
export function spring(t, stiffness = 0.5) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  // Overshoot + settle
  const overshoot = 1.1;
  const raw = 1 - Math.pow(2, -10 * t) * Math.cos((t * 10 - 0.75) * ((2 * Math.PI) / 3));
  return clamp(raw * overshoot, 0, 1);
}

/* ─────────────────────────────────────────────────────────
   TEXT WRAPPING
───────────────────────────────────────────────────────── */

/**
 * Wrap text into lines that fit within maxWidth
 * @param {CanvasRenderingContext2D} ctx - Must have font already set
 * @param {string} text
 * @param {number} maxWidth
 * @returns {string[]} - array of lines
 */
export function wrapText(ctx, text, maxWidth) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Draw wrapped text at position, returns total height used
 */
export function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, options = {}) {
  const { align = "left", baseline = "top" } = options;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;

  const lines = wrapText(ctx, text, maxWidth);
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });

  return lines.length * lineHeight;
}

/* ─────────────────────────────────────────────────────────
   IMAGE PRELOADER
───────────────────────────────────────────────────────── */

const imageCache = new Map();

/**
 * Sync accessor — returns cached image if loaded, else null
 */
export function getCachedImage(src) {
  return imageCache.get(src) || null;
}

/**
 * Load an image, cache it, return promise
 */
export function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.has(src)) return Promise.resolve(imageCache.get(src));

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      console.warn("Image failed to load:", src);
      resolve(null);
    };
    img.src = src;
  });
}

/**
 * Preload multiple images in parallel
 */
export async function preloadImages(sources) {
  const uniqueSources = [...new Set(sources.filter(Boolean))];
  await Promise.all(uniqueSources.map(loadImage));
}

/* ─────────────────────────────────────────────────────────
   COLOR HELPERS
───────────────────────────────────────────────────────── */

/**
 * Lighten or darken a hex color
 * percent: -100 to +100
 */
export function shadeColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = clamp((num >> 16) + amt, 0, 255);
  const G = clamp(((num >> 8) & 0x00ff) + amt, 0, 255);
  const B = clamp((num & 0x0000ff) + amt, 0, 255);
  return "#" + ((0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1));
}

/**
 * Convert hex to rgba string
 */
export function hexToRgba(hex, alpha = 1) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ─────────────────────────────────────────────────────────
   CANVAS ENGINE
───────────────────────────────────────────────────────── */

export class CanvasEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.fps = options.fps || 30;
    this.width = options.width || 1080;
    this.height = options.height || 1920;
    this.scenes = options.scenes || [];
    this.brandColor = options.brandColor || "#075a01";
    this.contentStyle = options.contentStyle || "image-text";
    this.backgroundStyle = options.backgroundStyle || "gradient";
    this.logoUrl = options.logoUrl || null;
    this.showWatermark = options.showWatermark !== false;
    this.onFrame = options.onFrame || (() => {});

    // Timing
    this.startTime = 0;
    this.playing = false;
    this.rafId = null;
    this.loop = options.loop !== false;

    // Setup canvas resolution (with DPI handling)
    this.setupCanvas();

    // Scene renderer will be injected in Phase 2
    this.renderScene = options.renderScene || null;
  }

  setupCanvas() {
    const dpr = 1; // Fixed 1x for now — scenes look consistent at export size
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "auto";
    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  /**
   * Total video duration in seconds
   */
  get totalDuration() {
    return this.scenes.reduce((sum, s) => sum + (s.duration || 5), 0);
  }

  /**
   * Get current scene + local time within that scene
   */
  getCurrentScene(elapsed) {
    let acc = 0;
    for (let i = 0; i < this.scenes.length; i++) {
      const scene = this.scenes[i];
      const dur = scene.duration || 5;
      if (elapsed < acc + dur) {
        return {
          scene,
          index: i,
          localTime: elapsed - acc,
          localProgress: (elapsed - acc) / dur,
          sceneDuration: dur,
        };
      }
      acc += dur;
    }
    // Return last scene at end
    const last = this.scenes[this.scenes.length - 1];
    return {
      scene: last,
      index: this.scenes.length - 1,
      localTime: last?.duration || 5,
      localProgress: 1,
      sceneDuration: last?.duration || 5,
    };
  }

  /**
   * Preload all scene images before playing
   */
  async preload() {
    const sources = [];
    if (this.logoUrl) sources.push(this.logoUrl);
    this.scenes.forEach((s) => {
      if (s.imageUrl) sources.push(s.imageUrl);
    });
    await preloadImages(sources);
  }

  /**
   * Start playing
   */
  play() {
    if (this.playing) return;
    this.playing = true;
    this.startTime = performance.now();
    this.tick();
  }

  /**
   * Stop playing
   */
  pause() {
    this.playing = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  /**
   * Reset to beginning
   */
  reset() {
    this.pause();
    this.startTime = performance.now();
    this.renderFrame(0);
  }

  /**
   * Main animation loop
   */
  tick = () => {
    if (!this.playing) return;

    const now = performance.now();
    let elapsed = (now - this.startTime) / 1000;

    if (elapsed >= this.totalDuration) {
      if (this.loop) {
        this.startTime = now;
        elapsed = 0;
      } else {
        this.playing = false;
        this.renderFrame(this.totalDuration);
        return;
      }
    }

    this.renderFrame(elapsed);
    this.onFrame(elapsed, this.totalDuration);
    this.rafId = requestAnimationFrame(this.tick);
  };

  /**
   * Render a single frame at time (seconds)
   */
  renderFrame(elapsed) {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (!this.renderScene) {
      // Placeholder if no scene renderer injected yet
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "bold 60px system-ui";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(
        `Frame ${elapsed.toFixed(2)}s`,
        this.width / 2,
        this.height / 2
      );
      return;
    }

    const current = this.getCurrentScene(elapsed);
    this.renderScene(this.ctx, {
      ...current,
      globalTime: elapsed,
      width: this.width,
      height: this.height,
      brandColor: this.brandColor,
      contentStyle: this.contentStyle,
      backgroundStyle: this.backgroundStyle,
      logoUrl: this.logoUrl,
      showWatermark: this.showWatermark,
    });
  }

  /**
   * Destroy — cleanup
   */
  destroy() {
    this.pause();
  }
}