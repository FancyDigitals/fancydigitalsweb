"use client";

import { useState, useEffect } from "react";

export default function GalleryWithModal({ gallery }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeItem = gallery[activeIndex];

  const closeModal = () => setActiveIndex(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % gallery.length);

  const prev = () =>
    setActiveIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );

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
        {gallery.map((img, i) => {
          const isLarge = i === 0;

          const isVideo =
            img.url.includes(".mp4") ||
            img.url.includes("youtube") ||
            img.url.includes("vimeo");

          return (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#559659]/50 transition-all duration-500 cursor-pointer ${
                isLarge
                  ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }`}
            >
              <div
                className={`${
                  isLarge ? "aspect-[16/10]" : "aspect-video"
                } overflow-hidden`}
              >
                {isVideo ? (
                  <video
                    src={img.url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={img.url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {isVideo ? "Video" : "Screenshot"} {i + 1}
                    </p>
                    <p className="text-white/60 text-sm">
                      Click to expand
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#559659] flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">

          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ×
          </button>

          <button
            onClick={prev}
            className="absolute left-4 md:left-10 text-white text-3xl"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-4 md:right-10 text-white text-3xl"
          >
            ›
          </button>

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