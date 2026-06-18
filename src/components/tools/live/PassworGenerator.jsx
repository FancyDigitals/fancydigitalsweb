"use client";

import { useState, useCallback, useEffect, useRef } from "react";

/* ============================================
   ICONS
============================================ */
function Ico({ d, className = "h-4 w-4", fill = false }) {
  return (
    <svg className={className} fill={fill ? "currentColor" : "none"} viewBox="0 0 24 24" stroke={fill ? "none" : "currentColor"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const IC = {
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  check: "M4.5 12.75l6 6 9-13.5",
  refresh: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  eyeoff: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88",
  lock: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  download: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  list: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  x: "M6 18L18 6M6 6l12 12",
};

/* ============================================
   CONSTANTS
============================================ */
const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  ambiguous: "0O1lI",
};

const WORD_LIST = [
  "apple","bridge","cloud","dragon","eagle","forest","garden","harbor",
  "island","jungle","knight","lemon","mango","noble","ocean","palace",
  "queen","river","solar","tiger","urban","valley","winter","yellow","zebra",
  "amber","blaze","coral","delta","ember","flame","grace","honey","ivory",
  "jewel","karma","laser","maple","nexus","onyx","prism","quartz","rouge",
  "storm","topaz","ultra","venom","waltz","xenon","yacht","zeal",
];

/* ============================================
   CRYPTO RANDOM
============================================ */
function cryptoRandom(max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % max;
}

function cryptoRandomFloat() {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] / (0xFFFFFFFF + 1);
}

/* ============================================
   GENERATORS
============================================ */
function generatePassword(options) {
  const { length, upper, lower, numbers, symbols, excludeAmbiguous, excludeSimilar } = options;
  let charset = "";
  if (upper) charset += CHARS.upper;
  if (lower) charset += CHARS.lower;
  if (numbers) charset += CHARS.numbers;
  if (symbols) charset += CHARS.symbols;
  if (!charset) charset = CHARS.lower + CHARS.numbers;

  if (excludeAmbiguous) {
    charset = charset.split("").filter((c) => !CHARS.ambiguous.includes(c)).join("");
  }
  if (excludeSimilar) {
    charset = charset.split("").filter((c) => !"{}[]()/\\'\"`~,;:.<>".includes(c)).join("");
  }

  let password = "";
  const required = [];
  if (upper && CHARS.upper.length) required.push(CHARS.upper[cryptoRandom(CHARS.upper.length)]);
  if (lower && CHARS.lower.length) required.push(CHARS.lower[cryptoRandom(CHARS.lower.length)]);
  if (numbers && CHARS.numbers.length) required.push(CHARS.numbers[cryptoRandom(CHARS.numbers.length)]);
  if (symbols && CHARS.symbols.length) required.push(CHARS.symbols[cryptoRandom(CHARS.symbols.length)]);

  for (let i = required.length; i < length; i++) {
    password += charset[cryptoRandom(charset.length)];
  }
  password = (required.join("") + password).split("").sort(() => cryptoRandomFloat() - 0.5).join("");
  return password;
}

function generatePassphrase(wordCount, separator, capitalize, includeNumber) {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    let w = WORD_LIST[cryptoRandom(WORD_LIST.length)];
    if (capitalize) w = w.charAt(0).toUpperCase() + w.slice(1);
    words.push(w);
  }
  let phrase = words.join(separator);
  if (includeNumber) phrase += separator + cryptoRandom(999);
  return phrase;
}

function calculateEntropy(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);
  let poolSize = 0;
  if (hasUpper) poolSize += 26;
  if (hasLower) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 32;
  if (poolSize === 0) return 0;
  return Math.round(password.length * Math.log2(poolSize));
}

