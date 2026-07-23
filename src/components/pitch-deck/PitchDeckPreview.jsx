"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Save,
  Eye,
  FileText,
  MessageSquare,
  CheckCircle,
  Loader2,
  Plus,
  X,
  Trash2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   THEME SYSTEM
═══════════════════════════════════════════════════════════════════ */

const THEMES = {
  minimal: {
    name: "Minimal", personality: "apple",
    slideBg: "bg-white", slideText: "text-neutral-900", subText: "text-neutral-500",
    accent: "text-neutral-900", badge: "bg-neutral-100 text-neutral-600", border: "border-neutral-200",
    coverBg: "bg-white", coverText: "text-neutral-900", coverSubText: "text-neutral-600",
    coverMuted: "text-neutral-400", coverBorder: "border-neutral-200",
    fontHead: "font-semibold tracking-tight", fontDisplay: "font-bold tracking-tighter",
    fontBody: "font-normal", numberStyle: "font-thin text-neutral-200", statBg: "bg-neutral-50",
  },
  dark: {
    name: "Dark", personality: "vercel",
    slideBg: "bg-neutral-950", slideText: "text-white", subText: "text-neutral-400",
    accent: "text-white", badge: "bg-white/5 text-neutral-400 border border-white/10", border: "border-white/10",
    coverBg: "bg-neutral-950", coverText: "text-white", coverSubText: "text-neutral-300",
    coverMuted: "text-neutral-500", coverBorder: "border-white/10",
    fontHead: "font-semibold tracking-tight", fontDisplay: "font-bold tracking-tighter",
    fontBody: "font-normal", numberStyle: "font-thin text-white/10", statBg: "bg-white/[0.03]",
  },
  corporate: {
    name: "Corporate", personality: "bloomberg",
    slideBg: "bg-slate-50", slideText: "text-slate-900", subText: "text-slate-600",
    accent: "text-blue-800", badge: "bg-blue-100 text-blue-900 border border-blue-200", border: "border-slate-300",
    coverBg: "bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900",
    coverText: "text-white", coverSubText: "text-blue-100", coverMuted: "text-blue-200/60", coverBorder: "border-blue-400/30",
    fontHead: "font-bold tracking-tight", fontDisplay: "font-black tracking-tight",
    fontBody: "font-normal", numberStyle: "font-black text-blue-100", statBg: "bg-white border border-blue-100",
  },
  startup: {
    name: "Startup", personality: "ycombinator",
    slideBg: "bg-white", slideText: "text-neutral-900", subText: "text-neutral-600",
    accent: "text-violet-600", badge: "bg-violet-100 text-violet-700", border: "border-neutral-200",
    coverBg: "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600",
    coverText: "text-white", coverSubText: "text-white/90", coverMuted: "text-white/60", coverBorder: "border-white/20",
    fontHead: "font-bold tracking-tight", fontDisplay: "font-black tracking-tighter",
    fontBody: "font-normal", numberStyle: "font-black text-violet-100", statBg: "bg-gradient-to-br from-violet-50 to-fuchsia-50",
  },
  luxury: {
    name: "Luxury", personality: "rolex",
    slideBg: "bg-[#0a0805]", slideText: "text-amber-50", subText: "text-amber-100/50",
    accent: "text-amber-400", badge: "bg-transparent text-amber-400 border border-amber-500/40", border: "border-amber-500/20",
    coverBg: "bg-[#0a0805]", coverText: "text-amber-50", coverSubText: "text-amber-100/80",
    coverMuted: "text-amber-200/40", coverBorder: "border-amber-500/30",
    fontHead: "font-serif font-normal tracking-wide", fontDisplay: "font-serif font-normal tracking-wider",
    fontBody: "font-serif font-light", numberStyle: "font-serif font-thin text-amber-500/20", statBg: "bg-amber-950/20 border border-amber-500/20",
  },
  modern: {
    name: "Modern", personality: "linear",
    slideBg: "bg-[#0a0a0f]", slideText: "text-white", subText: "text-neutral-400",
    accent: "text-sky-400", badge: "bg-sky-500/10 text-sky-400 border border-sky-500/20", border: "border-white/10",
    coverBg: "bg-[#0a0a0f]", coverText: "text-white", coverSubText: "text-neutral-300",
    coverMuted: "text-neutral-500", coverBorder: "border-white/15",
    fontHead: "font-semibold tracking-tighter", fontDisplay: "font-bold tracking-tighter",
    fontBody: "font-normal", numberStyle: "font-bold text-sky-400/20", statBg: "bg-white/[0.03] border border-white/10",
  },
  creative: {
    name: "Creative", personality: "behance",
    slideBg: "bg-orange-50", slideText: "text-orange-950", subText: "text-orange-900/70",
    accent: "text-orange-600", badge: "bg-orange-200 text-orange-900", border: "border-orange-200",
    coverBg: "bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400",
    coverText: "text-white", coverSubText: "text-white/95", coverMuted: "text-white/70", coverBorder: "border-white/30",
    fontHead: "font-black tracking-tight", fontDisplay: "font-black tracking-tighter",
    fontBody: "font-medium", numberStyle: "font-black text-orange-300", statBg: "bg-white border-2 border-orange-300",
  },
  finance: {
    name: "Finance", personality: "goldman",
    slideBg: "bg-white", slideText: "text-emerald-950", subText: "text-emerald-900/70",
    accent: "text-emerald-700", badge: "bg-emerald-100 text-emerald-900 border border-emerald-200", border: "border-emerald-200",
    coverBg: "bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900",
    coverText: "text-white", coverSubText: "text-emerald-100", coverMuted: "text-emerald-200/60", coverBorder: "border-emerald-400/30",
    fontHead: "font-serif font-bold tracking-tight", fontDisplay: "font-serif font-black tracking-tight",
    fontBody: "font-serif", numberStyle: "font-serif font-black text-emerald-100", statBg: "bg-emerald-50 border border-emerald-200",
  },
};

