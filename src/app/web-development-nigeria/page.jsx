import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "Web Development in Nigeria | Fast, Modern Websites - Fancy Digitals",
  description:
    "Professional web development in Nigeria. We build fast, responsive, and conversion-focused websites that grow your business.",
};

export default function WebDevelopmentNigeria() {
  return (
    <main className="bg-white text-black">

      {/* HERO */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Web Development in Nigeria That Converts
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Your website shouldn’t just look good. It should load fast, rank on Google,
          and turn visitors into paying customers.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/contact"
            className="bg-black text-white px-8 py-3 rounded-xl hover:opacity-90"
          >
            Start a Project
          </Link>
          <Link
            href="/portfolio"
            className="border border-black px-8 py-3 rounded-xl"
          >
            View Portfolio
          </Link>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-10 border-y text-center text-gray-500 text-sm">
        Built for startups, businesses, and growing brands across Nigeria
      </section>

      {/* CASE STUDY */}
<section className="px-6 py-20 max-w-5xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-6">Real Results</h2>

  <p className="text-gray-600 mb-10">
    We redesigned a client’s website and increased conversions, speed, and user engagement significantly.
  </p>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="border p-6 rounded-xl">
      <h3 className="text-2xl font-bold">2x</h3>
      <p className="text-gray-500">Conversion Rate</p>
    </div>
    <div className="border p-6 rounded-xl">
      <h3 className="text-2xl font-bold">1s</h3>
      <p className="text-gray-500">Load Time</p>
    </div>
    <div className="border p-6 rounded-xl">
      <h3 className="text-2xl font-bold">+180%</h3>
      <p className="text-gray-500">User Engagement</p>
    </div>
  </div>
</section>

{/* LOCATION SEO */}
<section className="px-6 py-20 bg-gray-50 text-center">
  <h2 className="text-3xl font-bold mb-6">
    Web Development Services Across Nigeria
  </h2>

  <p className="max-w-3xl mx-auto text-gray-600">
    We build websites for businesses in Lagos, Abuja, Port Harcourt, Ibadan, and across Nigeria.
    From startups to large brands, we create high-performing digital experiences.
  </p>
</section>

      {/* SERVICES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What We Build
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Business Websites",
              desc: "Clean, modern websites designed to convert visitors into customers.",
            },
            {
              title: "E-commerce Stores",
              desc: "High-performing online stores built for sales and scalability.",
            },
            {
              title: "Landing Pages",
              desc: "Conversion-focused pages for ads, campaigns, and promotions.",
            },
            {
              title: "Custom Web Apps",
              desc: "Advanced solutions tailored to your business needs.",
            },
            {
              title: "Speed Optimization",
              desc: "We make your site load fast and perform smoothly.",
            },
            {
              title: "Mobile Responsive Design",
              desc: "Perfect experience across all devices and screen sizes.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-2xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-black text-white px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Not Just Design. Performance.
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-10">
          We build websites that are fast, SEO-ready, and designed to drive real business results.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold">1s</h3>
            <p className="text-gray-400">Load Speed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">100%</h3>
            <p className="text-gray-400">Mobile Ready</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">SEO</h3>
            <p className="text-gray-400">Optimized Structure</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Our Process
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Planning",
            "Design",
            "Development",
            "Launch",
          ].map((step, i) => (
            <div key={i}>
              <div className="text-3xl font-bold mb-2">0{i + 1}</div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build Something Powerful?
        </h2>
        <p className="text-gray-600 mb-8">
          Let’s create a website that drives results.
        </p>

        <Link
          href="/contact"
          className="bg-black text-white px-10 py-4 rounded-xl text-lg"
        >
          Start Your Website
        </Link>
      </section>

      {/* FAQ */}
<section className="px-6 py-20 max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-10 text-center">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">
    {[
      {
        q: "How much does a website cost in Nigeria?",
        a: "Cost depends on features, but most professional websites range from ₦150k to ₦1M+.",
      },
      {
        q: "How long does it take to build a website?",
        a: "Typically 1–4 weeks depending on complexity.",
      },
      {
        q: "Will my website be mobile-friendly?",
        a: "Yes, all our websites are fully responsive across all devices.",
      },
      {
        q: "Do you build SEO-friendly websites?",
        a: "Yes, all our websites are optimized for search engines from the start.",
      },
    ].map((item, i) => (
      <div key={i} className="border p-5 rounded-xl">
        <h3 className="font-semibold mb-2">{item.q}</h3>
        <p className="text-gray-600">{item.a}</p>
      </div>
    ))}
  </div>
</section>

<Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a website cost in Nigeria?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most websites range from ₦150k to ₦1M depending on features."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to build a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It usually takes 1–4 weeks depending on complexity."
          }
        },
        {
          "@type": "Question",
          "name": "Will my website be mobile-friendly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all websites are fully responsive."
          }
        },
        {
          "@type": "Question",
          "name": "Do you build SEO-friendly websites?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all websites are optimized for search engines."
          }
        }
      ]
    }),
  }}
/>

    </main>
  );
}