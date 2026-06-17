"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

/* ============================================
   ICONS
============================================ */
function Icon({ d, className = "h-4 w-4", fill = false }) {
  return (
    <svg className={className} fill={fill ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={fill ? "none" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
const I = {
  text: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  mic: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z",
  search: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check: "M4.5 12.75l6 6 9-13.5",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  target: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
  x: "M6 18L18 6M6 6l12 12",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  save: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  scissors: "M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.044l-5.326-1.628a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664",
  compare: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  type: "M4 6h16M4 12h16M4 18h7",
  warn: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  clean: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  case: "M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 000-4.5H3.75a2.25 2.25 0 000 4.5zm0 0V10.5",
  diff: "M12 4.5v15m7.5-7.5h-15",
  list: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
};

/* ============================================
   CONSTANTS
============================================ */
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with","by",
  "is","are","was","were","be","been","being","have","has","had","do","does",
  "did","will","would","could","should","may","might","shall","can","it","its",
  "this","that","these","those","i","you","he","she","we","they","me","him",
  "her","us","them","my","your","his","our","their","what","which","who",
  "when","where","why","how","all","each","every","both","few","more","most",
  "other","some","such","no","not","only","same","so","than","too","very",
  "just","as","if","then","into","onto","upon","about","above","below",
  "between","through","during","before","after","up","down","out","off",
  "over","under","again","further",
]);

const ADVERBS = [
  "very","really","quite","rather","extremely","incredibly","absolutely",
  "completely","totally","utterly","highly","deeply","strongly","greatly",
  "basically","literally","actually","definitely","certainly","probably",
  "obviously","clearly","simply","just","merely","nearly","almost","always",
  "never","often","sometimes","usually","generally","typically","normally",
];

const WEAK_WORDS = [
  "thing","things","stuff","good","bad","nice","big","small","many","lot",
  "lots","get","got","make","made","said","went","came","put","set",
];

const PASSIVE_PATTERNS = [
  /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi,
  /\b(is|are|was|were|be|been|being)\s+\w+en\b/gi,
];

const READING_WPM = 238;
const SPEAKING_WPM = 130;

const PLATFORMS = [
  { name: "Twitter / X", limit: 280, color: "#000000" },
  { name: "LinkedIn Post", limit: 3000, color: "#0077b5" },
  { name: "Instagram Caption", limit: 2200, color: "#e1306c" },
  { name: "Facebook Post", limit: 63206, color: "#1877f2" },
  { name: "Meta Title", limit: 60, color: "#075a01" },
  { name: "Meta Description", limit: 160, color: "#ff914d" },
  { name: "YouTube Title", limit: 100, color: "#ff0000" },
  { name: "YouTube Description", limit: 5000, color: "#282828" },
  { name: "Pinterest Pin", limit: 500, color: "#e60023" },
  { name: "TikTok Caption", limit: 2200, color: "#010101" },
];

const CASE_MODES = ["Sentence case", "UPPERCASE", "lowercase", "Title Case", "aLtErNaTiNg"];

const AUTOSAVE_KEY = "fd_wordcounter_autosave";

/* ============================================
   ANALYSIS ENGINE
============================================ */
function countSyllables(word) {
  word = word.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? Math.max(1, m.length) : 1;
}

function analyze(text) {
  if (!text.trim()) return {
    words: 0, chars: 0, charsNoSpace: 0, sentences: 0,
    paragraphs: 0, lines: 0, readingTime: 0, speakingTime: 0,
    avgWordLength: 0, avgSentenceLength: 0, longestWord: "",
    shortestWord: "", uniqueWords: 0, topKeywords: [],
    readabilityScore: 0, readabilityLabel: "—", readabilityDetail: "",
    longSentences: [], passiveCount: 0, adverbsFound: [],
    weakWordsFound: [], sentenceList: [],
  };

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const lines = text.split(/\n/).length;
  const wordMatches = text.match(/\b\w+\b/g) || [];
  const words = wordMatches.length;
  const sentenceList = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  const sentences = sentenceList.length || 1;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;
  const readingTime = Math.max(1, Math.ceil(words / READING_WPM));
  const speakingTime = Math.max(1, Math.ceil(words / SPEAKING_WPM));

  const wordList = wordMatches.map((w) => w.toLowerCase());
  const sorted = [...wordMatches].sort((a, b) => a.length - b.length);
  const shortestWord = sorted[0] || "";
  const longestWord = sorted[sorted.length - 1] || "";
  const avgWordLength = words > 0
    ? Math.round(wordMatches.reduce((s, w) => s + w.length, 0) / words * 10) / 10 : 0;
  const avgSentenceLength = Math.round((words / sentences) * 10) / 10;
  const uniqueWords = new Set(wordList).size;

  const freq = {};
  wordList.forEach((w) => {
    if (w.length > 2 && !STOP_WORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
  });
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1]).slice(0, 12)
    .map(([word, count]) => ({
      word, count,
      density: words > 0 ? Math.round((count / words) * 1000) / 10 : 0,
    }));

  const totalSyllables = wordMatches.reduce((s, w) => s + countSyllables(w), 0);
  const avgSyllables = words > 0 ? totalSyllables / words : 0;
  const raw = sentences > 1
    ? Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * avgSyllables) : 0;
  const readabilityScore = Math.max(0, Math.min(100, raw));

  const readabilityMap = [
    [90, "Very Easy", "Readable by most people. Great for general audiences."],
    [80, "Easy", "Conversational. Ideal for blogs and social media."],
    [70, "Fairly Easy", "Easy to read. Good for most web content."],
    [60, "Standard", "Understood by most adults. Suitable for general content."],
    [50, "Fairly Difficult", "Best for educated adults. Consider simplifying."],
    [30, "Difficult", "Requires college education. Simplify for broader reach."],
    [0, "Very Difficult", "Academic level. Rewrite for general audiences."],
  ];
  const [, readabilityLabel, readabilityDetail] =
    readabilityMap.find(([min]) => readabilityScore >= min) || readabilityMap[readabilityMap.length - 1];

  const longSentences = sentenceList.filter((s) => {
    const wc = (s.match(/\b\w+\b/g) || []).length;
    return wc > 25;
  });

  let passiveCount = 0;
  PASSIVE_PATTERNS.forEach((p) => {
    const m = text.match(p);
    if (m) passiveCount += m.length;
  });

  const textLower = text.toLowerCase();
  const adverbsFound = ADVERBS.filter((a) => {
    const re = new RegExp(`\\b${a}\\b`, "gi");
    return re.test(text);
  });

  const weakWordsFound = WEAK_WORDS.filter((w) => {
    const re = new RegExp(`\\b${w}\\b`, "gi");
    return re.test(text);
  });

  return {
    words, chars, charsNoSpace, sentences, paragraphs, lines,
    readingTime, speakingTime, avgWordLength, avgSentenceLength,
    longestWord, shortestWord, uniqueWords, topKeywords,
    readabilityScore, readabilityLabel, readabilityDetail,
    longSentences, passiveCount, adverbsFound, weakWordsFound, sentenceList,
  };
}

