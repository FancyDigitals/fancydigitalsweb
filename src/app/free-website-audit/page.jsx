"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Loader2,
  Globe,
  Zap,
  Shield,
  Star,
  TrendingUp,
  MessageSquare,
  Eye,
  Users,
  BarChart2,
  Award,
  Lightbulb,
  Plus,
  Trash2,
  Smartphone,
  Camera,
  Upload,
  ImageIcon,
  Share,
} from "lucide-react";

const CATEGORY_ICONS = {
  seo: Search,
  performance: Zap,
  mobile: Smartphone,
  content: MessageSquare,
  trust: Shield,
  conversion: TrendingUp,
  brand: Star,
  socialProof: Users,
  aiVisibility: Eye,
  messagingPresence: MessageSquare,
  competitorGap: BarChart2,
};

const MESSAGING_OPTIONS = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "TikTok",
  "Twitter/X",
  "LinkedIn",
  "Telegram",
  "YouTube",
];

const EFFORT_STYLES = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const SCREENSHOT_GUIDE = [
  { label: "Homepage / Landing Page", desc: "Your main page — what visitors see first" },
  { label: "Dashboard / Main App Screen", desc: "The first screen after logging in" },
  { label: "Key Feature Screen", desc: "Your most important feature in action" },
  { label: "Pricing Page", desc: "How you present your plans and pricing" },
  { label: "Sign Up / Onboarding", desc: "The registration or onboarding flow" },
  { label: "Settings / Profile Page", desc: "Where users manage their account" },
];

function getGradeColor(grade) {
  const colors = { A: "#075a01", B: "#0a8f01", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return colors[grade] || "#6b7280";
}

function getSeverityBg(severity) {
  const bgs = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-100 text-gray-600",
  };
  return bgs[severity] || "bg-gray-100 text-gray-600";
}

