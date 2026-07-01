"use client";

import {
  interpolate,
  spring,
  shadeColor,
  hexToRgba,
  wrapText,
  getCachedImage,
} from "../canvas-engine";

/* ═══════════════════════════════════════════════════════
   LUXURY TEMPLATE
   Serif fonts · Gold accents · Slow elegant animations
   Deep dark backgrounds · Glass morphism
═══════════════════════════════════════════════════════ */

// Cream stays constant (elegant text color)
const CREAM = "#f5efe0";

/**
 * Build luxury palette from user's brand color.
 * Uses a warm gold-tinted variant + brand-tinted accents.
 */
function buildLuxuryPalette(brandColor) {
  return {
    accent: shadeColor(brandColor, 25),        // brighter brand for accents
    accentLight: shadeColor(brandColor, 50),    // even brighter for highlights
    accentDark: shadeColor(brandColor, -30),    // deeper for shadows
    cream: CREAM,
  };
}

/* ─── CLEAN TEXT (strip markdown) ─── */
function cleanText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/~~(.*?)~~/g, "$1")
    .trim();
}

/* ═══════════════════════════════════════════════════════
   BACKGROUND — Deep dark with gold particles
═══════════════════════════════════════════════════════ */

function drawLuxuryBackground(ctx, opts) {
  const { width, height, brandColor, globalTime } = opts;

  // Deep gradient — near black to deep brand tone
  const grad = ctx.createRadialGradient(
    width / 2,
    height * 0.4,
    0,
    width / 2,
    height * 0.4,
    Math.max(width, height) * 0.8
  );
  grad.addColorStop(0, shadeColor(brandColor, -55));
  grad.addColorStop(0.6, "#0a0a0a");
  grad.addColorStop(1, "#000000");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Vignette
  const vignette = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.max(width, height) * 0.3,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.75
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.7)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

/* ═══════════════════════════════════════════════════════
   GOLD PARTICLES — subtle floating specks
═══════════════════════════════════════════════════════ */

const GOLD_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  xPct: Math.random(),
  yPct: Math.random(),
  size: 2 + Math.random() * 4,
  speed: 0.2 + Math.random() * 0.4,
  offset: Math.random() * Math.PI * 2,
}));

