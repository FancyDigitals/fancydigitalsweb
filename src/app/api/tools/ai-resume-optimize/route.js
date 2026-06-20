import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateJSON } from "@/lib/ai/gemini";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check Pro status — this feature is Pro-only
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (profile?.plan === "free") {
      return NextResponse.json(
        { error: "Resume optimization is a Pro feature. Upgrade to unlock." },
        { status: 403 }
      );
    }

    const { resume, jobDescription, missingKeywords } = await request.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description required" },
        { status: 400 }
      );
    }

    const prompt = `Rewrite this resume to match the job description. Use ONLY existing facts — never invent jobs, companies, or dates.

RESUME:
Name: ${resume.fullName}
Title: ${resume.title}
Summary: ${resume.summary}
Skills: ${resume.skills?.join(", ")}

Experience:
${resume.experience?.map((e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.duration})
Bullets: ${e.bullets?.join(" | ")}`).join("\n\n")}

Education: ${resume.education?.map(e => `${e.degree}, ${e.school} (${e.year})`).join("; ")}

JOB DESCRIPTION:
${jobDescription.slice(0, 2000)}

MISSING KEYWORDS to include naturally: ${missingKeywords?.slice(0, 10).join(", ")}

Rewrite summary, experience bullets, and reorder/expand skills. Keep all roles, companies, dates EXACTLY the same.

Return JSON:
{
  "fullName": "${resume.fullName}",
  "title": "may update",
  "contact": ${JSON.stringify(resume.contact || {})},
  "summary": "rewritten",
  "experience": [
    { "role": "same", "company": "same", "duration": "same", "location": "same", "bullets": ["rewritten with keywords"] }
  ],
  "education": ${JSON.stringify(resume.education || [])},
  "skills": ["reordered + new relevant ones"]
}

Make every word count. This is for a real job application.`;

    let optimized;
let attempts = 0;
const maxAttempts = 2;

while (attempts < maxAttempts) {
  try {
    optimized = await generateJSON(prompt);
    break;
  } catch (err) {
    attempts++;
    console.log(`Attempt ${attempts} failed:`, err.message);
    if (attempts >= maxAttempts) throw err;
    // Wait 3 seconds before retry
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

    // Preserve photo
    if (resume.photo) {
      optimized.photo = resume.photo;
    }

    // Save optimization to projects
    await supabase.from("projects").insert({
      user_id: user.id,
      tool_slug: "ai-resume-optimize",
      title: `${optimized.fullName} — Optimized for job`,
      prompt: "Resume optimization",
      input_data: { original: resume, jobDescription, missingKeywords },
      output_data: optimized,
    });

    return NextResponse.json({
      success: true,
      resume: optimized,
    });
  } catch (error) {
    console.error("Resume optimization error:", error);
    return NextResponse.json(
      { error: error.message || "Optimization failed" },
      { status: 500 }
    );
  }
}