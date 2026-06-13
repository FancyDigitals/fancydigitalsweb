export const metadata = {
  title: "Web Design Company in Nigeria | Fancy Digitals",
  description:
    "Fancy Digitals is a leading web design company in Nigeria. We create fast, SEO-optimized, conversion-focused websites for businesses, startups and ecommerce brands.",
};

export default function WebDesignNigeriaPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Web Design Company in Nigeria That Builds Websites That Convert
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Fancy Digitals creates high-performing websites for businesses,
          startups and ecommerce brands across Nigeria. Fast, SEO-ready and built to generate real results.
        </p>

        <a
          href="https://wa.me/234XXXXXXXXXX"
          className="inline-block bg-[#075a01] text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90"
        >
          Chat on WhatsApp
        </a>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Web Design Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Business Website Design",
              "E-commerce Website Development",
              "Landing Page Design",
              "Website Redesign",
              "SEO Optimization",
              "AI Automation Integration",
            ].map((service) => (
              <div key={service} className="p-6 bg-white rounded-xl shadow">
                <h3 className="font-semibold text-lg">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose Fancy Digitals
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Fast delivery (3–7 days)",
            "Conversion-focused design",
            "SEO-ready websites",
            "Mobile-first performance optimization",
            "Full-stack digital solutions",
            "Built for real business growth",
          ].map((item) => (
            <div key={item} className="flex gap-3 items-start">
              <span className="text-green-600">✔</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Projects We’ve Worked On
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Beta Energies – Energy Company Website",
              "Feast Basket – Ecommerce Platform",
              "Bevibeshub – Blogging Platform",
              "Todma – Car Brand Identity",
            ].map((project) => (
              <div key={project} className="p-6 bg-white rounded-xl shadow">
                {project}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          How Much Does Web Design Cost in Nigeria?
        </h2>

        <p className="text-gray-600 mb-4">
          Our pricing ranges from ₦150,000 to ₦1,500,000 depending on the project complexity, features and business needs.
        </p>

        <p className="text-gray-600">
          We offer flexible solutions tailored to your goals — whether you’re a startup, small business or growing brand.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-[#075a01] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Build a Website That Brings You Clients?
        </h2>

        <p className="mb-8 text-white/80">
          Let’s design something powerful for your business.
        </p>

        <a
          href="https://wa.me/2349034360785"
          className="inline-block bg-white text-[#075a01] px-8 py-4 rounded-xl font-semibold"
        >
          Start Your Project
        </a>
      </section>

    </main>
  );
}