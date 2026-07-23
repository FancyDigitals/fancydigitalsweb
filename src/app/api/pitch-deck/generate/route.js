import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateJSON } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// ─── SLIDE TEMPLATES PER DOCUMENT TYPE ───────────────────────────────────────

const SLIDE_CONFIGS = {
  "Startup Pitch Deck": [
    "cover", "problem", "solution", "market", "product",
    "business-model", "traction", "competition", "go-to-market",
    "team", "financials", "funding-ask", "closing"
  ],
  "Investor Deck": [
    "cover", "executive-summary", "problem", "solution", "market",
    "product", "business-model", "traction", "financials",
    "funding-ask", "team", "closing"
  ],
  "Business Proposal": [
    "cover", "executive-summary", "about-us", "problem",
    "proposed-solution", "scope", "timeline", "pricing",
    "team", "case-studies", "closing"
  ],
  "Partnership Proposal": [
    "cover", "executive-summary", "about-us", "opportunity",
    "proposed-partnership", "benefits", "terms", "team", "closing"
  ],
  "Agency Proposal": [
    "cover", "executive-summary", "about-us", "understanding",
    "proposed-solution", "process", "deliverables", "timeline",
    "pricing", "team", "case-studies", "closing"
  ],
  "Sales Proposal": [
    "cover", "executive-summary", "understanding", "proposed-solution",
    "features", "pricing", "timeline", "team", "closing"
  ],
  "Company Profile": [
    "cover", "about-us", "mission-vision", "services",
    "portfolio", "team", "clients", "contact"
  ],
  "Executive Summary": [
    "cover", "overview", "problem", "solution", "market",
    "business-model", "financials", "team", "closing"
  ],
  "Product Launch Deck": [
    "cover", "problem", "product", "features", "demo",
    "market", "pricing", "go-to-market", "team", "closing"
  ],
  "Marketing Proposal": [
    "cover", "executive-summary", "understanding", "strategy",
    "channels", "timeline", "budget", "kpis", "team", "closing"
  ],
  "Press Release": [
    "cover", "headline", "summary", "details",
    "quotes", "about-company", "contact"
  ],
  "Media Kit": [
    "cover", "about-us", "brand-story", "audience",
    "media-assets", "statistics", "partnerships", "contact"
  ],
  "Case Study": [
    "cover", "client-overview", "challenge", "solution",
    "process", "results", "testimonial", "closing"
  ],
  "Grant Proposal": [
    "cover", "executive-summary", "problem", "proposed-solution",
    "methodology", "timeline", "budget", "team", "impact", "closing"
  ],
  "Board Presentation": [
    "cover", "agenda", "executive-summary", "performance",
    "financials", "strategy", "risks", "roadmap", "decisions", "closing"
  ],
  "Annual Report": [
    "cover", "highlights", "ceo-message", "performance",
    "financials", "milestones", "team", "outlook", "closing"
  ],
  "Product Roadmap": [
    "cover", "vision", "current-state", "q1", "q2",
    "q3", "q4", "milestones", "team", "closing"
  ],
};

function getSlidesForType(docType) {
  return SLIDE_CONFIGS[docType] || SLIDE_CONFIGS["Startup Pitch Deck"];
}

// ─── PROMPT BUILDER ──────────────────────────────────────────────────────────

