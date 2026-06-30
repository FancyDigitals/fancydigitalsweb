"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Save, ChevronLeft, Mail, Eye } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "general", label: "General" },
  { value: "product", label: "Product" },
  { value: "promo", label: "Promo" },
  { value: "newsletter", label: "Newsletter" },
  { value: "services", label: "Services" },
  { value: "tool", label: "Tool" },
  { value: "outreach", label: "Outreach" },
];

const BANNER_OPTIONS = [
  // ═══ AVAILABLE — Premium banners ═══
  { value: "email-banner-master.png", label: "🌟 Master Intro (Premium)" },
  { value: "email-banner-universal.png", label: "🌍 Universal (Fallback)" },

  // ═══ AVAILABLE — Original 7 ═══
  { value: "email-banner-launch.png", label: "🚀 Launch (Green)" },
  { value: "email-banner-feature.png", label: "✨ Feature (Blue)" },
  { value: "email-banner-upgrade.png", label: "👑 Upgrade (Gold)" },
  { value: "email-banner-reengage.png", label: "🔄 Re-engage (Purple)" },
  { value: "email-banner-newsletter.png", label: "📰 Newsletter (Neutral)" },
  { value: "email-banner-offer.png", label: "🔥 Offer (Red)" },
  { value: "email-banner-tutorial.png", label: "📚 Tutorial (Teal)" },

  // ═══ NEEDS CREATION — Services ═══
  { value: "email-banner-webdesign.png", label: "⚠️ Web Design (NOT CREATED)" },
  { value: "email-banner-branding.png", label: "⚠️ Branding (NOT CREATED)" },
  { value: "email-banner-seo.png", label: "⚠️ SEO Services (NOT CREATED)" },
  { value: "email-banner-appdev.png", label: "⚠️ App Development (NOT CREATED)" },
  { value: "email-banner-automation.png", label: "⚠️ AI Automation (NOT CREATED)" },

  // ═══ NEEDS CREATION — Tools ═══
  { value: "email-banner-landingpage.png", label: "⚠️ AI Landing Page (NOT CREATED)" },
  { value: "email-banner-resume.png", label: "⚠️ AI Resume Builder (NOT CREATED)" },
  { value: "email-banner-coverletter.png", label: "⚠️ AI Cover Letter (NOT CREATED)" },
  { value: "email-banner-aivisibility.png", label: "⚠️ AI Visibility (NOT CREATED)" },
  { value: "email-banner-clientportal.png", label: "⚠️ Client Portal (NOT CREATED)" },

  // ═══ NEEDS CREATION — Outreach ═══
  { value: "email-banner-enterprise.png", label: "⚠️ Enterprise (NOT CREATED)" },
  { value: "email-banner-agency.png", label: "⚠️ Agency Partnership (NOT CREATED)" },
];

