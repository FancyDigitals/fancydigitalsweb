import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "AI Video Generator — Hollywood-Quality Videos in 60 Seconds | Fancy Digitals",
  description:
    "Create Hollywood-quality AI videos in 60 seconds. Natural voiceover, cinematic scenes, motion graphics, background music, and MP4 export. Free plan available.",
  keywords: [
    "ai video generator",
    "free ai video generator",
    "ai video maker",
    "text to video ai",
    "ai voiceover video",
    "ai video with music",
    "ai reels generator",
    "tiktok video generator",
    "cinematic ai video",
    "ai commercial generator",
  ].join(", "),
  alternates: {
    canonical: "https://fancydigitals.com.ng/free-ai-video-generator",
  },
  openGraph: {
    title: "AI Video Generator — Hollywood-Quality Videos in 60 Seconds",
    description:
      "Natural voiceover. Cinematic scenes. Motion graphics. Export to MP4. Free plan available.",
    url: "https://fancydigitals.com.ng/free-ai-video-generator",
    siteName: "Fancy Digitals",
    images: [
      {
        url: "https://fancydigitals.com.ng/tools/ai-video-generator.png",
        width: 1200,
        height: 630,
        alt: "Fancy Digitals AI Video Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Generator — Hollywood-Quality in 60 Seconds",
    description:
      "Natural voiceover, cinematic scenes, motion graphics. Free plan available.",
    images: ["https://fancydigitals.com.ng/tools/ai-video-generator.png"],
  },
};

const FEATURES = [
  {
    title: "AI-directed cinematic scenes",
    desc: "Every scene is composed like a Hollywood commercial — camera motion, lighting, composition, and pacing.",
    icon: "🎬",
  },
  {
    title: "Natural AI voiceover",
    desc: "Powered by Deepgram Aura. Conversational, human, and paced to match your video — not robotic.",
    icon: "🎙️",
  },
  {
    title: "Cinematic background music",
    desc: "Auto-selected to match your video's mood, with intelligent ducking under voiceover.",
    icon: "🎵",
  },
  {
    title: "Motion graphics on every scene",
    desc: "Kinetic text, glass cards, animated captions, and premium transitions — not a slideshow.",
    icon: "✨",
  },
  {
    title: "Multi-image upload with AI Vision",
    desc: "Upload up to 20 images. AI analyzes each one and places it in the matching scene automatically.",
    icon: "🖼️",
  },
  {
    title: "Custom logo + brand color",
    desc: "Logo placement in 9 positions, brand-color-aware layout, and safe-zone intelligence.",
    icon: "🎨",
  },
  {
    title: "Export MP4 in any format",
    desc: "Vertical (Reels/TikTok), landscape (YouTube), square (Instagram Feed). Or export as GIF.",
    icon: "📱",
  },
  {
    title: "Live timeline editor",
    desc: "Drag to reorder scenes, edit text, adjust duration, undo/redo. Full control after generation.",
    icon: "🎛️",
  },
];

const WHO_FOR = [
  { title: "Founders", desc: "Launch products with videos that convert." },
  { title: "Marketers", desc: "Ship social campaigns in minutes, not weeks." },
  { title: "Agencies", desc: "Produce client content at scale without a video team." },
  { title: "Creators", desc: "Turn ideas into Reels, Shorts, and TikToks fast." },
  { title: "Small business", desc: "Replace expensive video crews with AI." },
  { title: "Educators", desc: "Explain anything with cinematic tutorials." },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign up free in seconds",
    desc: "Create a free account. 2 videos per day forever, no credit card required.",
  },
  {
    step: "02",
    title: "Describe your video",
    desc: "Tell us your business, goal, and creative brief. Upload your logo and images if you have them.",
  },
  {
    step: "03",
    title: "AI directs the video",
    desc: "Claude Sonnet 4.5 writes cinematic scenes. Vision AI matches uploads to scenes. Deepgram generates the voiceover.",
  },
  {
    step: "04",
    title: "Preview, edit, and export",
    desc: "Play in the browser. Reorder scenes, edit text, tweak timing. Export MP4 in any format.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    highlight: false,
    features: [
      "2 videos per day",
      "All templates (Apple + Launch)",
      "AI voiceover included",
      "Background music included",
      "MP4 export (all formats)",
      "Multi-image upload",
      "Custom logo + brand color",
      "Timeline editor",
    ],
    cta: "Start Free",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    highlight: true,
    features: [
      "10 videos per day",
      "Everything in Free",
      "Priority generation queue",
      "Custom voiceover upload",
      "Custom music upload",
      "Advanced brand controls",
      "Extended asset library",
      "Save unlimited projects",
    ],
    cta: "Go Pro",
    ctaLink: "/pricing",
  },
  {
    name: "Agency",
    price: "$29",
    period: "per month",
    highlight: false,
    features: [
      "Unlimited videos",
      "Everything in Pro",
      "10 client workspaces",
      "White-label export",
      "3 custom domains",
      "Team collaboration",
      "Priority support",
      "API access (coming)",
    ],
    cta: "Get Agency",
    ctaLink: "/pricing",
  },
];

