"use client";

import { useState, useCallback } from "react";
import PitchDeckForm from "./PitchDeckForm";
import PitchDeckPreview from "./PitchDeckPreview";
import PitchDeckHistory from "./PitchDeckHistory";
import { Presentation, History, Plus, Sparkles, ChevronRight } from "lucide-react";

const TABS = [
  { id: "create", label: "Create", icon: Plus },
  { id: "history", label: "My Decks", icon: History },
];

export default function PitchDeckWorkspace({ plan, usedToday, dailyLimit, remaining, userEmail }) {
  const [activeTab, setActiveTab] = useState("create");
  const [deck, setDeck] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [historyKey, setHistoryKey] = useState(0);

  const isPro = plan !== "FREE";
  const isAtLimit = dailyLimit !== null && remaining === 0;

  const handleSave = useCallback(async (deckData, inputData, existingId) => {
    try {
      const res = await fetch("/api/pitch-deck/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: existingId || undefined,
          title: deckData.title,
          documentType: deckData.documentType,
          theme: deckData.theme,
          inputData: inputData || {},
          slides: deckData.slides,
          emailBody: deckData.emailBody,
          logo: deckData.logo || null,
          logoPosition: deckData.logoPosition || "top-left",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedId(data.deck.id);
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
      setDeck(null);
      setSavedId(null);

      try {
        const res = await fetch("/api/pitch-deck/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Generation failed. Please try again.");
        }

        const deckWithLogo = {
          ...data.deck,
          logo: formData.logo || null,
          logoPosition: formData.logoPosition || "top-left",
        };

        setDeck(deckWithLogo);
        setActiveTab("create");

        await handleSave(deckWithLogo, formData, null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsGenerating(false);
      }
    },
    [handleSave]
  );

  const handleLoadFromHistory = useCallback((loadedDeck) => {
    setDeck({
      title: loadedDeck.title,
      documentType: loadedDeck.document_type,
      theme: loadedDeck.theme,
      slides: loadedDeck.slides,
      emailBody: loadedDeck.email_body,
      emailSubject: "",
      executiveSummary: "",
      tagline: "",
      logo: loadedDeck.input_data?.logo || null,
      logoPosition: loadedDeck.input_data?.logoPosition || "top-left",
      primaryColor: loadedDeck.input_data?.primaryColor || "#075a01",
    });
    setSavedId(loadedDeck.id);
    setActiveTab("create");
  }, []);

  const handleNewDeck = useCallback(() => {
    setDeck(null);
    setSavedId(null);
    setError(null);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
                <Presentation className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">AI Pitch Deck</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Generate world-class pitch decks, proposals and business documents instantly.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-gray-100 bg-white px-3 py-2 text-center shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Today</p>
            <p className="text-lg font-bold text-gray-900 leading-none mt-0.5">
              {usedToday}
              {dailyLimit && (<span className="text-sm font-normal text-gray-400">/{dailyLimit}</span>)}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">{isPro ? "Unlimited" : "free"}</p>
          </div>
        </div>

        {isAtLimit && (
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800">
              Daily limit reached.{" "}
              <a href="/pricing" className="font-semibold underline hover:no-underline">Upgrade to Pro</a>{" "}
              for unlimited pitch decks.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
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
                <a href="/pricing" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-red-700 underline">
                  Upgrade to Pro <ChevronRight className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {!deck ? (
            <PitchDeckForm onGenerate={handleGenerate} isGenerating={isGenerating} isAtLimit={isAtLimit} isPro={isPro} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-600">✅ Deck generated successfully</p>
                <button onClick={handleNewDeck} className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <Plus className="h-3.5 w-3.5" /> New Deck
                </button>
              </div>
              <PitchDeckPreview
                deck={deck}
                savedId={savedId}
                userEmail={userEmail}
                onSave={(updatedDeck) => handleSave(updatedDeck, {}, savedId)}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (<PitchDeckHistory key={historyKey} onLoad={handleLoadFromHistory} />)}
    </div>
  );
}