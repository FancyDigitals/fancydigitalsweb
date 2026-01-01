import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

/* =====================================================
   ABOUT PAGE — STATIC, FOUNDER STORY
===================================================== */

export const metadata = {
  title: "About Bashir Ismail (Fancy) | Founder of Fancy Digitals",
  description:
    "Learn about Bashir Ismail (Fancy), founder of Fancy Digitals — a premium digital studio built on clarity, structure, and long-term digital systems.",
};

/* =====================================================
   STATIC CONTENT
===================================================== */

const founder = {
  name: "Bashir Ismail",
  alias: "Fancy",
  role: "Founder & Digital Architect",
  image: "/images/founder.jpg", // ensure this exists in /public
  bio: [
    "Bashir Ismail, widely known as Fancy, is the founder of Fancy Digitals — a premium digital studio focused on building calm, scalable, and intentional digital systems.",
    "With years of hands-on experience across design, frontend engineering, and digital strategy, he helps businesses replace chaos with structure and long-term clarity.",
  ],
};

const experience = [
  { years: 7, label: "Digital Experience" },
  { years: 6, label: "Frontend Engineering" },
  { years: 5, label: "Product Design" },
  { years: 4, label: "System Architecture" },
  { years: 3, label: "Agency Leadership" },
];

const values = [
  {
    title: "Clarity over noise",
    description:
      "Every decision is guided by simplicity, purpose, and long-term usefulness — not trends or vanity.",
  },
  {
    title: "Systems thinking",
    description:
      "Digital work is treated as an interconnected system, not isolated deliverables.",
  },
  {
    title: "Calm execution",
    description:
      "Workflows are designed to reduce friction, stress, and unnecessary complexity.",
  },
];

const clientTypes = [
  "Founders building long-term digital products",
  "Growing brands needing structure and clarity",
  "Agencies seeking reliable technical execution",
  "Teams replacing fragile or overbuilt systems",
];

const signature = {
  name: "Bashir Ismail",
  title: "Founder",
};

/* =====================================================
   PAGE
===================================================== */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* INTRO / IDENTITY */}
      <section className="mx-auto max-w-6xl px-5 pt-32 pb-28 md:px-10">
        <div className="grid gap-20 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          {/* Founder Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#f1f2f1] shadow-[0_32px_90px_rgba(0,0,0,0.10)]">
              <Image
                src={founder.image}
                alt={`${founder.name}, Founder of Fancy Digitals`}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Founder Identity */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-gray-500">
              {founder.role}
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {founder.name}{" "}
              <span className="text-[#075a01]">({founder.alias})</span>
            </h1>

            {founder.bio.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 max-w-xl text-base leading-relaxed text-gray-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <div className="grid gap-10 rounded-3xl border border-black/5 bg-[#f8f9f8] p-10 md:grid-cols-5 md:p-14">
          {experience.map((item) => (
            <div key={item.label}>
              <p className="text-2xl font-semibold">{item.years} Years</p>
              <p className="mt-1 text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold md:text-3xl">
            How Bashir approaches digital work
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-600">
            Bashir’s approach begins with listening. He believes the quality of
            any solution is directly tied to how well the problem is understood.
            This allows complex ideas to be translated into clean, usable, and
            scalable digital systems.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-600">
            His agility across multiple disciplines reduces friction, shortens
            feedback loops, and ensures that strategy, design, and execution
            remain aligned from start to finish.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <div className="grid gap-16 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)]"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT TYPES */}
      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Who Fancy Digitals works with
          </h2>

          <ul className="mt-8 grid gap-4 text-sm text-gray-600 md:grid-cols-2">
            {clientTypes.map((client) => (
              <li key={client}>• {client}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* PERSONAL NOTE */}
      <section className="mx-auto max-w-6xl px-5 pb-36 md:px-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold md:text-3xl">
            A note from the founder
          </h2>

          <p className="mt-8 text-base leading-relaxed text-gray-600">
            Fancy Digitals exists to make complex digital journeys feel
            manageable, thoughtful, and well-structured. The goal is not to
            overwhelm, but to create systems that support growth with calm and
            confidence.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-600">
            If you value clarity, long-term thinking, and intentional execution,
            working together will feel natural.
          </p>

          <div className="mt-10">
            <p className="text-sm font-semibold text-gray-900">
              {signature.name}
            </p>
            <p className="text-sm text-gray-600">
              {signature.title}, Fancy Digitals
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
