"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Sparkles, Loader2, Building2, Target, Palette, Upload, X as XIcon } from "lucide-react";
const STORAGE_KEY = "fancydigitals_pitchdeck_form";

const DOCUMENT_TYPES = [
  "Startup Pitch Deck",
  "Investor Deck",
  "Business Proposal",
  "Partnership Proposal",
  "Agency Proposal",
  "Sales Proposal",
  "Company Profile",
  "Executive Summary",
  "Product Launch Deck",
  "Marketing Proposal",
  "Press Release",
  "Media Kit",
  "Case Study",
  "Grant Proposal",
  "Board Presentation",
  "Annual Report",
  "Product Roadmap",
];

const INDUSTRIES = [
  "Technology", "SaaS", "Fintech", "Healthcare", "Education",
  "E-commerce", "Real Estate", "Media & Entertainment", "Food & Beverage",
  "Fashion", "Travel & Hospitality", "Manufacturing", "Agriculture",
  "Energy & CleanTech", "Legal", "Consulting", "Non-Profit", "Government",
  "Other",
];

const STAGES = [
  "Idea", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+",
  "Growth", "Established", "Enterprise",
];

const TONES = [
  "Professional", "Investor", "Corporate", "Startup", "Creative",
  "Luxury", "Technical", "Friendly", "Formal",
];

const THEMES = [
  { id: "minimal", label: "Minimal", color: "#ffffff", accent: "#111111" },
  { id: "dark", label: "Dark", color: "#0f0f0f", accent: "#ffffff" },
  { id: "corporate", label: "Corporate", color: "#1e3a5f", accent: "#ffffff" },
  { id: "startup", label: "Startup", color: "#7c3aed", accent: "#ffffff" },
  { id: "luxury", label: "Luxury", color: "#1a1a1a", accent: "#d4af37" },
  { id: "modern", label: "Modern", color: "#0f172a", accent: "#38bdf8" },
  { id: "creative", label: "Creative", color: "#f97316", accent: "#ffffff" },
  { id: "finance", label: "Finance", color: "#064e3b", accent: "#ffffff" },
];

const FIELD_SECTIONS = [
  {
    id: "basics",
    title: "Business Basics",
    icon: Building2,
    required: true,
    fields: [
      { key: "businessName", label: "Business Name", type: "text", placeholder: "e.g. Acme Corp", required: true },
      { key: "description", label: "Business Description", type: "textarea", placeholder: "What does your business do? Be specific.", required: true },
      { key: "industry", label: "Industry", type: "select", options: INDUSTRIES, required: true },
      { key: "stage", label: "Company Stage", type: "select", options: STAGES },
      { key: "website", label: "Website URL", type: "text", placeholder: "https://yoursite.com" },
    ],
  },
  {
    id: "pitch",
    title: "Pitch Details",
    icon: Target,
    required: false,
    fields: [
      { key: "problem", label: "Problem You Solve", type: "textarea", placeholder: "What specific problem are you solving?" },
      { key: "solution", label: "Your Solution", type: "textarea", placeholder: "How do you solve it?" },
      { key: "targetAudience", label: "Target Audience", type: "text", placeholder: "e.g. SMBs in Nigeria, Gen Z consumers" },
      { key: "uniqueAdvantage", label: "Unique Advantage / USP", type: "textarea", placeholder: "What makes you different from competitors?" },
      { key: "competitors", label: "Main Competitors", type: "text", placeholder: "e.g. HubSpot, Salesforce, Zoho" },
      { key: "revenueModel", label: "Revenue Model", type: "textarea", placeholder: "How do you make money?" },
      { key: "marketSize", label: "Market Size", type: "text", placeholder: "e.g. $4.5B TAM" },
      { key: "traction", label: "Traction / Metrics", type: "textarea", placeholder: "Revenue, users, growth rate, partnerships" },
      { key: "fundingAmount", label: "Funding Amount Sought", type: "text", placeholder: "e.g. $500K seed round" },
      { key: "goToMarket", label: "Go-to-Market Strategy", type: "textarea", placeholder: "How will you acquire customers?" },
      { key: "team", label: "Team Members", type: "textarea", placeholder: "Name, role, key experience (one per line)" },
      { key: "purpose", label: "Purpose of This Deck", type: "textarea", placeholder: "Who will receive this? What action do you want them to take?" },
    ],
  },
  {
    id: "design",
    title: "Design & Tone",
    icon: Palette,
    required: false,
    fields: [],
    custom: true,
  },
  {
  id: "logo",
  title: "Logo & Branding",
  icon: Upload,
  required: false,
  fields: [],
  custom: true,
  customType: "logo",
},
];

