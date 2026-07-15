"use client";

import { useRef, useState } from "react";

/**
 * Renders a YouTube-style thumbnail: AI background + HTML text overlay.
 * Can export to PNG via canvas on demand.
 */
export default function ThumbnailPreview({ item, index }) {
  const containerRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const { backgroundUrl, spec, error } = item;

  if (error || !backgroundUrl) {
    return (
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center text-xs text-gray-500 p-4 text-center">
        Failed: {error || "no background"}
      </div>
    );
  }

  const textPosition = spec.textOverlay?.textPosition || (spec.personPosition === "left" ? "right" : "left");
  const mainText = spec.textOverlay?.mainText || "";
  const highlightWord = spec.textOverlay?.highlightWord || "";
  const subText = spec.textOverlay?.subText || "";
  const textColor = spec.textOverlay?.textColor || "white";
  const accentColor = spec.textOverlay?.accentColor || "#FFD700";

  // Split main text and wrap highlight word
  const words = mainText.split(/\s+/);
  const renderedText = words.map((w, i) => {
    const isHighlight =
      highlightWord && w.toLowerCase().replace(/[^\w]/g, "") === highlightWord.toLowerCase().replace(/[^\w]/g, "");
    return (
      <span
        key={i}
        style={{
          color: isHighlight ? accentColor : textColor,
          display: "inline-block",
          marginRight: "0.15em",
        }}
      >
        {w}
      </span>
    );
  });

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await composeToPng({
        backgroundUrl,
        spec,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thumbnail-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + err.message);
    } finally {
      setDownloading(false);
    }
  };

  const textShadow = "3px 3px 0 rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.6)";
  const textStroke = textColor === "black"
    ? "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff"
    : "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000";

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
      {/* Live preview */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Background image */}
        <img
          src={backgroundUrl}
          alt=""
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Optional gradient scrim on text side for legibility */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [textPosition]: 0,
            width: "55%",
            background: `linear-gradient(${textPosition === "left" ? "to right" : "to left"}, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 60%, transparent)`,
          }}
        />

        {/* Text overlay */}
<div
  style={{
    position: "absolute",
    top: 0,
    bottom: 0,
    [textPosition]: "3%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: textPosition === "left" ? "flex-start" : "flex-end",
    textAlign: textPosition === "left" ? "left" : "right",
    padding: "3%",
    containerType: "inline-size",
  }}
>
  {subText && (
    <div
      style={{
        display: "inline-block",
        fontFamily: `"Anton", "Impact", "Bebas Neue", sans-serif`,
        fontSize: "min(3.5cqw, 34px)",
        fontWeight: 900,
        color: "#000",
        background: "#FFFFFF",
        padding: "0.25em 0.6em",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        marginBottom: "0.5em",
        lineHeight: 1,
        borderRadius: "4px",
        transform: "rotate(-1.5deg)",
        boxShadow: "6px 6px 0 rgba(0,0,0,0.9)",
      }}
    >
      {subText}
    </div>
  )}

  <div
    style={{
      fontFamily: `"Anton", "Impact", "Bebas Neue", sans-serif`,
      fontSize: "min(12cqw, 118px)",
      fontWeight: 900,
      lineHeight: 0.9,
      textTransform: "uppercase",
      letterSpacing: "-0.015em",
      textShadow: `
        4px 4px 0 rgba(0,0,0,1),
        6px 6px 0 rgba(0,0,0,0.85),
        8px 10px 20px rgba(0,0,0,0.7),
        0 0 30px rgba(0,0,0,0.5)
      `,
      WebkitTextStroke: "3px black",
    }}
  >
    {words.map((w, i) => {
      const isHighlight =
        highlightWord &&
        w.toLowerCase().replace(/[^\w]/g, "") ===
          highlightWord.toLowerCase().replace(/[^\w]/g, "");

      if (isHighlight) {
        // Highlight word: bright color + optional colored box behind
        return (
          <span
            key={i}
            style={{
              color: accentColor,
              display: "inline-block",
              marginRight: "0.15em",
              transform: "scale(1.05)",
              WebkitTextStroke: "3px black",
              filter: `drop-shadow(0 0 8px ${accentColor}88)`,
            }}
          >
            {w}
          </span>
        );
      }

      return (
        <span
          key={i}
          style={{
            color: textColor,
            display: "inline-block",
            marginRight: "0.15em",
          }}
        >
          {w}
        </span>
      );
    })}
  </div>
