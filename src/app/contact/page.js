"use client";

import { useState } from "react";

/* ===============================
   CONTACT PAGE — CREATIVE & BEAUTIFUL
================================ */

const services = [
  { label: "Premium websites & platforms", icon: "🌐" },
  { label: "Custom internal or public tools", icon: "⚡" },
  { label: "Brand systems & digital identity", icon: "✨" },
  { label: "SEO, performance & structure", icon: "📈" },
  { label: "Long-term product infrastructure", icon: "🏗️" },
];

const contactMethods = [
  {
    title: "WhatsApp",
    subtitle: "Quick responses",
    value: "+234 903 436 0785",
    href: "https://wa.me/2349034360785",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    bgColor: "bg-green-500",
    hoverBg: "hover:bg-green-50",
    hoverBorder: "hover:border-green-200",
  },
  {
    title: "Phone",
    subtitle: "Direct line",
    value: "+234 904 554 7761",
    href: "tel:+2349045547761",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    bgColor: "bg-[#ff914d]",
    hoverBg: "hover:bg-orange-50",
    hoverBorder: "hover:border-orange-200",
  },
  {
    title: "Email",
    subtitle: "Detailed inquiries",
    value: "hello@fancydigitals.com.ng",
    href: "mailto:hello@fancydigitals.com.ng",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    bgColor: "bg-[#075a01]",
    hoverBg: "hover:bg-emerald-50",
    hoverBorder: "hover:border-emerald-200",
  },
];

