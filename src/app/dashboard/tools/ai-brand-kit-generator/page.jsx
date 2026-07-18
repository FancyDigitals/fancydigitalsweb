import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLimits, isPro } from "@/lib/pricing";
import { getTodayUsage } from "@/lib/usage";
import BrandKitWorkspace from "@/components/brand-kit/BrandKitWorkspace";

export const metadata = {
  title: "AI Brand Kit Generator | Fancy Digitals",
  description:
    "Generate a complete brand identity in seconds — colors, typography, logos, business cards, and full brand guidelines. Download as a ZIP.",
};

export default async function BrandKitPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard/tools/ai-brand-kit-generator");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan || "FREE";
  const limits = getLimits(plan);
  const todayUsage = await getTodayUsage("ai-brand-kit");
  const userIsPro = isPro(plan);

  return (
    <BrandKitWorkspace
      user={user}
      profile={profile}
      plan={plan}
      limits={limits}
      todayUsage={todayUsage}
      userIsPro={userIsPro}
      dailyLimit={limits.brandKitPerDay}
      canExportZip={limits.brandKitZipExport}
    />
  );
}