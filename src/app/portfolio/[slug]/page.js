import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolio } from "@/content/portfolio/index";
import { portfolioDetails } from "@/content/portfolio/details";

/* ===============================
   BRAND TOKENS
================================ */

const BRAND = {
  green: "#075a01",
  gold: "#ff914d",
};

/* ===============================
   STATIC PARAMS
================================ */

export function generateStaticParams() {
  const list = Array.isArray(portfolio) ? portfolio : [];
  return list.filter((p) => p && p.published).map((p) => ({ slug: p.slug }));
}

/* ===============================
   METADATA
================================ */

export function generateMetadata({ params }) {
  const slug = params?.slug;
  const base = Array.isArray(portfolio) ? portfolio.find((p) => p.slug === slug) : null;
  const detail = portfolioDetails?.[slug];

  if (!base) {
    return {
      title: "Project not found | Fancy Digitals",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: detail?.seo?.title || `${base.title} | Fancy Digitals Portfolio`,
    description: detail?.seo?.description || base.description || "",
  };
}

/* ===============================
   PAGE
================================ */

export default function PortfolioDetailPage({ params }) {
  const slug = params?.slug;

  const base = Array.isArray(portfolio) ? portfolio.find((p) => p.slug === slug) : null;
  if (!base) notFound();

  const detail = portfolioDetails?.[slug];

  const headline = detail?.hero?.headline || base.title;
  const tagline = detail?.hero?.tagline || base.description;
  const overview = detail?.overview || base.description;

  const gallery = Array.isArray(detail?.gallery) && detail.gallery.length
    ? detail.gallery
    : [base.coverImage];

  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: BRAND.green }}
        />
        <div
          className="absolute top-32 -right-40 h-[520px] w-[520px] rounded-full blur-[160px] opacity-15"
          style={{ backgroundColor: BRAND.gold }}
        />
      </div>

      <section className="mx-auto max-w-6xl px-5 pt-32 pb-18 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio • {base.category}
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          {headline}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-600">
          {tagline}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-18 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_22px_60px_rgba(0,0,0,0.10)]">
          <div
            className="h-[380px] bg-cover bg-center md:h-[460px]"
            style={{ backgroundImage: `url(${base.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-22 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <h2 className="text-2xl font-semibold">Project overview</h2>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-600">
              {overview}
            </p>

            {Array.isArray(detail?.objectives) && detail.objectives.length ? (
              <>
                <h3 className="mt-10 text-lg font-semibold">Objectives</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  {detail.objectives.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-[#075a01]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {Array.isArray(detail?.approach) && detail.approach.length ? (
              <>
                <h3 className="mt-10 text-lg font-semibold">Approach</h3>
                <div className="mt-4 space-y-6">
                  {detail.approach.map((a) => (
                    <div key={a.title}>
                      <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {a.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          <aside className="rounded-3xl border border-black/10 bg-gray-50 p-7">
            <p className="text-sm font-semibold text-gray-900">Project details</p>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex justify-between gap-6">
                <span>Category</span>
                <span className="font-semibold text-gray-900">{base.category}</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Status</span>
                <span className="font-semibold text-gray-900">Completed</span>
              </li>
              <li className="flex justify-between gap-6">
                <span>Type</span>
                <span className="font-semibold text-gray-900">Client work</span>
              </li>
            </ul>

            {Array.isArray(detail?.deliverables) && detail.deliverables.length ? (
              <>
                <p className="mt-8 text-sm font-semibold text-gray-900">Deliverables</p>
                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                  {detail.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span className="mt-[6px] h-2 w-2 rounded-full bg-[#ff914d]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <h2 className="text-2xl font-semibold">Project visuals</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((img) => (
            <div
              key={img}
              className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.08)]"
            >
              <div
                className="h-[240px] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div
          className="rounded-3xl p-12 text-white shadow-[0_24px_70px_rgba(0,0,0,0.16)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,90,1,1) 0%, rgba(7,90,1,0.95) 55%, rgba(255,145,77,0.25) 100%)",
          }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Want something like this for your brand?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-white/90">
            We design and build premium digital experiences with clarity, structure, and conversion in mind.
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
