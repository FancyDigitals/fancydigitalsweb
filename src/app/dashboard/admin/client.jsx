"use client";

import { useState, useEffect } from "react";
import {
  Crown,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
  ArrowRight,
  X,
  Send,
  Mail,
  Users,
  Filter,
  Zap,
  Target,
  Hash,
} from "lucide-react";

const PLAN_OPTIONS = [
  { value: "FREE", label: "Free", color: "bg-gray-100 text-gray-700" },
  { value: "PRO_MONTHLY", label: "Pro Monthly", color: "bg-green-100 text-green-700" },
  { value: "LIFETIME", label: "Lifetime", color: "bg-amber-100 text-amber-700" },
];

function planBadge(plan) {
  const p = String(plan || "FREE").toUpperCase();
  const opt = PLAN_OPTIONS.find((o) => o.value === p);
  return opt || PLAN_OPTIONS[0];
}

export default function AdminClient({ adminEmail }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const t = setTimeout(fetchUsers, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [search]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/upgrade?q=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (res.ok) setUsers(data.users || []);
    } catch {}
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* HEADER */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff914d]">
            <Shield className="h-4 w-4" />
            <span>Admin Panel</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                User & Plan Management
              </h1>
              <p className="mt-2 text-gray-500">
                Manage user plans and send broadcast emails to all or selected users.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
                              <a
                href="/dashboard/admin/indexing"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Zap className="h-4 w-4" />
                Google Indexing
              </a>
              <a
                href="/dashboard/admin/newsletter"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
              >
                <Users className="h-4 w-4 text-[#075a01]" />
                Subscribers
              </a>
              <a
                href="/dashboard/admin/templates"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
              >
                <Mail className="h-4 w-4 text-[#075a01]" />
                Email Templates
              </a>
              <a
                href="/dashboard/admin/banners"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
              >
                <svg className="h-4 w-4 text-[#075a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                Promo Banners
              </a>
              <a
                href="/dashboard/admin/content"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff914d]/40 hover:shadow-md"
              >
                <svg className="h-4 w-4 text-[#ff914d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Content Manager
              </a>
              <a
  href="/dashboard/admin/orders"
  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
>
  <Hash className="h-4 w-4 text-[#075a01]" />
  Orders
</a>
              <a
                href="/dashboard/admin/academy"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
              >
                <svg className="h-4 w-4 text-[#075a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academy Manager
              </a>
              <a
  href="/dashboard/admin/meta-ads-studio"
  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#075a01]/40 hover:shadow-md"
>
  <Target className="h-4 w-4 text-[#075a01]" />
  Meta Ads Studio