function getStrength(entropy) {
  if (entropy < 28) return { label: "Very Weak", color: "#ef4444", pct: 10, tip: "Way too short. Increase length immediately." };
  if (entropy < 36) return { label: "Weak", color: "#f97316", pct: 25, tip: "Too short for real use. Aim for 12+ characters." };
  if (entropy < 60) return { label: "Fair", color: "#f59e0b", pct: 50, tip: "Acceptable for low-risk accounts only." };
  if (entropy < 80) return { label: "Strong", color: "#22c55e", pct: 75, tip: "Good for most accounts." };
  if (entropy < 100) return { label: "Very Strong", color: "#075a01", pct: 90, tip: "Excellent. Good for all sensitive accounts." };
  return { label: "Uncrackable", color: "#075a01", pct: 100, tip: "Maximum strength. Use this for everything critical." };
}

function estimateCrackTime(entropy) {
  const guessesPerSecond = 1e12;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / guessesPerSecond / 2;
  if (seconds < 1) return "Instantly";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 3.15e13) return `${(seconds / 3153600000).toFixed(1)}K years`;
  return "Longer than the universe";
}

/* ============================================
   MAIN COMPONENT
============================================ */
export default function PasswordGenerator() {
  const [mode, setMode] = useState("password");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [bulk, setBulk] = useState([]);
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [bulkCount, setBulkCount] = useState(5);

  // Password options
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  // Passphrase options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);

  function notify(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(""), 2000);
  }

  const generate = useCallback(() => {
    let pw = "";
    if (mode === "password") {
      pw = generatePassword({ length, upper, lower, numbers, symbols, excludeAmbiguous, excludeSimilar });
    } else {
      pw = generatePassphrase(wordCount, separator, capitalize, includeNumber);
    }
    setPassword(pw);
    setHistory((prev) => [{ pw, ts: new Date().toLocaleTimeString() }, ...prev].slice(0, 20));
  }, [mode, length, upper, lower, numbers, symbols, excludeAmbiguous, excludeSimilar, wordCount, separator, capitalize, includeNumber]);

  useEffect(() => { generate(); }, []);

  function generateBulk() {
    const list = [];
    for (let i = 0; i < bulkCount; i++) {
      if (mode === "password") {
        list.push(generatePassword({ length, upper, lower, numbers, symbols, excludeAmbiguous, excludeSimilar }));
      } else {
        list.push(generatePassphrase(wordCount, separator, capitalize, includeNumber));
      }
    }
    setBulk(list);
  }

  function copyText(text, label = "Password", index = null) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setCopiedIndex(index);
      setTimeout(() => { setCopied(false); setCopiedIndex(null); }, 2000);
      notify(`${label} copied`);
    });
  }

  function downloadAll(list) {
    const content = list.map((p, i) => `${i + 1}. ${p}`).join("\n");
    const blob = new Blob([`Generated Passwords — Fancy Digitals\n${"=".repeat(40)}\n\n${content}\n\nGenerated at fancydigitals.com.ng/tools/password-generator`], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `passwords-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    notify("Downloaded");
  }

  const entropy = password ? calculateEntropy(password) : 0;
  const strength = getStrength(entropy);
  const crackTime = password ? estimateCrackTime(entropy) : "—";

  const charPreview = password.split("").map((c, i) => {
    let color = "text-gray-800";
    if (/[A-Z]/.test(c)) color = "text-blue-600";
    else if (/[a-z]/.test(c)) color = "text-gray-800";
    else if (/[0-9]/.test(c)) color = "text-green-600";
    else color = "text-red-500";
    return <span key={i} className={`${color} font-mono`}>{c}</span>;
  });

  const atLeastOne = upper || lower || numbers || symbols;

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          {notification}
        </div>
      )}

      {/* MODE TABS */}
      <div className="flex rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {[
          { id: "password", label: "Password", d: IC.lock },
          { id: "passphrase", label: "Passphrase", d: IC.list },
          { id: "bulk", label: "Bulk Generate", d: IC.bolt },
          { id: "history", label: "History", d: IC.list },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setMode(tab.id)}
            className={`flex flex-1 flex-col items-center gap-0.5 py-3 transition text-[9px] sm:text-[10px] font-bold ${mode === tab.id ? "bg-[#8b5cf6] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"}`}>
            <Ico d={tab.d} className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1fr_340px]">

        {/* LEFT */}
        <div className="space-y-4">

          {/* PASSWORD / PASSPHRASE MODE */}
          {(mode === "password" || mode === "passphrase") && (
            <>
              {/* Generated password display */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <Ico d={IC.shield} className="h-4 w-4 text-[#8b5cf6]" />
                    Generated {mode === "passphrase" ? "Passphrase" : "Password"}
                  </h3>
                  <button onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition">
                    <Ico d={showPassword ? IC.eye : IC.eyeoff} className="h-4 w-4" />
                  </button>
                </div>

                {/* Password output */}
                <div className="relative rounded-2xl border-2 border-[#8b5cf6]/20 bg-gray-50 p-4 sm:p-5 min-h-[64px] flex items-center">
                  {showPassword ? (
                    <div className="flex-1 flex flex-wrap gap-0.5 text-lg sm:text-xl lg:text-2xl leading-tight tracking-wider break-all font-mono">
                      {charPreview}
                    </div>
                  ) : (
                    <div className="flex-1 text-2xl text-gray-400 tracking-[0.3em]">
                      {"•".repeat(Math.min(password.length, 24))}
                    </div>
                  )}
                </div>

                {/* Strength bar */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: strength.color }}>{strength.label}</span>
                    <span className="text-xs text-gray-400">{entropy} bits entropy</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100">
                    <div className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${strength.pct}%`, backgroundColor: strength.color }} />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">{strength.tip}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => copyText(password, "Password")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${copied && copiedIndex === null ? "bg-green-500 text-white" : "bg-[#8b5cf6] text-white hover:bg-[#7c3aed]"}`}>
                    <Ico d={copied && copiedIndex === null ? IC.check : IC.copy} className="h-4 w-4" />
                    {copied && copiedIndex === null ? "Copied!" : "Copy Password"}
                  </button>
                  <button onClick={generate}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                    <Ico d={IC.refresh} className="h-4 w-4" />
                    Regenerate
                  </button>
                </div>
              </div>

              {/* Options */}
              {mode === "password" && (
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm space-y-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">Password Options</h3>

                  {/* Length */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">Password Length</label>
                      <span className="rounded-xl bg-[#8b5cf6]/10 px-3 py-1 text-sm font-bold text-[#8b5cf6]">{length}</span>
                    </div>
                    <input type="range" min={4} max={128} value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full accent-[#8b5cf6]" />
                    <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                      <span>4</span>
                      <span className="text-[#075a01] font-semibold">Recommended: 16–24</span>
                      <span>128</span>
                    </div>
                  </div>

                  {/* Quick length buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[8, 12, 16, 20, 24, 32].map((l) => (
                      <button key={l} onClick={() => setLength(l)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${length === l ? "bg-[#8b5cf6] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {l}
                      </button>
                    ))}
                  </div>

                  {/* Character toggles */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Uppercase (A–Z)", val: upper, set: setUpper, preview: "ABC" },
                      { label: "Lowercase (a–z)", val: lower, set: setLower, preview: "abc" },
                      { label: "Numbers (0–9)", val: numbers, set: setNumbers, preview: "123" },
                      { label: "Symbols (!@#)", val: symbols, set: setSymbols, preview: "!@#" },
                    ].map((opt) => (
                      <button key={opt.label} onClick={() => { if (!opt.val || [upper, lower, numbers, symbols].filter(Boolean).length > 1) opt.set(!opt.val); }}
                        className={`flex items-center justify-between rounded-xl border p-3 transition ${opt.val ? "border-[#8b5cf6]/30 bg-[#8b5cf6]/5" : "border-gray-100 bg-gray-50"}`}>
                        <div className="text-left">
                          <p className="text-[10px] sm:text-xs font-bold text-gray-700">{opt.label}</p>
                          <p className="text-[10px] font-mono text-gray-400">{opt.preview}</p>
                        </div>
                        <div className={`h-5 w-9 rounded-full transition-colors ${opt.val ? "bg-[#8b5cf6]" : "bg-gray-200"}`}>
                          <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${opt.val ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-2">
                    {[
                      { label: "Exclude ambiguous characters (0, O, l, 1, I)", val: excludeAmbiguous, set: setExcludeAmbiguous },
                      { label: "Exclude similar-looking symbols", val: excludeSimilar, set: setExcludeSimilar },
                    ].map((opt) => (
                      <button key={opt.label} onClick={() => opt.set(!opt.val)}
                        className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:bg-gray-100">
                        <span className="text-left text-[10px] sm:text-xs font-semibold text-gray-700">{opt.label}</span>
                        <div className={`h-5 w-9 rounded-full transition-colors shrink-0 ml-3 ${opt.val ? "bg-[#8b5cf6]" : "bg-gray-200"}`}>
                          <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${opt.val ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button onClick={generate}
                    className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-black transition">
                    Generate with these settings
                  </button>
                </div>
              )}

              {/* Passphrase options */}
              {mode === "passphrase" && (
                <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm space-y-5">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">Passphrase Options</h3>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-700">Number of Words</label>
                      <span className="rounded-xl bg-[#8b5cf6]/10 px-3 py-1 text-sm font-bold text-[#8b5cf6]">{wordCount}</span>
                    </div>
                    <input type="range" min={3} max={8} value={wordCount}
                      onChange={(e) => setWordCount(parseInt(e.target.value))}
                      className="w-full accent-[#8b5cf6]" />
                    <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                      <span>3 words</span>
                      <span>8 words</span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-gray-700">Word Separator</label>
                    <div className="flex flex-wrap gap-2">
                      {["-", "_", ".", " ", "!", "#"].map((s) => (
                        <button key={s} onClick={() => setSeparator(s)}
                          className={`rounded-xl px-4 py-2 text-sm font-bold font-mono transition ${separator === s ? "bg-[#8b5cf6] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                          {s === " " ? "space" : s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Capitalize first letter of each word", val: capitalize, set: setCapitalize },
                      { label: "Include a random number at the end", val: includeNumber, set: setIncludeNumber },
                    ].map((opt) => (
                      <button key={opt.label} onClick={() => opt.set(!opt.val)}
                        className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
                        <span className="text-left text-[10px] sm:text-xs font-semibold text-gray-700">{opt.label}</span>
                        <div className={`h-5 w-9 rounded-full transition-colors shrink-0 ml-3 ${opt.val ? "bg-[#8b5cf6]" : "bg-gray-200"}`}>
                          <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${opt.val ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button onClick={generate}
                    className="w-full rounded-xl bg-gray-900 py-3 text-sm font-bold text-white hover:bg-black transition">
                    Generate Passphrase
                  </button>
                </div>
              )}
            </>
          )}

          {/* BULK MODE */}
          {mode === "bulk" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
                <h3 className="mb-4 text-xs sm:text-sm font-bold text-gray-900">Bulk Generate</h3>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-semibold text-gray-600">How many passwords</label>
                    <input type="number" min={1} max={50} value={bulkCount}
                      onChange={(e) => setBulkCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/10" />
                  </div>
                  <div className="flex gap-2 mt-5">
                    <button onClick={generateBulk}
                      className="rounded-xl bg-[#8b5cf6] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#7c3aed] transition">
                      Generate
                    </button>
                    {bulk.length > 0 && (
                      <button onClick={() => downloadAll(bulk)}
                        className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
                        <Ico d={IC.download} className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {bulk.length > 0 && (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {bulk.map((pw, i) => {
                      const e = calculateEntropy(pw);
                      const s = getStrength(e);
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                          <span className="text-[10px] font-bold text-gray-400 w-5 shrink-0">#{i + 1}</span>
                          <code className="flex-1 text-xs sm:text-sm font-mono text-gray-800 break-all">{pw}</code>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:block text-[10px] font-bold rounded-full px-2 py-0.5" style={{ color: s.color, backgroundColor: `${s.color}15` }}>{s.label}</span>
                            <button onClick={() => copyText(pw, "Password", i)}
                              className={`rounded-lg p-1.5 transition ${copied && copiedIndex === i ? "text-green-500" : "text-gray-400 hover:text-[#8b5cf6]"}`}>
                              <Ico d={copied && copiedIndex === i ? IC.check : IC.copy} className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {bulk.length === 0 && (
                  <div className="rounded-xl bg-gray-50 p-8 text-center">
                    <Ico d={IC.bolt} className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Click Generate to create multiple passwords at once</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HISTORY MODE */}
          {mode === "history" && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900">Session History</h3>
                <button onClick={() => setHistory([])}
                  className="text-xs font-semibold text-red-400 hover:text-red-600 flex items-center gap-1">
                  <Ico d={IC.trash} className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
              {history.length === 0 ? (
                <div className="py-10 text-center">
                  <Ico d={IC.list} className="h-8 w-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No passwords generated yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {history.map((item, i) => {
                    const e = calculateEntropy(item.pw);
                    const s = getStrength(e);
                    return (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                        <div className="flex-1 min-w-0">
                          <code className="text-xs sm:text-sm font-mono text-gray-800 break-all block">{item.pw}</code>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-gray-400">{item.ts}</span>
                            <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.label}</span>
                          </div>
                        </div>
                        <button onClick={() => copyText(item.pw, "Password", i + 100)}
                          className={`shrink-0 rounded-lg p-1.5 transition ${copied && copiedIndex === i + 100 ? "text-green-500" : "text-gray-400 hover:text-[#8b5cf6]"}`}>
                          <Ico d={copied && copiedIndex === i + 100 ? IC.check : IC.copy} className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="mt-3 text-[10px] text-gray-400 text-center">History clears when you close this tab. Never stored on any server.</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-4">

          {/* Security stats */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Ico d={IC.shield} className="h-4 w-4 text-[#8b5cf6]" /> Security Analysis
            </h3>
            {[
              { label: "Password length", value: `${password.length} characters` },
              { label: "Entropy", value: `${entropy} bits` },
              { label: "Strength", value: strength.label, color: strength.color },
              { label: "Crack time (1T/s)", value: crackTime },
              { label: "Character set", value: (() => { const parts = []; if (/[A-Z]/.test(password)) parts.push("A–Z"); if (/[a-z]/.test(password)) parts.push("a–z"); if (/[0-9]/.test(password)) parts.push("0–9"); if (/[^A-Za-z0-9]/.test(password)) parts.push("symbols"); return parts.join(", ") || "—"; })() },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span className="text-xs text-gray-500">{row.label}</span>
                <span className="text-xs font-bold" style={{ color: row.color || "#111827" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Character preview */}
          {password && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <h3 className="mb-3 text-xs sm:text-sm font-bold text-gray-900">Character Legend</h3>
              <div className="flex flex-wrap gap-1 p-3 rounded-xl bg-gray-50 font-mono text-sm leading-relaxed">
                {charPreview}
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  { color: "text-blue-600", label: "Uppercase" },
                  { color: "text-gray-800", label: "Lowercase" },
                  { color: "text-green-600", label: "Numbers" },
                  { color: "text-red-500", label: "Symbols" },
                ].map((l) => (
                  <span key={l.label} className={`flex items-center gap-1 text-[10px] font-semibold ${l.color}`}>
                    <span className="font-bold">A</span> {l.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="rounded-2xl border border-[#8b5cf6]/10 bg-[#8b5cf6]/5 p-4 sm:p-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8b5cf6] flex items-center gap-1.5">
              <Ico d={IC.info} className="h-3.5 w-3.5" /> Security Tips
            </p>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-gray-700">
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Use a unique password for every account</li>
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Store passwords in a password manager, never in plain text</li>
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Enable two-factor authentication on critical accounts</li>
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Never share passwords via email or chat</li>
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Passphrases with 4+ words are easier to remember and just as strong</li>
              <li className="flex gap-2"><span className="text-[#8b5cf6] font-bold shrink-0">→</span>Change passwords immediately if you suspect a breach</li>
            </ul>
          </div>

          {/* Privacy note */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <Ico d={IC.shield} className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-green-700 mb-1">100% Private & Secure</p>
                <p className="text-[10px] sm:text-xs text-green-600 leading-relaxed">
                  All passwords are generated locally in your browser using <code className="font-mono bg-green-100 px-1 rounded">window.crypto.getRandomValues()</code>. No data is ever sent to any server. History clears when you close the tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}