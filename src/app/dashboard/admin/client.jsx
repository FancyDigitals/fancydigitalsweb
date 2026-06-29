"use client";

import { useState, useEffect } from "react";
import {
  Crown,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
  User as UserIcon,
  Calendar,
  ArrowRight,
  X,
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

export default function AdminClient() {
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
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff914d]">
            <Shield className="h-4 w-4" />
            <span>Admin Panel</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            User & Plan Management
          </h1>
          <p className="mt-2 text-gray-500">
            Manage user plans. Upgrades and downgrades automatically trigger welcome/downgrade emails.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
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

// ─── MODAL ─────────────────────────────────────────────────────────────────

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
                <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  newPlan === opt.value ? "border-[#075a01]" : "border-gray-300"
                }`}>
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