"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "@/components/editor/RichEditor";
import { Save, Trash2, Send, CheckCircle2 } from "lucide-react";

export default function PostEditorClient({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaving, setAutoSaving] = useState(false);

  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category_id: "",
    author_id: "",
    tags: "",
    seo_title: "",
    seo_description: "",
    cta_text: "",
    cta_url: "",
    status: "draft",
    featured: false,
  });

  // Track if form has changed since last save
  const formRef = useRef(form);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  // Fetch post + categories + authors
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/admin/content/posts/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to load post");
        return;
      }

      setPost(data);

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        category_id: data.category_id || "",
        author_id: data.author_id || "",
        tags: data.tags?.join(", ") || "",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        cta_text: data.cta_text || "",
        cta_url: data.cta_url || "",
        status: data.status || "draft",
        featured: data.featured || false,
      });

      // Fetch categories
      const catRes = await fetch("/api/admin/content/categories?type=blog");
      const catData = await catRes.json();
      if (catRes.ok) setCategories(catData.categories || []);

      // Fetch authors
      const authRes = await fetch("/api/admin/content/authors");
      const authData = await authRes.json();
      if (authRes.ok) setAuthors(authData || []);

      setLoading(false);

      // Mark first load complete after a delay (so autosave doesn't trigger immediately)
      setTimeout(() => {
        isFirstLoad.current = false;
      }, 2000);
    }

    fetchData();
  }, [id]);

  // AUTOSAVE — every 10 seconds, if there are changes
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(async () => {
      if (isFirstLoad.current) return;
      if (saving) return;

      // Don't autosave if title is empty
      if (!formRef.current.title.trim()) return;

      setAutoSaving(true);
      try {
        const payload = {
          ...formRef.current,
          tags: formRef.current.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        };

        await fetch(`/api/admin/content/posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        setLastSaved(new Date());
      } catch {}
      setAutoSaving(false);
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [loading, saving, id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function savePost(overrides = {}) {
    setSaving(true);

    const payload = {
      ...form,
      ...overrides,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    // Set published_at when publishing for the first time
    if (overrides.status === "published" && form.status !== "published") {
      payload.published_at = new Date().toISOString();
    }

    const res = await fetch(`/api/admin/content/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      alert(data.error || "Failed to save");
      return false;
    }

    setLastSaved(new Date());

    // Update local state with new status
    if (overrides.status) {
      setForm((prev) => ({ ...prev, status: overrides.status }));
    }

    return true;
  }

  async function handleSave() {
    const ok = await savePost();
    if (ok) alert("Draft saved successfully");
  }

  async function handlePublish() {
    if (!form.title.trim()) {
      alert("Post needs a title before publishing");
      return;
    }
    if (!form.content || form.content.length < 50) {
      alert("Post content is too short to publish");
      return;
    }

    const ok = await savePost({ status: "published" });
    if (ok) {
      alert("Post published successfully!");
      window.open(`/blog/${form.slug}`, "_blank");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this post permanently?")) return;

    const res = await fetch(`/api/admin/content/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/dashboard/admin/content");
    } else {
      alert("Failed to delete");
    }
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

  function formatLastSaved() {
    if (!lastSaved) return null;
    const diff = Math.floor((new Date() - lastSaved) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return lastSaved.toLocaleTimeString();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Edit Blog Post</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className={`font-semibold ${form.status === "published" ? "text-green-600" : "text-gray-700"}`}>
                {form.status === "published" ? "Published" : "Draft"}
              </span>
            </p>
            {autoSaving && (
              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                Auto-saving...
              </span>
            )}
            {!autoSaving && lastSaved && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                Saved {formatLastSaved()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#0a8f01] text-white rounded-md hover:bg-[#075a01] disabled:opacity-50 font-semibold"
          >
            <Send size={16} />
            {form.status === "published" ? "Update Live Post" : "Publish Now"}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      />

      {/* Slug */}
      <input
        type="text"
        name="slug"
        placeholder="post-slug"
        value={form.slug}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      />

      {/* Excerpt */}
      <textarea
        name="excerpt"
        placeholder="Short excerpt..."
        value={form.excerpt}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
        rows={3}
      />

      {/* Featured Image */}
      <div>
        <label className="block font-medium mb-1">Featured Image</label>
        {form.featured_image && (
          <img
            src={form.featured_image}
            alt=""
            className="w-full max-h-64 object-cover rounded-md mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const url = await uploadImage(e.target.files[0]);
            if (url) setForm((prev) => ({ ...prev, featured_image: url }));
          }}
        />
      </div>

      {/* Category */}
      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Author */}
      <select
        name="author_id"
        value={form.author_id}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      >
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.display_name}
          </option>
        ))}
      </select>

      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="tag1, tag2, tag3"
        value={form.tags}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      />

      {/* Status */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-3 rounded-md"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      {/* Featured Toggle */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Featured Post
      </label>

      {/* CTA SECTION — NEW */}
      <div className="space-y-2 rounded-xl border-2 border-[#075a01]/20 bg-[#075a01]/5 p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🎯 Call-to-Action Button
          <span className="text-xs font-normal text-gray-500">(appears at bottom of post)</span>
        </h2>
        <p className="text-sm text-gray-600">
          Optional. Adds a conversion button below the post content. Leave blank to hide.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">CTA Button Text</label>
            <input
              type="text"
              name="cta_text"
              placeholder="e.g. Try Free, Get Started"
              value={form.cta_text}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-md bg-white focus:border-[#075a01] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">CTA URL</label>
            <input
              type="text"
              name="cta_url"
              placeholder="https://fancydigitals.com.ng/..."
              value={form.cta_url}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-md bg-white focus:border-[#075a01] outline-none"
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">SEO Settings</h2>
        <input
          type="text"
          name="seo_title"
          placeholder="SEO Title"
          value={form.seo_title}
          onChange={handleChange}
          className="w-full border p-3 rounded-md"
        />
        <textarea
          name="seo_description"
          placeholder="SEO Description"
          value={form.seo_description}
          onChange={handleChange}
          className="w-full border p-3 rounded-md"
          rows={3}
        />
      </div>

      {/* Rich Content */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Content</h2>
        <RichEditor
          content={form.content}
          onChange={(html) =>
            setForm((prev) => ({ ...prev, content: html }))
          }
        />
      </div>
    </div>
  );
}