export default function TemplateEditorClient({ id }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    label: "",
    subject: "",
    message: "",
    banner: "email-banner-launch.png",
    cta_text: "",
    cta_url: "",
    category: "general",
    display_order: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/admin/templates/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to load template");
        return;
      }

      setForm({
        label: data.label || "",
        subject: data.subject || "",
        message: data.message || "",
        banner: data.banner || "email-banner-launch.png",
        cta_text: data.cta_text || "",
        cta_url: data.cta_url || "",
        category: data.category || "general",
        display_order: data.display_order || 0,
      });
      setLoading(false);
    }
    fetchData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    if (!form.label.trim() || !form.subject.trim() || !form.message.trim()) {
      alert("Label, subject, and message are required");
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/admin/templates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      alert(data.error || "Failed to save");
      return;
    }
    alert("Template saved successfully");
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <Link
          href="/dashboard/admin/templates"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#075a01]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to templates
        </Link>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10">
              <Mail className="h-5 w-5 text-[#075a01]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Edit Template</h1>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-semibold"
            >
              <Eye size={16} />
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#0a8f01] text-white rounded-md hover:bg-[#075a01] disabled:opacity-50 font-semibold"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Template"}
            </button>
          </div>
        </div>

        <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-[1fr_400px]" : ""}`}>

          {/* FORM */}
          <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            {/* Label */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Template Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="e.g. 🌟 Meet Fancy Digitals"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
              <p className="text-xs text-gray-500 mt-1">Internal name shown in the broadcast template list.</p>
            </div>

            {/* Category + Order */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Display Order</label>
                <input
                  type="number"
                  name="display_order"
                  value={form.display_order}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Subject Line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Your business can now be recommended by AI"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use <code className="bg-gray-100 px-1 rounded">{`{{company}}`}</code> or <code className="bg-gray-100 px-1 rounded">{`{{name}}`}</code> as placeholders (manual replacement before sending).
              </p>
            </div>

            {/* Banner */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Banner</label>
              <select
                name="banner"
                value={form.banner}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              >
                {BANNER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2">CTA Button Text</label>
                <input
                  type="text"
                  name="cta_text"
                  value={form.cta_text}
                  onChange={handleChange}
                  placeholder="Check My Score"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">CTA URL</label>
                <input
                  type="text"
                  name="cta_url"
                  value={form.cta_url}
                  onChange={handleChange}
                  placeholder="https://fancydigitals.com.ng/..."
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={16}
                placeholder="Write your email message here. Each line break becomes a new paragraph."
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01] font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Each line break becomes a new paragraph in the final email.
              </p>
            </div>
          </div>

          {/* PREVIEW */}
          {showPreview && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6 max-h-[85vh] overflow-y-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Live Preview</p>

              {/* Email Subject Preview Box */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-1">From: Fancy Digitals &lt;noreply@fancydigitals.com.ng&gt;</p>
                <p className="text-sm font-bold text-gray-900">{form.subject || "Subject line"}</p>
              </div>

              {/* Email Body Preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

                {/* Logo */}
                <div className="bg-gray-50 p-4 text-center border-b border-gray-100">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                    <span className="text-white font-black text-sm">FD</span>
                  </div>
                </div>

                {/* Banner Image */}
                {form.banner && (
                  <div className="relative bg-gray-100">
                    <img
                      src={`/${form.banner}`}
                      alt="Email banner"
                      className="w-full h-auto block"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 p-6"
                      style={{ minHeight: "180px" }}
                    >
                      <div className="text-center">
                        <p className="text-sm font-bold text-amber-800 mb-1">⚠️ Banner not found</p>
                        <p className="text-xs text-amber-700">
                          <code className="bg-amber-100 px-2 py-0.5 rounded">/public/{form.banner}</code>
                        </p>
                        <p className="text-xs text-amber-600 mt-2">Image will be broken in actual email</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Content */}
                <div className="p-6 space-y-3 text-sm">
                  <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Hi there,</p>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
                    {form.subject || "Subject line"}
                  </h2>
                  <div className="h-px bg-gray-200 my-3" />
                  <div className="space-y-3">
                    {form.message
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, idx) => (
                        <p key={idx} className="text-gray-700 leading-relaxed">{line.trim()}</p>
                      ))}
                  </div>
                  {form.cta_text && (
                    <div className="text-center pt-5">
                      <a
                        href={form.cta_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#075a01] text-white px-7 py-3.5 rounded-full text-sm font-semibold no-underline hover:bg-[#0a8f01] transition"
                      >
                        {form.cta_text}
                      </a>
                    </div>
                  )}
                </div>

                {/* Signature */}
                <div className="px-6 pb-6">
                  <p className="text-sm text-gray-900 font-semibold">Bashir Ismail</p>
                  <p className="text-xs text-gray-500">Founder, Fancy Digitals</p>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">
                    <a href="https://fancydigitals.com.ng" className="text-[#075a01] font-semibold no-underline">fancydigitals.com.ng</a>
                    {" · "}
                    <a href="mailto:fancydigitalsng@gmail.com" className="text-gray-500 no-underline">fancydigitalsng@gmail.com</a>
                  </p>
                  <p className="text-[10px] text-gray-400">Fancy Digitals · Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}