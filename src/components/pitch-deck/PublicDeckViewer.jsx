"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import PitchDeckPreview from "./PitchDeckPreview";

export default function PublicDeckViewer({ deck }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = deck.slides || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-bold text-gray-900 text-sm">{deck.title}</h1>
          <p className="text-xs text-gray-500">{deck.documentType}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Powered by Fancy Digitals</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white hover:bg-violet-700"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <PitchDeckPreview
          deck={deck}
          savedId={null}
          userEmail=""
          onSave={async () => {}}
        />
      </main>
    </div>
  );
}