"use client";

import { useState, useEffect } from "react";
import { REGIONAL_PRICING, getRegionForCountry, formatPrice } from "@/lib/pricing";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Star,
  Shield,
  HelpCircle,
  ArrowRight,
  Globe,
  Infinity as InfinityIcon,
  FileText,
  Mail,
  Layout,
  Video,
  Search,
  Briefcase,
} from "lucide-react";

export default function PricingClient() {
  const [billing, setBilling] = useState("monthly");
  const [region, setRegion] = useState("US");
  const [detectedRegion, setDetectedRegion] = useState(null);

  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        const r = getRegionForCountry(data.country);
        setRegion(r);
        setDetectedRegion(r);
      })
      .catch(() => setRegion("US"));
  }, []);

  const pricing = REGIONAL_PRICING[region];

  // Pro
  const proYearlyPerMonth = (pricing.yearly / 12).toFixed(2);
  const proYearlySavings = (pricing.monthly * 12 - pricing.yearly).toFixed(0);

  // Agency
  const agencyYearlyPerMonth = (pricing.agencyYearly / 12).toFixed(2);
  const agencyYearlySavings = (pricing.agencyMonthly * 12 - pricing.agencyYearly).toFixed(0);

  const tools = [
    { name: "Resume Builder", icon: FileText, description: "ATS-optimized resumes in 30 seconds" },
    { name: "Cover Letter Builder", icon: Mail, description: "Personalized cover letters that get replies" },
    { name: "Landing Page Builder", icon: Layout, description: "Full websites & landing pages, no code" },
    { name: "AI Ad Video Generator", icon: Video, description: "Scroll-stopping ads for Meta, TikTok, YouTube" },
    { name: "AI Recommendation Checker", icon: Search, description: "See how AI search engines rank your business" },
  ];

  const plans = [
    {
      name: "Free",
      tagline: "Try every tool, no card needed",
      price: 0,
      displayPrice: "Free",
      period: "forever",
      icon: Sparkles,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      cta: "Start Free",
      ctaLink: "/signup",
      ctaStyle: "bg-gray-900 text-white hover:bg-gray-800",
      features: [
        "Access to all 5 AI tools",
        "3 resumes / cover letters per day",
        "2 landing pages per day",
        "1 ad video per day",
        "2 AI checks per day",
        "Basic templates",
      ],
      notIncluded: [
        "Unlimited generations",
        "Premium templates",
        "Custom domain",
        "Remove branding",
      ],
      popular: false,
    },
    {
      name: "Pro",
      tagline: "Unlimited for solo users",
      price: billing === "monthly" ? pricing.monthly : parseFloat(proYearlyPerMonth),
      displayPrice: billing === "monthly"
        ? formatPrice(pricing.monthly, region)
        : formatPrice(parseFloat(proYearlyPerMonth), region),
      period: billing === "monthly" ? "/month" : "/month, billed yearly",
      yearlyTotal: billing === "yearly" ? `${formatPrice(pricing.yearly, region)}/year` : null,
      icon: Zap,
      iconBg: "bg-gradient-to-br from-[#075a01] to-[#0a8f01]",
      iconColor: "text-white",
      cta: "Get Pro",
      ctaLink: "/checkout?plan=pro_" + billing,
      ctaStyle: "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white hover:opacity-90",
      features: [
        "Unlimited use of all 5 AI tools",
        "Premium templates & designs",
        "1 custom domain",
        "Remove Fancy Digitals branding",
        "Priority AI processing",
        "Save & re-edit all creations",
        "Export in multiple formats",
        "Priority email support",
        "Access to all future tools",
        "Cancel anytime",
      ],
      notIncluded: [],
      popular: true,
      badge: billing === "yearly" ? `Save ${formatPrice(proYearlySavings, region)}` : null,
    },
    {
      name: "Agency",
      tagline: "Manage clients & scale up",
      price: billing === "monthly" ? pricing.agencyMonthly : parseFloat(agencyYearlyPerMonth),
      displayPrice: billing === "monthly"
        ? formatPrice(pricing.agencyMonthly, region)
        : formatPrice(parseFloat(agencyYearlyPerMonth), region),
      period: billing === "monthly" ? "/month" : "/month, billed yearly",
      yearlyTotal: billing === "yearly" ? `${formatPrice(pricing.agencyYearly, region)}/year` : null,
      icon: Briefcase,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
      iconColor: "text-white",
      cta: "Get Agency",
      ctaLink: "/checkout?plan=agency_" + billing,
      ctaStyle: "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90",
      features: [
        "Everything in Pro",
        "Manage up to 10 client accounts",
        "3 custom domains",
        "White-label branding",
        "Client edit request system",
        "Bulk export tools",
        "WhatsApp support",
        "Extend clients & domains anytime",
      ],
      notIncluded: [],
      popular: false,
      badge: billing === "yearly" ? `Save ${formatPrice(agencyYearlySavings, region)}` : "Best for teams",
    },
  ];

  const comparison = [
    { feature: "Resume Builder", free: "3/day", pro: "Unlimited", agency: "Unlimited" },
    { feature: "Cover Letter Builder", free: "3/day", pro: "Unlimited", agency: "Unlimited" },
    { feature: "Landing Page Builder", free: "2/day", pro: "Unlimited", agency: "Unlimited" },
    { feature: "AI Ad Video Generator", free: "1/day", pro: "Unlimited", agency: "Unlimited" },
    { feature: "AI Recommendation Checker", free: "2/day", pro: "Unlimited", agency: "Unlimited" },
    { feature: "Client accounts", free: "0", pro: "0", agency: "10 (extendable)" },
    { feature: "Custom domains", free: "0", pro: "1", agency: "3 (extendable)" },
    { feature: "White-label branding", free: false, pro: false, agency: true },
    { feature: "Premium templates", free: false, pro: true, agency: true },
    { feature: "Save & re-edit", free: false, pro: true, agency: true },
    { feature: "Priority support", free: false, pro: true, agency: "WhatsApp" },
    { feature: "Future AI tools access", free: "Limited", pro: true, agency: true },
  ];

  const faqs = [
    {
      q: "What tools do I get with my plan?",
      a: "All 5 tools on every plan — Resume Builder, Cover Letter Builder, Landing Page Builder, AI Ad Video Generator, and AI Recommendation Checker. Free has daily limits. Pro and Agency are unlimited.",
    },
    {
      q: "What's the difference between Pro and Agency?",
      a: "Pro is for solo users — you manage your own account. Agency is for freelancers and teams who build for clients. Agency gives you 10 client accounts, 3 custom domains, white-label branding, and WhatsApp support.",
    },
    {
      q: "Can I add more clients or domains on Agency?",
      a: "Yes. You can extend anytime from your dashboard. Add 5 extra clients or 1 extra domain whenever you need. No need to upgrade plans.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes. Cancel with one click. You'll keep access until the end of your billing period.",
    },
    {
      q: "What payment methods do you accept?",
      a: "Nigerian users: direct bank transfer with a reference code. International users: card and PayPal coming soon. All plans have a 7-day money-back guarantee.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. Your data is encrypted and stored on enterprise-grade infrastructure. We never share or sell your data.",
    },
    {
      q: "What happens if I downgrade?",
      a: "You keep your current plan access until your billing period ends, then switch down. Everything you've created stays yours.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes. 7-day money-back guarantee on all paid plans. Not happy? Email us for a full refund, no questions.",
    },
    {
      q: "Can I use this for clients (commercial use)?",
      a: "Yes. Pro and Agency plans both include commercial rights. Agency adds white-label so your clients don't see Fancy Digitals branding.",
    },
    {
      q: "Do you have a student discount?",
      a: "Yes. Email hello@fancydigitals.com.ng with your student ID for 50% off any plan.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* HERO */}
      <section className="px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Five AI tools. <span className="text-[#075a01]">One simple plan.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Resumes, cover letters, landing pages, ad videos, and AI visibility checks — all in one place. Start free, upgrade when you're ready.
          </p>

          {/* Tools row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-1.5 shadow-sm"
              >
                <tool.icon className="h-3.5 w-3.5 text-[#075a01]" />
                <span className="text-xs font-semibold text-gray-700">{tool.name}</span>
              </div>
            ))}
          </div>

          {/* Currency + Billing toggle */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  billing === "monthly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition flex items-center gap-1.5 ${
                  billing === "yearly" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                Yearly
                <span className="rounded-full bg-[#075a01] text-white text-[10px] font-bold px-1.5 py-0.5">
                  -27%
                </span>
              </button>
            </div>

            <div className="relative inline-block">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="appearance-none rounded-full bg-gray-100 px-4 py-2 pr-9 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#075a01]/30"
              >
                {Object.entries(REGIONAL_PRICING).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.flag} {val.country} ({val.code})
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {detectedRegion === region && (
              <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap">
                Auto-detected from your location
              </p>
            )}
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl bg-white p-6 sm:p-8 ${
                  plan.popular
                    ? "border-2 border-[#075a01] shadow-2xl shadow-[#075a01]/20 md:scale-105"
                    : "border border-gray-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Star className="h-3 w-3 fill-current" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {plan.badge && !plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Briefcase className="h-3 w-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {plan.badge && plan.popular && (
                  <div className="absolute -top-3 right-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${plan.iconBg}`}>
                    <plan.icon className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.displayPrice}
                    </span>
                    {plan.price !== 0 && (
                      <span className="text-sm text-gray-500">{plan.period}</span>
                    )}
                  </div>
                  {plan.yearlyTotal && (
                    <p className="mt-1 text-xs text-gray-500">{plan.yearlyTotal}</p>
                  )}
                  {plan.name === "Agency" && (
                    <p className="mt-1 text-xs text-amber-600 font-semibold">
                      One client project pays for the whole month
                    </p>
                  )}
                </div>

                <Link
                  href={plan.ctaLink}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all active:scale-[0.98] mb-6 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#075a01] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add-on strip */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Need more? Extend your Agency plan anytime.
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  Add extra clients or domains from your dashboard. No plan upgrade needed.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-lg bg-white px-3 py-2 border border-amber-200">
                  <p className="text-[10px] font-semibold uppercase text-amber-700">+5 clients</p>
                  <p className="text-sm font-bold text-gray-900">{formatPrice(pricing.addonClient, region)}/mo</p>
                </div>
                <div className="rounded-lg bg-white px-3 py-2 border border-amber-200">
                  <p className="text-[10px] font-semibold uppercase text-amber-700">+1 domain</p>
                  <p className="text-sm font-bold text-gray-900">{formatPrice(pricing.addonDomain, region)}/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#075a01]" />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#075a01]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#075a01]" />
              <span>Pay in your currency</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Everything you need to grow
            </h2>
            <p className="mt-2 text-gray-600">
              Five powerful AI tools in one platform
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="rounded-2xl bg-white border border-gray-200 p-5 hover:border-[#075a01]/40 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{tool.name}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Compare all features
            </h2>
            <p className="mt-2 text-gray-600">
              Everything in one table
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Feature</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-gray-600">Free</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-[#075a01]">
                    Pro <Star className="inline h-3 w-3 fill-current" />
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-amber-600">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.free === "boolean"
                        ? (row.free ? <Check className="h-5 w-5 text-[#075a01] mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />)
                        : <span className="text-gray-600">{row.free}</span>}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.pro === "boolean"
                        ? (row.pro ? <Check className="h-5 w-5 text-[#075a01] mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />)
                        : <span className="text-gray-900 font-semibold">{row.pro}</span>}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.agency === "boolean"
                        ? (row.agency ? <Check className="h-5 w-5 text-amber-600 mx-auto" /> : <X className="h-5 w-5 text-gray-300 mx-auto" />)
                        : <span className="text-gray-900 font-semibold">{row.agency}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {comparison.map((row, i) => (
              <div key={i} className="rounded-xl bg-white border border-gray-200 p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">{row.feature}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Free</p>
                    {typeof row.free === "boolean"
                      ? (row.free ? <Check className="h-4 w-4 text-[#075a01] mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : <span className="text-xs text-gray-600">{row.free}</span>}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#075a01] mb-1">Pro</p>
                    {typeof row.pro === "boolean"
                      ? (row.pro ? <Check className="h-4 w-4 text-[#075a01] mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : <span className="text-xs text-gray-900 font-semibold">{row.pro}</span>}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-amber-600 mb-1">Agency</p>
                    {typeof row.agency === "boolean"
                      ? (row.agency ? <Check className="h-4 w-4 text-amber-600 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />)
                      : <span className="text-xs text-gray-900 font-semibold">{row.agency}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* VALUE PROOF */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pro pays for itself in one use
            </h2>
            <p className="mt-2 text-gray-600">
              What freelancers charge vs what you pay with Pro
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
            <div className="space-y-3">
              {[
                { service: "One professional resume", lowNGN: 5000, highNGN: 15000 },
                { service: "One landing page / website", lowNGN: 50000, highNGN: 200000 },
                { service: "One ad video", lowNGN: 20000, highNGN: 100000 },
                { service: "One cover letter", lowNGN: 3000, highNGN: 8000 },
                { service: "AI visibility audit", lowNGN: 15000, highNGN: 50000 },
              ].map((row, i) => {
                // Convert NGN prices to selected currency using ratio
                const ratio = pricing.monthly / REGIONAL_PRICING.NG.monthly;
                const low = row.lowNGN * ratio;
                const high = row.highNGN * ratio;
                return (
                  <div key={i} className="flex items-center justify-between gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="text-sm sm:text-base text-gray-700">{row.service}</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {formatPrice(Math.round(low), region)} – {formatPrice(Math.round(high), region)}
                    </span>
                  </div>
                );
              })}
              <div className="pt-4 mt-4 border-t-2 border-[#075a01]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base sm:text-lg font-bold text-[#075a01]">All 5 tools unlimited with Pro</span>
                  <span className="text-lg sm:text-xl font-bold text-[#075a01]">
                    {formatPrice(pricing.monthly, region)}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">5</p>
              <p className="mt-1 text-sm text-gray-600">AI-powered tools</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">30s</p>
              <p className="mt-1 text-sm text-gray-600">Average generation</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">98%</p>
              <p className="mt-1 text-sm text-gray-600">ATS pass rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">24/7</p>
              <p className="mt-1 text-sm text-gray-600">AI access</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 text-xs font-bold text-[#075a01] mb-3">
              <HelpCircle className="h-3 w-3" />
              Got questions?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl bg-white border border-gray-200 p-4 hover:border-[#075a01]/30 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                    {faq.q}
                  </p>
                  <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-[#075a01] group-open:text-white transition">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Still have questions?{" "}
            <a
              href="mailto:hello@fancydigitals.com.ng"
              className="font-bold text-[#075a01] hover:underline"
            >
              Email us
            </a>{" "}
            and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#075a01] via-[#0a8f01] to-[#075a01] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-400/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <InfinityIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Ready to grow your business?
              </h2>
              <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
                Join thousands of professionals and businesses using Fancy Digitals to grow faster with AI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 active:scale-95 transition-all"
                >
                  Start Free Now
                </Link>
                <Link
                  href="/tools"
                  className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  Explore Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}