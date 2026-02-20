import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedTool from "@/components/FeaturedTool";
import PortfolioPreview from "@/components/PortfolioPreview";
import ToolsPreview from "@/components/ToolsPreview";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";

import { homePage } from "@/content/pages/home";

export const metadata = {
  title:
    "Web Design & SEO Agency in Nigeria | Fancy Digitals",
  description:
    "Fancy Digitals delivers professional web design, SEO, branding and digital marketing services worldwide with strong expertise in Nigeria.",
};

export default function HomePage() {
  const heroSlides = homePage.hero.slides;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#075a01] opacity-[0.18] blur-[160px]" />
        <div className="absolute top-40 -right-32 h-[460px] w-[460px] rounded-full bg-[#ff914d] opacity-[0.16] blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#075a01] opacity-[0.12] blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <Hero slides={heroSlides} />

      <section className="relative" id="services">
        <Services
          title={homePage.servicesPreview.title}
          subtitle={homePage.servicesPreview.subtitle}
          items={homePage.servicesPreview.items}
        />
      </section>

      {homePage.featuredTool.enabled && (
        <section className="relative">
          <FeaturedTool slug={homePage.featuredTool.toolSlug} />
        </section>
      )}

      <section className="relative" id="portfolio">
        <PortfolioPreview
          title={homePage.portfolioPreview.title}
          maxItems={homePage.portfolioPreview.maxItems}
        />
      </section>

      <section className="relative" id="tools">
        <ToolsPreview
          title={homePage.toolsPreview.title}
          maxItems={homePage.toolsPreview.maxItems}
        />
      </section>

      <section className="relative">
        <FinalCTA
          title={homePage.finalCTA.title}
          description={homePage.finalCTA.description}
          primaryAction={homePage.finalCTA.primaryAction}
          secondaryAction={homePage.finalCTA.secondaryAction}
        />
      </section>

      <section className="relative" id="contact">
        <ContactSection
          title={homePage.contactSection.title}
          description={homePage.contactSection.description}
          trustNote={homePage.contactSection.trustNote}
        />
      </section>
    </main>
  );
}