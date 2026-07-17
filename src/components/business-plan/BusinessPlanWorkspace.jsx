"use client";

import { useState, useCallback } from "react";
import BusinessPlanForm from "./BusinessPlanForm";
import BusinessPlanPreview from "./BusinessPlanPreview";
import BusinessPlanHistory from "./BusinessPlanHistory";
import { FileText, History, Plus, Sparkles, ChevronRight, Copy } from "lucide-react";

const TABS = [
  { id: "create", label: "Create", icon: Plus },
  { id: "history", label: "My Plans", icon: History },
];

export default function BusinessPlanWorkspace({
  plan,
  isPro,
  usedToday,
  dailyLimit,
  remaining,
  userEmail,
}) {
  const [activeTab, setActiveTab] = useState("create");
  const [businessPlan, setBusinessPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  // Prefill for "Use as Template"
  const [prefillData, setPrefillData] = useState(null);
  const [prefillKey, setPrefillKey] = useState(0);

  // Keep track of last inputs used so we can offer "Use as Template"
  const [lastInputs, setLastInputs] = useState(null);

  const isAtLimit = dailyLimit !== null && remaining === 0;

  const handleSave = useCallback(async (planData, inputData, existingId) => {
    try {
      const res = await fetch("/api/business-plan/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existingId || undefined,
          title: planData.title,
          industry: planData.industry,
          planType: planData.planType,
          inputData: inputData || {},
          sections: planData.sections,
          executiveSummary: planData.executiveSummary,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedId(data.plan.id);
        setHistoryKey((k) => k + 1);
      }
    } catch {
      // Silent fail on auto-save
    }
  }, []);

  const handleGenerate = useCallback(
    async (formData) => {
      setIsGenerating(true);
      setError(null);
      setBusinessPlan(null);
      setSavedId(null);

      try {
        const res = await fetch("/api/business-plan/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Generation failed. Please try again.");
        }

        setBusinessPlan(data.plan);
        setLastInputs(formData);
        setActiveTab("create");

        await handleSave(data.plan, formData, null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsGenerating(false);
      }
    },
    [handleSave]
  );

  const handleLoadFromHistory = useCallback((loadedPlan) => {
    setBusinessPlan({
      title: loadedPlan.title,
      planType: loadedPlan.document_type,
      industry: loadedPlan.industry,
      sections: loadedPlan.sections,
      executiveSummary: loadedPlan.executive_summary,
      tagline: loadedPlan.input_data?.tagline || "",
      shareSubject: "",
      shareBody: "",
    });
    // Keep the original inputs so user can reuse them as template
    setLastInputs(loadedPlan.input_data || null);
    setSavedId(loadedPlan.id);
    setActiveTab("create");
  }, []);

  const handleNewPlan = useCallback(() => {
    setBusinessPlan(null);
    setSavedId(null);
    setError(null);
  }, []);

  const handleUseAsTemplate = useCallback(() => {
    if (!lastInputs) return;
    // Clone inputs but clear the businessName so user is prompted to rename
    const templateData = { ...lastInputs };
    setPrefillData(templateData);
    setPrefillKey((k) => k + 1);
    setBusinessPlan(null);
    setSavedId(null);
    setError(null);
    setActiveTab("create");
  }, [lastInputs]);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                AI Business Plan
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Generate a complete, investor-ready business plan in 60 seconds.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-gray-100 bg-white px-3 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Today
            </p>
            <p className="text-lg font-bold text-gray-900 leading-none mt-0.5">
              {usedToday}
              {dailyLimit && (
                <span className="text-sm font-normal text-gray-400">
                  /{dailyLimit}
                </span>
              )}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {isPro ? "Unlimited" : "free"}
            </p>
          </div>
        </div>

        {isAtLimit && (
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800">
              Daily limit reached.{" "}
              <a
                href="/pricing"
                className="font-semibold underline hover:no-underline"
              >
                Upgrade to Pro
              </a>{" "}
              for unlimited business plans.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "create" && (
        <div className="space-y-6">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-700 font-medium">{error}</p>
              {error.includes("limit") && (
                <a
                  href="/pricing"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-red-700 underline"
                >
                  Upgrade to Pro <ChevronRight className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {!businessPlan ? (
            <BusinessPlanForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              isAtLimit={isAtLimit}
              isPro={isPro}
              prefillData={prefillData}
              prefillKey={prefillKey}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-600">
                  Business plan generated successfully
                </p>
                <div className="flex items-center gap-2">
                  {lastInputs && (
                    <button
                      onClick={handleUseAsTemplate}
                      className="flex items-center gap-1.5 rounded-lg border border-[#075a01]/30 bg-[#075a01]/5 px-3 py-1.5 text-sm font-semibold text-[#075a01] hover:bg-[#075a01]/10 transition"
                      title="Reuse these inputs to create a new variation"
                    >
                      <Copy className="h-3.5 w-3.5" /> Use as Template
                    </button>
                  )}
                  <button
                    onClick={handleNewPlan}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Plus className="h-3.5 w-3.5" /> New Plan
                  </button>
                </div>
              </div>
              <BusinessPlanPreview
                plan={businessPlan}
                savedId={savedId}
                userEmail={userEmail}
                isPro={isPro}
                onSave={(updatedPlan) =>
                  handleSave(updatedPlan, {}, savedId)
                }
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <BusinessPlanHistory
          key={historyKey}
          onLoad={handleLoadFromHistory}
        />
      )}
    </div>
  );
}