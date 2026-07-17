"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  Lightbulb,
  BarChart3,
  Wallet,
  Rocket,
  Palette,
  RotateCcw,
  Copy,
} from "lucide-react";

const STORAGE_KEY = "fd_business_plan_form_v1";

const PLAN_TYPES = [
  "Full Business Plan",
  "Startup Plan",
  "Small Business Plan",
  "SaaS Business Plan",
  "E-commerce Plan",
  "Service Business Plan",
  "Nonprofit Business Plan",
];

const PLAN_PURPOSES = [
  "Investor Funding",
  "Bank / SBA Loan",
  "Accelerator Application",
  "Internal Planning",
  "Grant Application",
  "Partnership",
];

const INDUSTRIES = [
  "Technology / SaaS",
  "E-commerce / Retail",
  "Healthcare / MedTech",
  "Finance / Fintech",
  "Education / EdTech",
  "Food & Beverage",
  "Real Estate",
  "Media / Entertainment",
  "Manufacturing",
  "Logistics / Supply Chain",
  "Agriculture / AgTech",
  "Energy / CleanTech",
  "Travel / Hospitality",
  "Fashion / Apparel",
  "Professional Services",
  "Non-profit / Social Impact",
  "Other",
];

const STAGES = [
  "Idea Stage",
  "Pre-Revenue",
  "Early Revenue",
  "Growth Stage",
  "Scaling",
  "Established",
];

const TONES = [
  "Professional",
  "Confident & Bold",
  "Conservative",
  "Visionary",
  "Data-Driven",
];

const FUNDING_RANGES = [
  "Under $50,000",
  "$50,000 – $250,000",
  "$250,000 – $1M",
  "$1M – $5M",
  "$5M – $20M",
  "$20M+",
  "Not raising",
];

const FIELD_GROUPS = [
  {
    id: "basics",
    label: "Business Basics",
    Icon: Building2,
    always: true,
    fields: [
      { key: "businessName", label: "Business Name", type: "text", placeholder: "e.g. Fancy Digitals", required: true },
      { key: "planType", label: "Plan Type", type: "select", options: PLAN_TYPES, required: true },
      { key: "industry", label: "Industry", type: "select", options: INDUSTRIES, required: true },
      { key: "stage", label: "Business Stage", type: "select", options: STAGES, required: true },
      { key: "planPurpose", label: "Plan Purpose", type: "select", options: PLAN_PURPOSES, required: true },
      { key: "description", label: "Business Description", type: "textarea", placeholder: "Describe your business in 2-4 sentences. What do you do, who do you serve, and what makes you different?", required: true, rows: 3 },
    ],
  },
  {
    id: "problem",
    label: "Problem & Solution",
    Icon: Lightbulb,
    fields: [
      { key: "problem", label: "Problem Being Solved", type: "textarea", placeholder: "What specific pain point does your business solve? Include any market evidence or data.", rows: 2 },
      { key: "solution", label: "Your Solution", type: "textarea", placeholder: "How does your product or service solve this problem better than alternatives?", rows: 2 },
      { key: "uniqueValue", label: "Unique Value Proposition", type: "text", placeholder: "e.g. The only AI platform that generates a full business plan in 60 seconds" },
      { key: "productsServices", label: "Products / Services", type: "textarea", placeholder: "Describe your core products or services, features, and pricing.", rows: 2 },
    ],
  },
  {
    id: "market",
    label: "Market & Competition",
    Icon: BarChart3,
    fields: [
      { key: "targetAudience", label: "Target Audience", type: "text", placeholder: "e.g. Early-stage startup founders aged 25-45 in North America" },
      { key: "location", label: "Location / Market", type: "text", placeholder: "e.g. United States, Global, Lagos Nigeria" },
      { key: "marketSize", label: "Market Size", type: "text", placeholder: "e.g. $4.5B TAM, growing at 22% CAGR" },
      { key: "competitors", label: "Competitors", type: "text", placeholder: "e.g. LivePlan, Bizplan, Enloop — list 2-5 competitors" },
      { key: "competitiveAdvantage", label: "Competitive Advantage", type: "textarea", placeholder: "What is your moat? Why will customers choose you over competitors?", rows: 2 },
    ],
  },
  {
    id: "business",
    label: "Business Model & Traction",
    Icon: Wallet,
    fields: [
      { key: "revenueModel", label: "Revenue Model", type: "text", placeholder: "e.g. SaaS subscription $9/mo, transaction fee 2.5%, one-time fee" },
      { key: "pricing", label: "Pricing Strategy", type: "text", placeholder: "e.g. Freemium → $9/mo Pro → $29/mo Agency" },
      { key: "traction", label: "Current Traction", type: "textarea", placeholder: "Revenue, users, customers, growth rate, key milestones achieved. Leave blank if pre-revenue.", rows: 2 },
    ],
  },
  {
    id: "funding",
    label: "Funding & Team",
    Icon: Rocket,
    fields: [
      { key: "fundingAmount", label: "Funding Required", type: "select", options: FUNDING_RANGES },
      { key: "useOfFunds", label: "Use of Funds", type: "textarea", placeholder: "e.g. 40% product development, 30% marketing, 20% team, 10% operations", rows: 2 },
      { key: "team", label: "Team", type: "textarea", placeholder: "Founder and team names, titles, relevant experience. e.g. John Doe, CEO — 10 years in SaaS", rows: 2 },
      { key: "website", label: "Website (optional)", type: "text", placeholder: "https://yourwebsite.com" },
    ],
  },
  {
    id: "style",
    label: "Style & Tone",
    Icon: Palette,
    fields: [
      { key: "tone", label: "Writing Tone", type: "select", options: TONES },
    ],
  },
];

