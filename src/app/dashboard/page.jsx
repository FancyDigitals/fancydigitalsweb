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
} from "lucide-react";

export const metadata = {
  title: "Dashboard — Fancy Digitals",
};

export default async function DashboardPage() {
  const profile = await getUserProfile();
  const isPro = profile?.plan !== "free";
  const displayName = profile?.full_name || profile?.email?.split("@")[0];

  // Get real stats
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

  return (
    <>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, {displayName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s your account overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {/* Plan */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <Crown className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Plan</p>
            </div>
            {isPro && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase">
                Active
              </span>
            )}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
            {profile?.plan?.replace("_", " ") || "Free"}
          </p>
          {!isPro && (
            <Link href="/pricing" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#075a01] hover:underline">
              Upgrade <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {/* Generations */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <BarChart2 className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today</p>
          </div>
          <div className="flex items-end gap-1">
  <p className="text-xl sm:text-2xl font-bold text-gray-900">{generationsToday}</p>
  {!isPro && <p className="text-sm text-gray-400 mb-0.5">/ daily</p>}
</div>
          <p className="mt-1 text-xs text-gray-500">
            {isPro ? "Unlimited generations" : "Free per day"}
          </p>
          {!isPro && (
            <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#075a01] to-[#0a8f01] transition-all"
                style={{ width: "0%" }}
              />
            </div>
          )}
        </div>

        {/* Projects */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
              <FolderOpen className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Projects</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalProjects}</p>
          <Link href="/dashboard/projects" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#075a01] hover:underline">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Quick Access */}
      <div className="rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Quick Access</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
  href="/dashboard/tools/ai-cover-letter"
  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 sm:p-4 hover:border-purple-500 hover:bg-purple-50/50 active:scale-[0.98] transition-all"
>
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50">
    <Mail className="h-5 w-5 text-purple-600" />
  </div>
  <div className="min-w-0">
    <p className="font-bold text-gray-900 text-sm">AI Cover Letter</p>
    <p className="text-xs text-gray-500">Tailored to any job</p>
  </div>
</Link>

          <Link
            href="/pricing"
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 sm:p-4 hover:border-[#ff914d] hover:bg-orange-50/50 active:scale-[0.98] transition-all"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff914d]/10">
              <Zap className="h-5 w-5 text-[#ff914d]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 text-sm">Upgrade Plan</p>
              <p className="text-xs text-gray-500">Unlock pro features</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Upgrade Banner */}
      {!isPro && (
        <div className="rounded-2xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm sm:text-base">
                Unlock unlimited generations
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-0.5">
                Remove all daily limits. Cancel anytime.
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="w-full sm:w-auto shrink-0 rounded-xl bg-white px-5 py-2.5 text-center text-sm font-bold text-[#075a01] hover:bg-gray-100 active:scale-95 transition-all"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </>
  );
}