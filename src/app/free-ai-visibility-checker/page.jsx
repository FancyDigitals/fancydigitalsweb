import FreeAIVisibilityClient from "./client";
import Schema from "@/components/Schema";
import {
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

const BASE_URL = "https://fancydigitals.com.ng";

const FAQS = [
  {
    question: "What is AI visibility?",
    answer:
      "AI visibility is how likely AI assistants like ChatGPT, Gemini, Claude, and Perplexity are to recommend or cite your website when users ask them questions. It depends on signals like schema markup, content quality, entity clarity, and Knowledge Graph presence.",
  },
  {
    question: "Is the AI Visibility Checker really free?",
    answer:
      "Yes. You get 1 free scan per day with no signup required. Sign up free to get 3 scans per day, or upgrade to Pro for unlimited scans and a full improvement plan.",
  },
  {
    question: "How does the AI Visibility Checker work?",
    answer:
      "We analyze your website across 10 signals that AI assistants use to evaluate businesses: technical SEO, structured data, meta tags, content quality, page speed, mobile experience, Knowledge Graph presence, entity clarity, AI readability, and trust signals. You get an overall AI Visibility Score (0-100) plus a prioritized improvement plan.",
  },
  {
    question: "Why do I need an AI visibility score?",
    answer:
      "Modern users increasingly ask AI assistants for recommendations instead of using traditional search. If your business isn't optimized for AI visibility, you're invisible to a growing share of potential customers. The AI Visibility Score tells you where you stand and how to improve.",
  },
  {
    question: "What's the difference between AI visibility and SEO?",
    answer:
      "Traditional SEO targets Google's blue-link search results. AI visibility (sometimes called Generative Engine Optimization or GEO) targets AI assistants that synthesize answers instead of listing links. AI visibility includes SEO basics but also requires structured data, entity clarity, Knowledge Graph presence, and AI-readable content patterns.",
  },
  {
    question: "Which AI assistants does the scanner check for?",
    answer:
      "The scanner evaluates your site against the signals used by all major AI assistants including ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic), Perplexity, Microsoft Copilot, and Google's AI Overviews. The 10 signals we measure are the universal factors all these systems use to evaluate brand authority.",
  },
  {
    question: "How long does the scan take?",
    answer:
      "Scans complete in approximately 30 seconds. We crawl your site's key pages, analyze structured data, evaluate content patterns, check Core Web Vitals, and generate your full AI Visibility Score with actionable recommendations.",
  },
];

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
  // Schemas — using centralized library
  const softwareSchema = softwareApplicationSchema({
    name: "Fancy Digitals AI Recommendation Engine",
    description:
      "Free AI Visibility Checker that analyzes how AI assistants like ChatGPT, Gemini, Claude, and Perplexity rank and recommend your website. Get your AI Visibility Score (0-100) across 10 signals plus a prioritized improvement plan in 30 seconds. No signup required.",
    slug: "free-ai-visibility-checker",
    category: "BusinessApplication",
    price: "0",
  });

  const faqSchemaData = faqSchema(FAQS);

  const breadcrumbData = breadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Free AI Tools", url: `${BASE_URL}/tools` },
    { name: "AI Visibility Checker", url: `${BASE_URL}/free-ai-visibility-checker` },
  ]);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Your Website's AI Visibility Score in 30 Seconds",
    description:
      "Step-by-step guide to scanning your website for AI visibility across ChatGPT, Gemini, Claude, and Perplexity.",
    totalTime: "PT30S",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your website URL",
        text: "Paste any public website URL into the scanner. No signup required for your first scan.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "AI analyzes 10 critical signals",
        text: "Our system evaluates structured data, content quality, technical SEO, entity clarity, Knowledge Graph presence, and 5 other signals AI assistants use.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Get your AI Visibility Score",
        text: "Receive your score out of 100 plus a prioritized list of improvements to climb the AI ranking ladder.",
      },
    ],
  };

  return (
    <>
      <Schema data={softwareSchema} />
      <Schema data={faqSchemaData} />
      <Schema data={howToSchema} />
      <Schema data={breadcrumbData} />
      <FreeAIVisibilityClient />
    </>
  );
}