import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateJSON } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName, email, phone, location, linkedIn, portfolio,
      targetRole, yearsExperience, summary, experiences, educations,
      skills, jobDescription, template,
    } = body;

    if (!fullName || !targetRole) {
      return NextResponse.json(
        { error: "Full name and target role are required" },
        { status: 400 }
      );
    }

    const usage = await checkAndIncrementUsage("ai-resume-builder");

    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.error, limit: usage.limit, used: usage.used },
        { status: 403 }
      );
    }

    const experienceText = (experiences || [])
      .filter((e) => e.role || e.company)
      .map((e, i) => `
Experience ${i + 1}:
- Role: ${e.role || "N/A"}
- Company: ${e.company || "N/A"}
- Duration: ${e.duration || "N/A"}
- Location: ${e.location || "N/A"}
- Description: ${e.description || "N/A"}`).join("\n");

    const educationText = (educations || [])
      .filter((e) => e.degree || e.school)
      .map((e, i) => `
Education ${i + 1}:
- Degree: ${e.degree || "N/A"}
- School: ${e.school || "N/A"}
- Year: ${e.year || "N/A"}
- Details: ${e.details || "N/A"}`).join("\n");

    const prompt = `You are a professional resume writer. Generate a polished ATS-optimized resume in JSON format.

⚠️ CRITICAL RULES — MUST FOLLOW:
1. ONLY use the information provided below. DO NOT invent companies, jobs, schools, or dates.
2. If user provided 2 experiences, output EXACTLY 2 experiences. Not more.
3. If user provided 1 education, output EXACTLY 1 education. Not more.
4. Enhance and rewrite bullet points professionally, but NEVER fabricate facts.
5. Use action verbs and add metrics where the user mentioned them.
6. If a field is "N/A" or empty, leave it empty in the output — don't make it up.

CANDIDATE INFORMATION:
- Full Name: ${fullName}
- Email: ${email || "N/A"}
- Phone: ${phone || "N/A"}
- Location: ${location || "N/A"}
- LinkedIn: ${linkedIn || "N/A"}
- Portfolio: ${portfolio || "N/A"}
- Target Role: ${targetRole}
- Total Years of Experience: ${yearsExperience || "N/A"}
- User-Written Summary: ${summary || "N/A — generate one based on data below"}
- Skills: ${skills || "N/A"}

WORK EXPERIENCE (${experiences?.filter(e => e.role || e.company).length || 0} entries):
${experienceText || "No work experience provided"}

EDUCATION (${educations?.filter(e => e.degree || e.school).length || 0} entries):
${educationText || "No education provided"}

${jobDescription ? `\nTARGET JOB DESCRIPTION (use keywords from this):\n${jobDescription}` : ""}

Return ONLY this JSON structure (no markdown, no explanation):

{
  "fullName": "string",
  "title": "professional title matching target role",
  "contact": {
    "email": "string or empty",
    "phone": "string or empty",
    "location": "string or empty",
    "linkedIn": "string or empty",
    "portfolio": "string or empty"
  },
  "summary": "3-4 sentence professional summary, ATS-optimized",
  "experience": [
    {
      "role": "exactly as user provided",
      "company": "exactly as user provided",
      "duration": "exactly as user provided",
      "location": "exactly as user provided or empty",
      "bullets": ["3-4 achievement bullets with metrics"]
    }
  ],
  "education": [
    {
      "degree": "exactly as user provided",
      "school": "exactly as user provided",
      "year": "exactly as user provided",
      "details": "exactly as user provided or empty"
    }
  ],
  "skills": ["skill1", "skill2", "..."]
}`;

    const resumeData = await generateJSON(prompt);

    const supabase = await createClient();
    await supabase.from("projects").insert({
      user_id: usage.userId,
      tool_slug: "ai-resume-builder",
      title: `${fullName} — ${targetRole}`,
      prompt: targetRole,
      input_data: body,
      output_data: resumeData,
    });

    return NextResponse.json({
      success: true,
      resume: { ...resumeData, photo: body.photo || null },
      usage: { used: usage.used, limit: usage.limit, isPro: usage.isPro },
    });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}