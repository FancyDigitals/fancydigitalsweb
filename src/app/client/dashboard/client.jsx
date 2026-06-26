"use client";

import { useState } from "react";
import {
  Globe,
  Eye,
  Users,
  Mail,
  Phone,
  Calendar,
  CheckCheck,
  Download,
  ExternalLink,
  LogOut,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  TrendingUp,
  Edit3,
  Check,
  X,
  MapPin,
  User,
} from "lucide-react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fancydigitals.com.ng";

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ClientDashboardClient({ client, sites }) {
  const [activeSiteIdx, setActiveSiteIdx] = useState(0);
  const [showLeads, setShowLeads] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const [localSites, setLocalSites] = useState(sites);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [editSuccess, setEditSuccess] = useState("");

  const site = localSites[activeSiteIdx];
  const liveUrl = site?.page?.slug ? `${SITE_URL}/p/${site.page.slug}` : null;
  const brand = site?.page?.brand_color || "#075a01";

  async function handleMarkAllSeen() {
    setMarkingAll(true);
    try {
      const res = await fetch("/api/landing-pages/leads/mark-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: site.page_id }),
      });
      if (!res.ok) throw new Error("Failed");
      setLocalSites((prev) =>
        prev.map((s, i) =>
          i === activeSiteIdx
            ? {
                ...s,
                unseenLeads: 0,
                leads: s.leads.map((l) => ({ ...l, is_seen: true })),
              }
            : s
        )
      );
    } catch {
      setError("Failed to mark leads as read.");
    } finally {
      setMarkingAll(false);
    }
  }

  function exportCSV() {
    const leads = site.leads;
    if (!leads?.length) return;
    const headers = [
      "Name","Email","Phone","Gender","City",
      "State","Country","Intent","Date",
    ];
    const rows = leads.map((l) => [
      l.name || "", l.email || "", l.phone || "",
      l.gender || "", l.city || "", l.state || "",
      l.country || "", l.intent || "", formatDate(l.created_at),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${site.site_name || "leads"}-leads.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleLogout() {
    await fetch("/api/client/auth/logout", { method: "POST" });
    window.location.href = "/client/login";
  }

  function getContactField(field) {
    const form = site?.page?.form_data || {};
    const footer = site?.page?.page_data?.footer || {};
    const map = {
      phone: footer.phone || form.footerPhone || "",
      email: footer.email || form.footerEmail || "",
      address: footer.address || form.footerAddress || "",
    };
    return map[field] || "";
  }

  function startEdit(field) {
    setEditing(field);
    setEditValue(getContactField(field));
    setEditSuccess("");
    setError("");
  }

  async function saveEdit() {
    if (!editValue.trim()) return;
    setSavingEdit(true);
    setError("");
    try {
      const res = await fetch("/api/client/edit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: site.id,
          field: editing,
          newValue: editValue.trim(),
          oldValue: getContactField(editing),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setEditSuccess(
        `Edit request sent for "${editing}". Your agency will apply it shortly.`
      );
      setEditing(null);
    } catch {
      setError("Failed to send edit request.");
    } finally {
      setSavingEdit(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">
                {site?.site_name || "My Website"}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">Client Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: brand }}
              >
                {(client.full_name || client.email)[0].toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {client.full_name || client.email.split("@")[0]}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-4">

        {/* SITE SWITCHER */}
        {localSites.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {localSites.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSiteIdx(i);
                  setShowLeads(false);
                }}
                className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition ${
                  i === activeSiteIdx
                    ? "bg-[#075a01] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {s.site_name || `Site ${i + 1}`}
                {s.unseenLeads > 0 && (
                  <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {s.unseenLeads}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 mb-2">
              <Eye className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Page Views
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {site?.page?.views || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 mb-2">
              <Users className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Total Leads
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {site?.totalLeads || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 mb-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              New Leads
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">
              {site?.unseenLeads || 0}
            </p>
          </div>
        </div>

        {/* SITE STATUS */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="font-bold text-gray-900">{site?.site_name}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    site?.page?.is_published
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {site?.page?.is_published ? "Live" : "Offline"}
                </span>
              </div>
              {liveUrl && (
                <p className="text-xs text-gray-400 break-all">{liveUrl}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">
                Last updated: {formatDate(site?.page?.updated_at)}
              </p>
            </div>
            {liveUrl && site?.page?.is_published && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: brand }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 transition self-start sm:self-auto shrink-0"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View My Website
              </a>
            )}
          </div>
        </div>

        {/* CONTACT DETAILS + EDIT */}
        {site?.can_edit_contact && (
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                <Edit3 className="h-4 w-4 text-[#075a01]" />
                Contact Details
              </h3>
              <p className="text-[10px] text-gray-400">
                Click any field to request an update
              </p>
            </div>

            {editSuccess && (
              <div className="mb-3 rounded-xl bg-green-50 border border-green-100 px-4 py-2.5 text-xs text-green-700 font-semibold">
                {editSuccess}
              </div>
            )}

            <div className="space-y-2">
              {[
                { field: "phone", icon: Phone, label: "Phone" },
                { field: "email", icon: Mail, label: "Email" },
                { field: "address", icon: MapPin, label: "Address" },
              ].map(({ field, icon: Icon, label }) => (
                <div
                  key={field}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                >
                  {editing === field ? (
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#075a01]"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        disabled={savingEdit}
                        className="rounded-lg p-1.5 text-white hover:opacity-90 transition"
                        style={{ background: brand }}
                      >
                        {savingEdit ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="rounded-lg bg-gray-200 p-1.5 text-gray-600 hover:bg-gray-300 transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(field)}
                      className="w-full flex items-center gap-2 text-left group"
                    >
                      <Icon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          {label}
                        </p>
                        <p className="text-sm text-gray-700 truncate">
                          {getContactField(field) || (
                            <span className="text-gray-400 italic text-xs">
                              Not set — click to request
                            </span>
                          )}
                        </p>
                      </div>
                      <Edit3 className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#075a01] transition shrink-0" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADS */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowLeads(!showLeads)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#075a01]" />
              <span className="font-bold text-gray-900 text-sm">
                Leads ({site?.totalLeads || 0})
              </span>
              {site?.unseenLeads > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {site.unseenLeads} new
                </span>
              )}
            </div>
            {showLeads ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>

          {showLeads && (
            <div className="border-t border-gray-100 p-5">
              {/* Actions */}
              <div className="flex items-center gap-2 mb-4">
                {site?.unseenLeads > 0 && (
                  <button
                    onClick={handleMarkAllSeen}
                    disabled={markingAll}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    {markingAll ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <CheckCheck className="h-3.5 w-3.5" />
                    )}
                    Mark all read
                  </button>
                )}
                {site?.leads?.length > 0 && (
                  <button
                    onClick={exportCSV}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </button>
                )}
              </div>

              {!site?.leads?.length ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
                  <Mail className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No leads yet.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Share your website to start collecting leads.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {site.leads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`rounded-xl border p-4 transition ${
                        !lead.is_seen
                          ? "bg-blue-50/50 border-blue-100"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: brand }}
                        >
                          {(lead.name || lead.email || "?")[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900">
                              {lead.name || "Anonymous"}
                            </p>
                            {!lead.is_seen && (
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 inline-block" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {lead.email}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-3">
                            {lead.phone && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </span>
                            )}
                            {lead.city && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {lead.city}
                                {lead.state ? `, ${lead.state}` : ""}
                              </span>
                            )}
                            {lead.gender && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <User className="h-3 w-3" />
                                {lead.gender}
                              </span>
                            )}
                            {lead.country && (
                              <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                <Globe className="h-3 w-3" />
                                {lead.country}
                              </span>
                            )}
                          </div>

                          {lead.intent && (
                            <div className="mt-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                                Intent
                              </p>
                              <p className="text-xs text-gray-700">{lead.intent}</p>
                            </div>
                          )}

                          <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(lead.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="text-center pb-6">
          <p className="text-[10px] text-gray-400">
            Powered by{" "}
            <a
              href="https://fancydigitals.com.ng"
              className="font-semibold text-[#075a01] hover:underline"
            >
              Fancy Digitals
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}