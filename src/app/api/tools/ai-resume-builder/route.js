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

    const prompt = `You are a real human resume writer with 10+ years of experience helping people land interviews. Write this resume to sound like a smart, capable person describing their own work — NOT like an AI trying to impress.

⚠️ ABSOLUTE RULES:
1. ONLY use info provided below. NEVER invent companies, jobs, schools, dates, or achievements.
2. If user provided 2 experiences, output EXACTLY 2. Not more, not less.
3. If user provided 1 education, output EXACTLY 1. Not more.
4. Keep all dates, company names, role titles, schools EXACTLY as user wrote them.
5. If a field is empty or "N/A", leave it empty in output. Don't make stuff up.

🚫 BANNED WORDS/PHRASES (these scream "AI wrote this"):
- "Spearheaded"
- "Leveraged"
- "Synergize" or "synergies"
- "Cutting-edge"
- "Innovative" (overused)
- "Robust"
- "Holistic"
- "Best-in-class"
- "Industry-leading"
- "Game-changing"
- "Strategic alignment"
- "Drive value"
- "Empowered to..."
- "Results-driven professional"
- "Detail-oriented individual"
- "Demonstrated proficiency in"
- "Proven track record of"
- "Possesses strong..."
- "Excels at"
- "Adept at"
- "Seamlessly"
- "Wealth of experience"

✅ USE THESE INSTEAD (real verbs people use):
- "Led" not "Spearheaded"
- "Built" not "Architected"
- "Used" not "Leveraged"
- "Made" or "Created" not "Engineered"
- "Helped" not "Facilitated"
- "Worked with" not "Collaborated cross-functionally"
- "Cut" not "Reduced significantly"
- "Grew" not "Expanded substantially"
- "Shipped" / "Launched" / "Delivered" not "Drove implementation of"

GOOD BULLET EXAMPLES (sound human):
✓ "Cut server costs by 40% by moving 3 apps to serverless"
✓ "Hired and trained 4 engineers — all still on the team 2 years later"
✓ "Built the checkout flow now used by 200K customers a month"
✓ "Fixed a billing bug that was costing $30K/month"
✓ "Led migration from monolith to microservices, dropped deploy time from 45min to 8min"

BAD BULLET EXAMPLES (sound like AI — DO NOT WRITE LIKE THIS):
✗ "Spearheaded comprehensive infrastructure migration initiatives leveraging serverless architecture for optimal performance"
✗ "Demonstrated exceptional proficiency in talent acquisition by onboarding high-caliber engineering professionals"
✗ "Architected scalable checkout solutions driving substantial customer engagement metrics"

GOOD SUMMARY EXAMPLE (sound human):
✓ "Senior frontend developer with 7 years building React apps. Most recently led the platform team at Acme, where I rebuilt the checkout flow that now handles $5M/month in transactions."

BAD SUMMARY EXAMPLE (sounds like AI):
✗ "Highly motivated and results-driven senior frontend developer with a proven track record of demonstrating exceptional proficiency in delivering robust, scalable solutions across diverse industries."

CANDIDATE INFO:
- Name: ${fullName}
- Email: ${email || "N/A"}
- Phone: ${phone || "N/A"}
- Location: ${location || "N/A"}
- LinkedIn: ${linkedIn || "N/A"}
- Portfolio: ${portfolio || "N/A"}
- Target Role: ${targetRole}
- Years of Experience: ${yearsExperience || "N/A"}
- User's Summary Draft: ${summary || "N/A — write a fresh one based on their experience"}
- Skills: ${skills || "N/A"}

WORK EXPERIENCE (${experiences?.filter(e => e.role || e.company).length || 0} entries):
${experienceText || "None provided"}

EDUCATION (${educations?.filter(e => e.degree || e.school).length || 0} entries):
${educationText || "None provided"}

${jobDescription ? `\nTARGET JOB DESCRIPTION (extract keywords + match tone):\n${jobDescription.slice(0, 2000)}` : ""}

WRITING RULES:
- Summary: 2-3 sentences max. Conversational. Mentions years of experience + most recent meaningful achievement. NO buzzwords.
- Title: Match what they'd actually want to be called (e.g. "Senior Frontend Developer" not "Highly Skilled Frontend Engineering Professional")
- Each bullet: Start with a strong action verb. Include a number/metric if user mentioned one. Max 20 words.
- Skills: Reorder to put most relevant first. Can add 2-3 obviously related ones.

Return JSON only:

{
  "fullName": "string",
  "title": "natural professional title",
  "contact": {
    "email": "string or empty",
    "phone": "string or empty",
    "location": "string or empty",
    "linkedIn": "string or empty",
    "portfolio": "string or empty"
  },
  "summary": "2-3 sentences. Sounds like a real person.",
  "experience": [
    {
      "role": "EXACTLY as user wrote",
      "company": "EXACTLY as user wrote",
      "duration": "EXACTLY as user wrote",
      "location": "EXACTLY as user wrote or empty",
      "bullets": ["3-4 human-sounding bullets with numbers where possible"]
    }
  ],
  "education": [
    {
      "degree": "EXACTLY as user wrote",
      "school": "EXACTLY as user wrote",
      "year": "EXACTLY as user wrote",
      "details": "EXACTLY as user wrote or empty"
    }
  ],
  "skills": ["reordered, most relevant first"]
}

A real hiring manager will read this in 6 seconds. Make every word earn its place. Sound human, be specific, no buzzwords.`;

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