</div>
      </div>

      {/* Info + download */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="text-xs font-bold text-gray-900 mb-1">
          Option {index + 1}
        </div>
        <div className="text-xs text-gray-600 mb-3 line-clamp-2">
          {spec.concept}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <span
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ background: spec.primaryColor }}
              title={spec.primaryColor}
            />
            <span
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ background: spec.secondaryColor }}
              title={spec.secondaryColor}
            />
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
          >
            {downloading ? "Rendering…" : "Download PNG →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Canvas compositor — merges bg + text into single PNG at 1280x720
// ============================================
async function composeToPng({ backgroundUrl, spec }) {
  const W = 1280;
  const H = 720;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Load bg
  const img = await loadImage(backgroundUrl);

  // Cover-fit
  const imgAspect = img.width / img.height;
  const canvasAspect = W / H;
  let sx, sy, sw, sh;
  if (imgAspect > canvasAspect) {
    sh = img.height;
    sw = sh * canvasAspect;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / canvasAspect;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

  const textPosition =
    spec.textOverlay?.textPosition ||
    (spec.personPosition === "left" ? "right" : "left");
  const mainText = (spec.textOverlay?.mainText || "").toUpperCase();
  const highlightWord = (spec.textOverlay?.highlightWord || "")
    .toLowerCase()
    .replace(/[^\w]/g, "");
  const subText = (spec.textOverlay?.subText || "").toUpperCase();
  const textColor = spec.textOverlay?.textColor || "#FFFFFF";
  const accentColor = spec.textOverlay?.accentColor || "#FFD700";

  // Darker, stronger scrim on text side
  const gradient = ctx.createLinearGradient(
    textPosition === "left" ? 0 : W,
    0,
    textPosition === "left" ? W * 0.55 : W * 0.45,
    0
  );
  gradient.addColorStop(0, "rgba(0,0,0,0.7)");
  gradient.addColorStop(0.5, "rgba(0,0,0,0.25)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  if (textPosition === "left") {
    ctx.fillRect(0, 0, W * 0.55, H);
  } else {
    ctx.fillRect(W * 0.45, 0, W * 0.55, H);
  }

  const textAreaX = textPosition === "left" ? W * 0.03 : W * 0.5;
  const textAreaW = W * 0.47;
  const centerY = H / 2;
  const anchorX = textPosition === "left" ? textAreaX : textAreaX + textAreaW;

  ctx.textBaseline = "middle";

  // ==== SUBTEXT — rendered as white pill with rotation ====
  if (subText) {
    const subSize = 34;
    ctx.font = `900 ${subSize}px "Anton", "Impact", "Bebas Neue", sans-serif`;
    const subW = ctx.measureText(subText).width;
    const padX = 22;
    const padY = 10;
    const boxW = subW + padX * 2;
    const boxH = subSize + padY * 2;

    ctx.save();
    const boxX = textPosition === "left" ? textAreaX : anchorX - boxW;
    const boxY = centerY - 200;

    ctx.translate(boxX + boxW / 2, boxY + boxH / 2);
    ctx.rotate((-1.5 * Math.PI) / 180);
    ctx.translate(-(boxX + boxW / 2), -(boxY + boxH / 2));

    // Drop shadow
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(boxX + 6, boxY + 6, boxW, boxH);

    // White pill
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(boxX, boxY, boxW, boxH);

    // Text
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText(subText, boxX + padX, boxY + boxH / 2);
    ctx.restore();
  }

  // ==== MAIN TEXT — huge, stroked, shadowed ====
  const words = mainText.split(/\s+/);
  const fontSize = words.length <= 3 ? 128 : 100;
  ctx.font = `900 ${fontSize}px "Anton", "Impact", "Bebas Neue", sans-serif`;

  const lines = wrapText(ctx, words, textAreaW);
  const lineHeight = fontSize * 0.92;
  const totalH = lines.length * lineHeight;
  const startY = centerY - totalH / 2 + lineHeight / 2 + (subText ? 30 : 0);

  lines.forEach((lineWords, lineIdx) => {
    const y = startY + lineIdx * lineHeight;

    const spaceW = ctx.measureText(" ").width;
    const wordWidths = lineWords.map((w) => ctx.measureText(w).width);
    const lineW =
      wordWidths.reduce((a, b) => a + b, 0) + spaceW * (lineWords.length - 1);

    let x = textPosition === "left" ? anchorX : anchorX - lineW;

    lineWords.forEach((word, i) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      const isHighlight = highlightWord && cleanWord === highlightWord;
      const color = isHighlight ? accentColor : textColor;

      // Multi-layer shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.95)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetX = 6;
      ctx.shadowOffsetY = 8;

      ctx.textAlign = "left";
      ctx.lineWidth = 14;
      ctx.strokeStyle = "#000";
      ctx.strokeText(word, x, y);

      ctx.shadowColor = "transparent";
      ctx.fillStyle = color;
      ctx.fillText(word, x, y);

      // Extra glow for highlight
      if (isHighlight) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 30;
        ctx.fillText(word, x, y);
      }
      ctx.restore();

      x += wordWidths[i] + spaceW;
    });
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/png",
      0.95
    );
  });
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = url;
  });
}

function wrapText(ctx, words, maxWidth) {
  const lines = [];
  let current = [];

  for (const word of words) {
    const testLine = [...current, word].join(" ");
    const w = ctx.measureText(testLine).width;
    if (w > maxWidth && current.length > 0) {
      lines.push(current);
      current = [word];
    } else {
      current.push(word);
    }
  }
  if (current.length) lines.push(current);
  return lines;
}