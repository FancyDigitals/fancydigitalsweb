import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* =====================================================
   PORTFOLIO — MODERN, PREMIUM, STATIC
===================================================== */

const BRAND = {
  green: "#075a01",
  gold: "#ff914d",
};

const projects = [
  {
  slug: "feast-basket-ecommerce",
  title: "Feast Basket E-commerce Website",
  category: "Web Development",
  desc:
    "A grocery-focused e-commerce platform designed for trust, speed, and seamless ordering.",
  image: "/portfolio/feast-basket/cover.jpg",
},
  {
    slug: "todma-brand-identity",
    title: "TODMA Brand Identity",
    category: "Graphics Design",
    desc: "A premium visual identity system for long-term brand trust.",
    image: "/portfolio/todma/cover.jpg",
  },
  {
  slug: "sibgahtullah",
  title: "Sibgahtullah Foundation",
  category: "Media & Outreach",
  desc: "A faith-driven foundation amplified through animation, faceless videos, and modern digital storytelling.",
  image: "/portfolio/sibgahtullah/logo.jpg",
},

  {
  slug: "tejurolex",
  title: "Tejurolex Global Consult",
  category: "Website & SEO",
  desc: "A professional website and SEO system built to drive visibility, trust, and qualified inquiries for a leading travel and language agency.",
  image: "/portfolio/tejurolex/logo.jpg",
},

  {
    slug: "marketing-website",
    title: "Marketing Website",
    category: "Web Design",
    desc: "Professional marketing site built for credibility and clarity.",
    image: "/portfolio/marketing.png",
  },
  {
    slug: "email-campaign-system",
    title: "Email Campaign System",
    category: "Email Marketing",
    desc: "Structured email flows focused on retention and engagement.",
    image: "/portfolio/email.png",
  },
  {
    slug: "seo-optimization-project",
    title: "SEO Optimization Project",
    category: "SEO",
    desc: "Technical and on-page SEO improvements for organic growth.",
    image: "/portfolio/seo.png",
  },
];

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Header />

      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: BRAND.green }}
        />
        <div
          className="absolute top-32 -right-40 h-[520px] w-[520px] rounded-full blur-[140px] opacity-15"
          style={{ backgroundColor: BRAND.gold }}
        />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-24 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          Portfolio
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
          Selected work built with{" "}
          <span className="text-[#075a01]">strategy</span>,{" "}
          <span className="text-[#075a01]">clarity</span>, and{" "}
          <span className="text-[#075a01]">execution</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          A curated selection of projects across branding, web, marketing, and
          growth systems — designed to look premium and perform reliably.
        </p>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
            >
              {/* Image */}
              <div className="relative h-[240px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.08]"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Accent bar */}
                <div className="absolute bottom-0 left-0 h-[3px] w-full scale-x-0 bg-[#075a01] transition-transform duration-500 group-hover:scale-x-100 origin-left" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {project.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {project.desc}
                </p>

                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#075a01]">
                  View case study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div
          className="relative overflow-hidden rounded-3xl p-12 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(7,90,1,1) 0%, rgba(7,90,1,0.95) 50%, rgba(255,145,77,0.25) 100%)",
          }}
        >
          <h2 className="max-w-2xl text-2xl font-semibold md:text-3xl">
            Want to build something like this?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90">
            If your brand needs clarity, structure, and a premium digital
            presence, let’s talk about how we can help.
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#075a01]"
            >
              Start a project
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
