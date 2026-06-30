"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Trash2, ChevronLeft, Megaphone } from "lucide-react";

const STYLE_OPTIONS = [
  { value: "gradient_green", label: "Green Gradient (Premium)", preview: "bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white" },
  { value: "white_card", label: "White Card (Clean)", preview: "bg-white border-2 border-gray-200 text-gray-900" },
  { value: "dark_premium", label: "Dark Premium", preview: "bg-gradient-to-br from-gray-900 to-gray-700 text-white" },
  { value: "orange_glow", label: "Orange Accent", preview: "bg-[#ff914d] text-white" },
];

export default function BannerEditorClient({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    cta_text: "",
    cta_url: "",
    badge_text: "",
    style: "gradient_green",
    display_order: 0,
    active: true,
    show_on_blog: true,
    show_on_portfolio: true,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/admin/banners/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to load banner");
        return;
      }

      setForm({
        title: data.title || "",
        description: data.description || "",
        image_url: data.image_url || "",
        cta_text: data.cta_text || "",
        cta_url: data.cta_url || "",
        badge_text: data.badge_text || "",
        style: data.style || "gradient_green",
        display_order: data.display_order || 0,
        active: data.active ?? true,
        show_on_blog: data.show_on_blog ?? true,
        show_on_portfolio: data.show_on_portfolio ?? true,
      });
      setLoading(false);
    }
    fetchData();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/admin/banners/${id}`, {
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
    alert("Banner saved successfully");
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Upload failed");
      return null;
    }
    return data.url;
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const selectedStyle = STYLE_OPTIONS.find((s) => s.value === form.style);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard/admin/banners"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#075a01]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to banners
        </Link>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Edit Banner</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#0a8f01] text-white rounded-md hover:bg-[#075a01] disabled:opacity-50 font-semibold"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Banner"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_340px] gap-6">

          {/* FORM */}
          <div className="space-y-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Build a Landing Page in 60 Seconds"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Short benefit-driven description..."
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Badge (optional)</label>
              <input
                type="text"
                name="badge_text"
                value={form.badge_text}
                onChange={handleChange}
                placeholder="Featured / New / Hot"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2">CTA Text *</label>
                <input
                  type="text"
                  name="cta_text"
                  value={form.cta_text}
                  onChange={handleChange}
                  placeholder="Try Free"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">CTA URL *</label>
                <input
                  type="text"
                  name="cta_url"
                  value={form.cta_url}
                  onChange={handleChange}
                  placeholder="/dashboard/tools/..."
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Style</label>
              <select
                name="style"
                value={form.style}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Background Image (optional)</label>
              {form.image_url && (
                <img src={form.image_url} alt="" className="w-full max-h-40 object-cover rounded-lg mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  const url = await uploadImage(e.target.files[0]);
                  if (url) setForm((prev) => ({ ...prev, image_url: url }));
                }}
                className="text-sm"
              />
              {form.image_url && (
                <button
                  onClick={() => setForm((prev) => ({ ...prev, image_url: "" }))}
                  className="text-xs text-red-600 mt-2"
                >
                  Remove image
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Display Order</label>
              <input
                type="number"
                name="display_order"
                value={form.display_order}
                onChange={handleChange}
                className="w-32 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#075a01]"
              />
              <p className="text-xs text-gray-500 mt-1">Lower number = shown first</p>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="rounded"
                />
                Active (show on site)
              </label>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="show_on_blog"
                  checked={form.show_on_blog}
                  onChange={handleChange}
                  className="rounded"
                />
                Show on Blog pages
              </label>
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  name="show_on_portfolio"
                  checked={form.show_on_portfolio}
                  onChange={handleChange}
                  className="rounded"
                />
                Show on Portfolio pages
              </label>
            </div>
          </div>

          {/* LIVE PREVIEW */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Live Preview</p>
            <div className={`rounded-2xl p-6 shadow-lg relative overflow-hidden ${selectedStyle.preview}`}>
              {form.image_url && (
                <div className="absolute inset-0 opacity-20">
                  <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="relative">
                {form.badge_text && (
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 ${
                    form.style === "white_card" ? "bg-[#ff914d]/10 text-[#ff914d]" : "bg-white/20"
                  }`}>
                    {form.badge_text}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2 leading-tight">
                  {form.title || "Banner Title"}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${
                  form.style === "white_card" ? "text-gray-600" : "text-white/90"
                }`}>
                  {form.description || "Banner description goes here."}
                </p>
                <div className={`flex items-center gap-2 text-sm font-semibold ${
                  form.style === "white_card" ? "text-[#ff914d]" : ""
                }`}>
                  {form.cta_text || "Learn More"}
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}