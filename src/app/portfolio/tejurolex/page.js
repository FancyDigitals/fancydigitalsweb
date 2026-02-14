import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Tejurolex Global Consult | Portfolio",
  description:
    "Case study of Tejurolex Global Consult — a leading travel agency and language school in Lagos, Nigeria, delivering structured pathways for global travel, education, and professional growth.",
};

/* =====================================================
   PAGE
===================================================== */

export default function TejurolexGlobalConsultCaseStudy() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-[#1e3a8a]/10 blur-[160px]" />
        <div className="absolute top-32 -right-48 h-[520px] w-[520px] rounded-full bg-[#075a01]/10 blur-[180px]" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio • Case Study
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Tejurolex Global Consult
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          A prominent Lagos-based travel agency and language school providing
          structured international pathways for education, migration, and
          professional advancement.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
          <div
            className="h-[420px] bg-cover bg-center md:h-[520px]"
            style={{
              backgroundImage:
                "url(/portfolio/tejurolex/cover.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="text-2xl font-semibold">Project overview</h2>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-600">
  Tejurolex Global Consult is a well-established travel agency and language
  training institution based in Lagos, Nigeria. Founded by Mr. Olalekan
  Arowosaye, the organization provides structured services for international
  travel, study abroad, visa processing, and language proficiency programs.
</p>

<p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
  Fancy Digitals was responsible for the design, development, and ongoing SEO
  strategy of the Tejurolex Global Consult website ensuring strong online
  visibility, clear service presentation, and consistent lead generation
  through search.
</p>

          </div>

          <aside className="rounded-3xl border border-black/10 bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-900">
              Project snapshot
            </p>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
  <li className="flex justify-between">
    <span>Industry</span>
    <span className="font-semibold text-gray-900">
      Travel & Education
    </span>
  </li>
  <li className="flex justify-between">
    <span>Founder</span>
    <span className="font-semibold text-gray-900">
      Mr. Olalekan Arowosaye
    </span>
  </li>
  <li className="flex justify-between">
    <span>Scope</span>
    <span className="font-semibold text-gray-900">
      Website & SEO
    </span>
  </li>
  <li className="flex justify-between">
    <span>Status</span>
    <span className="font-semibold text-gray-900">
      Ongoing
    </span>
  </li>
</ul>

          </aside>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <h2 className="text-2xl font-semibold">Project objectives</h2>

        <ul className="mt-8 max-w-3xl space-y-3 text-sm text-gray-600">
          {[
  "Design a professional, trust-driven website",
  "Improve search engine visibility for travel and language services",
  "Increase qualified inquiries through SEO",
  "Support long-term digital growth and authority",
].map((item) => (
  <li key={item} className="flex gap-3">
    <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1e3a8a]" />
    <span>{item}</span>
  </li>
))}

        </ul>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <h2 className="text-2xl font-semibold">Website & SEO visuals</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "/portfolio/tejurolex/visual-1.jpg",
            "/portfolio/tejurolex/visual-2.jpg",
            "/portfolio/tejurolex/visual-3.jpg",
          ].map((img) => (
            <div
              key={img}
              className="relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
            >
              <div
                className="h-[220px] bg-cover bg-center transition-transform duration-700 hover:scale-[1.05]"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div
          className="rounded-3xl p-12 text-white shadow-[0_26px_80px_rgba(0,0,0,0.18)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,58,138,1) 0%, rgba(30,58,138,0.95) 55%, rgba(7,90,1,0.35) 100%)",
          }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Need a trusted travel or education partner?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-white/90">
            Fancy Digitals helps agencies and institutions present their services
            with clarity, credibility, and global appeal.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1e3a8a]"
            >
              Work with us
            </a>

            <a
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white"
            >
              Back to portfolio
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
