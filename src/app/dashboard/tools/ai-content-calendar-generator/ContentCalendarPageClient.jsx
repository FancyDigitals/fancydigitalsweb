"use client";

import { useState, useCallback } from "react";
import {
  Calendar, Sparkles, RefreshCw, AlertCircle,
  ChevronDown, ChevronUp, Repeat2, Megaphone,
} from "lucide-react";
import ContentCalendarWorkspace from "@/components/content-calendar/ContentCalendarWorkspace";
import BrandVault from "@/components/content-calendar/BrandVault";

/* ─── Constants ─────────────────────────────────────────── */
const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "twitter",   label: "Twitter / X" },
  { id: "linkedin",  label: "LinkedIn" },
  { id: "youtube",   label: "YouTube" },
  { id: "facebook",  label: "Facebook" },
  { id: "tiktok",    label: "TikTok" },
];

const TONES = [
  "Professional", "Casual", "Playful", "Bold",
  "Inspirational", "Educational", "Humorous", "Luxurious",
];

const GOALS = [
  "Brand Awareness", "Lead Generation", "Community Building",
  "Product Launch", "Drive Sales", "Educate Audience",
];

const MODES = [
  { id: "planning",    label: "Content Planning",  icon: Calendar,  desc: "Generate a full content strategy" },
  { id: "repurposing", label: "Content Repurposing", icon: Repeat2,   desc: "Repurpose existing content across platforms" },
  { id: "campaign",   label: "Campaign Mode",      icon: Megaphone, desc: "Build a focused campaign calendar" },
];

const DURATION_OPTIONS = [
  { value: 7,   label: "1 Week",   pro: false },
  { value: 14,  label: "2 Weeks",  pro: true },
  { value: 30,  label: "1 Month",  pro: true },
  { value: 60,  label: "2 Months", pro: true },
  { value: 90,  label: "3 Months", pro: true },
  { value: 180, label: "6 Months", pro: true },
  { value: 365, label: "1 Year",   pro: true, agency: true },
];

/* ─── Sub-components ──────────────────────────────────────── */
function SectionHeading({ children }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 mb-2">{children}</p>
  );
}

