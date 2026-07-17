"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Mail,
  Building2,
  Users,
  Target,
  Palette,
  RotateCcw,
  Copy,
  Zap,
} from "lucide-react";

const STORAGE_KEY = "fd_email_sequence_form_v1";

const SEQUENCE_TYPES = [
  { name: "Cold Outreach", desc: "5 emails · B2B sales", count: 5 },
  { name: "Welcome Series", desc: "5 emails · SaaS onboarding", count: 5 },
  { name: "Product Launch", desc: "6 emails · Teaser → Launch → Post", count: 6 },
  { name: "Abandoned Cart", desc: "3 emails · E-commerce recovery", count: 3 },
  { name: "Lead Nurture", desc: "7 emails · Educational drip", count: 7 },
  { name: "Re-engagement", desc: "4 emails · Win back inactive users", count: 4 },
  { name: "Newsletter Welcome", desc: "4 emails · Subscriber warm-up", count: 4 },
];

const TONES = [
  "Professional",
  "Friendly & Casual",
  "Direct & Bold",
  "Persuasive",
  "Enterprise",
  "Founder-to-Founder",
  "Storyteller",
  "Playful",
  "Educational",
];

const FIELD_GROUPS = [
  {
    id: "basics",
    label: "Sequence Basics",
    Icon: Mail,
    always: true,
    fields: [
      { key: "sequenceType", label: "Sequence Type", type: "sequence-select", required: true },
      { key: "senderName", label: "Sender / Business Name", type: "text", placeholder: "e.g. Sarah at Fancy Digitals", required: true },
      { key: "senderRole", label: "Sender Role / Title", type: "text", placeholder: "e.g. Founder & CEO" },
      { key: "senderSignoff", label: "Signoff Name", type: "text", placeholder: "e.g. Sarah — how emails should be signed" },
      { key: "goal", label: "Primary Goal", type: "text", placeholder: "e.g. Book a discovery call, drive trial signups, recover cart", required: true },
    ],
  },
  {
    id: "product",
    label: "Product & Audience",
    Icon: Building2,
    fields: [
      { key: "businessDescription", label: "Business Description", type: "textarea", placeholder: "What does your business do in 2-3 sentences?", rows: 2, required: true },
      { key: "productService", label: "Product / Service Being Promoted", type: "textarea", placeholder: "Specific product, offer, or service these emails should promote.", rows: 2 },
      { key: "audience", label: "Target Audience", type: "text", placeholder: "e.g. Marketing directors at 50-500 person SaaS companies", required: true },
      { key: "painPoints", label: "Pain Points Being Solved", type: "textarea", placeholder: "What specific problems does your audience have that you solve?", rows: 2 },
      { key: "uniqueValue", label: "Unique Value / What Makes You Different", type: "text", placeholder: "e.g. The only tool that generates full sequences in 30 seconds" },
    ],
  },
  {
    id: "proof",
    label: "Proof & Offer",
    Icon: Target,
    fields: [
      { key: "socialProof", label: "Social Proof", type: "textarea", placeholder: "Customer names, results, awards, case study stats you want to reference.", rows: 2 },
      { key: "offer", label: "Special Offer / Discount", type: "text", placeholder: "e.g. 20% off first month, free trial, exclusive bonus" },
      { key: "ctaUrl", label: "CTA URL", type: "text", placeholder: "https://yourwebsite.com/signup" },
      { key: "website", label: "Company Website", type: "text", placeholder: "https://yourwebsite.com" },
    ],
  },
  {
    id: "style",
    label: "Tone & Style",
    Icon: Palette,
    fields: [
      { key: "tone", label: "Writing Tone", type: "select", options: TONES },
    ],
  },
];

const DEFAULT_FORM = {
  sequenceType: "Cold Outreach",
  senderName: "",
  senderRole: "",
  senderSignoff: "",
  goal: "",
  businessDescription: "",
  productService: "",
  audience: "",
  painPoints: "",
  uniqueValue: "",
  socialProof: "",
  offer: "",
  ctaUrl: "",
  website: "",
  tone: "Professional",
};

function sanitizePrefill(raw) {
  const out = { ...DEFAULT_FORM };
  if (!raw || typeof raw !== "object") return out;
  Object.keys(DEFAULT_FORM).forEach((k) => {
    if (raw[k] !== undefined && raw[k] !== null) out[k] = raw[k];
  });
  return out;
}

