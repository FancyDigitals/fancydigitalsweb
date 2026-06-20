"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Crown,
  Star,
  Shield,
  HelpCircle,
  ArrowRight,
  Globe,
  Infinity as InfinityIcon,
} from "lucide-react";

export default function PricingClient() {
  const [billing, setBilling] = useState("monthly");
  const [currency, setCurrency] = useState("NGN");

  const prices = {
    NGN: {
      symbol: "₦",
      pro_monthly: "2,500",
      pro_yearly: "20,000",
      pro_yearly_per_month: "1,667",
      lifetime: "25,000",
      savings: "Save ₦10,000/year",
    },
    USD: {
      symbol: "$",
      pro_monthly: "4.99",
      pro_yearly: "39",
      pro_yearly_per_month: "3.25",
      lifetime: "49",
      savings: "Save $21/year",
    },
  };

  const p = prices[currency];

  const plans = [
    {
      name: "Free",
      tagline: "Try it out, no card needed",
      price: "0",
      period: "forever",
      icon: Sparkles,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      cta: "Start Free",
      ctaLink: "/signup",
      ctaStyle: "bg-gray-900 text-white hover:bg-gray-800",
      features: [
        "3 resumes per day",
        "1 professional template",
        "AI-powered content",
        "Download as HTML",
        "Print & save as PDF",
        "All AI tools (limited daily)",
      ],
      notIncluded: [
        "Premium templates",
        "Unlimited generations",
        "Remove footer branding",
        "Priority support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      tagline: "For job seekers & professionals",
      price: billing === "monthly" ? p.pro_monthly : p.pro_yearly_per_month,
      period: billing === "monthly" ? "/month" : "/month, billed yearly",
      yearlyTotal: billing === "yearly" ? `${p.symbol}${p.pro_yearly}/year` : null,
      icon: Zap,
      iconBg: "bg-gradient-to-br from-[#075a01] to-[#0a8f01]",
      iconColor: "text-white",
      cta: "Get Pro",
      ctaLink: "/api/checkout?plan=pro_" + billing,
      ctaStyle: "bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white hover:opacity-90",
      features: [
        "Unlimited resumes & generations",
        "6+ premium templates",
        "No footer branding",
        "ATS score checker",
        "Save & re-edit any resume",
        "All current & future AI tools",
        "Cover letter generator",
        "Priority email support",
        "Export to multiple formats",
        "Cancel anytime",
      ],
      notIncluded: [],
      popular: true,
      badge: billing === "yearly" ? p.savings : null,
    },
    {
      name: "Lifetime",
      tagline: "Pay once, use forever",
      price: p.lifetime,
      period: "one-time",
      icon: Crown,
      iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
      iconColor: "text-white",
      cta: "Buy Lifetime",
      ctaLink: "/api/checkout?plan=lifetime",
      ctaStyle: "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90",
      features: [
        "Everything in Pro",
        "One-time payment, no subscription",
        "Free updates forever",
        "Early access to new tools",
        "Lifetime priority support",
        "Best value long-term",
      ],
      notIncluded: [],
      popular: false,
      badge: "Best Value",
    },
  ];

  const comparison = [
    { feature: "AI generations per day", free: "3", pro: "Unlimited", lifetime: "Unlimited" },
    { feature: "Resume templates", free: "1 basic", pro: "6+ premium", lifetime: "6+ premium" },
    { feature: "Cover letter generator", free: false, pro: true, lifetime: true },
    { feature: "ATS score checker", free: false, pro: true, lifetime: true },
    { feature: "Save & re-edit resumes", free: false, pro: true, lifetime: true },
    { feature: "Remove footer branding", free: false, pro: true, lifetime: true },
    { feature: "Priority support", free: false, pro: true, lifetime: true },
    { feature: "Future AI tools access", free: "Limited", pro: true, lifetime: true },
    { feature: "One-time payment", free: false, pro: false, lifetime: true },
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes! You can cancel your Pro subscription anytime with a single click. You'll keep Pro access until the end of your billing period.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay through our secure payment processor Lemon Squeezy. Local Nigerian payments coming soon via Paystack.",
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. Your resumes and personal information are encrypted and stored securely on Supabase (enterprise-grade infrastructure). We never share your data with third parties.",
    },
    {
      q: "What happens if I downgrade?",
      a: "You'll keep Pro access until your billing period ends, then automatically switch to the Free plan. Your saved resumes remain accessible.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes! We offer a 7-day money-back guarantee on all Pro plans. If you're not satisfied, just email us and we'll refund you, no questions asked.",
    },
    {
      q: "What's the difference between Pro and Lifetime?",
      a: "Pro is a recurring subscription (monthly or yearly). Lifetime is a one-time payment that gives you Pro access forever, including all future tools and updates. Lifetime pays off after ~10 months of Pro.",
    },
    {
      q: "Can I use this for clients (commercial use)?",
      a: "Yes! Both Pro and Lifetime plans include commercial use rights. Build resumes for clients, charge for the service — it's all good.",
    },
    {
      q: "Do you have a student discount?",
      a: "Yes! Email us with your student ID at hello@fancydigitals.com.ng for 50% off any plan.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* HERO */}
      <section className="px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#075a01]/10 px-3 py-1 text-xs font-bold text-[#075a01] mb-4">
            <Sparkles className="h-3 w-3" />
            Simple, transparent pricing
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Build smarter. <span className="text-[#075a01]">Pay less.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no contracts. Cancel anytime.
          </p>

          {/* Currency + Billing toggle */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Billing toggle */}
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
                  -33%
                </span>
              </button>
            </div>

            {/* Currency toggle */}
            <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setCurrency("NGN")}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  currency === "NGN" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                  currency === "USD" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                }`}
              >
                $ USD
              </button>
            </div>
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
                      <Crown className="h-3 w-3" />
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
                      {plan.price === "0" ? "Free" : `${p.symbol}${plan.price}`}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-sm text-gray-500">{plan.period}</span>
                    )}
                  </div>
                  {plan.yearlyTotal && (
                    <p className="mt-1 text-xs text-gray-500">{plan.yearlyTotal}</p>
                  )}
                  {plan.name === "Lifetime" && (
                    <p className="mt-1 text-xs text-amber-600 font-semibold">
                      Pays off after {currency === "NGN" ? "10" : "10"} months
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

      {/* COMPARISON TABLE */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Compare all features
            </h2>
            <p className="mt-2 text-gray-600">
              Everything you need to know in one table
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-900">Feature</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-gray-600">Free</th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-[#075a01]">
                    Pro <Star className="inline h-3 w-3 fill-current" />
                  </th>
                  <th className="text-center px-6 py-4 text-sm font-bold text-amber-600">Lifetime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="h-5 w-5 text-[#075a01] mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-600">{row.free}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="h-5 w-5 text-[#075a01] mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-900 font-semibold">{row.pro}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      {typeof row.lifetime === "boolean" ? (
                        row.lifetime ? (
                          <Check className="h-5 w-5 text-amber-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-900 font-semibold">{row.lifetime}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {comparison.map((row, i) => (
              <div key={i} className="rounded-xl bg-white border border-gray-200 p-4">
                <p className="font-semibold text-gray-900 text-sm mb-3">{row.feature}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-gray-500 mb-1">Free</p>
                    {typeof row.free === "boolean" ? (
                      row.free ? <Check className="h-4 w-4 text-[#075a01] mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-xs text-gray-600">{row.free}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#075a01] mb-1">Pro</p>
                    {typeof row.pro === "boolean" ? (
                      row.pro ? <Check className="h-4 w-4 text-[#075a01] mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-xs text-gray-900 font-semibold">{row.pro}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-amber-600 mb-1">Lifetime</p>
                    {typeof row.lifetime === "boolean" ? (
                      row.lifetime ? <Check className="h-4 w-4 text-amber-600 mx-auto" /> : <X className="h-4 w-4 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-xs text-gray-900 font-semibold">{row.lifetime}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STATS */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">10K+</p>
              <p className="mt-1 text-sm text-gray-600">Resumes generated</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">98%</p>
              <p className="mt-1 text-sm text-gray-600">ATS pass rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">30s</p>
              <p className="mt-1 text-sm text-gray-600">Average generation</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-[#075a01]">4.9★</p>
              <p className="mt-1 text-sm text-gray-600">User rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 bg-gray-50">
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
                Ready to build something great?
              </h2>
              <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
                Join thousands of professionals using Fancy Digitals to land their dream jobs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/signup"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 active:scale-95 transition-all"
                >
                  Start Free Now
                </Link>
                <Link
                  href="/dashboard/tools/ai-resume-builder"
                  className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition-all"
                >
                  Try Resume Builder
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}