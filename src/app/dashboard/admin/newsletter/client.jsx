"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Trash2,
  Loader2,
  ChevronLeft,
  Search,
  Download,
  Users,
  UserX,
  UserCheck,
  Copy,
  CheckCircle2,
} from "lucide-react";

export default function NewsletterClient() {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, unsubscribed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("active");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function fetchSubscribers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data.subscribers || []);
        setStats(data.stats || { total: 0, active: 0, unsubscribed: 0 });
      }
    } catch {}
    setLoading(false);
  }

  async function handleDelete(id, email) {
    if (!confirm(`Delete subscriber "${email}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        fetchSubscribers();
      }
    } catch {}
  }

  function exportCSV() {
    const filtered = getFilteredSubscribers();
    const csv = [
      ["Email", "Source", "Status", "Subscribed Date"].join(","),
      ...filtered.map((s) =>
        [
          s.email,
          s.source || "unknown",
          s.unsubscribed ? "Unsubscribed" : "Active",
          new Date(s.created_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyAllEmails() {
    const filtered = getFilteredSubscribers();
    const emails = filtered.map((s) => s.email).join(", ");
    await navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function getFilteredSubscribers() {
    return subscribers.filter((s) => {
      const matchesSearch = s.email.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !s.unsubscribed) ||
        (filter === "unsubscribed" && s.unsubscribed);
      return matchesSearch && matchesFilter;
    });
  }

  const filtered = getFilteredSubscribers();

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
                Newsletter Subscribers
              </h1>
              <p className="mt-2 text-gray-500">
                Manage your newsletter subscriber list.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={copyAllEmails}
                disabled={filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-[#075a01]/40 disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Emails
                  </>
                )}
              </button>
              <button
                onClick={exportCSV}
                disabled={filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-[#075a01] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#0a8f01] disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard
            icon={Users}
            label="Total"
            value={stats.total}
            color="bg-gray-100 text-gray-700"
          />
          <StatCard
            icon={UserCheck}
            label="Active"
            value={stats.active}
            color="bg-green-100 text-green-700"
          />
          <StatCard
            icon={UserX}
            label="Unsubscribed"
            value={stats.unsubscribed}
            color="bg-red-100 text-red-700"
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
            />
          </div>

          <div className="flex gap-2">
            <FilterButton active={filter === "active"} onClick={() => setFilter("active")}>
              Active ({stats.active})
            </FilterButton>
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              All ({stats.total})
            </FilterButton>
            <FilterButton active={filter === "unsubscribed"} onClick={() => setFilter("unsubscribed")}>
              Unsubscribed ({stats.unsubscribed})
            </FilterButton>
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
              {subscribers.length === 0 ? "No subscribers yet" : "No subscribers match"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {subscribers.length === 0
                ? "Subscribers will appear here once people sign up."
                : "Try a different search or filter."}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-3">
              <p className="text-xs font-bold text-gray-500">
                Showing {filtered.length} of {subscribers.length} subscribers
              </p>
            </div>
            <ul className="divide-y divide-gray-100">
              {filtered.map((sub) => (
                <li
                  key={sub.id}
                  className="flex flex-wrap items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    sub.unsubscribed
                      ? "bg-gray-200 text-gray-500"
                      : "bg-[#075a01] text-white"
                  }`}>
                    {sub.email.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">{sub.email}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                      <span className="capitalize">{sub.source || "website"}</span>
                      <span>·</span>
                      <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                      {sub.unsubscribed && (
                        <>
                          <span>·</span>
                          <span className="text-red-600 font-semibold">Unsubscribed</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(sub.id, sub.email)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete subscriber"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color} mb-2`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
        active
          ? "bg-[#075a01] text-white"
          : "border border-gray-200 bg-white text-gray-700 hover:border-[#075a01]/30 hover:text-[#075a01]"
      }`}
    >
      {children}
    </button>
  );
}