const faqs = [
  {
    q: "What's your typical project timeline?",
    a: "Most projects take 2-6 weeks depending on scope. We'll provide a clear timeline during our initial discussion.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Absolutely! We work with clients globally and have experience managing remote collaborations effectively.",
  },
  {
    q: "What's included in a website project?",
    a: "Design, development, basic SEO setup, mobile optimization, and a handoff session. Ongoing support is available.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intent: "Project Inquiry",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:hello@fancydigitals.com.ng?subject=${encodeURIComponent(
      `${formData.intent} from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fancy Digitals",
            url: "https://fancydigitals.com.ng",
            areaServed: "NG",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              availableLanguage: ["English"],
            },
          }),
        }}
      />

      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient blobs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse rounded-full bg-[#075a01]/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-[#ff914d]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-[#075a01]/5 blur-[80px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Floating shapes */}
        <div className="absolute left-[10%] top-32 h-4 w-4 animate-bounce rounded-full bg-[#075a01]/20" />
        <div
          className="absolute right-[15%] top-48 h-3 w-3 animate-bounce rounded-full bg-[#ff914d]/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[20%] top-[60%] h-2 w-2 animate-bounce rounded-full bg-[#075a01]/25"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute right-[25%] top-[40%] h-5 w-5 animate-bounce rounded-full border-2 border-[#ff914d]/20"
          style={{ animationDelay: "0.3s" }}
        />
        <div className="absolute left-[5%] top-[45%] h-6 w-6 rotate-45 animate-pulse rounded-lg border-2 border-dashed border-[#075a01]/15" />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="group inline-flex items-center gap-3 rounded-full border border-[#075a01]/20 bg-white px-5 py-2.5 shadow-lg shadow-[#075a01]/5 transition-all duration-300 hover:border-[#075a01]/30 hover:shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#075a01] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#075a01]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600">
                Let&apos;s Connect
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Start a conversation that
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
                  moves things
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="url(#underline-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="underline-gradient"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                    >
                      <stop stopColor="#075a01" />
                      <stop offset="1" stopColor="#ff914d" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="bg-gradient-to-r from-[#ff914d] to-[#ff6b1a] bg-clip-text text-transparent">
                forward
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
              We work with founders, teams, and organizations who value{" "}
              <span className="font-semibold text-gray-900">clarity</span>,{" "}
              <span className="font-semibold text-gray-900">structure</span>, and{" "}
              <span className="font-semibold text-gray-900">
                long-term digital thinking
              </span>
              .
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.title === "WhatsApp" ? "_blank" : undefined}
                rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                className={`group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ${method.hoverBorder} ${method.hoverBg} hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Decorative corner */}
                <div
                  className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${method.bgColor} opacity-10 transition-all duration-300 group-hover:scale-150 group-hover:opacity-20`}
                />

                <div className="relative flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.bgColor} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {method.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900">{method.title}</p>
                    <p className="text-xs text-gray-500">{method.subtitle}</p>
                    <p className="mt-1 truncate text-sm font-medium text-gray-700">
                      {method.value}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <svg
                    className="h-3 w-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            {/* LEFT COLUMN - Info */}
            <div className="space-y-12">
              {/* Services we help with */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#075a01]/10 px-4 py-2">
                  <span className="text-sm font-semibold text-[#075a01]">
                    What we help with
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  When reaching out makes sense
                </h2>

                <p className="mt-4 text-gray-600">
                  Contact us if you&apos;re planning something meaningful and want a
                  partner who thinks beyond visuals into systems, scalability, and
                  longevity.
                </p>

                <div className="mt-8 space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.label}
                      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#075a01]/20 hover:shadow-md"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01]/10 to-[#ff914d]/10 text-xl transition-transform duration-300 group-hover:scale-110">
                        {service.icon}
                      </span>
                      <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                        {service.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ff914d]/10 px-4 py-2">
                  <span className="text-sm font-semibold text-[#ff914d]">
                    Quick answers
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  Frequently asked questions
                </h3>

                <div className="mt-6 space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="flex w-full items-center justify-between p-4 text-left"
                      >
                        <span className="pr-4 font-semibold text-gray-900">
                          {faq.q}
                        </span>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 ${
                            openFaq === idx ? "rotate-180 bg-[#075a01] text-white" : ""
                          }`}
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openFaq === idx ? "max-h-40 pb-4" : "max-h-0"
                        }`}
                      >
                        <p className="px-4 text-sm leading-relaxed text-gray-600">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust indicators */}
              <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 text-white shadow-xl shadow-[#075a01]/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">Privacy First</p>
                    <p className="text-sm text-white/80">
                      No spam. No unnecessary follow-ups.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">2-4h</p>
                    <p className="text-xs text-white/70">Response time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-xs text-white/70">Projects done</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-white/70">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Form */}
            <div className="relative">
              {/* Form card */}
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50">
                {/* Top gradient bar */}
                <div className="h-2 bg-gradient-to-r from-[#075a01] via-[#ff914d] to-[#075a01]" />

                {/* Decorative elements */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ff914d]/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#075a01]/10 blur-3xl" />

                <div className="relative p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      Send us a message
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Fill out the form below and we&apos;ll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="relative">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Full Name
                        </label>
                        <div
                          className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                            focusedField === "name"
                              ? "border-[#075a01] shadow-lg shadow-[#075a01]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className="w-full bg-transparent px-4 py-3.5 text-gray-900 outline-none placeholder:text-gray-400"
                          />
                          {focusedField === "name" && (
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Email Address
                        </label>
                        <div
                          className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                            focusedField === "email"
                              ? "border-[#075a01] shadow-lg shadow-[#075a01]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="john@company.com"
                            className="w-full bg-transparent px-4 py-3.5 text-gray-900 outline-none placeholder:text-gray-400"
                          />
                          {focusedField === "email" && (
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        What can we help with?
                      </label>
                      <div
                        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                          focusedField === "intent"
                            ? "border-[#075a01] shadow-lg shadow-[#075a01]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <select
                          name="intent"
                          value={formData.intent}
                          onChange={(e) =>
                            setFormData({ ...formData, intent: e.target.value })
                          }
                          onFocus={() => setFocusedField("intent")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full appearance-none bg-transparent px-4 py-3.5 text-gray-900 outline-none"
                        >
                          <option>Project Inquiry</option>
                          <option>Website Design & Development</option>
                          <option>Custom Tool / Platform</option>
                          <option>Brand & Identity</option>
                          <option>SEO & Performance</option>
                          <option>Partnership / Collaboration</option>
                          <option>Other</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Budget Range{" "}
                        <span className="font-normal text-gray-400">(optional)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {["Under ₦500k", "₦500k - ₦1M", "₦1M - ₦3M", "₦3M+"].map(
                          (budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData({ ...formData, budget })}
                              className={`rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-300 ${
                                formData.budget === budget
                                  ? "border-[#075a01] bg-[#075a01]/5 text-[#075a01]"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {budget}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Tell us about your project
                      </label>
                      <div
                        className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                          focusedField === "message"
                            ? "border-[#075a01] shadow-lg shadow-[#075a01]/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Describe your project, goals, timeline, or any specific requirements..."
                          className="w-full resize-none bg-transparent px-4 py-3.5 text-gray-900 outline-none placeholder:text-gray-400"
                        />
                        {focusedField === "message" && (
                          <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#075a01] to-[#ff914d]" />
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-8 py-4 font-bold text-white shadow-lg shadow-[#075a01]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#075a01]/30"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative flex items-center justify-center gap-2">
                        Send Message
                        <svg
                          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Privacy note */}
                    <p className="text-center text-xs text-gray-500">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="text-[#075a01] hover:underline">
                        Privacy Policy
                      </a>
                      . We respect your data.
                    </p>
                  </form>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 hidden rotate-12 rounded-2xl bg-[#ff914d] px-4 py-2 text-sm font-bold text-white shadow-lg md:block">
                ✨ Free consultation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="text-white">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Our Location</span>
                </div>

                <h2 className="text-3xl font-bold md:text-4xl">
                  Based in Nigeria,
                  <span className="block text-[#ff914d]">serving globally</span>
                </h2>

                <p className="mt-4 text-gray-400">
                  While our headquarters is in Nigeria, we work with clients across
                  Africa, Europe, and beyond. Digital has no borders.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-2xl">🇳🇬</span>
                    <div>
                      <p className="text-sm font-semibold">Lagos, Nigeria</p>
                      <p className="text-xs text-gray-500">Headquarters</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="text-sm font-semibold">Remote Ready</p>
                      <p className="text-xs text-gray-500">Global clients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative map illustration */}
              <div className="relative flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full border-2 border-dashed border-white/10">
                  <div className="absolute inset-4 rounded-full border border-white/5">
                    <div className="absolute inset-4 rounded-full border border-white/5">
                      <div className="absolute inset-4 rounded-full bg-[#075a01]/20">
                        {/* Center pin */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <div className="h-4 w-4 animate-ping rounded-full bg-[#ff914d]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-[#ff914d] shadow-lg shadow-[#ff914d]/50" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orbiting dots */}
                  <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-white/30" />
                  <div className="absolute right-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                  <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-white/20" />
                  <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 rounded-full bg-[#ff914d]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-gray-600">
            The best projects start with a simple conversation. Let&apos;s talk
            about yours.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/2349034360785"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/30"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+2349045547761"
              className="group flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ff914d]/30 hover:shadow-lg"
            >
              <svg
                className="h-5 w-5 text-[#ff914d]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}