const DEFAULT_FORM = {
  businessName: "",
  planType: "Full Business Plan",
  industry: "Technology / SaaS",
  stage: "Idea Stage",
  planPurpose: "Investor Funding",
  description: "",
  problem: "",
  solution: "",
  uniqueValue: "",
  productsServices: "",
  targetAudience: "",
  location: "",
  marketSize: "",
  competitors: "",
  competitiveAdvantage: "",
  revenueModel: "",
  pricing: "",
  traction: "",
  fundingAmount: "Under $50,000",
  useOfFunds: "",
  team: "",
  website: "",
  tone: "Professional",
};

// Merge in only keys that exist in DEFAULT_FORM
function sanitizePrefill(raw) {
  const out = { ...DEFAULT_FORM };
  if (!raw || typeof raw !== "object") return out;
  Object.keys(DEFAULT_FORM).forEach((k) => {
    if (raw[k] !== undefined && raw[k] !== null) {
      out[k] = raw[k];
    }
  });
  return out;
}

export default function BusinessPlanForm({
  onGenerate,
  isGenerating,
  isAtLimit,
  isPro,
  prefillData = null,
  prefillKey = 0,
}) {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [restoredFromSave, setRestoredFromSave] = useState(false);
  const [prefilledFromTemplate, setPrefilledFromTemplate] = useState(false);

  const [expandedGroups, setExpandedGroups] = useState({
    basics: true,
    problem: true,
    market: false,
    business: false,
    funding: false,
    style: false,
  });

  // ── Load saved form on mount ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setFormData({ ...DEFAULT_FORM, ...parsed });
          if (parsed.businessName || parsed.description) {
            setRestoredFromSave(true);
          }
        }
      }
    } catch {
      // ignore
    }
    setHasLoaded(true);
  }, []);

  // ── Prefill from template (when parent clicks "Use as Template") ──
  useEffect(() => {
    if (!prefillData) return;
    const merged = sanitizePrefill(prefillData);
    setFormData(merged);
    setPrefilledFromTemplate(true);
    setRestoredFromSave(false);
    // Expand all groups so user can see what got filled
    setExpandedGroups({
      basics: true,
      problem: true,
      market: true,
      business: true,
      funding: true,
      style: true,
    });
    // Scroll to top of form
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [prefillData, prefillKey]);

  // ── Auto-save on every change (after initial load) ──
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData, hasLoaded]);

  const toggleGroup = (id) => {
    if (id === "basics") return;
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (restoredFromSave) setRestoredFromSave(false);
    if (prefilledFromTemplate) setPrefilledFromTemplate(false);
  };

  const handleClearForm = () => {
    if (!confirm("Clear all form data? This cannot be undone.")) return;
    setFormData(DEFAULT_FORM);
    setRestoredFromSave(false);
    setPrefilledFromTemplate(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAtLimit || isGenerating) return;
    if (!formData.businessName.trim()) return;
    onGenerate(formData);
  };

  const isValid = formData.businessName.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ── Prefilled-from-template banner ── */}
      {prefilledFromTemplate && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#075a01]/20 bg-gradient-to-r from-[#075a01]/10 to-[#0a8f01]/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <Copy className="h-4 w-4 text-[#075a01] shrink-0" />
            <div>
              <p className="text-sm text-[#075a01] font-bold">
                Loaded as template
              </p>
              <p className="text-xs text-[#075a01]/80">
                Tweak anything, then generate a new version.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearForm}
            className="text-xs font-bold text-[#075a01] hover:underline whitespace-nowrap"
          >
            Clear form
          </button>
        </div>
      )}

      {/* ── Restored-from-save banner ── */}
      {restoredFromSave && !prefilledFromTemplate && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#075a01]/20 bg-[#075a01]/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#075a01] shrink-0" />
            <p className="text-sm text-[#075a01] font-semibold">
              Your previous inputs were restored
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearForm}
            className="text-xs font-bold text-[#075a01] hover:underline whitespace-nowrap"
          >
            Clear form
          </button>
        </div>
      )}

      {FIELD_GROUPS.map((group) => {
        const isOpen = group.always || expandedGroups[group.id];
        const GroupIcon = group.Icon;

        return (
          <div
            key={group.id}
            className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                group.always ? "cursor-default" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#075a01]/10">
                  <GroupIcon className="h-4 w-4 text-[#075a01]" />
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {group.label}
                </span>
                {group.always && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#075a01] bg-[#075a01]/10 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                )}
              </div>
              {!group.always && (
                <span className="text-gray-400">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.fields.map((field) => {
                    const isFullWidth =
                      field.type === "textarea" ||
                      field.key === "businessName" ||
                      field.key === "description" ||
                      field.key === "uniqueValue" ||
                      field.key === "website";

                    return (
                      <div
                        key={field.key}
                        className={isFullWidth ? "sm:col-span-2" : ""}
                      >
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                          {field.label}
                          {field.required && (
                            <span className="text-red-400 ml-1">*</span>
                          )}
                        </label>

                        {field.type === "select" ? (
                          <select
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#075a01] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition-all"
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                            placeholder={field.placeholder}
                            rows={field.rows || 3}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#075a01] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition-all resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData[field.key]}
                            onChange={(e) =>
                              handleChange(field.key, e.target.value)
                            }
                            placeholder={field.placeholder}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#075a01] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition-all"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
        <button
          type="submit"
          disabled={!isValid || isGenerating || isAtLimit}
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all ${
            isValid && !isGenerating && !isAtLimit
              ? "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white hover:from-[#064c01] hover:to-[#087a01] hover:-translate-y-0.5 shadow-lg shadow-[#075a01]/25"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your business plan...
            </>
          ) : isAtLimit ? (
            <>
              <Sparkles className="h-4 w-4" />
              Daily limit reached — Upgrade to Pro
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              Generate Business Plan
            </>
          )}
        </button>

        {isGenerating && (
          <p className="text-center text-xs text-gray-400 mt-3">
            AI is writing your full business plan — usually 20–40 seconds
          </p>
        )}

        <p className="text-center text-xs text-gray-400 mt-3">
          Your inputs auto-save to your browser.
          {!isPro && !isAtLimit && (
            <>
              {" "}Free plan: 1 plan/day.{" "}
              <a
                href="/pricing"
                className="text-[#075a01] font-semibold hover:underline"
              >
                Upgrade to Pro
              </a>{" "}
              for unlimited.
            </>
          )}
        </p>
      </div>
    </form>
  );
}