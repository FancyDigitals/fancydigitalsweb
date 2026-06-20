import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTodayUsage, getLimitForTool } from "@/lib/usage";
import CoverLetterClient from "./client";

export const metadata = {
  title: "AI Cover Letter Generator — Free ATS-Optimized | Fancy Digitals",
  description:
    "Generate professional cover letters tailored to any job in 30 seconds. AI-powered, ATS-friendly, free preview. Pair with our resume builder for complete job applications.",
  keywords: [
    "ai cover letter generator",
    "free cover letter builder",
    "cover letter maker",
    "cover letter ai",
    "ats cover letter",
    "professional cover letter generator",
  ],
};

export default async function CoverLetterPage({ searchParams }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin?redirect=/dashboard/tools/ai-cover-letter");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, full_name, email")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan !== "free";
  const todayUsage = await getTodayUsage("ai-cover-letter");
  const limit = getLimitForTool("ai-cover-letter");

  // Try to load most recent resume to prefill data
  const params = await searchParams;
  let prefillData = null;

  if (params?.from === "resume") {
    const { data: lastResume } = await supabase
      .from("projects")
      .select("input_data, output_data")
      .eq("user_id", user.id)
      .eq("tool_slug", "ai-resume-builder")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (lastResume) {
      prefillData = {
        fullName: lastResume.input_data?.fullName,
        email: lastResume.input_data?.email,
        phone: lastResume.input_data?.phone,
        location: lastResume.input_data?.location,
        targetRole: lastResume.input_data?.targetRole,
        background: lastResume.output_data?.summary,
      };
    }
  }

  return (
    <CoverLetterClient
      isPro={isPro}
      initialUsage={todayUsage}
      limit={limit}
      userEmail={profile?.email}
      userName={profile?.full_name}
      prefillData={prefillData}
    />
  );
}