"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Megaphone,
  Plus,
  Edit3,
  Trash2,
  Loader2,
  ChevronLeft,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ExternalLink,
} from "lucide-react";

export default function BannersClient() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  async function fetchBanners() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      if (res.ok) setBanners(data.banners || []);
    } catch {}
    setLoading(false);
  }

  async function handleCreate() {
    setCreating(true);
    try {
      const res = await fetch("/api/admin/banners", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.banner?.id) {
        window.location.href = `/dashboard/admin/banners/${data.banner.id}`;
      } else {
        alert(data.error || "Failed to create banner");
        setCreating(false);
      }
    } catch (err) {
      alert(err.message);
      setCreating(false);
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete banner "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, { method: "DELETE" });
      if (res.ok) setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch {}
  }

  async function toggleActive(banner) {
    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !banner.active }),
      });
      if (res.ok) {
        setBanners((prev) =>
          prev.map((b) => (b.id === banner.id ? { ...b, active: !b.active } : b))
        );
      }
    } catch {}
  }

  async function reorder(banner, direction) {
    const newOrder = direction === "up" ? banner.display_order - 1 : banner.display_order + 1;

    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_order: newOrder }),
      });
      if (res.ok) {
        await fetchBanners();
      }
    } catch {}
  }

  const active = banners.filter((b) => b.active).length;
  const inactive = banners.filter((b) => !b.active).length;

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
                Promo Banners
              </h1>
              <p className="mt-2 text-gray-500">
                Manage sidebar banners shown on blog and portfolio pages.
              </p>
            </div>

            <button
              onClick={handleCreate}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:opacity-50"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {creating ? "Creating..." : "New Banner"}
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-6 flex gap-3">
          <Stat label="Total" value={banners.length} />
          <Stat label="Active" value={active} color="green" />
          <Stat label="Inactive" value={inactive} color="gray" />
        </div>

        {/* LIST */}
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-16 shadow-sm">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : banners.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#075a01]/10">
              <Megaphone className="h-6 w-6 text-[#075a01]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No banners yet</h3>
            <p className="mt-2 text-sm text-gray-500">Create your first promo banner.</p>
            <button
              onClick={handleCreate}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#0a8f01]"
            >
              <Plus className="h-4 w-4" />
              Create First Banner
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {banners.map((banner, idx) => (
              <div
                key={banner.id}
                className={`flex flex-wrap items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all ${
                  banner.active ? "border-gray-200" : "border-gray-100 opacity-60"
                }`}
              >
                {/* Image preview */}
                {banner.image_url ? (
                  <img
                    src={banner.image_url}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className={`flex h-14 w-20 shrink-0 items-center justify-center rounded-lg ${
                    banner.style === "gradient_green" ? "bg-gradient-to-br from-[#075a01] to-[#0a8f01]" :
                    banner.style === "dark_premium" ? "bg-gradient-to-br from-gray-900 to-gray-700" :
                    banner.style === "orange_glow" ? "bg-[#ff914d]" :
                    "bg-gray-100"
                  }`}>
                    <Megaphone className={`h-5 w-5 ${banner.style === "white_card" ? "text-gray-400" : "text-white"}`} />
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="truncate font-semibold text-gray-900">{banner.title}</p>
                    {banner.badge_text && (
                      <span className="px-2 py-0.5 bg-[#ff914d]/10 text-[#ff914d] rounded-full text-[10px] font-bold uppercase">
                        {banner.badge_text}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    CTA: "{banner.cta_text}" → {banner.cta_url}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Order: {banner.display_order} · Style: {banner.style} · Views: {banner.views || 0} · Clicks: {banner.clicks || 0}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => reorder(banner, "up")}
                    disabled={idx === 0}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => reorder(banner, "down")}
                    disabled={idx === banners.length - 1}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleActive(banner)}
                    className={`rounded-lg p-2 transition-colors ${
                      banner.active
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={banner.active ? "Deactivate" : "Activate"}
                  >
                    {banner.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <Link
                    href={`/dashboard/admin/banners/${banner.id}`}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-[#075a01]/10 hover:text-[#075a01]"
                    title="Edit"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(banner.id, banner.title)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

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