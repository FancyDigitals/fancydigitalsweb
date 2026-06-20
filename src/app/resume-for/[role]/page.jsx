import { JOB_ROLES } from "@/data/job-roles";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText, Sparkles, Check, Star, ArrowRight, Zap, Crown,
  TrendingUp, Users, Award, Target, AlertCircle, Briefcase,
  DollarSign, BookOpen, ChevronRight,
} from "lucide-react";

const BASE_URL = "https://fancydigitals.com.ng";
const TOOL_URL = "/dashboard/tools/ai-resume-builder";

// Generate all 50 pages at build time
export async function generateStaticParams() {
  return JOB_ROLES.map((role) => ({
    role: role.slug,
  }));
}

// Dynamic metadata per role
export async function generateMetadata({ params }) {
  const { role: roleSlug } = await params;
  const role = JOB_ROLES.find((r) => r.slug === roleSlug);

  if (!role) {
    return { title: "Resume Template — Fancy Digitals" };
  }

  return {
    title: `${role.title} Resume — Free AI Builder + Examples | Fancy Digitals`,
    description: `Build a professional ${role.title} resume in 30 seconds with AI. ATS-optimized templates, real examples, and tips that get interviews. Free to start.`,
    keywords: role.keywords,
    alternates: { canonical: `${BASE_URL}/resume-for/${role.slug}` },
    openGraph: {
      title: `${role.title} Resume Builder — Free AI Tool`,
      description: `Free AI-powered ${role.title} resume builder. ATS-optimized templates and examples.`,
      url: `${BASE_URL}/resume-for/${role.slug}`,
      item: `${BASE_URL}/resume-for/${role.slug}`,
      type: "website",
    },
  };
}

