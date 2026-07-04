"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  Users,
  PlaySquare,
  ListChecks,
} from "lucide-react";

const BUDGETS = [
  "Under ₦5,000/day",
  "₦5,000 – ₦20,000/day",
  "₦20,000 – ₦50,000/day",
  "₦50,000 – ₦150,000/day",
  "₦150,000+/day",
];

const FORM_KEY = "meta_ads_simple_form";

const defaultForm = {
  business: "",
  selling: "",
  location: "",
  budget: "",
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors"
      style={{
        borderColor: copied ? "#075a01" : "#d1d5db",
        color: copied ? "#075a01" : "#6b7280",
        backgroundColor: copied ? "#f0fdf4" : "white",
      }}
    >
      {copied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
    </button>
  );
}

function ResultCard({ icon: Icon, title, content }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#075a01" }}
      >
        <div className="flex items-center gap-2">
          <Icon size={16} color="white" />
          <span className="text-sm font-bold text-white">{title}</span>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="px-4 py-4">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}

export default function MetaAdsStudioClient() {
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return defaultForm;
    try {
      const saved = localStorage.getItem(FORM_KEY);
      return saved ? { ...defaultForm, ...JSON.parse(saved) } : defaultForm;
    } catch {
      return defaultForm;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      try {
        localStorage.setItem(FORM_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }

  function validate() {
    if (!form.business.trim()) return "Tell us what your business is.";
    if (!form.selling.trim()) return "Tell us what you are promoting.";
    if (!form.location.trim()) return "Tell us where your customers are.";
    if (!form.budget) return "Select your daily budget.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);

    try {
      // Map simple form to what the API expects
      const payload = {
        businessName: form.business,
        businessDescription: form.business,
        productService: form.selling,
        targetAudience: "general audience",
        campaignGoal: "Sales",
        budget: form.budget,
        location: form.location,
        additionalContext: `Give me a very simple, plain English playbook. No jargon. No complex terms. Just tell me: 1) exactly who to target in simple words, 2) what ads to run with the full ad copy written out ready to paste, 3) a simple numbered step by step plan of what to do first second and third. Keep everything simple enough for a complete beginner.`,
      };

      const response = await fetch("/api/admin/meta-ads/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      const strategy = data.strategy;

      // Extract the 3 sections we care about in plain text
      const whoToTarget = buildWhoToTarget(strategy);
      const adsToRun = buildAdsToRun(strategy);
      const stepByStep = buildStepByStep(strategy);

      setResult({ whoToTarget, adsToRun, stepByStep });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-6 md:px-8" style={{ backgroundColor: "#075a01" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} color="white" />
            <h1 className="text-base font-bold text-white">Meta Ads Studio</h1>
          </div>
          <p className="text-sm text-green-200 ml-6">
            Answer 4 questions. Get a simple ads plan.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:px-8">
        {/* Form */}
        {!result && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">

              {/* Business */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  What is your business?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder="e.g. Fancy Digitals — we help businesses grow online with AI tools"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  disabled={loading}
                />
              </div>

              {/* Selling */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  What are you promoting?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="selling"
                  value={form.selling}
                  onChange={handleChange}
                  placeholder="e.g. Our AI content generator tool"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  disabled={loading}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Where are your customers?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Lagos, Nigeria"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  disabled={loading}
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  What is your daily budget?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  disabled={loading}
                >
                  <option value="">Select your budget</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold text-white disabled:opacity-70 transition-opacity"
              style={{ backgroundColor: "#075a01" }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />Building your ads plan...</>
              ) : (
                <><Sparkles size={16} />Build My Ads Plan</>
              )}
            </button>

            {loading && (
              <p className="text-center text-xs text-gray-400">
                Takes about 20–30 seconds. Please wait.
              </p>
            )}
          </form>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">
                Your Ads Plan
              </h2>
              <button
                onClick={handleReset}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors"
              >
                Start Over
              </button>
            </div>

            <ResultCard
              icon={Users}
              title="Who to Target"
              content={result.whoToTarget}
            />

            <ResultCard
              icon={PlaySquare}
              title="What Ads to Run"
              content={result.adsToRun}
            />

            <ResultCard
              icon={ListChecks}
              title="Step by Step Plan"
              content={result.stepByStep}
            />

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-white"
              style={{ backgroundColor: "#075a01" }}
            >
              Build Another Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helpers to extract plain text from AI response ───────────────────────────

function buildWhoToTarget(strategy) {
  const lines = [];

  if (Array.isArray(strategy?.audiences)) {
    strategy.audiences.forEach((a, i) => {
      lines.push(`Audience ${i + 1}: ${a.name}`);
      if (a.demographics?.age) lines.push(`Age: ${a.demographics.age}`);
      if (a.demographics?.location) lines.push(`Location: ${a.demographics.location}`);
      if (Array.isArray(a.interests) && a.interests.length > 0) {
        lines.push(`Interests: ${a.interests.slice(0, 5).join(", ")}`);
      }
      if (Array.isArray(a.behaviors) && a.behaviors.length > 0) {
        lines.push(`Behaviors: ${a.behaviors.join(", ")}`);
      }
      if (a.budgetAllocation) lines.push(`Give this audience: ${a.budgetAllocation} of your budget`);
      lines.push("");
    });
  }

  if (lines.length === 0) {
    return "No audience data was returned. Try generating again.";
  }

  return lines.join("\n").trim();
}

function buildAdsToRun(strategy) {
  const lines = [];

  const adCopy = strategy?.adCopy;
  const creative = strategy?.creative;

  if (Array.isArray(adCopy?.headlines) && adCopy.headlines.length > 0) {
    lines.push("HEADLINES (use one of these):");
    adCopy.headlines.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
    lines.push("");
  }

  if (Array.isArray(adCopy?.primaryTexts) && adCopy.primaryTexts.length > 0) {
    lines.push("AD COPY (what to write in your ad):");
    adCopy.primaryTexts.slice(0, 3).forEach((pt, i) => {
      const text = typeof pt === "string" ? pt : pt.fullText || pt.hook;
      lines.push(`\nOption ${i + 1}:\n${text}`);
    });
    lines.push("");
  }

  if (Array.isArray(adCopy?.ctaButtons) && adCopy.ctaButtons.length > 0) {
    lines.push(`CALL TO ACTION BUTTON: ${adCopy.ctaButtons[0]}`);
    lines.push("");
  }

  if (Array.isArray(creative?.videoHooks) && creative.videoHooks.length > 0) {
    lines.push("IF YOU'RE MAKING A VIDEO, START WITH:");
    creative.videoHooks.slice(0, 3).forEach((h, i) => {
      const hook = typeof h === "string" ? h : h.hook;
      lines.push(`${i + 1}. "${hook}"`);
    });
    lines.push("");
  }

  if (lines.length === 0) {
    return "No ad copy was returned. Try generating again.";
  }

  return lines.join("\n").trim();
}

function buildStepByStep(strategy) {
  const lines = [];

  const plan = strategy?.testingPlan;
  const wins = strategy?.quickWins;
  const kills = strategy?.killMetrics;

  if (Array.isArray(wins) && wins.length > 0) {
    lines.push("START HERE — Do these first:");
    wins.forEach((w, i) => lines.push(`${i + 1}. ${w}`));
    lines.push("");
  }

  if (plan?.phase1) {
    lines.push(`STEP ${lines.length > 0 ? "NEXT" : "1"} — ${plan.phase1.focus} (${plan.phase1.duration})`);
    lines.push(plan.phase1.test);
    lines.push(`Budget: ${plan.phase1.budget}`);
    lines.push("");
  }

  if (plan?.phase2) {
    lines.push(`STEP AFTER — ${plan.phase2.focus} (${plan.phase2.duration})`);
    lines.push(plan.phase2.test);
    lines.push(`Budget: ${plan.phase2.budget}`);
    lines.push("");
  }

  if (plan?.phase3) {
    lines.push(`FINAL STEP — ${plan.phase3.focus}`);
    lines.push(plan.phase3.test);
    lines.push("");
  }

  if (kills) {
    lines.push(`STOP AN AD IF: ${kills.afterSpend} passes and you see no results.`);
    if (Array.isArray(kills.killIf) && kills.killIf.length > 0) {
      lines.push(`Signs to stop: ${kills.killIf.slice(0, 2).join(". ")}`);
    }
  }

  if (lines.length === 0) {
    return "No plan was returned. Try generating again.";
  }

  return lines.join("\n").trim();
}