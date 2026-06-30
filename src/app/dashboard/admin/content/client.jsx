"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Tag,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Loader2,
  ChevronLeft,
  Star,
  Search,
  ExternalLink,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const TABS = [
  { id: "posts", label: "Blog Posts", icon: FileText },
  { id: "projects", label: "Portfolio", icon: Briefcase },
  { id: "categories", label: "Categories", icon: Tag },
];

export default function ContentClient() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin"
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-[#075a01]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to admin
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                Content Manager
              </h1>
              <p className="mt-2 text-gray-500">
                Manage blog posts, portfolio projects, and categories.
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#075a01] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {activeTab === "posts" && <PostsTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "categories" && <CategoriesTab />}

      </div>
    </div>
  );
}

// ─── POSTS TAB ───────────────────────────────────────────────────────────────
function PostsTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/posts");
      const data = await res.json();
      if (res.ok) setPosts(data.posts || []);
    } catch {}
    setLoading(false);
  }

  async function handleCreate() {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/content/posts", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.post?.id) {
        window.location.href = `/dashboard/admin/content/posts/${data.post.id}`;
      } else {
        alert(data.error || "Failed to create post");
        setCreating(false);
      }
    } catch (err) {
      alert(err.message);
      setCreating(false);
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete post "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/content/posts?id=${id}`, { method: "DELETE" });
      if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  }

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Stats + actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <Stat label="Total" value={posts.length} />
          <Stat label="Published" value={published} color="green" />
          <Stat label="Drafts" value={drafts} color="gray" />
        </div>

        <button
          onClick={handleCreate}
          disabled={creating}
          className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
        >
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {creating ? "Creating..." : "New Post"}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
        />
      </div>

      {/* List */}
      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
            <FileText className="h-6 w-6 text-[#075a01]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {posts.length === 0 ? "No posts yet" : "No posts match your search"}
          </h3>
          {posts.length === 0 && (
            <>
              <p className="mt-2 text-sm text-gray-500">Create your first blog post to get started.</p>
              <button
                onClick={handleCreate}
                disabled={creating}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
              >
                {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {creating ? "Creating..." : "Create First Post"}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {filtered.map((post) => (
              <li key={post.id} className="group flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-gray-50">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-gray-900">{post.title}</p>
                    {post.featured && <Star className="h-3.5 w-3.5 fill-[#ff914d] text-[#ff914d]" />}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <StatusBadge status={post.status} />
                    {post.views > 0 && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                    )}
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span className="truncate">/{post.slug}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                      title="View live"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Link
                    href={`/dashboard/admin/content/posts/${post.id}`}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#075a01]/10 hover:text-[#075a01]"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── PROJECTS TAB ────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/projects");
      const data = await res.json();
      if (res.ok) setProjects(data.projects || []);
    } catch {}
    setLoading(false);
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete project "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/content/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  }

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.client_name?.toLowerCase().includes(search.toLowerCase())
  );

  const published = projects.filter((p) => p.status === "published").length;
  const drafts = projects.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <Stat label="Total" value={projects.length} />
          <Stat label="Published" value={published} color="green" />
          <Stat label="Drafts" value={drafts} color="gray" />
        </div>

        <Link
          href="/dashboard/admin/content/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01]"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
        />
      </div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={projects.length === 0 ? "No projects yet" : "No projects match your search"}
          subtitle={projects.length === 0 ? "Create your first portfolio project." : ""}
          ctaLabel={projects.length === 0 ? "Create First Project" : null}
          ctaHref="/dashboard/admin/content/projects/new"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {filtered.map((project) => (
              <li key={project.id} className="group flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-gray-50">
                {project.hero_image ? (
                  <img
                    src={project.hero_image}
                    alt={project.title}
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-gray-900">{project.title}</p>
                    {project.featured && <Star className="h-3.5 w-3.5 fill-[#ff914d] text-[#ff914d]" />}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <StatusBadge status={project.status} />
                    {project.client_name && <span>Client: {project.client_name}</span>}
                    {project.industry && <span>{project.industry}</span>}
                    <span className="truncate">/{project.slug}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-1">
                  {project.status === "published" && (
                    <a
                      href={`/portfolio/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                      title="View live"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <Link
                    href={`/dashboard/admin/content/projects/${project.id}`}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#075a01]/10 hover:text-[#075a01]"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── CATEGORIES TAB ──────────────────────────────────────────────────────────
function CategoriesTab() {
  const [type, setType] = useState("blog");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [type]);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/categories?type=${type}`);
      const data = await res.json();
      if (res.ok) setCategories(data.categories || []);
    } catch {}
    setLoading(false);
  }

  async function handleAdd() {
    if (!name.trim()) {
      setError("Name required");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setCategories((prev) => [...prev, data.category].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/content/categories?id=${id}&type=${type}`, { method: "DELETE" });
      if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {}
  }

  return (
    <div className="space-y-6">
      {/* Type switch */}
      <div className="flex gap-2">
        <button
          onClick={() => setType("blog")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
            type === "blog"
              ? "bg-[#075a01] text-white"
              : "border border-gray-200 bg-white text-gray-700 hover:border-[#075a01]/30"
          }`}
        >
          Blog Categories
        </button>
        <button
          onClick={() => setType("portfolio")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
            type === "portfolio"
              ? "bg-[#075a01] text-white"
              : "border border-gray-200 bg-white text-gray-700 hover:border-[#075a01]/30"
          }`}
        >
          Portfolio Categories
        </button>

        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-[#ff914d] px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-[#e8833d]"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-gray-900">New {type} category</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#075a01] focus:bg-white"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#075a01] focus:bg-white"
            />
          </div>
          {error && (
            <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          <button
            onClick={handleAdd}
            disabled={submitting || !name.trim()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Add Category
          </button>
        </div>
      )}

      {/* List */}
      {loading ? (
        <LoadingState />
      ) : categories.length === 0 ? (
        <EmptyState icon={Tag} title="No categories yet" subtitle={`Add your first ${type} category.`} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat.id} className="group flex items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900">{cat.name}</p>
                <p className="text-xs text-gray-500">/{cat.slug}</p>
                {cat.description && <p className="mt-1 text-sm text-gray-600">{cat.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── HELPERS ────────────────────────────────────────────────────────────────
function Stat({ label, value, color = "default" }) {
  const colorClass =
    color === "green" ? "text-green-700 bg-green-50" :
    color === "gray" ? "text-gray-700 bg-gray-100" :
    "text-[#075a01] bg-[#075a01]/10";
  return (
    <div className={`rounded-xl px-4 py-2 ${colorClass}`}>
      <p className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Draft
    </span>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-16 shadow-sm">
      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle, ctaLabel, ctaHref }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
        <Icon className="h-6 w-6 text-[#075a01]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01]"
        >
          <Plus className="h-4 w-4" />
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}