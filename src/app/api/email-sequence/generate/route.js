import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateJSON } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// ─── SEQUENCE CONFIGS ────────────────────────────────────────────────────────

const SEQUENCE_CONFIGS = {
  "Cold Outreach": {
    emailCount: 5,
    description: "5-email B2B cold outreach to book meetings or start conversations",
    structure: [
      "Email 1: Personalized intro + relevant hook",
      "Email 2: Value-focused follow-up with proof point",
      "Email 3: Different angle — case study or social proof",
      "Email 4: Direct ask with clear CTA",
      "Email 5: Break-up email (professional close)",
    ],
    defaultDelays: ["Send immediately", "3 days later", "4 days later", "5 days later", "7 days later"],
  },
  "Welcome Series": {
    emailCount: 5,
    description: "5-email SaaS/product welcome and onboarding flow",
    structure: [
      "Email 1: Warm welcome + confirm signup + quick win",
      "Email 2: Core feature walkthrough with clear next step",
      "Email 3: Social proof / customer story",
      "Email 4: Advanced feature or power-user tip",
      "Email 5: Upgrade nudge or community invite",
    ],
    defaultDelays: ["Send immediately", "1 day later", "3 days later", "5 days later", "7 days later"],
  },
  "Product Launch": {
    emailCount: 6,
    description: "6-email launch sequence: teaser → launch → post-launch",
    structure: [
      "Email 1: Teaser — hint at what's coming",
      "Email 2: Reveal — what we're launching and why",
      "Email 3: Launch day — buy now",
      "Email 4: Social proof — early customer wins",
      "Email 5: Objection handling / FAQ",
      "Email 6: Last chance / scarcity",
    ],
    defaultDelays: ["Send immediately", "3 days later", "2 days later", "1 day later", "2 days later", "1 day later"],
  },
  "Abandoned Cart": {
    emailCount: 3,
    description: "3-email abandoned cart recovery for e-commerce",
    structure: [
      "Email 1: Friendly reminder + product image",
      "Email 2: Overcome objections + social proof",
      "Email 3: Last-chance discount or scarcity",
    ],
    defaultDelays: ["1 hour after abandon", "1 day later", "3 days later"],
  },
  "Lead Nurture": {
    emailCount: 7,
    description: "7-email educational nurture drip that builds trust and moves leads toward purchase",
    structure: [
      "Email 1: Welcome + set expectations",
      "Email 2: Educational content — problem awareness",
      "Email 3: Educational content — solution awareness",
      "Email 4: Case study or success story",
      "Email 5: Behind-the-scenes / brand story",
      "Email 6: Comparison — you vs alternatives",
      "Email 7: Sales email with clear offer",
    ],
    defaultDelays: ["Send immediately", "2 days later", "3 days later", "3 days later", "3 days later", "3 days later", "3 days later"],
  },
  "Re-engagement": {
    emailCount: 4,
    description: "4-email win-back sequence for inactive subscribers or churned users",
    structure: [
      "Email 1: 'We miss you' + acknowledge absence",
      "Email 2: What's new since they left",
      "Email 3: Exclusive comeback offer",
      "Email 4: Final email — stay or unsubscribe",
    ],
    defaultDelays: ["Send immediately", "3 days later", "5 days later", "7 days later"],
  },
  "Newsletter Welcome": {
    emailCount: 4,
    description: "4-email newsletter subscriber welcome and warm-up",
    structure: [
      "Email 1: Welcome + what to expect",
      "Email 2: Best-of content — top articles",
      "Email 3: Behind the scenes / meet the author",
      "Email 4: Ask for reply — start conversation",
    ],
    defaultDelays: ["Send immediately", "2 days later", "3 days later", "4 days later"],
  },
};

function getSequenceConfig(type) {
  return SEQUENCE_CONFIGS[type] || SEQUENCE_CONFIGS["Cold Outreach"];
}

// ─── PROMPT BUILDER ──────────────────────────────────────────────────────────

