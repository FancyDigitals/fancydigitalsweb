import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  Star,
  Building2,
  Lightbulb,
  BarChart3,
  Swords,
  Wallet,
  Rocket,
  Settings,
  TrendingUp,
  Briefcase,
  Paperclip,
  LineChart,
  Users,
  Wrench,
  ShoppingCart,
  Target,
  Handshake,
  Sparkles,
  Megaphone,
  Search,
  ClipboardList,
} from "lucide-react";

export const dynamic = "force-dynamic";

function getSectionIcon(type) {
  const icons = {
    cover: FileText,
    "executive-summary": Star,
    "company-overview": Building2,
    "problem-solution": Lightbulb,
    "market-analysis": BarChart3,
    "competitive-analysis": Swords,
    "business-model": Wallet,
    "go-to-market": Rocket,
    operations: Settings,
    "financial-projections": TrendingUp,
    "funding-requirements": Briefcase,
    appendix: Paperclip,
    traction: LineChart,
    team: Users,
    "product-overview": Wrench,
    "products-services": ShoppingCart,
    "services-overview": Target,
    "programs-services": Handshake,
    "mission-vision": Sparkles,
    "marketing-strategy": Megaphone,
    "market-need": Search,
  };
  return icons[type] || ClipboardList;
}

export async function generateMetadata({ params }) {
  const token = params?.token;
  if (!token) return { title: "Business Plan" };

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data } = await supabase
      .from("business_plans")
      .select("title, industry")
      .eq("share_token", token)
      .eq("is_public", true)
      .single();

    if (!data) return { title: "Business Plan — Fancy Digitals" };

    return {
      title: `${data.title} — Business Plan`,
      description: `View this AI-generated business plan${data.industry ? ` for ${data.industry}` : ""} created with Fancy Digitals.`,
    };
  } catch {
    return { title: "Business Plan — Fancy Digitals" };
  }
}

export default async function PublicBusinessPlanPage({ params }) {
  const token = params?.token;
  if (!token) notFound();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: plan, error } = await supabase
    .from("business_plans")
    .select("*")
    .eq("share_token", token)
    .eq("is_public", true)
    .single();

  if (error || !plan) notFound();

  const sections = plan.sections || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01] shrink-0">
              <FileText className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">
              {plan.title}
            </p>
          </div>
          <Link
            href="/dashboard/tools/ai-business-plan-generator"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-2 text-xs font-bold text-white hover:from-[#064c01] hover:to-[#087a01] shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Create yours free
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 sm:p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            {plan.document_type}
            {plan.industry && ` · ${plan.industry}`}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black">{plan.title}</h1>
          {plan.input_data?.tagline && (
            <p className="mt-2 text-white/80 text-sm">{plan.input_data.tagline}</p>
          )}
          <p className="mt-4 text-xs text-white/70">
            Generated with Fancy Digitals AI Business Plan Generator
          </p>
        </div>

        {plan.executive_summary && (
          <div className="rounded-2xl border border-[#075a01]/15 bg-[#075a01]/5 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#075a01]/10">
                <Star className="h-3.5 w-3.5 text-[#075a01]" />
              </div>
              <h2 className="text-sm font-bold text-gray-900">
                Executive Summary
              </h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {plan.executive_summary}
            </p>
          </div>
        )}

        {sections.map((section, index) => {
          const SectionIcon = getSectionIcon(section.type);
          return (
            <div
              key={section.id || index}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#075a01]/10">
                  <SectionIcon className="h-4 w-4 text-[#075a01]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {section.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-5 py-5 space-y-4">
                {section.content && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                )}

                {section.callout && (
                  <div className="rounded-xl bg-[#075a01]/5 border border-[#075a01]/15 px-4 py-3">
                    <p className="text-sm font-semibold text-[#075a01]">
                      {section.callout}
                    </p>
                  </div>
                )}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2">
                    {section.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01] shrink-0" />
                        <span className="text-sm text-gray-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.stats && section.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {section.stats.map((stat, si) => (
                      <div
                        key={si}
                        className="rounded-xl bg-gray-50 border border-gray-100 p-3"
                      >
                        <p className="text-xl font-black text-[#075a01]">
                          {stat.value}
                        </p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">
                          {stat.label}
                        </p>
                        {stat.description && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {stat.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.table &&
                  section.table.headers &&
                  section.table.rows && (
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            {section.table.headers.map((h, hi) => (
                              <th
                                key={hi}
                                className="px-3 py-2.5 text-left text-xs font-bold text-gray-600 whitespace-nowrap"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr
                              key={ri}
                              className="border-t border-gray-50"
                            >
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="px-3 py-2 text-xs text-gray-700"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 text-center text-white">
          <h3 className="text-lg font-black">
            Create your own business plan free
          </h3>
          <p className="mt-1 text-sm text-white/80">
            AI writes your full business plan in 60 seconds.
          </p>
          <Link
            href="/dashboard/tools/ai-business-plan-generator"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#075a01] hover:bg-white/90 transition"
          >
            <FileText className="h-4 w-4" />
            Get started free
          </Link>
        </div>
      </div>
    </div>
  );
}