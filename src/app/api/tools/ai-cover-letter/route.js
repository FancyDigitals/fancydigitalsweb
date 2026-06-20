import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateWithGemini } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      location,
      targetRole,
      targetCompany,
      hiringManagerName,
      jobDescription,
      yourBackground,
      keyAchievements,
      whyThisCompany,
      tone,
      length,
    } = body;

    if (!fullName || !targetRole || !targetCompany) {
      return NextResponse.json(
        { error: "Full name, target role, and company are required" },
        { status: 400 }
      );
    }

    const usage = await checkAndIncrementUsage("ai-cover-letter");

    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.error, limit: usage.limit, used: usage.used },
        { status: 403 }
      );
    }

    const lengthGuide = {
      short: "200-280 words. Concise and punchy.",
      medium: "300-400 words. Balanced and professional.",
      detailed: "450-550 words. Comprehensive with strong narrative.",
    };

    const toneGuide = {
      professional: "Formal, polished, traditional business tone",
      enthusiastic: "Energetic, passionate, shows excitement",
      direct: "Confident, results-driven, no fluff",
      creative: "Personable, story-driven, memorable",
    };

    const prompt = `You are an expert career coach writing a cover letter. Write a polished, ATS-optimized cover letter that will get the candidate noticed.

CANDIDATE DETAILS:
- Full Name: ${fullName}
- Email: ${email || "N/A"}
- Phone: ${phone || "N/A"}
- Location: ${location || "N/A"}

JOB DETAILS:
- Target Role: ${targetRole}
- Target Company: ${targetCompany}
- Hiring Manager: ${hiringManagerName || "Unknown — use generic greeting"}
${jobDescription ? `\nJOB DESCRIPTION:\n${jobDescription}` : ""}

CANDIDATE BACKGROUND:
${yourBackground || "N/A"}

KEY ACHIEVEMENTS:
${keyAchievements || "N/A"}

WHY THIS COMPANY:
${whyThisCompany || "N/A — focus on company impact and role alignment"}

WRITING REQUIREMENTS:
- Tone: ${toneGuide[tone] || toneGuide.professional}
- Length: ${lengthGuide[length] || lengthGuide.medium}
- Use specific examples and metrics where possible
- Include keywords from job description for ATS
- Open with a strong hook (not "I am writing to apply...")
- Show genuine interest in the company
- End with confident call to action

STRUCTURE:
1. Header (candidate name + contact)
2. Date
3. Hiring Manager / Company address
4. Greeting (use name if provided, else "Dear Hiring Manager")
5. Opening paragraph (hook + role interest)
6. Body paragraph 1 (relevant experience + achievements)
7. Body paragraph 2 (why this company + value you bring)
8. Closing paragraph (call to action)
9. Sign-off ("Sincerely," + name)

⚠️ CRITICAL:
- ONLY use information provided. Don't invent facts.
- If background is sparse, focus on the role requirements
- Make it sound human and confident, NOT robotic

Return the cover letter as plain formatted text (no JSON, no markdown). Use real line breaks between paragraphs.`;

    const coverLetter = await generateWithGemini(prompt, {
      temperature: 0.8,
      maxTokens: 2048,
    });

    const supabase = await createClient();
    await supabase.from("projects").insert({
      user_id: usage.userId,
      tool_slug: "ai-cover-letter",
      title: `${fullName} — ${targetRole} at ${targetCompany}`,
      prompt: `${targetRole} at ${targetCompany}`,
      input_data: body,
      output_data: { coverLetter, tone, length },
    });

    return NextResponse.json({
      success: true,
      coverLetter,
      usage: { used: usage.used, limit: usage.limit, isPro: usage.isPro },
    });
  } catch (error) {
    console.error("Cover letter generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}