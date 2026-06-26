"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Globe,
  ExternalLink,
  Loader2,
  AlertCircle,
  Trash2,
  Calendar,
  Check,
  X,
  Mail,
  UserX,
  CheckCircle2,
  Clock,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

const STATUS_STYLES = {
  accepted: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
  expired: { bg: "bg-gray-100", text: "text-gray-500", label: "Expired" },
  unknown: { bg: "bg-gray-100", text: "text-gray-500", label: "Unknown" },
};

export default function ClientsPageClient() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/client/manage");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setClients(data.clients || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(siteId) {
    setRemovingId(siteId);
    setError("");
    try {
      const res = await fetch("/api/client/manage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId }),
      });
      if (!res.ok) throw new Error("Failed to revoke access");
      setClients((prev) => prev.filter((c) => c.id !== siteId));
      setConfirmRemove(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Clients</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage client access to their website dashboards.
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-700 mb-1">No clients yet</p>
          <p className="text-sm text-gray-500">
            Publish a landing page and invite your client from the Landing Pages dashboard.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => {
            const status = STATUS_STYLES[c.invite_status] || STATUS_STYLES.unknown;
            const isConfirming = confirmRemove === c.id;

            return (
              <div
                key={c.id}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Client info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-[#075a01] flex items-center justify-center text-white text-sm font-bold">
                      {(c.client_name || c.client_email || "?")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {c.client_name || c.client_email.split("@")[0]}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${status.bg} ${status.text}`}
                        >
                          {c.invite_status === "accepted" && (
                            <CheckCircle2 className="h-2.5 w-2.5 inline mr-0.5" />
                          )}
                          {c.invite_status === "pending" && (
                            <Clock className="h-2.5 w-2.5 inline mr-0.5" />
                          )}
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {c.client_email}
                      </p>
                    </div>
                  </div>

                  {/* Site info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[120px]">
                        {c.page_name || c.site_name}
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(c.created_at)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {c.page_slug && (
                      <a
                        href={`${SITE_URL}/p/${c.page_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Site
                      </a>
                    )}

                    {isConfirming ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleRemove(c.id)}
                          disabled={removingId === c.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50 transition"
                        >
                          {removingId === c.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmRemove(null)}
                          className="rounded-lg bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 transition"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmRemove(c.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                      >
                        <UserX className="h-3.5 w-3.5" />
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}