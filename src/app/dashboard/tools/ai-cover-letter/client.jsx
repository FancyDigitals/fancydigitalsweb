"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Loader2,
  Download,
  AlertCircle,
  Zap,
  ArrowLeft,
  Sparkles,
  FileText,
  User,
  Copy,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

export default function CoverLetterClient({
  isPro,
  initialUsage,
  limit,
  userEmail,
  userName,
  prefillData,
}) {
  const [form, setForm] = useState({
    fullName: prefillData?.fullName || userName || "",
    email: prefillData?.email || userEmail || "",
    phone: prefillData?.phone || "",
    location: prefillData?.location || "",
    targetRole: prefillData?.targetRole || "",
    targetCompany: "",
    hiringManagerName: "",
    jobDescription: "",
    yourBackground: prefillData?.background || "",
    keyAchievements: "",
    whyThisCompany: "",
    tone: "professional",
    length: "medium",
  });

  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(initialUsage);
  const [copied, setCopied] = useState(false);

  const remaining = isPro ? "∞" : Math.max(0, limit - usage);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const res = await fetch("/api/tools/ai-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        setLoading(false);
        return;
      }

      setCoverLetter(data.coverLetter);
      setUsage(data.usage.used);

      setTimeout(() => {
        const resultEl = document.getElementById("letter-result");
        if (!resultEl) return;
        const yOffset = window.innerWidth < 1024 ? -70 : -20;
        const y = resultEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const html = generateCoverLetterHTML(coverLetter, form, isPro);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.fullName.replace(/\s+/g, "_")}_CoverLetter_${form.targetCompany.replace(/\s+/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    window.print();
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <>
      {/* Mobile loading bar */}
      {loading && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-50 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white p-3 shadow-lg animate-slide-down">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm font-bold">Writing your cover letter...</p>
          </div>
        </div>
      )}

      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            style={{ background: "linear-gradient(to bottom right, #075a01, #0a8f01)" }}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              AI Cover Letter Generator
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Tailored cover letters that get interviews
            </p>
          </div>
        </div>

        {prefillData && (
          <div className="mt-3 rounded-xl bg-blue-50 border border-blue-200 p-3">
            <p className="text-xs text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
              <span>
                <strong>Pre-filled from your recent resume.</strong> Just add the job details below.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Usage badge */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <Zap className="h-4 w-4 text-[#075a01]" />
          <span className="text-gray-600">
            {isPro ? (
              <span className="font-semibold text-[#075a01]">Pro — Unlimited</span>
            ) : (
              <>
                <span className="font-bold text-gray-900">{remaining}</span> of{" "}
                <span className="font-semibold">{limit}</span> remaining today
              </>
            )}
          </span>
        </div>
        {!isPro && (
          <Link href="/pricing" className="text-xs font-bold text-[#075a01] hover:underline">
            Upgrade →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <form
          onSubmit={handleGenerate}
          className="rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-sm space-y-6"
        >
          {/* YOUR INFO */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <User className="h-3 w-3" /> Your Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  required
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+234 800 000 0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Lagos, Nigeria"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* JOB DETAILS */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> Job You're Applying For
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Target Role *</label>
                <input
                  value={form.targetRole}
                  onChange={(e) => updateField("targetRole", e.target.value)}
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Company *</label>
                <input
                  value={form.targetCompany}
                  onChange={(e) => updateField("targetCompany", e.target.value)}
                  required
                  placeholder="e.g. Google, Stripe, Acme Corp"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Hiring Manager Name <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <input
                value={form.hiringManagerName}
                onChange={(e) => updateField("hiringManagerName", e.target.value)}
                placeholder="e.g. Sarah Johnson — leave blank if unknown"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Job Description <span className="text-xs text-gray-400">(recommended — paste for tailoring)</span>
              </label>
              <textarea
                value={form.jobDescription}
                onChange={(e) => updateField("jobDescription", e.target.value)}
                rows={4}
                placeholder="Paste the full job description here. AI will extract keywords for ATS."
                className={inputClass}
              />
            </div>
          </div>

          {/* YOUR BACKGROUND */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              About You
            </h3>

            <div>
              <label className={labelClass}>Your Background & Experience</label>
              <textarea
                value={form.yourBackground}
                onChange={(e) => updateField("yourBackground", e.target.value)}
                rows={4}
                placeholder="e.g. 5+ years building React apps. Led team of 4 at Acme Corp. Shipped 3 major products used by 50K users."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Key Achievements</label>
              <textarea
                value={form.keyAchievements}
                onChange={(e) => updateField("keyAchievements", e.target.value)}
                rows={3}
                placeholder="e.g. Increased revenue by 40%, won Best Engineer award 2023, mentored 5 junior devs"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Why This Company? <span className="text-xs text-gray-400">(optional)</span>
              </label>
              <textarea
                value={form.whyThisCompany}
                onChange={(e) => updateField("whyThisCompany", e.target.value)}
                rows={2}
                placeholder="e.g. Inspired by their mission. Their product solves X problem I've faced."
                className={inputClass}
              />
            </div>
          </div>

          {/* TONE & LENGTH */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Customize Style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tone</label>
                <select
                  value={form.tone}
                  onChange={(e) => updateField("tone", e.target.value)}
                  className={inputClass}
                >
                  <option value="professional">Professional</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="direct">Direct & Confident</option>
                  <option value="creative">Creative & Personable</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Length</label>
                <select
                  value={form.length}
                  onChange={(e) => updateField("length", e.target.value)}
                  className={inputClass}
                >
                  <option value="short">Short (~250 words)</option>
                  <option value="medium">Medium (~350 words)</option>
                  <option value="detailed">Detailed (~500 words)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading || !form.fullName || !form.targetRole || !form.targetCompany}
            style={{
              background: "linear-gradient(to right, #075a01, #0a8f01)",
              color: "#ffffff",
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Crafting your letter...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Cover Letter
              </>
            )}
          </button>

          {/* Pair with Resume CTA */}
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-center">
            <p className="text-xs text-blue-900">
              💡 <strong>Don&apos;t have a resume yet?</strong>{" "}
              <Link
                href="/dashboard/tools/ai-resume-builder"
                className="font-bold underline hover:text-blue-700"
              >
                Build one first
              </Link>{" "}
              and we&apos;ll auto-fill this form.
            </p>
          </div>
        </form>

        {/* RESULT */}
        <div id="letter-result" className="lg:sticky lg:top-6 lg:self-start scroll-mt-20">
          {!coverLetter && !loading && !error && (
            <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mb-4">
                <Mail className="h-8 w-8 text-gray-300" />
              </div>
              <p className="font-bold text-gray-900 mb-1">
                Your cover letter will appear here
              </p>
              <p className="text-sm text-gray-500">Fill out the form and click Generate</p>
            </div>
          )}

          {loading && (
            <div className="rounded-2xl bg-white border border-gray-100 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px] shadow-sm">
              <Loader2 className="h-12 w-12 text-[#075a01] animate-spin mb-4" />
              <p className="font-bold text-gray-900 mb-1">Writing your cover letter...</p>
              <p className="text-sm text-gray-500">
                Tailoring it to {form.targetCompany || "the company"}
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-red-800 mb-1">Generation Failed</p>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes("limit") && (
                    <Link
                      href="/pricing"
                      className="mt-3 inline-block text-sm font-bold text-red-700 underline"
                    >
                      Upgrade to Pro for Unlimited →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {coverLetter && (
            <div className="space-y-4">
              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={handleDownload}
                  style={{
                    background: "linear-gradient(to right, #075a01, #0a8f01)",
                    color: "#ffffff",
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold hover:opacity-90 active:scale-[0.98] transition"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              {/* Cover Letter Preview */}
              <div
                id="letter-print"
                className="rounded-2xl bg-white border border-gray-100 p-6 sm:p-10 shadow-sm print:shadow-none print:border-none"
              >
                {!isPro && (
                  <div className="mb-4 rounded-xl bg-gradient-to-r from-[#075a01]/10 to-[#0a8f01]/10 border border-[#075a01]/20 p-3 print:hidden">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-[#075a01] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">
                          Want unlimited cover letters & no footer?
                        </p>
                        <Link
                          href="/pricing"
                          className="text-xs font-bold text-[#075a01] hover:underline"
                        >
                          See Pro features →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-serif">
                  {coverLetter}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #letter-print, #letter-print * { visibility: visible; }
          #letter-print { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </>
  );
}

function generateCoverLetterHTML(letter, form, isPro) {
  const footer = isPro
    ? ""
    : `<div style="margin-top:60px;padding-top:12px;border-top:1px solid #e5e7eb;text-align:center;color:#9ca3af;font-size:10px;">Built with <a href="https://fancydigitals.com.ng" style="color:#075a01;text-decoration:none;font-weight:bold;">Fancy Digitals AI Cover Letter Generator</a></div>`;

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${form.fullName} - Cover Letter</title>
<style>
body { font-family: 'Georgia', serif; max-width: 750px; margin: 40px auto; padding: 50px; color: #1f2937; line-height: 1.7; font-size: 14px; }
.letter { white-space: pre-wrap; }
@media print { body { margin: 0; padding: 30px; } }
</style></head><body>
<div class="letter">${letter}</div>
${footer}
</body></html>`;
}