"use client";

export default function TrustedLogos() {
  const logos = [
    { src: "/logos/al-amanah.jpg", name: "Al-Amanah" },
    { src: "/logos/feastbasket.jpg", name: "FeastBasket" },
    { src: "/logos/marinetech.jpg", name: "MarineTech" },
    { src: "/logos/sibgahtullah.jpg", name: "Sibgahtullah" },
    { src: "/logos/trade.jpg", name: "Trade" },
    { src: "/logos/tshirt.jpg", name: "TShirt" },
  ];

  const doubled = [...logos, ...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#075a01] to-[#0a8f01] py-12">

      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <div className="relative mb-8 px-4 text-center sm:mb-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
          Collaborating with{" "}
          <span className="text-yellow-300">Leading Organizations</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
          Proud to work alongside respected institutions and communities
        </p>
      </div>

      {/* Row 1 — scroll left */}
      <div className="relative mb-4">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#075a01] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#0a8f01] to-transparent sm:w-24" />
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-6 sm:gap-8"
            style={{ animation: "scrollLeft 30s linear infinite" }}
          >
            {doubled.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-7 w-auto max-w-[100px] object-contain opacity-90 hover:opacity-100 sm:h-9 md:h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#075a01] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#0a8f01] to-transparent sm:w-24" />
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-6 sm:gap-8"
            style={{ animation: "scrollRight 30s linear infinite" }}
          >
            {[...doubled].reverse().map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/40">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-7 w-auto max-w-[100px] object-contain opacity-90 hover:opacity-100 sm:h-9 md:h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .flex:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}