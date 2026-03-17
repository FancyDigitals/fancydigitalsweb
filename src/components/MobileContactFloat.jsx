"use client";

import { useEffect, useState } from "react";

export default function MobileContactFloat() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 md:hidden">
        {/* OPTIONS */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            isExpanded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* WHATSAPP */}
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <span className="px-4 py-2 rounded-xl bg-gray-900/90 text-white text-sm font-semibold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              WhatsApp
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z"/>
              </svg>
            </div>
          </a>

          {/* CALL */}
          <a href="tel:+2340000000000" className="group flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-gray-900/90 text-white text-sm font-semibold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Call Us
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff914d] to-[#ff6b1a] shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2h-1C9 21 3 15 3 6z" />
              </svg>
            </div>
          </a>

          {/* EMAIL */}
          <a href="mailto:hello@studio.com" className="group flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl bg-gray-900/90 text-white text-sm font-semibold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              Email
            </span>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M5 19h14V7H5v12z" />
              </svg>
            </div>
          </a>
        </div>

        {/* MAIN BUTTON */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#075a01] to-[#054501] shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isExpanded ? (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}