"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Plus,
  Edit3,
  Trash2,
  Loader2,
  ChevronLeft,
  Search,
  Filter,
} from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Templates", color: "bg-gray-100 text-gray-700" },
  { value: "general", label: "General", color: "bg-slate-100 text-slate-700" },
  { value: "product", label: "Product", color: "bg-blue-100 text-blue-700" },
  { value: "promo", label: "Promo", color: "bg-orange-100 text-orange-700" },
  { value: "newsletter", label: "Newsletter", color: "bg-purple-100 text-purple-700" },
  { value: "services", label: "Services", color: "bg-emerald-100 text-emerald-700" },
  { value: "tool", label: "Tools", color: "bg-cyan-100 text-cyan-700" },
  { value: "outreach", label: "Outreach", color: "bg-amber-100 text-amber-700" },
];

function categoryBadge(category) {
  return CATEGORY_OPTIONS.find((c) => c.value === category) || CATEGORY_OPTIONS[0];
}

export default function TemplatesClient() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/templates");
      const data = await res.json();
      if (res.ok) setTemplates(data.templates || []);
    } catch {}
    setLoading(false);
  }

  async function handleCreate() {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/templates", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.template?.id) {
        window.location.href = `/dashboard/admin/templates/${data.template.id}`;
      } else {
        alert(data.error || "Failed to create template");
        setCreating(false);
      }
    } catch (err) {
      alert(err.message);
      setCreating(false);
    }
  }

  async function handleDelete(id, label) {
    if (!confirm(`Delete template "${label}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/templates?id=${id}`, { method: "DELETE" });
      if (res.ok) setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch {}
  }

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

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
                Email Templates
              </h1>
              <p className="mt-2 text-gray-500">
                Edit and manage broadcast email templates.
              </p>
            </div>

            <button
              onClick={handleCreate}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {creating ? "Creating..." : "New Template"}
            </button>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
            />
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Filter className="h-3.5 w-3.5" />
              Category:
            </div>
            {CATEGORY_OPTIONS.map((opt) => {
              const count = opt.value === "all"
                ? templates.length
                : templates.filter((t) => t.category === opt.value).length;
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilterCategory(opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    filterCategory === opt.value
                      ? "bg-[#075a01] text-white"
                      : "border border-gray-200 bg-white text-gray-700 hover:border-[#075a01]/30 hover:text-[#075a01]"
                  }`}
                >
                  {opt.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* LIST */}
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-16 shadow-sm">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
              <Mail className="h-6 w-6 text-[#075a01]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {templates.length === 0 ? "No templates yet" : "No templates match"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {templates.length === 0 ? "Create your first email template." : "Try a different search or category."}
            </p>
            {templates.length === 0 && (
              <button
                onClick={handleCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#0a8f01]"
              >
                <Plus className="h-4 w-4" />
                Create First Template
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((tpl) => {
              const badge = categoryBadge(tpl.category);
              return (
                <div
                  key={tpl.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#075a01]/30 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h3 className="font-bold text-gray-900">{tpl.label}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium truncate">{tpl.subject}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {tpl.message?.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                        <span>CTA: {tpl.cta_text || "—"}</span>
                        <span>·</span>
                        <span>Order: {tpl.display_order}</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <Link
                        href={`/dashboard/admin/templates/${tpl.id}`}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#075a01]/10 hover:text-[#075a01]"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(tpl.id, tpl.label)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}