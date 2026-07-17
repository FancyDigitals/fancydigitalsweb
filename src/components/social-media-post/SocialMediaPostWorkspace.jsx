"use client";

import { useState, useEffect, useCallback } from "react";
import SocialMediaPostForm from "./SocialMediaPostForm";
import SocialMediaPostPreview from "./SocialMediaPostPreview";
import SocialMediaPostHistory from "./SocialMediaPostHistory";
import { Layers, Clock, Sparkles } from "lucide-react";

const TABS = [
  { id: "generate", label: "Generate", icon: Sparkles },
  { id: "history", label: "My Posts", icon: Clock },
];

export default function SocialMediaPostWorkspace({
  user,
  profile,
  plan,
  limits,
  todayUsage: initialUsage,
  userIsPro,
  dailyLimit,
}) {
  const [activeTab, setActiveTab] = useState("generate");
  const [generatedData, setGeneratedData] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [todayUsage, setTodayUsage] = useState(initialUsage);
  const [prefillData, setPrefillData] = useState(null);
  const [showPrefillBanner, setShowPrefillBanner] = useState(false);

  const limitLabel =
    dailyLimit === Infinity ? "Unlimited" : `${todayUsage}/${dailyLimit}`;
  const atLimit = dailyLimit !== Infinity && todayUsage >= dailyLimit;

  const handleGenerated = useCallback((data, usage) => {
    setGeneratedData(data);
    setSavedId(null);
    if (usage?.used !== undefined) {
      setTodayUsage(usage.used);
    }
    setActiveTab("generate");
  }, []);

  const handleSaved = useCallback((id) => {
    setSavedId(id);
  }, []);

  const handleLoadFromHistory = useCallback((item) => {
    setPrefillData({
      ...item.input_data,
      _loadedPosts: item.posts,
      _loadedId: item.id,
      _loadedTitle: item.title,
    });
    setGeneratedData(item.posts);
    setSavedId(item.id);
    setShowPrefillBanner(true);
    setActiveTab("generate");
  }, []);

  const handleUseAsTemplate = useCallback((item) => {
    setPrefillData({ ...item.input_data });
    setGeneratedData(null);
    setSavedId(null);
    setShowPrefillBanner(true);
    setActiveTab("generate");
  }, []);

  const handleDismissPrefill = useCallback(() => {
    setShowPrefillBanner(false);
    setPrefillData(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  AI Social Media Post Generator
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  8 platforms. One generation.
                </p>
              </div>
            </div>

            {/* Usage counter */}
            <div
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                atLimit
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-gray-50 border-gray-200 text-gray-600"
              }`}
            >
              Today: {limitLabel}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-[#075a01] text-[#075a01]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Limit warning */}
      {atLimit && !userIsPro && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-amber-800">
              You have reached your daily limit of {dailyLimit} generations on
              the Free plan.
            </p>
            <a
              href="/pricing"
              className="flex-shrink-0 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      )}

      {/* Prefill banner */}
      {showPrefillBanner && (
        <div className="bg-[#075a01]/5 border-b border-[#075a01]/20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-[#075a01] font-medium">
              Template loaded. Edit your inputs and generate new posts.
            </p>
            <button
              onClick={handleDismissPrefill}
              className="text-xs text-[#075a01] underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "generate" && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
            {/* Form */}
            <div className="xl:col-span-2">
              <SocialMediaPostForm
                onGenerated={handleGenerated}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                atLimit={atLimit}
                userIsPro={userIsPro}
                prefillData={prefillData}
                onPrefillConsumed={() => setShowPrefillBanner(false)}
              />
            </div>

            {/* Preview */}
            <div className="xl:col-span-3">
              {generatedData ? (
                <SocialMediaPostPreview
                  data={generatedData}
                  savedId={savedId}
                  onSaved={handleSaved}
                  userIsPro={userIsPro}
                  plan={plan}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 flex items-center justify-center mb-4">
                    <Layers className="w-7 h-7 text-[#075a01]" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    Your posts will appear here
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Fill in the form, select your platforms, and click Generate
                    to create scroll-stopping content for all 8 platforms.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <SocialMediaPostHistory
            onLoad={handleLoadFromHistory}
            onUseAsTemplate={handleUseAsTemplate}
          />
        )}
      </div>
    </div>
  );
}