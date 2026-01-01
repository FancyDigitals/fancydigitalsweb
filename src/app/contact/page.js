import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ===============================
   SEO METADATA (SERVER ONLY)
================================ */

export const metadata = {
  title: "Contact Fancy Digitals | Premium Web, Design & Digital Tools",
  description:
    "Contact Fancy Digitals for premium website design, branding, SEO, automation, and custom digital tools. Built with clarity and long-term growth in mind.",
  keywords: [
    "Fancy Digitals contact",
    "web design agency Nigeria",
    "branding agency",
    "SEO services",
    "custom digital tools",
  ],
  openGraph: {
    title: "Contact Fancy Digitals",
    description:
      "Let’s build something intentional. Contact Fancy Digitals for premium digital solutions.",
    url: "https://fancydigitals.com/contact",
    siteName: "Fancy Digitals",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Fancy Digitals",
            url: "https://fancydigitals.com",
            areaServed: "NG",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              availableLanguage: ["English"],
            },
          }),
        }}
      />

      <Header />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-40 h-[560px] w-[560px] rounded-full bg-[#075a01] opacity-[0.10] blur-[160px]" />
        <div className="absolute top-40 -right-40 h-[560px] w-[560px] rounded-full bg-[#ff914d] opacity-[0.08] blur-[180px]" />
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-20 md:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
          Contact Fancy Digitals
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Start a conversation that{" "}
          <span className="text-[#075a01]">moves things forward</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          We work with founders, teams, and organizations who value clarity,
          structure, and long-term digital thinking.
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.2fr]">
          {/* Context */}
          <div>
            <h2 className="text-2xl font-semibold">
              When reaching out makes sense
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              Contact us if you’re planning something meaningful and want a
              partner who thinks beyond visuals into systems, scalability, and
              longevity.
            </p>

            <ul className="mt-8 space-y-5 text-sm text-gray-600">
              {[
                "Premium websites & platforms",
                "Custom internal or public tools",
                "Brand systems & digital identity",
                "SEO, performance & structure",
                "Long-term product infrastructure",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#075a01]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Static form */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />

            <form
              action="mailto:hello@fancydigitals.com"
              method="post"
              encType="text/plain"
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#075a01]"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#075a01]"
                />
              </div>

              <select
                name="intent"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#075a01]"
              >
                <option>Project Inquiry</option>
                <option>Custom Tool</option>
                <option>Brand & Identity</option>
                <option>SEO / Performance</option>
                <option>Partnership</option>
              </select>

              <textarea
                name="message"
                rows={6}
                required
                placeholder="Briefly describe your project, goals, or challenge"
                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm leading-relaxed outline-none focus:border-[#075a01]"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#075a01] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send message
              </button>

              <p className="text-xs text-gray-500">
                We respect your privacy. No spam. No unnecessary follow-ups.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