function drawGoldParticles(ctx, opts) {
  const { width, height, globalTime, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  ctx.save();
  GOLD_PARTICLES.forEach((particle, i) => {
    const driftY = Math.sin(globalTime * particle.speed + particle.offset) * 60;
    const driftX = Math.cos(globalTime * particle.speed * 0.7 + particle.offset) * 40;
    const twinkle = 0.3 + Math.abs(Math.sin(globalTime * 1.5 + i)) * 0.5;

    const x = particle.xPct * width + driftX;
    const y = particle.yPct * height + driftY;

    ctx.globalAlpha = twinkle * 0.5;

    const glow = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 4);
    glow.addColorStop(0, p.accentLight);
    glow.addColorStop(0.5, hexToRgba(p.accent, 0.3));
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, particle.size * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = p.accentLight;
    ctx.beginPath();
    ctx.arc(x, y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   GOLD ORNAMENTAL LINES (top and bottom borders)
═══════════════════════════════════════════════════════ */

function drawOrnaments(ctx, opts) {
  const { width, height, localTime, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const progress = interpolate(localTime, [0, 0.8], [0, 1], { extrapolate: "clamp" });
  const eased = 1 - Math.pow(1 - progress, 3);

  const topY = 80;
  const lineWidth = width * 0.35 * eased;
  const centerX = width / 2;

  ctx.save();
  ctx.strokeStyle = hexToRgba(p.accent, 0.6);
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(centerX - lineWidth / 2 - 30, topY);
  ctx.lineTo(centerX - 25, topY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX + 25, topY);
  ctx.lineTo(centerX + lineWidth / 2 + 30, topY);
  ctx.stroke();

  ctx.globalAlpha = eased;
  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.moveTo(centerX, topY - 8);
  ctx.lineTo(centerX + 8, topY);
  ctx.lineTo(centerX, topY + 8);
  ctx.lineTo(centerX - 8, topY);
  ctx.closePath();
  ctx.fill();

  const bottomY = height - 80;
  ctx.beginPath();
  ctx.moveTo(centerX - lineWidth / 2 - 30, bottomY);
  ctx.lineTo(centerX - 25, bottomY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX + 25, bottomY);
  ctx.lineTo(centerX + lineWidth / 2 + 30, bottomY);
  ctx.stroke();

  ctx.fillStyle = p.accent;
  ctx.beginPath();
  ctx.moveTo(centerX, bottomY - 8);
  ctx.lineTo(centerX + 8, bottomY);
  ctx.lineTo(centerX, bottomY + 8);
  ctx.lineTo(centerX - 8, bottomY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   HEADLINE SCENE — Serif elegance
═══════════════════════════════════════════════════════ */

function drawLuxuryHeadline(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const titleProgress = interpolate(localTime, [0.4, 1.6], [0, 1], { extrapolate: "clamp" });
  const titleEased = 1 - Math.pow(1 - titleProgress, 4); // Slower, gentler
  const subtitleProgress = interpolate(localTime, [1.2, 2.0], [0, 1], { extrapolate: "clamp" });

  const centerX = width / 2;
  const centerY = height / 2;
  const maxWidth = width * 0.82;

  // Small label
  const labelProgress = interpolate(localTime, [0.1, 0.8], [0, 1], { extrapolate: "clamp" });
  ctx.save();
  ctx.globalAlpha = labelProgress * 0.6;
  ctx.font = `500 22px 'Georgia', serif`;
  ctx.fillStyle = p.accentLight;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const label = "PRESENTS";
  const labelWidth = ctx.measureText(label).width;
  let cx = centerX - labelWidth / 2 - (label.length * 5);
  label.split("").forEach((c) => {
    ctx.fillText(c, cx + ctx.measureText(c).width / 2, centerY - 240);
    cx += ctx.measureText(c).width + 10;
  });
  ctx.restore();

  // Serif title
  ctx.font = `400 92px 'Georgia', 'Playfair Display', serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = hexToRgba(p.cream, titleEased);

  const titleY = centerY - 40 + (1 - titleEased) * 30;
  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxWidth);
  const lineHeight = 92 * 1.2;
  const totalTitleHeight = titleLines.length * lineHeight;

  titleLines.forEach((line, i) => {
    ctx.fillText(line, centerX, titleY - totalTitleHeight / 2 + (i + 0.5) * lineHeight);
  });

  // Underline
  const underlineProgress = interpolate(localTime, [1.0, 1.8], [0, 1], { extrapolate: "clamp" });
  const underlineWidth = 100 * underlineProgress;
  const underlineY = titleY + totalTitleHeight / 2 + 40;
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - underlineWidth / 2, underlineY);
  ctx.lineTo(centerX + underlineWidth / 2, underlineY);
  ctx.stroke();

  if (scene.subtitle) {
    ctx.font = `italic 400 32px 'Georgia', serif`;
    ctx.fillStyle = hexToRgba(p.cream, 0.65 * subtitleProgress);
    const subtitleY = underlineY + 55 + (1 - subtitleProgress) * 15;
    const subLines = wrapText(ctx, cleanText(scene.subtitle), maxWidth);
    subLines.forEach((line, i) => {
      ctx.fillText(line, centerX, subtitleY + i * 32 * 1.5);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   STEP SCENE — Roman numerals in gold circle
═══════════════════════════════════════════════════════ */

function toRoman(num) {
  const romans = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
  ];
  let result = "";
  for (const [letter, value] of romans) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result || "I";
}

function drawLuxuryStep(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const badgeProgress = interpolate(localTime, [0.1, 1.0], [0, 1], { extrapolate: "clamp" });
  const badgeEased = 1 - Math.pow(1 - badgeProgress, 4);
  const titleProgress = interpolate(localTime, [0.7, 1.6], [0, 1], { extrapolate: "clamp" });
  const subtitleProgress = interpolate(localTime, [1.3, 2.0], [0, 1], { extrapolate: "clamp" });

  const centerX = width / 2;
  const startY = height * 0.28;
  const maxWidth = width * 0.85;

  const badgeSize = 130;
  const badgeY = startY;
  const badgeScale = interpolate(badgeEased, [0, 1], [0.7, 1]);

  ctx.save();
  ctx.translate(centerX, badgeY);
  ctx.scale(badgeScale, badgeScale);
  ctx.globalAlpha = badgeEased;

  ctx.strokeStyle = hexToRgba(p.accent, 0.4);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, badgeSize / 2 + 14, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, badgeSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = p.accentLight;
  ctx.font = `400 64px 'Georgia', serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(toRoman(scene.stepNumber || 1), 0, 6);

  ctx.restore();

  // CHAPTER label
  ctx.font = `500 20px 'Georgia', serif`;
  ctx.fillStyle = hexToRgba(p.accentLight, 0.7 * badgeEased);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const chapterText = `CHAPTER ${toRoman(scene.stepNumber || 1)}`;
  let cx = centerX - ctx.measureText(chapterText).width / 2;
  chapterText.split("").forEach((c) => {
    ctx.fillText(c, cx + ctx.measureText(c).width / 2, badgeY + 110);
    cx += ctx.measureText(c).width + 8;
  });

  // Title
  ctx.font = `400 72px 'Georgia', serif`;
  ctx.fillStyle = hexToRgba(p.cream, titleProgress);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const titleY = badgeY + 185 + (1 - titleProgress) * 30;
  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxWidth);
  const lineHeight = 72 * 1.2;

  titleLines.forEach((line, i) => {
    ctx.fillText(line, centerX, titleY + i * lineHeight);
  });

  if (scene.subtitle) {
    ctx.font = `italic 400 30px 'Georgia', serif`;
    ctx.fillStyle = hexToRgba(p.cream, 0.7 * subtitleProgress);
    const subtitleY = titleY + titleLines.length * lineHeight + 35;
    const subLines = wrapText(ctx, cleanText(scene.subtitle), maxWidth);
    subLines.forEach((line, i) => {
      ctx.fillText(line, centerX, subtitleY + i * 30 * 1.5);
    });
  }
}

/* ═══════════════════════════════════════════════════════
   CTA SCENE — Refined gold button
═══════════════════════════════════════════════════════ */

function drawLuxuryCta(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const titleProgress = interpolate(localTime, [0.4, 1.6], [0, 1], { extrapolate: "clamp" });
  const titleEased = 1 - Math.pow(1 - titleProgress, 4);
  const buttonProgress = interpolate(localTime, [1.4, 2.2], [0, 1], { extrapolate: "clamp" });
  const buttonEased = 1 - Math.pow(1 - buttonProgress, 3);
  const urlProgress = interpolate(localTime, [1.7, 2.3], [0, 1], { extrapolate: "clamp" });

  const centerX = width / 2;
  const centerY = height / 2;
  const maxWidth = width * 0.85;

  // Glow
  ctx.save();
  ctx.globalAlpha = titleEased * 0.35;
  const glow = ctx.createRadialGradient(centerX, centerY - 100, 0, centerX, centerY - 100, 450);
  glow.addColorStop(0, hexToRgba(p.accent, 0.4));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  // Title
  ctx.font = `400 96px 'Georgia', serif`;
  ctx.fillStyle = hexToRgba(p.cream, titleEased);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxWidth);
  const lineHeight = 96 * 1.2;
  const titleY = centerY - 220 + (1 - titleEased) * 25;

  titleLines.forEach((line, i) => {
    ctx.fillText(line, centerX, titleY + i * lineHeight);
  });

  if (scene.subtitle) {
    ctx.font = `italic 400 34px 'Georgia', serif`;
    ctx.fillStyle = hexToRgba(p.cream, 0.65 * titleEased);
    ctx.fillText(
      cleanText(scene.subtitle),
      centerX,
      titleY + titleLines.length * lineHeight + 45
    );
  }

  // Button
  const btnScale = interpolate(buttonEased, [0, 1], [0.85, 1]);
  const buttonY = centerY + 210;

  ctx.save();
  ctx.translate(centerX, buttonY);
  ctx.scale(btnScale, btnScale);
  ctx.globalAlpha = buttonEased;

  const btnText = cleanText(scene.ctaText || "Begin");
  ctx.font = `500 38px 'Georgia', serif`;
  const textW = ctx.measureText(btnText).width;
  const padX = 60;
  const padY = 24;
  const btnW = textW + padX * 2;
  const btnH = 38 + padY * 2;

  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.rect(-btnW / 2, -btnH / 2, btnW, btnH);
  ctx.stroke();

  ctx.strokeStyle = hexToRgba(p.accent, 0.3);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(-btnW / 2 + 5, -btnH / 2 + 5, btnW - 10, btnH - 10);
  ctx.stroke();

  ctx.fillStyle = p.accentLight;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(btnText, 0, 3);

  ctx.restore();

  if (scene.ctaUrl) {
    ctx.font = `italic 400 28px 'Georgia', serif`;
    ctx.fillStyle = hexToRgba(p.cream, 0.5 * urlProgress);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(cleanText(scene.ctaUrl), centerX, buttonY + 95);
  }
}

/* ═══════════════════════════════════════════════════════
   VISUAL SCENE — Full image with elegant overlay
═══════════════════════════════════════════════════════ */

function drawLuxuryVisual(ctx, opts) {
  const { scene, localTime, width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const titleProgress = interpolate(localTime, [0.7, 1.6], [0, 1], { extrapolate: "clamp" });
  const titleEased = 1 - Math.pow(1 - titleProgress, 3);
  const subtitleProgress = interpolate(localTime, [1.2, 2.0], [0, 1], { extrapolate: "clamp" });

  const centerX = width / 2;
  const titleY = height * 0.75;
  const maxWidth = width * 0.9;

  const overlay = ctx.createLinearGradient(0, height * 0.5, 0, height);
  overlay.addColorStop(0, "rgba(0,0,0,0)");
  overlay.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = overlay;
  ctx.fillRect(0, height * 0.5, width, height * 0.5);

  const lineProgress = interpolate(localTime, [0.5, 1.2], [0, 1], { extrapolate: "clamp" });
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 35 * lineProgress, titleY - 40);
  ctx.lineTo(centerX + 35 * lineProgress, titleY - 40);
  ctx.stroke();

  ctx.font = `400 64px 'Georgia', serif`;
  ctx.fillStyle = hexToRgba(p.cream, titleEased);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const titleLines = wrapText(ctx, cleanText(scene.title || ""), maxWidth);
  const lineHeight = 64 * 1.2;
  const yStart = titleY + (1 - titleEased) * 20;

  titleLines.forEach((line, i) => {
    ctx.fillText(line, centerX, yStart + i * lineHeight);
  });

  if (scene.subtitle) {
    ctx.font = `italic 400 28px 'Georgia', serif`;
    ctx.fillStyle = hexToRgba(p.cream, 0.7 * subtitleProgress);
    const subY = yStart + titleLines.length * lineHeight + 25;
    ctx.fillText(cleanText(scene.subtitle), centerX, subY);
  }
}

/* ═══════════════════════════════════════════════════════
   IMAGE RENDERER (Luxury version)
═══════════════════════════════════════════════════════ */

function drawLuxuryImage(ctx, opts) {
  const { scene, contentStyle, localTime, width, height } = opts;
  if (!scene.imageUrl) return;

  const img = getCachedImage(scene.imageUrl);
  if (!img) return;

  const progress = interpolate(localTime, [0.1, 0.8], [0, 1], { extrapolate: "clamp" });
  const eased = 1 - Math.pow(1 - progress, 3);
  if (eased <= 0) return;

  if (scene.type === "visual") {
    drawFullImage(ctx, img, opts, eased);
    return;
  }

  if (contentStyle === "images-only") {
    drawFullImage(ctx, img, opts, eased);
  } else if (contentStyle === "image-text") {
    drawFramedImage(ctx, img, opts, eased);
  }
}

function drawFullImage(ctx, img, opts, progress) {
  const { width, height, globalTime, scene, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const imgAspect = img.width / img.height;
  const canvasAspect = width / height;
  const aspectDiffPct = Math.abs(imgAspect - canvasAspect) / canvasAspect;
  const shouldContain = aspectDiffPct > 0.15;

  ctx.save();
  ctx.globalAlpha = progress;

  if (shouldContain) {
    const bgScale = Math.max(width / img.width, height / img.height) * 1.2;
    const bgW = img.width * bgScale;
    const bgH = img.height * bgScale;
    ctx.filter = "blur(60px) brightness(0.2)";
    ctx.drawImage(img, (width - bgW) / 2, (height - bgH) / 2, bgW, bgH);
    ctx.filter = "none";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, width, height);

    const kb = 1 + globalTime * 0.005;
    const scale = Math.min(width / img.width, height / img.height) * 0.85 * kb;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const drawX = (width - drawW) / 2;
    const drawY = scene?.type === "visual"
      ? (height * 0.42 - drawH / 2)
      : (height - drawH) / 2;

    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX - 12, drawY - 12, drawW + 24, drawH + 24);
    ctx.strokeStyle = hexToRgba(p.accent, 0.3);
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX - 20, drawY - 20, drawW + 40, drawH + 40);

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  } else {
    const kb = 1 + globalTime * 0.008;
    const scale = Math.max(width / img.width, height / img.height) * kb;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    ctx.drawImage(img, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

    ctx.fillStyle = scene?.type === "visual" ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

function drawFramedImage(ctx, img, opts, progress) {
  const { width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);

  const maxW = width * 0.8;
  const maxH = height * 0.42;
  const imgAspect = img.width / img.height;

  let cardW, cardH;
  if (imgAspect > maxW / maxH) {
    cardW = maxW;
    cardH = maxW / imgAspect;
  } else {
    cardH = maxH;
    cardW = maxH * imgAspect;
  }

  const cx = width / 2;
  const cardY = height * 0.55;

  const scale = interpolate(progress, [0, 1], [0.95, 1]);
  const offsetY = (1 - progress) * 25;

  ctx.save();
  ctx.translate(cx, cardY + offsetY);
  ctx.scale(scale, scale);
  ctx.globalAlpha = progress;

  const drawX = -cardW / 2;
  const drawY = 0;

  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(drawX - 12, drawY - 12, cardW + 24, cardH + 24);
  ctx.strokeStyle = hexToRgba(p.accent, 0.3);
  ctx.lineWidth = 1;
  ctx.strokeRect(drawX - 20, drawY - 20, cardW + 40, cardH + 40);

  ctx.drawImage(img, drawX, drawY, cardW, cardH);

  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   LOGO + WATERMARK
═══════════════════════════════════════════════════════ */

function drawLuxuryLogo(ctx, opts) {
  const { logoUrl, brandColor } = opts;
  if (!logoUrl) return;
  const img = getCachedImage(logoUrl);
  if (!img) return;

  const p = buildLuxuryPalette(brandColor);

  const boxSize = 90;
  const boxX = 50;
  const boxY = 130;
  const padding = 10;

  ctx.save();

  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(boxX, boxY, boxSize, boxSize);
  ctx.strokeStyle = hexToRgba(p.accent, 0.3);
  ctx.strokeRect(boxX - 6, boxY - 6, boxSize + 12, boxSize + 12);

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

  ctx.drawImage(img, boxX + (boxSize - drawW) / 2, boxY + (boxSize - drawH) / 2, drawW, drawH);
  ctx.restore();
}

function drawLuxuryWatermark(ctx, opts) {
  const { width, height, brandColor } = opts;
  const p = buildLuxuryPalette(brandColor);
  const text = "fancydigitals.com.ng";

  ctx.save();
  ctx.font = `italic 400 22px 'Georgia', serif`;
  ctx.fillStyle = hexToRgba(p.accentLight, 0.6);
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(text, width - 50, height - 50);
  ctx.restore();
}

/* ═══════════════════════════════════════════════════════
   SCENE TEXT DISPATCHER
═══════════════════════════════════════════════════════ */

function drawLuxurySceneText(ctx, opts) {
  const { scene, contentStyle } = opts;
  if (contentStyle === "images-only") return;

  if (scene.type === "step") drawLuxuryStep(ctx, opts);
  else if (scene.type === "cta") drawLuxuryCta(ctx, opts);
  else if (scene.type === "visual") drawLuxuryVisual(ctx, opts);
  else drawLuxuryHeadline(ctx, opts);
}

/* ═══════════════════════════════════════════════════════
   MASTER RENDERER — LUXURY
═══════════════════════════════════════════════════════ */

export function renderLuxuryScene(ctx, opts) {
  drawLuxuryBackground(ctx, opts);
  drawGoldParticles(ctx, opts);
  drawOrnaments(ctx, opts);
  drawLuxuryImage(ctx, opts);
  drawLuxurySceneText(ctx, opts);
  drawLuxuryLogo(ctx, opts);
  if (opts.showWatermark) drawLuxuryWatermark(ctx, opts);
}