export default function EmailSequenceForm({
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
    product: true,
    proof: false,
    style: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setFormData({ ...DEFAULT_FORM, ...parsed });
          if (parsed.senderName || parsed.businessDescription) {
            setRestoredFromSave(true);
          }
        }
      }
    } catch {}
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!prefillData) return;
    const merged = sanitizePrefill(prefillData);
    setFormData(merged);
    setPrefilledFromTemplate(true);
    setRestoredFromSave(false);
    setExpandedGroups({ basics: true, product: true, proof: true, style: true });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [prefillData, prefillKey]);

  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {}
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
    if (!formData.senderName.trim()) return;
    onGenerate(formData);
  };

  const isValid =
    formData.senderName.trim().length > 0 &&
    formData.goal.trim().length > 0 &&
    formData.businessDescription.trim().length > 0 &&
    formData.audience.trim().length > 0;

  const selectedSeqInfo = SEQUENCE_TYPES.find((s) => s.name === formData.sequenceType);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {prefilledFromTemplate && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#075a01]/20 bg-gradient-to-r from-[#075a01]/10 to-[#0a8f01]/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <Copy className="h-4 w-4 text-[#075a01] shrink-0" />
            <div>
              <p className="text-sm text-[#075a01] font-bold">Loaded as template</p>
              <p className="text-xs text-[#075a01]/80">Tweak anything, then generate a new sequence.</p>
            </div>
          </div>
          <button type="button" onClick={handleClearForm} className="text-xs font-bold text-[#075a01] hover:underline whitespace-nowrap">
            Clear form
          </button>
        </div>
      )}

      {restoredFromSave && !prefilledFromTemplate && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#075a01]/20 bg-[#075a01]/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#075a01] shrink-0" />
            <p className="text-sm text-[#075a01] font-semibold">Your previous inputs were restored</p>
          </div>
          <button type="button" onClick={handleClearForm} className="text-xs font-bold text-[#075a01] hover:underline whitespace-nowrap">
            Clear form
          </button>
        </div>
      )}

      {FIELD_GROUPS.map((group) => {
        const isOpen = group.always || expandedGroups[group.id];
        const GroupIcon = group.Icon;

        return (
          <div key={group.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
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
                <span className="text-sm font-bold text-gray-900">{group.label}</span>
                {group.always && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#075a01] bg-[#075a01]/10 px-2 py-0.5 rounded-full">
                    Required
                  </span>
                )}
              </div>
              {!group.always && (
                <span className="text-gray-400">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {group.fields.map((field) => {
                    // Sequence type picker — full-width grid
                    if (field.type === "sequence-select") {
                      return (
                        <div key={field.key} className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                            {field.label}
                            {field.required && <span className="text-red-400 ml-1">*</span>}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {SEQUENCE_TYPES.map((seq) => {
                              const isSelected = formData.sequenceType === seq.name;
                              return (
                                <button
                                  key={seq.name}
                                  type="button"
                                  onClick={() => handleChange("sequenceType", seq.name)}
                                  className={`flex flex-col items-start rounded-xl border-2 px-3 py-2.5 text-left transition-all ${
                                    isSelected
                                      ? "border-[#075a01] bg-[#075a01]/5 shadow-sm"
                                      : "border-gray-100 bg-white hover:border-gray-200"
                                  }`}
                                >
                                  <span className={`text-xs font-bold ${isSelected ? "text-[#075a01]" : "text-gray-900"}`}>
                                    {seq.name}
                                  </span>
                                  <span className="text-[10px] text-gray-500 mt-0.5">
                                    {seq.desc}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    const isFullWidth =
                      field.type === "textarea" ||
                      field.key === "goal" ||
                      field.key === "audience" ||
                      field.key === "uniqueValue" ||
                      field.key === "ctaUrl" ||
                      field.key === "website" ||
                      field.key === "senderName" ||
                      field.key === "senderSignoff";

                    return (
                      <div key={field.key} className={isFullWidth ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                          {field.label}
                          {field.required && <span className="text-red-400 ml-1">*</span>}
                        </label>

                        {field.type === "select" ? (
                          <select
                            value={formData[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-[#075a01] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition-all"
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            value={formData[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={field.rows || 3}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#075a01] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition-all resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData[field.key]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
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
        {selectedSeqInfo && (
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Zap className="h-3.5 w-3.5 text-[#075a01]" />
            Generating a <span className="font-bold text-gray-900">{selectedSeqInfo.count}-email</span> {selectedSeqInfo.name} sequence
          </div>
        )}
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
              Writing your email sequence...
            </>
          ) : isAtLimit ? (
            <>
              <Sparkles className="h-4 w-4" />
              Daily limit reached — Upgrade to Pro
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              Generate Email Sequence
            </>
          )}
        </button>

        {isGenerating && (
          <p className="text-center text-xs text-gray-400 mt-3">
            AI is writing your emails — usually 15–30 seconds
          </p>
        )}

        <p className="text-center text-xs text-gray-400 mt-3">
          Your inputs auto-save to your browser.
          {!isPro && !isAtLimit && (
            <>
              {" "}Free plan: 1 sequence/day.{" "}
              <a href="/pricing" className="text-[#075a01] font-semibold hover:underline">
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