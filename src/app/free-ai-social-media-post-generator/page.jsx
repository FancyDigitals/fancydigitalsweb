import Link from "next/link";
import {
  Sparkles,
  Layers,
  Repeat2,
  CalendarDays,
  Download,
  Share2,
  Check,
  ArrowRight,
  Hash,
  Zap,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Free AI Social Media Post Generator | Fancy Digitals",
  description:
    "Generate scroll-stopping posts for Instagram, LinkedIn, Twitter/X, TikTok, Facebook, YouTube, Threads and Pinterest in seconds. Free to try.",
  keywords: [
    "ai social media post generator",
    "social media post generator free",
    "ai instagram caption generator",
    "linkedin post generator ai",
    "tiktok caption generator",
    "repurpose content ai",
    "bulk social media post generator",
  ].join(", "),
  openGraph: {
    title: "Free AI Social Media Post Generator | Fancy Digitals",
    description:
      "Write your topic once. Get platform-perfect posts for all 8 networks instantly.",
    type: "website",
  },
};

const PLATFORMS = [
  { name: "Instagram", detail: "Feed + Reels caption", color: "bg-pink-50 border-pink-200 text-pink-700" },
  { name: "LinkedIn", detail: "Long-form professional post", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "Twitter/X", detail: "Tweet + Thread", color: "bg-gray-50 border-gray-200 text-gray-700" },
  { name: "Facebook", detail: "Post with engagement hooks", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "TikTok", detail: "Video caption + hook", color: "bg-gray-50 border-gray-200 text-gray-700" },
  { name: "YouTube", detail: "Community + Shorts caption", color: "bg-red-50 border-red-200 text-red-700" },
  { name: "Threads", detail: "Casual conversational post", color: "bg-gray-50 border-gray-200 text-gray-700" },
  { name: "Pinterest", detail: "Pin title + description", color: "bg-red-50 border-red-200 text-red-700" },
];

const FEATURES = [
  {
    icon: Layers,
    title: "8 Platforms in One Click",
    desc: "Instagram, LinkedIn, Twitter/X, TikTok, Facebook, YouTube, Threads, Pinterest — all written at once in the right format for each network.",
  },
  {
    icon: Repeat2,
    title: "Repurpose Mode",
    desc: "Paste any blog post, email, or script. AI rewrites it for all 8 platforms in seconds — tone, length, format, all adapted.",
  },
  {
    icon: CalendarDays,
    title: "Bulk Week Mode",
    desc: "Generate a full week of posts in one click. Perfect for scheduling in Buffer, Hootsuite, Later, or Sprout Social.",
  },
  {
    icon: Hash,
    title: "Hashtags + Best Time",
    desc: "Platform-specific hashtags and best-time-to-post recommendations included with every generation.",
  },
  {
    icon: Zap,
    title: "3 A/B Variants Per Post",
    desc: "Get three different angles for every platform post. Test what resonates with your audience.",
  },
  {
    icon: Download,
    title: "CSV Export",
    desc: "Download as CSV and import directly into Buffer, Hootsuite, Later, Sprout, or any scheduling tool.",
  },
];

const FREE_VS_PRO = [
  { feature: "Generate posts", free: true, pro: true },
  { feature: "All 8 platforms", free: true, pro: true },
  { feature: "3 A/B variants", free: true, pro: true },
  { feature: "Hashtag suggestions", free: true, pro: true },
  { feature: "Repurpose Mode", free: true, pro: true },
  { feature: "CSV export", free: true, pro: true },
  { feature: "Unlimited generations per day", free: false, pro: true },
  { feature: "Bulk Week Mode (7 days)", free: false, pro: true },
  { feature: "White-label output (no watermark)", free: false, pro: true },
  { feature: "All languages", free: false, pro: true },
  { feature: "Save & share posts", free: false, pro: true },
  { feature: "Post history", free: false, pro: true },
];

