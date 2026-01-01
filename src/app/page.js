import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedTool from "@/components/FeaturedTool";
import PortfolioPreview from "@/components/PortfolioPreview";
import ToolsPreview from "@/components/ToolsPreview";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import { homePage } from "@/content/pages/home";

/* =====================================================
   HOME PAGE — PURE STATIC
===================================================== */

export default function HomePage() {
  const heroSlides = homePage.hero.slides;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Soft ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#075a01] opacity-[0.18] blur-[160px]" />
        <div className="absolute top-40 -right-32 h-[460px] w-[460px] rounded-full bg-[#ff914d] opacity-[0.16] blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#075a01] opacity-[0.12] blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Page content */}
      <Header />

      {/* HERO */}
      <Hero slides={heroSlides} />

      {/* SERVICES PREVIEW */}
      <section className="relative" id="services">
        <Services
          title={homePage.servicesPreview.title}
          subtitle={homePage.servicesPreview.subtitle}
          items={homePage.servicesPreview.items}
        />
      </section>

      {/* FEATURED TOOL */}
      {homePage.featuredTool.enabled && (
        <section className="relative">
          <FeaturedTool slug={homePage.featuredTool.toolSlug} />
        </section>
      )}

      {/* PORTFOLIO PREVIEW */}
      <section className="relative" id="portfolio">
        <PortfolioPreview
          title={homePage.portfolioPreview.title}
          maxItems={homePage.portfolioPreview.maxItems}
        />
      </section>

      {/* TOOLS PREVIEW */}
      <section className="relative" id="tools">
        <ToolsPreview
          title={homePage.toolsPreview.title}
          maxItems={homePage.toolsPreview.maxItems}
        />
      </section>

      {/* FINAL CTA */}
      <section className="relative">
        <FinalCTA
          title={homePage.finalCTA.title}
          description={homePage.finalCTA.description}
          primaryAction={homePage.finalCTA.primaryAction}
          secondaryAction={homePage.finalCTA.secondaryAction}
        />
      </section>

      {/* CONTACT */}
      <section className="relative" id="contact">
        <ContactSection
          title={homePage.contactSection.title}
          description={homePage.contactSection.description}
          trustNote={homePage.contactSection.trustNote}
        />
      </section>

      <Footer />
    </main>
  );
}