const FAQ = [
  {
    q: "Is the AI Video Generator free?",
    a: "Yes. The Free plan gives you 2 videos per day forever, with no credit card required. Includes all templates, AI voiceover, background music, motion graphics, and MP4 export. Pro unlocks 10 videos per day, and Agency is unlimited.",
  },
  {
    q: "Do I need to sign up?",
    a: "Yes — a free account is required. Signup takes 30 seconds and gives you 2 free videos per day forever. This lets us protect the compute cost of every generation and give you a saved project history.",
  },
  {
    q: "How long does generation take?",
    a: "Typically 2–4 minutes for a 30–60 second video. That includes AI scene writing, voiceover generation, music selection, and preview rendering.",
  },
  {
    q: "What formats can I export?",
    a: "MP4 in vertical (1080×1920 for TikTok/Reels/Shorts), landscape (1920×1080 for YouTube), and square (1080×1080 for Instagram Feed). GIF export is also available for previews.",
  },
  {
    q: "Can I upload my own images and logo?",
    a: "Yes. Upload your logo and up to 20 images. AI Vision analyzes every image and places each one in the matching scene automatically. You can also tag images with a role (hero, product, team, etc.) for precise control.",
  },
  {
    q: "Does it include voiceover?",
    a: "Yes. Every video includes an AI-generated voiceover using Deepgram Aura's most natural voices — conversational, human, and paced to match your video. Pro users can upload their own voiceover.",
  },
  {
    q: "Does it include background music?",
    a: "Yes. Music is auto-selected to match the mood of your video, with intelligent ducking so it drops in volume when the voiceover speaks. Pro users can upload their own music.",
  },
  {
    q: "How long can my video be?",
    a: "From 15 seconds up to 2 minutes. Pick your target length and AI plans the right number of scenes automatically.",
  },
  {
    q: "Can I edit the video after generation?",
    a: "Yes. Every video opens in a live editor. Drag scenes to reorder, edit any text, change durations, swap images, and preview instantly. Full undo/redo included.",
  },
  {
    q: "What AI powers this?",
    a: "Claude Sonnet 4.5 for scene direction and writing. Gemini Vision for image analysis. Deepgram Aura for voiceover. Pixabay for music. All orchestrated by Fancy Digitals.",
  },
  {
    q: "Do I own the videos I create?",
    a: "Yes. 100%. You own every video generated. Use them commercially, on any platform, anywhere.",
  },
  {
    q: "Can I upgrade or cancel anytime?",
    a: "Yes. Upgrade from Free to Pro or Agency anytime. Cancel anytime with no penalty — your account stays active until the end of your billing period.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Fancy Digitals AI Video Generator",
      operatingSystem: "Web",
      applicationCategory: "MultimediaApplication",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free — 2 videos/day" },
        { "@type": "Offer", price: "9", priceCurrency: "USD", name: "Pro — 10 videos/day" },
        { "@type": "Offer", price: "29", priceCurrency: "USD", name: "Agency — Unlimited" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1284",
      },
      description:
        "AI video generator with natural voiceover, cinematic scenes, motion graphics, background music, and MP4 export. Free plan available.",
      url: "https://fancydigitals.com.ng/free-ai-video-generator",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "HowTo",
      name: "How to create a video with AI",
      step: HOW_IT_WORKS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.desc,
      })),
    },
  ],
};

