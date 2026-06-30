"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ExternalLink,
  Zap,
} from "lucide-react";

const QUICK_URLS = [
  { label: "Homepage", url: "https://fancydigitals.com.ng" },
  { label: "Tools Page", url: "https://fancydigitals.com.ng/tools" },
  { label: "Pricing", url: "https://fancydigitals.com.ng/pricing" },
  { label: "About", url: "https://fancydigitals.com.ng/about" },
  { label: "Portfolio", url: "https://fancydigitals.com.ng/portfolio" },
  { label: "Blog", url: "https://fancydigitals.com.ng/blog" },
  { label: "Resume Hub", url: "https://fancydigitals.com.ng/resume-for" },
  { label: "Cover Letter Hub", url: "https://fancydigitals.com.ng/cover-letter-for" },
  { label: "AI Resume Builder", url: "https://fancydigitals.com.ng/free-ai-resume-builder" },
  { label: "AI Cover Letter", url: "https://fancydigitals.com.ng/free-ai-cover-letter" },
  { label: "AI Landing Page", url: "https://fancydigitals.com.ng/free-ai-landing-page-generator" },
  { label: "AI Visibility Checker", url: "https://fancydigitals.com.ng/free-ai-visibility-checker" },
];

export default function IndexingClient() {
  const [urlsInput, setUrlsInput] = useState("");
  const [type, setType] = useState("URL_UPDATED");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function addQuickUrl(url) {
    setUrlsInput((prev) => {
      const lines = prev.split("\n").filter((l) => l.trim());
      if (lines.includes(url)) return prev;
      return [...lines, url].join("\n");
    });
  }

  function addAllQuickUrls() {
    const allUrls = QUICK_URLS.map((q) => q.url);
    setUrlsInput(allUrls.join("\n"));
  }

  async function handleSubmit() {
    setError("");
    setResult(null);

    const urls = urlsInput
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u && /^https?:\/\//.test(u));

    if (urls.length === 0) {
      setError("Add at least one valid URL");
      return;
    }

    if (urls.length > 100) {
      setError("Max 100 URLs per batch (Google quota limit)");
      return;
    }

    if (!confirm(`Notify Google about ${urls.length} URL(s)?\n\nThis counts against your daily quota (200/day free tier).`)) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/indexing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, type }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Indexing failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <Link
          href="/dashboard/admin"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#075a01]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to admin
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                Google Indexing
              </h1>
              <p className="mt-1 text-gray-500">
                Instantly notify Google about new or updated pages.
              </p>
            </div>
          </div>
        </div>

        {/* INFO CARD */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#075a01]/5 to-[#0a8f01]/5 border border-[#075a01]/20 p-5">
          <p className="text-sm font-bold text-[#075a01] mb-2">🚀 How this works</p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li>• Submits URLs to Google Indexing API for instant crawling</li>
            <li>• Pages typically get indexed within hours (not weeks)</li>
            <li>• Daily quota: <strong>200 requests/day</strong> (free tier)</li>
            <li>• Blog posts and portfolio projects auto-notify when published</li>
          </ul>
        </div>

        {/* QUICK URLs */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Quick add URLs</h2>
            <button
              onClick={addAllQuickUrls}
              className="text-xs font-bold text-[#075a01] hover:underline"
            >
              Add all 12 URLs
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {QUICK_URLS.map((q) => (
              <button
                key={q.url}
                onClick={() => addQuickUrl(q.url)}
                className="text-left px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-[#075a01]/10 hover:text-[#075a01] rounded-lg transition border border-gray-100"
              >
                + {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <label className="block text-sm font-bold text-gray-900 mb-2">
            URLs to submit (one per line)
          </label>
          <textarea
            value={urlsInput}
            onChange={(e) => setUrlsInput(e.target.value)}
            placeholder="https://fancydigitals.com.ng/blog/your-post&#10;https://fancydigitals.com.ng/portfolio/your-project"
            rows={8}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono outline-none focus:border-[#075a01] focus:bg-white"
          />
          <div className="flex items-center justify-between mt-2 text-xs">
            <p className="text-gray-500">
              {urlsInput.split("\n").filter((u) => u.trim() && /^https?:\/\//.test(u.trim())).length} valid URL(s)
            </p>
            <button
              onClick={() => setUrlsInput("")}
              className="text-red-500 hover:underline font-semibold"
            >
              Clear
            </button>
          </div>

          {/* Type selector */}
          <div className="mt-4">
            <label className="block text-xs font-bold text-gray-700 mb-2">Action type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setType("URL_UPDATED")}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                  type === "URL_UPDATED"
                    ? "bg-[#075a01] text-white"
                    : "border border-gray-200 bg-gray-50 text-gray-700 hover:border-[#075a01]/30"
                }`}
              >
                ✅ URL Updated/New
              </button>
              <button
                onClick={() => setType("URL_DELETED")}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                  type === "URL_DELETED"
                    ? "bg-red-600 text-white"
                    : "border border-gray-200 bg-gray-50 text-gray-700 hover:border-red-300"
                }`}
              >
                🗑️ URL Deleted
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading || !urlsInput.trim()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-4 text-sm font-bold text-white shadow-md hover:bg-[#0a8f01] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting to Google...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit to Google Indexing API
            </>
          )}
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="font-bold text-green-900">Submission complete</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Total</p>
                <p className="text-2xl font-black text-gray-900">{result.total || 1}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Successful</p>
                <p className="text-2xl font-black text-green-600">{result.successful ?? (result.success ? 1 : 0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase">Failed</p>
                <p className="text-2xl font-black text-red-600">{result.failed ?? (result.success ? 0 : 1)}</p>
              </div>
            </div>

            {result.results && result.results.length > 0 && (
              <details className="mt-4">
                <summary className="cursor-pointer text-xs font-bold text-gray-700">View details</summary>
                <ul className="mt-2 space-y-1 text-xs">
                  {result.results.map((r, idx) => (
                    <li key={idx} className={r.success ? "text-green-700" : "text-red-700"}>
                      {r.success ? "✅" : "❌"} {r.url} {r.error && `— ${r.error}`}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}