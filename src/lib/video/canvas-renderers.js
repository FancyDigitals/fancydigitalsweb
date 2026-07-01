"use client";

import {
  interpolate,
  spring,
  easing,
  shadeColor,
  hexToRgba,
  wrapText,
  getCachedImage,
} from "./canvas-engine";

/**
 * Strip markdown formatting from text
 * Removes: **bold**, *italic*, _italic_, `code`, ~~strike~~, etc.
 */
function cleanText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "$1")   // **bold**
    .replace(/\*(.*?)\*/g, "$1")        // *italic*
    .replace(/__(.*?)__/g, "$1")        // __bold__
    .replace(/_(.*?)_/g, "$1")          // _italic_
    .replace(/`(.*?)`/g, "$1")          // `code`
    .replace(/~~(.*?)~~/g, "$1")        // ~~strike~~
    .replace(/#{1,6}\s/g, "")           // # heading
    .trim();
}

/* ═══════════════════════════════════════════════════════
   KINETIC TYPOGRAPHY
   Word-by-word staggered animation with highlights
═══════════════════════════════════════════════════════ */

/**
 * Draw a title where each word animates in with a stagger.
 * Highlighted words appear in brand color.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} opts
 * @param {string} opts.text - Full text
 * @param {string[]} opts.highlightWords - Words to highlight (lowercase)
 * @param {number} opts.x - Left position
 * @param {number} opts.y - Top position
 * @param {number} opts.maxWidth
 * @param {number} opts.fontSize
 * @param {number} opts.fontWeight
 * @param {string} opts.brandColor
 * @param {number} opts.localTime - Time within scene (seconds)
 * @param {number} opts.startDelay - Delay before first word (seconds)
 * @param {number} opts.staggerDelay - Delay between words (seconds)
 * @param {string} opts.baseColor - Default text color (rgba)
 * @param {boolean} opts.shadow - Add text shadow
 * @returns {number} - Total height used
 */
