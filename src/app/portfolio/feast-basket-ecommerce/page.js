import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Feast Basket E-commerce Website | Portfolio",
  description:
    "Case study of the Feast Basket e-commerce platform — a grocery-focused online store built for trust, speed, and seamless customer experience.",
};

/* =====================================================
   PAGE
===================================================== */

export default function FeastBasketCaseStudy() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-[#075a01]/10 blur-[160px]" />
        <div className="absolute top-32 -right-48 h-[520px] w-[520px] rounded-full bg-[#ff914d]/10 blur-[180px]" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio • Case Study
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Feast Basket E-commerce Website
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          A grocery-focused e-commerce platform designed to simplify ordering,
          build customer trust, and support scalable growth.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
          <div
            className="h-[420px] bg-cover bg-center md:h-[520px]"
            style={{
              backgroundImage: "url(/portfolio/feast-basket/cover.jpg)",
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
              Feast Basket was built to solve a practical problem: making grocery
              ordering simple, reliable, and fast for everyday users. The
              platform prioritizes clarity, product visibility, and frictionless
              checkout.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              The design balances warmth and structure, ensuring customers feel
              confident browsing products while vendors can scale operations
              efficiently.
            </p>
          </div>

          <aside className="rounded-3xl border border-black/10 bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-900">
              Project snapshot
            </p>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Category</span>
                <span className="font-semibold text-gray-900">
                  Web Development
                </span>
              </li>
              <li className="flex justify-between">
                <span>Focus</span>
                <span className="font-semibold text-gray-900">
                  E-commerce & UX
                </span>
              </li>
              <li className="flex justify-between">
                <span>Audience</span>
                <span className="font-semibold text-gray-900">
                  Consumers
                </span>
              </li>
              <li className="flex justify-between">
                <span>Status</span>
                <span className="font-semibold text-gray-900">
                  Completed
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
            "Simplify grocery discovery and ordering",
            "Build trust through clean UI and structure",
            "Ensure fast performance on mobile devices",
            "Support future feature expansion",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[#075a01]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <h2 className="text-2xl font-semibold">Platform visuals</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "/portfolio/feast-basket/screen-1.jpg",
            "/portfolio/feast-basket/screen-2.jpg",
            "/portfolio/feast-basket/screen-3.jpg",
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
              "linear-gradient(135deg, rgba(7,90,1,1) 0%, rgba(7,90,1,0.95) 55%, rgba(255,145,77,0.25) 100%)",
          }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Want a high-performing e-commerce platform?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-white/90">
            Fancy Digitals designs e-commerce systems that are clear,
            conversion-focused, and built to scale.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#075a01]"
            >
              Start a project
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
