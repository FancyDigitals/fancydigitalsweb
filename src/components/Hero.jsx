/* =====================================================
   HERO — CLEAN SLIDER, LUXURY FRAME, STATIC, SERVER SAFE
===================================================== */

export default function Hero({
  slides = [
    "/hero/slide-1.jpg",
    "/hero/slide-2.jpg",
    "/hero/slide-3.jpg",
  ],
}) {
  if (!slides.length) return null;

  return (
    <section className="relative isolate bg-white">
      {/* Ambient brand glow (background only, not on slides) */}
      <div className="pointer-events-none absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-[#075a01]/25 blur-[180px]" />
      <div className="pointer-events-none absolute top-40 -right-48 h-[560px] w-[560px] rounded-full bg-[#ff914d]/30 blur-[200px]" />

      <div className="mx-auto max-w-[1440px] px-4 pt-14 sm:px-6 md:px-10">
        {/* Slider frame */}
        <div
          className="
            relative overflow-hidden rounded-[30px]
            bg-[#f2f3f2]
            shadow-[0_32px_90px_rgba(0,0,0,0.14)]
            aspect-[16/10] sm:aspect-[16/9] md:aspect-[1920/900]
          "
        >
          {/* Subtle grid texture */}
          <div
            className="
              pointer-events-none absolute inset-0 z-10 opacity-[0.04]
              [background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_1px)]
              [background-size:56px_56px]
            "
          />

          {/* Slides */}
          {slides.map((src, index) => (
            <figure
              key={src}
              className="hero-slide absolute inset-0"
              style={{ animationDelay: `${index * 7}s` }}
            >
              <img
                src={src}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full w-full object-contain"
              />
            </figure>
          ))}
        </div>

        {/* Bottom actions (OUTSIDE slider) */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/contact"
            className="
              inline-flex items-center justify-center
              rounded-xl bg-[#075a01]
              px-8 py-4 text-sm font-semibold text-white
              shadow-[0_16px_40px_rgba(7,90,1,0.35)]
              transition hover:opacity-90
            "
          >
            Start a Project
          </a>

          <a
            href="/portfolio"
            className="
              inline-flex items-center justify-center
              rounded-xl border border-black/10 bg-white
              px-8 py-4 text-sm font-semibold text-gray-900
              transition hover:bg-gray-50
            "
          >
            View Portfolio
          </a>
        </div>
      </div>

      {/* CSS-only animation */}
      <style>{`
        .hero-slide {
          opacity: 0;
          animation: heroFade 21s infinite ease-in-out;
        }

        @keyframes heroFade {
          0% { opacity: 0; }
          8% { opacity: 1; }
          32% { opacity: 1; }
          40% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
