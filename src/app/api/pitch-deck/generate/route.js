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
      "subtitle": "slide subtitle or null",
      "body": "main body content as plain text",
      "bullets": ["bullet 1", "bullet 2"],
      "stats": [
        { "label": "stat label", "value": "stat value", "description": "context" }
      ],
      "callout": "highlighted callout text or null",
      "speakerNotes": "professional speaker notes for this slide",
      "layout": "hero | split | bullets | stats | timeline | comparison | team | closing"
    }
  ],
  "emailSubject": "professional email subject line",
  "emailBody": "complete professional email body ready to send (200-300 words)",
  "executiveSummary": "2-3 paragraph executive summary of the entire deck"
}

RULES:
- Every slide must have real, specific, professional content. Never use placeholder text.
- CRITICAL: Return PLAIN TEXT ONLY. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks. Write labels like "Premium Web Development:" not "**Premium Web Development:**".
- bullets array can be empty [] if not applicable.
- stats array can be empty [] if not applicable.
- subtitle and callout can be null if not applicable.
- speakerNotes must be 2-3 sentences of real speaking guidance.
- layout must be one of: hero, split, bullets, stats, timeline, comparison, team, closing
- Choose layout intelligently based on slide type.
- emailBody must be complete and ready to send with no blanks.
- Make the content compelling, investor-ready, and highly professional.
- Match the tone: ${formData.tone || "Professional"}
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