function ToggleChip({ active, onClick, children, disabled, badge }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative rounded-xl px-3 py-2 text-xs font-bold border transition-all ${
        active
          ? "bg-[#075a01] text-white border-[#075a01]"
          : disabled
          ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
          : "bg-white text-gray-600 border-gray-200 hover:border-[#075a01]/40 hover:text-[#075a01]"
      }`}
    >
      {children}
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 rounded-full bg-amber-400 px-1 text-[9px] font-black text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─── Planning Form ───────────────────────────────────────── */
function PlanningForm({ form, setForm, isPro }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const togglePlatform = (id) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(id)
        ? f.platforms.filter((p) => p !== id)
        : [...f.platforms, id],
    }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <SectionHeading>Brand Name *</SectionHeading>
          <input
            value={form.brand_name}
            onChange={(e) => set("brand_name", e.target.value)}
            placeholder="e.g. Acme Coffee Co."
            className="cal-input"
          />
        </div>
        <div>
          <SectionHeading>Industry</SectionHeading>
          <input
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
            placeholder="e.g. Food & Beverage"
            className="cal-input"
          />
        </div>
      </div>

      <div>
        <SectionHeading>Target Audience</SectionHeading>
        <input
          value={form.audience}
          onChange={(e) => set("audience", e.target.value)}
          placeholder="e.g. Millennials who love specialty coffee"
          className="cal-input"
        />
      </div>

      <div>
        <SectionHeading>Content Goal</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <ToggleChip key={g} active={form.goal === g} onClick={() => set("goal", g)}>
              {g}
            </ToggleChip>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>Brand Tone</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <ToggleChip key={t} active={form.tone === t} onClick={() => set("tone", t)}>
              {t}
            </ToggleChip>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>Platforms</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <ToggleChip
              key={p.id}
              active={form.platforms.includes(p.id)}
              onClick={() => togglePlatform(p.id)}
            >
              {p.label}
            </ToggleChip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Repurposing Form ────────────────────────────────────── */
function RepurposingForm({ form, setForm }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const togglePlatform = (id) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(id)
        ? f.platforms.filter((p) => p !== id)
        : [...f.platforms, id],
    }));

  return (
    <div className="space-y-5">
      <div>
        <SectionHeading>Source Content *</SectionHeading>
        <textarea
          value={form.source_content}
          onChange={(e) => set("source_content", e.target.value)}
          rows={5}
          placeholder="Paste your blog post, video transcript, podcast notes, or any existing content here..."
          className="cal-input resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <SectionHeading>Content Type</SectionHeading>
          <select value={form.source_type} onChange={(e) => set("source_type", e.target.value)} className="cal-input">
            <option value="blog_post">Blog Post</option>
            <option value="video_script">Video Script</option>
            <option value="podcast">Podcast Episode</option>
            <option value="newsletter">Newsletter</option>
            <option value="report">Report / Whitepaper</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <SectionHeading>Brand Tone</SectionHeading>
          <select value={form.tone} onChange={(e) => set("tone", e.target.value)} className="cal-input">
            <option value="">Select tone...</option>
            {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <SectionHeading>Target Audience</SectionHeading>
        <input value={form.audience} onChange={(e) => set("audience", e.target.value)}
          placeholder="Who are you creating content for?"
          className="cal-input" />
      </div>

      <div>
        <SectionHeading>Platforms to Repurpose For</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <ToggleChip
              key={p.id}
              active={form.platforms.includes(p.id)}
              onClick={() => togglePlatform(p.id)}
            >
              {p.label}
            </ToggleChip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Campaign Form ───────────────────────────────────────── */
function CampaignForm({ form, setForm }) {
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const togglePlatform = (id) =>
    setForm((f) => ({
      ...f,
      platforms: f.platforms.includes(id)
        ? f.platforms.filter((p) => p !== id)
        : [...f.platforms, id],
    }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <SectionHeading>Campaign Type *</SectionHeading>
          <select value={form.campaign_type} onChange={(e) => set("campaign_type", e.target.value)} className="cal-input">
            <option value="">Select type...</option>
            <option value="product_launch">Product Launch</option>
            <option value="seasonal_sale">Seasonal Sale</option>
            <option value="brand_awareness">Brand Awareness</option>
            <option value="event_promotion">Event Promotion</option>
            <option value="lead_generation">Lead Generation</option>
            <option value="rebranding">Rebranding</option>
            <option value="holiday">Holiday Campaign</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <SectionHeading>Launch / Key Date</SectionHeading>
          <input type="date" value={form.launch_date} onChange={(e) => set("launch_date", e.target.value)}
            className="cal-input" />
        </div>
      </div>

      <div>
        <SectionHeading>Campaign Details *</SectionHeading>
        <textarea
          value={form.campaign_details}
          onChange={(e) => set("campaign_details", e.target.value)}
          rows={4}
          placeholder="Describe your campaign, product, offer, or event in detail..."
          className="cal-input resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <SectionHeading>Brand Name</SectionHeading>
          <input value={form.brand_name} onChange={(e) => set("brand_name", e.target.value)}
            placeholder="e.g. Acme Inc."
            className="cal-input" />
        </div>
        <div>
          <SectionHeading>Target Audience</SectionHeading>
          <input value={form.audience} onChange={(e) => set("audience", e.target.value)}
            placeholder="Who are you targeting?"
            className="cal-input" />
        </div>
      </div>

      <div>
        <SectionHeading>Platforms</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map((p) => (
            <ToggleChip
              key={p.id}
              active={form.platforms.includes(p.id)}
              onClick={() => togglePlatform(p.id)}
            >
              {p.label}
            </ToggleChip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page Client ────────────────────────────────────── */
export default function ContentCalendarPageClient({ user, plan, limits, isAgency }) {
  const isPro = plan !== "FREE";

  const [mode, setMode] = useState("planning");
  const [form, setForm] = useState({
    brand_name:       "",
    industry:         "",
    audience:         "",
    tone:             "",
    goal:             "",
    platforms:        ["instagram"],
    duration_days:    7,
    start_date:       new Date().toISOString().split("T")[0],
    include_hashtags:      true,
    include_image_prompts: true,
    // Repurposing
    source_content: "",
    source_type:    "blog_post",
    // Campaign
    campaign_type:    "",
    campaign_details: "",
    launch_date:      "",
  });

  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState("");
  const [calendarData, setCalendarData] = useState(null);
  const [savedId,     setSavedId]     = useState(null);

  /* ── Brand Vault inject ── */
  const handleBrandSelect = useCallback((brand) => {
    setForm((f) => ({
      ...f,
      brand_name: brand.brand_name || f.brand_name,
      industry:   brand.industry   || f.industry,
      audience:   brand.audience   || f.audience,
      tone:       brand.tone       || f.tone,
    }));
  }, []);

  /* ── Generate ── */
  const handleGenerate = async () => {
    setError("");
    setIsLoading(true);
    setCalendarData(null);

    try {
      const payload = {
        mode,
        ...form,
        duration_days: Math.min(form.duration_days, limits.contentCalendarMaxDays),
      };

      const res  = await fetch("/api/ai-content-calendar/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError(data.error || `Daily limit reached. Upgrade for more generations.`);
        } else if (res.status === 401) {
          window.location.href = "/auth/login";
        } else {
          setError(data.error || "Generation failed. Please try again.");
        }
        return;
      }

      setCalendarData(data.data);
      setSavedId(null);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Duration options filtered by plan ── */
  const availableDurations = DURATION_OPTIONS.filter((d) => {
    if (d.agency && !isAgency) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6">

      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-black text-gray-900">AI Content Calendar</h1>
          {!isPro && (
            <a href="/pricing" className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-700 hover:bg-amber-200 transition">
              FREE PLAN
            </a>
          )}
        </div>
        <p className="text-sm text-gray-500 ml-10">
          Generate a complete social media content plan in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

        {/* ── LEFT PANEL — Form ── */}
        <div className="space-y-4">

          {/* Brand Vault */}
          <BrandVault
            userPlan={plan}
            brandVaultSlots={limits.brandVaultSlots}
            onSelectBrand={handleBrandSelect}
          />

          {/* Mode selector */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <SectionHeading>Generation Mode</SectionHeading>
            <div className="space-y-2">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition border ${
                      mode === m.id
                        ? "bg-[#075a01]/5 border-[#075a01]/30 text-[#075a01]"
                        : "border-gray-100 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <div>
                      <p className="text-xs font-bold">{m.label}</p>
                      <p className="text-[10px] text-gray-400">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main form panel */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-5">
            {mode === "planning"    && <PlanningForm    form={form} setForm={setForm} isPro={isPro} />}
            {mode === "repurposing" && <RepurposingForm form={form} setForm={setForm} />}
            {mode === "campaign"    && <CampaignForm    form={form} setForm={setForm} />}

            {/* Duration */}
            <div>
              <SectionHeading>Duration</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {availableDurations.map((d) => {
                  const locked = d.pro && !isPro;
                  return (
                    <ToggleChip
                      key={d.value}
                      active={form.duration_days === d.value}
                      onClick={() => !locked && setForm((f) => ({ ...f, duration_days: d.value }))}
                      disabled={locked}
                      badge={locked ? "PRO" : undefined}
                    >
                      {d.label}
                    </ToggleChip>
                  );
                })}
              </div>
            </div>

            {/* Start date */}
            <div>
              <SectionHeading>Start Date</SectionHeading>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                className="cal-input"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <SectionHeading>Options</SectionHeading>
              {[
                { key: "include_hashtags",      label: "Include hashtags" },
                { key: "include_image_prompts", label: "Include image prompts" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                    className="rounded border-gray-300 text-[#075a01] focus:ring-[#075a01]/30"
                  />
                  <span className="text-xs text-gray-600">{label}</span>
                </label>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] py-3.5 text-sm font-black text-white hover:from-[#064c01] hover:to-[#087a01] transition disabled:opacity-60 shadow-lg shadow-[#075a01]/20"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating calendar...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Calendar
                </>
              )}
            </button>

            {/* Usage hint */}
            {!isPro && (
              <p className="text-center text-[10px] text-gray-400">
                {limits.contentCalendarPerDay} generation{limits.contentCalendarPerDay !== 1 ? "s" : ""} per day on Free plan.{" "}
                <a href="/pricing" className="text-[#075a01] font-bold hover:underline">Upgrade for unlimited</a>
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL — Calendar output ── */}
        <div>
          {calendarData ? (
            <ContentCalendarWorkspace
              data={calendarData}
              savedId={savedId}
              onSaved={setSavedId}
              userIsPro={isPro}
              isAgency={isAgency}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-24 text-center px-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 mb-4">
                <Calendar className="h-7 w-7 text-[#075a01]/60" />
              </div>
              <p className="text-sm font-bold text-gray-600 mb-1">Your calendar will appear here</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Fill in the form, select your platforms and duration, then click Generate Calendar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .cal-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: white;
          padding: 9px 13px;
          font-size: 13px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }
        .cal-input:focus {
          border-color: #075a01;
          box-shadow: 0 0 0 3px rgba(7,90,1,0.08);
        }
      `}</style>
    </div>
  );
}