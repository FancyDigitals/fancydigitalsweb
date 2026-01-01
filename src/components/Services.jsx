/* =====================================================
   SERVICES PREVIEW — STATIC, 3-COLUMN, PREMIUM
===================================================== */

export default function ServicesPreview() {
  const SERVICES = [
    {
      title: "Web Design & Development",
      desc:
        "High-performance websites built with clarity, speed, and long-term scalability in mind.",
    },
    {
      title: "Brand Identity & Design",
      desc:
        "Cohesive brand systems that communicate trust, consistency, and authority.",
    },
    {
      title: "UI / UX Design",
      desc:
        "User-centered interfaces engineered for usability, clarity, and conversion.",
    },
  ];

  return (
    <section
      aria-labelledby="services-heading"
      className="relative mx-auto max-w-7xl px-5 py-32 md:px-10"
    >
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#075a01]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -right-32 h-[380px] w-[380px] rounded-full bg-[#ff914d]/10 blur-[160px]" />

      {/* Header */}
      <header className="relative mb-20 max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Services
        </p>

        <h2
          id="services-heading"
          className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
        >
          What we do, intentionally
        </h2>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-600">
          We design and build digital systems that feel premium, remain clear,
          and scale without breaking. Each service is structured for long-term value.
        </p>
      </header>

      {/* Services grid (3 only) */}
      <ul
        role="list"
        className="relative grid gap-10 md:grid-cols-3"
      >
        {SERVICES.map((service, index) => (
          <li
            key={service.title}
            className="
              group relative flex h-full flex-col
              rounded-3xl border border-black/10 bg-white
              p-8
              shadow-[0_18px_50px_rgba(0,0,0,0.08)]
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-[0_36px_90px_rgba(0,0,0,0.15)]
            "
          >
            {/* Index */}
            <span className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xs font-semibold text-gray-700">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <h3 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">
              {service.title}
            </h3>

            {/* Description */}
            <p className="flex-1 text-sm leading-relaxed text-gray-600">
              {service.desc}
            </p>

            {/* Accent line */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-x-0 bottom-0 h-[3px]
                bg-gradient-to-r from-transparent via-[#075a01]/60 to-transparent
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100
              "
            />
          </li>
        ))}
      </ul>

      {/* See all services */}
      <div className="relative mt-20 flex justify-start">
        <a
          href="/services"
          className="
            inline-flex items-center gap-2
            rounded-xl border border-black/10 bg-white
            px-6 py-3
            text-sm font-semibold text-gray-900
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(0,0,0,0.14)]
          "
        >
          See all services
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
