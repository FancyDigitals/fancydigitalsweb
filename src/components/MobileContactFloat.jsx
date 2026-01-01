"use client";

export default function MobileContactFloat() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp */}
      <a
        href="https://wa.me/2340000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#075a01] text-white shadow-lg transition hover:opacity-90"
      >
        {/* WhatsApp icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
        >
          <path
            d="M20.5 11.8A8.7 8.7 0 1 1 11.8 3.1a8.7 8.7 0 0 1 8.7 8.7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8.5 9.5c.3-.3.6-.3.9 0l.9.9c.3.3.3.6 0 .9l-.3.3c.4.8 1 1.4 1.8 1.8l.3-.3c.3-.3.6-.3.9 0l.9.9c.3.3.3.6 0 .9l-.3.3c-.3.3-.8.4-1.2.3-2-.6-3.6-2.2-4.2-4.2-.1-.4 0-.9.3-1.2l.3-.3Z"
            fill="currentColor"
          />
        </svg>
      </a>

      {/* Call */}
      <a
        href="tel:+2340000000000"
        aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white text-[#075a01] shadow-lg transition hover:bg-gray-50"
      >
        {/* Phone icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
        >
          <path
            d="M4 6c0 8 6 14 14 14l2-2-3-3-2 1c-2-1-4-3-5-5l1-2-3-3-2 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