function ScoreRing({ score, grade, size = "lg" }) {
  const radius = size === "lg" ? 54 : 36;
  const stroke = size === "lg" ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = (radius + stroke) * 2;
  const color = getGradeColor(grade);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={svgSize} height={svgSize} className="-rotate-90">
        <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <p className={`font-black leading-none ${size === "lg" ? "text-3xl" : "text-lg"}`} style={{ color }}>{score}</p>
        <p className={`font-bold ${size === "lg" ? "text-base" : "text-xs"}`} style={{ color }}>{grade}</p>
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  const [open, setOpen] = useState(false);
  const Icon = CATEGORY_ICONS[category.id] || BarChart2;
  const color = getGradeColor(category.grade);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition text-left"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm">{category.name}</p>
          <p className="text-xs text-gray-500 line-clamp-1">{category.summary}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <ScoreRing score={category.score} grade={category.grade} size="sm" />
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          {category.passed?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">What's working</p>
              <ul className="space-y-1.5">
                {category.passed.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {category.issues?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Issues found</p>
              <div className="space-y-3">
                {category.issues.map((issue, i) => (
                  <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${getSeverityBg(issue.severity)}`}>{issue.severity}</span>
                      <p className="text-xs font-bold text-gray-900">{issue.issue}</p>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-1.5">
                      <span className="font-semibold text-gray-700">Impact:</span> {issue.impact}
                    </p>
                    <p className="text-[11px] text-[#075a01]">
                      <span className="font-semibold">Fix:</span> {issue.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WebsiteAuditPage() {
  const [url, setUrl] = useState("");
  const [competitors, setCompetitors] = useState([""]);
  const [messagingApps, setMessagingApps] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [step, setStep] = useState("");
  const fileInputRef = useRef(null);
  // Save form to localStorage
function saveToStorage(data) {
  try {
    localStorage.setItem("website-audit-form", JSON.stringify(data));
  } catch {}
}

// Load form from localStorage
function loadFromStorage() {
  try {
    const saved = localStorage.getItem("website-audit-form");
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

  const [isPro, setIsPro] = useState(false);

useEffect(() => {
  fetch("/api/auth/me")
    .then((r) => r.json())
    .then((d) => setIsPro(d?.isPro || false))
    .catch(() => {});
}, []);

useEffect(() => {
  const saved = loadFromStorage();
  if (!saved) return;
  if (saved.url) setUrl(saved.url);
  if (saved.competitors) setCompetitors(saved.competitors);
  if (saved.messagingApps) setMessagingApps(saved.messagingApps);
  if (saved.screenshots) setScreenshots(saved.screenshots);
}, []);
useEffect(() => {
  saveToStorage({ url, competitors, messagingApps, screenshots });
}, [url, competitors, messagingApps, screenshots]);

  function addCompetitor() {
    if (competitors.length < 3) setCompetitors([...competitors, ""]);
  }

  function removeCompetitor(i) {
    setCompetitors(competitors.filter((_, idx) => idx !== i));
  }

  function updateCompetitor(i, val) {
    const updated = [...competitors];
    updated[i] = val;
    setCompetitors(updated);
  }

  function toggleMessaging(app) {
    setMessagingApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  }

  function handleScreenshotUpload(e, label) {
    const files = Array.from(e.target.files || []);
    const maxTotal = isPro ? 20 : 6;
    files.forEach((file) => {
      if (file.size > 4 * 1024 * 1024) {
        alert(`${file.name} is too large. Max 4MB per screenshot.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setScreenshots((prev) => {
          if (prev.length >= maxTotal) return prev;
          return [...prev, { label: label || file.name, data: ev.target.result, name: file.name }];
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function removeScreenshot(i) {
    setScreenshots((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleAudit(e) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    const hasScreenshots = screenshots.length > 0;

    const steps = [
      "Fetching your website...",
      "Running speed analysis...",
      "Auditing SEO signals...",
      "Analyzing content & messaging...",
      "Checking trust & conversion...",
      "Comparing with competitors...",
      hasScreenshots ? "Analyzing your app screenshots..." : "Generating your full report...",
      "Almost done...",
    ];

    let i = 0;
    setStep(steps[0]);
    const stepInterval = setInterval(() => {
      i++;
      if (i < steps.length) setStep(steps[i]);
    }, 5000);

    try {
      const cleanCompetitors = competitors.filter((c) => c.trim());
      const screenshotData = screenshots.map((s) => ({ label: s.label, data: s.data }));

      const res = await fetch("/api/tools/website-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          competitors: cleanCompetitors,
          messagingApps,
          screenshots: screenshotData,
        }),
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (!res.ok) {
        if (data.requiresLogin) {
          setError("You've used your free audit. Sign in for more.");
        } else {
          setError(data.error || "Audit failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      setResult(data);
    } catch {
      clearInterval(stepInterval);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
    setStep("");
  }

  async function handleDownloadPDF() {
    if (!result) return;
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const audit = result.audit;
    const ux = result.uxAudit;
    const lineH = 7;
    let y = 20;

    const addLine = (text, size = 10, bold = false, color = [30, 30, 30]) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(String(text), 170);
      lines.forEach((line) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(line, 20, y);
        y += lineH;
      });
    };

    const gap = (n = 1) => { y += lineH * n; };

    addLine("WEBSITE AUDIT REPORT", 18, true, [7, 90, 1]);
    addLine(`${audit.websiteName || result.meta.url}`, 12, false, [80, 80, 80]);
    addLine(`Audited: ${new Date(result.meta.scannedAt).toLocaleDateString()}`, 9, false, [120, 120, 120]);
    gap();

    addLine(`Overall Score: ${audit.overallScore}/100 — Grade ${audit.overallGrade}`, 14, true);
    addLine(audit.overallSummary, 10);
    gap();

    if (ux) {
      addLine(`UX Score: ${ux.uxScore}/100 — Grade ${ux.uxGrade}`, 14, true);
      addLine(ux.uxSummary, 10);
      gap();
    }

    addLine("TOP PRIORITY FIXES", 12, true, [7, 90, 1]);
    (audit.priorityFixes || []).forEach((fix) => {
      addLine(`#${fix.rank} [${fix.severity}] ${fix.issue}`, 10, true);
      addLine(`Fix: ${fix.fix}`, 10);
      addLine(`Impact: ${fix.estimatedImpact}`, 10, false, [100, 100, 100]);
      gap(0.5);
    });
    gap();

    addLine("INNOVATIVE IDEAS", 12, true, [7, 90, 1]);
    (audit.innovativeIdeas || []).forEach((idea) => {
      addLine(`${idea.title} [${idea.effort}]`, 10, true);
      addLine(idea.description, 10);
      gap(0.5);
    });
    gap();

    if (ux?.uxInnovativeIdeas?.length > 0) {
      addLine("IN-APP INNOVATIVE IDEAS", 12, true, [7, 90, 1]);
      ux.uxInnovativeIdeas.forEach((idea) => {
        addLine(`${idea.title} [${idea.effort}]`, 10, true);
        addLine(idea.description, 10);
        gap(0.5);
      });
      gap();
    }

    addLine("CATEGORY SCORES", 12, true, [7, 90, 1]);
    (audit.categories || []).forEach((cat) => {
      addLine(`${cat.name}: ${cat.score}/100 (${cat.grade})`, 10, true);
      addLine(cat.summary, 10);
      gap(0.5);
    });

    addLine("Generated by Fancy Digitals — fancydigitals.com.ng", 8, false, [150, 150, 150]);
    doc.save(`website-audit-${audit.websiteName || "report"}.pdf`);
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* BG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/6 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#ff914d]/6 blur-[100px]" />
      </div>

      {/* HERO */}
      <section className="relative px-4 pt-20 pb-10 sm:pt-28 sm:pb-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#075a01]/20 bg-[#075a01]/5 px-3 py-1.5 mb-6">
            <Search className="h-3.5 w-3.5 text-[#075a01]" />
            <span className="text-xs font-bold text-[#075a01] uppercase tracking-wide">Free Website Audit Tool</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Find out why your website{" "}
            <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              isn&apos;t growing
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Full audit across 11 categories — SEO, speed, content, trust, conversion, messaging, competitor gaps, innovative ideas, and deep in-app UX analysis from your screenshots.
          </p>

          {/* Form */}
          <form onSubmit={handleAudit} className="mt-8 text-left max-w-2xl mx-auto space-y-4">
            {/* URL */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourdomain.com"
                  className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-3.5 text-sm font-medium text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#0a8f01] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Auditing...</>
                ) : (
                  <>Audit My Website<ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </div>

            {/* Screenshot Upload Section */}
            <div className="rounded-xl border border-[#075a01]/20 bg-[#075a01]/3 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowScreenshots(!showScreenshots)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#075a01]/5 transition"
              >
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#075a01]" />
                  <span className="text-xs font-bold text-[#075a01]">
                    Add screenshots for deeper in-app UX analysis
                    {screenshots.length > 0 && (
                      <span className="ml-2 rounded-full bg-[#075a01] text-white px-1.5 py-0.5 text-[10px]">
                        {screenshots.length}
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-bold text-white bg-[#ff914d] px-1.5 py-0.5 rounded">NEW</span>
                </div>
                {showScreenshots ? <ChevronUp className="h-4 w-4 text-[#075a01]" /> : <ChevronDown className="h-4 w-4 text-[#075a01]" />}
              </button>

              {showScreenshots && (
                <div className="border-t border-[#075a01]/10 p-4 space-y-4">
                  {/* Guide */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-1">
                      What to screenshot for the best analysis:
                    </p>
                    <p className="text-[11px] text-gray-500 mb-3">
                      Take screenshots of these screens and upload them below. The AI will analyze each one and give you specific feedback.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SCREENSHOT_GUIDE.map((g, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-lg bg-white border border-gray-100 p-2.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#075a01]/10 text-[10px] font-black text-[#075a01]">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-gray-800">{g.label}</p>
                            <p className="text-[10px] text-gray-500">{g.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload buttons per label */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2">
  Upload your screenshots ({isPro ? "up to 20 for Pro" : "max 6 free"}, 4MB each):
  {!isPro && (
    <Link href="/pricing" className="ml-1 text-[#075a01] underline text-[10px]">
      Upgrade for more
    </Link>
  )}
</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SCREENSHOT_GUIDE.map((g, i) => {
                        const uploaded = screenshots.find((s) => s.label === g.label);
                        return (
                          <label
                            key={i}
                            className={`relative flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed p-3 cursor-pointer transition text-center ${
                              uploaded
                                ? "border-[#075a01] bg-[#075a01]/5"
                                : "border-gray-200 hover:border-[#075a01]/50 bg-white"
                            }`}
                          >
                            <input
  type="file"
  accept="image/*"
  multiple={isPro}
  className="hidden"
  onChange={(e) => handleScreenshotUpload(e, g.label)}
/>
                          {uploaded ? (
                              <>
                                <CheckCircle2 className="h-5 w-5 text-[#075a01]" />
                                <p className="text-[10px] font-bold text-[#075a01] leading-tight">{g.label}</p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeScreenshot(screenshots.findIndex((s) => s.label === g.label));
                                  }}
                                  className="text-[10px] text-red-500 hover:underline"
                                >
                                  Remove
                                </button>
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4 text-gray-400" />
                                <p className="text-[10px] font-bold text-gray-600 leading-tight">{g.label}</p>
                              </>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {screenshots.length > 0 && (
                    <p className="text-[11px] text-[#075a01] font-semibold">
                      {screenshots.length} screenshot{screenshots.length > 1 ? "s" : ""} ready — AI will analyze each one in detail.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Advanced Options */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#075a01] transition"
            >
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {showAdvanced ? "Hide" : "Add"} competitor URLs & social platforms (optional)
            </button>

            {showAdvanced && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4 shadow-sm">
                {/* Competitors */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">Competitor websites to compare against (up to 3)</p>
                  <div className="space-y-2">
                    {competitors.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                          <input
                            type="text"
                            value={c}
                            onChange={(e) => updateCompetitor(i, e.target.value)}
                            placeholder={`competitor${i + 1}.com`}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 py-2.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#075a01] focus:outline-none"
                          />
                        </div>
                        {competitors.length > 1 && (
                          <button type="button" onClick={() => removeCompetitor(i)} className="text-gray-400 hover:text-red-500 transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {competitors.length < 3 && (
                    <button type="button" onClick={addCompetitor} className="mt-2 flex items-center gap-1 text-xs font-bold text-[#075a01] hover:underline">
                      <Plus className="h-3.5 w-3.5" />
                      Add another competitor
                    </button>
                  )}
                </div>

                {/* Messaging Apps */}
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-2">Which platforms does this business use?</p>
                  <div className="flex flex-wrap gap-2">
                    {MESSAGING_OPTIONS.map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => toggleMessaging(app)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition ${
                          messagingApps.includes(app)
                            ? "bg-[#075a01] text-white border-[#075a01]"
                            : "bg-white text-gray-600 border-gray-200 hover:border-[#075a01]"
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 text-center">
              1 free audit · No sign-up required · Takes 30–90 seconds
            </p>
          </form>

          {/* Loading */}
          {loading && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#075a01]/5 border border-[#075a01]/20 px-4 py-2.5">
              <Loader2 className="h-4 w-4 text-[#075a01] animate-spin shrink-0" />
              <p className="text-sm font-medium text-[#075a01]">{step}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5">
              <XCircle className="h-4 w-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
              {error.includes("Sign in") && (
                <Link href="/signin" className="ml-2 text-sm font-bold text-[#075a01] underline">
                  Sign in free
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* RESULTS */}
      {result && (
        <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl space-y-6">

            {/* Overall Score */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreRing score={result.audit.overallScore} grade={result.audit.overallGrade} size="lg" />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h2 className="text-xl font-black text-gray-900">{result.audit.websiteName || result.meta.url}</h2>
                    <span className="inline-flex self-center items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
                      {result.audit.websiteType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{result.audit.websiteIntent}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{result.audit.overallSummary}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
  {result.shareId && (
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/audit/${result.shareId}`);
        alert("Share link copied to clipboard!");
      }}
      className="inline-flex items-center gap-2 rounded-xl border border-[#075a01]/30 bg-[#075a01]/5 px-4 py-2.5 text-sm font-bold text-[#075a01] hover:bg-[#075a01]/10 shadow-sm transition"
    >
      <Share className="h-4 w-4" />
      Share
    </button>
  )}
  <button
    onClick={handleDownloadPDF}
    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition"
  >
    <Download className="h-4 w-4" />
    PDF Report
  </button>
</div>
              </div>

              {result.meta.pageSpeed && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-100">
                  {[
                    { label: "Performance", val: result.meta.pageSpeed.performance },
                    { label: "SEO", val: result.meta.pageSpeed.seo },
                    { label: "Accessibility", val: result.meta.pageSpeed.accessibility },
                    { label: "Best Practices", val: result.meta.pageSpeed.bestPractices },
                  ].map((s) => (
                    <div key={s.label} className="text-center rounded-lg bg-gray-50 p-3">
                      <p className="text-2xl font-black" style={{ color: s.val >= 90 ? "#075a01" : s.val >= 70 ? "#f59e0b" : "#ef4444" }}>
                        {s.val}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* UX Audit Results */}
            {result.uxAudit && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="h-5 w-5 text-indigo-500 shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-gray-900">In-App UX Analysis</h3>
                    <p className="text-xs text-gray-500">Based on your {result.meta.screenshotsAnalyzed} uploaded screenshot{result.meta.screenshotsAnalyzed > 1 ? "s" : ""}</p>
                  </div>
                  <div className="ml-auto">
                    <ScoreRing score={result.uxAudit.uxScore} grade={result.uxAudit.uxGrade} size="sm" />
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{result.uxAudit.uxSummary}</p>

                {/* Per screenshot insights */}
                {result.uxAudit.screenshotInsights?.length > 0 && (
                  <div className="space-y-3 mb-4">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Screenshot by screenshot:</p>
                    {result.uxAudit.screenshotInsights.map((insight, i) => (
                      <div key={i} className="rounded-xl bg-white border border-indigo-100 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ImageIcon className="h-4 w-4 text-indigo-400 shrink-0" />
                          <p className="text-xs font-bold text-gray-900">{insight.label}</p>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-2">{insight.whatWeSee}</p>
                        {insight.strengths?.length > 0 && (
                          <ul className="mb-2 space-y-1">
                            {insight.strengths.map((s, j) => (
                              <li key={j} className="flex items-start gap-1.5 text-[11px] text-green-700">
                                <CheckCircle2 className="h-3 w-3 shrink-0 mt-0.5" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                        {insight.issues?.length > 0 && (
                          <div className="space-y-2">
                            {insight.issues.map((issue, j) => (
                              <div key={j} className="rounded-lg bg-gray-50 p-2.5">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className={`text-[10px] font-bold px-1 py-0.5 rounded ${getSeverityBg(issue.severity)}`}>{issue.severity}</span>
                                  <p className="text-[11px] font-bold text-gray-800">{issue.issue}</p>
                                </div>
                                <p className="text-[10px] text-[#075a01]"><span className="font-bold">Fix:</span> {issue.fix}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* UX Innovative Ideas */}
                {result.uxAudit.uxInnovativeIdeas?.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">Innovative UX ideas:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.uxAudit.uxInnovativeIdeas.map((idea, i) => (
                        <div key={i} className="rounded-lg bg-white border border-indigo-100 p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-bold text-gray-900">{idea.title}</p>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 shrink-0 ${EFFORT_STYLES[idea.effort] || "bg-gray-100 text-gray-600"}`}>{idea.effort}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mb-1">{idea.description}</p>
                          <p className="text-[11px] text-indigo-600 font-semibold">{idea.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Features */}
                {result.uxAudit.missingFeatures?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">Features your app is missing:</p>
                    <ul className="space-y-1.5">
                      {result.uxAudit.missingFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <XCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Priority Fixes */}
            {result.audit.priorityFixes?.length > 0 && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                  <h3 className="text-base font-black text-gray-900">Top Priority Fixes</h3>
                </div>
                <div className="space-y-3">
                  {result.audit.priorityFixes.map((fix) => (
                    <div key={fix.rank} className="rounded-xl bg-white border border-red-100 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-600">{fix.rank}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getSeverityBg(fix.severity)}`}>{fix.severity}</span>
                            <span className="text-xs font-bold text-gray-500">{fix.category}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 mb-1">{fix.issue}</p>
                          <p className="text-xs text-[#075a01] mb-1"><span className="font-bold">Fix:</span> {fix.fix}</p>
                          <p className="text-xs text-gray-500"><span className="font-bold">Impact:</span> {fix.estimatedImpact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Innovative Ideas */}
            {result.audit.innovativeIdeas?.length > 0 && (
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-purple-500 shrink-0" />
                  <h3 className="text-base font-black text-gray-900">Innovative Ideas to Grow Faster</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.audit.innovativeIdeas.map((idea, i) => (
                    <div key={i} className="rounded-xl bg-white border border-purple-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-bold text-gray-900">{idea.title}</p>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-2 ${EFFORT_STYLES[idea.effort] || "bg-gray-100 text-gray-600"}`}>{idea.effort}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{idea.description}</p>
                      <p className="text-xs text-purple-700 font-semibold">{idea.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitor Comparison */}
            {result.audit.competitorComparison && (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="h-5 w-5 text-blue-500 shrink-0" />
                  <h3 className="text-base font-black text-gray-900">Competitor Comparison</h3>
                </div>
                <p className="text-sm text-gray-700 mb-4">{result.audit.competitorComparison.summary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-white border border-green-100 p-4">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Where you win</p>
                    <ul className="space-y-1.5">
                      {result.audit.competitorComparison.theyWinAt?.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-white border border-red-100 p-4">
                    <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-2">Where competitors win</p>
                    <ul className="space-y-1.5">
                      {result.audit.competitorComparison.competitorsWinAt?.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <XCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-blue-100 p-4">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Biggest gap to close</p>
                  <p className="text-sm text-gray-700 mb-2">{result.audit.competitorComparison.biggestGap}</p>
                  <p className="text-xs font-bold text-[#075a01]">How to win: {result.audit.competitorComparison.howToWin}</p>
                </div>
              </div>
            )}

            {/* Category Breakdown */}
            <div>
              <h3 className="text-base font-black text-gray-900 mb-3">Full Category Breakdown</h3>
              <div className="space-y-3">
                {result.audit.categories?.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
              </div>
            </div>

            {/* Quick Wins + Missing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.audit.quickWins?.length > 0 && (
                <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-green-600 shrink-0" />
                    <h3 className="text-sm font-black text-gray-900">Quick Wins</h3>
                  </div>
                  <div className="space-y-3">
                    {result.audit.quickWins.map((win, i) => (
                      <div key={i} className="rounded-lg bg-white border border-green-100 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-bold text-gray-900">{win.title}</p>
                          <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">{win.timeToFix}</span>
                        </div>
                        <p className="text-[11px] text-gray-500">{win.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.audit.missingElements?.length > 0 && (
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-5 w-5 text-orange-500 shrink-0" />
                    <h3 className="text-sm font-black text-gray-900">What You&apos;re Missing</h3>
                  </div>
                  <ul className="space-y-2">
                    {result.audit.missingElements.map((m, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <XCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />{m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-8 text-center">
              <h3 className="text-lg font-black text-white mb-2">Want us to fix all of this for you?</h3>
              <p className="text-sm text-white/80 mb-5">Our team builds and optimizes websites that rank, convert, and grow.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#075a01] hover:bg-gray-100 transition"
                >
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  <Download className="h-4 w-4" />
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
{!result && !loading && (
  <>
    <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Globe, title: "Enter your URL", desc: "Paste any website URL. We fetch the live page and run Google PageSpeed in real time." },
            { icon: Camera, title: "Upload app screenshots", desc: "Take screenshots of your dashboard, key features, pricing, and sign up screens for deep UX analysis." },
            { icon: Download, title: "Get your full report", desc: "Score, grade, priority fixes, UX insights, competitor comparison, innovative ideas, and PDF download." },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#075a01]/10">
                <s.icon className="h-5 w-5 text-[#075a01]" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WHAT WE AUDIT */}
    <section className="relative px-4 pb-16 sm:px-6 lg:px-10 bg-gray-50">
      <div className="mx-auto max-w-5xl py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            What our website audit checks
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
            11 categories. Real data from your live website. No guessing.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Search, title: "SEO & Discoverability", desc: "Page title, meta description, headings, schema markup, canonical tags — everything Google uses to rank your site." },
            { icon: Zap, title: "Speed & Loading", desc: "Real Google PageSpeed scores, LCP, FCP, blocking time — and exactly what to fix to make your site faster." },
            { icon: Smartphone, title: "Phone & Tablet Experience", desc: "Does your site work on mobile? We check viewport settings, mobile scores, and touch-friendliness." },
            { icon: MessageSquare, title: "Words & Messaging", desc: "Are your headlines clear? Does your copy explain what you do and why someone should care?" },
            { icon: Shield, title: "Trust & Credibility", desc: "Testimonials, team pages, SSL, contact info, FAQ — everything that makes a stranger trust your business." },
            { icon: TrendingUp, title: "Getting People to Act", desc: "CTAs, buttons, forms, and the flow that guides visitors from landing to contacting or buying." },
            { icon: Star, title: "Brand & First Impression", desc: "Does your site look professional? OG images, visual consistency, and whether it feels like a real business." },
            { icon: Users, title: "Reviews & Social Proof", desc: "We check for testimonials, ratings, case studies, and client logos — proof that real people trust you." },
            { icon: Eye, title: "AI & Modern Search", desc: "Schema markup, content depth, entity clarity — everything that makes ChatGPT, Gemini, and Perplexity recommend your business." },
            { icon: MessageSquare, title: "WhatsApp & Social", desc: "Are you using WhatsApp, Instagram, or other platforms to connect with customers? We audit your social presence." },
            { icon: BarChart2, title: "Competitor Gap Analysis", desc: "We fetch and analyze your competitor sites to show exactly what they do better — and how to beat them." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#075a01]/10">
                <item.icon className="h-5 w-5 text-[#075a01]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WHO IT'S FOR */}
    <section className="relative px-4 pb-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Who uses the free website audit tool
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Business owners", desc: "Find out why your website isn't bringing in customers — and get a clear plan to fix it." },
            { title: "Startup founders", desc: "Validate your site before launch. Get an honest score and fix the biggest problems first." },
            { title: "Marketing managers", desc: "Audit any site in seconds. Get data for your next strategy meeting or client presentation." },
            { title: "SEO professionals", desc: "Run a full technical and content audit with real PageSpeed data, schema checks, and competitor analysis." },
            { title: "Agencies", desc: "Audit client websites, generate shareable reports, and show the value of your work with before/after scores." },
            { title: "App developers", desc: "Upload screenshots of your app for deep UX analysis — specific feedback on every screen from AI." },
          ].map((u) => (
            <div key={u.title} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-[#075a01] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-sm">{u.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="relative px-4 pb-16 sm:px-6 lg:px-10 bg-gray-50">
      <div className="mx-auto max-w-3xl py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Is this website audit tool really free?",
              a: "Yes. 1 free audit per day with no sign-up required. Create a free account for more audits. Pro users get unlimited audits, shareable reports, and audit history.",
            },
            {
              q: "How is this different from Google PageSpeed Insights?",
              a: "Google PageSpeed only measures technical performance. Our tool audits 11 categories including content, trust, conversion, brand, social proof, competitor gaps, and innovative growth ideas — then explains everything in plain English with specific fixes.",
            },
            {
              q: "How accurate is the audit?",
              a: "Very accurate. We fetch your live website, extract real data — actual page titles, headings, trust signals, CTAs, images — and run Google PageSpeed in real time. The AI analysis is based on this real data, not guesses.",
            },
            {
              q: "Can I audit competitor websites?",
              a: "Yes. Add up to 3 competitor URLs and we fetch and analyze all of them. The report shows exactly what competitors do better and how to close the gap.",
            },
            {
              q: "What is the screenshot UX analysis?",
              a: "Upload screenshots of your app or website interior — dashboard, key features, pricing page, onboarding. Our AI analyzes every screen in detail and gives specific feedback on layout, buttons, messaging, missing features, and innovative ideas.",
            },
            {
              q: "Can I share my audit report?",
              a: "Yes. Every audit generates a shareable link you can send to your team, clients, or developer. No login required to view a shared report.",
            },
            {
              q: "How long does the audit take?",
              a: "Usually 30–60 seconds for a standard audit. With screenshots and competitor analysis, up to 90 seconds. We run everything in parallel to keep it as fast as possible.",
            },
            {
              q: "Can I download my audit as a PDF?",
              a: "Yes. Click the PDF Report button after your audit completes. The PDF includes all scores, priority fixes, competitor comparison, innovative ideas, and UX analysis.",
            },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-1.5">{faq.q}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ff914d]/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 mb-4">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to audit your website?
            </h2>
            <p className="mt-3 text-sm text-white/80 sm:text-base max-w-md mx-auto">
              Free. No sign-up required. Get your full score, priority fixes, and growth ideas in under 60 seconds.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] shadow-lg hover:bg-gray-100 active:scale-95 transition-all"
            >
              Audit My Website Free
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
)}
    </main>
  );
}