import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Services | Fancy Digitals",
  description:
    "A structured overview of the services offered by Fancy Digitals, outlining scope, focus, and delivery philosophy.",
};

/* =====================================================
   SERVICES DATA — AUTHORITATIVE
===================================================== */

const SERVICES = [
  {
    title: "Website Design & Development",
    focus: "Structure, performance, and long-term clarity",
    description:
      "We design and build modern websites that feel premium, load fast, and remain easy to extend over time. Every layout is intentional, conversion-aware, and engineered with future growth in mind.",
    includes: [
      "Marketing and business websites",
      "E-commerce storefronts",
      "Landing pages",
      "Responsive frontend builds",
      "Performance and structural optimization",
    ],
  },
  {
    title: "UI / UX Design",
    focus: "Usability, hierarchy, and user confidence",
    description:
      "Our UI / UX work focuses on clarity and flow. Interfaces are designed to reduce friction, guide attention, and support confident decision-making rather than visual noise.",
    includes: [
      "User interface design",
      "User experience strategy",
      "Wireframes and layout systems",
      "Design systems and components",
      "Mobile-first interaction design",
    ],
  },
  {
    title: "Brand Identity & Visual Systems",
    focus: "Consistency, trust, and recognition",
    description:
      "We build brand systems that look intentional and remain consistent across all touchpoints. The goal is long-term credibility, not short-lived design trends.",
    includes: [
      "Logo design and refinement",
      "Color and typography systems",
      "Brand usage guidelines",
      "Visual consistency rules",
      "Marketing and social templates",
    ],
  },
  {
    title: "Email Marketing Systems",
    focus: "Retention, structure, and engagement",
    description:
      "We design structured email systems that support customer journeys, improve retention, and maintain brand clarity across every message.",
    includes: [
      "Email template design",
      "Campaign structure",
      "Lifecycle and nurture flows",
      "Copy and design alignment",
      "Brand-consistent layouts",
    ],
  },
  {
    title: "SEO & Website Foundations",
    focus: "Clean structure and sustainable growth",
    description:
      "Our SEO work focuses on building clean technical foundations that support sustainable organic growth, rather than short-term tactics.",
    includes: [
      "Technical SEO audits",
      "On-page optimization",
      "Site structure improvements",
      "Performance and crawlability fixes",
      "Content hierarchy guidance",
    ],
  },
];

/* =====================================================
   PAGE
===================================================== */

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#075a01]/10 blur-[160px]" />
        <div className="absolute top-32 -right-40 h-[520px] w-[520px] rounded-full bg-[#ff914d]/10 blur-[180px]" />
      </div>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 pt-36 pb-24 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Services
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          What we do, and how we do it
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          This page documents the core services offered by Fancy Digitals.
          Each service is defined by scope, focus, and delivery principles,
          and represents the final reference used across the website.
        </p>
      </section>

      {/* SERVICES LIST */}
      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-10">
        <div className="space-y-16">
          {SERVICES.map((service, index) => (
            <section
              key={service.title}
              aria-labelledby={`service-${index}`}
              className="
                rounded-3xl border border-black/10 bg-white
                p-10
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
            >
              {/* Header */}
              <header className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Service {String(index + 1).padStart(2, "0")}
                </p>

                <h2
                  id={`service-${index}`}
                  className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl"
                >
                  {service.title}
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#075a01]">
                  Focus: {service.focus}
                </p>
              </header>

              {/* Description */}
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600">
                {service.description}
              </p>

              {/* Includes */}
              <div className="mt-8">
                <p className="mb-4 text-sm font-semibold text-gray-900">
                  Scope includes
                </p>

                <ul className="grid gap-3 sm:grid-cols-2 text-sm text-gray-600">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-[#075a01]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
