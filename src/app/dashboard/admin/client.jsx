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
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            User & Plan Management
          </h1>
          <p className="mt-2 text-gray-500">
            Manage user plans and send broadcast emails to all users.
          </p>
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
        <BroadcastSection adminEmail={adminEmail} userCount={users.length} />

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
function BroadcastSection({ adminEmail, userCount }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const TEMPLATES = [
    {
      label: "AI Recommendation Tool Launch",
      subject: "Your business can now be recommended by AI",
      message: `We just launched something powerful for your business.

Introducing the AI Recommendation Engine — a free tool that shows you exactly how likely ChatGPT, Gemini, Claude, and Perplexity are to recommend your business when someone asks them a question.

Here's what you get for free:
- Your AI Recommendation Score out of 100
- Breakdown across 10 key signals
- Top 3 improvement actions you can take today

Most businesses in Nigeria have no idea they're invisible to AI assistants. Now you can find out — and fix it.

Click below to check your score. It takes 30 seconds and no signup is required to share it with others.`,
    },
  ];

  function applyTemplate(tpl) {
    setSubject(tpl.subject);
    setMessage(tpl.message);
    setResult(null);
    setError("");
  }

  async function handleSend() {
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }

    if (
      !confirm(
        `Send this email to ALL ${userCount} users?\n\nSubject: ${subject}\n\nThis cannot be undone.`
      )
    ) {
      return;
    }

    setSending(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail, subject, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Broadcast failed");
        return;
      }

      setResult(data);
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
            <p className="text-sm text-gray-500">
              Send an email to all{" "}
              <span className="font-bold text-gray-900">{userCount} users</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Template picker */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Quick Templates
          </p>
          <div className="flex flex-wrap gap-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.label}
                onClick={() => applyTemplate(tpl)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 transition-all hover:border-[#075a01]/30 hover:bg-[#075a01]/5 hover:text-[#075a01]"
              >
                <Loader2 className="h-3 w-3" />
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipients */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Sending to:{" "}
            <strong className="text-gray-900">All {userCount} registered users</strong>
          </span>
        </div>

        {/* Subject */}
        <div>
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
            Each line break becomes a new paragraph. The email will include a CTA button to the AI Recommendation tool automatically.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="font-bold text-green-900">Broadcast sent successfully</p>
            </div>
            <div className="flex gap-6 text-sm">
              <span className="text-green-700">
                <strong>{result.sent}</strong> delivered
              </span>
              {result.failed > 0 && (
                <span className="text-red-600">
                  <strong>{result.failed}</strong> failed
                </span>
              )}
              <span className="text-gray-500">
                of <strong>{result.total}</strong> total
              </span>
            </div>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !message.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#075a01] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a8f01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending to {userCount} users...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send to All {userCount} Users
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
    if (
      !confirm(
        `Change ${user.email} from ${currentPlan} to ${newPlan}?\n\nAn email will be sent automatically.`
      )
    ) {
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
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
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
                newPlan === opt.value
                  ? "border-[#075a01] bg-[#075a01]/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                    newPlan === opt.value ? "border-[#075a01]" : "border-gray-300"
                  }`}
                >
                  {newPlan === opt.value && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                  )}
                </div>
                <span className="text-sm font-bold text-gray-900">{opt.label}</span>
              </div>
              <input
                type="radio"
                name="plan"
                value={opt.value}
                checked={newPlan === opt.value}
                onChange={(e) => setNewPlan(e.target.value)}
                className="sr-only"
              />
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