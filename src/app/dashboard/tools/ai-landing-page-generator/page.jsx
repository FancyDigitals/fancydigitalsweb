import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTodayUsage, getLimitForTool } from "@/lib/usage";
import LandingPageGeneratorClient from "./client";

export const metadata = {
  title: "AI Landing Page Generator | Fancy Digitals",
  description: "Generate high-converting landing pages with AI. Free 2/day. Pro for unlimited + HTML export.",
};

export default async function LandingPageGeneratorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin?redirect=/dashboard/tools/ai-landing-page-generator");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan && profile.plan !== "free";
  const usage = await getTodayUsage("ai-landing-page-generator");
  const limit = getLimitForTool("ai-landing-page-generator");

  return (
    <LandingPageGeneratorClient
      isPro={isPro}
      initialUsage={usage}
      limit={limit}
      userEmail={user.email}
      userName={profile?.full_name || ""}
    />
  );
}