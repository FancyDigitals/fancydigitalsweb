"use client";

import { useState, useCallback, useMemo, useRef } from "react";

/* ============================================
   CONSTANTS
============================================ */

const TITLE_MAX = 60;
const TITLE_MIN = 30;
const DESC_MAX = 160;
const DESC_MIN = 70;
const TABS = ["Google", "Twitter / X", "Facebook"];

const POWER_WORDS = [
  "best","free","top","easy","fast","proven","simple","complete","ultimate",
  "expert","official","trusted","guaranteed","instant","now","new","get",
  "learn","discover","build","grow","boost","improve","save","essential",
  "exclusive","powerful","effective","premium","guide","step","how","why",
  "secret","hack","pro",
];

const ACTION_WORDS = [
  "get","learn","discover","build","find","start","try","use","see",
  "download","read","explore","create","join","compare","check","browse",
  "shop","buy","sign","watch","book","claim","grab",
];

const STOP_WORDS = [
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","could","should","may","might","shall",
  "can","it","its","this","that","these","those",
];

/* ============================================
   ICONS
============================================ */

function IconPen({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function IconEye({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconChart({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconCode({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function IconSearch({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconTag({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}

function IconLink({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.757 8.25" />
    </svg>
  );
}

function IconCopy({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function IconDownload({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function IconRefresh({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  );
}

function IconChevron({ className = "h-4 w-4", up = false }) {
  return (
    <svg className={`${className} transition-transform ${up ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function IconCheck({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconX({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconAlert({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function IconInfo({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function IconGlobe({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconImage({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function IconBolt({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconMobile({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function IconDesktop({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}

/* ============================================
   SCORING ENGINE
============================================ */

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasDuplicateWords(text) {
  const words = text.toLowerCase().split(/\s+/).filter((w) => !STOP_WORDS.includes(w));
  const seen = new Set();
  const dupes = [];
  words.forEach((w) => { if (seen.has(w) && w.length > 3) dupes.push(w); seen.add(w); });
  return [...new Set(dupes)];
}

function hasAllCaps(text) {
  return text.split(/\s+/).some((w) => w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w));
}

function hasSpecialChars(text) { return /[{}[\]<>\\^~`]/.test(text); }
function startsWithNumber(text) { return /^\d/.test(text.trim()); }
function hasYear(text) {
  const y = new Date().getFullYear();
  return (
    text.includes(String(y)) ||
    text.includes(String(y + 1)) ||
    /\b\d{4}\b/.test(text)
  );
}

function estimatePixelWidth(text) {
  const wideChars = /[WMQODBGHUNR@%]/g;
  const narrowChars = /[fijlrt1!|();.,: ]/g;
  const wideCount = (text.match(wideChars) || []).length;
  const narrowCount = (text.match(narrowChars) || []).length;
  const normalCount = text.length - wideCount - narrowCount;
  return wideCount * 12 + narrowCount * 5.5 + normalCount * 8.5;
}

const TITLE_PIXEL_MAX = 580;

function runChecks(title, desc, keyword, url, siteName) {
  const checks = [];
  let score = 0;
  let maxScore = 0;

  const tt = title.trim();
  const dt = desc.trim();
  const kw = keyword.trim().toLowerCase();
  const tl = tt.length;
  const dl = dt.length;

  function addCheck(check) { checks.push(check); }
  function pass(points, check) { score += points; maxScore += points; addCheck({ ...check, type: "pass" }); }
  function fail(check) { maxScore += check.points || 0; addCheck({ ...check }); }

  /* ============ TITLE ============ */

  if (tl === 0) {
    fail({ id: "title-missing", type: "error", points: 20, label: "Title is missing", detail: "Every page needs a title. Google uses it as the headline in search results.", fix: `Write a clear title between ${TITLE_MIN}–${TITLE_MAX} characters.` });
  } else {

    // Length by character
    if (tl < TITLE_MIN) {
      fail({ id: "title-length", type: "warning", points: 20, label: `Title too short (${tl} chars)`, detail: `Aim for ${TITLE_MIN}–${TITLE_MAX} characters.`, fix: "Add your brand name, location, or a key benefit." });
    } else if (tl > TITLE_MAX) {
      fail({ id: "title-length", type: "error", points: 20, label: `Title too long (${tl} chars)`, detail: `Google cuts at ~${TITLE_MAX} chars. "${tt.slice(TITLE_MAX)}" will be hidden.`, fix: "Remove filler words. Keep the essential message within 60 characters." });
    } else {
      pass(20, { id: "title-length", label: `Title length perfect (${tl} chars)`, detail: `Between ${TITLE_MIN}–${TITLE_MAX} — ideal for Google.` });
    }

    // Pixel width
    const px = estimatePixelWidth(tt);
    if (px > TITLE_PIXEL_MAX) {
      fail({ id: "title-pixel", type: "warning", points: 5, label: `Title may be cut by pixel width (~${Math.round(px)}px)`, detail: `Google truncates at ~${TITLE_PIXEL_MAX}px wide. Wide letters like W, M, D make titles appear longer even under 60 chars.`, fix: "Replace wide letters with shorter synonyms or restructure the title." });
    } else {
      pass(5, { id: "title-pixel", label: `Title pixel width is safe (~${Math.round(px)}px)`, detail: `Under ${TITLE_PIXEL_MAX}px — Google will show the full title.` });
    }

    // Keyword in title
    if (kw.length > 0) {
      const kwWords = kw.split(/\s+/).filter((w) => w.length > 1);
      const titleLower = tt.toLowerCase();
      const matched = kwWords.filter((w) => titleLower.includes(w));
      const ratio = matched.length / kwWords.length;
      const kwInTitle = ratio >= 0.75;

      if (!kwInTitle) {
        const missing = kwWords.filter((w) => !titleLower.includes(w));
        fail({ id: "kw-title", type: "error", points: 15, label: "Keyword missing from title", detail: `Missing: "${missing.join(", ")}"`, fix: `Add "${keyword}" to your title, ideally within the first few words.` });
      } else {
        pass(10, { id: "kw-title", label: "Keyword found in title", detail: `${Math.round(ratio * 100)}% of keyword words matched.` });
        const pos = tt.toLowerCase().split(/\s+/).findIndex((w) => w.includes(kwWords[0]));
        if (pos <= 2) {
          pass(5, { id: "kw-title-pos", label: "Keyword appears early in title", detail: "Keywords at the start receive more weight." });
        } else {
          fail({ id: "kw-title-pos", type: "warning", points: 5, label: "Keyword is late in title", detail: `Keyword starts at word ${pos + 1}.`, fix: "Move keyword within the first 3 words." });
        }
      }
    } else {
      maxScore += 15;
    }

    // Power word
    const fp = POWER_WORDS.filter((w) => tt.toLowerCase().includes(w));
    if (fp.length > 0) {
      pass(4, { id: "power-word", label: `Power word: "${fp[0]}"`, detail: "Power words increase click-through rates." });
    } else {
      fail({ id: "power-word", type: "warning", points: 4, label: "No power word in title", detail: "Titles with power words get more clicks.", fix: `Try: ${POWER_WORDS.slice(0, 8).join(", ")}` });
    }

    // Number or year
    if (startsWithNumber(tt) || hasYear(tt)) {
      pass(3, { id: "title-number", label: "Title has a number or year", detail: "Numbered titles have higher CTR." });
    } else {
      fail({ id: "title-number", type: "info", points: 3, label: "No number or year in title", detail: "Titles with numbers (e.g. '7 Best...' or '2025 Guide') get more clicks.", fix: "Consider adding a number, year, or statistic." });
    }

    // Separator
    const hasSeparator = /[\|\—\-–]/.test(tt);
    if (hasSeparator) {
      pass(3, { id: "title-separator", label: "Title has a separator", detail: "Separators like | or — cleanly divide topic from brand name." });
    } else {
      fail({ id: "title-separator", type: "info", points: 3, label: "No separator in title", detail: "A separator like | or — between your topic and brand makes titles cleaner.", fix: `Try: "${tt} | ${siteName || "Your Brand"}"` });
    }

    // Question title for voice search
    const isQuestion = /^(who|what|where|when|why|how|is|are|can|does|do|should|will)\b/i.test(tt);
    if (isQuestion) {
      pass(3, { id: "title-question", label: "Title is a question", detail: "Question titles rank well for voice search and featured snippets." });
    }

    // All caps
    if (hasAllCaps(tt)) {
      fail({ id: "title-caps", type: "warning", points: 0, label: "Title has ALL CAPS words", detail: "Looks spammy. Google may rewrite it.", fix: "Use Title Case or sentence case." });
    }

    // Special chars
    if (hasSpecialChars(tt)) {
      fail({ id: "title-special", type: "warning", points: 0, label: "Unusual special characters in title", detail: "May cause display issues.", fix: "Use pipes (|) or dashes (—) as separators only." });
    }

    // Duplicate words
    const td = hasDuplicateWords(tt);
    if (td.length > 0) {
      fail({ id: "title-dupes", type: "warning", points: 0, label: `Repeated word: "${td[0]}"`, detail: "Keyword stuffing triggers Google filters.", fix: "Use a synonym instead." });
    }

    // Brand
    if (siteName.trim() && tt.toLowerCase().includes(siteName.trim().toLowerCase())) {
      pass(2, { id: "title-brand", label: "Brand name in title", detail: "Builds recognition in search results." });
    } else if (siteName.trim()) {
      fail({ id: "title-brand", type: "info", points: 2, label: "Brand name not in title", detail: "Adding your brand improves recognition.", fix: `Add "| ${siteName}" at the end of your title.` });
    }

    // Word count
    const wc = countWords(tt);
    if (wc < 3) {
      fail({ id: "title-words", type: "warning", points: 0, label: `Only ${wc} word${wc === 1 ? "" : "s"} in title`, detail: "Short titles miss ranking opportunities.", fix: "Expand to 6–10 words." });
    }
  }

  /* ============ DESCRIPTION ============ */

  if (dl === 0) {
    fail({ id: "desc-missing", type: "error", points: 20, label: "Description is missing", detail: "Google will pull random text from your page instead.", fix: `Write ${DESC_MIN}–${DESC_MAX} characters.` });
  } else {

    // Length
    if (dl < DESC_MIN) {
      fail({ id: "desc-length", type: "warning", points: 20, label: `Description too short (${dl} chars)`, detail: `Aim for ${DESC_MIN}–${DESC_MAX}.`, fix: "Add benefits, outcomes, or a CTA." });
    } else if (dl > DESC_MAX) {
      fail({ id: "desc-length", type: "error", points: 20, label: `Description too long (${dl} chars)`, detail: `Google cuts at ~${DESC_MAX} chars. "${dt.slice(DESC_MAX, DESC_MAX + 20)}..." will be cut.`, fix: "Trim to the strongest message." });
    } else {
      pass(20, { id: "desc-length", label: `Description length perfect (${dl} chars)`, detail: `Between ${DESC_MIN}–${DESC_MAX} — ideal.` });
    }

    // Keyword in desc
    if (kw.length > 0) {
      const kwWords = kw.split(/\s+/).filter((w) => w.length > 1);
      const descLower = dt.toLowerCase();
      const matched = kwWords.filter((w) => descLower.includes(w));
      const ratio = matched.length / kwWords.length;
      const kwInDesc = ratio >= 0.75;

      if (!kwInDesc) {
        const missing = kwWords.filter((w) => !descLower.includes(w));
        fail({ id: "kw-desc", type: "error", points: 10, label: "Keyword missing from description", detail: `Missing: "${missing.join(", ")}". Google bolds matching terms.`, fix: `Include "${keyword}" naturally in your description.` });
      } else {
        pass(10, { id: "kw-desc", label: "Keyword found in description", detail: "Google bolds matching keywords — improves visibility." });
      }
    } else {
      maxScore += 10;
    }

    // Action word
    const fa = ACTION_WORDS.filter((w) => dt.toLowerCase().includes(w));
    if (fa.length > 0) {
      pass(4, { id: "action-word", label: `Action word: "${fa[0]}"`, detail: "Action words improve clicks." });
    } else {
      fail({ id: "action-word", type: "warning", points: 4, label: "No action word in description", detail: "Descriptions feel passive without action words.", fix: `Try: ${ACTION_WORDS.slice(0, 8).join(", ")}` });
    }

    // Question in description
    const hasQuestion = dt.includes("?");
    if (hasQuestion) {
      pass(3, { id: "desc-question", label: "Description contains a question", detail: "Questions increase curiosity and click-through rates." });
    } else {
      fail({ id: "desc-question", type: "info", points: 3, label: "No question in description", detail: "Descriptions with questions feel more engaging.", fix: `Try starting with: "Looking for ${keyword || "a solution"}?"` });
    }

    // Ending punctuation
    if (dt.endsWith(".") || dt.endsWith("!") || dt.endsWith("→")) {
      pass(2, { id: "desc-end", label: "Description ends cleanly", detail: "Proper punctuation looks professional." });
    } else {
      fail({ id: "desc-end", type: "warning", points: 2, label: "No ending punctuation", detail: "Descriptions that trail off look cut-off.", fix: "End with a period, exclamation mark, or CTA." });
    }

    // Sentences
    const sents = dt.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    if (sents.length >= 2) {
      pass(2, { id: "desc-sents", label: `${sents.length} sentences`, detail: "Multiple sentences are more readable and informative." });
    } else {
      fail({ id: "desc-sents", type: "info", points: 2, label: "Only 1 sentence", detail: "Two sentences allow you to state the benefit and add a CTA.", fix: "Add a second sentence with a call to action." });
    }

    // Duplicate words
    const dd = hasDuplicateWords(dt);
    if (dd.length > 0) {
      fail({ id: "desc-dupes", type: "warning", points: 0, label: `Repeated word: "${dd[0]}"`, fix: "Use synonyms." });
    }

    // All caps
    if (hasAllCaps(dt)) {
      fail({ id: "desc-caps", type: "warning", points: 0, label: "ALL CAPS in description", fix: "Use normal capitalization." });
    }
  }

  /* ============ URL ============ */

  if (url.trim() && kw.length > 0) {
    const kwInUrl = kw.split(/\s+/).some((w) => url.toLowerCase().includes(w));
    if (kwInUrl) {
      pass(4, { id: "kw-url", label: "Keyword in URL", detail: "Keyword-rich URLs are a positive ranking signal." });
    } else {
      fail({ id: "kw-url", type: "warning", points: 4, label: "Keyword not in URL", detail: "URLs with keywords rank slightly better.", fix: `Try: /${kw.replace(/\s+/g, "-")}` });
    }
  }

  if (url.trim().length > 75) {
    fail({ id: "url-long", type: "warning", points: 0, label: "URL is very long", detail: "Short URLs perform better.", fix: "Keep under 75 characters." });
  }

  /* ============ GENERAL ============ */

  if (kw.length === 0 && (tl > 0 || dl > 0)) {
    fail({ id: "kw-empty", type: "warning", points: 0, label: "No target keyword set", detail: "Without a keyword, many checks are skipped.", fix: "Enter your primary keyword to unlock all checks." });
  }

  // Title-desc uniqueness
  if (tl > 10 && dl > 10) {
    if (dt.toLowerCase().startsWith(tt.toLowerCase().slice(0, 20))) {
      fail({ id: "similarity", type: "warning", points: 0, label: "Title and description start the same", detail: "You waste the chance to convey extra information.", fix: "Start your description with a different angle." });
    } else {
      pass(2, { id: "similarity", label: "Title and description are unique from each other", detail: "Each one adds different value." });
    }
  }

  checks.push({
    id: "unique",
    type: "info",
    label: "Ensure uniqueness across all pages",
    detail: "Duplicate meta tags confuse search engines and dilute rankings.",
  });

  // Calculate final score as percentage of maxScore
  const finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return { score: Math.min(finalScore, 100), checks };
}

/* ============================================
   SUB COMPONENTS
============================================ */

function Bar({ length, max, min }) {
  const pct = Math.min((length / max) * 100, 100);
  const color = length === 0 ? "bg-gray-200" : length < min ? "bg-yellow-400" : length <= max ? "bg-[#075a01]" : "bg-red-500";
  return (
    <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
      <div className={`h-1.5 rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StatusLabel({ length, max, min }) {
  if (length === 0) return null;
  if (length < min) return <p className="mt-1 text-xs text-yellow-600">Too short — aim for {min}+ characters</p>;
  if (length > max) return <p className="mt-1 text-xs text-red-500">Over limit — cut at {max} characters</p>;
  return <p className="mt-1 text-xs font-medium text-[#075a01] flex items-center gap-1"><IconCheck className="h-3 w-3" /> Perfect length</p>;
}

function CheckItem({ check, expanded, onToggle }) {
  const s = {
    pass: { dot: "bg-green-500", bg: "bg-green-50", border: "border-green-100", text: "text-green-700", Icon: IconCheck },
    warning: { dot: "bg-yellow-400", bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-700", Icon: IconAlert },
    error: { dot: "bg-red-500", bg: "bg-red-50", border: "border-red-100", text: "text-red-600", Icon: IconX },
    info: { dot: "bg-blue-400", bg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", Icon: IconInfo },
  }[check.type];

  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} overflow-hidden transition-all`}>
      <button onClick={onToggle} className="flex w-full items-start gap-2.5 p-3 text-left">
        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${s.dot} text-white`}>
          <s.Icon className="h-3 w-3" />
        </span>
        <span className={`flex-1 text-xs sm:text-sm font-semibold leading-snug ${s.text}`}>{check.label}</span>
        {(check.detail || check.fix) && <IconChevron className="h-4 w-4 shrink-0 text-gray-400" up={expanded} />}
      </button>
      {expanded && (check.detail || check.fix) && (
        <div className="border-t border-current/5 px-3 pb-3 pt-2.5 space-y-2">
          {check.detail && <p className="text-xs leading-relaxed text-gray-600">{check.detail}</p>}
          {check.fix && (
            <div className="rounded-lg bg-white/80 p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1"><IconBolt className="h-3 w-3" /> How to fix</p>
              <p className="text-xs leading-relaxed text-gray-700">{check.fix}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreRing({ score }) {
  const r = 32, circ = 2 * Math.PI * r, offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#075a01" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Needs Work" : "Poor";
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#f3f4f6" strokeWidth="7" />
          <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="7" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">{score}</span>
          <span className="text-[10px] text-gray-400">/100</span>
        </div>
      </div>
      <span className="mt-1.5 text-xs sm:text-sm font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
============================================ */

export default function SEOMetaGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("Google");
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState("");
  const [expandedCheck, setExpandedCheck] = useState(null);
  const [showAllChecks, setShowAllChecks] = useState(false);
  const [activeSection, setActiveSection] = useState("editor");

  const { score, checks } = useMemo(() => runChecks(title, desc, keyword, url, siteName), [title, desc, keyword, url, siteName]);
  const errors = checks.filter((c) => c.type === "error").length;
  const warnings = checks.filter((c) => c.type === "warning").length;
  const passes = checks.filter((c) => c.type === "pass").length;
  const sorted = useMemo(() => {
    const o = { error: 0, warning: 1, info: 2, pass: 3 };
    return [...checks].sort((a, b) => o[a.type] - o[b.type]);
  }, [checks]);
  const visible = showAllChecks ? sorted : sorted.slice(0, 5);

  const handleCopy = useCallback((type) => {
    let text = "";
    if (type === "html") {
      text = `<!-- Primary Meta Tags -->\n<title>${title}</title>\n<meta name="description" content="${desc}" />\n\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${url}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:site_name" content="${siteName}" />\n\n<!-- Twitter -->\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:url" content="${url}" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${desc}" />`;
    }
    if (type === "title") text = title;
    if (type === "desc") text = desc;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setCopiedType(type); setTimeout(() => { setCopied(false); setCopiedType(""); }, 2500); });
  }, [title, desc, url, siteName]);

  function handleDownload() {
    const c = `SEO Meta Tags — Fancy Digitals\n${"=".repeat(40)}\nKeyword: ${keyword || "(not set)"}\nURL: ${url || "(not set)"}\nSite: ${siteName || "(not set)"}\nScore: ${score}/100\n\nTitle (${title.length} chars):\n${title || "(empty)"}\n\nDescription (${desc.length} chars):\n${desc || "(empty)"}\n\n${"—".repeat(40)}\n\n<title>${title}</title>\n<meta name="description" content="${desc}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="${url}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:site_name" content="${siteName}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${desc}" />\n\nGenerated at fancydigitals.com.ng/tools/seo-meta-tag-generator`;
    const b = new Blob([c], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `seo-meta-${Date.now()}.txt`; a.click(); URL.revokeObjectURL(a.href);
  }

  function reset() { setTitle(""); setDesc(""); setKeyword(""); setUrl(""); setSiteName(""); setExpandedCheck(null); }

  const dt = title || "Your Page Title";
  const dd = desc || "Your meta description will appear here. Write something compelling that makes people want to click.";
  const du = url || "https://yoursite.com";

  const SECTIONS = [
    { id: "editor", label: "Editor", Icon: IconPen },
    { id: "preview", label: "Preview", Icon: IconEye },
    { id: "analysis", label: "Analysis", Icon: IconChart },
    { id: "code", label: "Code", Icon: IconCode },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* SCORE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <ScoreRing score={score} />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">SEO Score</h3>
            <div className="flex flex-wrap gap-1.5">
              {errors > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-red-600"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />{errors} error{errors !== 1 && "s"}</span>}
              {warnings > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-yellow-600"><span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />{warnings} warning{warnings !== 1 && "s"}</span>}
              {passes > 0 && <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-green-700"><span className="h-1.5 w-1.5 rounded-full bg-green-500" />{passes} passed</span>}
            </div>
            <p className="mt-1.5 text-[10px] sm:text-xs text-gray-400">Fix errors to improve score</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownload} disabled={!title && !desc} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-gray-400 hover:text-[#075a01] transition disabled:opacity-30">
            <IconDownload className="h-3.5 w-3.5" /> Download
          </button>
          <button onClick={reset} className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-gray-400 hover:text-gray-700 transition">
            <IconRefresh className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* MOBILE TABS */}
      <div className="flex xl:hidden border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
        {SECTIONS.map((sec) => (
          <button key={sec.id} onClick={() => setActiveSection(sec.id)}
            className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 transition ${activeSection === sec.id ? "bg-[#075a01] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
            <sec.Icon className="h-4 w-4" />
            <span className="text-[10px] font-bold">{sec.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1fr_400px]">

        {/* LEFT */}
        <div className={`space-y-4 ${activeSection !== "editor" && activeSection !== "analysis" ? "hidden xl:block" : ""}`}>

          <div className={`space-y-4 ${activeSection === "analysis" ? "hidden xl:block" : ""}`}>

            {/* Keyword */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <label className="mb-1 flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900">
                <IconSearch className="h-4 w-4 text-gray-400" /> Target Keyword
              </label>
              <p className="mb-3 text-[10px] sm:text-xs text-gray-400">The main keyword this page should rank for</p>
              <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. digital agency lagos"
                className="w-full rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
              {keyword.trim().length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    {
  ok: (() => {
    const kww = keyword.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 1);
    const matched = kww.filter((w) => title.toLowerCase().includes(w));
    return kww.length > 0 && matched.length / kww.length >= 0.75;
  })(),
  label: "In title"
},
{
  ok: (() => {
    const kww = keyword.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 1);
    const matched = kww.filter((w) => desc.toLowerCase().includes(w));
    return kww.length > 0 && matched.length / kww.length >= 0.75;
  })(),
  label: "In description"
},
{
  ok: keyword.toLowerCase().trim().split(/\s+/).some((w) => url.toLowerCase().includes(w)),
  label: "In URL"
},
                  ].map((k) => (
                    <span key={k.label} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold ${k.ok ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600"}`}>
                      {k.ok ? <IconCheck className="h-3 w-3" /> : <IconX className="h-3 w-3" />} {k.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900"><IconTag className="h-4 w-4 text-gray-400" /> Page Title</label>
                <span className={`text-[10px] sm:text-xs font-bold ${title.length > TITLE_MAX ? "text-red-500" : "text-gray-400"}`}>{title.length} / {TITLE_MAX}</span>
              </div>
              <div className="relative">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Best Digital Agency in Lagos | Fancy Digitals"
                  className="w-full rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                {title.length > 0 && <button onClick={() => handleCopy("title")} title="Copy" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#075a01]"><IconCopy className="h-4 w-4" /></button>}
              </div>
              <Bar length={title.length} max={TITLE_MAX} min={TITLE_MIN} />
              <StatusLabel length={title.length} max={TITLE_MAX} min={TITLE_MIN} />
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-1.5 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900"><IconPen className="h-4 w-4 text-gray-400" /> Meta Description</label>
                <span className={`text-[10px] sm:text-xs font-bold ${desc.length > DESC_MAX ? "text-red-500" : "text-gray-400"}`}>{desc.length} / {DESC_MAX}</span>
              </div>
              <div className="relative">
                <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe your page clearly. Include your keyword naturally."
                  className="w-full resize-none rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                {desc.length > 0 && <button onClick={() => handleCopy("desc")} title="Copy" className="absolute right-3 top-3 text-gray-300 hover:text-[#075a01]"><IconCopy className="h-4 w-4" /></button>}
              </div>
              <Bar length={desc.length} max={DESC_MAX} min={DESC_MIN} />
              <StatusLabel length={desc.length} max={DESC_MAX} min={DESC_MIN} />
            </div>

            {/* URL + Site */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900"><IconLink className="h-4 w-4 text-gray-400" /> Page Details</h3>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Page URL</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yoursite.com/page"
                  className="w-full rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Site Name</label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Your Site Name"
                  className="w-full rounded-xl border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className={`${activeSection === "editor" ? "hidden xl:block" : ""}`}>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900"><IconChart className="h-4 w-4 text-gray-400" /> SEO Analysis</h3>
                <span className="text-[10px] sm:text-xs text-gray-400">{checks.length} checks</span>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {visible.map((c) => <CheckItem key={c.id} check={c} expanded={expandedCheck === c.id} onToggle={() => setExpandedCheck(expandedCheck === c.id ? null : c.id)} />)}
              </div>
              {sorted.length > 5 && <button onClick={() => setShowAllChecks(!showAllChecks)} className="mt-3 w-full text-center text-xs font-semibold text-[#075a01] hover:underline">{showAllChecks ? "Show less" : `Show all ${sorted.length} checks`}</button>}
            </div>

            <div className="mt-4 rounded-2xl border border-[#075a01]/10 bg-[#075a01]/5 p-4 sm:p-5">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#075a01]"><IconBolt className="h-3.5 w-3.5" /> Pro Tips</p>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
                {["Put keyword in first 3 words of title", "Write descriptions that answer what users get", "Use action words — Learn, Discover, Get, Build", "End descriptions with a period or CTA", "Numbers and years increase click-through rate", "Write for humans first, search engines second"].map((t) => (
                  <li key={t} className="flex gap-2"><IconCheck className="h-3 w-3 shrink-0 text-[#075a01] mt-0.5" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={`space-y-4 ${activeSection !== "preview" && activeSection !== "code" ? "hidden xl:block" : ""}`}>

          {/* Previews */}
          <div className={`${activeSection === "code" ? "hidden xl:block" : ""}`}>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {TABS.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-[10px] sm:text-xs font-bold transition ${activeTab === tab ? "border-b-2 border-[#075a01] text-[#075a01]" : "text-gray-400 hover:text-gray-700"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-4 sm:p-5">
                {activeTab === "Google" && (
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400"><IconDesktop className="h-3.5 w-3.5" /> Desktop</p>
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-4 w-4 rounded-full bg-gray-200 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-700 truncate">{siteName || "Your Site"}</p>
                            <cite className="text-[10px] sm:text-xs not-italic text-gray-400 truncate block">{du.replace("https://", "").slice(0, 40)}</cite>
                          </div>
                        </div>
                        <h3 className={`text-base sm:text-lg leading-snug text-[#1a0dab] cursor-pointer break-words ${!title ? "opacity-40" : ""}`}>{title.length > TITLE_MAX ? title.slice(0, TITLE_MAX) + "..." : dt}</h3>
                        <p className={`mt-1 text-xs sm:text-sm leading-relaxed text-[#4d5156] break-words ${!desc ? "opacity-40" : ""}`}>{desc.length > DESC_MAX ? desc.slice(0, DESC_MAX) + "..." : dd}</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400"><IconMobile className="h-3.5 w-3.5" /> Mobile</p>
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 max-w-[280px]">
                        <cite className="text-[10px] not-italic text-gray-400 truncate block">{du.replace("https://", "").slice(0, 30)}</cite>
                        <h3 className={`mt-1 text-sm leading-snug text-[#1a0dab] break-words ${!title ? "opacity-40" : ""}`}>{title.length > 50 ? title.slice(0, 50) + "..." : dt}</h3>
                        <p className={`mt-1 text-[11px] leading-relaxed text-[#4d5156] line-clamp-2 ${!desc ? "opacity-40" : ""}`}>{dd}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Twitter / X" && (
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Twitter / X Card</p>
                    <div className="overflow-hidden rounded-2xl border border-gray-200">
                      <div className="h-28 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><IconImage className="h-8 w-8 text-gray-300" /></div>
                      <div className="bg-white p-3 sm:p-4">
                        <p className="text-[10px] sm:text-xs text-gray-400 truncate">{du.replace("https://", "").split("/")[0]}</p>
                        <h3 className={`mt-1 text-xs sm:text-sm font-bold text-gray-900 leading-snug break-words ${!title ? "opacity-40" : ""}`}>{title.length > 70 ? title.slice(0, 70) + "..." : dt}</h3>
                        <p className={`mt-1 text-[10px] sm:text-xs text-gray-500 line-clamp-2 ${!desc ? "opacity-40" : ""}`}>{dd}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Facebook" && (
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Facebook Link</p>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <div className="h-28 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><IconImage className="h-8 w-8 text-gray-300" /></div>
                      <div className="bg-[#f2f3f5] p-3">
                        <p className="text-[10px] uppercase text-gray-400 truncate">{du.replace("https://", "").split("/")[0]}</p>
                        <h3 className={`mt-1 text-xs sm:text-sm font-bold text-[#1c1e21] leading-snug break-words ${!title ? "opacity-40" : ""}`}>{title.length > 80 ? title.slice(0, 80) + "..." : dt}</h3>
                        <p className={`mt-1 text-[10px] sm:text-xs text-[#606770] line-clamp-1 ${!desc ? "opacity-40" : ""}`}>{dd}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* HTML */}
          <div className={`${activeSection === "preview" ? "hidden xl:block" : ""}`}>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-900"><IconCode className="h-4 w-4 text-gray-400" /> Generated HTML</h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">Ready to paste</span>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-gray-950 p-3 sm:p-4 text-[10px] sm:text-xs leading-relaxed text-green-400 whitespace-pre-wrap break-all">
                <code>{`<!-- Primary Meta Tags -->
<title>${title || "Your Title"}</title>
<meta name="description"
  content="${desc || "Your description"}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url"
  content="${url || "https://yoursite.com"}" />
<meta property="og:title"
  content="${title || "Your Title"}" />
<meta property="og:description"
  content="${desc || "Your description"}" />
<meta property="og:site_name"
  content="${siteName || "Your Site"}" />

<!-- Twitter -->
<meta name="twitter:card"
  content="summary_large_image" />
<meta name="twitter:title"
  content="${title || "Your Title"}" />
<meta name="twitter:description"
  content="${desc || "Your description"}" />`}</code>
              </pre>
              <div className="mt-3 space-y-2">
                <button onClick={() => handleCopy("html")} disabled={!title && !desc}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 sm:py-3.5 text-xs sm:text-sm font-bold transition-all duration-200 ${copied && copiedType === "html" ? "bg-green-500 text-white" : title || desc ? "bg-[#075a01] text-white hover:bg-black active:scale-[0.98]" : "cursor-not-allowed bg-gray-100 text-gray-400"}`}>
                  {copied && copiedType === "html" ? <><IconCheck className="h-4 w-4" /> Copied!</> : <><IconCopy className="h-4 w-4" /> Copy All HTML Tags</>}
                </button>
                <button onClick={handleDownload} disabled={!title && !desc}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
                  <IconDownload className="h-4 w-4" /> Download as .txt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}