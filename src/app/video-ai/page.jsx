import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Workspace from "./components/Workspace";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Video Generator — Fancy Digitals",
  description: "Create Hollywood-quality AI videos in 60 seconds.",
};

export default async function VideoAIPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin?redirect=/video-ai");
  }

  // Load plan for the client
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan || "FREE";

  return <Workspace user={user} plan={plan} />;
}