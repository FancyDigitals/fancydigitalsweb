import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";


/* =====================================================
   METADATA
===================================================== */

export const metadata = {
  title: "Sibgahtullah Foundation | Portfolio",
  description:
    "Case study of Sibgahtullah Foundation — an Islamic-Western foundation using modern media, animation, and digital storytelling to inspire impact, growth, and positive change.",
};

/* =====================================================
   PAGE
===================================================== */

export default function SibgahtullahFoundationCaseStudy() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-[#075a01]/10 blur-[160px]" />
        <div className="absolute top-32 -right-48 h-[520px] w-[520px] rounded-full bg-[#1e3a8a]/10 blur-[180px]" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio • Case Study
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Sibgahtullah Foundation
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          A faith-driven foundation blending Islamic values with modern Western
          outreach — powered by animation, digital storytelling, and impactful
          media.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 shadow-[0_24px_70px_rgba(0,0,0,0.1)]">
          <div
            className="h-[420px] bg-cover bg-center md:h-[520px]"
            style={{
              backgroundImage:
                "url(/portfolio/sibgahtullah/logo.jpg)",
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
              Sibgahtullah Foundation operates at the intersection of Islamic
              principles and contemporary global engagement. Led by Sheikh
              Abdul Wajuud Adeleke (Al-Wajuudy), the foundation focuses on
              education, moral development, outreach, and positive social
              influence.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
              Fancy Digitals was engaged to translate the foundation’s message
              into modern visual formats — using animation and faceless video
              content to reach wider audiences, especially across digital and
              social platforms.
            </p>
          </div>

          <aside className="rounded-3xl border border-black/10 bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-900">
              Project snapshot
            </p>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Organization</span>
                <span className="font-semibold text-gray-900">
                  Non-Profit Foundation
                </span>
              </li>
              <li className="flex justify-between">
                <span>Leadership</span>
                <span className="font-semibold text-gray-900">
                  Sheikh Abdul Wajuud Adeleke
                </span>
              </li>
              <li className="flex justify-between">
                <span>Focus</span>
                <span className="font-semibold text-gray-900">
                  Media & Outreach
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
            "Communicate Islamic teachings in a modern, accessible format",
            "Attract new audiences through faceless animated content",
            "Strengthen global digital presence",
            "Support outreach, education, and community growth",
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
  <h2 className="text-2xl font-semibold">Media & visual direction</h2>

  <Gallery />
</section>


      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div
          className="rounded-3xl p-12 text-white shadow-[0_26px_80px_rgba(0,0,0,0.18)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,90,1,1) 0%, rgba(7,90,1,0.95) 55%, rgba(30,58,138,0.35) 100%)",
          }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Looking to communicate purpose with impact?
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-white/90">
            Fancy Digitals helps foundations and organizations tell meaningful
            stories through animation, video, and digital media.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#075a01]"
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