function diffTexts(a, b) {
  const aWords = a.trim().split(/\s+/);
  const bWords = b.trim().split(/\s+/);
  const result = [];
  let i = 0, j = 0;
  while (i < aWords.length || j < bWords.length) {
    if (i >= aWords.length) { result.push({ word: bWords[j], type: "added" }); j++; }
    else if (j >= bWords.length) { result.push({ word: aWords[i], type: "removed" }); i++; }
    else if (aWords[i] === bWords[j]) { result.push({ word: aWords[i], type: "same" }); i++; j++; }
    else { result.push({ word: aWords[i], type: "removed" }); result.push({ word: bWords[j], type: "added" }); i++; j++; }
  }
  return result;
}

function convertCase(text, mode) {
  switch (mode) {
    case "UPPERCASE": return text.toUpperCase();
    case "lowercase": return text.toLowerCase();
    case "Title Case": return text.replace(/\b\w/g, (c) => c.toUpperCase());
    case "Sentence case": return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "aLtErNaTiNg": return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("");
    default: return text;
  }
}

function cleanText(text) {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/ +\n/g, "\n")
    .replace(/\n +/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/([.!?])\s*([A-Z])/g, "$1 $2")
    .replace(/,([^\s])/g, ", $1")
    .trim();
}

function summarize(text, sentences = 3) {
  const sents = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 20);
  if (sents.length <= sentences) return text;
  const wordMatches = text.match(/\b\w+\b/g) || [];
  const freq = {};
  wordMatches.forEach((w) => {
    const lw = w.toLowerCase();
    if (!STOP_WORDS.has(lw) && lw.length > 3) freq[lw] = (freq[lw] || 0) + 1;
  });
  const scored = sents.map((s) => {
    const sw = (s.match(/\b\w+\b/g) || []).map((w) => w.toLowerCase());
    const score = sw.reduce((sum, w) => sum + (freq[w] || 0), 0) / Math.max(sw.length, 1);
    return { s, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, sentences)
    .map((x) => x.s)
    .join(" ");
}

/* ============================================
   SUB COMPONENTS
============================================ */
function StatCard({ label, value, sub, iconPath, color = "#075a01" }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 truncate">{label}</p>
          <p className="mt-0.5 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tabular-nums">{value}</p>
          {sub && <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400 truncate">{sub}</p>}
        </div>
        <div className="ml-2 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}15` }}>
          <Icon d={iconPath} className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function TabBtn({ id, label, iconPath, active, onClick }) {
  return (
    <button onClick={() => onClick(id)}
      className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 transition ${active ? "bg-[#075a01] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
      <Icon d={iconPath} className="h-4 w-4" />
      <span className="text-[9px] sm:text-[10px] font-bold leading-none">{label}</span>
    </button>
  );
}

function ReadabilityBar({ score, label, detail }) {
  const color = score >= 70 ? "#075a01" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <Icon d={I.chart} className="h-4 w-4 text-gray-400" /> Readability
        </h3>
        <span className="text-xs font-bold" style={{ color }}>{score}/100</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-100">
        <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color }}>{label}</span>
        <span className="text-[10px] text-gray-400">Flesch Reading Ease</span>
      </div>
      {detail && <p className="mt-1.5 text-[11px] sm:text-xs text-gray-500 leading-relaxed">{detail}</p>}
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function WordCounter() {
  const [text, setText] = useState("");
  const [findWord, setFindWord] = useState("");
  const [replaceWord, setReplaceWord] = useState("");
  const [goalWords, setGoalWords] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [activeRight, setActiveRight] = useState("stats");
  const [copied, setCopied] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState("");
  const [caseMode, setCaseMode] = useState("Sentence case");
  const [diffA, setDiffA] = useState("");
  const [diffB, setDiffB] = useState("");
  const [summaryLen, setSummaryLen] = useState(3);
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightMode, setHighlightMode] = useState("long");
  const [autoSaveOn, setAutoSaveOn] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [notification, setNotification] = useState("");
  const textareaRef = useRef(null);

  // Auto-save
  useEffect(() => {
    if (!autoSaveOn) return;
    const saved = localStorage.getItem(AUTOSAVE_KEY);
    if (saved) {
      try {
        const { text: t, ts } = JSON.parse(saved);
        if (t) { setText(t); setLastSaved(ts); }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!autoSaveOn || !text) return;
    const timer = setTimeout(() => {
      const ts = new Date().toLocaleTimeString();
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ text, ts }));
      setLastSaved(ts);
    }, 1500);
    return () => clearTimeout(timer);
  }, [text, autoSaveOn]);

  function notify(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2500);
  }

  const stats = useMemo(() => analyze(text), [text]);
  const diffResult = useMemo(() => diffA && diffB ? diffTexts(diffA, diffB) : [], [diffA, diffB]);
  const summary = useMemo(() => text ? summarize(text, summaryLen) : "", [text, summaryLen]);

  const findCount = useMemo(() => {
    if (!findWord.trim() || !text) return 0;
    const escaped = findWord.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return (text.match(new RegExp(escaped, "gi")) || []).length;
  }, [text, findWord]);

  const goalPct = useMemo(() => {
    const g = parseInt(goalWords);
    if (!g || g <= 0) return null;
    return Math.min(Math.round((stats.words / g) * 100), 100);
  }, [stats.words, goalWords]);

  const handleCopy = useCallback((content = text, label = "Text") => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setCopiedLabel(label);
      setTimeout(() => { setCopied(false); setCopiedLabel(""); }, 2000);
      notify(`${label} copied`);
    });
  }, [text]);

  function handleReplace() {
    if (!findWord.trim()) return;
    const escaped = findWord.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const updated = text.replace(new RegExp(escaped, "gi"), replaceWord);
    setText(updated);
    notify(`Replaced "${findWord}" → "${replaceWord}"`);
  }

  function handleClean() {
    setText(cleanText(text));
    notify("Text cleaned");
  }

  function handleCase() {
    setText(convertCase(text, caseMode));
    notify(`Converted to ${caseMode}`);
  }

  function handleClear() {
    setText("");
    if (autoSaveOn) localStorage.removeItem(AUTOSAVE_KEY);
    notify("Cleared");
  }

  function handleDownload() {
    const report = `Word Count Report — Fancy Digitals\n${"=".repeat(40)}\n\nCOUNTS\nWords:              ${stats.words}\nCharacters:         ${stats.chars}\nChars (no spaces):  ${stats.charsNoSpace}\nSentences:          ${stats.sentences}\nParagraphs:         ${stats.paragraphs}\nUnique Words:       ${stats.uniqueWords}\n\nTIME\nReading Time:       ${stats.readingTime} min\nSpeaking Time:      ${stats.speakingTime} min\n\nAVERAGES\nAvg Word Length:    ${stats.avgWordLength}\nAvg Sentence Len:   ${stats.avgSentenceLength} words\nLongest Word:       ${stats.longestWord}\nShortest Word:      ${stats.shortestWord}\n\nREADABILITY\nScore:              ${stats.readabilityScore}/100\nLevel:              ${stats.readabilityLabel}\n\nWRITING ISSUES\nLong sentences:     ${stats.longSentences.length}\nPassive voice:      ${stats.passiveCount}\nWeak adverbs:       ${stats.adverbsFound.length}\nWeak words:         ${stats.weakWordsFound.length}\n\nTOP KEYWORDS\n${stats.topKeywords.map((k) => `${k.word.padEnd(20)} ${k.count}x  ${k.density}%`).join("\n")}\n\n${"=".repeat(40)}\nTEXT\n${"—".repeat(40)}\n${text}\n\nGenerated at fancydigitals.com.ng/tools/word-counter`;
    const b = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = `word-count-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(a.href);
    notify("Report downloaded");
  }

  const hasText = text.trim().length > 0;

  // Sentence highlighter
  function renderHighlighted() {
    if (!hasText || !showHighlight) return null;
    const sents = text.split(/(?<=[.!?])\s+/);
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
        {sents.map((s, i) => {
          const wc = (s.match(/\b\w+\b/g) || []).length;
          const isLong = wc > 25;
          const hasPassive = PASSIVE_PATTERNS.some((p) => { p.lastIndex = 0; return p.test(s); });
          const hasAdverb = ADVERBS.some((a) => new RegExp(`\\b${a}\\b`, "i").test(s));
          let bg = "";
          if (highlightMode === "long" && isLong) bg = "bg-red-100";
          if (highlightMode === "passive" && hasPassive) bg = "bg-yellow-100";
          if (highlightMode === "adverbs" && hasAdverb) bg = "bg-purple-100";
          return (
            <span key={i} className={`${bg} rounded px-0.5`} title={bg ? `${highlightMode} issue` : ""}>
              {s}{" "}
            </span>
          );
        })}
      </div>
    );
  }

  const WRITE_TABS = [
    { id: "write", label: "Write", iconPath: I.text },
    { id: "tools", label: "Tools", iconPath: I.clean },
    { id: "diff", label: "Diff", iconPath: I.compare },
    { id: "summary", label: "Summary", iconPath: I.list },
  ];

  const RIGHT_TABS = [
    { id: "stats", label: "Stats", iconPath: I.chart },
    { id: "issues", label: "Issues", iconPath: I.warn },
    { id: "keywords", label: "Keywords", iconPath: I.search },
    { id: "platforms", label: "Platforms", iconPath: I.target },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-pulse">
          {notification}
        </div>
      )}

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        <StatCard label="Words" value={stats.words.toLocaleString()} iconPath={I.text} color="#075a01" />
        <StatCard label="Characters" value={stats.chars.toLocaleString()} sub={`${stats.charsNoSpace} no spaces`} iconPath={I.text} color="#0ea5e9" />
        <StatCard label="Read Time" value={`${stats.readingTime}m`} sub={`@${READING_WPM}wpm`} iconPath={I.clock} color="#8b5cf6" />
        <StatCard label="Speak Time" value={`${stats.speakingTime}m`} sub={`@${SPEAKING_WPM}wpm`} iconPath={I.mic} color="#f97316" />
      </div>

      <div className="grid gap-4 sm:gap-5 xl:grid-cols-[1fr_360px]">

        {/* LEFT */}
        <div className="space-y-3 sm:space-y-4">

          {/* Left Tabs */}
          <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {WRITE_TABS.map((t) => (
              <TabBtn key={t.id} id={t.id} label={t.label} iconPath={t.iconPath} active={activeTab === t.id} onClick={setActiveTab} />
            ))}
          </div>

          {/* WRITE TAB */}
          {activeTab === "write" && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-3 sm:px-4 py-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xs font-bold text-gray-700">Editor</span>
                    {hasText && (
                      <span className="rounded-full bg-[#075a01]/10 px-2 py-0.5 text-[10px] font-bold text-[#075a01]">
                        {stats.words} words
                      </span>
                    )}
                    {autoSaveOn && lastSaved && (
                      <span className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400">
                        <Icon d={I.save} className="h-3 w-3" /> Saved {lastSaved}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => { setAutoSaveOn(!autoSaveOn); notify(autoSaveOn ? "Auto-save off" : "Auto-save on"); }}
                      className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition ${autoSaveOn ? "bg-[#075a01]/10 text-[#075a01]" : "bg-gray-100 text-gray-400"}`}
                      title="Toggle auto-save"
                    >
                      <Icon d={I.save} className="h-3 w-3" /> {autoSaveOn ? "Auto-save on" : "Auto-save off"}
                    </button>
                    {hasText && (
                      <>
                        <button onClick={() => handleCopy(text, "Text")} className="flex items-center gap-1 rounded-lg border border-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500 hover:bg-gray-50">
                          <Icon d={copied && copiedLabel === "Text" ? I.check : I.copy} className="h-3 w-3" />
                          {copied && copiedLabel === "Text" ? "Copied" : "Copy"}
                        </button>
                        <button onClick={handleDownload} className="flex items-center gap-1 rounded-lg border border-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-500 hover:bg-gray-50">
                          <Icon d={I.download} className="h-3 w-3" /> Export
                        </button>
                        <button onClick={handleClear} className="flex items-center gap-1 rounded-lg border border-gray-100 px-2 py-1 text-[10px] font-semibold text-red-400 hover:bg-red-50">
                          <Icon d={I.x} className="h-3 w-3" /> Clear
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste or type your text here — all stats update instantly..."
                  className="w-full min-h-[240px] sm:min-h-[320px] resize-y p-3 sm:p-5 text-sm text-gray-800 leading-relaxed outline-none placeholder:text-gray-300"
                />

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 px-3 sm:px-4 py-2 bg-gray-50/50">
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    {[
                      { label: "Sentences", value: stats.sentences },
                      { label: "Paragraphs", value: stats.paragraphs },
                      { label: "Unique", value: stats.uniqueWords },
                    ].map((s) => (
                      <span key={s.label} className="text-[10px] text-gray-400">
                        <span className="font-bold text-gray-700">{s.value}</span> {s.label}
                      </span>
                    ))}
                  </div>
                  {hasText && (
                    <span className="text-[10px] text-gray-400">
                      Avg: <span className="font-bold text-gray-700">{stats.avgSentenceLength}</span> words/sentence
                    </span>
                  )}
                </div>
              </div>

              {/* Sentence Highlighter */}
              <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <Icon d={I.eye} className="h-4 w-4 text-gray-400" /> Sentence Highlighter
                  </h3>
                  <button
                    onClick={() => setShowHighlight(!showHighlight)}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition ${showHighlight ? "bg-[#075a01] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {showHighlight ? "On" : "Off"}
                  </button>
                </div>
                {showHighlight && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {[
                      { id: "long", label: "Long sentences", color: "bg-red-100 text-red-700" },
                      { id: "passive", label: "Passive voice", color: "bg-yellow-100 text-yellow-700" },
                      { id: "adverbs", label: "Adverbs", color: "bg-purple-100 text-purple-700" },
                    ].map((m) => (
                      <button key={m.id} onClick={() => setHighlightMode(m.id)}
                        className={`rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold transition ${highlightMode === m.id ? m.color : "bg-gray-100 text-gray-500"}`}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}
                {showHighlight && hasText ? renderHighlighted() : (
                  !showHighlight && <p className="text-xs text-gray-400">Enable to highlight long sentences, passive voice, or adverbs in your text.</p>
                )}
              </div>

              {/* Find & Replace */}
              <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.search} className="h-4 w-4 text-gray-400" /> Find & Replace
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input type="text" value={findWord} onChange={(e) => setFindWord(e.target.value)}
                        placeholder="Find word or phrase..."
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                      {findWord && (
                        <button onClick={() => setFindWord("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
                          <Icon d={I.x} className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    {findWord && (
                      <div className="flex items-center rounded-xl bg-[#075a01]/10 px-3 py-2.5 shrink-0">
                        <span className="text-sm font-bold text-[#075a01] whitespace-nowrap">{findCount}×</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={replaceWord} onChange={(e) => setReplaceWord(e.target.value)}
                      placeholder="Replace with..."
                      className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                    <button onClick={handleReplace} disabled={!findWord || !hasText}
                      className="shrink-0 rounded-xl bg-[#075a01] px-3 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition">
                      Replace All
                    </button>
                  </div>
                  {findWord && findCount > 0 && (
  <p className="text-xs text-[#075a01] font-medium">
    {findCount} occurrence{findCount !== 1 ? "s" : ""} found ({stats.words > 0 ? Math.round((findCount / stats.words) * 1000) / 10 : 0}% density)
  </p>
)}
                  {findWord && findCount === 0 && hasText && (
                    <p className="text-xs text-gray-400">"{findWord}" not found in text</p>
                  )}
                </div>
              </div>

              {/* Word Goal */}
              <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.target} className="h-4 w-4 text-gray-400" /> Word Goal
                </h3>
                <div className="flex gap-2">
                  <input type="number" value={goalWords} onChange={(e) => setGoalWords(e.target.value)}
                    placeholder="Set target e.g. 1500"
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                  {goalWords && (
                    <button onClick={() => setGoalWords("")} className="text-gray-300 hover:text-gray-500 shrink-0 px-1">
                      <Icon d={I.x} className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {goalPct !== null && (
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">
                        {stats.words.toLocaleString()} / {parseInt(goalWords).toLocaleString()} words
                      </span>
                      <span className={`text-xs font-bold ${goalPct >= 100 ? "text-[#075a01]" : "text-gray-500"}`}>{goalPct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goalPct}%`, backgroundColor: goalPct >= 100 ? "#075a01" : "#0ea5e9" }} />
                    </div>
                    {goalPct >= 100
                      ? <p className="mt-1.5 text-xs font-bold text-[#075a01] flex items-center gap-1"><Icon d={I.check} className="h-3.5 w-3.5" /> Goal reached!</p>
                      : <p className="mt-1.5 text-xs text-gray-400">{(parseInt(goalWords) - stats.words).toLocaleString()} words remaining</p>
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TOOLS TAB */}
          {activeTab === "tools" && (
            <div className="space-y-3 sm:space-y-4">
              {/* Text Cleaner */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                      <Icon d={I.clean} className="h-4 w-4 text-gray-400" /> Text Cleaner
                    </h3>
                    <p className="text-xs text-gray-400">Removes double spaces, fixes punctuation spacing, cleans blank lines and trailing spaces.</p>
                  </div>
                  <button onClick={handleClean} disabled={!hasText}
                    className="shrink-0 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition">
                    Clean
                  </button>
                </div>
              </div>

              {/* Case Converter */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.case} className="h-4 w-4 text-gray-400" /> Case Converter
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {CASE_MODES.map((m) => (
                    <button key={m} onClick={() => setCaseMode(m)}
                      className={`rounded-xl px-3 py-1.5 text-[10px] sm:text-xs font-bold transition ${caseMode === m ? "bg-[#075a01] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {m}
                    </button>
                  ))}
                </div>
                <button onClick={handleCase} disabled={!hasText}
                  className="w-full rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition">
                  Convert to {caseMode}
                </button>
              </div>

              {/* Remove duplicates / extra tools */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.scissors} className="h-4 w-4 text-gray-400" /> Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    {
                      label: "Remove line breaks",
                      action: () => { setText(text.replace(/\n+/g, " ").trim()); notify("Line breaks removed"); },
                    },
                    {
                      label: "Remove extra spaces",
                      action: () => { setText(text.replace(/[ \t]+/g, " ").trim()); notify("Extra spaces removed"); },
                    },
                    {
                      label: "Remove numbers",
                      action: () => { setText(text.replace(/\d+/g, "").trim()); notify("Numbers removed"); },
                    },
                    {
                      label: "Remove punctuation",
                      action: () => { setText(text.replace(/[^\w\s]/g, "").trim()); notify("Punctuation removed"); },
                    },
                    {
                      label: "Reverse text",
                      action: () => { setText(text.split("").reverse().join("")); notify("Text reversed"); },
                    },
                    {
                      label: "Remove blank lines",
                      action: () => { setText(text.replace(/^\s*[\r\n]/gm, "").trim()); notify("Blank lines removed"); },
                    },
                  ].map((a) => (
                    <button key={a.label} onClick={() => { if (hasText) a.action(); }} disabled={!hasText}
                      className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-left text-[10px] sm:text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition leading-snug">
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy options */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.copy} className="h-4 w-4 text-gray-400" /> Copy Options
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Copy all text", fn: () => handleCopy(text, "Text") },
                    { label: "Copy word count", fn: () => handleCopy(String(stats.words), "Word count") },
                    { label: "Copy summary", fn: () => handleCopy(summary, "Summary") },
                    { label: "Copy top keywords", fn: () => handleCopy(stats.topKeywords.map((k) => `${k.word}: ${k.count}x (${k.density}%)`).join("\n"), "Keywords") },
                  ].map((o) => (
                    <button key={o.label} onClick={o.fn} disabled={!hasText}
                      className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-[10px] sm:text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition text-left">
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DIFF TAB */}
          {activeTab === "diff" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-1 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.compare} className="h-4 w-4 text-gray-400" /> Text Comparison
                </h3>
                <p className="mb-4 text-xs text-gray-400">Paste two versions of your text to see exactly what changed.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Version A (original)</label>
                    <textarea rows={6} value={diffA} onChange={(e) => setDiffA(e.target.value)}
                      placeholder="Paste original text..."
                      className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-600">Version B (revised)</label>
                    <textarea rows={6} value={diffB} onChange={(e) => setDiffB(e.target.value)}
                      placeholder="Paste revised text..."
                      className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10" />
                  </div>
                </div>
              </div>

              {diffResult.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900">Diff Result</h3>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-100 border border-green-200" /> Added</span>
                      <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-100 border border-red-200" /> Removed</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed max-h-60 overflow-y-auto">
                    {diffResult.map((item, i) => (
                      <span key={i} className={
                        item.type === "added" ? "bg-green-100 text-green-800 rounded px-0.5 mx-0.5" :
                        item.type === "removed" ? "bg-red-100 text-red-700 line-through rounded px-0.5 mx-0.5" :
                        "mx-0.5"
                      }>{item.word} </span>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                    <span><span className="font-bold text-green-600">{diffResult.filter((d) => d.type === "added").length}</span> words added</span>
                    <span><span className="font-bold text-red-500">{diffResult.filter((d) => d.type === "removed").length}</span> words removed</span>
                    <span><span className="font-bold text-gray-700">{diffResult.filter((d) => d.type === "same").length}</span> unchanged</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUMMARY TAB */}
          {activeTab === "summary" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-1 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Icon d={I.list} className="h-4 w-4 text-gray-400" /> Auto Summarizer
                </h3>
                <p className="mb-4 text-xs text-gray-400">Extracts the most important sentences from your text using keyword frequency scoring.</p>

                <div className="mb-4">
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Summary length: {summaryLen} sentence{summaryLen !== 1 ? "s" : ""}
                  </label>
                  <input type="range" min={1} max={Math.max(1, Math.min(10, stats.sentences))} value={summaryLen}
                    onChange={(e) => setSummaryLen(parseInt(e.target.value))}
                    className="w-full accent-[#075a01]" />
                  <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                    <span>1 sentence</span>
                    <span>{Math.max(1, Math.min(10, stats.sentences))} sentences</span>
                  </div>
                </div>

                {hasText ? (
                  <div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 min-h-[80px]">
                      {summary || "Not enough text to summarize."}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => handleCopy(summary, "Summary")}
                        className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:bg-black transition">
                        <Icon d={I.copy} className="h-3.5 w-3.5" />
                        {copied && copiedLabel === "Summary" ? "Copied!" : "Copy Summary"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-xs text-gray-400">
                    Type or paste text in the Editor tab first
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#075a01]/10 bg-[#075a01]/5 p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#075a01] flex items-center gap-1">
                  <Icon d={I.info} className="h-3.5 w-3.5" /> How the summarizer works
                </p>
                <ul className="space-y-1 text-[11px] sm:text-xs text-gray-700">
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Scores each sentence by its keyword frequency</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Excludes stop words like "the", "and", "is"</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Selects the highest-scoring sentences</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Works best on informational text 200+ words</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {RIGHT_TABS.map((t) => (
              <TabBtn key={t.id} id={t.id} label={t.label} iconPath={t.iconPath} active={activeRight === t.id} onClick={setActiveRight} />
            ))}
          </div>

          {/* STATS */}
          {activeRight === "stats" && (
            <div className="space-y-3 sm:space-y-4">
              <ReadabilityBar score={stats.readabilityScore} label={stats.readabilityLabel} detail={stats.readabilityDetail} />

              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">All Statistics</h3>
                <div className="space-y-2">
                  {[
                    ["Total characters", stats.chars.toLocaleString()],
                    ["Characters (no spaces)", stats.charsNoSpace.toLocaleString()],
                    ["Total words", stats.words.toLocaleString()],
                    ["Unique words", stats.uniqueWords.toLocaleString()],
                    ["Vocabulary richness", stats.words > 0 ? `${Math.round((stats.uniqueWords / stats.words) * 100)}%` : "—"],
                    ["Sentences", stats.sentences.toLocaleString()],
                    ["Paragraphs", stats.paragraphs.toLocaleString()],
                    ["Lines", stats.lines.toLocaleString()],
                    ["Avg word length", `${stats.avgWordLength} chars`],
                    ["Avg sentence length", `${stats.avgSentenceLength} words`],
                    ["Longest word", stats.longestWord || "—"],
                    ["Shortest word", stats.shortestWord || "—"],
                    ["Reading time", `~${stats.readingTime} min`],
                    ["Speaking time", `~${stats.speakingTime} min`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <span className="text-[10px] sm:text-xs text-gray-500">{label}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#075a01]/10 bg-[#075a01]/5 p-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#075a01]">Writing Benchmarks</p>
                <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Blog post: 1,500–2,500 words for SEO</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Email: 50–125 words for best CTR</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Sentences: under 20 words for readability</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Paragraphs: 3–5 sentences maximum</li>
                  <li className="flex gap-2"><span className="text-[#075a01] font-bold">→</span>Flesch score: 60+ for web content</li>
                </ul>
              </div>
            </div>
          )}

          {/* ISSUES */}
          {activeRight === "issues" && (
            <div className="space-y-3 sm:space-y-4">
              {!hasText ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                  <Icon d={I.warn} className="h-8 w-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Paste text to detect writing issues</p>
                </div>
              ) : (
                <>
                  {/* Summary row */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      { label: "Long sentences", value: stats.longSentences.length, color: "#ef4444" },
                      { label: "Passive voice", value: stats.passiveCount, color: "#f59e0b" },
                      { label: "Weak adverbs", value: stats.adverbsFound.length, color: "#8b5cf6" },
                      { label: "Weak words", value: stats.weakWordsFound.length, color: "#0ea5e9" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm text-center">
                        <p className="text-xl sm:text-2xl font-bold" style={{ color: s.value > 0 ? s.color : "#075a01" }}>{s.value}</p>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Long sentences */}
                  {stats.longSentences.length > 0 && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                      <h3 className="mb-2 text-xs font-bold text-red-700 flex items-center gap-1.5">
                        <Icon d={I.warn} className="h-3.5 w-3.5" /> Long Sentences ({stats.longSentences.length})
                      </h3>
                      <p className="mb-3 text-[10px] text-red-600">Sentences over 25 words are harder to read. Break them up.</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {stats.longSentences.map((s, i) => (
                          <p key={i} className="text-xs text-red-800 bg-white/60 rounded-lg p-2 leading-relaxed">
                            "{s.slice(0, 120)}{s.length > 120 ? "..." : ""}"
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passive voice */}
                  {stats.passiveCount > 0 && (
                    <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
                      <h3 className="mb-1 text-xs font-bold text-yellow-700 flex items-center gap-1.5">
                        <Icon d={I.warn} className="h-3.5 w-3.5" /> Passive Voice ({stats.passiveCount} instances)
                      </h3>
                      <p className="text-[10px] text-yellow-600">Active voice is stronger and more direct. Use "The team completed the project" instead of "The project was completed by the team."</p>
                    </div>
                  )}

                  {/* Adverbs */}
                  {stats.adverbsFound.length > 0 && (
                    <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                      <h3 className="mb-2 text-xs font-bold text-purple-700 flex items-center gap-1.5">
                        <Icon d={I.warn} className="h-3.5 w-3.5" /> Weak Adverbs ({stats.adverbsFound.length})
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {stats.adverbsFound.map((a) => (
                          <span key={a} className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-semibold text-purple-700">{a}</span>
                        ))}
                      </div>
                      <p className="mt-2 text-[10px] text-purple-600">Replace with stronger verbs. "He ran quickly" → "He sprinted".</p>
                    </div>
                  )}

                  {/* Weak words */}
                  {stats.weakWordsFound.length > 0 && (
                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <h3 className="mb-2 text-xs font-bold text-blue-700 flex items-center gap-1.5">
                        <Icon d={I.warn} className="h-3.5 w-3.5" /> Vague Words ({stats.weakWordsFound.length})
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {stats.weakWordsFound.map((w) => (
                          <span key={w} className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold text-blue-700">{w}</span>
                        ))}
                      </div>
                      <p className="mt-2 text-[10px] text-blue-600">Replace vague words with specific, concrete alternatives.</p>
                    </div>
                  )}

                  {stats.longSentences.length === 0 && stats.passiveCount === 0 && stats.adverbsFound.length === 0 && stats.weakWordsFound.length === 0 && (
                    <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
                      <Icon d={I.check} className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-green-700">No issues found</p>
                      <p className="text-xs text-green-600 mt-1">Your text looks clean and well-written.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* KEYWORDS */}
          {activeRight === "keywords" && (
            <div className="space-y-3 sm:space-y-4">
              {!hasText ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                  <Icon d={I.search} className="h-8 w-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm text-gray-400">Paste text to see keyword analysis</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <Icon d={I.search} className="h-4 w-4 text-gray-400" /> Top Keywords
                    </h3>
                    <span className="text-[10px] text-gray-400">excluding stop words</span>
                  </div>
                  <div className="space-y-3">
                    {stats.topKeywords.map((kw, idx) => (
                      <div key={kw.word}>
                        <div className="mb-1 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-300 w-4">#{idx + 1}</span>
                            <span className="text-xs font-bold text-gray-800 capitalize">{kw.word}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400">{kw.count}×</span>
                            <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${kw.density > 3 ? "bg-red-100 text-red-600" : kw.density > 1.5 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {kw.density}%
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-100">
                          <div className="h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(kw.count / stats.topKeywords[0].count) * 100}%`, backgroundColor: kw.density > 3 ? "#ef4444" : "#075a01" }} />
                        </div>
                        {kw.density > 3 && <p className="mt-0.5 text-[10px] text-red-500">Over 3% — may look like keyword stuffing</p>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-gray-50 p-3">
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                      <span className="font-bold text-gray-700">Ideal density:</span> 1–2.5% for primary keywords. Over 3% risks Google penalty.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PLATFORMS */}
          {activeRight === "platforms" && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Icon d={I.target} className="h-4 w-4 text-gray-400" /> Platform Character Limits
              </h3>
              <div className="space-y-3.5">
                {PLATFORMS.map((p) => {
                  const chars = text.length;
                  const pct = Math.min((chars / p.limit) * 100, 100);
                  const over = chars > p.limit;
                  const remaining = p.limit - chars;
                  return (
                    <div key={p.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{p.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400">{p.limit.toLocaleString()} limit</span>
                          <span className={`text-[10px] font-bold ${over ? "text-red-500" : "text-gray-500"}`}>
                            {over ? `${Math.abs(remaining).toLocaleString()} over` : `${remaining.toLocaleString()} left`}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-100">
                        <div className="h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: over ? "#ef4444" : p.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}