function getTheme(id) { return THEMES[id] || THEMES.minimal; }

/* ═══════════════════════════════════════════════════════════════════
   MARKDOWN RENDERER
═══════════════════════════════════════════════════════════════════ */

function renderInlineText(text) {
  if (!text) return null;
  const str = String(text)
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/_{2,}([^_]+)_{2,}/g, "$1");
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

/* ═══════════════════════════════════════════════════════════════════
   DECORATIONS
═══════════════════════════════════════════════════════════════════ */

function CoverDecor({ personality }) {
  if (personality === "apple") return (<><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" /><div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" /></>);
  if (personality === "vercel") return (<><div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} /><div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" /></>);
  if (personality === "bloomberg") return (<><div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "1px 32px" }} /><div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" /></>);
  if (personality === "ycombinator") return (<><div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" /><div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)" }} /></>);
  if (personality === "rolex") return (<><div className="absolute inset-8 border border-amber-500/20 rounded-2xl" /><div className="absolute inset-10 border border-amber-500/10 rounded-xl" /><div className="absolute top-0 left-0 right-0 h-40 opacity-30" style={{ background: "radial-gradient(ellipse at center top, rgba(212,175,55,0.15) 0%, transparent 70%)" }} /><div className="absolute bottom-0 left-0 right-0 h-40 opacity-20" style={{ background: "radial-gradient(ellipse at center bottom, rgba(212,175,55,0.15) 0%, transparent 70%)" }} /></>);
  if (personality === "linear") return (<><div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)" }} /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-3xl" /></>);
  if (personality === "behance") return (<><div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-300/60 blur-2xl mix-blend-overlay" /><div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-400/60 blur-2xl mix-blend-overlay" /><div className="absolute top-1/2 left-1/4 h-40 w-40 rounded-full bg-white/20 blur-xl" /><svg className="absolute bottom-6 right-6 h-20 w-20 opacity-40" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="4 4" /></svg></>);
  if (personality === "goldman") return (<><div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "1px 24px" }} /><svg className="absolute bottom-0 left-0 right-0 h-40 opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none"><polyline points="0,80 50,60 100,65 150,40 200,35 250,20 300,25 350,10 400,15" fill="none" stroke="white" strokeWidth="1.5" /></svg><div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" /></>);
  return null;
}

