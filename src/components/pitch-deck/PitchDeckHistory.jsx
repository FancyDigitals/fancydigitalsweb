"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Trash2,
  ExternalLink,
  Loader2,
  Clock,
  AlertCircle,
} from "lucide-react";

const TYPE_COLORS = {
  "Startup Pitch Deck": "bg-violet-100 text-violet-700",
  "Investor Deck": "bg-blue-100 text-blue-700",
  "Business Proposal": "bg-emerald-100 text-emerald-700",
  "Agency Proposal": "bg-orange-100 text-orange-700",
  "Sales Proposal": "bg-red-100 text-red-700",
  "Company Profile": "bg-gray-100 text-gray-700",
  "Grant Proposal": "bg-amber-100 text-amber-700",
  "Media Kit": "bg-pink-100 text-pink-700",
};

function getTypeColor(docType) {
  return TYPE_COLORS[docType] || "bg-gray-100 text-gray-600";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PitchDeckHistory({ onLoad }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pitch-deck/history");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setDecks(data.decks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async (deck) => {
    setLoadingId(deck.id);
    try {
      const res = await fetch(`/api/pitch-deck/load?id=${deck.id}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      onLoad(data.deck);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/pitch-deck/history?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setDecks((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
        <p className="text-sm text-gray-400">Loading your decks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <AlertCircle className="h-5 w-5 text-red-400 mx-auto mb-2" />
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchHistory}
          className="mt-3 text-sm font-semibold text-red-600 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 mx-auto mb-4">
          <FileText className="h-5 w-5 text-violet-500" />
        </div>
        <h3 className="font-bold text-gray-900 mb-1">No decks yet</h3>
        <p className="text-sm text-gray-400">
          Generate your first pitch deck and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-600">
          {decks.length} deck{decks.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {decks.map((deck) => (
        <div
          key={deck.id}
          className="group rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 hover:border-violet-200 hover:shadow-sm transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                <FileText className="h-4 w-4 text-violet-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900 text-sm truncate">
                  {deck.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${getTypeColor(deck.document_type)}`}
                  >
                    {deck.document_type}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(deck.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleLoad(deck)}
                disabled={loadingId === deck.id}
                className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-violet-700 transition disabled:opacity-50"
              >
                {loadingId === deck.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
                Open
              </button>
              <button
                onClick={() => handleDelete(deck.id)}
                disabled={deleting === deck.id}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 transition"
              >
                {deleting === deck.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}