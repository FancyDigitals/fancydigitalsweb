import Link from "next/link";
import Script from "next/script";

const BASE_URL = "https://fancydigitals.com.ng";

export const metadata = {
  title: "Free YouTube Auditor — Grow to Monetization & Outrank Your Niche | Fancy Digitals",
  description:
    "Audit any YouTube channel in 60 seconds. Get a 10-step growth plan to monetization, competitor comparison, and CTR-optimized title ideas. Free plan available.",
  keywords: [
    "youtube auditor",
    "youtube channel audit",
    "youtube growth tool",
    "youtube monetization checker",
    "youtube competitor analysis",
    "youtube seo tool",
    "youtube title generator",
    "youtube thumbnail ideas",
    "youtube channel analyzer",
    "youtube niche research tool",
    "how to grow youtube channel",
    "youtube 1000 subscribers",
    "youtube 4000 watch hours",
    "youtube analytics tool free",
    "youtube growth studio",
  ].join(", "),
  alternates: {
    canonical: `${BASE_URL}/free-youtube-auditor`,
  },
  openGraph: {
    title: "Free YouTube Auditor — Grow to Monetization Fast",
    description:
      "Audit any channel. Get a growth plan to monetization. Outrank your niche. Free plan available.",
    url: `${BASE_URL}/free-youtube-auditor`,
    siteName: "Fancy Digitals",
    images: [
      {
        url: `${BASE_URL}/tools/youtube-auditor.png`,
        width: 1200,
        height: 630,
        alt: "Fancy Digitals YouTube Auditor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Auditor — Grow to Monetization Fast",
    description:
      "Deep channel audit, growth plan, competitor comparison. Free plan available.",
    images: [`${BASE_URL}/tools/youtube-auditor.png`],
  },
};

const FEATURES = [
  {
    title: "Deep channel audit",
    desc: "Real YouTube API data. Monetization gap, content health, SEO diagnostics — no vanity metrics.",
    icon: "🔎",
  },
  {
    title: "10-step growth plan",
    desc: "Prioritized action plan based on YOUR channel's data. Critical → High → Medium → Low.",
    icon: "📋",
  },
  {
    title: "Monetization gap analysis",
    desc: "Real ETA to 1,000 subs + 4,000 watch hours. Calculated from your actual growth velocity.",
    icon: "💰",
  },
  {
    title: "Competitor comparison",
    desc: "Compare against up to 3 competitors side-by-side. Get a 90-day overtake plan.",
    icon: "⚔️",
  },
  {
    title: "CTR-optimized titles",
    desc: "10 title variants per topic, ranked by predicted CTR. Plus thumbnail directions + SEO description.",
    icon: "✏️",
  },
  {
    title: "Niche domination reports",
    desc: "Analyze top 10 channels in any niche. Find white-space topics nobody covers.",
    icon: "🎯",
  },
  {
    title: "Content strategy insights",
    desc: "Identify your sweet spot. See what content works and what to avoid. Get 5 video ideas ready to ship.",
    icon: "🧠",
  },
  {
    title: "Real-time YouTube data",
    desc: "Pulled fresh every audit. Not scraped, not stale — official YouTube API.",
    icon: "📡",
  },
];

const WHO_FOR = [
  {
    title: "Creators chasing monetization",
    desc: "See exactly what's blocking you from 1K subs and 4K watch hours.",
  },
  {
    title: "Established channels scaling",
    desc: "Break through plateaus. Find what's working and double down.",
  },
  {
    title: "Agencies managing channels",
    desc: "Audit client channels in 60 seconds. Deliver strategic reports.",
  },
  {
    title: "Podcast + YouTube coaches",
    desc: "Data-backed audits for every student. No more guesswork.",
  },
  {
    title: "Marketing teams",
    desc: "Understand brand channel performance vs competitors instantly.",
  },
  {
    title: "New creators launching",
    desc: "Research niches before you commit. Find the topics that win.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Paste any YouTube channel",
    desc: "URL, @handle, custom URL, or even a video URL — we resolve it automatically. No login needed for the channel.",
  },
  {
    step: "02",
    title: "We pull real data",
    desc: "Subscribers, views, videos, tags, descriptions, engagement — all from the official YouTube API in seconds.",
  },
  {
    step: "03",
    title: "AI analyzes everything",
    desc: "Claude Sonnet 4.5 studies your top performers, upload cadence, SEO, and monetization gaps to build strategic insights.",
  },
  {
    step: "04",
    title: "Get your growth plan",
    desc: "10-step action plan, video ideas, SEO upgrades, monetization ETA, next milestone. Do it, or hand it to your team.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    highlight: false,
    features: [
      "1 channel audit per day",
      "3 title generations per day",
      "Full monetization gap analysis",
      "10-step growth action plan",
      "Content strategy insights",
      "SEO diagnostics",
      "Top performer analysis",
    ],
    cta: "Start Free",
    ctaLink: "/signup",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    highlight: true,
    features: [
      "20 channel audits per day",
      "Unlimited title generation",
      "Competitor comparison (up to 3)",
      "Niche domination reports",
      "90-day overtake plans",
      "White-space topic finder",
      "Save unlimited audit history",
      "Priority processing",
    ],
    cta: "Go Pro",
    ctaLink: "/pricing",
  },
  {
    name: "Agency",
    price: "$49",
    period: "per month",
    highlight: false,
    features: [
      "Unlimited audits",
      "Everything in Pro",
      "White-label PDF reports",
      "Team seats (up to 10)",
      "10 client workspaces",
      "3 custom domains",
      "Priority support",
    ],
    cta: "Get Agency",
    ctaLink: "/pricing",
  },
];

const FAQ = [
  {
    q: "Do you need my YouTube password or access?",
    a: "No. Never. We use the public YouTube Data API. Paste any channel URL and we pull public metrics — subscribers, views, videos, tags. Zero permissions needed, works for any channel including your own.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. The Free plan gives you 1 full channel audit per day + 3 title generations. No credit card required. Pro unlocks 20 audits/day, competitor comparison, and niche reports for $19/mo. Agency is $49/mo with unlimited everything.",
  },
  {
    q: "How accurate is the monetization gap analysis?",
    a: "Very. We pull your real subscriber count, video count, and view metrics from YouTube. We calculate your ETA to 1,000 subs based on your actual growth velocity, and estimate 4,000 watch hours based on your avg video length × view count × industry-standard retention.",
  },
  {
    q: "Can I audit competitors' channels?",
    a: "Yes. Pro lets you audit up to 3 competitors side-by-side. You'll see exact gaps, biggest advantages, content gaps to fill, title formulas that work in your niche, and a 90-day overtake plan.",
  },
  {
    q: "What data do you actually pull?",
    a: "Subscribers, total views, all videos (last 50), views/likes/comments per video, tags, descriptions, upload dates, video lengths, top and worst performers, channel age, and topic categories. From that, we compute 30+ derived metrics.",
  },
  {
    q: "How does the title generator work?",
    a: "You paste your video topic + niche + channel style. Our AI generates 10 CTR-optimized title variants tailored to your channel, plus 3 thumbnail direction concepts, a ready-to-paste SEO description, and relevant tags. Each title includes a predicted CTR tier.",
  },
  {
    q: "What's the Niche Domination Report?",
    a: "Enter any niche (e.g. 'AI agencies', 'home cooking', 'crypto trading'). We analyze the top 10 channels in that niche and generate a report on winning title formats, video lengths, upload cadence, white-space topics nobody covers, and a strategy for how to break in.",
  },
  {
    q: "How long does an audit take?",
    a: "30-90 seconds. We fetch data instantly then Claude generates deep insights. Comparison audits take 60-180 seconds since we're pulling multiple channels.",
  },
  {
    q: "Can I export the audit as PDF?",
    a: "PDF export is included on the Agency plan. Perfect for client deliverables — white-labeled with your branding.",
  },
  {
    q: "Which AI powers the insights?",
    a: "Claude Sonnet 4.5 by Anthropic. We chose it because it produces the most specific, actionable analysis — never generic advice. Every insight references your channel's actual data.",
  },
  {
    q: "How is this different from VidIQ or TubeBuddy?",
    a: "Those are browser extensions with generic keyword tools. We're a strategic audit tool — we give you a growth PLAN, not just data. Think of us as a YouTube growth consultant, not another analytics dashboard. Also: we cost 4x less.",
  },
  {
    q: "Do you keep my audit history?",
    a: "Yes. Every audit is saved to your dashboard. Come back anytime to see past reports, track progress over time, or export to PDF (Agency).",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Fancy Digitals YouTube Auditor",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free — 1 audit/day" },
        { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Pro — 20 audits/day" },
        { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Agency — Unlimited" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "412",
      },
      description:
        "Free YouTube channel auditor. Get a deep growth report, 10-step action plan, monetization gap analysis, competitor comparison, and CTR-optimized title generator.",
      url: `${BASE_URL}/free-youtube-auditor`,
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
      name: "How to audit a YouTube channel and build a growth plan",
      step: HOW_IT_WORKS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.desc,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Free AI Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: "YouTube Auditor", item: `${BASE_URL}/free-youtube-auditor` },
      ],
    },
  ],
};

