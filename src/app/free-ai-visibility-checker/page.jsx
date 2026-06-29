import FreeAIVisibilityClient from "./client";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Free AI Recommendation Engine | Is Your Business Recommended by AI? | Fancy Digitals",
  description: "Check your free AI Recommendation Score in 30 seconds. See if ChatGPT, Gemini, Claude and Perplexity recommend your business and exactly how to fix it.",
  keywords: [
    "AI visibility checker",
    "free AI SEO tool",
    "ChatGPT SEO checker",
    "AI search ranking",
    "Gemini visibility",
    "Perplexity SEO",
    "AI website analyzer",
    "AI search optimization",
    "GEO checker",
    "generative engine optimization",
    "AI recommendation checker",
    "website AI score",
    "schema checker",
    "structured data checker",
    "AI-friendly website",
    "AI SEO audit",
    "free SEO analyzer",
    "AI search visibility",
    "how to rank in ChatGPT",
    "how to appear in AI search",
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-visibility-checker` },
  openGraph: {
    title: "Free AI Visibility Checker — How Do AI Assistants See Your Site?",
    description:
      "Get your free AI visibility score in 30 seconds. See exactly what ChatGPT, Gemini, and Perplexity think of your website.",
    url: `${BASE_URL}/free-ai-visibility-checker`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Free AI Visibility Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Visibility Checker",
    description: "See how ChatGPT, Gemini, and Perplexity rank your website. Free, no signup needed.",
  },
};

export default function FreeAIVisibilityCheckerPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Visibility Checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Free tool to analyze how AI assistants like ChatGPT, Gemini, Claude, and Perplexity rank your website. Get a visibility score and prioritized improvement plan.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
      url: BASE_URL,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI visibility?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI visibility is how likely AI assistants like ChatGPT, Gemini, Claude, and Perplexity are to recommend or cite your website when users ask them questions. It depends on signals like schema markup, content quality, entity clarity, and Knowledge Graph presence.",
        },
      },
      {
        "@type": "Question",
        name: "Is the AI Visibility Checker really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You get 1 free scan per day with no signup required. Sign up free to get 3 scans per day, or upgrade to Pro for unlimited scans and a full improvement plan.",
        },
      },
      {
        "@type": "Question",
        name: "How does the AI Visibility Checker work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We analyze your website across 10 signals that AI assistants use to evaluate businesses: technical SEO, structured data, meta tags, content quality, page speed, mobile experience, Knowledge Graph presence, entity clarity, AI readability, and trust signals. You get an overall AI Visibility Score (0-100) plus a prioritized improvement plan.",
        },
      },
      {
        "@type": "Question",
        name: "Why do I need an AI visibility score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Modern users increasingly ask AI assistants for recommendations instead of using traditional search. If your business isn't optimized for AI visibility, you're invisible to a growing share of potential customers. The AI Visibility Score tells you where you stand and how to improve.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between AI visibility and SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional SEO targets Google's blue-link search results. AI visibility (sometimes called Generative Engine Optimization or GEO) targets AI assistants that synthesize answers instead of listing links. AI visibility includes SEO basics but also requires structured data, entity clarity, Knowledge Graph presence, and AI-readable content patterns.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Free AI Visibility Checker", item: `${BASE_URL}/free-ai-visibility-checker` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FreeAIVisibilityClient />
    </>
  );
}