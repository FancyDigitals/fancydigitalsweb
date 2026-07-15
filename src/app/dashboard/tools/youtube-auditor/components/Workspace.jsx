"use client";

import { useState } from "react";
import { isPro as checkIsPro } from "@/lib/pricing";
import AuditTab from "./AuditTab";
import TitlesTab from "./TitlesTab";
import CompareTab from "./CompareTab";
import NicheTab from "./NicheTab";
import UpgradeModal from "./UpgradeModal";

const TABS = [
  {
    id: "audit",
    label: "Channel Audit",
    mobileLabel: "Audit",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    id: "titles",
    label: "Titles & Thumbnails",
    mobileLabel: "Titles",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    id: "compare",
    label: "Compare Competitors",
    mobileLabel: "Compare",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    pro: true,
  },
  {
    id: "niche",
    label: "Niche Report",
    mobileLabel: "Niche",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    pro: true,
  },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3">
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
              <h1 className="hidden sm:block text-2xl font-bold text-gray-900">
                YouTube Auditor
              </h1>
            </div>
          </div>

          {/* Desktop tabs */}
          <div className="hidden sm:flex gap-1 overflow-x-auto">
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
                <span className="w-5 h-5">{tab.icon}</span>
                {tab.label}
                {tab.pro && !isPro && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-white uppercase">
                    Pro
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile tabs — compact scrollable pills */}
          <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0
                  ${
                    activeTab === tab.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{tab.icon}</span>
                {tab.mobileLabel}
                {tab.pro && !isPro && (
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-amber-400 text-white uppercase">
                    Pro
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
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