import VideoAdGeneratorClient from "./client";
import Schema from "@/components/Schema";
import {
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Free AI Video Ad Generator — Create Ads in 60 Seconds | Fancy Digitals",
  description:
    "Generate professional video ads with AI in 60 seconds. 5 tones, animated text, stock footage, music. Free to try. No signup, no design skills needed.",
  keywords: [
    "AI video ad generator",
    "free video ad maker",
    "AI ad creator",
    "video ad generator free",
    "TikTok ad maker",
    "Instagram Reels ad generator",
    "YouTube Shorts ad maker",
    "AI marketing video",
    "animated video ad",
    "AI video ads free",
    "social media ad generator",
    "video advertising tool",
    "ad video maker no signup",
    "AI-powered ad creator",
    "free ad video generator online",
  ],
  alternates: { canonical: `${BASE_URL}/free-ai-video-ad-generator` },
  openGraph: {
    title: "Free AI Video Ad Generator — Ads in 60 Seconds",
    description: "AI writes your ad script, picks stock footage, animates the text. Free video ads for social media.",
    url: `${BASE_URL}/free-ai-video-ad-generator`,
    type: "website",
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Video Ad Generator",
    description: "Create professional video ads with AI in 60 seconds. Free.",
  },
};

const FAQS = [
  {
    question: "Is the AI Video Ad Generator really free?",
    answer:
      "Yes. You can generate video ads for free with a watermark. Upgrade to Pro to remove watermarks, unlock 1080p export, all 5 premium templates, and unlimited generations.",
  },
  {
    question: "How does the AI Video Ad Generator work?",
    answer:
      "You describe your business in a few sentences. AI writes an ad script broken into scenes, fetches matching stock footage from Pexels and Pixabay, then animates text overlays with music. The whole video renders in about 60 seconds.",
  },
  {
    question: "What kind of ads can I create?",
    answer:
      "Short-form video ads (15, 30, or 60 seconds) perfect for TikTok, Instagram Reels, YouTube Shorts, Facebook, and LinkedIn. Choose from 5 tones: Bold, Luxury, Tech/SaaS, Playful, and Energetic.",
  },
  {
    question: "Can I use my own logo and brand colors?",
    answer:
      "Yes. Upload your logo and pick your brand color. The AI adapts the ad to match your brand identity across every scene.",
  },
  {
    question: "What video quality do I get?",
    answer:
      "Free users get 720p MP4 export with a small watermark. Pro users get 1080p Full HD export with no watermark, plus 4K export coming soon.",
  },
  {
    question: "Do I need design or video editing skills?",
    answer:
      "None. Just describe your business, pick a tone, and click generate. AI handles the copywriting, footage selection, animations, and music sync automatically.",
  },
  {
    question: "Can I edit the AI-generated ad?",
    answer:
      "Currently you can regenerate with different inputs. Full inline editing (change text, swap footage, adjust timing) is coming in Pro V2.",
  },
];

export default function FreeAIVideoAdGeneratorPage() {
  const softwareSchema = softwareApplicationSchema({
    name: "Fancy Digitals AI Video Ad Generator",
    description:
      "Free AI video ad generator that creates professional social media video ads in 60 seconds. Includes AI script writing, stock footage, animated text overlays, music sync, and 5 premium tones for TikTok, Instagram Reels, YouTube Shorts, and more.",
    slug: "free-ai-video-ad-generator",
    category: "MultimediaApplication",
    price: "0",
  });

  const faqSchemaData = faqSchema(FAQS);

  const breadcrumbData = breadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Free AI Tools", url: `${BASE_URL}/tools` },
    { name: "AI Video Ad Generator", url: `${BASE_URL}/free-ai-video-ad-generator` },
  ]);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create an AI Video Ad in 60 Seconds",
    description:
      "Step-by-step guide to generating professional social media video ads using AI.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Describe your business",
        text: "Enter your business name, what you do, target audience, and campaign goal.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Pick your style",
        text: "Choose from 5 premium tones: Bold, Luxury, Tech/SaaS, Playful, or Energetic. Pick length (15/30/60 seconds).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "AI generates your ad",
        text: "AI writes the script, fetches stock footage, animates text overlays, and syncs music. Download as MP4.",
      },
    ],
  };

  return (
    <>
      <Schema data={softwareSchema} />
      <Schema data={faqSchemaData} />
      <Schema data={howToSchema} />
      <Schema data={breadcrumbData} />
      <VideoAdGeneratorClient />
    </>
  );
}