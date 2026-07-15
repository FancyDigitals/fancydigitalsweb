"use client";

import Link from "next/link";

export default function UpgradeModal({ feature, onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
        >
          ×
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl mb-4">
          ⚡
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {feature} is a Pro feature
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Upgrade to Pro to unlock competitor comparisons, niche domination reports, unlimited title generation, and 20 audits per day.
        </p>

        <ul className="space-y-2 mb-6">
          {[
            "20 channel audits per day",
            "Unlimited title & thumbnail generation",
            "Competitor comparison (up to 3)",
            "Niche domination reports",
            "Priority support",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/pricing"
          className="block w-full text-center bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
        >
          Upgrade to Pro — $19/mo
        </Link>
      </div>
    </div>
  );
}