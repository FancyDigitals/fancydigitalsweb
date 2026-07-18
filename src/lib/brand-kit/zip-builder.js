import JSZip from "jszip";

// ─────────────────────────────────────────────
// HELPER: Convert base64 data URL to Blob
// ─────────────────────────────────────────────
function dataURLtoBlob(dataURL) {
  if (!dataURL || typeof dataURL !== "string") return null;
  const parts = dataURL.split(",");
  if (parts.length !== 2) return null;
  const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

function dataURLtoUint8Array(dataURL) {
  if (!dataURL || typeof dataURL !== "string") return null;
  const parts = dataURL.split(",");
  if (parts.length !== 2) return null;
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array;
}

// ─────────────────────────────────────────────
// HELPER: Convert SVG string to Blob
// ─────────────────────────────────────────────
function svgToBlob(svgString) {
  return new Blob([svgString], { type: "image/svg+xml" });
}

// ─────────────────────────────────────────────
// LOGO SVG GENERATORS
// ─────────────────────────────────────────────
function generateWordmarkLogo(name, color, font = "Inter", bg = "transparent") {
  const safeName = (name || "Brand").trim();
  const fontSize = safeName.length > 12 ? 48 : 72;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <rect width="800" height="200" fill="${bg}"/>
  <text x="400" y="120" text-anchor="middle" font-family="${font}, sans-serif" font-size="${fontSize}" font-weight="800" fill="${color}" letter-spacing="-2">${safeName}</text>
</svg>`;
}

function generateIconLogo(name, primaryColor, secondaryColor, font = "Inter", bg = "transparent") {
  const initials = (name || "Brand")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="${bg}"/>
  <rect x="20" y="20" width="160" height="160" rx="40" fill="${primaryColor}"/>
  <text x="100" y="128" text-anchor="middle" font-family="${font}, sans-serif" font-size="90" font-weight="900" fill="${secondaryColor}">${initials}</text>
</svg>`;
}

function generateCombinationLogo(name, primaryColor, secondaryColor, font = "Inter", bg = "transparent") {
  const initials = (name || "Brand")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
  const safeName = (name || "Brand").trim();
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" width="600" height="200">
  <rect width="600" height="200" fill="${bg}"/>
  <rect x="20" y="40" width="120" height="120" rx="24" fill="${primaryColor}"/>
  <text x="80" y="128" text-anchor="middle" font-family="${font}, sans-serif" font-size="72" font-weight="900" fill="${secondaryColor}">${initials}</text>
  <text x="170" y="120" font-family="${font}, sans-serif" font-size="48" font-weight="800" fill="${primaryColor}" letter-spacing="-1">${safeName}</text>
</svg>`;
}

// ─────────────────────────────────────────────
// COLOR PALETTE SVG
// ─────────────────────────────────────────────
function generatePaletteSVG(colors) {
  const items = colors.map((c, i) => {
    const x = i * 200;
    return `
      <g transform="translate(${x}, 0)">
        <rect width="200" height="240" fill="${c.hex}"/>
        <rect y="240" width="200" height="60" fill="#111827"/>
        <text x="100" y="270" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="white">${c.name}</text>
        <text x="100" y="290" text-anchor="middle" font-family="'Courier New', monospace" font-size="12" fill="white" opacity="0.7">${c.hex}</text>
      </g>
    `;
  }).join("");
  const width = colors.length * 200;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 300" width="${width}" height="300">
  ${items}
</svg>`;
}

// ─────────────────────────────────────────────
// CSS / SCSS / TAILWIND EXPORTS
// ─────────────────────────────────────────────
function generateCSS(colors, typography) {
  const colorVars = colors
    .map((c) => `  --color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`)
    .join("\n");
  const headingFont = typography?.heading?.family || "Inter";
  const bodyFont = typography?.body?.family || "Inter";
  const monoFont = typography?.mono?.family || "JetBrains Mono";

  return `/* Brand Colors + Typography */
:root {
${colorVars}
  --font-heading: "${headingFont}", sans-serif;
  --font-body: "${bodyFont}", sans-serif;
  --font-mono: "${monoFont}", monospace;
}

body {
  font-family: var(--font-body);
  color: var(--color-neutral-dark, #111827);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 800;
}
`;
}

function generateSCSS(colors, typography) {
  const colorVars = colors
    .map((c) => `$color-${c.name.toLowerCase().replace(/\s+/g, "-")}: ${c.hex};`)
    .join("\n");
  return `// Brand Colors
${colorVars}

// Typography
$font-heading: "${typography?.heading?.family || "Inter"}", sans-serif;
$font-body: "${typography?.body?.family || "Inter"}", sans-serif;
$font-mono: "${typography?.mono?.family || "JetBrains Mono"}", monospace;
`;
}

function generateTailwindConfig(colors, typography) {
  const colorObj = {};
  colors.forEach((c) => {
    colorObj[c.name.toLowerCase().replace(/\s+/g, "-")] = c.hex;
  });
  return `// tailwind.config.js — Brand Extension
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 8).replace(/"/g, "'")},
      fontFamily: {
        heading: ["${typography?.heading?.family || "Inter"}", "sans-serif"],
        body: ["${typography?.body?.family || "Inter"}", "sans-serif"],
        mono: ["${typography?.mono?.family || "JetBrains Mono"}", "monospace"],
      },
    },
  },
};
`;
}

function generateColorTokensJSON(colors, typography) {
  return JSON.stringify(
    {
      colors: colors.reduce((acc, c) => {
        acc[c.name.toLowerCase().replace(/\s+/g, "-")] = {
          value: c.hex,
          rgb: c.rgb,
          hsl: c.hsl,
          usage: c.usage,
        };
        return acc;
      }, {}),
      typography: {
        heading: typography?.heading || {},
        body: typography?.body || {},
        mono: typography?.mono || {},
      },
    },
    null,
    2
  );
}

// ─────────────────────────────────────────────
// TYPOGRAPHY GUIDE HTML
// ─────────────────────────────────────────────
function generateTypographyGuide(typography, businessName) {
  const heading = typography?.heading?.family || "Inter";
  const body = typography?.body?.family || "Inter";
  const mono = typography?.mono?.family || "JetBrains Mono";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${businessName} — Typography Guide</title>
<link href="https://fonts.googleapis.com/css2?family=${heading.replace(/\s+/g, "+")}:wght@400;600;800;900&family=${body.replace(/\s+/g, "+")}:wght@400;500;600;700&family=${mono.replace(/\s+/g, "+")}:wght@400;500&display=swap" rel="stylesheet">
<style>
  body { font-family: "${body}", sans-serif; padding: 60px 40px; max-width: 900px; margin: 0 auto; color: #111; line-height: 1.6; }
  h1, h2, h3, h4 { font-family: "${heading}", sans-serif; font-weight: 800; letter-spacing: -0.02em; }
  h1 { font-size: 64px; margin-bottom: 8px; }
  h2 { font-size: 40px; margin-top: 60px; }
  h3 { font-size: 28px; margin-top: 40px; }
  code, pre { font-family: "${mono}", monospace; background: #f5f5f5; padding: 12px; border-radius: 8px; display: block; margin: 12px 0; }
  .spec { color: #666; font-size: 14px; margin-bottom: 20px; }
  .sample { border-left: 3px solid #075a01; padding-left: 20px; margin: 20px 0; }
  hr { border: none; border-top: 1px solid #e5e5e5; margin: 40px 0; }
</style>
</head>
<body>
  <h1>${businessName}</h1>
  <p class="spec">Typography System</p>
  <hr>

  <h2>Heading Font — ${heading}</h2>
  <p class="spec">Use for all headings, titles, and display text</p>
  <div class="sample">
    <h1 style="font-size: 72px;">Heading One</h1>
    <h2 style="font-size: 48px;">Heading Two</h2>
    <h3 style="font-size: 32px;">Heading Three</h3>
    <h4 style="font-size: 24px;">Heading Four</h4>
  </div>

  <h2>Body Font — ${body}</h2>
  <p class="spec">Use for paragraphs, UI text, and general content</p>
  <div class="sample">
    <p style="font-size: 20px;">Large body text — 20px. Used for lead paragraphs, subheadings, and emphasis.</p>
    <p style="font-size: 16px;">Regular body text — 16px. The default reading size for most content.</p>
    <p style="font-size: 14px;">Small text — 14px. Used for captions, metadata, and secondary info.</p>
  </div>

  <h2>Mono Font — ${mono}</h2>
  <p class="spec">Use for code, technical specs, and data displays</p>
  <code>const brand = { primary: "#075a01" };</code>

  <h2>Google Fonts Import</h2>
  <pre>@import url('https://fonts.googleapis.com/css2?family=${heading.replace(/\s+/g, "+")}:wght@400;600;800;900&family=${body.replace(/\s+/g, "+")}:wght@400;500;600;700&family=${mono.replace(/\s+/g, "+")}:wght@400;500&display=swap');</pre>
</body>
</html>`;
}

// ─────────────────────────────────────────────
// BUSINESS CARD SVG
// ─────────────────────────────────────────────
function generateBusinessCardFront(businessName, tagline, primaryColor, secondaryColor, font = "Inter") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="1050" height="600">
  <rect width="1050" height="600" fill="${primaryColor}"/>
  <rect x="60" y="60" width="80" height="80" rx="16" fill="${secondaryColor}"/>
  <text x="100" y="120" text-anchor="middle" font-family="${font}, sans-serif" font-size="48" font-weight="900" fill="${primaryColor}">${(businessName[0] || "B").toUpperCase()}</text>
  <text x="60" y="500" font-family="${font}, sans-serif" font-size="56" font-weight="800" fill="${secondaryColor}" letter-spacing="-1">${businessName}</text>
  <text x="60" y="540" font-family="${font}, sans-serif" font-size="20" font-weight="400" fill="${secondaryColor}" opacity="0.85">${tagline || ""}</text>
</svg>`;
}

function generateBusinessCardBack(businessName, primaryColor, secondaryColor, font = "Inter") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600" width="1050" height="600">
  <rect width="1050" height="600" fill="${secondaryColor}"/>
  <text x="525" y="270" text-anchor="middle" font-family="${font}, sans-serif" font-size="72" font-weight="900" fill="${primaryColor}" letter-spacing="-2">${businessName}</text>
  <line x1="425" y1="310" x2="625" y2="310" stroke="${primaryColor}" stroke-width="3"/>
  <text x="525" y="360" text-anchor="middle" font-family="${font}, sans-serif" font-size="18" font-weight="500" fill="${primaryColor}" opacity="0.7">yourwebsite.com</text>
</svg>`;
}

// ─────────────────────────────────────────────
// LETTERHEAD SVG
// ─────────────────────────────────────────────
function generateLetterhead(businessName, primaryColor, font = "Inter") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2480 3508" width="2480" height="3508">
  <rect width="2480" height="3508" fill="white"/>
  <rect y="0" width="2480" height="16" fill="${primaryColor}"/>
  <text x="200" y="180" font-family="${font}, sans-serif" font-size="56" font-weight="900" fill="${primaryColor}" letter-spacing="-2">${businessName}</text>
  <line x1="200" y1="220" x2="2280" y2="220" stroke="${primaryColor}" stroke-width="2" opacity="0.3"/>
  <rect x="0" y="3400" width="2480" height="108" fill="${primaryColor}"/>
  <text x="1240" y="3465" text-anchor="middle" font-family="${font}, sans-serif" font-size="24" fill="white" opacity="0.9">${businessName} · yourwebsite.com</text>
</svg>`;
}

// ─────────────────────────────────────────────
// SOCIAL COVERS
// ─────────────────────────────────────────────
function generateSocialCover(businessName, tagline, primaryColor, secondaryColor, dimensions, font = "Inter") {
  const [w, h] = dimensions;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${secondaryColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#grad)"/>
  <text x="${w / 2}" y="${h / 2 - 20}" text-anchor="middle" font-family="${font}, sans-serif" font-size="${Math.floor(h / 6)}" font-weight="900" fill="white" letter-spacing="-2">${businessName}</text>
  <text x="${w / 2}" y="${h / 2 + 40}" text-anchor="middle" font-family="${font}, sans-serif" font-size="${Math.floor(h / 15)}" fill="white" opacity="0.85">${tagline || ""}</text>
</svg>`;
}

// ─────────────────────────────────────────────
// EMAIL SIGNATURE HTML
// ─────────────────────────────────────────────
function generateEmailSignature(businessName, tagline, primaryColor, font = "Inter") {
  return `<table cellpadding="0" cellspacing="0" style="font-family: ${font}, sans-serif; color: #111; font-size: 14px;">
  <tr>
    <td style="padding-right: 20px; border-right: 3px solid ${primaryColor};">
      <div style="width: 60px; height: 60px; background: ${primaryColor}; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-size: 32px; font-weight: 900;">${(businessName[0] || "B").toUpperCase()}</span>
      </div>
    </td>
    <td style="padding-left: 20px;">
      <div style="font-size: 18px; font-weight: 800; color: #111; margin-bottom: 4px;">Your Name</div>
      <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Your Role · ${businessName}</div>
      <div style="font-size: 12px; color: #999;">${tagline || ""}</div>
      <div style="font-size: 12px; margin-top: 8px;">
        <a href="#" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">yourwebsite.com</a>
      </div>
    </td>
  </tr>
</table>`;
}

// ─────────────────────────────────────────────
// BRAND GUIDELINES HTML
// ─────────────────────────────────────────────
function generateBrandGuidelines(kit, businessName) {
  const colors = kit.colors || [];
  const typography = kit.typography || {};
  const primary = colors[0]?.hex || "#075a01";

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${businessName} — Brand Guidelines</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, sans-serif; color: #111; line-height: 1.6; background: #fff; }
  .page { max-width: 900px; margin: 0 auto; padding: 80px 40px; }
  h1 { font-size: 72px; font-weight: 900; letter-spacing: -3px; margin-bottom: 20px; color: ${primary}; }
  h2 { font-size: 36px; font-weight: 800; margin-top: 60px; margin-bottom: 16px; letter-spacing: -1px; }
  h3 { font-size: 24px; font-weight: 700; margin-top: 32px; margin-bottom: 12px; }
  p { margin-bottom: 12px; color: #333; }
  .hero { padding: 80px 0; border-bottom: 4px solid ${primary}; margin-bottom: 40px; }
  .tagline { font-size: 24px; color: #666; font-weight: 400; }
  .section { margin: 60px 0; }
  .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; }
  .color-card { border: 1px solid #eee; border-radius: 12px; overflow: hidden; }
  .color-swatch { height: 120px; }
  .color-info { padding: 16px; }
  .color-name { font-weight: 800; font-size: 14px; margin-bottom: 4px; }
  .color-hex { font-family: 'Courier New', monospace; font-size: 12px; color: #666; }
  .color-usage { font-size: 11px; color: #999; margin-top: 6px; }
  .voice-do, .voice-dont { padding: 20px; border-radius: 12px; margin-top: 12px; }
  .voice-do { background: #ecfdf5; border-left: 4px solid #10b981; }
  .voice-dont { background: #fef2f2; border-left: 4px solid #ef4444; }
  ul { padding-left: 24px; margin: 12px 0; }
  li { margin-bottom: 6px; }
  .divider { height: 2px; background: linear-gradient(to right, ${primary}, transparent); margin: 60px 0 40px; }
  @media print { .page { padding: 20px; } h1 { font-size: 48px; } }
</style>
</head>
<body>
<div class="page">
  <div class="hero">
    <h1>${businessName}</h1>
    <p class="tagline">${kit.tagline || "Brand Guidelines"}</p>
  </div>

  <div class="section">
    <h2>01. Brand Story</h2>
    <p>${kit.brand_story || ""}</p>
  </div>

  ${kit.mission ? `<div class="section"><h3>Mission</h3><p>${kit.mission}</p></div>` : ""}
  ${kit.vision ? `<div class="section"><h3>Vision</h3><p>${kit.vision}</p></div>` : ""}
  ${kit.values && kit.values.length ? `<div class="section"><h3>Values</h3><ul>${kit.values.map((v) => `<li><strong>${v.title || v}:</strong> ${v.description || ""}</li>`).join("")}</ul></div>` : ""}

  <div class="divider"></div>

  <div class="section">
    <h2>02. Color Palette</h2>
    <div class="color-grid">
      ${colors
        .map(
          (c) => `
        <div class="color-card">
          <div class="color-swatch" style="background: ${c.hex};"></div>
          <div class="color-info">
            <div class="color-name">${c.name}</div>
            <div class="color-hex">${c.hex}</div>
            <div class="color-usage">${c.usage || ""}</div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  </div>

  <div class="divider"></div>

  <div class="section">
    <h2>03. Typography</h2>
    <h3>Heading — ${typography?.heading?.family || "Inter"}</h3>
    <p>${typography?.heading?.usage || "Used for all headings and display text."}</p>
    <h3>Body — ${typography?.body?.family || "Inter"}</h3>
    <p>${typography?.body?.usage || "Used for paragraphs and UI text."}</p>
  </div>

  <div class="divider"></div>

  <div class="section">
    <h2>04. Brand Voice</h2>
    <p>${kit.brand_voice?.description || ""}</p>
    ${kit.brand_voice?.dos ? `<div class="voice-do"><strong>Do:</strong><ul>${kit.brand_voice.dos.map((d) => `<li>${d}</li>`).join("")}</ul></div>` : ""}
    ${kit.brand_voice?.donts ? `<div class="voice-dont"><strong>Don't:</strong><ul>${kit.brand_voice.donts.map((d) => `<li>${d}</li>`).join("")}</ul></div>` : ""}
  </div>

  ${
    kit.taglines && kit.taglines.length
      ? `
  <div class="divider"></div>
  <div class="section">
    <h2>05. Tagline Variations</h2>
    <ul>${kit.taglines.map((t) => `<li>${t}</li>`).join("")}</ul>
  </div>`
      : ""
  }

  ${
    kit.social_bios
      ? `
  <div class="divider"></div>
  <div class="section">
    <h2>06. Social Media Bios</h2>
    ${Object.entries(kit.social_bios).map(([platform, bio]) => `<h3>${platform}</h3><p>${bio}</p>`).join("")}
  </div>`
      : ""
  }

</div>
</body>
</html>`;
}

// ─────────────────────────────────────────────
// README
// ─────────────────────────────────────────────
function generateReadme(businessName) {
  return `# ${businessName} — Brand Kit

Generated with Fancy Digitals AI Brand Kit Generator.

## What's Inside

### 📁 01-Logo/
Logo files in SVG and PNG formats. Use SVG for scalable web/print. Use PNG for social media, presentations, or where SVG isn't supported.

- \`logo-primary.svg\` — Main logo with brand colors
- \`logo-white.svg\` — For use on dark backgrounds
- \`logo-dark.svg\` — For use on light backgrounds
- \`logo-icon-only.svg\` — Icon/mark for social avatars

### 📁 02-Colors/
Complete color system in every format your team needs.

- \`palette.svg\` — Visual reference swatches
- \`colors.css\` — CSS custom properties
- \`colors.scss\` — Sass variables
- \`tailwind.config.js\` — Tailwind theme extension
- \`colors.json\` — Design tokens for tools like Figma

### 📁 03-Typography/
Complete typography system with Google Fonts.

- \`typography-guide.html\` — Open in browser to view spec sheet
- \`google-fonts-import.txt\` — Copy-paste import URL

### 📁 04-Templates/
Ready-to-use branded assets.

- Business cards (front + back)
- Email signature
- Letterhead
- Social media covers (LinkedIn, Twitter, Facebook)

### 📁 05-Brand-Guidelines/
- \`brand-guidelines.html\` — Full brand book (open in browser, print to PDF)
- Individual text files for story, voice, and bios

---

## How to Use

**Designers:** Open SVG files in Figma, Illustrator, or Sketch. All shapes are editable.

**Developers:** Copy colors.css, tailwind.config.js, or colors.json into your project.

**Marketers:** Use social covers and email signature directly.

**Print:** Business cards and letterhead are print-ready at 300 DPI equivalent (SVG scales infinitely).

---

Generated by [Fancy Digitals](https://fancydigitals.com.ng) — the AI business platform.
`;
}

// ─────────────────────────────────────────────
// MAIN — BUILD THE ZIP
// ─────────────────────────────────────────────
export async function buildBrandKitZip(kitData) {
  const zip = new JSZip();
  const businessName = kitData.business_name || "Brand";
  const tagline = kitData.tagline || "";
  const colors = kitData.colors || [];
  const typography = kitData.typography || {};

  const primaryColor = colors[0]?.hex || "#075a01";
  const secondaryColor = colors[1]?.hex || "#ffffff";
  const darkColor = colors.find((c) => c.name?.toLowerCase().includes("dark"))?.hex || "#111827";
  const lightColor = colors.find((c) => c.name?.toLowerCase().includes("light"))?.hex || "#ffffff";
  const headingFont = typography?.heading?.family || "Inter";

    // ── 01 Logo ──
  const logoFolder = zip.folder("01-Logo");

  // Add AI-generated real image logos (PNG)
  if (kitData.logo_images && Array.isArray(kitData.logo_images)) {
    kitData.logo_images.forEach((dataURL, i) => {
      const bytes = dataURLtoUint8Array(dataURL);
      if (bytes) {
        logoFolder.file(`logo-ai-generated-${i + 1}.png`, bytes);
      }
    });
  }

  // Add editable SVG logos (always included)
  logoFolder.file("logo-combination.svg", generateCombinationLogo(businessName, primaryColor, lightColor, headingFont));
  logoFolder.file("logo-wordmark.svg", generateWordmarkLogo(businessName, primaryColor, headingFont));
  logoFolder.file("logo-icon-only.svg", generateIconLogo(businessName, primaryColor, lightColor, headingFont));
  logoFolder.file("logo-white.svg", generateCombinationLogo(businessName, "#ffffff", primaryColor, headingFont, darkColor));
  logoFolder.file("logo-dark.svg", generateCombinationLogo(businessName, darkColor, lightColor, headingFont, "#ffffff"));

  // ── 02 Colors ──
  const colorsFolder = zip.folder("02-Colors");
  colorsFolder.file("palette.svg", generatePaletteSVG(colors));
  colorsFolder.file("colors.css", generateCSS(colors, typography));
  colorsFolder.file("colors.scss", generateSCSS(colors, typography));
  colorsFolder.file("tailwind.config.js", generateTailwindConfig(colors, typography));
  colorsFolder.file("colors.json", generateColorTokensJSON(colors, typography));

  // ── 03 Typography ──
  const typoFolder = zip.folder("03-Typography");
  typoFolder.file("typography-guide.html", generateTypographyGuide(typography, businessName));
  typoFolder.file(
    "google-fonts-import.txt",
    `Copy this into your HTML <head>:\n\n<link href="https://fonts.googleapis.com/css2?family=${headingFont.replace(/\s+/g, "+")}:wght@400;600;800;900&family=${(typography?.body?.family || "Inter").replace(/\s+/g, "+")}:wght@400;500;600;700&display=swap" rel="stylesheet">\n\nOr in your CSS:\n\n@import url('https://fonts.googleapis.com/css2?family=${headingFont.replace(/\s+/g, "+")}:wght@400;600;800;900&family=${(typography?.body?.family || "Inter").replace(/\s+/g, "+")}:wght@400;500;600;700&display=swap');`
  );

  // ── 04 Templates ──
  const templatesFolder = zip.folder("04-Templates");
  templatesFolder.file("business-card-front.svg", generateBusinessCardFront(businessName, tagline, primaryColor, lightColor, headingFont));
  templatesFolder.file("business-card-back.svg", generateBusinessCardBack(businessName, primaryColor, lightColor, headingFont));
  templatesFolder.file("letterhead.svg", generateLetterhead(businessName, primaryColor, headingFont));
  templatesFolder.file("social-cover-linkedin.svg", generateSocialCover(businessName, tagline, primaryColor, secondaryColor, [1584, 396], headingFont));
  templatesFolder.file("social-cover-twitter.svg", generateSocialCover(businessName, tagline, primaryColor, secondaryColor, [1500, 500], headingFont));
  templatesFolder.file("social-cover-facebook.svg", generateSocialCover(businessName, tagline, primaryColor, secondaryColor, [851, 315], headingFont));
  templatesFolder.file("email-signature.html", generateEmailSignature(businessName, tagline, primaryColor, headingFont));

  // ── 05 Brand Guidelines ──
  const guidelinesFolder = zip.folder("05-Brand-Guidelines");
  guidelinesFolder.file("brand-guidelines.html", generateBrandGuidelines(kitData, businessName));
  guidelinesFolder.file("brand-story.txt", kitData.brand_story || "");
  guidelinesFolder.file(
    "brand-voice.txt",
    `Brand Voice\n\n${kitData.brand_voice?.description || ""}\n\nDO:\n${(kitData.brand_voice?.dos || []).map((d) => `- ${d}`).join("\n")}\n\nDON'T:\n${(kitData.brand_voice?.donts || []).map((d) => `- ${d}`).join("\n")}`
  );
  if (kitData.social_bios) {
    const bios = Object.entries(kitData.social_bios)
      .map(([platform, bio]) => `${platform}:\n${bio}\n`)
      .join("\n");
    guidelinesFolder.file("social-bios.txt", bios);
  }
  if (kitData.taglines) {
    guidelinesFolder.file("taglines.txt", kitData.taglines.map((t, i) => `${i + 1}. ${t}`).join("\n"));
  }
  if (kitData.logo_prompts) {
    guidelinesFolder.file(
      "ai-logo-prompts.txt",
      `AI Image Prompts for Logo Generation\n\nPaste these into Midjourney, DALL-E, or Canva AI to generate image-based logos:\n\n${kitData.logo_prompts.map((p, i) => `PROMPT ${i + 1}:\n${p}\n`).join("\n")}`
    );
  }

  // ── README ──
  zip.file("README.md", generateReadme(businessName));

  // Generate ZIP as Blob
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

// ─────────────────────────────────────────────
// Trigger download from client
// ─────────────────────────────────────────────
export function downloadBrandKitZip(blob, businessName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(businessName || "brand").toLowerCase().replace(/\s+/g, "-")}-brand-kit.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}