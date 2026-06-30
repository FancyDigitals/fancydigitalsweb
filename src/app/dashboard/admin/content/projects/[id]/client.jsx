"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichEditor from "@/components/editor/RichEditor";
import {
  ChevronLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
  Plus,
  ExternalLink,
  Trash2,
} from "lucide-react";

export default function ProjectEditorClient({ projectId }) {
  const router = useRouter();
  const isNew = projectId === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    hero_image: "",
    gallery: [],
    client_name: "",
    industry: "",
    live_url: "",
    tech_stack: [],
    problem: "",
    solution: "",
    category_id: "",
    status: "draft",
    featured: false,
    display_order: 99,
  });

  const [techInput, setTechInput] = useState("");
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`/api/admin/content/projects/${projectId}`),
          fetch(`/api/admin/content/categories?type=portfolio`),
        ]);

        const pData = await pRes.json();
        const cData = await cRes.json();

        if (pRes.ok && pData.project) {
          setForm({
            slug: pData.project.slug || "",
            title: pData.project.title || "",
            excerpt: pData.project.excerpt || "",
            content: pData.project.content || "",
            hero_image: pData.project.hero_image || "",
            gallery: pData.project.gallery || [],
            client_name: pData.project.client_name || "",
            industry: pData.project.industry || "",
            live_url: pData.project.live_url || "",
            tech_stack: pData.project.tech_stack || [],
            problem: pData.project.problem || "",
            solution: pData.project.solution || "",
            category_id: pData.project.category_id || "",
            status: pData.project.status || "draft",
            featured: !!pData.project.featured,
            display_order: pData.project.display_order || 99,
          });
        }
        if (cRes.ok) setCategories(cData.categories || []);
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function slugify(str) {
    return str
      ?.toLowerCase()
      ?.trim()
      ?.replace(/[^\w\s-]/g, "")
      ?.replace(/\s+/g, "-")
      ?.replace(/-+/g, "-") || "";
  }

  function handleTitleChange(val) {
    update("title", val);
    if (!form.slug || form.slug === slugify(form.title)) {
      update("slug", slugify(val));
    }
  }

  async function uploadHero(file) {
    if (!file) return;
    setUploadingHero(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      update("hero_image", data.url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingHero(false);
    }
  }

  async function uploadGalleryFiles(files) {
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          return data.url;
        })
      );
      update("gallery", [...form.gallery, ...uploads]);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryImage(idx) {
    update("gallery", form.gallery.filter((_, i) => i !== idx));
  }

  function addTech() {
    if (!techInput.trim()) return;
    if (!form.tech_stack.includes(techInput.trim())) {
      update("tech_stack", [...form.tech_stack, techInput.trim()]);
    }
    setTechInput("");
  }

  function removeTech(t) {
    update("tech_stack", form.tech_stack.filter((x) => x !== t));
  }

  async function handleSave(publishStatus = null) {
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = { ...form };
    if (publishStatus) payload.status = publishStatus;

    try {
      const res = await fetch(`/api/admin/content/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setSuccess(publishStatus === "published" ? "Project published!" : "Project saved as draft");

      if (isNew && data.project?.id) {
        setTimeout(() => router.push(`/dashboard/admin/content/projects/${data.project.id}`), 800);
      } else {
        if (publishStatus) update("status", publishStatus);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#075a01]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/admin/content"
              className="inline-flex items-center gap-1.5 rounded-lg p-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#075a01]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {isNew ? "New Project" : "Edit Project"}
              </p>
              <p className="text-sm font-bold text-gray-900 truncate max-w-[200px] md:max-w-md">
                {form.title || "Untitled project"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {form.status === "published" && !isNew && (
              <a
                href={`/portfolio/${form.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:border-[#075a01]/30"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Live
              </a>
            )}

            <button
              onClick={() => handleSave("draft")}
              disabled={saving || !form.title.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 transition-all hover:border-[#075a01]/30 hover:text-[#075a01] disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Draft
            </button>

            <button
              onClick={() => handleSave("published")}
              disabled={saving || !form.title.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#075a01] px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {form.status === "published" ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {(error || success) && (
          <div className={`border-t px-4 py-2 text-sm md:px-8 ${
            error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
          }`}>
            <div className="mx-auto flex max-w-6xl items-center gap-2">
              {error ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              {error || success}
            </div>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                Project Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Beautiful E-commerce Website for Acme"
                className="w-full bg-transparent text-3xl font-black text-gray-900 outline-none placeholder:text-gray-300"
              />

              <div className="mt-4 border-t border-gray-100 pt-4">
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Slug (URL)
                </label>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">/portfolio/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => update("slug", slugify(e.target.value))}
                    placeholder="auto-generated"
                    className="flex-1 bg-transparent font-mono text-gray-900 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                Short Excerpt
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                placeholder="One-sentence summary that appears on the portfolio grid..."
                rows={2}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/10"
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-gray-400">
                Hero Image
              </label>

              {form.hero_image ? (
                <div className="relative overflow-hidden rounded-xl border border-gray-100">
                  <img src={form.hero_image} alt="Hero" className="h-64 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => update("hero_image", "")}
                    className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-white backdrop-blur hover:bg-black/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-[#075a01]/40 hover:bg-[#075a01]/5">
                  {uploadingHero ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
                      <p className="text-sm font-bold text-gray-500">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-gray-400" />
                      <p className="text-sm font-bold text-gray-700">Upload hero image</p>
                      <p className="text-xs text-gray-400">JPG, PNG, WebP up to 5MB</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadHero(e.target.files?.[0])}
                    className="hidden"
                    disabled={uploadingHero}
                  />
                </label>
              )}

              <div className="mt-3 text-xs text-gray-400">Or paste image URL:</div>
              <input
                type="url"
                value={form.hero_image}
                onChange={(e) => update("hero_image", e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-[#075a01] focus:bg-white"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-red-600">
                  The Problem
                </label>
                <textarea
                  value={form.problem}
                  onChange={(e) => update("problem", e.target.value)}
                  placeholder="What was the client struggling with?"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                />
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#075a01]">
                  The Solution
                </label>
                <textarea
                  value={form.solution}
                  onChange={(e) => update("solution", e.target.value)}
                  placeholder="What did you build?"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                Full Case Study Content
              </label>
              <RichEditor
                content={form.content}
                onChange={(html) => update("content", html)}
                placeholder="Tell the full story of this project..."
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-gray-400">
                Gallery Images
              </label>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {form.gallery.map((img, idx) => (
                  <div key={idx} className="group relative overflow-hidden rounded-xl border border-gray-100">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="h-32 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:bg-black/80"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-[#075a01]/40 hover:bg-[#075a01]/5">
                  {uploadingGallery ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#075a01]" />
                  ) : (
                    <>
                      <Plus className="h-5 w-5 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500">Add images</p>
                    </>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => uploadGalleryFiles(e.target.files)}
                    className="hidden"
                    disabled={uploadingGallery}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Status</p>
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase ${
                form.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${form.status === "published" ? "bg-green-500" : "bg-gray-400"}`} />
                {form.status}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">Settings</p>

              <label className="mb-4 flex items-center justify-between gap-3 cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-gray-900">Featured</p>
                  <p className="text-xs text-gray-500">Highlight on portfolio</p>
                </div>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => update("featured", e.target.checked)}
                  className="h-5 w-5 rounded accent-[#075a01]"
                />
              </label>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-bold text-gray-700">Category</label>
                <select
                  value={form.category_id || ""}
                  onChange={(e) => update("category_id", e.target.value || null)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-gray-700">Display Order</label>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => update("display_order", Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                />
                <p className="mt-1 text-xs text-gray-400">Lower = appears first</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">Client Info</p>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">Client Name</label>
                  <input
                    type="text"
                    value={form.client_name}
                    onChange={(e) => update("client_name", e.target.value)}
                    placeholder="Acme Nigeria Ltd"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">Industry</label>
                  <input
                    type="text"
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    placeholder="E-commerce, Finance, etc"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-gray-700">Live URL</label>
                  <input
                    type="url"
                    value={form.live_url}
                    onChange={(e) => update("live_url", e.target.value)}
                    placeholder="https://client-site.com"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Tech Stack</p>

              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                  placeholder="Next.js"
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#075a01] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="rounded-lg bg-[#075a01] px-3 py-2 text-xs font-bold text-white hover:bg-[#0a8f01]"
                >
                  Add
                </button>
              </div>

              {form.tech_stack.length === 0 ? (
                <p className="text-xs text-gray-400">No tech added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {form.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-[#075a01]/10 px-2.5 py-1 text-xs font-bold text-[#075a01]"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTech(t)}
                        className="hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}