function buildPrompt(formData) {
  const config = getSequenceConfig(formData.sequenceType);

  return `
You are a world-class email copywriter with 15 years of experience writing high-converting sequences for B2B SaaS, e-commerce, and consumer brands. You've studied every top email in the world.

Generate a complete ${config.emailCount}-email "${formData.sequenceType}" sequence for the following business.

BUSINESS CONTEXT:
- Business / Sender Name: ${formData.senderName || formData.businessName || "Not provided"}
- Business Description: ${formData.businessDescription || "Not provided"}
- Product / Service: ${formData.productService || "Not provided"}
- Target Audience: ${formData.audience || "Not provided"}
- Sequence Goal: ${formData.goal || "Not provided"}
- Sender Role / Signature: ${formData.senderRole || "Not provided"}
- Sender Email Signoff: ${formData.senderSignoff || formData.senderName || "The Team"}
- Company Website: ${formData.website || "Not provided"}
- Unique Value Proposition: ${formData.uniqueValue || "Not provided"}
- Pain Points Being Solved: ${formData.painPoints || "Not provided"}
- Social Proof (customers, results, awards): ${formData.socialProof || "Not provided"}
- Tone: ${formData.tone || "Professional"}
- Special Offer / Discount: ${formData.offer || "None"}
- CTA URL: ${formData.ctaUrl || "Not provided"}
- Recipient Name Merge Field: use {{first_name}} where a first name should appear
- Company Name Merge Field: use {{company}} where their company name should appear

SEQUENCE TYPE: ${formData.sequenceType}
SEQUENCE STRUCTURE:
${config.structure.map((s, i) => `  ${i + 1}. ${s}`).join("\n")}

SUGGESTED SEND TIMING:
${config.defaultDelays.map((d, i) => `  Email ${i + 1}: ${d}`).join("\n")}

Return ONLY a valid JSON object in this exact shape:

{
  "title": "sequence title (e.g. Cold Outreach — Enterprise SaaS)",
  "sequenceType": "${formData.sequenceType}",
  "tone": "${formData.tone || "Professional"}",
  "audience": "${formData.audience || ""}",
  "strategyNotes": "3-4 sentences explaining the strategy behind this sequence — why the structure works, key psychology used, best practices for sending",
  "emails": [
    {
      "id": "email-1",
      "number": 1,
      "purpose": "brief 1-sentence purpose of this email",
      "sendDelay": "when to send (e.g. Send immediately, 3 days later)",
      "subject": "primary subject line",
      "subjectAlt": "A/B test variant subject line",
      "previewText": "inbox preview snippet (50-90 characters)",
      "body": "full email body with proper line breaks. Use \\n\\n for paragraph breaks. Include greeting like 'Hi {{first_name}},' at top. Include signature block at bottom with sender name/role.",
      "ctaText": "primary call-to-action button text (short, action-oriented)",
      "ctaTip": "one sentence explaining what makes this CTA work"
    }
  ]
}

STRICT RULES:
- Generate EXACTLY ${config.emailCount} emails, numbered 1 to ${config.emailCount}.
- Every email must be complete, specific, and immediately sendable. No placeholders like [insert benefit] or [TBD].
- CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks. If you want emphasis, use CAPS sparingly.
- Subject lines: 30-60 characters, specific, curiosity-driven, no clickbait.
- Preview text: 50-90 characters, must add context to subject, never repeat it.
- Body copy: 100-250 words per email. Short paragraphs (1-3 sentences). Real conversational tone.
- Use merge fields {{first_name}} and {{company}} naturally where personalization helps.
- Include a greeting at top and full signature block at bottom of every body.
- CTA button text: 2-5 words, action-oriented (e.g. "Book a demo", "Start free trial", "Claim your spot").
- ctaTip: one short sentence of copywriter insight for why the CTA works.
- Match the tone strictly: ${formData.tone || "Professional"}
- Adapt to the sequence goal: ${formData.goal || "Drive engagement and action"}
- Make each email in the sequence connect naturally to the previous one (mention prior email context where it makes sense).
- Emails should escalate in urgency/directness as the sequence progresses.
`;
}

// ─── ROUTE ───────────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const usage = await checkAndIncrementUsage("ai-email-sequence");

    if (!usage.allowed) {
      const status = usage.error === "Not authenticated" ? 401 : 429;
      return NextResponse.json(
        {
          success: false,
          error: usage.error,
          limit: usage.limit,
          used: usage.used,
          requiresUpgrade: status === 429,
        },
        { status }
      );
    }

    console.log(
      `[email-sequence] User ${usage.userId} · ${usage.plan} · ${usage.used}/${usage.limit || "∞"}`
    );

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (!body.senderName && !body.businessName) {
      return NextResponse.json(
        { success: false, error: "Sender or business name is required." },
        { status: 400 }
      );
    }
    if (!body.sequenceType) {
      return NextResponse.json(
        { success: false, error: "Sequence type is required." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(body);
    const result = await generateJSON(prompt);

    if (!result?.emails || !Array.isArray(result.emails) || result.emails.length === 0) {
      throw new Error("AI returned invalid sequence structure.");
    }

    return NextResponse.json({
      success: true,
      sequence: result,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[email-sequence/generate]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}