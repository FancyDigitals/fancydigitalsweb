"use client";

import { useState } from "react";
import { isPro as checkIsPro } from "@/lib/pricing";
import AuditTab from "./AuditTab";
import TitlesTab from "./TitlesTab";
import CompareTab from "./CompareTab";
import NicheTab from "./NicheTab";
import UpgradeModal from "./UpgradeModal";

const TABS = [
  { id: "audit", label: "Channel Audit", icon: "🔎" },
  { id: "titles", label: "Titles & Thumbnails", icon: "✏️" },
  { id: "compare", label: "Compare Competitors", icon: "⚔️", pro: true },
  { id: "niche", label: "Niche Report", icon: "🎯", pro: true },
];

export default function YoutubeAuditorWorkspace({ user, plan }) {
  const [activeTab, setActiveTab] = useState("audit");
  const [upgradePrompt, setUpgradePrompt] = useState(null);

  const isPro = checkIsPro(plan);

  const handleTabClick = (tab) => {
    if (tab.pro && !isPro) {
      setUpgradePrompt(tab.label);
      return;
    }
    setActiveTab(tab.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  YouTube Growth Studio
                </div>
                {plan !== "FREE" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                    {plan.replace("_MONTHLY", "").replace("_YEARLY", "")}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                YouTube Auditor
              </h1>
            </div>
          </div>

          {/* ===== TABS ===== */}
          <div className="flex gap-1 overflow-x-auto -mx-6 px-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition
                  ${
                    activeTab === tab.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.pro && !isPro && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-white uppercase">
                    Pro
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "audit" && <AuditTab isPro={isPro} />}
        {activeTab === "titles" && <TitlesTab isPro={isPro} />}
        {activeTab === "compare" && <CompareTab isPro={isPro} />}
        {activeTab === "niche" && <NicheTab isPro={isPro} />}
      </div>

      {/* ===== UPGRADE MODAL ===== */}
      {upgradePrompt && (
        <UpgradeModal
          feature={upgradePrompt}
          onClose={() => setUpgradePrompt(null)}
        />
      )}
    </div>
  );
}