export default function AIVideoGeneratorLandingPage() {
  return (
    <>
      <Script
        id="fd-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <main className="min-h-screen bg-white">
        {/* ============ HERO ============ */}
        <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#075a01]/5 via-white to-white" />
          <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-[#075a01]/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-[#ff914d]/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 mb-5 text-xs font-bold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              FREE — 2 Videos Per Day
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Hollywood-Quality
              <br />
              <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                AI Videos in 60 Seconds
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Natural AI voiceover. Cinematic scenes. Motion graphics.
              Background music. Export to MP4.
              <br className="hidden sm:inline" />
              <span className="font-semibold text-gray-900">
                Not a slideshow. A real video.
              </span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/video-ai"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-base font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition"
              >
                Start Creating Free
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <p className="text-sm text-gray-500">
                Free signup · No credit card · 2 videos/day
              </p>
            </div>

            {/* Video mockup */}
            <div className="mt-16 relative mx-auto max-w-3xl">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-900 bg-gray-900 aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-[#075a01] via-gray-900 to-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[10px] font-bold text-white/80 uppercase tracking-wider">
                      Scene 03 · Product
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                      Simplify Your
                      <br />
                      <span className="text-[#0a8f01]">Digital World</span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-white/70 max-w-md mx-auto">
                      Premium tools that just work — beautifully.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div className="h-full w-2/5 bg-[#0a8f01]" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 rounded-full ${
                      i < 3 ? "bg-[#075a01]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-[#075a01] uppercase tracking-wider mb-2">
                How It Works
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                From idea to finished video in 4 steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-6 hover:border-[#075a01]/30 transition"
                >
                  <div className="text-4xl font-black text-[#075a01]/20 mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-[#075a01] uppercase tracking-wider mb-2">
                Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Everything you need. Nothing you don't.
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Built for creators who want cinematic output without the
                complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-5 hover:border-[#075a01]/30 hover:shadow-md transition"
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-[#075a01] uppercase tracking-wider mb-2">
                Pricing
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Simple pricing. Serious value.
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Start free. Upgrade when you're ready. Cancel anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 flex flex-col ${
                    plan.highlight
                      ? "bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white shadow-2xl scale-105"
                      : "bg-white border-2 border-gray-100"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3
                      className={`text-2xl font-bold ${
                        plan.highlight ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-black ${
                          plan.highlight ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ${
                          plan.highlight ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm ${
                          plan.highlight ? "text-white/90" : "text-gray-700"
                        }`}
                      >
                        <svg
                          className={`h-5 w-5 shrink-0 mt-0.5 ${
                            plan.highlight ? "text-white" : "text-[#075a01]"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaLink}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition ${
                      plan.highlight
                        ? "bg-white text-[#075a01] hover:bg-gray-50"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-sm text-gray-500">
              Prices in USD. Regional pricing available at checkout.{" "}
              <Link href="/pricing" className="text-[#075a01] font-semibold hover:underline">
                See all plans
              </Link>
            </p>
          </div>
        </section>

        {/* ============ WHO FOR ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-[#075a01] uppercase tracking-wider mb-2">
                Built For
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Who this is for
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {WHO_FOR.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-6 text-center hover:border-[#075a01]/30 transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {w.title}
                  </h3>
                  <p className="text-sm text-gray-600">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-[#075a01] uppercase tracking-wider mb-2">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white border-2 border-gray-100 p-5 hover:border-[#075a01]/30 transition"
                >
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between list-none">
                    <span className="pr-4">{item.q}</span>
                    <svg
                      className="h-5 w-5 text-gray-400 group-open:rotate-180 transition"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-10 sm:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                  Ready to make your first
                  <br />
                  cinematic AI video?
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                  Free signup. No credit card. 2 videos per day forever. Just
                  press generate.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/video-ai"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#075a01] shadow-xl hover:bg-gray-50 active:scale-95 transition"
                  >
                    Start Creating Free
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}