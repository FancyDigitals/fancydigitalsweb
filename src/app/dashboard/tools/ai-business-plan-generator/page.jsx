import { getUserProfile } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { getLimits, isPro } from "@/lib/pricing";
import BusinessPlanWorkspace from "@/components/business-plan/BusinessPlanWorkspace";

export const metadata = {
  title: "AI Business Plan Generator — Fancy Digitals",
  description:
    "Generate a complete, investor-ready business plan in 60 seconds using AI. Executive summary, market analysis, financials, and more.",
};

export default async function BusinessPlanPage() {
  const profile = await getUserProfile();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const plan = profile?.plan || "FREE";
  const limits = getLimits(plan);
  const userIsPro = isPro(plan);

  const today = new Date().toISOString().split("T")[0];
  const { data: usageRow } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", user?.id)
    .eq("tool_slug", "ai-business-plan")
    .eq("date", today)
    .maybeSingle();

  const usedToday = usageRow?.count || 0;
  const dailyLimit = limits.businessPlanPerDay;
  const remaining =
    dailyLimit === Infinity ? Infinity : Math.max(0, dailyLimit - usedToday);

  return (
    <BusinessPlanWorkspace
      plan={plan}
      isPro={userIsPro}
      usedToday={usedToday}
      dailyLimit={dailyLimit === Infinity ? null : dailyLimit}
      remaining={remaining === Infinity ? null : remaining}
      userEmail={profile?.email || ""}
    />
  );
}