const LOGO_POSITIONS = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

function LogoUploadSection({ formData, update }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, SVG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Logo must be under 2MB.");
      return;
    }

    setUploading(true);
    try {
      // Convert to base64 for persistent storage
      const reader = new FileReader();
      reader.onload = (evt) => {
        update("logo", evt.target.result);
        setUploading(false);
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  const removeLogo = () => {
    update("logo", null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="pt-4 space-y-5">
      {/* Upload area */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
          Logo
        </label>

        {formData.logo ? (
          <div className="relative rounded-2xl border-2 border-gray-100 bg-gray-50 p-6 flex flex-col items-center gap-3">
            <div className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
              <img
                src={formData.logo}
                alt="Logo"
                className="h-20 w-auto max-w-[200px] object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={removeLogo}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 flex flex-col items-center gap-2 hover:border-violet-400 hover:bg-violet-50/40 transition"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200">
              <Upload className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700">
              {uploading ? "Uploading..." : "Upload your logo"}
            </p>
            <p className="text-[11px] text-gray-400">
              PNG, JPG, or SVG · Max 2MB · Transparent PNG recommended
            </p>
          </button>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        {error && (
          <p className="mt-2 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>

      {/* Position picker */}
      {formData.logo && (
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
            Logo Position on Every Slide
          </label>

          {/* Visual 3x2 grid picker */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mx-auto aspect-video max-w-sm rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 relative grid grid-cols-3 grid-rows-2 gap-1 p-2">
              {LOGO_POSITIONS.map((pos) => {
                const isSelected = formData.logoPosition === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => update("logoPosition", pos.id)}
                    className={`rounded-md flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-violet-600 shadow-md"
                        : "bg-white border border-gray-200 hover:border-violet-300"
                    }`}
                    title={pos.label}
                  >
                    <div
                      className={`h-3 w-6 rounded-sm ${
                        isSelected ? "bg-white" : "bg-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-center text-xs font-semibold text-gray-600">
              {LOGO_POSITIONS.find((p) => p.id === formData.logoPosition)?.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PitchDeckForm({ onGenerate, isGenerating, isAtLimit, isPro }) {
  const [formData, setFormData] = useState(() => {
  const defaults = {
    documentType: "Startup Pitch Deck",
    businessName: "",
    description: "",
    industry: "",
    stage: "",
    website: "",
    problem: "",
    solution: "",
    targetAudience: "",
    uniqueAdvantage: "",
    competitors: "",
    revenueModel: "",
    marketSize: "",
    traction: "",
    fundingAmount: "",
    goToMarket: "",
    team: "",
    purpose: "",
    tone: "Professional",
    theme: "minimal",
    logo: null,          // ADD
logoPosition: "top-left", // ADD
    primaryColor: "#075a01",
  };

  if (typeof window === "undefined") return defaults;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaults, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaults;
});

  const [openSections, setOpenSections] = useState({ basics: true, pitch: false, design: false });
// Auto-save form to localStorage on every change
useEffect(() => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch {
    // ignore
  }
}, [formData]);

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const toggleSection = (id) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName.trim()) return;
    if (!formData.documentType) return;
    onGenerate(formData);
  };

  const renderField = (field) => {
    if (field.type === "textarea") {
      return (
        <textarea
          key={field.key}
          value={formData[field.key] || ""}
          onChange={(e) => update(field.key, e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          required={field.required}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 resize-none transition"
        />
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.key} className="relative">
          <select
            value={formData[field.key] || ""}
            onChange={(e) => update(field.key, e.target.value)}
            required={field.required}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition pr-10"
          >
            <option value="">Select {field.label}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      );
    }

    return (
      <input
        key={field.key}
        type="text"
        value={formData[field.key] || ""}
        onChange={(e) => update(field.key, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formData.businessName && (
  <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 flex items-center gap-2">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    <span className="text-[11px] text-emerald-700 font-medium">
      Form auto-saved. Your inputs will be here when you return.
    </span>
  </div>
)}

      {/* Document Type Selector */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Document Type <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.documentType}
            onChange={(e) => update("documentType", e.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 transition pr-10"
          >
            {DOCUMENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Accordion Sections */}
      {FIELD_SECTIONS.map((section) => (
        <div
          key={section.id}
          className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="flex w-full items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
                <section.icon className="h-3.5 w-3.5 text-violet-600" />
              </div>
              <span className="text-sm font-bold text-gray-900">
                {section.title}
              </span>
              {section.required && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase">
                  Required
                </span>
              )}
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                openSections[section.id] ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Section Body */}
          {openSections[section.id] && (
            <div className="px-5 pb-5 space-y-4 border-t border-gray-50">

              {section.custom ? (
  section.customType === "logo" ? (
    <LogoUploadSection formData={formData} update={update} />
  ) : (
    <div className="pt-4 space-y-5">
      {/* Tone */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => update("tone", t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                formData.tone === t
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
          Theme
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => update("theme", t.id)}
              title={t.label}
              className={`flex flex-col items-center gap-1 rounded-xl p-2 transition-all border-2 ${
                formData.theme === t.id
                  ? "border-violet-500 shadow-sm"
                  : "border-transparent hover:border-gray-200"
              }`}
            >
              <div
                className="h-8 w-full rounded-md border border-gray-200"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-[9px] font-semibold text-gray-500">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
          Brand Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={formData.primaryColor}
            onChange={(e) => update("primaryColor", e.target.value)}
            className="h-10 w-10 rounded-lg border border-gray-200 cursor-pointer"
          />
          <span className="text-sm font-mono text-gray-600">
            {formData.primaryColor}
          </span>
        </div>
      </div>
    </div>
  )
) : (
  // Regular fields
  <div className="pt-4 space-y-4">
    {section.fields.map((field) => (
      <div key={field.key}>
        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {renderField(field)}
      </div>
    ))}
  </div>
)}

              
            </div>
          )}
        </div>
      ))}

      {/* Clear form button */}
{formData.businessName && (
  <button
    type="button"
    onClick={() => {
      if (confirm("Clear all form data? This cannot be undone.")) {
        localStorage.removeItem(STORAGE_KEY);
        setFormData({
          documentType: "Startup Pitch Deck",
          businessName: "",
          description: "",
          industry: "",
          stage: "",
          website: "",
          problem: "",
          solution: "",
          targetAudience: "",
          uniqueAdvantage: "",
          competitors: "",
          revenueModel: "",
          marketSize: "",
          traction: "",
          fundingAmount: "",
          goToMarket: "",
          team: "",
          purpose: "",
          tone: "Professional",
          theme: "minimal",
          primaryColor: "#075a01",
        });
      }
    }}
    className="w-full text-xs font-semibold text-gray-400 hover:text-red-500 transition py-2"
  >
    Clear saved form data
  </button>
)}

      {/* Submit */}
      <button
        type="submit"
        disabled={isGenerating || isAtLimit || !formData.businessName.trim()}
        className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-sm font-bold text-white shadow-lg hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating your deck...
          </>
        ) : isAtLimit ? (
          <>
            <Sparkles className="h-4 w-4" />
            Daily limit reached — Upgrade to continue
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate {formData.documentType}
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </button>

      {isGenerating && (
        <p className="text-center text-xs text-gray-400 animate-pulse">
          AI is generating your professional deck. This takes 15–30 seconds...
        </p>
      )}
    </form>
  );
}