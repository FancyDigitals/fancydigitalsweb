"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles, ArrowLeft, Loader2, Crown, Lock, Plus, Trash2,
  Building2, Target, Users, Megaphone, Palette, MessageSquare,
  CheckCircle2, AlertCircle, Zap, Copy, Eye, FileText, Check,
  Globe, ExternalLink, X, Languages, UserSquare, Download, Video,
  Link2, MessageCircle, Phone, MapPin, Mail,
} from "lucide-react";

const STORAGE_KEY = "fancy_landing_page_form_v1";
const LANGUAGES = [
  { id: "en", label: "English" },
  { id: "es", label: "Spanish" },
  { id: "fr", label: "French" },
  { id: "ar", label: "Arabic" },
  { id: "de", label: "German" },
];

const GOALS = [
  { id: "Signup", label: "Sign up" },
  { id: "Buy", label: "Buy / Purchase" },
  { id: "Book", label: "Book a call" },
  { id: "Download", label: "Download" },
  { id: "Contact", label: "Contact us" },
  { id: "Subscribe", label: "Subscribe" },
];

const TONES = [
  { id: "Professional", label: "Professional" },
  { id: "Playful", label: "Playful" },
  { id: "Bold", label: "Bold" },
  { id: "Minimal", label: "Minimal" },
  { id: "Luxury", label: "Luxury" },
  { id: "Friendly", label: "Friendly" },
];

