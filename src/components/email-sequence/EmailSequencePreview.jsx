"use client";

import { useState } from "react";
import {
  Mail,
  Share2,
  Copy,
  Check,
  Edit3,
  X,
  Star,
  Clock,
  Send,
  MousePointerClick,
  Eye,
  Lightbulb,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function EditableField({ value, onChange, multiline = false, className = "", placeholder = "Click to edit" }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    onChange(draft);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="relative">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(6, Math.ceil((draft || "").length / 60))}
            className={`w-full rounded-lg border-2 border-[#075a01] bg-white px-3 py-2 focus:outline-none resize-none font-sans ${className}`}
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`w-full rounded-lg border-2 border-[#075a01] bg-white px-3 py-2 focus:outline-none ${className}`}
          />
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 rounded-lg bg-[#075a01] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#064c01]"
          >
            <Check className="h-3 w-3" /> Save
          </button>
          <button
            onClick={() => {
              setDraft(value);
              setEditing(false);
            }}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            <X className="h-3 w-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className={`group relative cursor-text rounded-md px-1 -mx-1 hover:bg-[#075a01]/5 transition-colors ${className}`}
    >
      {value ? (
        multiline ? (
          <div className="whitespace-pre-wrap">{value}</div>
        ) : (
          value
        )
      ) : (
        <span className="text-gray-300 italic">{placeholder}</span>
      )}
      <Edit3 className="inline-block ml-1.5 h-3 w-3 text-[#075a01]/0 group-hover:text-[#075a01]/60 transition-opacity align-middle" />
    </div>
  );
}

