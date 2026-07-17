import Link from "next/link";
import {
  Mail,
  Sparkles,
  Check,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Send,
  Copy,
  Download,
  Edit3,
  Share2,
  Users,
  Target,
  ShoppingCart,
  Rocket,
  Heart,
  RefreshCw,
  Newspaper,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Free AI Email Sequence Generator — Fancy Digitals",
  description:
    "Generate cold outreach, welcome, launch, abandoned cart, nurture, re-engagement, and newsletter email sequences in 30 seconds. Export to Mailchimp, Klaviyo, or copy directly. Free.",
  keywords: [
    "ai email sequence generator",
    "cold email generator",
    "welcome email sequence",
    "abandoned cart email generator",
    "product launch email sequence",
    "lead nurture email generator",
    "email drip campaign generator",
    "free email sequence tool",
    "ai email writer",
    "mailchimp email generator",
    "klaviyo email generator",
  ],
  openGraph: {
    title: "Free AI Email Sequence Generator — Fancy Digitals",
    description: "Generate high-converting email sequences in 30 seconds using AI.",
    type: "website",
  },
};

const SEQUENCES = [
  { Icon: Send, name: "Cold Outreach", count: "5 emails", desc: "B2B sales" },
  { Icon: Users, name: "Welcome Series", count: "5 emails", desc: "SaaS onboarding" },
  { Icon: Rocket, name: "Product Launch", count: "6 emails", desc: "Teaser → Launch → Post" },
  { Icon: ShoppingCart, name: "Abandoned Cart", count: "3 emails", desc: "E-commerce recovery" },
  { Icon: Heart, name: "Lead Nurture", count: "7 emails", desc: "Educational drip" },
  { Icon: RefreshCw, name: "Re-engagement", count: "4 emails", desc: "Win back inactive users" },
  { Icon: Newspaper, name: "Newsletter Welcome", count: "4 emails", desc: "Subscriber warm-up" },
];

const FEATURES = [
  { Icon: Zap, title: "Ready in 30 Seconds", desc: "AI writes every email — subject, preview, body, CTA, and send timing." },
  { Icon: MessageSquare, title: "A/B Subject Variants", desc: "Every email includes a primary subject and A/B test alternative." },
  { Icon: Edit3, title: "Inline Editing", desc: "Click any email to edit inline. Every change auto-saves." },
  { Icon: Copy, title: "Copy to Clipboard", desc: "Copy individual emails or the full sequence with one click." },
  { Icon: Download, title: "CSV Export", desc: "Download ready-to-import CSV for Mailchimp, Klaviyo, ActiveCampaign, Beehiiv." },
  { Icon: Share2, title: "Shareable Public Link", desc: "Share sequences with clients or team via a professional public link." },
];

const FAQS = [
  { q: "Is the AI Email Sequence Generator really free?", a: "Yes. You get 1 free sequence per day with no credit card required. Pro unlocks unlimited sequences and priority AI generation." },
  { q: "How long does it take?", a: "Usually 15–30 seconds. AI writes every email with subject lines, preview text, body copy, CTAs, and optimal send timing." },
  { q: "Can I export to Mailchimp or Klaviyo?", a: "Yes. Export as CSV — ready to import into Mailchimp, Klaviyo, ActiveCampaign, Beehiiv, ConvertKit, or any email tool." },
  { q: "What types of sequences are supported?", a: "Cold Outreach, Welcome Series, Product Launch, Abandoned Cart, Lead Nurture, Re-engagement, and Newsletter Welcome — 7 types total." },
  { q: "Can I edit emails after generating?", a: "Yes. Click any email to edit inline. Everything auto-saves to your account." },
  { q: "Do you save my sequences?", a: "Yes. Every sequence is saved to your account automatically. Access them anytime from My Sequences." },
  { q: "Can I reuse inputs for new sequences?", a: "Yes. Click 'Use as Template' on any sequence to prefill the form with those inputs. Perfect for creating variations." },
  { q: "Are the emails personalized?", a: "AI uses merge fields like {{first_name}} and {{company}} that work with any email platform." },
];

export default function FreeEmailSequenceGeneratorPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#075a01]/5 via-white to-[#0a8f01]/5 px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#075a01]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            AI Email Sequence
            <span className="block bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              Generator Free
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Generate cold outreach, welcome, launch, abandoned cart, nurture, and re-engagement email sequences in 30 seconds. Ready to send. Export to any email tool.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/tools/ai-email-sequence-generator"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-3.5 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#075a01]/25"
            >
              <Mail className="h-4 w-4" />
              Generate My Email Sequence Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            {["No credit card required", "1 free sequence per day", "Export to CSV", "Save to your account"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <Check className="h-3 w-3 text-[#075a01]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">7 sequence types for every scenario</h2>
            <p className="mt-2 text-sm text-gray-500">Choose your sequence and AI writes every email with perfect timing</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEQUENCES.map((seq) => (
              <div key={seq.name} className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-5 hover:border-[#075a01]/20 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10 shrink-0">
                    <seq.Icon className="h-5 w-5 text-[#075a01]" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{seq.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#075a01]">{seq.count}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{seq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-gradient-to-br from-gray-50 to-[#075a01]/5">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">More than templates</h2>
            <p className="mt-2 text-sm text-gray-500">Real AI copy for your specific business — not generic filler</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#075a01]/10">
                  <f.Icon className="h-5 w-5 text-[#075a01]" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { Icon: Zap, value: "30 sec", label: "Generation time" },
              { Icon: Mail, value: "3–7", label: "Emails per sequence" },
              { Icon: Target, value: "7", label: "Sequence types" },
              { Icon: Shield, value: "Free", label: "No card required" },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.Icon className="h-6 w-6 mx-auto mb-2 text-white/80" />
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-bold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-gradient-to-br from-[#075a01]/5 to-[#0a8f01]/5">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Your next email sequence is 30 seconds away
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Join thousands of founders and marketers using Fancy Digitals to write cold outreach, welcome flows, and launch sequences.
          </p>
          <Link
            href="/dashboard/tools/ai-email-sequence-generator"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 text-sm font-bold text-white hover:from-[#064c01] hover:to-[#087a01] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#075a01]/25"
          >
            <Mail className="h-4 w-4" />
            Generate My Email Sequence Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-gray-400">
            Free · No credit card · Export to any email tool
          </p>
        </div>
      </section>
    </>
  );
}