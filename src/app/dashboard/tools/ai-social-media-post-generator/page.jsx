import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLimits, isPro } from "@/lib/pricing";
import { getTodayUsage } from "@/lib/usage";
import SocialMediaPostWorkspace from "@/components/social-media-post/SocialMediaPostWorkspace";

export const metadata = {
  title: "AI Social Media Post Generator | Fancy Digitals",
  description:
    "Generate scroll-stopping posts for Instagram, LinkedIn, Twitter, TikTok, Facebook, YouTube, Threads and Pinterest in seconds.",
};

export default async function SocialMediaPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard/tools/ai-social-media-post-generator");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan || "FREE";
  const limits = getLimits(plan);
  const todayUsage = await getTodayUsage("ai-social-media-post");
  const userIsPro = isPro(plan);

  return (
    <SocialMediaPostWorkspace
      user={user}
      profile={profile}
      plan={plan}
      limits={limits}
      todayUsage={todayUsage}
      userIsPro={userIsPro}
      dailyLimit={limits.socialPostPerDay}
    />
  );
}