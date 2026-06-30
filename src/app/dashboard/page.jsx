import { getUserProfile } from "@/lib/auth/actions";
import Link from "next/link";
import {
  Wrench,
  Zap,
  FolderOpen,
  Crown,
  BarChart2,
  ChevronRight,
  Sparkles,
  Settings,
  FileText,
  Mail,
  Globe,
  ScanSearch,
} from "lucide-react";

export const metadata = {
  title: "Dashboard — Fancy Digitals",
};

export default async function DashboardPage() {
  const profile = await getUserProfile();
  const isPro = profile?.plan !== "free";
  const displayName = profile?.full_name || profile?.email?.split("@")[0];

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const today = new Date().toISOString().split("T")[0];

  const [{ count: projectCount }, { data: todayUsage }] = await Promise.all([
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user?.id),
    supabase
      .from("usage")
      .select("count")
      .eq("user_id", user?.id)
      .eq("date", today),
  ]);

  const totalProjects = projectCount || 0;
  const generationsToday = todayUsage?.reduce((sum, u) => sum + (u.count || 0), 0) || 0;
  const dailyLimit = isPro ? null : 3;
  const usagePercent = isPro ? 100 : Math.min((generationsToday / dailyLimit) * 100, 100);

  return (
    <>
      {/* Welcome */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
          Welcome back, {displayName}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Here&apos;s your account overview.
        </p>
      </div>

      {/* Stat Cards — 3 cols on mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {/* Plan */}
        <div className="rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-purple-50">
              <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
            </div>
            {isPro && (
              <span className="hidden sm:inline-flex rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase">
                Active
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Plan</p>
          <p className="text-sm sm:text-2xl font-bold text-gray-900 capitalize truncate">
            {profile?.plan?.replace("_", " ") || "Free"}
          </p>
          {!isPro && (
            <Link
              href="/pricing"
              className="mt-1.5 sm:mt-2 inline-flex items-center gap-0.5 text-[10px] sm:text-sm font-semibold text-[#075a01] hover:underline"
            >
              Upgrade <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Link>
          )}
        </div>

        {/* Generations Today */}
        <div className="rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-blue-50 mb-2 sm:mb-3">
            <BarChart2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Today</p>
          <div className="flex items-baseline gap-0.5">
            <p className="text-sm sm:text-2xl font-bold text-gray-900">{generationsToday}</p>
            {!isPro && <p className="text-[10px] sm:text-sm text-gray-400">/{dailyLimit}</p>}
          </div>
          <p className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs text-gray-500 line-clamp-1">
            {isPro ? "Unlimited" : "Free per day"}
          </p>
          {!isPro && (
            <div className="mt-1.5 sm:mt-2 h-1 sm:h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#0a8f01] transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg bg-orange-50 mb-2 sm:mb-3">
            <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Projects</p>
          <p className="text-sm sm:text-2xl font-bold text-gray-900">{totalProjects}</p>
          <Link
            href="/dashboard/projects"
            className="mt-1.5 sm:mt-2 inline-flex items-center gap-0.5 text-[10px] sm:text-sm font-semibold text-[#075a01] hover:underline"
          >
            View all <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </Link>
        </div>
      </div>

            {/* Quick Access — 2 cols on mobile, 3 cols on desktop */}
      <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-5 border border-gray-100 shadow-sm mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <h2 className="text-sm sm:text-lg font-bold text-gray-900">Quick Access</h2>
          <Link
            href="/tools"
            className="text-[10px] sm:text-xs font-semibold text-[#075a01] hover:underline flex items-center gap-0.5"
          >
            All tools <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">

          {/* AI Resume */}
          <Link
            href="/dashboard/tools/ai-resume-builder"
            className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-[#075a01] hover:bg-[#075a01]/5 active:scale-[0.98] transition-all"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#075a01]/10">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[#075a01]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">AI Resume</p>
              <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">Build a resume</p>
            </div>
          </Link>

          {/* Cover Letter */}
          <Link
            href="/dashboard/tools/ai-cover-letter"
            className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-purple-500 hover:bg-purple-50/50 active:scale-[0.98] transition-all"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-purple-50">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">Cover Letter</p>
              <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">Tailored to job</p>
            </div>
          </Link>

          {/* AI Landing Page */}
          <Link
            href="/dashboard/tools/ai-landing-page-generator"
            className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-blue-500 hover:bg-blue-50/50 active:scale-[0.98] transition-all"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-blue-50">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">Landing Page</p>
              <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">AI generated</p>
            </div>
          </Link>

          {/* AI Visibility */}
          <Link
            href="/dashboard/ai-visibility"
            className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-emerald-500 hover:bg-emerald-50/50 active:scale-[0.98] transition-all"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-emerald-50">
              <ScanSearch className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">AI Readiness</p>
              <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">Scan your site</p>
            </div>
          </Link>

          {/* My Projects */}
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-orange-500 hover:bg-orange-50/50 active:scale-[0.98] transition-all"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-orange-50">
              <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">My Projects</p>
              <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">Saved work</p>
            </div>
          </Link>

          {/* Upgrade (only show if not Pro) */}
          {!isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-4 hover:border-[#ff914d] hover:bg-orange-50/50 active:scale-[0.98] transition-all"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#ff914d]/10">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff914d]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 text-[11px] sm:text-sm leading-tight">Upgrade</p>
                <p className="text-[9px] sm:text-xs text-gray-500 line-clamp-1">Pro features</p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Upgrade Banner */}
      {!isPro && (
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] p-3 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-white/15 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-xs sm:text-base leading-tight">
                  Unlock unlimited generations
                </p>
                <p className="text-[10px] sm:text-sm text-white/80 mt-0.5 leading-snug">
                  Remove daily limits. Cancel anytime.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="w-full sm:w-auto shrink-0 rounded-lg sm:rounded-xl bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-center text-xs sm:text-sm font-bold text-[#075a01] hover:bg-gray-100 active:scale-95 transition-all"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}