import { JOB_ROLES } from "@/data/job-roles";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Mail, Sparkles, Check, Star, ArrowRight, Zap, Crown,
  TrendingUp, Users, Award, Target, AlertCircle, Briefcase,
  DollarSign, BookOpen, ChevronRight, FileText,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";
const TOOL_URL = "/dashboard/tools/ai-cover-letter";

export async function generateStaticParams() {
  return JOB_ROLES.map((role) => ({
    role: role.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { role: roleSlug } = await params;
  const role = JOB_ROLES.find((r) => r.slug === roleSlug);

  if (!role) {
    return { title: "Cover Letter Template — Fancy Digitals" };
  }

  return {
    title: `${role.title} Cover Letter — Free AI Generator + Examples | Fancy Digitals`,
    description: `Write a winning ${role.title} cover letter in 30 seconds with AI. Tailored examples, ATS-friendly, completely free. Start now.`,
    keywords: role.keywords.map((k) => k.replace("resume", "cover letter")),
    alternates: { canonical: `${BASE_URL}/cover-letter-for/${role.slug}` },
    openGraph: {
      title: `${role.title} Cover Letter Generator — Free AI Tool`,
      description: `Free AI-powered ${role.title} cover letter generator. Tailored to any job in seconds.`,
      url: `${BASE_URL}/cover-letter-for/${role.slug}`,
      type: "website",
    },
  };
}

export default async function RoleCoverLetterPage({ params }) {
  const { role: roleSlug } = await params;
  const role = JOB_ROLES.find((r) => r.slug === roleSlug);

  if (!role) notFound();

  const relatedRoles = JOB_ROLES
    .filter((r) => r.category === role.category && r.slug !== role.slug)
    .slice(0, 3);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${role.title} Cover Letter Generator - Fancy Digitals`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "847",
      bestRating: "5",
    },
  };

  const faqs = [
    {
      q: `How do I write a ${role.title} cover letter that stands out?`,
      a: `Start with a strong hook that mentions the specific role and company. Highlight 2-3 achievements relevant to ${role.title} responsibilities. Mention key skills like ${role.skills.slice(0, 3).join(", ")}. End with a confident call to action. Our AI tool does all this in 30 seconds.`,
    },
    {
      q: `How long should a ${role.title} cover letter be?`,
      a: `${role.title} cover letters should be 250-400 words (3-4 short paragraphs). Hiring managers spend less than 60 seconds reading. Keep it concise, impactful, and easy to skim. Our AI tool offers Short, Medium, and Detailed length options.`,
    },
    {
      q: `What should I include in a ${role.title} cover letter?`,
      a: `Include: (1) Opening hook with role and company name, (2) Why you're qualified — mention skills like ${role.skills.slice(0, 5).join(", ")}, (3) A specific achievement that proves your value, (4) Why this company specifically, (5) Confident call to action.`,
    },
    {
      q: `Should I use AI to write my ${role.title} cover letter?`,
      a: `Yes — AI is the fastest way to write a tailored cover letter. Our tool combines your unique experience with role-specific keywords for ${role.title} positions. You always review and personalize before sending. Saves hours per application.`,
    },
    {
      q: `How do I personalize a ${role.title} cover letter?`,
      a: `Research the company's mission, recent news, and specific job requirements. Mention something specific that excites you about THIS company (not generic). Reference the hiring manager by name if known. Our AI accepts company name and hiring manager input for personalization.`,
    },
    {
      q: `What's the difference between a ${role.title} cover letter and resume?`,
      a: `Your resume lists experience and skills. Your cover letter tells the STORY behind them — why you're applying, what makes you unique, and why this company. Both are needed. Build a matching set with our resume + cover letter generators.`,
    },
    {
      q: `Can I use this ${role.title} cover letter tool for free?`,
      a: `Yes! Fancy Digitals AI Cover Letter Generator is 100% free. Generate up to 3 ${role.title} cover letters per day with no credit card. Upgrade to Pro for unlimited cover letters and premium features.`,
    },
    {
      q: `What tone should a ${role.title} cover letter have?`,
      a: `For ${role.title} roles, use a ${role.category === "Healthcare" ? "professional and warm" : role.category === "Creative" ? "creative and authentic" : role.category === "Technology" ? "confident and direct" : "professional"} tone. Our AI offers 4 tones: Professional, Enthusiastic, Direct, Creative. Choose what matches the company culture.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: `${role.title} Cover Letter`, item: `${BASE_URL}/cover-letter-for/${role.slug}` },
    ],
  };

  const sampleParagraphs = [
    `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${role.title} position at your company. With proven expertise in ${role.skills.slice(0, 3).join(", ")}, I am confident I can contribute meaningfully to your team from day one.`,
    `In my previous role, I ${role.exampleBullets[0].toLowerCase()}. This experience has prepared me well for the challenges and opportunities of a ${role.title} role at your organization.`,
    `What excites me most about this opportunity is the chance to apply my ${role.skills.slice(3, 6).join(", ")} skills to drive meaningful impact. I am particularly drawn to companies that value innovation and excellence in ${role.category.toLowerCase()}.`,
    `I would welcome the opportunity to discuss how my background and skills align with your team's needs. Thank you for considering my application.\n\nSincerely,\n[Your Name]`,
  ];

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
            <ChevronRight className="h-3 w-3" />
            <li><Link href="/tools" className="hover:text-purple-600">Tools</Link></li>
            <ChevronRight className="h-3 w-3" />
            <li className="text-gray-900 font-semibold truncate">{role.title} Cover Letter</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-4 pt-6 pb-8 sm:px-6 sm:pt-12 sm:pb-14 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-white" />
        <div className="absolute top-0 right-1/4 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold text-purple-700">
              <Sparkles className="h-3 w-3" />
              AI-POWERED — Free to Try
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Free <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{role.title}</span> Cover Letter Generator
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Write a winning {role.title} cover letter in 30 seconds. AI-tailored to any job description.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-500">
              <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />100% Free</span>
              <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />4 Tones</span>
              <span className="flex items-center gap-1 sm:gap-1.5"><Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />Job-Tailored</span>
            </div>

            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Link
                href={TOOL_URL}
                style={{ background: "linear-gradient(to right, #7c3aed, #ec4899)", color: "#fff" }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold hover:opacity-90 active:scale-95 transition shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Write My Cover Letter
              </Link>
              <Link
                href={`/resume-for/${role.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-gray-700 hover:border-[#075a01] active:scale-95 transition"
              >
                Resume Builder →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE COVER LETTER */}
      <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              <span className="text-purple-600">{role.title}</span> Cover Letter Example
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 px-2">Real example written for {role.title} candidates. Use as inspiration.</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-8 border border-gray-200 shadow-sm">
            <div className="font-serif text-[13px] sm:text-base text-gray-800 leading-relaxed space-y-3 sm:space-y-4">
              {sampleParagraphs.map((para, i) => (
                <p key={i} className="whitespace-pre-line">{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-5 sm:mt-6 text-center">
            <Link
              href={TOOL_URL}
              style={{ background: "linear-gradient(to right, #7c3aed, #ec4899)", color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold hover:opacity-90 active:scale-95 transition"
            >
              <Sparkles className="h-4 w-4" />
              Generate My Own (Free)
            </Link>
          </div>
        </div>
      </section>

      {/* KEY SKILLS TO MENTION */}
      <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Key Skills to Mention in Your <span className="text-purple-600">{role.title}</span> Cover Letter
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 px-2">Highlight these skills to grab the hiring manager's attention.</p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center max-w-3xl mx-auto">
            {role.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING TIPS — 2 cols on mobile */}
      <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              <span className="text-purple-600">{role.title}</span> Cover Letter Tips
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-4xl mx-auto">
            {[
              { title: "Open With a Hook", desc: `Skip "I'm writing to apply..." Start with what makes you uniquely qualified.` },
              { title: "Quantify Achievements", desc: "Use numbers, percentages, and concrete results." },
              { title: "Mirror Job Description", desc: `Use keywords from the job posting. ATS systems scan for ${role.title} terms.` },
              { title: "Show Company Knowledge", desc: "Reference the company's products, mission, or recent news." },
              { title: "Keep It Short", desc: "250-400 words. Hiring managers spend under 60 seconds reading." },
              { title: "End Confidently", desc: "Strong call to action. Express enthusiasm for next steps." },
            ].map((tip, i) => (
              <div key={i} className="rounded-lg sm:rounded-xl bg-white p-2.5 sm:p-4 border border-gray-100">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 shrink-0" />
                  <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">{tip.title}</p>
                </div>
                <p className="text-[10px] sm:text-sm text-gray-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES — 2 cols on mobile */}
      <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Avoid These <span className="text-red-600">Cover Letter Mistakes</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-3xl mx-auto">
            {[
              "Generic templates with no personalization",
              "Repeating exactly what's on your resume",
              "Spelling/grammar errors (always proofread)",
              "Wrong company name or hiring manager",
              "Focusing on what you want, not what you offer",
              `Not mentioning specific ${role.title} skills`,
              "Cover letter too long (over 500 words)",
              "Weak opening: 'I'm writing to apply...'",
            ].map((mistake, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-red-50 border border-red-100 p-2.5 sm:p-3">
                <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-sm text-gray-800 leading-snug">{mistake}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {role.title} Cover Letter <span className="text-purple-600">FAQs</span>
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white border border-gray-200 p-3 sm:p-4 hover:border-purple-300 transition">
                <summary className="flex items-center justify-between cursor-pointer list-none gap-2">
                  <p className="font-semibold text-gray-900 text-[13px] sm:text-sm">{faq.q}</p>
                  <div className="shrink-0 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-purple-600 group-open:text-white transition">
                    <span className="text-xs sm:text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-2 sm:mt-3 text-[12px] sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED ROLES — 2 cols on mobile + 3rd full-width */}
      {relatedRoles.length > 0 && (
        <section className="px-4 py-8 sm:px-6 sm:py-14 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Related <span className="text-purple-600">{role.category}</span> Cover Letters
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {relatedRoles.map((related, idx) => (
                <Link
                  key={related.slug}
                  href={`/cover-letter-for/${related.slug}`}
                  className={`rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 hover:border-purple-500 hover:shadow-md transition group ${idx === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mb-1.5 sm:mb-2" />
                  <p className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight line-clamp-2">{related.title} Cover Letter</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">{related.salary.us}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-purple-600 group-hover:gap-2 transition-all">
                    Write now <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-5 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-400/20 rounded-full blur-3xl" />

            <div className="relative">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white mx-auto mb-2 sm:mb-3" />
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Write Your {role.title} Cover Letter in 30 Seconds
              </h2>
              <p className="mt-2 text-xs sm:text-base text-white/80 max-w-xl mx-auto px-2">
                AI-powered. Free forever. Tailored to any job description.
              </p>
              <Link
                href={TOOL_URL}
                className="mt-4 sm:mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-bold text-purple-600 hover:bg-gray-100 active:scale-95 transition"
              >
                Start Writing Free <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-white/70">No credit card · 4 tones available · Free download</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}