function buildPrompt(formData) {
  const slides = getSlidesForType(formData.documentType);

  return `
You are a world-class pitch deck designer and business strategist.
Generate a complete, professional "${formData.documentType}" for the following business.

BUSINESS DETAILS:
- Business Name: ${formData.businessName || "Not provided"}
- Description: ${formData.description || "Not provided"}
- Industry: ${formData.industry || "Not provided"}
- Target Audience: ${formData.targetAudience || "Not provided"}
- Stage: ${formData.stage || "Not provided"}
- Problem: ${formData.problem || "Not provided"}
- Solution: ${formData.solution || "Not provided"}
- Market Size: ${formData.marketSize || "Not provided"}
- Revenue Model: ${formData.revenueModel || "Not provided"}
- Funding Amount: ${formData.fundingAmount || "Not provided"}
- Unique Advantage: ${formData.uniqueAdvantage || "Not provided"}
- Competitors: ${formData.competitors || "Not provided"}
- Go To Market: ${formData.goToMarket || "Not provided"}
- Traction: ${formData.traction || "Not provided"}
- Team: ${formData.team || "Not provided"}
- Website: ${formData.website || "Not provided"}
- Tone: ${formData.tone || "Professional"}
- Theme: ${formData.theme || "Minimal"}
- Primary Color: ${formData.primaryColor || "#075a01"}
- Purpose: ${formData.purpose || "Not provided"}

Generate exactly these slides in order: ${slides.join(", ")}

Return ONLY a valid JSON object in this exact shape:

{
  "title": "deck title",
  "tagline": "one powerful tagline",
  "documentType": "${formData.documentType}",
  "theme": "${formData.theme || "minimal"}",
  "primaryColor": "${formData.primaryColor || "#075a01"}",
  "slides": [
    {
      "id": "slide-1",
      "type": "cover",
      "title": "slide title",
      "subtitle": "short subtitle or null",
      "body": "1-2 sentence intro paragraph (MAX 40 words). NEVER walls of text.",
      "bullets": ["4-6 concise bullet points, each 10-18 words max"],
      "stats": [
        { "label": "stat label (2-4 words)", "value": "stat value (short)", "description": "1 sentence context (max 15 words)" }
      ],
      "callout": "one powerful highlighted sentence or null",
      "speakerNotes": "2-3 sentences of real speaker guidance",
      "layout": "hero | split | bullets | stats | timeline | comparison | team | closing"
    }
  ],
  "emailSubject": "professional email subject line",
  "emailBody": "complete professional email body ready to send (200-300 words)",
  "executiveSummary": "2-3 paragraph executive summary of the entire deck"
}

═══════════════════════════════════════════════════════════
CRITICAL CONTENT RULES — DO NOT VIOLATE:
═══════════════════════════════════════════════════════════

1. STRUCTURE OVER PROSE: Slides are for SCANNING, not reading. Break every piece of information into bullets, stats, or callouts. NEVER write a paragraph longer than 40 words in the "body" field.

2. BULLETS ARE MANDATORY: Every content slide MUST have 4-6 bullets. Only these slide types can skip bullets: "cover", "closing", "contact", "quotes", "ceo-message", "headline". All others MUST have bullets.

3. BULLETS MUST BE SHORT: Each bullet: 10-18 words maximum. Punchy, scannable, action-oriented. NOT full sentences with clauses.

4. BODY FIELD IS AN INTRO ONLY: The "body" field is a 1-2 sentence introduction. Then use "bullets" for the actual content. NEVER dump paragraphs into body.

5. USE STATS WHENEVER POSSIBLE: For these slide types, ALWAYS include 3-5 stats with real numbers:
   - market, market-size, opportunity
   - traction, performance, results, milestones
   - financials, financial-projections, revenue, budget
   - impact, benefits, kpis

6. USE CALLOUTS FOR IMPACT: Every 2-3 slides should have a "callout" — one powerful sentence that reinforces the key message.

7. PLAIN TEXT ONLY: No markdown syntax. No asterisks (**), underscores (_), hashes (#), or backticks. Write "Premium Web Development:" not "**Premium Web Development:**".

8. REAL SPECIFIC CONTENT: Never generic. Reference the actual business name, industry, and details provided above.

9. LAYOUT CHOICE:
   - "hero" → cover, closing slides
   - "stats" → market, traction, financials, performance, results, opportunity, impact
   - "bullets" → problem, solution, features, benefits, scope, strategy, services
   - "split" → about-us, mission-vision, comparison
   - "team" → team slide
   - "timeline" → timeline, roadmap, process, milestones
   - "comparison" → competition, before/after

10. speakerNotes: 2-3 real sentences of guidance, not filler.

11. emailBody: Complete, ready-to-send, no [placeholders].

12. TONE: ${formData.tone || "Professional"} throughout.

═══════════════════════════════════════════════════════════
EXAMPLE OF BAD OUTPUT (do NOT do this):
"body": "Our company is a smart AI-powered platform transforming how emergencies are reported, managed, and communicated across Africa. We address the critical problem of fragmented systems which often lead to delayed responses. Our intelligent ecosystem connects citizens, emergency responders, and organizations enabling faster response and proactive safety awareness. Our solution leverages AI and real-time mapping to bridge communication gaps..."

EXAMPLE OF GOOD OUTPUT (do THIS):
"body": "SafetyGrid is Africa's first AI-powered emergency response platform.",
"bullets": [
  "Connects citizens, responders, and agencies in one unified system",
  "Reduces emergency response times by up to 60 percent",
  "Verified reporting eliminates false alarms and prank calls",
  "Real-time mapping shows incidents as they happen",
  "Community-driven safety awareness alerts"
],
"stats": [
  { "label": "Response Time Reduced", "value": "60%", "description": "Faster than traditional dispatch systems" },
  { "label": "Cities Ready", "value": "12", "description": "Launching across major African metros in year one" },
  { "label": "Users Onboarded", "value": "50K+", "description": "Pilot program across three test cities" }
],
"callout": "Every second saved is a life protected."
═══════════════════════════════════════════════════════════
`;
}

// ─── ROUTE ───────────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    // ── Auth + Quota ──
    const usage = await checkAndIncrementUsage("ai-pitch-deck");

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
      `[pitch-deck] User ${usage.userId} · ${usage.plan} · ${usage.used}/${usage.limit || "∞"}`
    );

    // ── Parse Body ──
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (!body.businessName || !body.documentType) {
      return NextResponse.json(
        { success: false, error: "Business name and document type are required." },
        { status: 400 }
      );
    }

    // ── Generate ──
    const prompt = buildPrompt(body);
    const result = await generateJSON(prompt);

    // ── Validate ──
    if (!result?.slides || !Array.isArray(result.slides)) {
      throw new Error("AI returned invalid deck structure.");
    }

    return NextResponse.json({
      success: true,
      deck: result,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[pitch-deck/generate]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}