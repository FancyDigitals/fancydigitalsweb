"use client";

import { useState, useRef } from "react";
import {
  FileText,
  Share2,
  Copy,
  Check,
  Edit3,
  X,
  Printer,
  Star,
  Building2,
  Lightbulb,
  BarChart3,
  Swords,
  Wallet,
  Rocket,
  Settings,
  TrendingUp,
  Briefcase,
  Paperclip,
  LineChart,
  Users,
  Wrench,
  ShoppingCart,
  Target,
  Handshake,
  Sparkles,
  Megaphone,
  Search,
  ClipboardList,
  Quote,
  List,
  Menu,
} from "lucide-react";

function getSectionIcon(type) {
  const icons = {
    cover: FileText,
    "executive-summary": Star,
    "company-overview": Building2,
    "problem-solution": Lightbulb,
    "market-analysis": BarChart3,
    "competitive-analysis": Swords,
    "business-model": Wallet,
    "go-to-market": Rocket,
    operations: Settings,
    "financial-projections": TrendingUp,
    "funding-requirements": Briefcase,
    appendix: Paperclip,
    traction: LineChart,
    team: Users,
    "product-overview": Wrench,
    "products-services": ShoppingCart,
    "services-overview": Target,
    "programs-services": Handshake,
    "mission-vision": Sparkles,
    "marketing-strategy": Megaphone,
    "market-need": Search,
  };
  return icons[type] || ClipboardList;
}

