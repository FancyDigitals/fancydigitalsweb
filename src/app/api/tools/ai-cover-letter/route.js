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
      short: "200-280 words. Get to the point fast.",
      medium: "300-400 words. Balanced — enough to make your case without overstaying.",
      detailed: "450-550 words. Tell more of your story, but every sentence must earn its place.",
    };

    const toneGuide = {
      professional: "Polished and respectful, but still warm. Think 'smart colleague writing a note' not 'corporate press release.'",
      enthusiastic: "Genuinely excited, real energy, but NOT desperate or over-the-top. Show you care without trying too hard.",
      direct: "Confident, no fluff, every sentence has a point. Like talking to a busy founder who respects your time.",
      creative: "Story-driven, has personality, memorable. Like a personal letter from a thoughtful friend who happens to be perfect for the job.",
    };

    const prompt = `You are a real human writing a cover letter — NOT an AI. A senior hiring manager will read this in 30 seconds. Make them want to interview this person.

⚠️ ABSOLUTE RULES:
1. ONLY use facts from the candidate's information below. NEVER invent achievements, jobs, or numbers.
2. If info is sparse, write a shorter, simpler letter — don't pad with fluff.
3. Sound like a real, thoughtful person — NOT like AI.

🚫 BANNED PHRASES (these scream "AI wrote this" — recruiters hate them):
- "I am writing to apply for..."
- "I am excited to submit my application"
- "Please find attached..."
- "I believe my skills align..."
- "Demonstrated proficiency in..."
- "Proven track record of..."
- "Results-driven professional"
- "Passionate about..." (overused)
- "Spearheaded"
- "Leveraged"
- "Synergize"
- "Cutting-edge"
- "Industry-leading"
- "Best-in-class"
- "Robust solutions"
- "Holistic approach"
- "Strategic alignment"
- "Drive value"
- "Empowered to..."
- "Excels at..."
- "Eager to contribute"
- "Wealth of experience"
- "Hit the ground running"
- "Bring to the table"
- "Game-changer"
- "Out-of-the-box thinking"

✅ INSTEAD, write like a real person:
- Open with WHY you saw this role and reacted (not "I'm writing to apply").
- Use simple words: "led", "built", "shipped", "fixed", "saved", "grew".
- Be specific: numbers > adjectives, examples > claims.
- Show personality (briefly) — what makes you actually interested in THIS company.

GOOD OPENING EXAMPLES (sound real):
✓ "When I saw the Senior Developer role at Stripe, I had to apply — I've been quietly fixing the kind of payment edge cases your team writes about for the last 3 years."
✓ "Your post about scaling onboarding to 10M users is exactly the problem I tackled last year at Acme."
✓ "I noticed you're hiring for a Marketing Manager who can rebuild your email funnel. That's what I just did at my current company — moved open rates from 12% to 31% in 6 months."

BAD OPENING EXAMPLES (sound like AI — DO NOT WRITE LIKE THIS):
✗ "I am writing to express my strong interest in the Senior Developer position at your esteemed company..."
✗ "With a proven track record of delivering results-driven solutions, I am excited to submit my application..."
✗ "As a passionate and detail-oriented professional, I believe my skills strongly align with your requirements..."

CANDIDATE INFO:
- Name: ${fullName}
- Email: ${email || "N/A"}
- Phone: ${phone || "N/A"}
- Location: ${location || "N/A"}

JOB DETAILS:
- Role: ${targetRole}
- Company: ${targetCompany}
- Hiring Manager: ${hiringManagerName || "Unknown — use 'Dear Hiring Manager'"}

${jobDescription ? `\nJOB DESCRIPTION:\n${jobDescription.slice(0, 2000)}` : ""}

CANDIDATE BACKGROUND:
${yourBackground || "Not provided"}

KEY ACHIEVEMENTS:
${keyAchievements || "Not provided"}

WHY THIS COMPANY:
${whyThisCompany || "Not provided — find one genuine reason based on the role/company"}

STYLE GUIDE:
- Tone: ${toneGuide[tone] || toneGuide.professional}
- Length: ${lengthGuide[length] || lengthGuide.medium}

STRUCTURE:
1. Header: Name + contact (one line)
2. Date
3. Greeting (use hiring manager's name if provided, else "Dear Hiring Manager")
4. Opening hook (NOT "I am writing...") — show you noticed something specific
5. What you've done that's relevant (1-2 specific examples with numbers if possible)
6. Why this company specifically — one genuine, non-generic reason
7. Confident close — suggest a conversation, NOT "I look forward to hearing from you"
8. "Sincerely," + name

OUTPUT FORMAT:
- Plain text only (no JSON, no markdown, no code blocks)
- Real line breaks between paragraphs
- No bullet points (it's a letter, not a resume)
- No fancy formatting

Remember: A real person from the hiring team will read this. If it sounds like AI wrote it, they delete it. Make it human.`;

    const coverLetter = await generateWithGemini(prompt, {
      temperature: 0.85,
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