export default function LandingPageGeneratorClient({ isPro, initialUsage, limit, userEmail, userName }) {
  const loadSaved = () => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  };
  const savedData = loadSaved();

  const [form, setForm] = useState(savedData?.form || {
    businessName: "",
    tagline: "",
    description: "",
    audience: "",
    goal: "Signup",
    tone: "Professional",
    socialProof: "",
    ctaText: "Get Started",
    includeFaq: true,
    includePricing: false,
    includeEmailCapture: false,
    brandColor: "#075a01",
    brandAccent: "#ff914d",
    logo: "",
    // NEW Pro fields
    language: "en",
    includeTestimonials: false,
    includeTeam: false,
    includeLeadMagnet: false,
    includeVideo: false,
    includeFooter: false,
    includeChat: false,
    leadMagnetTitle: "",
    leadMagnetDescription: "",
    leadMagnetUrl: "",
    videoUrl: "",
    videoTitle: "",
    footerEmail: "",
    footerPhone: "",
    footerAddress: "",
    footerSocials: { twitter: "", instagram: "", linkedin: "", facebook: "" },
    tawkPropertyId: "",
    tawkWidgetId: "",
  });

  const [teamMembers, setTeamMembers] = useState(savedData?.teamMembers || [
    { name: "", role: "", bio: "", photo: "" },
  ]);

    const [pricingTiers, setPricingTiers] = useState(savedData?.pricingTiers || [
    { name: "Starter", price: "$0", period: "month", features: ["", "", ""], cta: "Get Started", popular: false },
    { name: "Pro", price: "$29", period: "month", features: ["", "", "", ""], cta: "Upgrade", popular: true },
    { name: "Business", price: "$99", period: "month", features: ["", "", "", "", ""], cta: "Contact Sales", popular: false },
  ]);

    const [faqItems, setFaqItems] = useState(savedData?.faqItems || [
    { q: "", a: "" },
    { q: "", a: "" },
    { q: "", a: "" },
  ]);

    const [userTestimonials, setUserTestimonials] = useState(savedData?.userTestimonials || [
    { quote: "", name: "", role: "", company: "", photo: "" },
  ]);

    const [uploadingPhoto, setUploadingPhoto] = useState(null); // null | "logo" | team index

  const [features, setFeatures] = useState(savedData?.features || ["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(null);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(initialUsage);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const [copiedSection, setCopiedSection] = useState("");
  const [hoverSection, setHoverSection] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
const [publishSlug, setPublishSlug] = useState("");
const [slugStatus, setSlugStatus] = useState({ checking: false, available: null, error: "" });
const [publishing, setPublishing] = useState(false);
const [publishedUrl, setPublishedUrl] = useState("");
const [copiedUrl, setCopiedUrl] = useState(false);

function copyToClipboard(text, sectionId) {
  navigator.clipboard.writeText(text);
  setCopiedSection(sectionId);
  setTimeout(() => setCopiedSection(""), 1500);
}

function sanitizeSlug(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
}

async function checkSlugAvailability(slug) {
  if (!slug || slug.length < 3) {
    setSlugStatus({ checking: false, available: null, error: "" });
    return;
  }
  setSlugStatus({ checking: true, available: null, error: "" });
  try {
    const res = await fetch(`/api/landing-pages/publish?slug=${encodeURIComponent(slug)}`);
    const data = await res.json();
    setSlugStatus({ checking: false, available: data.available, error: data.error || "" });
  } catch {
    setSlugStatus({ checking: false, available: false, error: "Check failed" });
  }
}

function openPublishModal() {
  if (!isPro) {
    setShowUpgradeModal(true);
    return;
  }
  if (!page) return;
  const suggestedSlug = sanitizeSlug(form.businessName || "");
  setPublishSlug(suggestedSlug);
  setPublishedUrl("");
  setShowPublishModal(true);
  if (suggestedSlug.length >= 3) {
    checkSlugAvailability(suggestedSlug);
  }
}

function updatePublishSlug(value) {
  const cleaned = sanitizeSlug(value);
  setPublishSlug(cleaned);
  // Debounce the check
  if (window._slugCheckTimer) clearTimeout(window._slugCheckTimer);
  window._slugCheckTimer = setTimeout(() => checkSlugAvailability(cleaned), 400);
}

async function handlePublish() {
  if (!publishSlug || slugStatus.available !== true) return;
  setPublishing(true);
  try {
    const res = await fetch("/api/landing-pages/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: publishSlug, page, form }),
    });
    const data = await res.json();
    if (!res.ok) {
      setSlugStatus({ checking: false, available: false, error: data.error || "Publish failed" });
      setPublishing(false);
      return;
    }
    setPublishedUrl(data.url);
  } catch {
    setSlugStatus({ checking: false, available: false, error: "Network error" });
  }
  setPublishing(false);
}

function copyPublishedUrl() {
  navigator.clipboard.writeText(publishedUrl);
  setCopiedUrl(true);
  setTimeout(() => setCopiedUrl(false), 2000);
}

function copyAllText(p) {
  if (!p) return "";
  let text = `${p.hero?.headline || ""}\n${p.hero?.subheadline || ""}\nCTA: ${p.hero?.cta || ""}\n\n`;
  if (p.problem) text += `${p.problem.headline}\n${(p.problem.points || []).map(x => `• ${x}`).join("\n")}\n\n`;
  if (p.features?.length) text += `FEATURES:\n${p.features.map(f => `• ${f.title}: ${f.desc}`).join("\n")}\n\n`;
  if (p.benefits) text += `${p.benefits.headline}\n${(p.benefits.items || []).map(x => `• ${x}`).join("\n")}\n\n`;
  if (p.socialProof?.testimonial?.quote) text += `"${p.socialProof.testimonial.quote}" — ${p.socialProof.testimonial.name}\n\n`;
  if (p.pricing?.length) text += `PRICING:\n${p.pricing.map(t => `${t.name} — ${t.price}/${t.period}\n${t.features.map(f => `  • ${f}`).join("\n")}`).join("\n\n")}\n\n`;
  if (p.faq?.length) text += `FAQ:\n${p.faq.map(f => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}\n\n`;
  if (p.finalCta) text += `${p.finalCta.headline}\n${p.finalCta.subheadline}\nCTA: ${p.finalCta.cta}\n`;
  return text;
}

  const remaining = isPro ? "∞" : Math.max(0, limit - usage);

  function updateField(key, value) {
    const newForm = { ...form, [key]: value };
    setForm(newForm);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: newForm, features }));
      } catch {}
    }
  }

  function updateFeature(i, value) {
    const u = [...features];
    u[i] = value;
    setFeatures(u);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, features: u }));
      } catch {}
    }
  }

  function addFeature() {
    if (features.length >= 6) return;
    setFeatures([...features, ""]);
  }

  function removeFeature(i) {
    if (features.length <= 1) return;
    setFeatures(features.filter((_, x) => x !== i));
  }

    function updateTeamMember(i, key, value) {
    const u = [...teamMembers];
    u[i] = { ...u[i], [key]: value };
    setTeamMembers(u);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, features, teamMembers: u }));
      } catch {}
    }
  }

  function addTeamMember() {
    if (teamMembers.length >= 6) return;
    setTeamMembers([...teamMembers, { name: "", role: "", bio: "", photo: "" }]);
  }

  function removeTeamMember(i) {
    if (teamMembers.length <= 1) return;
    setTeamMembers(teamMembers.filter((_, x) => x !== i));
  }

  function handleTeamPhotoUpload(i, e) {
    if (!isPro) { setShowUpgradeModal(true); return; }
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Photo must be less than 10MB"); return; }
    setUploadingPhoto(`team-${i}`);
    compressImage(file, 400).then((compressed) => {
      updateTeamMember(i, "photo", compressed);
      setUploadingPhoto(null);
    }).catch(() => {
      alert("Failed to process image. Try a different one.");
      setUploadingPhoto(null);
    });
  }

  function compressImage(file, maxDimension = 400) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          let { width, height } = img;
          if (width > height) {
            if (width > maxDimension) { height = (height * maxDimension) / width; width = maxDimension; }
          } else {
            if (height > maxDimension) { width = (width * maxDimension) / height; height = maxDimension; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function updateFooterSocial(platform, value) {
    setForm((prev) => ({
      ...prev,
      footerSocials: { ...prev.footerSocials, [platform]: value },
    }));
  }


    function updatePricingTier(i, key, value) {
    const u = [...pricingTiers];
    u[i] = { ...u[i], [key]: value };
    // If marking popular, unmark others
    if (key === "popular" && value === true) {
      u.forEach((t, idx) => { if (idx !== i) t.popular = false; });
    }
    setPricingTiers(u);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, features, teamMembers, pricingTiers: u }));
      } catch {}
    }
  }

  function updatePricingFeature(tierIdx, featureIdx, value) {
    const u = [...pricingTiers];
    const fts = [...u[tierIdx].features];
    fts[featureIdx] = value;
    u[tierIdx] = { ...u[tierIdx], features: fts };
    setPricingTiers(u);
  }

  function addPricingFeature(tierIdx) {
    const u = [...pricingTiers];
    if (u[tierIdx].features.length >= 10) return;
    u[tierIdx] = { ...u[tierIdx], features: [...u[tierIdx].features, ""] };
    setPricingTiers(u);
  }

  function removePricingFeature(tierIdx, featureIdx) {
    const u = [...pricingTiers];
    if (u[tierIdx].features.length <= 1) return;
    u[tierIdx] = { ...u[tierIdx], features: u[tierIdx].features.filter((_, x) => x !== featureIdx) };
    setPricingTiers(u);
  }

  function addPricingTier() {
    if (pricingTiers.length >= 5) return;
    setPricingTiers([...pricingTiers, { name: "", price: "", period: "month", features: [""], cta: "Get Started", popular: false }]);
  }

  function removePricingTier(i) {
    if (pricingTiers.length <= 1) return;
    setPricingTiers(pricingTiers.filter((_, x) => x !== i));
  }

    function updateFaqItem(i, key, value) {
    const u = [...faqItems];
    u[i] = { ...u[i], [key]: value };
    setFaqItems(u);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, features, teamMembers, pricingTiers, faqItems: u }));
      } catch {}
    }
  }

  function addFaqItem() {
    if (faqItems.length >= 10) return;
    setFaqItems([...faqItems, { q: "", a: "" }]);
  }

  function removeFaqItem(i) {
    if (faqItems.length <= 1) return;
    setFaqItems(faqItems.filter((_, x) => x !== i));
  }

    function updateTestimonial(i, key, value) {
    const u = [...userTestimonials];
    u[i] = { ...u[i], [key]: value };
    setUserTestimonials(u);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, features, teamMembers, pricingTiers, faqItems, userTestimonials: u }));
      } catch {}
    }
  }

  function addTestimonial() {
    if (userTestimonials.length >= 5) return;
    setUserTestimonials([...userTestimonials, { quote: "", name: "", role: "", company: "", photo: "" }]);
  }

  function removeTestimonial(i) {
    if (userTestimonials.length <= 1) return;
    setUserTestimonials(userTestimonials.filter((_, x) => x !== i));
  }

  function handleTestimonialPhotoUpload(i, e) {
    if (!isPro) { setShowUpgradeModal(true); return; }
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Photo must be less than 10MB"); return; }
    setUploadingPhoto(`testimonial-${i}`);
    compressImage(file, 200).then((compressed) => {
      updateTestimonial(i, "photo", compressed);
      setUploadingPhoto(null);
    }).catch(() => {
      alert("Failed to process image.");
      setUploadingPhoto(null);
    });
  }

  function handleProToggle(key) {
    if (!isPro) {
      setShowUpgradeModal(true);
      return;
    }
    updateField(key, !form[key]);
  }

  function handleLogoUpload(e) {
    if (!isPro) {
      setShowUpgradeModal(true);
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Logo must be less than 10MB");
      return;
    }
    setUploadingPhoto("logo");
    compressImage(file, 300).then((compressed) => {
      updateField("logo", compressed);
      setUploadingPhoto(null);
    }).catch(() => {
      alert("Failed to process logo.");
      setUploadingPhoto(null);
    });
  }

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPage(null);

    try {
      const res = await fetch("/api/tools/ai-landing-page-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, features, teamMembers, pricingTiers, faqItems, userTestimonials }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        setLoading(false);
        return;
      }

      setPage(data.page);
      setUsage(data.usage.used);

      setTimeout(() => {
        const el = document.getElementById("page-result");
        if (!el) return;
        const yOffset = window.innerWidth < 1024 ? -70 : -20;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 transition";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div>

        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Link>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  style={{ background: "linear-gradient(135deg, #075a01, #0a8f01)" }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  AI Landing Page Generator
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                Generate high-converting landing pages in seconds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isPro ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                  <Crown className="h-3.5 w-3.5" />
                  PRO
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                  {remaining} / {limit} left today
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">

          {/* LEFT — FORM */}
          <form onSubmit={handleGenerate} className="space-y-4">

            {/* Basics */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Building2 className="h-4 w-4 text-[#075a01]" />
                Basics
              </h3>

              <div>
                <label className={labelClass}>Business / Product Name *</label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  placeholder="e.g. Fancy Digitals"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Tagline (optional)</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  placeholder="Short punchy tagline — AI will write one if empty"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>What does it do? *</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe in detail what your product/service does, who it helps, and how"
                  className={`${inputClass} resize-none`}
                  required
                />
                <p className="mt-1 text-xs text-gray-400">{form.description.length} characters — more detail = better page</p>
              </div>

              <div>
                <label className={labelClass}>Target Audience</label>
                <input
                  type="text"
                  value={form.audience}
                  onChange={(e) => updateField("audience", e.target.value)}
                  placeholder="e.g. Solo founders, SMB owners, marketing agencies"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Goal & Tone */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Target className="h-4 w-4 text-[#075a01]" />
                Goal & Tone
              </h3>

              <div>
                <label className={labelClass}>Main Goal</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => updateField("goal", g.id)}
                      className={`rounded-lg px-2 py-2 text-xs font-bold transition ${
                        form.goal === g.id
                          ? "bg-[#075a01] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Tone</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => updateField("tone", t.id)}
                      className={`rounded-lg px-2 py-2 text-xs font-bold transition ${
                        form.tone === t.id
                          ? "bg-[#075a01] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>CTA Button Text</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => updateField("ctaText", e.target.value)}
                  placeholder="Get Started"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Zap className="h-4 w-4 text-[#075a01]" />
                  Key Features (3-6)
                </h3>
                {features.length < 6 && (
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={f}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      placeholder={`Feature ${i + 1}`}
                      className={inputClass}
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Users className="h-4 w-4 text-[#075a01]" />
                Social Proof (optional)
              </h3>

              <div>
                <label className={labelClass}>Testimonial, stat, or proof point</label>
                <textarea
                  rows={2}
                  value={form.socialProof}
                  onChange={(e) => updateField("socialProof", e.target.value)}
                  placeholder='e.g. "Used by 5,000+ founders" or paste a real testimonial'
                  className={`${inputClass} resize-none`}
                />
                <p className="mt-1 text-xs text-gray-400">Leave empty if you don't have any — AI won't fake testimonials</p>
              </div>
            </div>

                        {/* Language (Pro) */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Languages className="h-4 w-4 text-[#075a01]" />
                Language
                {!isPro && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    <Crown className="h-2.5 w-2.5" /> PRO
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      if (!isPro && l.id !== "en") { setShowUpgradeModal(true); return; }
                      updateField("language", l.id);
                    }}
                    className={`rounded-lg px-2 py-2 text-xs font-bold transition ${
                      form.language === l.id
                        ? "bg-[#075a01] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {l.label}
                    {!isPro && l.id !== "en" && <Lock className="h-2.5 w-2.5 inline ml-0.5 text-amber-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sections to include */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <MessageSquare className="h-4 w-4 text-[#075a01]" />
                Sections
              </h3>

              <SectionToggle label="FAQ section" checked={form.includeFaq} onChange={() => updateField("includeFaq", !form.includeFaq)} />
              <SectionToggle label="Pricing table" checked={form.includePricing && isPro} pro={!isPro} onChange={() => handleProToggle("includePricing")} />
              <SectionToggle label="Email capture form" checked={form.includeEmailCapture && isPro} pro={!isPro} onChange={() => handleProToggle("includeEmailCapture")} />
              <SectionToggle label="Multiple testimonials" checked={form.includeTestimonials && isPro} pro={!isPro} onChange={() => handleProToggle("includeTestimonials")} />
              <SectionToggle label="Team / About section" checked={form.includeTeam && isPro} pro={!isPro} onChange={() => handleProToggle("includeTeam")} />
              <SectionToggle label="Lead magnet (freebie)" checked={form.includeLeadMagnet && isPro} pro={!isPro} onChange={() => handleProToggle("includeLeadMagnet")} />
              <SectionToggle label="Video section" checked={form.includeVideo && isPro} pro={!isPro} onChange={() => handleProToggle("includeVideo")} />
              <SectionToggle label="Custom footer" checked={form.includeFooter && isPro} pro={!isPro} onChange={() => handleProToggle("includeFooter")} />
              <SectionToggle label="Live chat (Tawk.to)" checked={form.includeChat && isPro} pro={!isPro} onChange={() => handleProToggle("includeChat")} />
            </div>

            {/* Team Members (only if includeTeam is on) */}
            {form.includeTeam && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <UserSquare className="h-4 w-4 text-[#075a01]" />
                    Team Members (up to 6)
                  </h3>
                  {teamMembers.length < 6 && (
                    <button type="button" onClick={addTeamMember} className="flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition">
                      <Plus className="h-3 w-3" /> Add
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {teamMembers.map((m, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Member {i + 1}</span>
                        {teamMembers.length > 1 && (
                          <button type="button" onClick={() => removeTeamMember(i)} className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-start gap-2">
                        <label className="shrink-0 cursor-pointer">
                          <div className="h-12 w-12 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#075a01] transition relative">
                            {uploadingPhoto === `team-${i}` ? (
                              <Loader2 className="h-5 w-5 text-[#075a01] animate-spin" />
                            ) : m.photo ? (
                              <img src={m.photo} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <UserSquare className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleTeamPhotoUpload(i, e)} disabled={uploadingPhoto === `team-${i}`} />
                        </label>
                        <div className="flex-1 space-y-1.5">
                          <input type="text" value={m.name} onChange={(e) => updateTeamMember(i, "name", e.target.value)} placeholder="Full name" className={inputClass + " py-1.5 text-xs"} />
                          <input type="text" value={m.role} onChange={(e) => updateTeamMember(i, "role", e.target.value)} placeholder="Role / job title" className={inputClass + " py-1.5 text-xs"} />
                        </div>
                      </div>
                      <input type="text" value={m.bio} onChange={(e) => updateTeamMember(i, "bio", e.target.value)} placeholder="Short bio (optional — AI will polish)" className={inputClass + " py-1.5 text-xs"} />
                    </div>
                  ))}
                </div>
              </div>
            )}

                        {/* Pricing tiers form */}
            {form.includePricing && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Crown className="h-4 w-4 text-[#075a01]" />
                    Pricing Tiers ({pricingTiers.length}/5)
                  </h3>
                  {pricingTiers.length < 5 && (
                    <button type="button" onClick={addPricingTier} className="flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition">
                      <Plus className="h-3 w-3" /> Add Tier
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {pricingTiers.map((tier, i) => (
                    <div key={i} className={`rounded-xl border p-3 space-y-2.5 ${tier.popular ? "border-[#075a01] bg-[#075a01]/5" : "border-gray-100 bg-gray-50"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Tier {i + 1}{tier.popular && <span className="ml-2 text-[#075a01]">★ POPULAR</span>}
                        </span>
                        {pricingTiers.length > 1 && (
                          <button type="button" onClick={() => removePricingTier(i)} className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updatePricingTier(i, "name", e.target.value)}
                          placeholder="Tier name"
                          className={inputClass + " py-2 text-xs"}
                        />
                        <input
                          type="text"
                          value={tier.cta}
                          onChange={(e) => updatePricingTier(i, "cta", e.target.value)}
                          placeholder="Button text"
                          className={inputClass + " py-2 text-xs"}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => updatePricingTier(i, "price", e.target.value)}
                          placeholder="$29"
                          className={inputClass + " py-2 text-xs col-span-2"}
                        />
                        <select
                          value={tier.period}
                          onChange={(e) => updatePricingTier(i, "period", e.target.value)}
                          className={inputClass + " py-2 text-xs"}
                        >
                          <option value="month">/month</option>
                          <option value="year">/year</option>
                          <option value="week">/week</option>
                          <option value="one-time">one-time</option>
                          <option value="">no period</option>
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[10px] font-semibold text-gray-600">Features ({tier.features.length})</label>
                          {tier.features.length < 10 && (
                            <button type="button" onClick={() => addPricingFeature(i)} className="flex items-center gap-0.5 text-[10px] font-bold text-[#075a01] hover:text-[#0a8f01]">
                              <Plus className="h-2.5 w-2.5" /> Add
                            </button>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {tier.features.map((f, fi) => (
                            <div key={fi} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={f}
                                onChange={(e) => updatePricingFeature(i, fi, e.target.value)}
                                placeholder={`Feature ${fi + 1}`}
                                className={inputClass + " py-1.5 text-xs"}
                              />
                              {tier.features.length > 1 && (
                                <button type="button" onClick={() => removePricingFeature(i, fi)} className="shrink-0 rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => updatePricingTier(i, "popular", !tier.popular)}
                        className={`w-full text-xs font-bold py-1.5 rounded-lg transition ${
                          tier.popular
                            ? "bg-[#075a01] text-white"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {tier.popular ? "★ Marked as Popular" : "Mark as Popular"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

                        {/* FAQ items form */}
            {form.includeFaq && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <MessageSquare className="h-4 w-4 text-[#075a01]" />
                    FAQ Questions ({faqItems.length}/10)
                  </h3>
                  {faqItems.length < 10 && (
                    <button type="button" onClick={addFaqItem} className="flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition">
                      <Plus className="h-3 w-3" /> Add
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 mb-3">
                  Write your own questions. Leave answers blank and AI will fill them in — or write your own.
                </p>

                <div className="space-y-2.5">
                  {faqItems.map((item, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Q{i + 1}
                        </span>
                        {faqItems.length > 1 && (
                          <button type="button" onClick={() => removeFaqItem(i)} className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={item.q}
                        onChange={(e) => updateFaqItem(i, "q", e.target.value)}
                        placeholder="Question (e.g. How long does it take?)"
                        className={inputClass + " py-2 text-xs"}
                      />
                      <textarea
                        rows={2}
                        value={item.a}
                        onChange={(e) => updateFaqItem(i, "a", e.target.value)}
                        placeholder="Answer (optional — leave blank for AI to write)"
                        className={inputClass + " py-2 text-xs resize-none"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

                        {/* Testimonials form */}
            {form.includeTestimonials && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Users className="h-4 w-4 text-[#075a01]" />
                    Testimonials ({userTestimonials.length}/5)
                  </h3>
                  {userTestimonials.length < 5 && (
                    <button type="button" onClick={addTestimonial} className="flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition">
                      <Plus className="h-3 w-3" /> Add
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 mb-3">
                  Enter real testimonials. Leave any field blank to skip that entry. If you only add 1-2, AI will fill the rest with realistic-sounding ones (won't fake your specific customers).
                </p>

                <div className="space-y-3">
                  {userTestimonials.map((t, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Testimonial {i + 1}
                        </span>
                        {userTestimonials.length > 1 && (
                          <button type="button" onClick={() => removeTestimonial(i)} className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-600 transition">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-start gap-2">
                        <label className="shrink-0 cursor-pointer">
                          <div className="h-12 w-12 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#075a01] transition relative">
                            {uploadingPhoto === `testimonial-${i}` ? (
                              <Loader2 className="h-5 w-5 text-[#075a01] animate-spin" />
                            ) : t.photo ? (
                              <img src={t.photo} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <Users className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleTestimonialPhotoUpload(i, e)} disabled={uploadingPhoto === `testimonial-${i}`} />
                        </label>
                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => updateTestimonial(i, "name", e.target.value)}
                            placeholder="Customer name"
                            className={inputClass + " py-1.5 text-xs"}
                          />
                          <div className="grid grid-cols-2 gap-1.5">
                            <input
                              type="text"
                              value={t.role}
                              onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                              placeholder="Role"
                              className={inputClass + " py-1.5 text-xs"}
                            />
                            <input
                              type="text"
                              value={t.company}
                              onChange={(e) => updateTestimonial(i, "company", e.target.value)}
                              placeholder="Company"
                              className={inputClass + " py-1.5 text-xs"}
                            />
                          </div>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={t.quote}
                        onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
                        placeholder="What they said — AI will polish if rough"
                        className={inputClass + " py-2 text-xs resize-none"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lead Magnet config */}
            {form.includeLeadMagnet && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Download className="h-4 w-4 text-[#075a01]" />
                  Lead Magnet (Free Download)
                </h3>
                <div>
                  <label className={labelClass}>Freebie title</label>
                  <input type="text" value={form.leadMagnetTitle} onChange={(e) => updateField("leadMagnetTitle", e.target.value)} placeholder="e.g. The Complete Marketing Playbook" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>What's inside (optional)</label>
                  <textarea rows={2} value={form.leadMagnetDescription} onChange={(e) => updateField("leadMagnetDescription", e.target.value)} placeholder="Brief description — AI will write the bullets" className={`${inputClass} resize-none`} />
                </div>
                <div>
                  <label className={labelClass}>Download URL (your PDF/file)</label>
                  <input type="url" value={form.leadMagnetUrl} onChange={(e) => updateField("leadMagnetUrl", e.target.value)} placeholder="https://yoursite.com/freebie.pdf" className={inputClass} />
                  <p className="mt-1 text-xs text-gray-400">After someone submits email, they see this download link</p>
                </div>
              </div>
            )}

            {/* Video config */}
            {form.includeVideo && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Video className="h-4 w-4 text-[#075a01]" />
                  Video Section
                </h3>
                <div>
                  <label className={labelClass}>YouTube or Vimeo URL</label>
                  <input type="url" value={form.videoUrl} onChange={(e) => updateField("videoUrl", e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Context (what's the video about)</label>
                  <input type="text" value={form.videoTitle} onChange={(e) => updateField("videoTitle", e.target.value)} placeholder="e.g. Product demo, founder story, customer story" className={inputClass} />
                </div>
              </div>
            )}

            {/* Footer config */}
            {form.includeFooter && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <Link2 className="h-4 w-4 text-[#075a01]" />
                  Footer Details
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-1">Email</label>
                    <input type="email" value={form.footerEmail} onChange={(e) => updateField("footerEmail", e.target.value)} placeholder="hello@..." className={inputClass + " py-2 text-xs"} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-600 mb-1">Phone</label>
                    <input type="tel" value={form.footerPhone} onChange={(e) => updateField("footerPhone", e.target.value)} placeholder="+234..." className={inputClass + " py-2 text-xs"} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-1">Address</label>
                  <input type="text" value={form.footerAddress} onChange={(e) => updateField("footerAddress", e.target.value)} placeholder="Lagos, Nigeria" className={inputClass + " py-2 text-xs"} />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-600 mb-1.5">Social links (URLs)</label>
                  <div className="space-y-1.5">
                    <input type="url" value={form.footerSocials?.twitter || ""} onChange={(e) => updateFooterSocial("twitter", e.target.value)} placeholder="Twitter / X URL" className={inputClass + " py-2 text-xs"} />
                    <input type="url" value={form.footerSocials?.instagram || ""} onChange={(e) => updateFooterSocial("instagram", e.target.value)} placeholder="Instagram URL" className={inputClass + " py-2 text-xs"} />
                    <input type="url" value={form.footerSocials?.linkedin || ""} onChange={(e) => updateFooterSocial("linkedin", e.target.value)} placeholder="LinkedIn URL" className={inputClass + " py-2 text-xs"} />
                    <input type="url" value={form.footerSocials?.facebook || ""} onChange={(e) => updateFooterSocial("facebook", e.target.value)} placeholder="Facebook URL" className={inputClass + " py-2 text-xs"} />
                  </div>
                </div>
              </div>
            )}

            {/* Tawk.to chat config */}
            {form.includeChat && isPro && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                  <MessageCircle className="h-4 w-4 text-[#075a01]" />
                  Live Chat (Tawk.to)
                </h3>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs text-amber-800 font-semibold mb-1">100% Free Setup:</p>
                  <ol className="text-[11px] text-amber-700 space-y-0.5 list-decimal list-inside">
                    <li>Go to <a href="https://tawk.to" target="_blank" rel="noopener noreferrer" className="underline font-bold">tawk.to</a> → sign up free</li>
                    <li>Create a property → copy Property ID + Widget ID</li>
                    <li>Paste below — chat appears on your published page</li>
                  </ol>
                </div>
                <div>
                  <label className={labelClass}>Tawk.to Property ID</label>
                  <input type="text" value={form.tawkPropertyId} onChange={(e) => updateField("tawkPropertyId", e.target.value)} placeholder="e.g. 64abc..." className={inputClass + " font-mono text-xs"} />
                </div>
                <div>
                  <label className={labelClass}>Tawk.to Widget ID</label>
                  <input type="text" value={form.tawkWidgetId} onChange={(e) => updateField("tawkWidgetId", e.target.value)} placeholder="e.g. 1h2i3..." className={inputClass + " font-mono text-xs"} />
                </div>
              </div>
            )}

            {/* Brand (Pro) */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                <Palette className="h-4 w-4 text-[#075a01]" />
                Brand
                {!isPro && (
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    <Crown className="h-2.5 w-2.5" />
                    PRO
                  </span>
                )}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Primary Color</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
                    <input
                      type="color"
                      value={form.brandColor}
                      onChange={(e) => isPro && updateField("brandColor", e.target.value)}
                      disabled={!isPro}
                      className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent disabled:cursor-not-allowed"
                    />
                    <code className="text-xs font-mono text-gray-700">{form.brandColor}</code>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Accent</label>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 p-2">
                    <input
                      type="color"
                      value={form.brandAccent}
                      onChange={(e) => isPro && updateField("brandAccent", e.target.value)}
                      disabled={!isPro}
                      className="h-7 w-7 cursor-pointer rounded-md border-0 bg-transparent disabled:cursor-not-allowed"
                    />
                    <code className="text-xs font-mono text-gray-700">{form.brandAccent}</code>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Logo (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={!isPro || uploadingPhoto === "logo"}
                  className="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#075a01] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {uploadingPhoto === "logo" && (
                  <p className="mt-2 text-xs text-[#075a01] flex items-center gap-1.5 font-semibold">
                    <Loader2 className="h-3 w-3 animate-spin" /> Compressing logo...
                  </p>
                )}
                {form.logo && isPro && uploadingPhoto !== "logo" && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={form.logo} alt="Logo" className="h-10 w-10 rounded-lg object-contain border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => updateField("logo", "")}
                      className="text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Generate button */}
            <button
              type="submit"
              disabled={loading || !form.businessName || !form.description}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold shadow-lg hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating your landing page...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Landing Page
                </>
              )}
            </button>
          </form>

          {/* RIGHT — RESULT */}
          <div id="page-result" className="lg:sticky lg:top-4 lg:self-start">
            {!page ? (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center min-h-[500px] flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-[#075a01]" />
                </div>
                <p className="text-sm font-bold text-gray-700">Your landing page will appear here</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Fill in the basics on the left and click Generate. AI will write all your copy in 10–15 seconds.
                </p>
              </div>
                        ) : (
              <div className="space-y-3">
                {/* Action bar */}
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-xs sm:text-sm font-bold text-gray-900">Your landing page</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(copyAllText(page), "all")}
                      className="flex items-center gap-1.5 rounded-lg bg-[#075a01]/10 px-2.5 py-1.5 text-xs font-bold text-[#075a01] hover:bg-[#075a01]/20 transition"
                    >
                      {copiedSection === "all" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span className="hidden sm:inline">{copiedSection === "all" ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={openPublishModal}
                      style={isPro ? { background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" } : {}}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        isPro
                          ? "hover:opacity-90 shadow"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {isPro ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3 text-amber-500" />}
                      <span>{isPro ? "Publish to Web" : "Publish (Pro)"}</span>
                    </button>
                  </div>
                </div>

                {/* Live styled preview */}
                <div
                  className="rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-200 max-h-[80vh] overflow-y-auto"
                  style={{ "--brand": form.brandColor, "--accent": form.brandAccent }}
                >
                  <LandingPagePreview
                    page={page}
                    form={form}
                    onCopy={copyToClipboard}
                    copiedSection={copiedSection}
                    hoverSection={hoverSection}
                    setHoverSection={setHoverSection}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

                  {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !publishing && setShowPublishModal(false)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

            {!publishedUrl ? (
              <>
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ background: "linear-gradient(135deg, #075a01, #0a8f01)" }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                    >
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Publish to Web</h3>
                      <p className="text-xs text-gray-500">Get a live URL anyone can visit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => !publishing && setShowPublishModal(false)}
                    disabled={publishing}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Choose your URL</label>
                    <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#075a01] focus-within:ring-2 focus-within:ring-[#075a01]/20 transition">
                      <span className="bg-gray-50 px-3 py-2.5 text-xs text-gray-500 border-r border-gray-200 whitespace-nowrap">
                        fancydigitals.com.ng/p/
                      </span>
                      <input
                        type="text"
                        value={publishSlug}
                        onChange={(e) => updatePublishSlug(e.target.value)}
                        placeholder="my-business"
                        maxLength={30}
                        className="flex-1 px-3 py-2.5 text-sm outline-none"
                        disabled={publishing}
                      />
                    </div>
                    <div className="mt-2 min-h-[20px]">
                      {slugStatus.checking && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Checking availability...
                        </p>
                      )}
                      {!slugStatus.checking && slugStatus.available === true && (
                        <p className="text-xs text-green-600 flex items-center gap-1 font-semibold">
                          <Check className="h-3 w-3" />
                          {publishSlug} is available!
                        </p>
                      )}
                      {!slugStatus.checking && slugStatus.error && (
                        <p className="text-xs text-red-600 flex items-center gap-1 font-semibold">
                          <AlertCircle className="h-3 w-3" />
                          {slugStatus.error}
                        </p>
                      )}
                      {!slugStatus.checking && !slugStatus.error && publishSlug.length > 0 && publishSlug.length < 3 && (
                        <p className="text-xs text-gray-400">Minimum 3 characters</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#075a01]/5 border border-[#075a01]/10 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#075a01] mb-1.5">What happens when you publish</p>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li className="flex gap-2"><span className="text-[#075a01]">→</span>Page goes live instantly at your URL</li>
                      <li className="flex gap-2"><span className="text-[#075a01]">→</span>Email capture form starts collecting leads</li>
                      <li className="flex gap-2"><span className="text-[#075a01]">→</span>You can edit or unpublish anytime</li>
                      <li className="flex gap-2"><span className="text-[#075a01]">→</span>SEO meta is auto-generated for Google</li>
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 p-5 border-t border-gray-100">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    disabled={publishing}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={publishing || slugStatus.available !== true}
                    style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {publishing ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Publishing...</>
                    ) : (
                      <><Globe className="h-4 w-4" /> Publish Live</>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Success state */}
                <div className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">You're live!</h3>
                  <p className="text-sm text-gray-600 mb-5">Your landing page is now published and collecting leads.</p>

                  <div className="rounded-xl border-2 border-[#075a01]/20 bg-[#075a01]/5 p-3 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#075a01] mb-1">Your live URL</p>
                    <p className="text-sm font-mono text-gray-800 break-all">{publishedUrl}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={copyPublishedUrl}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
                    >
                      {copiedUrl ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      {copiedUrl ? "Copied!" : "Copy URL"}
                    </button>
                    <a
                      href={publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90 transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live
                    </a>
                  </div>

                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="mt-3 text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowUpgradeModal(false)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-center text-lg font-bold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-center text-sm text-gray-600 mb-5">
              Pricing tables, email capture, custom brand colors, and logo upload are Pro features. Upgrade to unlock unlimited landing pages with all premium features.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/pricing"
                style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold hover:opacity-90 transition"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Link>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function SectionWrap({ id, copyText, onCopy, copiedSection, hoverSection, setHoverSection, children, className = "" }) {
  return (
    <div
      onMouseEnter={() => setHoverSection(id)}
      onMouseLeave={() => setHoverSection("")}
      className={`relative group ${className}`}
    >
      <button
        onClick={() => onCopy(copyText, id)}
        className={`absolute top-3 right-3 z-20 flex items-center gap-1 rounded-lg bg-white shadow-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-bold transition ${
          hoverSection === id ? "opacity-100" : "opacity-0"
        } sm:group-hover:opacity-100 max-sm:opacity-100`}
      >
        {copiedSection === id ? (
          <><Check className="h-3 w-3 text-green-600" /> Copied</>
        ) : (
          <><Copy className="h-3 w-3 text-gray-600" /> Copy</>
        )}
      </button>
      {children}
    </div>
  );
}

function LandingPagePreview({ page, form, onCopy, copiedSection, hoverSection, setHoverSection }) {
  const brand = form.brandColor || "#075a01";
  const accent = form.brandAccent || "#ff914d";
  const wrapProps = { onCopy, copiedSection, hoverSection, setHoverSection };
  const tone = form.tone || "Professional";

  // Tone-based design system
  const T = getToneStyles(tone, brand, accent);

  return (
    <div className={T.body} style={{ fontFamily: T.font }}>

      {/* Mini browser top bar */}
      <div className="flex items-center gap-1.5 bg-gray-50 border-b border-gray-100 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 truncate">{form.businessName?.toLowerCase().replace(/\s+/g, "")}.com</span>
      </div>

      {/* NAV */}
      <nav className={T.nav}>
        <div className="flex items-center gap-2">
          {form.logo && <img src={form.logo} alt="" className={T.logo} />}
          <span className={T.brandName} style={{ color: tone === "Minimal" ? T.text : brand }}>{form.businessName}</span>
        </div>
        <button className={T.navCta} style={{ background: brand, color: "#fff" }}>
          {page.hero?.cta}
        </button>
      </nav>

      {/* HERO */}
      <SectionWrap
        id="hero"
        copyText={`${page.hero?.headline}\n${page.hero?.subheadline}\nCTA: ${page.hero?.cta}`}
        {...wrapProps}
      >
        <div
          className={T.heroWrap}
          style={tone === "Bold" ? { background: brand, color: "#fff" } : tone === "Minimal" ? { background: "#fff" } : { background: `linear-gradient(180deg, ${brand}08 0%, ${accent}05 100%)` }}
        >
          {tone === "Professional" && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-sm border border-gray-100 px-3 py-1 text-[10px] font-bold mb-5" style={{ color: brand }}>
              <Sparkles className="h-3 w-3" />
              {form.tagline || "NEW"}
            </div>
          )}
          {tone === "Minimal" && form.tagline && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6">{form.tagline}</p>
          )}
          {tone === "Bold" && form.tagline && (
            <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: accent }}>★ {form.tagline} ★</p>
          )}

          <h1 className={T.h1}>{page.hero?.headline}</h1>
          <p className={T.heroSub}>{page.hero?.subheadline}</p>

          <div className={T.heroCtaWrap}>
            <button className={T.heroCtaPrimary} style={tone === "Bold" ? { background: accent, color: "#000" } : { background: brand, color: "#fff" }}>
              {page.hero?.cta} →
            </button>
            {page.hero?.secondaryCta && (
              <button className={T.heroCtaSecondary} style={tone === "Bold" ? { borderColor: "#fff", color: "#fff" } : {}}>
                {page.hero.secondaryCta}
              </button>
            )}
          </div>
        </div>
      </SectionWrap>

      {/* STATS */}
      {(page.socialProof?.stat1?.number || page.socialProof?.stat2?.number) && (
        <SectionWrap
          id="stats"
          copyText={`${page.socialProof.stat1?.number || ""} ${page.socialProof.stat1?.label || ""} | ${page.socialProof.stat2?.number || ""} ${page.socialProof.stat2?.label || ""}`}
          {...wrapProps}
        >
          <div className={T.statsWrap}>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {page.socialProof.stat1?.number && (
                <div className="text-center">
                  <p className={T.statNum} style={{ color: brand }}>{page.socialProof.stat1.number}</p>
                  <p className={T.statLabel}>{page.socialProof.stat1.label}</p>
                </div>
              )}
              {page.socialProof.stat2?.number && (
                <div className="text-center">
                  <p className={T.statNum} style={{ color: brand }}>{page.socialProof.stat2.number}</p>
                  <p className={T.statLabel}>{page.socialProof.stat2.label}</p>
                </div>
              )}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* PROBLEM */}
      {page.problem?.headline && (
        <SectionWrap
          id="problem"
          copyText={`${page.problem.headline}\n${(page.problem.points || []).map(p => `• ${p}`).join("\n")}`}
          {...wrapProps}
        >
          <div className={T.sectionPad + " text-center"}>
            <p className={T.eyebrow} style={{ color: accent }}>The Problem</p>
            <h2 className={T.h2}>{page.problem.headline}</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {page.problem.points?.map((p, i) => (
                <div key={i} className={T.problemCard}>
                  <div className="h-6 w-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mb-2">✕</div>
                  <p className="text-xs sm:text-sm text-gray-700">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* FEATURES */}
      {page.features?.length > 0 && (
        <SectionWrap
          id="features"
          copyText={page.features.map(f => `${f.title}: ${f.desc}`).join("\n\n")}
          {...wrapProps}
        >
          <div className={T.sectionPadAlt}>
            <div className="text-center mb-10">
              <p className={T.eyebrow} style={{ color: brand }}>Features</p>
              <h2 className={T.h2}>Everything you need</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {page.features.map((f, i) => (
                <div key={i} className={T.featureCard}>
                  <div className={T.featureIcon} style={{ background: tone === "Bold" ? brand : `${brand}15`, color: tone === "Bold" ? "#fff" : brand }}>
                    <Zap className="h-4 w-4" />
                  </div>
                  <p className={T.featureTitle}>{f.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* BENEFITS */}
      {page.benefits?.headline && (
        <SectionWrap
          id="benefits"
          copyText={`${page.benefits.headline}\n${(page.benefits.items || []).map(i => `• ${i}`).join("\n")}`}
          {...wrapProps}
        >
          <div className={T.sectionPad}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              <div>
                <p className={T.eyebrow} style={{ color: brand }}>Benefits</p>
                <h2 className={T.h2 + " text-left"}>{page.benefits.headline}</h2>
              </div>
              <div className="space-y-2.5">
                {page.benefits.items?.map((b, i) => (
                  <div key={i} className={T.benefitItem}>
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: brand }}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-sm text-gray-700">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrap>
      )}

      {/* TESTIMONIAL */}
      {page.socialProof?.testimonial?.quote && (
        <SectionWrap
          id="testimonial"
          copyText={`"${page.socialProof.testimonial.quote}" — ${page.socialProof.testimonial.name}, ${page.socialProof.testimonial.role}`}
          {...wrapProps}
        >
          <div className={T.testimonialWrap} style={tone === "Bold" ? { background: brand } : tone === "Minimal" ? { background: "#fafafa" } : { background: "#111827" }}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl sm:text-5xl leading-none mb-4" style={{ color: tone === "Minimal" ? brand : accent }}>"</div>
              <p className={T.testimonialQuote} style={{ color: tone === "Minimal" ? "#111827" : "#fff" }}>
                {page.socialProof.testimonial.quote}
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: brand }}>
                  {page.socialProof.testimonial.name?.[0] || "U"}
                </div>
                <div className="text-left">
                  <p className={`text-sm font-bold ${tone === "Minimal" ? "text-gray-900" : "text-white"}`}>{page.socialProof.testimonial.name}</p>
                  <p className={`text-xs ${tone === "Minimal" ? "text-gray-500" : "text-gray-300"}`}>{page.socialProof.testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        </SectionWrap>
      )}

            {/* MULTIPLE TESTIMONIALS */}
      {page.testimonials?.items?.length > 0 && (
        <SectionWrap
          id="testimonials"
          copyText={page.testimonials.items.map(t => `"${t.quote}" — ${t.name}, ${t.role} at ${t.company}`).join("\n\n")}
          {...wrapProps}
        >
          <div className={T.sectionPad}>
            <div className="text-center mb-10">
              <p className={T.eyebrow} style={{ color: brand }}>Testimonials</p>
              <h2 className={T.h2}>{page.testimonials.headline}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {page.testimonials.items.map((t, i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
                  <div className="text-3xl leading-none mb-2" style={{ color: accent }}>"</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{t.quote}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden" style={{ background: brand }}>
                      {t.photo ? <img src={t.photo} alt={t.name} className="h-full w-full object-cover" /> : (t.name?.[0] || "?")}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{t.name}</p>
                      <p className="text-[10px] text-gray-500">{t.role}{t.company && ` · ${t.company}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* TEAM */}
      {page.team?.members?.length > 0 && (
        <SectionWrap
          id="team"
          copyText={`${page.team.headline}\n${page.team.subheadline}\n${page.team.members.map(m => `${m.name} — ${m.role}\n${m.bio}`).join("\n\n")}`}
          {...wrapProps}
        >
          <div className={T.sectionPadAlt}>
            <div className="text-center mb-10">
              <p className={T.eyebrow} style={{ color: brand }}>Team</p>
              <h2 className={T.h2}>{page.team.headline}</h2>
              {page.team.subheadline && <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">{page.team.subheadline}</p>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {page.team.members.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 mb-3" style={{ borderColor: `${brand}20` }}>
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: brand }}>
                        {m.name?.[0] || "?"}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-900">{m.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{m.role}</p>
                  {m.bio && <p className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed">{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* VIDEO */}
      {page.video?.headline && page.video?.videoUrl && (
        <SectionWrap
          id="video"
          copyText={`${page.video.headline}\n${page.video.subheadline}`}
          {...wrapProps}
        >
          <div className={T.sectionPad + " text-center"}>
            {page.video.eyebrow && <p className={T.eyebrow} style={{ color: brand }}>{page.video.eyebrow}</p>}
            <h2 className={T.h2}>{page.video.headline}</h2>
            {page.video.subheadline && <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">{page.video.subheadline}</p>}
            <div className="mt-8 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
              <iframe
                src={getEmbedUrl(page.video.videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={page.video.headline}
              />
            </div>
          </div>
        </SectionWrap>
      )}

      {/* LEAD MAGNET */}
      {page.leadMagnet?.headline && (
        <SectionWrap
          id="leadMagnet"
          copyText={`${page.leadMagnet.headline}\n${page.leadMagnet.subheadline}\n${(page.leadMagnet.bulletPoints || []).map(b => `• ${b}`).join("\n")}\nButton: ${page.leadMagnet.buttonText}`}
          {...wrapProps}
        >
          <div className={T.sectionPadAlt}>
            <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 sm:p-8 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}>
                  <Download className="h-10 w-10 text-white mb-3" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">{page.leadMagnet.eyebrow}</p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{page.leadMagnet.headline}</h3>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm text-gray-700 mb-4">{page.leadMagnet.subheadline}</p>
                  <ul className="space-y-2 mb-5">
                    {page.leadMagnet.bulletPoints?.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: brand }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl bg-gray-50 p-3 text-center border border-dashed border-gray-200">
                    <p className="text-[10px] text-gray-500">Email capture form goes here</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">(works on published page)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrap>
      )}

      {/* PRICING */}
      {page.pricing?.length > 0 && (
        <SectionWrap
          id="pricing"
          copyText={page.pricing.map(t => `${t.name} — ${t.price}/${t.period}\n${t.features.map(f => `• ${f}`).join("\n")}`).join("\n\n")}
          {...wrapProps}
        >
          <div className={T.sectionPadAlt}>
            <div className="text-center mb-10">
              <p className={T.eyebrow} style={{ color: brand }}>Pricing</p>
              <h2 className={T.h2}>Simple pricing</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {page.pricing.map((t2, i) => (
                <div key={i} className={`relative ${T.pricingCard} ${t2.popular ? T.pricingPopular : ""}`} style={t2.popular ? { borderColor: brand } : {}}>
                  {t2.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: brand }}>
                      MOST POPULAR
                    </span>
                  )}
                  <p className="text-sm font-bold text-gray-900">{t2.name}</p>
                  <div className="mt-3">
                    <span className={T.price} style={{ color: brand }}>{t2.price}</span>
                    <span className="text-xs text-gray-500">/{t2.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {t2.features?.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: brand }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-5 w-full rounded-xl py-2.5 text-xs font-bold transition" style={t2.popular ? { background: brand, color: "#fff" } : { background: "#f3f4f6", color: "#374151" }}>
                    {t2.cta || "Get Started"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* EMAIL CAPTURE */}
      {page.emailCapture?.headline && (
        <SectionWrap
          id="email"
          copyText={`${page.emailCapture.headline}\n${page.emailCapture.subheadline}\nButton: ${page.emailCapture.buttonText}`}
          {...wrapProps}
        >
          <div className={T.sectionPad + " text-center"}>
            <h2 className={T.h2}>{page.emailCapture.headline}</h2>
            <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto">{page.emailCapture.subheadline}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder={page.emailCapture.placeholder} className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none" />
              <button className="rounded-xl px-5 py-3 text-sm font-bold text-white" style={{ background: brand }}>
                {page.emailCapture.buttonText}
              </button>
            </div>
          </div>
        </SectionWrap>
      )}

      {/* FAQ */}
      {page.faq?.length > 0 && (
        <SectionWrap
          id="faq"
          copyText={page.faq.map(f => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}
          {...wrapProps}
        >
          <div className={T.sectionPadAlt}>
            <div className="text-center mb-10">
              <p className={T.eyebrow} style={{ color: brand }}>FAQ</p>
              <h2 className={T.h2}>Questions, answered</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-2">
              {page.faq.map((f, i) => (
                <details key={i} className={T.faqItem}>
                  <summary className="flex items-center justify-between text-sm font-bold text-gray-900 list-none cursor-pointer">
                    {f.q}
                    <span className="text-lg leading-none group-open:rotate-45 transition-transform" style={{ color: brand }}>+</span>
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </SectionWrap>
      )}

      {/* FINAL CTA */}
      {page.finalCta?.headline && (
        <SectionWrap
          id="finalCta"
          copyText={`${page.finalCta.headline}\n${page.finalCta.subheadline}\nCTA: ${page.finalCta.cta}`}
          {...wrapProps}
        >
          <div
            className={T.finalCtaWrap}
            style={tone === "Bold" ? { background: "#000" } : tone === "Minimal" ? { background: "#fafafa" } : { background: `linear-gradient(135deg, ${brand}, ${accent})` }}
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className={T.finalH2} style={tone === "Minimal" ? { color: "#111827" } : { color: "#fff" }}>
                {page.finalCta.headline}
              </h2>
              <p className={T.finalSub} style={tone === "Minimal" ? { color: "#6b7280" } : { color: "rgba(255,255,255,0.9)" }}>
                {page.finalCta.subheadline}
              </p>
              <button className="mt-6 rounded-xl px-7 py-3 text-sm font-bold shadow-xl hover:scale-105 transition" style={tone === "Bold" ? { background: accent, color: "#000" } : tone === "Minimal" ? { background: brand, color: "#fff" } : { background: "#fff", color: brand }}>
                {page.finalCta.cta} →
              </button>
            </div>
          </div>
        </SectionWrap>
      )}

      {/* CUSTOM FOOTER */}
      {page.footer ? (
        <SectionWrap
          id="footer"
          copyText={`${page.footer.tagline}\n${page.footer.email || ""}\n${page.footer.phone || ""}\n${page.footer.address || ""}`}
          {...wrapProps}
        >
          <div className="px-5 sm:px-10 py-10 bg-gray-900 text-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: accent }}>{form.businessName}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{page.footer.tagline}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Contact</p>
                <div className="space-y-1.5 text-xs text-gray-300">
                  {page.footer.email && <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{page.footer.email}</p>}
                  {page.footer.phone && <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{page.footer.phone}</p>}
                  {page.footer.address && <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{page.footer.address}</p>}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Follow</p>
                <div className="flex gap-2">
                  {page.footer.socials?.twitter && <a href={page.footer.socials.twitter} className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Twitter</a>}
                  {page.footer.socials?.instagram && <a href={page.footer.socials.instagram} className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Instagram</a>}
                  {page.footer.socials?.linkedin && <a href={page.footer.socials.linkedin} className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">LinkedIn</a>}
                  {page.footer.socials?.facebook && <a href={page.footer.socials.facebook} className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Facebook</a>}
                </div>
              </div>
            </div>
            <p className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gray-500 text-center">
              {page.footer.copyright}
            </p>
          </div>
        </SectionWrap>
      ) : (
        <div className="px-5 sm:px-10 py-6 text-center border-t border-gray-100 bg-white">
          <p className="text-[10px] text-gray-400">
            © 2025 {form.businessName} · Generated by Fancy Digitals
          </p>
        </div>
      )}
    </div>
  );
}

// ============ TONE DESIGN SYSTEM ============
function getToneStyles(tone, brand, accent) {
  // PROFESSIONAL — default clean SaaS
  const professional = {
    body: "bg-white text-gray-900",
    font: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    nav: "flex items-center justify-between px-5 py-4 border-b border-gray-100",
    logo: "h-7 w-7 rounded-lg object-contain",
    brandName: "font-bold text-sm",
    navCta: "rounded-lg px-3 py-1.5 text-xs font-bold",
    text: "#111827",
    heroWrap: "px-5 sm:px-10 py-12 sm:py-20 text-center",
    h1: "text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight max-w-3xl mx-auto",
    heroSub: "mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed",
    heroCtaWrap: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-2",
    heroCtaPrimary: "w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition",
    heroCtaSecondary: "w-full sm:w-auto rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition",
    statsWrap: "px-5 sm:px-10 py-6 border-b border-gray-100 bg-gray-50/50",
    statNum: "text-2xl sm:text-3xl font-extrabold",
    statLabel: "text-[10px] sm:text-xs font-semibold text-gray-500 mt-1",
    sectionPad: "px-5 sm:px-10 py-12 sm:py-16",
    sectionPadAlt: "px-5 sm:px-10 py-12 sm:py-16 bg-gray-50/50 border-y border-gray-100",
    eyebrow: "text-[10px] font-bold uppercase tracking-widest mb-2",
    h2: "text-xl sm:text-3xl font-extrabold tracking-tight",
    problemCard: "rounded-2xl border border-red-100 bg-red-50/30 p-4 text-left",
    featureCard: "rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition",
    featureIcon: "h-9 w-9 rounded-xl flex items-center justify-center mb-3",
    featureTitle: "text-sm font-bold text-gray-900",
    benefitItem: "flex items-start gap-3 rounded-xl bg-gray-50 p-3",
    testimonialWrap: "px-5 sm:px-10 py-12 sm:py-16 text-white",
    testimonialQuote: "text-base sm:text-xl font-medium leading-relaxed",
    pricingCard: "rounded-2xl p-5 bg-white border border-gray-100",
    pricingPopular: "shadow-xl border-2",
    price: "text-3xl font-extrabold",
    faqItem: "group rounded-xl bg-white border border-gray-100 p-4 cursor-pointer",
    finalCtaWrap: "px-5 sm:px-10 py-12 sm:py-20 text-center relative overflow-hidden",
    finalH2: "text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto",
    finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto",
  };

  // BOLD
  if (tone === "Bold") {
    return {
      ...professional,
      font: "'Inter', system-ui, sans-serif",
      body: "bg-white text-black",
      nav: "flex items-center justify-between px-5 py-5 border-b-2 border-black bg-white",
      brandName: "font-black text-base uppercase tracking-tight",
      navCta: "rounded-none px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black",
      heroWrap: "px-5 sm:px-10 py-16 sm:py-28 text-center",
      h1: "text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter max-w-4xl mx-auto uppercase",
      heroSub: "mt-5 text-base sm:text-lg font-medium max-w-xl mx-auto leading-snug opacity-90",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-8 py-4 text-sm font-black uppercase tracking-wider shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border-2 px-8 py-4 text-sm font-black uppercase tracking-wider transition",
      statsWrap: "px-5 sm:px-10 py-8 border-y-2 border-black bg-yellow-100",
      statNum: "text-3xl sm:text-5xl font-black tracking-tighter",
      statLabel: "text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1",
      sectionPad: "px-5 sm:px-10 py-16 sm:py-24",
      sectionPadAlt: "px-5 sm:px-10 py-16 sm:py-24 bg-black text-white border-y-4 border-black",
      eyebrow: "text-xs font-black uppercase tracking-[0.3em] mb-3",
      h2: "text-3xl sm:text-5xl font-black tracking-tighter uppercase",
      problemCard: "rounded-none border-2 border-black bg-white p-5 text-left shadow-[4px_4px_0_rgba(0,0,0,1)]",
      featureCard: "rounded-none bg-white p-5 sm:p-6 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition",
      featureIcon: "h-12 w-12 rounded-none flex items-center justify-center mb-3 border-2 border-black",
      featureTitle: "text-base font-black text-gray-900 uppercase",
      benefitItem: "flex items-start gap-3 rounded-none border-2 border-black bg-white p-4",
      testimonialWrap: "px-5 sm:px-10 py-16 sm:py-24",
      testimonialQuote: "text-xl sm:text-3xl font-black leading-tight tracking-tight",
      pricingCard: "rounded-none p-6 bg-white border-2 border-black",
      pricingPopular: "shadow-[6px_6px_0_rgba(0,0,0,1)]",
      price: "text-4xl sm:text-5xl font-black tracking-tighter",
      faqItem: "group rounded-none bg-white border-2 border-black p-4 cursor-pointer",
      finalH2: "text-3xl sm:text-5xl font-black tracking-tighter uppercase max-w-3xl mx-auto",
      finalSub: "mt-4 text-sm sm:text-base font-medium max-w-xl mx-auto",
    };
  }

  // MINIMAL
  if (tone === "Minimal") {
    return {
      ...professional,
      font: "'Georgia', 'Times New Roman', serif",
      body: "bg-white text-gray-900",
      nav: "flex items-center justify-between px-6 sm:px-12 py-6 border-b border-gray-100",
      brandName: "font-normal text-base tracking-wide",
      navCta: "rounded-none px-4 py-2 text-xs font-medium tracking-wider uppercase",
      heroWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center",
      h1: "text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-normal",
      heroCtaWrap: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-80 transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border-b border-gray-900 px-2 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-70 transition",
      statsWrap: "px-6 sm:px-12 py-12 border-b border-gray-100",
      statNum: "text-4xl sm:text-5xl font-normal tracking-tight",
      statLabel: "text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mt-2",
      sectionPad: "px-6 sm:px-12 py-20 sm:py-28",
      sectionPadAlt: "px-6 sm:px-12 py-20 sm:py-28 border-y border-gray-100",
      eyebrow: "text-[10px] font-medium tracking-[0.3em] uppercase mb-4 text-gray-400",
      h2: "text-2xl sm:text-4xl font-normal tracking-tight",
      problemCard: "border-l-2 border-gray-200 bg-transparent pl-5 py-2 text-left",
      featureCard: "p-5 sm:p-6 border-t border-gray-100 hover:border-gray-300 transition",
      featureIcon: "h-8 w-8 flex items-center justify-center mb-4",
      featureTitle: "text-base font-normal text-gray-900 tracking-tight",
      benefitItem: "flex items-start gap-3 border-b border-gray-100 py-3",
      testimonialWrap: "px-6 sm:px-12 py-20 sm:py-28",
      testimonialQuote: "text-xl sm:text-2xl font-normal italic leading-relaxed",
      pricingCard: "p-6 border-t-2 border-gray-100",
      pricingPopular: "border-t-2",
      price: "text-4xl font-normal tracking-tight",
      faqItem: "group border-b border-gray-100 py-5 cursor-pointer",
      finalCtaWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center relative overflow-hidden",
      finalH2: "text-3xl sm:text-5xl font-normal tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-4 text-base max-w-xl mx-auto font-normal",
    };
  }

  // PLAYFUL
  if (tone === "Playful") {
    return {
      ...professional,
      font: "'Nunito', 'Poppins', system-ui, sans-serif",
      body: "bg-white text-gray-900",
      nav: "flex items-center justify-between px-5 py-4 border-b-2 border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50",
      brandName: "font-extrabold text-sm",
      navCta: "rounded-full px-4 py-2 text-xs font-extrabold shadow-sm",
      heroWrap: "px-5 sm:px-10 py-16 sm:py-24 text-center",
      h1: "text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed",
      heroCtaWrap: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:scale-105 transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-full border-2 px-8 py-3.5 text-sm font-extrabold text-gray-700 bg-white/80 hover:bg-white transition",
      statsWrap: "px-5 sm:px-10 py-8 border-y border-orange-100 bg-gradient-to-r from-yellow-50 to-orange-50",
      statNum: "text-3xl sm:text-4xl font-extrabold",
      statLabel: "text-[10px] sm:text-xs font-bold text-gray-500 mt-1",
      sectionPad: "px-5 sm:px-10 py-14 sm:py-20",
      sectionPadAlt: "px-5 sm:px-10 py-14 sm:py-20 bg-gradient-to-b from-orange-50/60 to-yellow-50/40 border-y border-orange-100",
      eyebrow: "text-[10px] font-extrabold uppercase tracking-widest mb-2",
      h2: "text-2xl sm:text-4xl font-extrabold tracking-tight",
      problemCard: "rounded-3xl border border-red-100 bg-white p-4 text-left shadow-sm",
      featureCard: "rounded-3xl bg-white p-5 sm:p-6 border border-orange-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition",
      featureIcon: "h-11 w-11 rounded-2xl flex items-center justify-center mb-3",
      featureTitle: "text-sm font-extrabold text-gray-900",
      benefitItem: "flex items-start gap-3 rounded-2xl bg-white border border-orange-100 p-3.5 shadow-sm",
      testimonialWrap: "px-5 sm:px-10 py-14 sm:py-20 text-white",
      testimonialQuote: "text-base sm:text-xl font-bold leading-relaxed",
      pricingCard: "rounded-3xl p-5 bg-white border border-orange-100 shadow-sm",
      pricingPopular: "shadow-xl border-2 scale-[1.02]",
      price: "text-3xl font-extrabold",
      faqItem: "group rounded-2xl bg-white border border-orange-100 p-4 cursor-pointer shadow-sm",
      finalCtaWrap: "px-5 sm:px-10 py-14 sm:py-24 text-center relative overflow-hidden",
      finalH2: "text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto",
    };
  }

  // FRIENDLY
  if (tone === "Friendly") {
    return {
      ...professional,
      font: "'Inter', system-ui, sans-serif",
      body: "bg-slate-50 text-gray-900",
      nav: "flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white shadow-sm",
      brandName: "font-bold text-sm",
      navCta: "rounded-xl px-4 py-2 text-xs font-bold shadow-sm",
      heroWrap: "px-5 sm:px-10 py-14 sm:py-22 text-center",
      h1: "text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed",
      heroCtaWrap: "mt-7 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-2xl px-7 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-2xl border border-slate-200 px-7 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition",
      statsWrap: "px-5 sm:px-10 py-8 border-y border-slate-200 bg-white",
      statNum: "text-2xl sm:text-3xl font-bold",
      statLabel: "text-[10px] sm:text-xs font-semibold text-slate-500 mt-1",
      sectionPad: "px-5 sm:px-10 py-12 sm:py-18",
      sectionPadAlt: "px-5 sm:px-10 py-12 sm:py-18 bg-white border-y border-slate-200",
      eyebrow: "text-[10px] font-bold uppercase tracking-widest mb-2",
      h2: "text-xl sm:text-3xl font-bold tracking-tight",
      problemCard: "rounded-2xl border border-red-100 bg-red-50/50 p-4 text-left shadow-sm",
      featureCard: "rounded-2xl bg-white p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition",
      featureIcon: "h-10 w-10 rounded-xl flex items-center justify-center mb-3",
      featureTitle: "text-sm font-bold text-gray-900",
      benefitItem: "flex items-start gap-3 rounded-xl bg-white border border-slate-200 p-3 shadow-sm",
      testimonialWrap: "px-5 sm:px-10 py-12 sm:py-18 text-white",
      testimonialQuote: "text-base sm:text-lg font-medium leading-relaxed",
      pricingCard: "rounded-2xl p-5 bg-white border border-slate-200 shadow-sm",
      pricingPopular: "shadow-xl border-2",
      price: "text-3xl font-bold",
      faqItem: "group rounded-xl bg-white border border-slate-200 p-4 cursor-pointer shadow-sm",
      finalCtaWrap: "px-5 sm:px-10 py-14 sm:py-22 text-center relative overflow-hidden",
      finalH2: "text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto",
    };
  }

  // LUXURY
  if (tone === "Luxury") {
    return {
      ...professional,
      font: "'Cormorant Garamond', 'Georgia', serif",
      body: "bg-[#0a0a0a] text-[#e8e0d0]",
      nav: "flex items-center justify-between px-6 sm:px-12 py-6 border-b border-white/10 bg-[#0a0a0a]",
      brandName: "text-sm font-light uppercase tracking-[0.25em]",
      navCta: "rounded-none px-5 py-2 text-[10px] font-light uppercase tracking-[0.35em] border border-white/20",
      text: "#e8e0d0",
      heroWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center",
      h1: "text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-wide max-w-4xl mx-auto",
      heroSub: "mt-6 text-base sm:text-lg text-[#b8ab98] max-w-xl mx-auto leading-relaxed",
      heroCtaWrap: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-10 py-4 text-[10px] font-light uppercase tracking-[0.35em] shadow-none",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border px-10 py-4 text-[10px] font-light uppercase tracking-[0.35em]",
      statsWrap: "px-6 sm:px-12 py-12 border-y border-white/10 bg-[#111111]",
      statNum: "text-4xl sm:text-5xl font-light tracking-tight",
      statLabel: "text-[10px] sm:text-xs font-light uppercase tracking-[0.3em] text-[#8b7d6b] mt-2",
      sectionPad: "px-6 sm:px-12 py-20 sm:py-28",
      sectionPadAlt: "px-6 sm:px-12 py-20 sm:py-28 bg-[#111111] border-y border-white/10",
      eyebrow: "text-[10px] font-light uppercase tracking-[0.35em] mb-4 text-[#8b7d6b]",
      h2: "text-2xl sm:text-4xl font-light tracking-wide",
      problemCard: "border-l border-white/15 bg-transparent pl-5 py-2 text-left",
      featureCard: "p-5 sm:p-6 border-t border-white/10 bg-transparent",
      featureIcon: "h-8 w-8 flex items-center justify-center mb-4",
      featureTitle: "text-base font-light tracking-[0.15em] uppercase",
      benefitItem: "flex items-start gap-3 border-b border-white/10 py-3",
      testimonialWrap: "px-6 sm:px-12 py-20 sm:py-28 text-[#e8e0d0]",
      testimonialQuote: "text-xl sm:text-2xl font-light italic leading-relaxed",
      pricingCard: "p-6 border border-white/10 bg-[#111111]",
      pricingPopular: "border border-[#c9a84c]/50 shadow-[0_0_30px_rgba(201,168,76,0.10)]",
      price: "text-4xl font-light tracking-tight",
      faqItem: "group border-b border-white/10 py-5 cursor-pointer",
      finalCtaWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center relative overflow-hidden bg-[#0a0a0a]",
      finalH2: "text-3xl sm:text-5xl font-light tracking-wide max-w-3xl mx-auto",
      finalSub: "mt-4 text-base max-w-xl mx-auto font-light",
    };
  }

  return professional;
}

function SectionToggle({ label, checked, pro, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition"
    >
      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
        {label}
        {pro && <Lock className="h-3 w-3 text-amber-500" />}
      </span>
      <div className={`h-5 w-9 rounded-full transition-colors ${checked ? "bg-[#075a01]" : "bg-gray-300"}`}>
        <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </div>
    </button>
  );
}
function getEmbedUrl(url) {
  if (!url) return "";
  // YouTube
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  // Vimeo
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}