</a>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-medium outline-none placeholder:text-gray-400 focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
            />
          </div>
        </div>

        {/* USERS LIST */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-900">
              {loading ? "Loading..." : `${users.length} users`}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-500">No users found.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {users.map((u) => {
                const badge = planBadge(u.plan);
                return (
                  <div key={u.id} className="flex flex-wrap items-center gap-4 p-5 transition-colors hover:bg-gray-50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#075a01] text-sm font-bold text-white">
                      {(u.full_name || u.email)[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900">{u.full_name || "—"}</p>
                      <p className="truncate text-xs text-gray-500">{u.email}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                      {badge.label}
                    </span>
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 transition-all hover:border-[#075a01]/30 hover:text-[#075a01]"
                    >
                      Change Plan
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BROADCAST EMAIL SECTION */}
        {!loading && users.length > 0 && (
          <BroadcastSection adminEmail={adminEmail} allUsers={users} />
        )}

      </div>

      {/* UPGRADE MODAL */}
      {selectedUser && (
        <UpgradeModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccess={() => {
            setSelectedUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}

// ─── BROADCAST SECTION ───────────────────────────────────────────────────────
function BroadcastSection({ adminEmail, allUsers }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [banner, setBanner] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Templates from DB
  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/admin/templates");
        const data = await res.json();
        if (res.ok) setTemplates(data.templates || []);
      } catch {}
      setTemplatesLoading(false);
    }
    fetchTemplates();
  }, []);

  const [planFilter, setPlanFilter] = useState("ALL");
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [customEmailsInput, setCustomEmailsInput] = useState("");
  const [customOnly, setCustomOnly] = useState(false);

  const filteredByPlan = planFilter === "ALL"
    ? allUsers
    : allUsers.filter((u) => String(u.plan || "FREE").toUpperCase() === planFilter);

  const customEmails = customEmailsInput
    .split(/[\s,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

  const invalidCustomCount = customEmailsInput
    .split(/[\s,;]+/)
    .map((e) => e.trim())
    .filter((e) => e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)).length;

  const hasIndividualSelection = selectedEmails.size > 0;
  const userRecipients = customOnly
    ? []
    : hasIndividualSelection
    ? allUsers.filter((u) => selectedEmails.has(u.email))
    : filteredByPlan;

  const userEmailSet = new Set(userRecipients.map((u) => u.email.toLowerCase()));
  const customRecipients = customEmails
    .filter((email) => !userEmailSet.has(email))
    .map((email) => ({ email, full_name: null }));

  const recipients = [...userRecipients, ...customRecipients];

  function toggleEmail(email) {
    setSelectedEmails((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
    setResult(null);
    setError("");
  }

  function selectAll() {
    setSelectedEmails(new Set(filteredByPlan.map((u) => u.email)));
  }

  function clearSelection() {
    setSelectedEmails(new Set());
    setCustomEmailsInput("");
    setCustomOnly(false);
  }

  function applyTemplate(tpl) {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setBanner(tpl.banner || "");
    setCtaText(tpl.cta_text || "");
    setCtaUrl(tpl.cta_url || "");
    setResult(null);
    setError("");
  }

  async function handleSend() {
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }

    if (recipients.length === 0) {
      setError("No recipients selected.");
      return;
    }

    if (!confirm(`Send this email to ${recipients.length} user(s)?\n\nSubject: ${subject}\n\nThis cannot be undone.`)) {
      return;
    }

    setSending(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminEmail,
          subject,
          message,
          banner,
          ctaText,
          ctaUrl,
          emails: recipients.map((u) => ({ email: u.email, full_name: u.full_name })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Broadcast failed");
        return;
      }

      setResult(data);
      setSelectedEmails(new Set());
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10">
            <Mail className="h-5 w-5 text-[#075a01]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900">Broadcast Email</h2>
            <p className="text-sm text-gray-500">Filter by plan or select individual users to send to.</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* STEP 1 — RECIPIENTS */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Step 1 — Choose Recipients</p>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
              <Filter className="h-3.5 w-3.5" />
              Filter by plan:
            </div>
            {[
              { value: "ALL", label: "All Users" },
              { value: "FREE", label: "Free" },
              { value: "PRO_MONTHLY", label: "Pro Monthly" },
              { value: "LIFETIME", label: "Lifetime" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setPlanFilter(opt.value);
                  clearSelection();
                  setResult(null);
                  setError("");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  planFilter === opt.value
                    ? "bg-[#075a01] text-white"
                    : "border border-gray-200 bg-gray-50 text-gray-700 hover:border-[#075a01]/30 hover:text-[#075a01]"
                }`}
              >
                {opt.label} ({opt.value === "ALL" ? allUsers.length : allUsers.filter((u) => String(u.plan || "FREE").toUpperCase() === opt.value).length})
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2.5">
              <span className="text-xs font-bold text-gray-500">{filteredByPlan.length} users in this filter</span>
              <div className="flex gap-3">
                <button onClick={selectAll} className="text-xs font-bold text-[#075a01] hover:underline">Select all</button>
                {selectedEmails.size > 0 && (
                  <button onClick={clearSelection} className="text-xs font-bold text-red-500 hover:underline">Clear ({selectedEmails.size})</button>
                )}
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
              {filteredByPlan.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-400">No users in this plan.</div>
              ) : (
                filteredByPlan.map((u) => {
                  const badge = planBadge(u.plan);
                  const checked = selectedEmails.has(u.email);
                  return (
                    <label
                      key={u.email}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${checked ? "bg-[#075a01]/5" : ""}`}
                    >
                      <input type="checkbox" checked={checked} onChange={() => toggleEmail(u.email)} className="h-4 w-4 rounded border-gray-300 accent-[#075a01]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{u.full_name || "—"}</p>
                        <p className="truncate text-xs text-gray-500">{u.email}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${badge.color}`}>{badge.label}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Custom Emails Input */}
          <div className="mt-5">
            <label className="mb-1.5 flex items-center justify-between text-xs font-bold text-gray-700">
              <span>Add Custom Emails <span className="font-normal text-gray-400">(optional)</span></span>
              {customEmails.length > 0 && <span className="text-[#075a01]">✓ {customEmails.length} valid</span>}
            </label>
            <textarea
              value={customEmailsInput}
              onChange={(e) => setCustomEmailsInput(e.target.value)}
              placeholder="email1@example.com, email2@example.com&#10;email3@example.com"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
            />
            <div className="mt-1.5 flex items-center justify-between text-xs">
              <p className="text-gray-400">Separate with commas, semicolons, or new lines. Duplicates are removed.</p>
              {invalidCustomCount > 0 && (
                <p className="text-red-500 font-semibold">{invalidCustomCount} invalid email{invalidCustomCount !== 1 ? "s" : ""} ignored</p>
              )}
            </div>

            {customEmails.length > 0 && (
              <label className={`mt-3 flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-all ${customOnly ? "border-[#ff914d] bg-[#ff914d]/5" : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}>
                <input type="checkbox" checked={customOnly} onChange={(e) => setCustomOnly(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#ff914d]" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Send ONLY to custom emails</p>
                  <p className="mt-0.5 text-xs text-gray-500">Skip all registered users. Only the {customEmails.length} custom email{customEmails.length !== 1 ? "s" : ""} above will receive this broadcast.</p>
                </div>
              </label>
            )}
          </div>

          {/* Recipients summary */}
          <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${recipients.length > 0 ? "border border-[#075a01]/20 bg-[#075a01]/5" : "border border-gray-200 bg-gray-50"}`}>
            <div className="flex items-center gap-2 mb-1">
              <Users className={`h-4 w-4 ${recipients.length > 0 ? "text-[#075a01]" : "text-gray-400"}`} />
              <span className="text-gray-700">
                Total recipients: <strong className={recipients.length > 0 ? "text-[#075a01]" : "text-gray-900"}>{recipients.length}</strong>
              </span>
            </div>
            {recipients.length > 0 && (
              <div className="ml-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                {userRecipients.length > 0 && <span>• {userRecipients.length} registered user{userRecipients.length !== 1 ? "s" : ""}</span>}
                {customRecipients.length > 0 && <span>• {customRecipients.length} custom email{customRecipients.length !== 1 ? "s" : ""}</span>}
              </div>
            )}
          </div>
        </div>

        {/* STEP 2 — COMPOSE */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Step 2 — Compose Email</p>

          {/* Template picker */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs font-semibold text-gray-500">
                Quick templates: {templates.length > 0 && <span className="text-gray-400">({templates.length})</span>}
              </p>
              <a href="/dashboard/admin/templates" className="text-xs font-bold text-[#075a01] hover:underline">
                Manage templates →
              </a>
            </div>
            {templatesLoading ? (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                Loading templates...
              </div>
            ) : templates.length === 0 ? (
              <p className="text-xs text-gray-400">
                No templates yet. <a href="/dashboard/admin/templates" className="text-[#075a01] hover:underline font-semibold">Create one →</a>
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 transition-all hover:border-[#075a01]/30 hover:bg-[#075a01]/5 hover:text-[#075a01]"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Your business can now be recommended by AI"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={10}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-[#075a01] focus:bg-white focus:ring-2 focus:ring-[#075a01]/20"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Each line break becomes a new paragraph. A CTA button is added automatically.
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="font-bold text-green-900">Broadcast sent successfully</p>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-green-700"><strong>{result.sent}</strong> delivered</span>
              {result.failed > 0 && <span className="text-red-600"><strong>{result.failed}</strong> failed</span>}
              <span className="text-gray-500">of <strong>{result.total}</strong> total</span>
            </div>
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !message.trim() || recipients.length === 0}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending to {recipients.length} user{recipients.length !== 1 ? "s" : ""}...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send to {recipients.length} User{recipients.length !== 1 ? "s" : ""}
            </>
          )}
        </button>

      </div>
    </div>
  );
}

// ─── UPGRADE MODAL ───────────────────────────────────────────────────────────
function UpgradeModal({ user, onClose, onSuccess }) {
  const [newPlan, setNewPlan] = useState("PRO_MONTHLY");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentPlan = String(user.plan || "FREE").toUpperCase();

  async function handleSubmit() {
    if (newPlan === currentPlan) {
      setError("User is already on this plan");
      return;
    }
    if (!confirm(`Change ${user.email} from ${currentPlan} to ${newPlan}?\n\nAn email will be sent automatically.`)) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, newPlan }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Update failed");
        setLoading(false);
        return;
      }

      setSuccess(`Plan updated. Email sent to ${data.email}.`);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      setError(err.message || "Network error");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#075a01]/10">
            <Crown className="h-5 w-5 text-[#075a01]" />
          </div>
          <h2 className="text-xl font-black text-gray-900">Change Plan</h2>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Current plan</div>
        <div className={`mb-5 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${planBadge(currentPlan).color}`}>
          {planBadge(currentPlan).label}
        </div>

        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">New plan</div>
        <div className="mb-6 space-y-2">
          {PLAN_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 transition-all ${
                newPlan === opt.value ? "border-[#075a01] bg-[#075a01]/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${newPlan === opt.value ? "border-[#075a01]" : "border-gray-300"}`}>
                  {newPlan === opt.value && <div className="h-1.5 w-1.5 rounded-full bg-[#075a01]" />}
                </div>
                <span className="text-sm font-bold text-gray-900">{opt.label}</span>
              </div>
              <input type="radio" name="plan" value={opt.value} checked={newPlan === opt.value} onChange={(e) => setNewPlan(e.target.value)} className="sr-only" />
            </label>
          ))}
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || newPlan === currentPlan}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Crown className="h-4 w-4" />
              Confirm Plan Change
            </>
          )}
        </button>

        <p className="mt-3 text-center text-[11px] text-gray-400">
          An email will be sent to the user automatically.
        </p>
      </div>
    </div>
  );
}