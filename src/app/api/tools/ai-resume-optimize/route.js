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

    const prompt = `You are a real human resume writer with 15 years of experience helping people land jobs. Your job is to rewrite the resume below to better match the target role — but you MUST sound like a real person, NOT an AI.

⚠️ ABSOLUTE RULES:
1. NEVER invent jobs, companies, dates, or facts. Only use what's already in the resume.
2. Keep every company name, role title, duration, and education entry EXACTLY the same.
3. Only rewrite the SUMMARY and EXPERIENCE BULLETS to be stronger.
4. Reorder skills to put most relevant first. Can add 2-3 obviously related skills.

🚫 BANNED WORDS/PHRASES (these scream "AI wrote this"):
- "Spearheaded"
- "Leveraged"
- "Synergize" or "synergies"
- "Cutting-edge"
- "Innovative" (overused)
- "Demonstrated proficiency in"
- "Possesses strong..."
- "Results-driven professional"
- "Detail-oriented individual"
- "Excels at"
- "Adept at"
- "Proven track record of"
- "Seamlessly"
- "Robust"
- "Holistic"
- "Strategic alignment"
- "Drive value"
- "Best-in-class"
- "Industry-leading"
- "Game-changing"
- "Synergistic"

✅ INSTEAD, use real, simple language:
- "Led" not "Spearheaded"
- "Used" not "Leveraged"
- "Built" not "Architected"
- "Helped" not "Facilitated"
- "Worked with" not "Collaborated cross-functionally"
- "Made" not "Drove"

GOOD BULLET EXAMPLES (sound human):
- "Cut server costs by 40% by moving 3 apps to serverless"
- "Hired and trained 4 new engineers, all still on the team 2 years later"
- "Built the checkout flow that's now used by 200K customers a month"
- "Fixed a billing bug that was costing the company $30K/month"

BAD BULLET EXAMPLES (sound like AI — DO NOT WRITE LIKE THIS):
- "Spearheaded comprehensive infrastructure migration initiatives leveraging serverless architecture"
- "Demonstrated proficiency in talent acquisition by onboarding multiple high-caliber engineering professionals"
- "Architected scalable checkout solutions driving significant customer value"

RESUME TO REWRITE:
Name: ${resume.fullName}
Current Title: ${resume.title}
Current Summary: ${resume.summary}
Current Skills: ${resume.skills?.join(", ")}

Experience:
${resume.experience?.map((e, i) => `
${i + 1}. ${e.role} at ${e.company} (${e.duration})
Current bullets:
${e.bullets?.map(b => `   - ${b}`).join("\n")}
`).join("\n")}

Education: ${resume.education?.map(e => `${e.degree}, ${e.school} (${e.year})`).join("; ")}

TARGET JOB DESCRIPTION:
${jobDescription.slice(0, 2000)}

KEYWORDS TO INCLUDE NATURALLY (don't force them — only if they fit):
${missingKeywords?.slice(0, 10).join(", ")}

NOW REWRITE:
- Summary: 2-3 sentences max. Conversational. Mentions what they actually do and what they've done. NO buzzwords.
- Each bullet: Start with a strong verb. Include a specific number or outcome. Max 20 words. Sounds like a real person describing their work.
- Skills: Reorder to match job priority. Add 2-3 truly relevant skills if missing.

Return JSON:
{
  "fullName": "${resume.fullName}",
  "title": "may slightly update to match target",
  "contact": ${JSON.stringify(resume.contact || {})},
  "summary": "natural, human-sounding summary",
  "experience": [
    { "role": "EXACTLY SAME", "company": "EXACTLY SAME", "duration": "EXACTLY SAME", "location": "EXACTLY SAME", "bullets": ["human-sounding bullet with numbers"] }
  ],
  "education": ${JSON.stringify(resume.education || [])},
  "skills": ["reordered with most relevant first"]
}

Remember: A real hiring manager will read this. Make it sound like a smart, capable person wrote it about themselves — not like an AI tried to impress them.`;

    const optimized = await generateJSON(prompt);

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