const FAQS = [
  {
    q: "Is the AI Social Media Post Generator really free?",
    a: "Yes. Free users get 3 generations per day with access to all 8 platforms, A/B variants, hashtags, and repurpose mode. Pro unlocks unlimited generations, bulk mode, and white-label output.",
  },
  {
    q: "What platforms are supported?",
    a: "Instagram (Feed + Reels), LinkedIn, Twitter/X (Tweet + Thread), Facebook, TikTok, YouTube (Community + Shorts), Threads, and Pinterest — 8 platforms total.",
  },
  {
    q: "What is Repurpose Mode?",
    a: "Paste any existing content — a blog post, email, video script, or idea — and AI rewrites it for all 8 platforms in the right format, tone, and length for each network.",
  },
  {
    q: "What is Bulk Mode?",
    a: "Generate 3, 5, 7, 10 or 14 posts at once for any platform — a full content calendar in one click. Pro feature.",
  },
  {
    q: "Can I export to Buffer or Hootsuite?",
    a: "Yes. Export as CSV and import directly into Buffer, Hootsuite, Later, Sprout Social, or any tool that accepts CSV upload.",
  },
  {
    q: "Do I need to create an account?",
    a: "You need a free Fancy Digitals account to use the tool. Sign up in 30 seconds — no credit card required.",
  },
];

export default function FreeAISocialMediaPostGeneratorPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#075a01]/8 text-[#075a01] text-sm font-semibold px-4 py-1.5 rounded-full border border-[#075a01]/20 mb-6">
            <Sparkles className="w-4 h-4" />
            AI Social Media Post Generator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
            One topic.
            <br />
            <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              8 platforms.
            </span>
            <br />
            Seconds.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Generate scroll-stopping posts for Instagram, LinkedIn, Twitter/X,
            TikTok, Facebook, YouTube, Threads and Pinterest — all perfectly
            formatted for each network. Free to try.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/tools/ai-social-media-post-generator"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 text-base"
            >
              <Sparkles className="w-5 h-5" />
              Generate free posts
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-200 transition-all text-base"
            >
              See Pro features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            3 free generations per day. No credit card required.
          </p>
        </div>
      </section>

      {/* Platform grid */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-3">
            Every platform. Every format.
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
            AI knows each platform's culture, character limits, and what
            performs — and writes accordingly.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-4 ${p.color} text-center`}
              >
                <div className="font-bold text-sm mb-1">{p.name}</div>
                <div className="text-xs opacity-75 leading-tight">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-3">
            Everything you need for daily social content
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm sm:text-base max-w-xl mx-auto">
            Not just a caption generator. A complete social media content
            system.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-[#075a01]/20 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#075a01]/10 to-[#0a8f01]/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#075a01]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm">
                    {f.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you get per post */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            What you get per platform
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Not just a caption. A complete post package — ready to publish.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            {[
              { icon: Zap, label: "Scroll-stopping hook" },
              { icon: Layers, label: "Main caption" },
              { icon: Repeat2, label: "3 A/B variants" },
              { icon: ArrowRight, label: "Call to action" },
              { icon: Hash, label: "Hashtags" },
              { icon: Clock, label: "Best time to post" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 bg-white rounded-xl border border-gray-200 p-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#075a01]/8 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#075a01]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            Free vs Pro
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="col-span-1 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Feature
              </div>
              <div className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wide">
                Free
              </div>
              <div className="px-4 py-3 text-center text-xs font-bold text-[#075a01] uppercase tracking-wide">
                Pro
              </div>
            </div>
            {FREE_VS_PRO.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 items-center border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <div className="col-span-1 px-4 py-3 text-sm text-gray-700">
                  {row.feature}
                </div>
                <div className="px-4 py-3 text-center">
                  {row.free ? (
                    <Check className="w-4 h-4 text-green-500 mx-auto" />
                  ) : (
                    <span className="text-gray-300 text-sm">—</span>
                  )}
                </div>
                <div className="px-4 py-3 text-center">
                  <Check className="w-4 h-4 text-[#075a01] mx-auto" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all"
            >
              Upgrade to Pro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-200 p-5"
              >
                <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] rounded-2xl p-8 sm:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Stop writing posts one by one.
            </h2>
            <p className="text-white/80 mb-6 text-sm sm:text-base">
              One topic. 8 platforms. 3 variants each. In under 30 seconds.
            </p>
            <Link
              href="/dashboard/tools/ai-social-media-post-generator"
              className="inline-flex items-center gap-2 bg-white text-[#075a01] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Generate your posts free
            </Link>
            <p className="text-white/60 text-xs mt-4">
              Free account. No credit card. 3 generations per day.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}