function EmailCard({ email, index, totalCount, onUpdate }) {
  const [isOpen, setIsOpen] = useState(index === 0);
  const [copied, setCopied] = useState(false);

  const updateField = (field, value) => {
    onUpdate({ ...email, [field]: value });
  };

  const handleCopy = async () => {
    const text = `Subject: ${email.subject}\nPreview: ${email.previewText || ""}\n\n${email.body}\n\n[CTA] ${email.ctaText}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Email header */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white font-black text-sm shrink-0">
          {email.number || index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-900 truncate">
              {email.subject || "Untitled email"}
            </p>
            {email.sendDelay && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#075a01] bg-[#075a01]/10 px-2 py-0.5 rounded-full shrink-0">
                <Clock className="h-3 w-3" />
                {email.sendDelay}
              </span>
            )}
          </div>
          {email.purpose && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{email.purpose}</p>
          )}
        </div>
        <span className="text-gray-400 shrink-0">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-50">
          {/* Subject lines */}
          <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Send className="h-3 w-3 text-gray-400" />
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Subject Line
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] font-bold text-[#075a01] hover:underline"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>
            <div className="text-sm font-bold text-gray-900">
              <EditableField
                value={email.subject}
                onChange={(v) => updateField("subject", v)}
              />
            </div>
            {email.subjectAlt && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                  A/B Variant
                </p>
                <div className="text-sm text-gray-600">
                  <EditableField
                    value={email.subjectAlt}
                    onChange={(v) => updateField("subjectAlt", v)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview text */}
          {email.previewText && (
            <div className="px-5 py-3 border-b border-gray-50">
              <div className="flex items-center gap-1.5 mb-1">
                <Eye className="h-3 w-3 text-gray-400" />
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Inbox Preview
                </p>
              </div>
              <div className="text-xs text-gray-600 italic">
                <EditableField
                  value={email.previewText}
                  onChange={(v) => updateField("previewText", v)}
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="px-5 py-5 border-b border-gray-50">
            <div className="flex items-center gap-1.5 mb-3">
              <Mail className="h-3 w-3 text-gray-400" />
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                Body
              </p>
            </div>
            <div className="text-[15px] leading-[1.75] text-gray-800 whitespace-pre-wrap font-sans">
              <EditableField
                value={email.body}
                onChange={(v) => updateField("body", v)}
                multiline
              />
            </div>
          </div>

          {/* CTA */}
          {email.ctaText && (
            <div className="px-5 py-4 bg-[#075a01]/5">
              <div className="flex items-center gap-1.5 mb-2">
                <MousePointerClick className="h-3 w-3 text-[#075a01]" />
                <p className="text-[10px] font-black uppercase tracking-wider text-[#075a01]">
                  Call-to-Action Button
                </p>
              </div>
              <div className="inline-flex">
                <div className="rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-2.5 text-sm font-bold text-white shadow-sm">
                  <EditableField
                    value={email.ctaText}
                    onChange={(v) => updateField("ctaText", v)}
                    className="text-white"
                  />
                </div>
              </div>
              {email.ctaTip && (
                <div className="mt-3 flex items-start gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 italic">{email.ctaTip}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ShareModal({ sequence, savedId, onClose }) {
  const [shareUrl, setShareUrl] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  const createShareLink = async () => {
    if (!savedId) return;
    setIsCreating(true);
    try {
      const res = await fetch("/api/email-sequence/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: savedId }),
      });
      const data = await res.json();
      if (data.success) setShareUrl(data.shareUrl);
    } catch {}
    finally {
      setIsCreating(false);
    }
  };

  const copyUrl = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Share Sequence</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Public Share Link
          </p>
          {shareUrl ? (
            <div className="flex gap-2">
              <input readOnly value={shareUrl} className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 font-mono" />
              <button onClick={copyUrl} className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#064c01] shrink-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : (
            <button
              onClick={createShareLink}
              disabled={isCreating || !savedId}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] py-3 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] disabled:opacity-50"
            >
              {isCreating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating link...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Create Share Link
                </>
              )}
            </button>
          )}
          <p className="text-xs text-gray-400 mt-3">
            Anyone with this link can view your sequence. Perfect for sharing with team or clients.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EmailSequencePreview({ sequence, savedId, userEmail, onSave, isPro = false }) {
  const [emails, setEmails] = useState(sequence.emails || []);
  const [showShare, setShowShare] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [exportedCsv, setExportedCsv] = useState(false);

  const updateEmail = (index, updated) => {
    const newEmails = emails.map((e, i) => (i === index ? updated : e));
    setEmails(newEmails);
    onSave && onSave({ ...sequence, emails: newEmails });
  };

  const handleManualSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ ...sequence, emails });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyAll = async () => {
    const text = emails
      .map((e, i) => {
        return `═══════════════════════════════════
EMAIL ${e.number || i + 1} — Send: ${e.sendDelay || "TBD"}
═══════════════════════════════════

Subject: ${e.subject}
Preview: ${e.previewText || ""}

${e.body}

[CTA] ${e.ctaText}

`;
      })
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = ["Email #", "Send Delay", "Subject", "Subject Alt", "Preview Text", "Body", "CTA"];
    const csvEscape = (v) => {
      if (v === null || v === undefined) return "";
      const s = String(v).replace(/"/g, '""');
      return `"${s}"`;
    };
    const rows = emails.map((e, i) => [
      e.number || i + 1,
      e.sendDelay || "",
      e.subject || "",
      e.subjectAlt || "",
      e.previewText || "",
      e.body || "",
      e.ctaText || "",
    ]);
    const csv = [headers.map(csvEscape).join(","), ...rows.map((r) => r.map(csvEscape).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(sequence.title || "email-sequence").replace(/[^a-z0-9]/gi, "-").toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportedCsv(true);
    setTimeout(() => setExportedCsv(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-sm p-3 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01] shrink-0">
            <Mail className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{sequence.title}</p>
            <p className="text-xs text-gray-400">
              {sequence.sequenceType} · {emails.length} emails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {isSaving ? (
              <div className="h-3 w-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-3 w-3 text-[#075a01]" />
            ) : (
              <Check className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">{saveSuccess ? "Saved!" : "Save"}</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            {copiedAll ? <Check className="h-3 w-3 text-[#075a01]" /> : <Copy className="h-3 w-3" />}
            <span className="hidden sm:inline">{copiedAll ? "Copied!" : "Copy All"}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            {exportedCsv ? <Check className="h-3 w-3 text-[#075a01]" /> : <Download className="h-3 w-3" />}
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={() => setShowShare(true)}
            disabled={!savedId}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-2 text-xs font-bold text-white hover:from-[#064c01] hover:to-[#087a01] transition disabled:opacity-50"
          >
            <Share2 className="h-3 w-3" />
            Share
          </button>
        </div>
      </div>

      {/* Strategy notes */}
      {sequence.strategyNotes && (
        <div className="rounded-2xl border border-[#075a01]/15 bg-gradient-to-br from-[#075a01]/5 to-[#0a8f01]/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#075a01]">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#075a01]">
                Strategy
              </p>
              <h2 className="text-sm font-black text-gray-900">Why this sequence works</h2>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{sequence.strategyNotes}</p>
        </div>
      )}

      {/* Emails */}
      <div className="space-y-3">
        {emails.map((email, index) => (
          <EmailCard
            key={email.id || index}
            email={email}
            index={index}
            totalCount={emails.length}
            onUpdate={(updated) => updateEmail(index, updated)}
          />
        ))}
      </div>

      {/* Footer branding (free only) */}
      {!isPro && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-center">
          <p className="text-xs text-gray-400">
            Generated with <span className="font-bold text-[#075a01]">Fancy Digitals</span> AI Email Sequence Generator
          </p>
        </div>
      )}

      {showShare && (
        <ShareModal sequence={sequence} savedId={savedId} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}