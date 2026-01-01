"use client";

import { useEffect, useState } from "react";

export default function GalleryLightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    function handleClick(e) {
      const el = e.target;

      if (
        el &&
        el.style &&
        el.style.backgroundImage &&
        el.classList.contains("bg-cover")
      ) {
        const match = el.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (match?.[1]) {
          setSrc(match[1]);
          setOpen(true);
        }
      }
    }

    function handleKey(e) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function close() {
    setOpen(false);
    setSrc(null);
  }

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={close}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black text-xl font-semibold shadow-lg"
        >
          ×
        </button>

        <img
          src={src}
          alt="Gallery preview"
          className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        />
      </div>
    </div>
  );
}
