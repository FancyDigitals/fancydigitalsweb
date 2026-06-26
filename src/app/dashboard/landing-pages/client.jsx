"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Eye,
  Users,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Calendar,
  CheckCheck,
  AlertCircle,
  Plus,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Send,
  Check,
  Copy,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LandingPagesDashboardClient({ pages: initialPages, userId }) {
  const [pages, setPages] = useState(initialPages);
  const [expandedPage, setExpandedPage] = useState(null);
  const [leads, setLeads] = useState({});
  const [loadingLeads, setLoadingLeads] = useState({});
  const [togglingId, setTogglingId] = useState(null);
  const [markingSeenId, setMarkingSeenId] = useState(null);
  const [error, setError] = useState("");

  // Invite state
  const [showInviteFor, setShowInviteFor] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviting, setInviting] = useState(null);
  const [inviteResult, setInviteResult] = useState(null);
  const [copiedInvite, setCopiedInvite] = useState(false);

  async function loadLeads(pageId) {
    if (leads[pageId]) {
      setExpandedPage(expandedPage === pageId ? null : pageId);
      return;
    }
    setLoadingLeads((prev) => ({ ...prev, [pageId]: true }));
    try {
      const res = await fetch(`/api/landing-pages/leads?pageId=${pageId}`);
      const data = await res.json();
      setLeads((prev) => ({ ...prev, [pageId]: data.leads || [] }));
      setExpandedPage(pageId);
    } catch {
      setError("Failed to load leads.");
    } finally {
      setLoadingLeads((prev) => ({ ...prev, [pageId]: false }));
    }
  }

  async function togglePublish(pageId, currentState) {
    setTogglingId(pageId);
    setError("");
    try {
      const res = await fetch("/api/landing-pages/toggle-publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, publish: !currentState }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setPages((prev) =>
        prev.map((p) =>
          p.id === pageId ? { ...p, is_published: !currentState } : p
        )
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setTogglingId(null);
    }
  }

  async function markAllSeen(pageId) {
    setMarkingSeenId(pageId);
    setError("");
    try {
      const res = await fetch("/api/landing-pages/leads/mark-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId }),
      });
      if (!res.ok) throw new Error("Failed to mark seen");
      setPages((prev) =>
        prev.map((p) => (p.id === pageId ? { ...p, unseenLeads: 0 } : p))
      );
      setLeads((prev) => ({
        ...prev,
        [pageId]: (prev[pageId] || []).map((l) => ({ ...l, is_seen: true })),
      }));
    } catch (e) {
      setError(e.message);
    } finally {
      setMarkingSeenId(null);
    }
  }

  function exportCSV(pageId) {
    const pageLeads = leads[pageId];
    if (!pageLeads?.length) return;
    const page = pages.find((p) => p.id === pageId);
    const headers = ["Name", "Email", "Phone", "Date", "Seen"];
    const rows = pageLeads.map((l) => [
      l.name || "",
      l.email || "",
      l.phone || "",
      formatDate(l.created_at),
      l.is_seen ? "Yes" : "No",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page?.business_name || "leads"}-leads.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function openInvite(pageId) {
    setShowInviteFor(pageId);
    setInviteEmail("");
    setInviteName("");
    setInviteResult(null);
    setError("");
  }

  function closeInvite() {
    setShowInviteFor(null);
    setInviteResult(null);
    setInviteEmail("");
    setInviteName("");
  }

  async function handleInvite(pageId) {
    if (!inviteEmail.trim()) return;
    setInviting(pageId);
    setError("");
    try {
      const res = await fetch("/api/client/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId,
          clientEmail: inviteEmail.trim(),
          clientName: inviteName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invite");
      setInviteResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setInviting(null);
    }
  }

  function copyInviteUrl(url) {
    navigator.clipboard.writeText(url);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  }

  if (pages.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Landing Pages</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your published pages and leads.</p>
        </div>
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <Globe className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-700 mb-1">No landing pages yet</p>
          <p className="text-sm text-gray-500 mb-5">Generate and publish your first landing page.</p>
          <Link
            href="/dashboard/tools/ai-landing-page-generator"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white bg-[#075a01] hover:bg-[#0a8f01] transition"
          >
            <Plus className="h-4 w-4" />
            Create Landing Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Landing Pages</h1>
          <p className="mt-1 text-sm text-gray-500">
            {pages.length} page{pages.length !== 1 ? "s" : ""} ·{" "}
            {pages.reduce((s, p) => s + p.totalLeads, 0)} total leads
          </p>
        </div>
        <Link
          href="/dashboard/tools/ai-landing-page-generator"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-[#075a01] hover:bg-[#0a8f01] transition self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          New Page
        </Link>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Pages List */}
      <div className="space-y-3">
        {pages.map((page) => {
          const isExpanded = expandedPage === page.id;
          const isInviteOpen = showInviteFor === page.id;
          const pageLeads = leads[page.id] || [];
          const liveUrl = `${SITE_URL}/p/${page.slug}`;

          return (
            <div
              key={page.id}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Page Row */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {page.business_name}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          page.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {page.is_published ? "Live" : "Unpublished"}
                      </span>
                      {page.unseenLeads > 0 && (
                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          {page.unseenLeads} new
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400 truncate">/p/{page.slug}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{page.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{page.totalLeads} leads</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(page.created_at)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {page.is_published && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View
                      </a>
                    )}

                    <button
                      onClick={() => togglePublish(page.id, page.is_published)}
                      disabled={togglingId === page.id}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        page.is_published
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      {togglingId === page.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : page.is_published ? (
                        <ToggleRight className="h-3.5 w-3.5" />
                      ) : (
                        <ToggleLeft className="h-3.5 w-3.5" />
                      )}
                      {page.is_published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => loadLeads(page.id)}
                      disabled={loadingLeads[page.id]}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#075a01]/10 px-3 py-1.5 text-xs font-semibold text-[#075a01] hover:bg-[#075a01]/20 transition"
                    >
                      {loadingLeads[page.id] ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                      Leads
                    </button>

                    {/* Invite Client button */}
                    <button
                      onClick={() =>
                        isInviteOpen ? closeInvite() : openInvite(page.id)
                      }
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        isInviteOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      <Send className="h-3.5 w-3.5" />
                      Invite Client
                    </button>
                  </div>
                </div>
              </div>

              {/* Invite Client Panel */}
              {isInviteOpen && (
                <div className="border-t border-blue-100 bg-blue-50/40 p-4 sm:p-5">
                  <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Send className="h-4 w-4 text-blue-600" />
                    Invite Client to Their Dashboard
                  </p>

                  {inviteResult ? (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-4 space-y-3">
                      <p className="text-sm font-bold text-green-800">
                        Invite created successfully!
                      </p>
                      <p className="text-xs text-green-700">
                        Share these details with your client:
                      </p>
                      <div className="rounded-lg bg-white border border-green-100 p-3 space-y-2">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Activation Link
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-blue-600 break-all flex-1">
                              {inviteResult.acceptUrl}
                            </p>
                            <button
                              onClick={() => copyInviteUrl(inviteResult.acceptUrl)}
                              className="shrink-0 rounded-lg bg-gray-100 p-1.5 hover:bg-gray-200 transition"
                            >
                              {copiedInvite ? (
                                <Check className="h-3.5 w-3.5 text-green-600" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-gray-600" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Temp Password (client sets their own on first login)
                          </p>
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-900">
                            {inviteResult.tempPassword}
                          </code>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                            Client Login
                          </p>
                          <a
                            href="/client/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 underline"
                          >
                            {SITE_URL}/client/login
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={closeInvite}
                        className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={inviteName}
                        onChange={(e) => setInviteName(e.target.value)}
                        placeholder="Client name (optional)"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition"
                      />
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Client email address *"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleInvite(page.id)}
                          disabled={!inviteEmail.trim() || inviting === page.id}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          {inviting === page.id ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                          ) : (
                            <><Send className="h-4 w-4" /> Send Invite</>
                          )}
                        </button>
                        <button
                          onClick={closeInvite}
                          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400">
                        Client will receive an activation link to set their password and access their dashboard.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Leads Panel */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <p className="text-sm font-bold text-gray-700">
                      {pageLeads.length} lead{pageLeads.length !== 1 ? "s" : ""}
                      {page.unseenLeads > 0 && (
                        <span className="ml-2 text-red-500">
                          ({page.unseenLeads} unread)
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2">
                      {page.unseenLeads > 0 && (
                        <button
                          onClick={() => markAllSeen(page.id)}
                          disabled={markingSeenId === page.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                        >
                          {markingSeenId === page.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CheckCheck className="h-3.5 w-3.5" />
                          )}
                          Mark all read
                        </button>
                      )}
                      {pageLeads.length > 0 && (
                        <button
                          onClick={() => exportCSV(page.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                          CSV
                        </button>
                      )}
                    </div>
                  </div>

                  {pageLeads.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-6 text-center">
                      <Mail className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No leads yet. Share your page to get started.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {pageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className={`rounded-xl p-3 sm:p-4 border transition ${
                            !lead.is_seen
                              ? "bg-blue-50/60 border-blue-100"
                              : "bg-white border-gray-100"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div
                                className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                style={{ background: "#075a01" }}
                              >
                                {(lead.name || lead.email || "?")[0].toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {lead.name || "Anonymous"}
                                  {!lead.is_seen && (
                                    <span className="ml-2 inline-block rounded-full bg-blue-500 h-1.5 w-1.5 align-middle" />
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {lead.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                              {lead.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {lead.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(lead.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}