function EditableField({ value, onChange, multiline = false, className = "", placeholder = "Click to edit" }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    onChange(draft);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(4, Math.ceil((draft || "").length / 80))}
            className={`w-full rounded-lg border-2 border-[#075a01] bg-white px-3 py-2 focus:outline-none resize-none ${className}`}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full rounded-lg border-2 border-[#075a01] bg-white px-3 py-2 focus:outline-none ${className}`}
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 rounded-lg bg-[#075a01] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#064c01]"
          >
            <Check className="h-3 w-3" /> Save
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            <X className="h-3 w-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className={`group relative cursor-text rounded-md px-1 -mx-1 hover:bg-[#075a01]/5 transition-colors ${className}`}
    >
      {value || <span className="text-gray-300 italic">{placeholder}</span>}
      <Edit3 className="edit-indicator inline-block ml-1.5 h-3 w-3 text-[#075a01]/0 group-hover:text-[#075a01]/60 transition-opacity align-middle" />
    </div>
  );
}

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function SectionView({ section, index, onUpdate, sectionNumber }) {
  const SectionIcon = getSectionIcon(section.type);

  const updateField = (field, value) => {
    onUpdate({ ...section, [field]: value });
  };

  const updateBullet = (bulletIndex, value) => {
    const newBullets = [...(section.bullets || [])];
    newBullets[bulletIndex] = value;
    onUpdate({ ...section, bullets: newBullets });
  };

  const updateStat = (statIndex, field, value) => {
    const newStats = [...(section.stats || [])];
    newStats[statIndex] = { ...newStats[statIndex], [field]: value };
    onUpdate({ ...section, stats: newStats });
  };

  const updateTableCell = (rowIndex, colIndex, value) => {
    if (!section.table) return;
    const newRows = section.table.rows.map((row, ri) =>
      ri === rowIndex
        ? row.map((cell, ci) => (ci === colIndex ? value : cell))
        : row
    );
    onUpdate({
      ...section,
      table: { ...section.table, rows: newRows },
    });
  };

  const paragraphs = splitParagraphs(section.content);

  return (
    <section
      id={`section-${index}`}
      className="section-block scroll-mt-6 border-t border-gray-100 pt-10 first:border-t-0 first:pt-0"
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#075a01]/10">
            <SectionIcon className="h-3.5 w-3.5 text-[#075a01]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#075a01]">
            Section {String(sectionNumber).padStart(2, "0")}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
          <EditableField
            value={section.title}
            onChange={(v) => updateField("title", v)}
          />
        </h2>

        {section.subtitle && (
          <p className="mt-2 text-base text-gray-500 leading-relaxed">
            <EditableField
              value={section.subtitle}
              onChange={(v) => updateField("subtitle", v)}
            />
          </p>
        )}
      </div>

      {section.content && (
        <div className="space-y-4 mb-6">
          {paragraphs.length > 1 ? (
            paragraphs.map((para, pi) => (
              <p
                key={pi}
                className="text-[15px] leading-[1.75] text-gray-700 tracking-[-0.005em]"
              >
                {para}
              </p>
            ))
          ) : (
            <div className="text-[15px] leading-[1.75] text-gray-700 tracking-[-0.005em]">
              <EditableField
                value={section.content}
                onChange={(v) => updateField("content", v)}
                multiline
              />
            </div>
          )}
        </div>
      )}

      {section.callout && (
        <div className="callout my-6 border-l-4 border-[#075a01] bg-[#075a01]/5 rounded-r-lg py-4 pl-5 pr-4">
          <div className="flex items-start gap-3">
            <Quote className="h-4 w-4 text-[#075a01] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#075a01] mb-1">
                Key Insight
              </p>
              <div className="text-[15px] font-semibold text-gray-800 leading-relaxed">
                <EditableField
                  value={section.callout}
                  onChange={(v) => updateField("callout", v)}
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {section.bullets && section.bullets.length > 0 && (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-3">
            <List className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
              Key Points
            </p>
          </div>
          <ul className="space-y-2.5">
            {section.bullets.map((bullet, bi) => (
              <li key={bi} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#075a01] shrink-0" />
                <div className="flex-1 text-[15px] leading-relaxed text-gray-700">
                  <EditableField
                    value={bullet}
                    onChange={(v) => updateBullet(bi, v)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {section.stats && section.stats.length > 0 && (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
              Key Metrics
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {section.stats.map((stat, si) => (
              <div
                key={si}
                className="stat-card rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-4 hover:border-[#075a01]/20 transition-colors"
              >
                <div className="text-2xl font-black text-[#075a01] leading-none tracking-tight">
                  <EditableField
                    value={stat.value}
                    onChange={(v) => updateStat(si, "value", v)}
                  />
                </div>
                <div className="mt-2 text-xs font-bold text-gray-900">
                  <EditableField
                    value={stat.label}
                    onChange={(v) => updateStat(si, "label", v)}
                  />
                </div>
                {stat.description && (
                  <div className="mt-1 text-xs text-gray-500 leading-relaxed">
                    <EditableField
                      value={stat.description}
                      onChange={(v) => updateStat(si, "description", v)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {section.table &&
        section.table.headers &&
        section.table.rows && (
          <div className="my-6">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#075a01] to-[#0a8f01]">
                    {section.table.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-white whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 align-top">
                          <div className="text-sm text-gray-700 leading-relaxed">
                            <EditableField
                              value={cell}
                              onChange={(v) => updateTableCell(ri, ci, v)}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </section>
  );
}

function ShareModal({ plan, savedId, userEmail, onClose }) {
  const [shareUrl, setShareUrl] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const createShareLink = async () => {
    if (!savedId) return;
    setIsCreating(true);
    try {
      const res = await fetch("/api/business-plan/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: savedId }),
      });
      const data = await res.json();
      if (data.success) setShareUrl(data.shareUrl);
    } catch {}
    finally {
      setIsCreating(false);
    }
  };

  const copyUrl = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyEmail = async () => {
    const text = `Subject: ${plan.shareSubject || `Business Plan: ${plan.title}`}\n\n${plan.shareBody || "Please find my business plan at the link below."}${shareUrl ? `\n\n${shareUrl}` : ""}`;
    await navigator.clipboard.writeText(text);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Share Business Plan</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Public Share Link</p>
            {shareUrl ? (
              <div className="flex gap-2">
                <input readOnly value={shareUrl} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 font-mono" />
                <button onClick={copyUrl} className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#064c01] shrink-0">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            ) : (
              <button onClick={createShareLink} disabled={isCreating || !savedId} className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] py-3 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] disabled:opacity-50">
                {isCreating ? (<><div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating link...</>) : (<><Share2 className="h-4 w-4" />Create Share Link</>)}
              </button>
            )}
          </div>
          {(plan.shareBody || plan.shareSubject) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Draft</p>
                <button onClick={copyEmail} className="flex items-center gap-1 text-xs font-semibold text-[#075a01] hover:underline">
                  {emailCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {emailCopied ? "Copied!" : "Copy email"}
                </button>
              </div>
              {plan.shareSubject && (<p className="text-xs font-semibold text-gray-600 mb-1">Subject: {plan.shareSubject}</p>)}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 max-h-40 overflow-y-auto">
                <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {plan.shareBody}{shareUrl && `\n\n${shareUrl}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TableOfContents({ sections, activeIndex, onJump, mobileOpen, onCloseMobile }) {
  return (
    <>
      <aside className="hidden lg:block w-56 shrink-0 no-print">
        <div className="sticky top-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 mb-3 px-1">Contents</p>
            <nav className="space-y-0.5">
              {sections.map((section, i) => {
                const Icon = getSectionIcon(section.type);
                const isActive = i === activeIndex;
                return (
                  <button key={i} onClick={() => onJump(i)}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive ? "bg-[#075a01]/10 text-[#075a01]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 no-print" onClick={onCloseMobile}>
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black uppercase tracking-wider text-gray-900">Contents</p>
              <button onClick={onCloseMobile} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-0.5">
              {sections.map((section, i) => {
                const Icon = getSectionIcon(section.type);
                const isActive = i === activeIndex;
                return (
                  <button key={i} onClick={() => { onJump(i); onCloseMobile(); }}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      isActive ? "bg-[#075a01]/10 text-[#075a01]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default function BusinessPlanPreview({ plan, savedId, userEmail, onSave, isPro = false }) {
  const [sections, setSections] = useState(plan.sections || []);
  const [showShare, setShowShare] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const contentRef = useRef(null);

  const updateSection = (index, updated) => {
    const newSections = sections.map((s, i) => (i === index ? updated : s));
    setSections(newSections);
    onSave && onSave({ ...plan, sections: newSections });
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ ...plan, sections });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ FIXED PDF EXPORT — isolates document and prints only that
  const handlePrint = () => {
    document.body.classList.add("printing-plan");
    // Small delay so class applies before print dialog
    setTimeout(() => {
      window.print();
      // Cleanup after dialog closes
      setTimeout(() => {
        document.body.classList.remove("printing-plan");
      }, 500);
    }, 100);
  };

  const jumpToSection = (index) => {
    setActiveIndex(index);
    const el = document.getElementById(`section-${index}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentPlan = { ...plan, sections };

  return (
    <>
      {/* ✅ PRINT-ONLY STYLES — hides everything except the plan document */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          body.printing-plan * {
            visibility: hidden !important;
          }
          body.printing-plan [data-print-target],
          body.printing-plan [data-print-target] * {
            visibility: visible !important;
          }
          body.printing-plan [data-print-target] {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          body.printing-plan .no-print,
          body.printing-plan .no-print * {
            display: none !important;
            visibility: hidden !important;
          }
          body.printing-plan .edit-indicator {
            display: none !important;
          }
          body.printing-plan .section-block {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          body.printing-plan h1,
          body.printing-plan h2 {
            page-break-after: avoid;
            break-after: avoid;
          }
          body.printing-plan .callout,
          body.printing-plan .stat-card,
          body.printing-plan table {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          body.printing-plan {
            background: white !important;
          }
        }
      `}</style>

      <div className="space-y-4">
        {/* Sticky action bar — HIDDEN on print */}
        <div className="no-print sticky top-0 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-sm p-3 shadow-sm">
          <button onClick={() => setMobileTocOpen(true)} className="lg:hidden flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
            <Menu className="h-3.5 w-3.5" />
            Contents
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01] shrink-0">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{plan.title}</p>
              <p className="text-xs text-gray-400">{plan.planType} · {sections.length} sections</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleManualSave} disabled={isSaving} className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              {isSaving ? (<div className="h-3 w-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin" />) : saveSuccess ? (<Check className="h-3 w-3 text-[#075a01]" />) : (<Check className="h-3 w-3" />)}
              <span className="hidden sm:inline">{saveSuccess ? "Saved!" : "Save"}</span>
            </button>
            <button onClick={handlePrint} className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
              <Printer className="h-3 w-3" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button onClick={() => setShowShare(true)} disabled={!savedId} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-2 text-xs font-bold text-white hover:from-[#064c01] hover:to-[#087a01] transition disabled:opacity-50">
              <Share2 className="h-3 w-3" />
              Share
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <TableOfContents sections={sections} activeIndex={activeIndex} onJump={jumpToSection} mobileOpen={mobileTocOpen} onCloseMobile={() => setMobileTocOpen(false)} />

          {/* ✅ THIS is what prints */}
          <article data-print-target className="flex-1 min-w-0 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#075a01] to-[#0a8f01] px-6 sm:px-12 py-12 sm:py-16 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-8 -right-8 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-8 -left-8 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              </div>
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-3">
                  {plan.planType || "Business Plan"}
                  {plan.industry && ` · ${plan.industry}`}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">{plan.title}</h1>
                {plan.tagline && (<p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">{plan.tagline}</p>)}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs text-white/80">
                  <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{sections.length} sections</span>
                  <span className="text-white/40">·</span>
                  <span>Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {plan.executiveSummary && (
              <div className="section-block px-6 sm:px-12 py-8 border-b border-gray-100 bg-gradient-to-b from-[#075a01]/5 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#075a01]">
                    <Star className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#075a01]">At A Glance</p>
                    <h2 className="text-lg font-black text-gray-900">Executive Summary</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {splitParagraphs(plan.executiveSummary).map((para, pi) => (
                    <p key={pi} className="text-[15px] leading-[1.75] text-gray-700 tracking-[-0.005em]">{para}</p>
                  ))}
                </div>
              </div>
            )}

            <div ref={contentRef} className="px-6 sm:px-12 py-8 sm:py-12 space-y-10">
              {sections.map((section, index) => (
                <SectionView key={section.id || index} section={section} index={index} sectionNumber={index + 1} onUpdate={(updated) => updateSection(index, updated)} />
              ))}
            </div>

            {!isPro && (
  <div className="px-6 sm:px-12 py-6 border-t border-gray-100 bg-gray-50/50 text-center">
    <p className="text-xs text-gray-400">
      Generated with <span className="font-bold text-[#075a01]">Fancy Digitals</span> AI Business Plan Generator
    </p>
  </div>
)}
          </article>
        </div>

        {showShare && (
          <ShareModal plan={currentPlan} savedId={savedId} userEmail={userEmail} onClose={() => setShowShare(false)} />
        )}
      </div>
    </>
  );
}