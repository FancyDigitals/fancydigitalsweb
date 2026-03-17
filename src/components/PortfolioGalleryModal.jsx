"use client";

import { useState, useEffect } from "react";

export default function PortfolioGalleryModal({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeItem = gallery[activeIndex];

  const closeModal = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % gallery.length);

  const prev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, i) => {
          const isVideo =
            item.url.includes(".mp4") ||
            item.url.includes("youtube") ||
            item.url.includes("vimeo");

          return (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#559659]/50 transition"
            >
              <div className="aspect-video overflow-hidden">
                {isVideo ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.url}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-white text-sm">
                  {isVideo ? "Play Video" : "View Image"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 md:left-10 text-white text-3xl"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 md:right-10 text-white text-3xl"
          >
            ›
          </button>

          {/* CONTENT */}
          <div className="max-w-5xl w-full">
            {activeItem?.url.includes(".mp4") ? (
              <video
                src={activeItem.url}
                controls
                autoPlay
                className="w-full max-h-[80vh] rounded-xl"
              />
            ) : (
              <img
                src={activeItem?.url}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}