const TOOL_URL = "/dashboard/tools/youtube-auditor";

export default function YoutubeAuditorLandingPage() {
  return (
    <>
      <Script
        id="yt-auditor-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <main className="min-h-screen bg-white">
        {/* ============ HERO ============ */}
        <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-white to-white" />
          <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
          <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* LEFT */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 mb-5 text-xs font-bold text-red-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  FREE — 1 Audit Per Day
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                  Audit any YouTube channel.
                  <br />
                  <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Grow to monetization.
                  </span>
                </h1>

                <p className="mt-5 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Get a deep channel audit, 10-step growth plan, monetization gap analysis, and competitor comparison — all in 60 seconds.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <Link
                    href={TOOL_URL}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-7 py-3.5 text-base font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition"
                  >
                    Audit Your Channel Free
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <p className="text-sm text-gray-500">
                    Free signup · No YouTube access needed
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
                  <TrustStat value="60s" label="Per audit" />
                  <TrustStat value="30+" label="Metrics tracked" />
                  <TrustStat value="10" label="Action items" />
                </div>
              </div>

              {/* RIGHT — mock report card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl bg-white border-2 border-gray-100 shadow-2xl overflow-hidden">
                  {/* Browser bar */}
                  <div className="bg-gray-50 px-4 py-2 flex items-center gap-1.5 border-b border-gray-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-auto text-[10px] text-gray-400">fancydigitals.com.ng</span>
                  </div>

                  {/* Mock report */}
                  <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                          YT
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Your Channel</div>
                          <div className="text-[11px] text-gray-500">@yourchannel · Since 2022</div>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-xl px-3 py-2 text-center">
                        <div className="text-[8px] font-bold uppercase text-gray-600">Score</div>
                        <div className="text-2xl font-black text-amber-600">67</div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <MockMetric v="847" l="Subs" />
                      <MockMetric v="24K" l="Views" />
                      <MockMetric v="1.2K" l="Avg" />
                      <MockMetric v="4/mo" l="Uploads" />
                    </div>

                    {/* Monetization */}
                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-3 mb-3">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-red-700 mb-1">
                        Monetization gap
                      </div>
                      <div className="text-sm font-bold text-gray-900 mb-2">
                        153 subs · 2,847 hours to go
                      </div>
                      <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-red-500 to-orange-500" />
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1">
                        ETA: ~4 months at current pace
                      </div>
                    </div>

                    {/* Action items */}
                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold uppercase text-gray-500 mb-1">Top actions</div>
                      {[
                        { p: "CRITICAL", t: "Increase upload to 8/mo" },
                        { p: "HIGH", t: "Fix title lengths (avg 38 chars)" },
                        { p: "HIGH", t: "Add end screens to top 5 videos" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                            a.p === "CRITICAL" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {a.p}
                          </span>
                          <span className="text-gray-700 truncate">{a.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl px-3 py-2 shadow-xl">
                  <p className="text-[10px] font-bold text-white uppercase tracking-wider">Growth Plan</p>
                  <p className="text-xl font-black text-white">10 Steps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                How It Works
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                From URL to growth plan in 60 seconds
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-6 hover:border-red-300 transition"
                >
                  <div className="text-4xl font-black text-red-500/20 mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={TOOL_URL}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-7 py-3.5 text-base font-bold text-white shadow-lg hover:opacity-90 transition"
              >
                Try It Now — Free
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                Features
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Everything you need to grow — nothing you don't
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                No vanity metrics. No fluff. Just deep insights and a specific plan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-5 hover:border-red-300 hover:shadow-md transition"
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2 leading-tight">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                Pricing
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                4x cheaper than VidIQ & TubeBuddy
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
                      ? "bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-2xl scale-105"
                      : "bg-white border-2 border-gray-100"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      {plan.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className={`text-5xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-500"}`}>
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
                          className={`h-5 w-5 shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-red-600"}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.ctaLink}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition ${
                      plan.highlight
                        ? "bg-white text-red-600 hover:bg-gray-50"
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
              <Link href="/pricing" className="text-red-600 font-semibold hover:underline">
                See all plans
              </Link>
            </p>
          </div>
        </section>

        {/* ============ WHO FOR ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
                Built For
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Who this is for
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHO_FOR.map((w) => (
                <div
                  key={w.title}
                  className="rounded-2xl bg-white border-2 border-gray-100 p-6 hover:border-red-300 transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{w.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="px-4 py-20 sm:px-6 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">
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
                  className="group rounded-2xl bg-white border-2 border-gray-100 p-5 hover:border-red-300 transition"
                >
                  <summary className="cursor-pointer font-bold text-gray-900 flex items-center justify-between list-none">
                    <span className="pr-4">{item.q}</span>
                    <svg
                      className="h-5 w-5 text-gray-400 group-open:rotate-180 transition"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
            <div className="relative rounded-3xl bg-gradient-to-br from-red-600 to-orange-600 p-10 sm:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
                  Ready to grow your
                  <br />
                  YouTube channel?
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                  Free signup. No credit card. No YouTube access needed. Just paste a channel URL.
                </p>

                <div className="mt-8">
                  <Link
                    href={TOOL_URL}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-red-600 shadow-xl hover:bg-gray-50 active:scale-95 transition"
                  >
                    Audit Your Channel Free
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ RELATED TOOLS ============ */}
        <section className="px-4 py-12 sm:px-6 lg:px-10 border-t border-gray-100">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
              More Free Growth Tools
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link href="/free-ai-visibility-checker" className="rounded-xl border border-gray-200 p-3 hover:border-red-500 hover:bg-red-50/30 transition text-center">
                <p className="text-sm font-bold text-gray-900">AI Visibility Checker</p>
                <p className="text-xs text-gray-500 mt-0.5">See how ChatGPT recommends you</p>
              </Link>
              <Link href="/free-ai-video-generator" className="rounded-xl border border-gray-200 p-3 hover:border-red-500 hover:bg-red-50/30 transition text-center">
                <p className="text-sm font-bold text-gray-900">AI Video Generator</p>
                <p className="text-xs text-gray-500 mt-0.5">Hollywood-quality in 60s</p>
              </Link>
              <Link href="/tools" className="rounded-xl border border-gray-200 p-3 hover:border-red-500 hover:bg-red-50/30 transition text-center">
                <p className="text-sm font-bold text-gray-900">All Tools</p>
                <p className="text-xs text-gray-500 mt-0.5">Browse full toolkit</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function TrustStat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-black text-red-600">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function MockMetric({ v, l }) {
  return (
    <div className="bg-white rounded-lg p-2 border border-gray-100">
      <div className="text-[9px] font-bold uppercase text-gray-500">{l}</div>
      <div className="text-sm font-bold text-gray-900">{v}</div>
    </div>
  );
}