export function drawKineticText(ctx, opts) {
  const {
    text,
    highlightWords = [],
    x,
    y,
    maxWidth,
    fontSize,
    fontWeight = 900,
    brandColor,
    localTime,
    startDelay = 0,
    staggerDelay = 0.08,
    baseColor = "rgba(255, 255, 255, 1)",
    shadow = true,
  } = opts;

  if (!text) return 0;

  ctx.font = `${fontWeight} ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  const words = cleanText(text).split(" ");
  const lineHeight = fontSize * 1.1;
  const spaceWidth = ctx.measureText(" ").width;

  // Layout: assemble lines with word positions
  const lines = [];
  let currentLine = { words: [], width: 0 };

  words.forEach((word, i) => {
    const wordWidth = ctx.measureText(word).width;
    const testWidth = currentLine.width + wordWidth + (currentLine.words.length > 0 ? spaceWidth : 0);

    if (testWidth > maxWidth && currentLine.words.length > 0) {
      lines.push(currentLine);
      currentLine = { words: [{ text: word, index: i, width: wordWidth }], width: wordWidth };
    } else {
      currentLine.words.push({ text: word, index: i, width: wordWidth });
      currentLine.width = testWidth;
    }
  });
  if (currentLine.words.length > 0) lines.push(currentLine);

  // Draw each word with stagger animation
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase().replace(/[^\w]/g, "")));

  lines.forEach((line, lineIdx) => {
    let cursorX = x;
    const lineY = y + lineIdx * lineHeight;

    line.words.forEach((word) => {
      const wordDelay = startDelay + word.index * staggerDelay;
      const wordProgress = spring(interpolate(localTime, [wordDelay, wordDelay + 0.5], [0, 1]));

      if (wordProgress <= 0) {
        cursorX += word.width + spaceWidth;
        return;
      }

      // Animation: fade + slide up + slight scale
      const offsetY = (1 - wordProgress) * 40;
      const scale = interpolate(wordProgress, [0, 1], [0.8, 1]);
      const alpha = wordProgress;

      // Check if this word should be highlighted
      const cleanWord = word.text.toLowerCase().replace(/[^\w]/g, "");
      const isHighlight = highlightSet.has(cleanWord);
      const color = isHighlight ? brandColor : baseColor;

      ctx.save();
      // Anchor scale at word center
      const anchorX = cursorX + word.width / 2;
      const anchorY = lineY + fontSize / 2;
      ctx.translate(anchorX, anchorY + offsetY);
      ctx.scale(scale, scale);
      ctx.translate(-anchorX, -anchorY);

      // Apply color with alpha
      if (color.startsWith("#")) {
        ctx.fillStyle = hexToRgba(color, alpha);
      } else {
        // rgba string — inject alpha
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
      }

      // Shadow
      if (shadow) {
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 6;
      }

      ctx.fillText(word.text, cursorX, lineY);
      ctx.restore();

      cursorX += word.width + spaceWidth;
    });
  });

  return lines.length * lineHeight;
}

/* ═══════════════════════════════════════════════════════
   BACKGROUND RENDERERS
═══════════════════════════════════════════════════════ */

export function drawGradientBackground(ctx, opts) {
  const { width, height, brandColor, globalTime } = opts;

  const angle = (globalTime * 8) % 360;
  const rad = (angle * Math.PI) / 180;

  const cx = width / 2;
  const cy = height / 2;
  const len = Math.max(width, height);
  const x1 = cx - Math.cos(rad) * len;
  const y1 = cy - Math.sin(rad) * len;
  const x2 = cx + Math.cos(rad) * len;
  const y2 = cy + Math.sin(rad) * len;

  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, shadeColor(brandColor, -10));
  gradient.addColorStop(0.5, shadeColor(brandColor, -50));
  gradient.addColorStop(1, "#000000");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Vignette overlay for depth
  const vignette = ctx.createRadialGradient(cx, cy, len * 0.3, cx, cy, len * 0.7);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

export function drawSolidBackground(ctx, opts) {
  const { width, height, brandColor } = opts;
  ctx.fillStyle = shadeColor(brandColor, -30);
  ctx.fillRect(0, 0, width, height);

  // Vignette
  const cx = width / 2;
  const cy = height / 2;
  const len = Math.max(width, height);
  const vignette = ctx.createRadialGradient(cx, cy, len * 0.3, cx, cy, len * 0.7);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

export function drawPatternBackground(ctx, opts) {
  const { width, height, brandColor, globalTime } = opts;

  ctx.fillStyle = shadeColor(brandColor, -55);
  ctx.fillRect(0, 0, width, height);

  const dotColor = hexToRgba(shadeColor(brandColor, 30), 0.3);
  const spacing = 60;
  const radius = 2.5;

  // Slight drift for movement
  const driftX = (globalTime * 5) % spacing;
  const driftY = (globalTime * 3) % spacing;

  ctx.fillStyle = dotColor;
  for (let x = -spacing + driftX; x < width + spacing; x += spacing) {
    for (let y = -spacing + driftY; y < height + spacing; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Vignette
  const cx = width / 2;
  const cy = height / 2;
  const len = Math.max(width, height);
  const vignette = ctx.createRadialGradient(cx, cy, len * 0.3, cx, cy, len * 0.7);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

export function drawBackground(ctx, opts) {
  const { backgroundStyle } = opts;
  if (backgroundStyle === "gradient") drawGradientBackground(ctx, opts);
  else if (backgroundStyle === "solid") drawSolidBackground(ctx, opts);
  else if (backgroundStyle === "pattern") drawPatternBackground(ctx, opts);
  else drawGradientBackground(ctx, opts);
}

/* ═══════════════════════════════════════════════════════
   MOTION GRAPHICS — Refined
═══════════════════════════════════════════════════════ */

const SHAPES_CONFIG = [
  { xPct: 0.10, yPct: 0.15, size: 140, speed: 0.6, type: "circle", opacity: 0.12 },
  { xPct: 0.88, yPct: 0.20, size: 90, speed: 0.8, type: "ring", opacity: 0.18 },
  { xPct: 0.12, yPct: 0.78, size: 110, speed: 0.5, type: "circle", opacity: 0.10 },
  { xPct: 0.85, yPct: 0.85, size: 70, speed: 0.9, type: "ring", opacity: 0.15 },
  { xPct: 0.50, yPct: 0.08, size: 50, speed: 1.2, type: "dot", opacity: 0.25 },
  { xPct: 0.92, yPct: 0.55, size: 30, speed: 1.4, type: "dot", opacity: 0.3 },
  { xPct: 0.08, yPct: 0.48, size: 25, speed: 1.6, type: "dot", opacity: 0.3 },
];

export function drawMotionGraphics(ctx, opts) {
  const { width, height, brandColor, globalTime } = opts;
  const brandLight = shadeColor(brandColor, 40);

  ctx.save();

  SHAPES_CONFIG.forEach((shape, i) => {
    const baseX = shape.xPct * width;
    const baseY = shape.yPct * height;

    const floatY = Math.sin(globalTime * shape.speed + i * 1.5) * 40;
    const floatX = Math.cos(globalTime * shape.speed + i * 1.5) * 25;

    const x = baseX + floatX;
    const y = baseY + floatY;

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = shape.opacity;

    if (shape.type === "circle") {
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size / 2);
      grad.addColorStop(0, brandLight);
      grad.addColorStop(0.5, hexToRgba(brandLight, 0.3));
      grad.addColorStop(1, hexToRgba(brandLight, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === "ring") {
      ctx.strokeStyle = brandLight;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "dot") {
      ctx.fillStyle = brandLight;
      ctx.beginPath();
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR — Top of screen
═══════════════════════════════════════════════════════ */

export function drawProgressBar(ctx, opts) {
  const { width, globalTime, index, sceneDuration, localTime } = opts;
  const totalScenes = opts.totalScenes || 1;

  const barY = 40;
  const barHeight = 4;
  const gap = 8;
  const availableWidth = width - 80;
  const segmentWidth = (availableWidth - gap * (totalScenes - 1)) / totalScenes;
  const startX = 40;

  for (let i = 0; i < totalScenes; i++) {
    const x = startX + i * (segmentWidth + gap);

    // Background
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.roundRect(x, barY, segmentWidth, barHeight, barHeight / 2);
    ctx.fill();

    // Fill
    let fillWidth = 0;
    if (i < index) fillWidth = segmentWidth;
    else if (i === index) fillWidth = segmentWidth * (localTime / sceneDuration);

    if (fillWidth > 0) {
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.roundRect(x, barY, fillWidth, barHeight, barHeight / 2);
      ctx.fill();
    }
  }
}

/* ═══════════════════════════════════════════════════════
   SCENE INDICATOR CHIP — "01 / 05"
═══════════════════════════════════════════════════════ */

function drawSceneChip(ctx, opts) {
  const { width, index, localTime } = opts;
  const totalScenes = opts.totalScenes || 1;

  const chipProgress = spring(interpolate(localTime, [0, 0.5], [0, 1]));
  const num = String(index + 1).padStart(2, "0");
  const total = String(totalScenes).padStart(2, "0");
  const text = `${num} / ${total}`;

  ctx.save();
  ctx.globalAlpha = chipProgress * 0.7;

  ctx.font = `600 24px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#ffffff";

  // Letter spacing simulation
  const chars = text.split("");
  let x = width - 60;
  const charWidths = chars.map((c) => ctx.measureText(c).width + 3);
  const totalWidth = charWidths.reduce((a, b) => a + b, 0);
  let startX = width - 60 - totalWidth;

  ctx.textAlign = "left";
  chars.forEach((c, i) => {
    ctx.fillText(c, startX, 75);
    startX += charWidths[i];
  });

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   HEADLINE SCENE — Premium
═══════════════════════════════════════════════════════ */

function drawHeadlineScene(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;

  const labelProgress = spring(interpolate(localTime, [0, 0.4], [0, 1]));
  const barProgress = spring(interpolate(localTime, [0.1, 0.6], [0, 1]));
  const subtitleProgress = spring(interpolate(localTime, [0.9, 1.4], [0, 1]));

  const centerX = width / 2;
  const startY = height * 0.32;
  const maxTextWidth = width * 0.85;
  const leftX = centerX - maxTextWidth / 2;

  // ─── Accent bar
  const barWidth = 200 * barProgress;
  const barHeight = 8;
  const barY = startY - 20;
  const barGrad = ctx.createLinearGradient(leftX, 0, leftX + barWidth, 0);
  barGrad.addColorStop(0, shadeColor(brandColor, 40));
  barGrad.addColorStop(1, brandColor);
  ctx.fillStyle = barGrad;
  ctx.beginPath();
  ctx.roundRect(leftX, barY, barWidth, barHeight, barHeight / 2);
  ctx.fill();

  // ─── Kinetic title
  const titleFontSize = 96;
  const titleY = startY + 30;
  const titleHeight = drawKineticText(ctx, {
    text: scene.title || "",
    highlightWords: scene.highlightWords || [],
    x: leftX,
    y: titleY,
    maxWidth: maxTextWidth,
    fontSize: titleFontSize,
    fontWeight: 900,
    brandColor,
    localTime,
    startDelay: 0.25,
    staggerDelay: 0.1,
  });

  // ─── Subtitle
  if (scene.subtitle) {
    const subtitleFontSize = 40;
    ctx.font = `400 ${subtitleFontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * subtitleProgress})`;

    const subtitleY = titleY + titleHeight + 40 + (1 - subtitleProgress) * 30;
    const subtitleLines = wrapText(ctx, scene.subtitle, maxTextWidth);
    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, leftX, subtitleY + i * subtitleFontSize * 1.4);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   STEP SCENE — Premium
═══════════════════════════════════════════════════════ */

function drawStepScene(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;

  const badgeProgress = spring(interpolate(localTime, [0, 0.5], [0, 1]));
  const labelProgress = spring(interpolate(localTime, [0.2, 0.6], [0, 1]));
  const subtitleProgress = spring(interpolate(localTime, [1.0, 1.5], [0, 1]));

  const leftX = width * 0.08;
  const startY = height * 0.28;
  const maxTextWidth = width * 0.85;

  // ─── Step badge
  const badgeSize = 130;
  const badgeX = leftX + badgeSize / 2;
  const badgeY = startY;
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.3, 1]);
  const badgeRotation = interpolate(badgeProgress, [0, 1], [-30, 0]);

  ctx.save();
  ctx.translate(badgeX, badgeY);
  ctx.scale(badgeScale, badgeScale);
  ctx.rotate((badgeRotation * Math.PI) / 180);
  ctx.globalAlpha = badgeProgress;

  ctx.shadowColor = hexToRgba(brandColor, 0.7);
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 10;

  const badgeGrad = ctx.createLinearGradient(-badgeSize / 2, -badgeSize / 2, badgeSize / 2, badgeSize / 2);
  badgeGrad.addColorStop(0, shadeColor(brandColor, 20));
  badgeGrad.addColorStop(1, brandColor);
  ctx.fillStyle = badgeGrad;

  const badgeRadius = 32;
  ctx.beginPath();
  ctx.roundRect(-badgeSize / 2, -badgeSize / 2, badgeSize, badgeSize, badgeRadius);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const highlight = ctx.createLinearGradient(0, -badgeSize / 2, 0, 0);
  highlight.addColorStop(0, "rgba(255,255,255,0.25)");
  highlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = highlight;
  ctx.beginPath();
  ctx.roundRect(-badgeSize / 2, -badgeSize / 2, badgeSize, badgeSize / 2, [badgeRadius, badgeRadius, 0, 0]);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `900 68px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(scene.stepNumber || "•"), 0, 4);
  ctx.restore();

  // ─── "STEP X" label
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = `rgba(255, 255, 255, ${0.65 * labelProgress})`;
  ctx.font = `700 28px system-ui, -apple-system, sans-serif`;
  const labelText = `STEP ${scene.stepNumber || ""}`;
  let labelX = leftX + badgeSize + 32;
  labelText.split("").forEach((c) => {
    ctx.fillText(c, labelX, badgeY);
    labelX += ctx.measureText(c).width + 4;
  });

  // ─── Kinetic title
  const titleFontSize = 84;
  const titleY = startY + 110;
  const titleHeight = drawKineticText(ctx, {
    text: scene.title || "",
    highlightWords: scene.highlightWords || [],
    x: leftX,
    y: titleY,
    maxWidth: maxTextWidth,
    fontSize: titleFontSize,
    fontWeight: 900,
    brandColor,
    localTime,
    startDelay: 0.35,
    staggerDelay: 0.09,
  });

  // ─── Subtitle
  if (scene.subtitle) {
    const subtitleFontSize = 38;
    ctx.font = `400 ${subtitleFontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * subtitleProgress})`;

    const subtitleY = titleY + titleHeight + 35 + (1 - subtitleProgress) * 30;
    const subtitleLines = wrapText(ctx, scene.subtitle, maxTextWidth);
    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, leftX, subtitleY + i * subtitleFontSize * 1.4);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   CTA SCENE — Premium with animated arrow
═══════════════════════════════════════════════════════ */

function drawCtaScene(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;

  const glowProgress = spring(interpolate(localTime, [0, 0.4], [0, 1]));
  const subtitleProgress = spring(interpolate(localTime, [0.9, 1.4], [0, 1]));
  const buttonProgress = spring(interpolate(localTime, [1.2, 1.8], [0, 1]));
  const urlProgress = spring(interpolate(localTime, [1.4, 1.9], [0, 1]));

  const pulse = 1 + Math.sin(localTime * 3) * 0.025;
  const arrowShift = Math.sin(localTime * 3) * 8;

  const centerX = width / 2;
  const centerY = height / 2;
  const maxTextWidth = width * 0.88;

  // ─── Radial glow
  ctx.save();
  ctx.globalAlpha = glowProgress * 0.5;
  const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 500);
  glowGrad.addColorStop(0, hexToRgba(brandColor, 0.6));
  glowGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // ─── Kinetic title (centered)
  const titleFontSize = 100;
  ctx.font = `900 ${titleFontSize}px system-ui, -apple-system, sans-serif`;

  // Pre-measure to center each line
  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxTextWidth);
  const titleLineHeight = titleFontSize * 1.05;
  const totalTitleHeight = titleLines.length * titleLineHeight;
  const titleStartY = centerY - 260 - totalTitleHeight / 2;

  // For CTA we render kinetic centered — split each line, measure, position
  const words = (scene.title || "").split(" ");
  const highlightSet = new Set(
    (scene.highlightWords || []).map((w) => w.toLowerCase().replace(/[^\w]/g, ""))
  );
  const spaceWidth = ctx.measureText(" ").width;

  // Build lines with words
  const layoutLines = [];
  let curLine = { words: [], width: 0 };
  words.forEach((word, i) => {
    const w = ctx.measureText(word).width;
    const test = curLine.width + w + (curLine.words.length > 0 ? spaceWidth : 0);
    if (test > maxTextWidth && curLine.words.length > 0) {
      layoutLines.push(curLine);
      curLine = { words: [{ text: word, index: i, width: w }], width: w };
    } else {
      curLine.words.push({ text: word, index: i, width: w });
      curLine.width = test;
    }
  });
  if (curLine.words.length > 0) layoutLines.push(curLine);

  layoutLines.forEach((line, lineIdx) => {
    const lineY = titleStartY + lineIdx * titleLineHeight;
    let cursorX = centerX - line.width / 2;

    line.words.forEach((word) => {
      const wordDelay = 0.15 + word.index * 0.09;
      const wordProgress = spring(interpolate(localTime, [wordDelay, wordDelay + 0.5], [0, 1]));

      if (wordProgress <= 0) {
        cursorX += word.width + spaceWidth;
        return;
      }

      const offsetY = (1 - wordProgress) * 50;
      const scale = interpolate(wordProgress, [0, 1], [0.7, 1]);
      const cleanWord = word.text.toLowerCase().replace(/[^\w]/g, "");
      const isHighlight = highlightSet.has(cleanWord);
      const color = isHighlight ? brandColor : "#ffffff";

      ctx.save();
      const anchorX = cursorX + word.width / 2;
      const anchorY = lineY + titleFontSize / 2;
      ctx.translate(anchorX, anchorY + offsetY);
      ctx.scale(scale, scale);
      ctx.translate(-anchorX, -anchorY);

      ctx.fillStyle = hexToRgba(color, wordProgress);
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 6;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(word.text, cursorX, lineY);
      ctx.restore();

      cursorX += word.width + spaceWidth;
    });
  });

  // ─── Subtitle
  if (scene.subtitle) {
    const subtitleFontSize = 42;
    ctx.font = `400 ${subtitleFontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * subtitleProgress})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const subtitleY = titleStartY + totalTitleHeight + 30;
    const subtitleLines = wrapText(ctx, cleanText(scene.subtitle), maxTextWidth);
    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, centerX, subtitleY + i * subtitleFontSize * 1.4);
    });
  }

  // ─── CTA Button
  const buttonScale = interpolate(buttonProgress, [0, 1], [0.6, 1]) * pulse;
  const buttonY = centerY + 250;

  ctx.save();
  ctx.translate(centerX, buttonY);
  ctx.scale(buttonScale, buttonScale);
  ctx.globalAlpha = buttonProgress;

  const btnText = cleanText(scene.ctaText || "Try It Free");
  const arrowText = " →";
  const btnFontSize = 46;
  ctx.font = `800 ${btnFontSize}px system-ui, -apple-system, sans-serif`;

  const textMetrics = ctx.measureText(btnText + arrowText);
  const btnPaddingX = 80;
  const btnPaddingY = 34;
  const btnWidth = textMetrics.width + btnPaddingX * 2;
  const btnHeight = btnFontSize + btnPaddingY * 2;
  const btnRadius = btnHeight / 2;

  ctx.shadowColor = hexToRgba(brandColor, 0.7);
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 15;

  const btnGrad = ctx.createLinearGradient(0, -btnHeight / 2, 0, btnHeight / 2);
  btnGrad.addColorStop(0, shadeColor(brandColor, 20));
  btnGrad.addColorStop(1, brandColor);
  ctx.fillStyle = btnGrad;
  ctx.beginPath();
  ctx.roundRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, btnRadius);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const btnHighlight = ctx.createLinearGradient(0, -btnHeight / 2, 0, 0);
  btnHighlight.addColorStop(0, "rgba(255,255,255,0.2)");
  btnHighlight.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = btnHighlight;
  ctx.beginPath();
  ctx.roundRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight / 2, [btnRadius, btnRadius, 0, 0]);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  const mainWidth = ctx.measureText(btnText).width;
  const arrowWidth = ctx.measureText(arrowText).width;
  const combinedWidth = mainWidth + arrowWidth;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const textX = -combinedWidth / 2;
  ctx.fillText(btnText, textX, 4);
  ctx.fillText(arrowText, textX + mainWidth + arrowShift, 4);
  ctx.restore();

  // ─── URL
  if (scene.ctaUrl) {
    ctx.font = `500 32px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * urlProgress})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const urlChars = scene.ctaUrl.split("");
    const totalWidth = urlChars.reduce((sum, c) => sum + ctx.measureText(c).width + 2, 0);
    let urlX = centerX - totalWidth / 2;
    urlChars.forEach((c) => {
      ctx.fillText(c, urlX, buttonY + btnHeight / 2 + 45);
      urlX += ctx.measureText(c).width + 2;
    });
  }
}

/* ═══════════════════════════════════════════════════════
   VISUAL SCENE — Full-screen image with overlay text
═══════════════════════════════════════════════════════ */

function drawVisualScene(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;

  const titleProgress = spring(interpolate(localTime, [0.4, 1.0], [0, 1]));
  const subtitleProgress = spring(interpolate(localTime, [0.7, 1.3], [0, 1]));

  const maxTextWidth = width * 0.9;
  const centerX = width / 2;

  // Text positioned at bottom third of screen
  const titleY = height * 0.72;

  // ─── Title with kinetic animation
  ctx.font = `900 84px system-ui, -apple-system, sans-serif`;
  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxTextWidth);
  const titleLineHeight = 84 * 1.05;

  // Kinetic word-by-word
  const words = cleanText(scene.title || "").split(" ");
  const highlightSet = new Set(
    (scene.highlightWords || []).map((w) => w.toLowerCase().replace(/[^\w]/g, ""))
  );
  const spaceWidth = ctx.measureText(" ").width;

  const layoutLines = [];
  let curLine = { words: [], width: 0 };
  words.forEach((word, i) => {
    const w = ctx.measureText(word).width;
    const test = curLine.width + w + (curLine.words.length > 0 ? spaceWidth : 0);
    if (test > maxTextWidth && curLine.words.length > 0) {
      layoutLines.push(curLine);
      curLine = { words: [{ text: word, index: i, width: w }], width: w };
    } else {
      curLine.words.push({ text: word, index: i, width: w });
      curLine.width = test;
    }
  });
  if (curLine.words.length > 0) layoutLines.push(curLine);

  // Draw dark gradient overlay for text readability (bottom half)
  const overlayGrad = ctx.createLinearGradient(0, height * 0.5, 0, height);
  overlayGrad.addColorStop(0, "rgba(0,0,0,0)");
  overlayGrad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(0, height * 0.5, width, height * 0.5);

  layoutLines.forEach((line, lineIdx) => {
    const lineY = titleY + lineIdx * titleLineHeight;
    let cursorX = centerX - line.width / 2;

    line.words.forEach((word) => {
      const wordDelay = 0.4 + word.index * 0.08;
      const wordProgress = spring(interpolate(localTime, [wordDelay, wordDelay + 0.5], [0, 1]));

      if (wordProgress <= 0) {
        cursorX += word.width + spaceWidth;
        return;
      }

      const offsetY = (1 - wordProgress) * 40;
      const scale = interpolate(wordProgress, [0, 1], [0.85, 1]);
      const cleanWord = word.text.toLowerCase().replace(/[^\w]/g, "");
      const isHighlight = highlightSet.has(cleanWord);
      const color = isHighlight ? brandColor : "#ffffff";

      ctx.save();
      const anchorX = cursorX + word.width / 2;
      const anchorY = lineY + 42;
      ctx.translate(anchorX, anchorY + offsetY);
      ctx.scale(scale, scale);
      ctx.translate(-anchorX, -anchorY);

      ctx.fillStyle = hexToRgba(color, wordProgress);
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 4;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(word.text, cursorX, lineY);
      ctx.restore();

      cursorX += word.width + spaceWidth;
    });
  });

  // ─── Subtitle
  if (scene.subtitle) {
    const subtitleFontSize = 36;
    ctx.font = `500 ${subtitleFontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * subtitleProgress})`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    const subtitleY =
      titleY + layoutLines.length * titleLineHeight + 30 + (1 - subtitleProgress) * 30;
    const subtitleLines = wrapText(ctx, cleanText(scene.subtitle), maxTextWidth);
    subtitleLines.forEach((line, i) => {
      ctx.fillText(line, centerX, subtitleY + i * subtitleFontSize * 1.4);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   DISPATCHER
═══════════════════════════════════════════════════════ */

export function drawSceneText(ctx, opts) {
  const { scene, contentStyle } = opts;
  if (contentStyle === "images-only") return;

  if (scene.type === "step") drawStepScene(ctx, opts);
  else if (scene.type === "cta") drawCtaScene(ctx, opts);
  else if (scene.type === "visual") drawVisualScene(ctx, opts);
  else drawHeadlineScene(ctx, opts);
}

/* ═══════════════════════════════════════════════════════
   IMAGE RENDERER — BIG & PROMINENT
═══════════════════════════════════════════════════════ */

export function drawSceneImage(ctx, opts) {
  const { scene, contentStyle, localTime } = opts;

  if (!scene.imageUrl) return;
  const img = getCachedImage(scene.imageUrl);
  if (!img) return;

  const imageProgress = spring(interpolate(localTime, [0.05, 0.6], [0, 1]));
  if (imageProgress <= 0) return;

  // Visual scenes ALWAYS get full-screen image regardless of contentStyle
  if (scene.type === "visual") {
    drawFullBackgroundImage(ctx, img, opts, imageProgress);
    return;
  }

  if (contentStyle === "images-only") {
    drawFullBackgroundImage(ctx, img, opts, imageProgress);
  } else if (contentStyle === "image-text") {
    drawFloatingImage(ctx, img, opts, imageProgress);
  }
}

function drawFullBackgroundImage(ctx, img, opts, progress) {
  const { width, height, globalTime, scene, brandColor } = opts;

  const imgAspect = img.width / img.height;
  const canvasAspect = width / height;

  ctx.save();
  ctx.globalAlpha = progress;

  // ─── SMART LAYOUT DECISION ─────────────────────────────
  // Rule: use CONTAIN mode whenever the image would get cropped significantly.
  // Only use COVER when aspect is very close (within 15%)
  const aspectDiff = Math.abs(imgAspect - canvasAspect);
  const aspectDiffPct = aspectDiff / canvasAspect;
  const shouldContain = aspectDiffPct > 0.15; // Contain if >15% off

  if (shouldContain) {
    // ─── CONTAIN MODE — fit image, blur background ───
    // Draw blurred/dark version as background
    const bgScale = Math.max(width / img.width, height / img.height) * 1.2;
    const bgW = img.width * bgScale;
    const bgH = img.height * bgScale;
    const bgX = (width - bgW) / 2;
    const bgY = (height - bgH) / 2;

    // Draw stretched image as blurry backdrop
    ctx.filter = "blur(40px) brightness(0.4)";
    ctx.drawImage(img, bgX, bgY, bgW, bgH);
    ctx.filter = "none";

    // Solid dark overlay for consistency
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, width, height);

    // Now draw main image contained (fit inside frame)
    const kenBurns = 1 + globalTime * 0.01;
    const containScale = Math.min(width / img.width, height / img.height) * 0.9 * kenBurns;
    const drawW = img.width * containScale;
    const drawH = img.height * containScale;

    // Position: centered horizontally, upper portion (leaves room for text at bottom)
    const drawX = (width - drawW) / 2;
    const drawY = scene?.type === "visual"
      ? (height * 0.45 - drawH / 2)  // Centered in upper 55%
      : (height - drawH) / 2;         // Truly centered otherwise

    // Rounded card behind image for polish
    const radius = 20;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 10;
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawW, drawH, radius);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.restore();

    // Clip and draw image
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawW, drawH, radius);
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Border
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawW, drawH, radius);
    ctx.stroke();
  } else {
    // ─── COVER MODE — matching aspect, fill screen with Ken Burns ───
    const kenBurns = 1 + globalTime * 0.015;
    const scale = Math.max(width / img.width, height / img.height) * kenBurns;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    if (scene?.type === "visual") {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, width, height);
    }
  }

  ctx.restore();
}

function drawFloatingImage(ctx, img, opts, progress) {
  const { width, height } = opts;

  const maxCardWidth = width * 0.85;
  const maxCardHeight = height * 0.45;

  const imgAspect = img.width / img.height;
  const cardAspect = maxCardWidth / maxCardHeight;

  let cardW, cardH;
  if (imgAspect > cardAspect) {
    cardW = maxCardWidth;
    cardH = maxCardWidth / imgAspect;
  } else {
    cardH = maxCardHeight;
    cardW = maxCardHeight * imgAspect;
  }

  const cx = width / 2;
  const cardY = height * 0.55;

  const scale = interpolate(progress, [0, 1], [0.85, 1]);
  const offsetY = (1 - progress) * 60;

  ctx.save();
  ctx.translate(cx, cardY + offsetY);
  ctx.scale(scale, scale);
  ctx.globalAlpha = progress;

  const radius = 24;
  const drawX = -cardW / 2;
  const drawY = 0;

  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 20;

  ctx.beginPath();
  ctx.roundRect(drawX, drawY, cardW, cardH, radius);
  ctx.fillStyle = "#000";
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(drawX, drawY, cardW, cardH, radius);
  ctx.clip();
  ctx.drawImage(img, drawX, drawY, cardW, cardH);
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(drawX, drawY, cardW, cardH, radius);
  ctx.stroke();

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   LOGO CORNER
═══════════════════════════════════════════════════════ */

function drawLogo(ctx, opts) {
  const { logoUrl, width } = opts;
  if (!logoUrl) return;

  const img = getCachedImage(logoUrl);
  if (!img) return;

  // Logo box in top-left, matching progress bar area
  const boxSize = 100;
  const boxX = 40;
  const boxY = 100; // Below the progress bar at y=40
  const padding = 12;

  ctx.save();

  // Glass background
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxSize, boxSize, 20);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxSize, boxSize, 20);
  ctx.stroke();

  // Draw logo maintaining aspect ratio
  const innerSize = boxSize - padding * 2;
  const imgAspect = img.width / img.height;
  let drawW, drawH;

  if (imgAspect > 1) {
    drawW = innerSize;
    drawH = innerSize / imgAspect;
  } else {
    drawH = innerSize;
    drawW = innerSize * imgAspect;
  }

  const drawX = boxX + (boxSize - drawW) / 2;
  const drawY = boxY + (boxSize - drawH) / 2;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   WATERMARK
═══════════════════════════════════════════════════════ */

function drawWatermark(ctx, opts) {
  const { width, height } = opts;

  const text = "fancydigitals.com.ng";
  const fontSize = 22;
  ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;

  const metrics = ctx.measureText(text);
  const paddingX = 18;
  const paddingY = 10;
  const boxW = metrics.width + paddingX * 2;
  const boxH = fontSize + paddingY * 2;

  const x = width - boxW - 40;
  const y = height - boxH - 40;

  ctx.save();
  ctx.globalAlpha = 0.85;

  // Background
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.roundRect(x, y, boxW, boxH, 8);
  ctx.fill();

  // Text
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + paddingX, y + boxH / 2);

  ctx.restore();
}
/* ═══════════════════════════════════════════════════════
   MASTER RENDERER
═══════════════════════════════════════════════════════ */

export function renderModernScene(ctx, opts) {
  // Layer 1: Background with vignette
  drawBackground(ctx, opts);

  // Layer 2: Motion graphics
  drawMotionGraphics(ctx, opts);

  // Layer 3: Scene image
  drawSceneImage(ctx, opts);

  // Layer 4: Text content
  drawSceneText(ctx, opts);

  // Layer 5: Progress bar (top)
  drawProgressBar(ctx, opts);

  // Layer 6: Scene chip (top right)
  drawSceneChip(ctx, opts);

  // Layer 7: Logo (top left)
  drawLogo(ctx, opts);

  // Layer 8: Watermark (bottom right)
  if (opts.showWatermark) drawWatermark(ctx, opts);
}