function ContentDecor({ personality }) {
  if (personality === "bloomberg") return <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-800 via-blue-600 to-amber-500 pointer-events-none" />;
  if (personality === "rolex") return <div className="absolute inset-6 border border-amber-500/10 rounded-2xl pointer-events-none" />;
  if (personality === "linear") return <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(56,189,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />;
  if (personality === "vercel") return <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "1px 40px" }} />;
  if (personality === "goldman") return (<><div className="absolute top-0 left-0 right-0 h-px bg-emerald-200 pointer-events-none" /><div className="absolute top-1 left-0 right-0 h-px bg-emerald-100 pointer-events-none" /></>);
  if (personality === "behance") return <div className="absolute top-4 right-4 h-16 w-16 rounded-full border-2 border-orange-300 pointer-events-none" />;
  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   EDITABLE TEXT
═══════════════════════════════════════════════════════════════════ */

function EditableText({ value, onChange, className, placeholder, multiline, as: Tag = "div" }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  useEffect(() => setDraft(value || ""), [value]);
  const commit = () => { setEditing(false); if (draft !== value) onChange(draft); };

  if (editing) {
    if (multiline) {
      return (
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} autoFocus rows={Math.max(2, draft.split("\n").length)}
          className={`${className} w-full bg-transparent outline-none ring-2 ring-violet-400/60 rounded-lg px-2 py-1 -mx-2 resize-none`} />
      );
    }
    return (
      <input type="text" value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setDraft(value || ""); setEditing(false); } }}
        autoFocus className={`${className} w-full bg-transparent outline-none ring-2 ring-violet-400/60 rounded-lg px-2 py-1 -mx-2`} />
    );
  }

  return (
    <Tag onClick={() => setEditing(true)}
      className={`${className} cursor-text hover:bg-black/[0.03] rounded-lg px-2 py-1 -mx-2 transition ${!value ? "opacity-40 italic" : ""}`}>
      {value ? renderInlineText(value) : placeholder}
    </Tag>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOGO OVERLAY
═══════════════════════════════════════════════════════════════════ */

function LogoOverlay({ logo, position }) {
  if (!logo) return null;
  const positionClasses = {
    "top-left": "top-6 left-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
    "top-right": "top-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-6 right-6",
  };
  return (
    <div className={`absolute z-30 pointer-events-none ${positionClasses[position] || positionClasses["top-left"]}`}>
      <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto max-w-[140px] object-contain drop-shadow-md" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDE RENDERER
═══════════════════════════════════════════════════════════════════ */

function SlideRenderer({ slide, theme, primaryColor, onUpdate, slideIndex, totalSlides, logo, logoPosition, readOnly = false }) {
  const t = getTheme(theme);
  const isCover = slide.type === "cover" || slideIndex === 0;
  const isClosing = slide.type === "closing" || slide.type === "call-to-action" || slide.type === "contact";

  const updateField = (field, value) => onUpdate && onUpdate({ ...slide, [field]: value });
  const updateBullet = (idx, value) => { const bullets = [...(slide.bullets || [])]; bullets[idx] = value; onUpdate && onUpdate({ ...slide, bullets }); };
  const addBullet = () => onUpdate && onUpdate({ ...slide, bullets: [...(slide.bullets || []), "New point"] });
  const removeBullet = (idx) => onUpdate && onUpdate({ ...slide, bullets: (slide.bullets || []).filter((_, i) => i !== idx) });
  const updateStat = (idx, field, value) => { const stats = [...(slide.stats || [])]; stats[idx] = { ...stats[idx], [field]: value }; onUpdate && onUpdate({ ...slide, stats }); };
  const addStat = () => onUpdate && onUpdate({ ...slide, stats: [...(slide.stats || []), { label: "New Metric", value: "0", description: "" }] });
  const removeStat = (idx) => onUpdate && onUpdate({ ...slide, stats: (slide.stats || []).filter((_, i) => i !== idx) });

  // Read-only text renderer for print mode
  const StaticText = ({ value, className, as: Tag = "div", placeholder }) => (
    <Tag className={className}>{value ? renderInlineText(value) : (placeholder || "")}</Tag>
  );

  const TextComponent = readOnly ? StaticText : EditableText;

  /* ── COVER SLIDE ── */
  if (isCover) {
    return (
      <div className={`relative overflow-hidden rounded-3xl ${t.coverBg} min-h-[560px] flex flex-col justify-between p-10 sm:p-14 h-full`}>
        <CoverDecor personality={t.personality} />
        <LogoOverlay logo={logo} position={logoPosition} />

        <div className="relative z-10 flex items-start justify-end">
          <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.coverMuted}`}>
            {String(slideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          <div className="h-1 w-20 rounded-full" style={{ backgroundColor: primaryColor }} />
          <TextComponent as="h1" value={slide.title} onChange={(v) => updateField("title", v)}
            className={`text-5xl sm:text-6xl lg:text-7xl ${t.fontDisplay} ${t.coverText} leading-[0.95]`} placeholder="Your Title" />
          {(slide.subtitle || slide.subtitle === "") && (
            <TextComponent as="p" value={slide.subtitle} onChange={(v) => updateField("subtitle", v)}
              className={`text-xl sm:text-2xl ${t.coverSubText} ${t.fontBody} max-w-2xl leading-snug`} placeholder="Add a subtitle" />
          )}
          {slide.body && (
            <TextComponent value={slide.body} onChange={(v) => updateField("body", v)} multiline
              className={`text-base ${t.coverMuted} leading-relaxed max-w-xl pt-2`} placeholder="Add description" />
          )}
        </div>

        <div className={`relative z-10 flex items-end justify-between text-[10px] font-bold uppercase tracking-[0.25em] ${t.coverMuted}`}>
          <div>
            <p className="mb-1 opacity-60">Presented by</p>
            <p className={`text-sm normal-case tracking-normal font-semibold ${t.coverSubText}`}>Fancy Digitals</p>
          </div>
          <div className="text-right">
            <p className="mb-1 opacity-60">Confidential</p>
            <p className={`text-sm normal-case tracking-normal font-semibold ${t.coverSubText}`}>
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── CLOSING SLIDE ── */
  if (isClosing) {
    return (
      <div className={`relative overflow-hidden rounded-3xl ${t.coverBg} min-h-[560px] flex flex-col items-center justify-center text-center p-10 sm:p-14 h-full`}>
        <CoverDecor personality={t.personality} />
        <LogoOverlay logo={logo} position={logoPosition} />

        <div className="relative z-10 space-y-8 max-w-2xl">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${t.coverSubText}`}>
              {slide.type?.replace(/-/g, " ")}
            </span>
            <div className="h-px w-12" style={{ backgroundColor: primaryColor }} />
          </div>
          <TextComponent as="h2" value={slide.title} onChange={(v) => updateField("title", v)}
            className={`text-5xl sm:text-6xl ${t.fontDisplay} ${t.coverText} leading-[1]`} placeholder="Closing Title" />
          {slide.body && (
            <TextComponent value={slide.body} onChange={(v) => updateField("body", v)} multiline
              className={`text-lg ${t.coverSubText} leading-relaxed`} placeholder="Closing message" />
          )}
          {slide.callout && (
            <div className="inline-block rounded-2xl px-8 py-4 text-base font-bold text-white shadow-2xl" style={{ backgroundColor: primaryColor }}>
              <TextComponent value={slide.callout} onChange={(v) => updateField("callout", v)} className="text-white" placeholder="Call to action" />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── CONTENT SLIDE ── */
  return (
    <div className={`relative overflow-hidden rounded-3xl ${t.slideBg} border ${t.border} min-h-[560px] p-10 sm:p-14 h-full`}>
      <ContentDecor personality={t.personality} />
      <LogoOverlay logo={logo} position={logoPosition} />

      <div className="relative flex items-start justify-between mb-10">
        <div className="flex items-baseline gap-5">
          <div className={`text-8xl leading-none ${t.numberStyle}`}>
            {String(slideIndex + 1).padStart(2, "0")}
          </div>
          <div className="pt-2">
            <span className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] ${t.badge}`}>
              {slide.type?.replace(/-/g, " ")}
            </span>
            <div className="mt-3 h-0.5 w-16 rounded-full" style={{ backgroundColor: primaryColor }} />
          </div>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.subText}`}>
          {String(slideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      <TextComponent as="h2" value={slide.title} onChange={(v) => updateField("title", v)}
        className={`relative ${t.fontDisplay} text-4xl sm:text-5xl ${t.slideText} leading-[1.05] mb-3`} placeholder="Slide Title" />

      {(slide.subtitle || slide.subtitle === "") && (
        <TextComponent as="p" value={slide.subtitle} onChange={(v) => updateField("subtitle", v)}
          className={`relative text-base ${t.fontHead} ${t.accent} mb-6`} placeholder="Add subtitle" />
      )}

      {slide.body !== undefined && slide.body && (
        <TextComponent value={slide.body} onChange={(v) => updateField("body", v)} multiline
          className={`relative text-base ${t.subText} ${t.fontBody} leading-relaxed mb-8 max-w-3xl`} placeholder="Add body content" />
      )}

      {slide.stats && slide.stats.length > 0 && (
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {slide.stats.map((stat, i) => (
            <div key={i} className={`group relative rounded-2xl ${t.statBg} p-6 transition hover:shadow-lg`}>
              {!readOnly && (
                <button onClick={() => removeStat(i)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition">
                  <X className="h-3 w-3" />
                </button>
              )}
              <div className={`${t.fontDisplay} text-4xl mb-2`} style={{ color: primaryColor }}>
                <TextComponent value={stat.value} onChange={(v) => updateStat(i, "value", v)} className="" placeholder="0" />
              </div>
              <TextComponent value={stat.label} onChange={(v) => updateStat(i, "label", v)} className={`text-sm ${t.fontHead} ${t.slideText}`} placeholder="Label" />
              {(stat.description || stat.description === "") && (
                <TextComponent value={stat.description} onChange={(v) => updateStat(i, "description", v)} className={`text-xs ${t.subText} mt-1`} placeholder="Description" />
              )}
            </div>
          ))}
        </div>
      )}

      {!readOnly && (
        <button onClick={addStat} className={`relative mb-6 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${t.subText} hover:opacity-70 transition`}>
          <Plus className="h-3 w-3" /> Add metric
        </button>
      )}

      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="relative space-y-4 my-6">
          {slide.bullets.map((bullet, i) => (
            <li key={i} className="group flex items-start gap-4">
              <div className="pt-2.5 flex items-center gap-2 shrink-0">
                <span className={`text-xs font-bold ${t.subText} w-4`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              </div>
              <TextComponent value={bullet} onChange={(v) => updateBullet(i, v)} multiline
                className={`text-base ${t.slideText} ${t.fontBody} leading-relaxed flex-1`} placeholder="Add point" />
              {!readOnly && (
                <button onClick={() => removeBullet(i)} className="opacity-0 group-hover:opacity-100 mt-2 h-6 w-6 rounded-md bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition shrink-0">
                  <X className="h-3 w-3" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!readOnly && (
        <button onClick={addBullet} className={`relative flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${t.subText} hover:opacity-70 transition mb-6`}>
          <Plus className="h-3 w-3" /> Add point
        </button>
      )}

      {slide.callout && (
        <div className="relative mt-8 rounded-2xl p-6 border-l-4" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}0d` }}>
          <TextComponent value={slide.callout} onChange={(v) => updateField("callout", v)} className={`text-base ${t.fontHead} ${t.slideText}`} placeholder="Add callout" />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EMAIL MODAL
═══════════════════════════════════════════════════════════════════ */

function EmailModal({ deck, savedId, onClose }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(deck.emailSubject || `${deck.title}`);
  const [shareUrl, setShareUrl] = useState("");
  const [generatingLink, setGeneratingLink] = useState(false);
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    async function generateLink() {
      if (!savedId) { setBody(deck.emailBody || ""); return; }
      setGeneratingLink(true);
      try {
        const res = await fetch("/api/pitch-deck/share", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deckId: savedId }),
        });
        const data = await res.json();
        if (data.success) {
          setShareUrl(data.shareUrl);
          setBody(`${deck.emailBody || ""}\n\n─────────────────────────\n\nView the full deck online:\n${data.shareUrl}\n\n─────────────────────────\n\nBest regards,\nFancy Digitals`);
        } else { setBody(deck.emailBody || ""); }
      } catch { setBody(deck.emailBody || ""); }
      finally { setGeneratingLink(false); }
    }
    generateLink();
  }, [savedId, deck.emailBody]);

  const handleSend = () => {
    if (!to.trim()) return;
    window.open(`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
    setSent(true);
    setTimeout(onClose, 1200);
  };

  const copyLink = () => { if (shareUrl) navigator.clipboard.writeText(shareUrl); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-gray-900">Send Deck via Email</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <div className="p-5 space-y-4 overflow-y-auto">
          {generatingLink && (<div className="rounded-lg bg-violet-50 border border-violet-100 px-3 py-2"><p className="text-xs text-violet-700">Generating shareable link...</p></div>)}
          {shareUrl && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">Shareable Link</p>
              <div className="flex items-center gap-2">
                <input type="text" value={shareUrl} readOnly className="flex-1 text-xs bg-white border border-emerald-200 rounded px-2 py-1 text-emerald-800" />
                <button onClick={copyLink} className="text-xs font-bold text-emerald-700 hover:text-emerald-900">Copy</button>
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">To</label>
            <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="investor@vcfirm.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 resize-none" />
          </div>
        </div>
        <div className="flex items-center gap-3 p-5 border-t border-gray-100 shrink-0">
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSend} disabled={sent || !to.trim() || generatingLink}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-bold text-white hover:bg-violet-700 disabled:opacity-50">
            {sent ? (<><CheckCircle className="h-4 w-4" /> Sent!</>) : (<><Mail className="h-4 w-4" /> Open Email</>)}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PREVIEW
═══════════════════════════════════════════════════════════════════ */

export default function PitchDeckPreview({ deck: initialDeck, savedId, userEmail, onSave }) {
  const [deck, setDeck] = useState(initialDeck);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("slides");
  const [showEmail, setShowEmail] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportContainer, setShowExportContainer] = useState(false);
  const exportContainerRef = useRef(null);

  useEffect(() => setDeck(initialDeck), [initialDeck]);

  useEffect(() => {
    if (!hasChanges) return;
    const timer = setTimeout(async () => {
      setIsSaving(true);
      await onSave(deck);
      setIsSaving(false);
      setSaveSuccess(true);
      setHasChanges(false);
      setTimeout(() => setSaveSuccess(false), 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [deck, hasChanges, onSave]);

  const slides = deck?.slides || [];
  const theme = deck?.theme || "minimal";
  const primaryColor = deck?.primaryColor || "#075a01";

  const updateSlide = useCallback((idx, updatedSlide) => {
    setDeck((prev) => ({ ...prev, slides: prev.slides.map((s, i) => (i === idx ? updatedSlide : s)) }));
    setHasChanges(true);
  }, []);

  const deleteSlide = (idx) => {
    if (slides.length <= 1) return;
    setDeck((prev) => ({ ...prev, slides: prev.slides.filter((_, i) => i !== idx) }));
    setHasChanges(true);
    setCurrentSlide((c) => Math.min(c, slides.length - 2));
  };

  const addSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`, type: "content", title: "New Slide", subtitle: "",
      body: "Add your content here", bullets: [], stats: [], callout: null, speakerNotes: "", layout: "bullets",
    };
    setDeck((prev) => ({ ...prev, slides: [...prev.slides, newSlide] }));
    setHasChanges(true);
    setCurrentSlide(slides.length);
  };

  const moveSlide = (from, to) => {
    if (to < 0 || to >= slides.length) return;
    const newSlides = [...slides];
    const [moved] = newSlides.splice(from, 1);
    newSlides.splice(to, 0, moved);
    setDeck((prev) => ({ ...prev, slides: newSlides }));
    setHasChanges(true);
    setCurrentSlide(to);
  };

  const goNext = () => setCurrentSlide((i) => Math.min(i + 1, slides.length - 1));
  const goPrev = () => setCurrentSlide((i) => Math.max(i - 1, 0));

  const handleManualSave = async () => {
    setIsSaving(true);
    await onSave(deck);
    setIsSaving(false);
    setSaveSuccess(true);
    setHasChanges(false);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  // ═══════════════════════════════════════════════════════════════
  // CLEAN PDF EXPORT USING html2canvas-pro + jsPDF
  // Supports modern CSS colors (oklch, oklab, color())
  // ═══════════════════════════════════════════════════════════════
  const handleExportPDF = async () => {
    setIsExporting(true);
    setShowExportContainer(true);

    // Wait for offscreen container to render + fonts to load
    await new Promise((r) => setTimeout(r, 600));

    try {
      const { exportDeckToPDF } = await import("@/lib/pitch-deck/pdf-export");
      const element = exportContainerRef.current;
      if (!element) throw new Error("Export container not found");

      const filename = `${(deck.title || "pitch-deck")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}.pdf`;

      await exportDeckToPDF(element, filename);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert(`PDF export failed: ${err.message || "Please try again."}`);
    } finally {
      setIsExporting(false);
      setShowExportContainer(false);
    }
  };

  const PREVIEW_TABS = [
    { id: "slides", label: "Slides", icon: Eye },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "notes", label: "Notes", icon: MessageSquare },
  ];

  return (
    <>
      {showEmail && <EmailModal deck={deck} savedId={savedId} onClose={() => setShowEmail(false)} />}

      {/* ══════════════════════════════════════════════════════════
          OFFSCREEN EXPORT CONTAINER
          Renders each slide as a fixed-size 1400×990 page (A4 landscape ratio)
          Each slide has data-slide-page so the exporter can find them
      ══════════════════════════════════════════════════════════ */}
      {showExportContainer && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "1400px",
      zIndex: 9999,
      opacity: 0,           // Invisible but rendered normally
      pointerEvents: "none",
      background: "#ffffff",
    }}
  >
          <div ref={exportContainerRef} style={{ background: "#ffffff" }}>
            {slides.map((slide, i) => (
              <div
                key={slide.id || i}
                data-slide-page
                style={{
                  width: "1400px",
                  height: "990px",
                  padding: "20px",
                  boxSizing: "border-box",
                  background: "#ffffff",
                  overflow: "hidden",
                }}
              >
                <SlideRenderer
                  slide={slide}
                  theme={theme}
                  primaryColor={primaryColor}
                  slideIndex={i}
                  totalSlides={slides.length}
                  onUpdate={() => {}}
                  logo={deck.logo}
                  logoPosition={deck.logoPosition}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-gray-50">
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">{deck.title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-gray-500">{deck.documentType}</p>
              {hasChanges && (<span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />Unsaved</span>)}
              {isSaving && (<span className="text-[10px] font-semibold text-violet-600 flex items-center gap-1"><Loader2 className="h-2.5 w-2.5 animate-spin" />Saving</span>)}
              {saveSuccess && (<span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5" />Saved</span>)}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleManualSave} disabled={isSaving} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
              {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />} Save
            </button>
            <button onClick={() => setShowEmail(true)} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  Export PDF
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-100">
          {PREVIEW_TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition ${activeTab === tab.id ? "border-violet-500 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <tab.icon className="h-3.5 w-3.5" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "slides" && (
          <div className="p-5">
            <div className="mb-4 rounded-lg bg-violet-50 border border-violet-100 px-3 py-2 flex items-center gap-2">
              <span className="text-[11px] text-violet-700">Click any text on the slide to edit. Changes auto-save.</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button onClick={goPrev} disabled={currentSlide === 0} className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40">
                <ChevronLeft className="h-3.5 w-3.5" />Prev
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">{currentSlide + 1} / {slides.length}</span>
                {slides.length > 1 && (
                  <button onClick={() => deleteSlide(currentSlide)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500" title="Delete slide">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <button onClick={goNext} disabled={currentSlide === slides.length - 1} className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40">
                Next<ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {slides[currentSlide] && (
              <SlideRenderer
                slide={slides[currentSlide]}
                theme={theme}
                primaryColor={primaryColor}
                slideIndex={currentSlide}
                totalSlides={slides.length}
                onUpdate={(updated) => updateSlide(currentSlide, updated)}
                logo={deck.logo}
                logoPosition={deck.logoPosition}
              />
            )}

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {slides.map((slide, i) => (
                <button key={slide.id || i} onClick={() => setCurrentSlide(i)} className={`shrink-0 rounded-lg border-2 px-3 py-1.5 text-[10px] font-semibold transition ${i === currentSlide ? "border-violet-500 bg-violet-50 text-violet-700" : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}>
                  {i + 1}. {slide.type?.replace(/-/g, " ")}
                </button>
              ))}
              <button onClick={addSlide} className="shrink-0 flex items-center gap-1 rounded-lg border-2 border-dashed border-gray-200 px-3 py-1.5 text-[10px] font-semibold text-gray-400 hover:border-violet-400 hover:text-violet-500 transition">
                <Plus className="h-3 w-3" />Add slide
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              <button onClick={() => moveSlide(currentSlide, currentSlide - 1)} disabled={currentSlide === 0} className="text-[11px] font-semibold text-gray-500 hover:text-violet-600 disabled:opacity-40 flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />Move Left
              </button>
              <span className="text-gray-300">·</span>
              <button onClick={() => moveSlide(currentSlide, currentSlide + 1)} disabled={currentSlide === slides.length - 1} className="text-[11px] font-semibold text-gray-500 hover:text-violet-600 disabled:opacity-40 flex items-center gap-1">
                Move Right<ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "summary" && (
          <div className="p-5">
            <h3 className="font-bold text-gray-900 mb-3">Executive Summary</h3>
            {deck.executiveSummary ? (
              <div className="space-y-3">{deck.executiveSummary.split("\n\n").map((para, i) => (<p key={i} className="text-sm text-gray-600 leading-relaxed">{renderInlineText(para)}</p>))}</div>
            ) : (<p className="text-sm text-gray-400">No executive summary generated.</p>)}
            <div className="mt-6">
              <h3 className="font-bold text-gray-900 mb-3">All Slides Overview</h3>
              <div className="space-y-3">
                {slides.map((slide, i) => (
                  <div key={slide.id || i} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-violet-600">{i + 1}</span>
                      <h4 className="text-sm font-bold text-gray-900">{slide.title}</h4>
                    </div>
                    {slide.body && (<p className="text-xs text-gray-500 line-clamp-2">{renderInlineText(slide.body)}</p>)}
                    {slide.bullets && slide.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {slide.bullets.slice(0, 3).map((b, bi) => (
                          <li key={bi} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-violet-500">
                            {renderInlineText(b)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="p-5 space-y-3">
            <h3 className="font-bold text-gray-900 mb-3">Speaker Notes</h3>
            {slides.map((slide, i) => (
              <div key={slide.id || i} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">Slide {i + 1}</span>
                  <h4 className="text-sm font-bold text-gray-900">{slide.title}</h4>
                </div>
                <EditableText value={slide.speakerNotes} onChange={(v) => updateSlide(i, { ...slide, speakerNotes: v })} multiline className="text-sm text-gray-600 leading-relaxed" placeholder="Add speaker notes" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}