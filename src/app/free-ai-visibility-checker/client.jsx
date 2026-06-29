"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ChevronRight,
  Globe,
  Zap,
  Shield,
  FileCode,
  Tag,
  FileText,
  Smartphone,
  Brain,
  Award,
  Network,
  ArrowRight,
  Lock,
  Bot,
  Eye,
  Target,
  Send,
  Building2,
  KeyRound,
  Briefcase,
} from "lucide-react";

const SCORE_ICONS = {
  technicalSEO: Shield,
  schema: FileCode,
  metaTags: Tag,
  content: FileText,
  performance: Zap,
  mobile: Smartphone,
  knowledgeGraph: Network,
  entityClarity: Brain,
  aiReadability: Sparkles,
  trustSignals: Award,
};

const SCORE_LABELS = {
  technicalSEO: "Technical SEO",
  schema: "Schema / Structured Data",
  metaTags: "Meta Tags",
  content: "Content Quality",
  performance: "Performance",
  mobile: "Mobile / Accessibility",
  knowledgeGraph: "Knowledge Graph",
  entityClarity: "Entity Clarity",
  aiReadability: "AI Readability",
  trustSignals: "Trust Signals",
};

const PRIORITY_STYLE = {
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "Critical" },
  high: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", label: "High" },
  medium: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", label: "Medium" },
  low: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", label: "Low" },
};

const INDUSTRIES = [
  "E-commerce",
  "Healthcare",
  "Finance & Fintech",
  "Education",
  "Real Estate",
  "Technology / SaaS",
  "Legal",
  "Hospitality & Travel",
  "Food & Beverage",
  "Fashion & Beauty",
  "Logistics & Supply Chain",
  "Media & Entertainment",
  "Non-profit",
  "Construction & Engineering",
  "Other",
];

function scoreColor(s) {
  if (s >= 80) return "text-green-600";
  if (s >= 60) return "text-yellow-600";
  if (s >= 40) return "text-orange-600";
  return "text-red-600";
}
function scoreRingColor(s) {
  if (s >= 80) return "#16a34a";
  if (s >= 60) return "#ca8a04";
  if (s >= 40) return "#ea580c";
  return "#dc2626";
}
function scoreBgColor(s) {
  if (s >= 80) return "bg-green-100";
  if (s >= 60) return "bg-yellow-100";
  if (s >= 40) return "bg-orange-100";
  return "bg-red-100";
}

const FAQS = [
  {
    q: "What is AI recommendation readiness?",
    a: "AI recommendation readiness measures how likely AI assistants like ChatGPT, Gemini, Claude, and Perplexity are to recommend or cite your business when users ask them questions. It depends on signals like schema markup, content quality, entity clarity, and Knowledge Graph presence.",
  },
  {
    q: "Is this really free?",
    a: "Yes. You get 1 free scan per day with no signup required. Sign up free to get 3 scans per day, or upgrade to Pro for unlimited scans and a full improvement plan.",
  },
  {
    q: "How does it work?",
    a: "We analyze your website across 10 signals AI assistants use to evaluate businesses: technical SEO, structured data, meta tags, content quality, page speed, mobile experience, Knowledge Graph presence, entity clarity, AI readability, and trust signals.",
  },
  {
    q: "Why does AI recommendation matter?",
    a: "Modern users increasingly ask AI assistants for recommendations instead of using traditional Google search. If your business isn't optimized for AI recommendation, you're invisible to a growing share of potential customers.",
  },
  {
    q: "What is GEO (Generative Engine Optimization)?",
    a: "GEO is the practice of optimizing your website to be recommended by generative AI assistants. Unlike traditional SEO which targets search rankings, GEO targets being cited as a source by AI models.",
  },
];

