"use client";

import { useState } from "react";

const ITEMS = [
  {
    type: "image",
    src: "/portfolio/sibgahtullah/logo.jpg",
  },
  {
    type: "video",
    src: "/portfolio/sibgahtullah/faceless-video.mp4",
    poster: "/portfolio/sibgahtullah/video-poster.jpg",
  },
  {
    type: "image",
    src: "/portfolio/sibgahtullah-foundation/visual-3.jpg",
  },
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(item)}
            className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
          >
            {item.type === "image" ? (
              <div
                className="h-[220px] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
                style={{ backgroundImage: `url(${item.src})` }}
              />
            ) : (
              <div className="relative h-[220px] bg-black">
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black text-xl">
                    ▶
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* MODAL */}
      {active && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black text-xl font-semibold shadow-lg"
            >
              ×
            </button>

            {active.type === "image" ? (
              <img
                src={active.src}
                alt=""
                className="max-h-[90vh] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              />
            ) : (
              <video
                src={active.src}
                controls
                autoPlay
                className="max-h-[90vh] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
