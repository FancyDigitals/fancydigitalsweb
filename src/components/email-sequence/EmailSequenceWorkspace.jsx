"use client";

import { useState, useCallback } from "react";
import EmailSequenceForm from "./EmailSequenceForm";
import EmailSequencePreview from "./EmailSequencePreview";
import EmailSequenceHistory from "./EmailSequenceHistory";
import { Mail, History, Plus, Sparkles, ChevronRight, Copy } from "lucide-react";

const TABS = [
  { id: "create", label: "Create", icon: Plus },
  { id: "history", label: "My Sequences", icon: History },
];

export default function EmailSequenceWorkspace({
  plan,
  isPro,
  usedToday,
  dailyLimit,
  remaining,
  userEmail,
}) {
  const [activeTab, setActiveTab] = useState("create");
  const [sequence, setSequence] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  const [prefillData, setPrefillData] = useState(null);
  const [prefillKey, setPrefillKey] = useState(0);
  const [lastInputs, setLastInputs] = useState(null);

  const isAtLimit = dailyLimit !== null && remaining === 0;

  const handleSave = useCallback(async (seqData, inputData, existingId) => {
    try {
      const res = await fetch("/api/email-sequence/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existingId || undefined,
          title: seqData.title,
          sequenceType: seqData.sequenceType,
          tone: seqData.tone,
          audience: seqData.audience,
          inputData: inputData || {},
          emails: seqData.emails,
          strategyNotes: seqData.strategyNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedId(data.sequence.id);
        setHistoryKey((k) => k + 1);
      }
    } catch {
      // silent
    }
  }, []);

  const handleGenerate = useCallback(
    async (formData) => {
      setIsGenerating(true);
      setError(null);
      setSequence(null);
      setSavedId(null);

      try {
        const res = await fetch("/api/email-sequence/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Generation failed. Please try again.");
        }

        setSequence(data.sequence);
        setLastInputs(formData);
        setActiveTab("create");

        await handleSave(data.sequence, formData, null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsGenerating(false);
      }
    },
    [handleSave]
  );

  const handleLoadFromHistory = useCallback((loaded) => {
    setSequence({
      title: loaded.title,
      sequenceType: loaded.sequence_type,
      tone: loaded.tone,
      audience: loaded.audience,
      emails: loaded.emails,
      strategyNotes: loaded.strategy_notes,
    });
    setLastInputs(loaded.input_data || null);
    setSavedId(loaded.id);
    setActiveTab("create");
  }, []);

  const handleNewSequence = useCallback(() => {
    setSequence(null);
    setSavedId(null);
    setError(null);
  }, []);

  const handleUseAsTemplate = useCallback(() => {
    if (!lastInputs) return;
    setPrefillData({ ...lastInputs });
    setPrefillKey((k) => k + 1);
    setSequence(null);
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
                <Mail className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                AI Email Sequence
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Generate cold outreach, welcome, launch, and nurture sequences in 30 seconds.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-gray-100 bg-white px-3 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Today</p>
            <p className="text-lg font-bold text-gray-900 leading-none mt-0.5">
              {usedToday}
              {dailyLimit && (
                <span className="text-sm font-normal text-gray-400">/{dailyLimit}</span>
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
              <a href="/pricing" className="font-semibold underline hover:no-underline">
                Upgrade to Pro
              </a>{" "}
              for unlimited email sequences.
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

          {!sequence ? (
            <EmailSequenceForm
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
                  Sequence generated successfully
                </p>
                <div className="flex items-center gap-2">
                  {lastInputs && (
                    <button
                      onClick={handleUseAsTemplate}
                      className="flex items-center gap-1.5 rounded-lg border border-[#075a01]/30 bg-[#075a01]/5 px-3 py-1.5 text-sm font-semibold text-[#075a01] hover:bg-[#075a01]/10 transition"
                    >
                      <Copy className="h-3.5 w-3.5" /> Use as Template
                    </button>
                  )}
                  <button
                    onClick={handleNewSequence}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Plus className="h-3.5 w-3.5" /> New Sequence
                  </button>
                </div>
              </div>
              <EmailSequencePreview
                sequence={sequence}
                savedId={savedId}
                userEmail={userEmail}
                isPro={isPro}
                onSave={(updated) => handleSave(updated, {}, savedId)}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <EmailSequenceHistory key={historyKey} onLoad={handleLoadFromHistory} />
      )}
    </div>
  );
}