export default async function RoleResumePage({ params }) {
  const { role: roleSlug } = await params;
  const role = JOB_ROLES.find((r) => r.slug === roleSlug);

  if (!role) notFound();

  // Get 3 related roles from same category
  const relatedRoles = JOB_ROLES
    .filter((r) => r.category === role.category && r.slug !== role.slug)
    .slice(0, 3);

  // Schema markup
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${role.title} Resume Builder - Fancy Digitals`,
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
      q: `How do I write a ${role.title} resume that stands out?`,
      a: `A great ${role.title} resume highlights quantified achievements, uses keywords from the job description, and showcases relevant skills like ${role.skills.slice(0, 3).join(", ")}. Use our AI resume builder to generate ATS-optimized content in 30 seconds.`,
    },
    {
      q: `What skills should I include on a ${role.title} resume?`,
      a: `Top skills for ${role.title} resumes include: ${role.skills.slice(0, 10).join(", ")}. Tailor your skill list to match the specific job description and prioritize technical and soft skills relevant to the role.`,
    },
    {
      q: `How long should a ${role.title} resume be?`,
      a: `Most ${role.title} resumes should be 1 page for entry-level and 1-2 pages for experienced professionals. Focus on the most recent and relevant experience, achievements, and skills. Quality over quantity always wins.`,
    },
    {
      q: `What's the average ${role.title} salary?`,
      a: `${role.title} salaries vary by location and experience. In the US, expect ${role.salary.us}. In Nigeria, ${role.salary.ng}. Globally, the range is ${role.salary.global}. Your resume should target the upper range by emphasizing impact and experience.`,
    },
    {
      q: `Should I include a summary on my ${role.title} resume?`,
      a: `Yes. A 2-3 sentence professional summary at the top of your ${role.title} resume helps recruiters quickly understand your value. Mention years of experience, key skills, and biggest achievement. Our AI tool writes this automatically.`,
    },
    {
      q: `How do I make my ${role.title} resume ATS-friendly?`,
      a: `To pass Applicant Tracking Systems (ATS): use standard fonts, include keywords from the job description, avoid graphics or tables, use clear section headings (Experience, Education, Skills), and save as PDF. Our AI builder generates ATS-friendly resumes automatically.`,
    },
    {
      q: `What are common mistakes on ${role.title} resumes?`,
      a: `Common mistakes include: ${role.commonMistakes.slice(0, 3).join("; ")}. Avoid these and your resume will instantly stand out from 80% of applicants.`,
    },
    {
      q: `Can I build a ${role.title} resume for free?`,
      a: `Yes! Fancy Digitals AI Resume Builder is 100% free. Generate up to 3 ${role.title} resumes per day with no credit card required. Upgrade to Pro for unlimited resumes and premium templates.`,
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
      { "@type": "ListItem", position: 3, name: `${role.title} Resume`, item: `${BASE_URL}/resume-for-${role.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="px-4 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <li><Link href="/" className="hover:text-[#075a01]">Home</Link></li>
            <ChevronRight className="h-3 w-3" />
            <li><Link href="/tools" className="hover:text-[#075a01]">Tools</Link></li>
            <ChevronRight className="h-3 w-3" />
            <li className="text-gray-900 font-semibold truncate">{role.title} Resume</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-4 pt-8 pb-10 sm:px-6 sm:pt-12 sm:pb-14 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#075a01]/5 via-white to-white" />
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-[#075a01]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 mb-4 text-xs font-bold text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              FREE — No Sign-Up Required
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Free <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">{role.title}</span> Resume Builder
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Build an ATS-optimized {role.title} resume in 30 seconds. AI-powered with real examples and proven templates.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />100% Free</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />ATS-Optimized</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#075a01]" />30 Seconds</span>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={TOOL_URL}
                style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold hover:opacity-90 transition shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Build My {role.title} Resume
              </Link>
              <Link
                href={`/cover-letter-for/${role.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:border-[#075a01] transition"
              >
                Cover Letter Builder →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SALARY + OVERVIEW */}
<section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-10 bg-gray-50">
  <div className="mx-auto max-w-5xl">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Salary Card */}
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm">
  <div className="flex items-center gap-2 mb-2 sm:mb-3">
    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#075a01]" />
    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">Average Salary</h3>
  </div>
  <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <p><span className="font-bold text-gray-900">🇺🇸 USA:</span> <span className="text-gray-700">{role.salary.us}</span></p>
                <p><span className="font-bold text-gray-900">🇳🇬 Nigeria:</span> <span className="text-gray-700">{role.salary.ng}</span></p>
                <p><span className="font-bold text-gray-900">🌍 Global:</span> <span className="text-gray-700">{role.salary.global}</span></p>
              </div>
            </div>

            {/* Overview Card — Spans 2 columns on desktop */}
            <div className="lg:col-span-2 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm">
  <div className="flex items-center gap-2 mb-2 sm:mb-3">
    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#075a01]" />
    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">What {role.title}s Do</h3>
  </div>
  <p className="text-xs sm:text-base text-gray-700 leading-relaxed">{role.overview}</p>
</div>
          </div>
        </div>
      </section>

      {/* TOP SKILLS */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Top Skills for <span className="text-[#075a01]">{role.title} Resumes</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">These are the most in-demand skills hiring managers look for.</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {role.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-[#075a01]/8 text-[#075a01] font-semibold border border-[#075a01]/15"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE BULLETS */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              <span className="text-[#075a01]">{role.title}</span> Resume Examples
            </h2>
            <p className="mt-2 text-sm text-gray-600">Real bullet points that get interviews. Copy or use as inspiration.</p>
          </div>

          <div className="space-y-2 sm:space-y-3">
  {role.exampleBullets.map((bullet, i) => (
    <div key={i} className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 border border-gray-100 shadow-sm">
      <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#075a01] text-white text-[10px] sm:text-xs font-bold">
        {i + 1}
      </div>
      <p className="text-xs sm:text-base text-gray-800 leading-snug sm:leading-relaxed">{bullet}</p>
    </div>
  ))}
</div>

          <div className="mt-8 text-center">
            <Link
              href={TOOL_URL}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold hover:opacity-90 transition"
            >
              <Sparkles className="h-4 w-4" />
              Generate My Own Examples (AI)
            </Link>
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Common <span className="text-red-600">Mistakes</span> to Avoid
            </h2>
            <p className="mt-2 text-sm text-gray-600">Don't let these errors disqualify your application.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-3xl mx-auto">
  {role.commonMistakes.map((mistake, i) => (
    <div key={i} className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-red-50 border border-red-100 p-2.5 sm:p-4">
      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0 mt-0.5" />
      <p className="text-[11px] sm:text-sm text-gray-800 leading-snug sm:leading-relaxed">{mistake}</p>
    </div>
  ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Build Your Resume in <span className="text-[#075a01]">3 Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
  {[
    { title: "Enter Info", desc: `Fill in your ${role.title} experience and skills` },
    { title: "AI Writes", desc: "AI generates ATS-optimized content in 30 seconds" },
    { title: "Download", desc: "Get your professional resume as PDF instantly" },
  ].map((step, i) => (
    <div key={i} className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 text-center">
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white text-base sm:text-xl font-bold mb-2 sm:mb-3">
        {i + 1}
      </div>
      <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{step.title}</h3>
      <p className="text-[11px] sm:text-sm text-gray-600 leading-snug">{step.desc}</p>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {role.title} Resume <span className="text-[#075a01]">FAQs</span>
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white border border-gray-200 p-4 hover:border-[#075a01]/30 transition">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <p className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</p>
                  <div className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 group-open:bg-[#075a01] group-open:text-white transition">
                    <span className="text-sm font-bold">+</span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED ROLES */}
      {relatedRoles.length > 0 && (
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10 bg-gray-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Related <span className="text-[#075a01]">{role.category}</span> Resumes
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
  {relatedRoles.map((related, idx) => (
    <Link
      key={related.slug}
      href={`/resume-for/${related.slug}`}
      className={`rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 hover:border-[#075a01] hover:shadow-md transition group ${idx === 2 ? "col-span-2 sm:col-span-1" : ""}`}
    >
      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-[#075a01] mb-1.5 sm:mb-2" />
      <p className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1 leading-tight line-clamp-2">{related.title} Resume</p>
      <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">{related.salary.us}</p>
      <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#075a01] group-hover:gap-2 transition-all">
        Build now <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  ))}
</div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-400/20 rounded-full blur-3xl" />

            <div className="relative">
              <Sparkles className="h-10 w-10 text-white mx-auto mb-3" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Ready to land your {role.title} role?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
                Build a professional {role.title} resume in 30 seconds. Free forever.
              </p>
              <Link
                href={TOOL_URL}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#075a01] hover:bg-gray-100 transition"
              >
                Start Building Free <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-xs text-white/70">No credit card · ATS-optimized · Download as PDF</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}