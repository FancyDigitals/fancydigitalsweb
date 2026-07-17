"use client";

import { useState, useEffect } from "react";
import { FileText, Trash2, ExternalLink, Clock, Loader2 } from "lucide-react";

export default function BusinessPlanHistory({ onLoad }) {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/business-plan/history");
      const data = await res.json();
      if (data.success) {
        setPlans(data.plans || []);
      } else {
        setError(data.error || "Failed to load plans.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Delete this business plan? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/business-plan/history?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPlans((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  };

  const handleLoad = async (id) => {
    try {
      const res = await fetch(`/api/business-plan/load?id=${id}`);
      const data = await res.json();
      if (data.success) {
        onLoad(data.plan);
      }
    } catch {
      // ignore
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchPlans}
          className="mt-3 text-sm font-semibold text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">No plans yet</h3>
        <p className="mt-1 text-sm text-gray-400">
          Generate your first business plan to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {plans.length} saved {plans.length === 1 ? "plan" : "plans"}
      </p>

      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => handleLoad(plan.id)}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm cursor-pointer hover:border-[#075a01]/30 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {plan.title || "Untitled Business Plan"}
              </p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs text-gray-400">
                  {plan.document_type}
                </span>
                {plan.industry && (
                  <>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-400">{plan.industry}</span>
                  </>
                )}
                {plan.is_public && (
                  <>
                    <span className="text-gray-200">·</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-[#075a01]">
                      <ExternalLink className="h-3 w-3" />
                      Public
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">{formatDate(plan.updated_at)}</span>
            </div>
            <button
              onClick={(e) => handleDelete(plan.id, e)}
              disabled={deletingId === plan.id}
              className="rounded-lg p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
            >
              {deletingId === plan.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}