export default function FreeAIVisibilityClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [requiresSignup, setRequiresSignup] = useState(false);

  async function handleScan(e) {
    e?.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);
    setRequiresSignup(false);

    try {
      const res = await fetch("/api/public/ai-visibility-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Scan failed");
        if (data.requiresSignup) setRequiresSignup(true);
        return;
      }
      setResult(data.result);
      setTimeout(() => {
        document.getElementById("scan-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#075a01]/8 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-[#ff914d]/8 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#075a01]/20 bg-[#075a01]/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-[#075a01]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#075a01]">Free GEO Tool · No Signup Required</span>
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-900 md:text-6xl">
            Is your business
            <span className="bg-gradient-to-r from-[#075a01] via-[#0a8f01] to-[#ff914d] bg-clip-text text-transparent"> recommended by AI</span>?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Get your free <strong>AI Recommendation Score</strong> in 30 seconds.
            See exactly how well your site is prepared to be understood, parsed, and recommended by AI assistants like ChatGPT, Gemini, and Perplexity.
          </p>

          {/* AI logos row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
            <span>Analyzed for:</span>
            <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />ChatGPT</span>
            <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />Gemini</span>
            <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />Claude</span>
            <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />Perplexity</span>
            <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5" />Copilot</span>
          </div>

          {/* SCAN FORM */}
          <form onSubmit={handleScan} className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="w-full rounded-xl bg-white py-3 pl-11 pr-4 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Check Now Free
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              1 free scan per day · No signup required · Results in 30 seconds
            </p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{error}</p>
                    {requiresSignup && (
                      <Link href="/signup" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-800 underline">
                        Sign up free for 3 scans/day
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 text-left text-sm text-gray-600">
                <p className="font-medium">Analyzing across 10 AI recommendation signals...</p>
                <p className="mt-1 text-xs text-gray-500">Running PageSpeed analysis, parsing schema, checking Knowledge Graph. Takes 20–45 seconds.</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── RESULT + BOOST FORM ── */}
      {result && (
        <section id="scan-result" className="bg-gray-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl space-y-8">

            <ScanResult result={result} />

            {/* ── BOOST FORM ── */}
            <BoostForm scannedUrl={url} score={result.overall} />

            {/* Upgrade CTA */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-8 text-center shadow-2xl md:p-12">
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-[#ff914d]" />
              <h3 className="text-2xl font-black text-white md:text-3xl">Want unlimited scans + auto-fix tools?</h3>
              <p className="mx-auto mt-3 max-w-xl text-white/80">
                Upgrade to Pro for unlimited AI recommendation scans, schema generators, and one-click optimizations.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Sign Up Free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
                >
                  See Pricing
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">How It Works</p>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              10 signals. One score.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              We measure your site across every signal modern AI assistants use to recommend businesses.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { Icon: Shield, label: "Technical SEO" },
              { Icon: FileCode, label: "Structured Data" },
              { Icon: Tag, label: "Meta Tags" },
              { Icon: FileText, label: "Content" },
              { Icon: Zap, label: "Performance" },
              { Icon: Smartphone, label: "Mobile" },
              { Icon: Network, label: "Knowledge Graph" },
              { Icon: Brain, label: "Entity Clarity" },
              { Icon: Sparkles, label: "AI Readability" },
              { Icon: Award, label: "Trust Signals" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#075a01]/10">
                  <Icon className="h-5 w-5 text-[#075a01]" />
                </div>
                <p className="text-xs font-bold text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MATTERS ── */}
      <section className="bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#075a01]">Why It Matters</p>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Search is changing. Fast.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Eye,
                title: "AI is the new search",
                desc: "Over 1 billion people now ask AI assistants instead of Googling. If you're not AI-recommended, you're invisible.",
              },
              {
                Icon: Target,
                title: "Recommendations beat rankings",
                desc: "AI doesn't show 10 blue links — it picks one or two businesses to recommend. Be one of them.",
              },
              {
                Icon: TrendingUp,
                title: "Early movers win big",
                desc: "Most businesses haven't optimized for AI recommendation yet. The window to dominate your niche is open right now.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff914d]">FAQ</p>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Common questions.
            </h2>
          </div>

          <dl className="mt-12 space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <dt className="text-sm font-bold text-gray-900 md:text-base">{faq.q}</dt>
                  <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500 transition-all group-open:rotate-45 group-open:bg-[#075a01] group-open:text-white">
                    +
                  </span>
                </summary>
                <dd className="mt-4 text-sm leading-relaxed text-gray-600">{faq.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gray-50 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-[#075a01] p-10 text-center shadow-2xl md:p-16">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Ready to be recommended by AI?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Sign up free for 3 scans per day, or go Pro for unlimited scans + auto-fix tools.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#075a01] shadow-lg transition-all hover:-translate-y-0.5"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                See Pro Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// ─── BOOST FORM ──────────────────────────────────────────────────────────────
function BoostForm({ scannedUrl, score }) {
  const [form, setForm] = useState({
    businessName: "",
    website: scannedUrl || "",
    industry: "",
    targetKeywords: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.businessName || !form.website || !form.email) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/ai-recommendation/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Submission failed. Try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="text-xl font-black text-green-900">Request Received!</h3>
        <p className="mt-2 text-sm text-green-700">
          We will review your site and reach out to you at <strong>{form.email}</strong> with a personalized AI recommendation strategy.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#075a01]/20 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-6 md:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Get Your Business Recommended by AI
            </h3>
            <p className="mt-1 text-sm text-white/80">
              {score < 60
                ? `Your score is ${score}/100. Our team can help you fix this.`
                : `Your score is ${score}/100. Let's push it higher.`}
              {" "}Fill the form below and we'll reach out with a personalized strategy.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Business Name */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Business Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Acme Nigeria Ltd"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
                required
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Website <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="yourwebsite.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
                required
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Industry
            </label>
            <div className="relative">
              <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Send className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
                required
              />
            </div>
          </div>
        </div>

        {/* Target Keywords — full width */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-gray-700">
            Target Keywords / Queries
          </label>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <textarea
              name="targetKeywords"
              value={form.targetKeywords}
              onChange={handleChange}
              placeholder="e.g. best logistics company in Lagos, fast delivery Nigeria"
              rows={3}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20 resize-none"
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500">What questions do you want AI to recommend you for?</p>
        </div>

        {formError && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff914d] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#e8833d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Target className="h-4 w-4" />
              Request AI Recommendation Boost
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          No payment required. Our team will contact you within 24 hours.
        </p>
      </form>
    </div>
  );
}

// ─── RESULT COMPONENT ────────────────────────────────────────────────────────
function ScanResult({ result }) {
  const { overall, scores, signals, recommendations, domain } = result;

  const sortedRecs = [...recommendations].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-6">
      {/* Overall score */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid items-center gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8">
          <ScoreRing score={overall} size={160} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">AI Recommendation Score for</p>
            <h2 className="mt-1 text-2xl font-black text-gray-900 md:text-3xl">{domain}</h2>
            <p className={`mt-2 text-base font-bold ${scoreColor(overall)}`}>
              {overall >= 80 && "Excellent — AI assistants can easily recommend your site."}
              {overall >= 60 && overall < 80 && "Good — but key signals are missing."}
              {overall >= 40 && overall < 60 && "Needs work — AI struggles to parse your site."}
              {overall < 40 && "Critical — AI assistants are unlikely to recommend you."}
            </p>
          </div>
        </div>
      </div>

      {/* Signal breakdown */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-gray-900">Signal Breakdown</h3>
        <p className="mb-6 text-sm text-gray-500">How your site scored across 10 AI recommendation signals.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(scores).map(([key, score]) => {
            const Icon = SCORE_ICONS[key] || Sparkles;
            return (
              <div key={key} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${scoreBgColor(score)}`}>
                  <Icon className={`h-4 w-4 ${scoreColor(score)}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-gray-700">{SCORE_LABELS[key]}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: scoreRingColor(score) }} />
                    </div>
                    <span className={`text-sm font-black ${scoreColor(score)}`}>{score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top recommendations */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="mb-1 text-lg font-bold text-gray-900">Top Improvements</h3>
        <p className="mb-6 text-sm text-gray-500">Your highest-impact actions to get recommended by AI.</p>

        {sortedRecs.length === 0 ? (
          <div className="rounded-xl bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" />
            <p className="font-bold text-green-900">No critical issues found.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {sortedRecs.slice(0, 3).map((rec, i) => {
                const style = PRIORITY_STYLE[rec.priority];
                return (
                  <div key={i} className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} p-4`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ${style.text}`}>
                      {rec.priority === "critical" && <XCircle className="h-4 w-4" />}
                      {rec.priority === "high" && <AlertCircle className="h-4 w-4" />}
                      {rec.priority === "medium" && <TrendingUp className="h-4 w-4" />}
                      {rec.priority === "low" && <ChevronRight className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1">
                        <span className={`rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                          {style.label}
                        </span>
                      </div>
                      <p className="font-bold text-gray-900">{rec.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{rec.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {sortedRecs.length > 3 && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-[#ff914d]" />
                  <span>
                    <strong className="text-gray-900">{sortedRecs.length - 3} more recommendations</strong> available
                  </span>
                </div>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#075a01] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#0a8f01]"
                >
                  Sign up to view
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ScoreRing({ score, size = 160 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreRingColor(score);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black" style={{ color }}>{score}</span>
        <span className="text-xs font-semibold text-gray-400">out of 100</span>
      </div>
    </div>
  );
}