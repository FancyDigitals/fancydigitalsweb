import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateJSON } from "@/lib/ai/gemini";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// ─── SECTION CONFIG ──────────────────────────────────────────────────────────

const SECTION_CONFIGS = {
  "Full Business Plan": [
    "cover",
    "executive-summary",
    "company-overview",
    "problem-solution",
    "market-analysis",
    "competitive-analysis",
    "business-model",
    "go-to-market",
    "operations",
    "financial-projections",
    "funding-requirements",
    "appendix",
  ],
  "Startup Plan": [
    "cover",
    "executive-summary",
    "problem-solution",
    "market-analysis",
    "product-service",
    "business-model",
    "go-to-market",
    "traction",
    "team",
    "financial-projections",
    "funding-requirements",
  ],
  "Small Business Plan": [
    "cover",
    "executive-summary",
    "company-overview",
    "products-services",
    "market-analysis",
    "marketing-strategy",
    "operations",
    "financial-projections",
    "funding-requirements",
  ],
  "SaaS Business Plan": [
    "cover",
    "executive-summary",
    "problem-solution",
    "product-overview",
    "market-analysis",
    "competitive-analysis",
    "business-model",
    "go-to-market",
    "traction",
    "team",
    "financial-projections",
    "funding-requirements",
  ],
  "E-commerce Plan": [
    "cover",
    "executive-summary",
    "company-overview",
    "products-services",
    "market-analysis",
    "competitive-analysis",
    "marketing-strategy",
    "operations",
    "financial-projections",
    "funding-requirements",
  ],
  "Service Business Plan": [
    "cover",
    "executive-summary",
    "company-overview",
    "services-overview",
    "market-analysis",
    "competitive-analysis",
    "marketing-strategy",
    "operations",
    "team",
    "financial-projections",
  ],
  "Nonprofit Business Plan": [
    "cover",
    "executive-summary",
    "mission-vision",
    "programs-services",
    "market-need",
    "operations",
    "team",
    "financial-projections",
    "funding-requirements",
  ],
};

function getSectionsForType(planType) {
  return SECTION_CONFIGS[planType] || SECTION_CONFIGS["Full Business Plan"];
}

// ─── PROMPT BUILDER ──────────────────────────────────────────────────────────

function buildPrompt(formData) {
  const sections = getSectionsForType(formData.planType);

  return `
You are a world-class business strategist and MBA consultant with 20 years of experience writing investor-ready business plans.

Generate a complete, professional business plan for the following business.

BUSINESS DETAILS:
- Business Name: ${formData.businessName || "Not provided"}
- Business Type: ${formData.planType || "Full Business Plan"}
- Industry: ${formData.industry || "Not provided"}
- Business Description: ${formData.description || "Not provided"}
- Products / Services: ${formData.productsServices || "Not provided"}
- Target Audience: ${formData.targetAudience || "Not provided"}
- Problem Being Solved: ${formData.problem || "Not provided"}
- Solution: ${formData.solution || "Not provided"}
- Unique Value Proposition: ${formData.uniqueValue || "Not provided"}
- Business Stage: ${formData.stage || "Not provided"}
- Location / Market: ${formData.location || "Not provided"}
- Market Size: ${formData.marketSize || "Not provided"}
- Revenue Model: ${formData.revenueModel || "Not provided"}
- Pricing Strategy: ${formData.pricing || "Not provided"}
- Current Traction: ${formData.traction || "Not provided"}
- Competitors: ${formData.competitors || "Not provided"}
- Competitive Advantage: ${formData.competitiveAdvantage || "Not provided"}
- Team: ${formData.team || "Not provided"}
- Funding Required: ${formData.fundingAmount || "Not provided"}
- Use of Funds: ${formData.useOfFunds || "Not provided"}
- Plan Purpose: ${formData.planPurpose || "Investor"}
- Tone: ${formData.tone || "Professional"}
- Website: ${formData.website || "Not provided"}

Generate exactly these sections in order: ${sections.join(", ")}

Return ONLY a valid JSON object in this exact shape:

{
  "title": "business plan title",
  "tagline": "one powerful tagline for the business",
  "planType": "${formData.planType || "Full Business Plan"}",
  "industry": "${formData.industry || ""}",
  "sections": [
    {
      "id": "section-1",
      "type": "cover",
      "title": "section heading",
      "subtitle": "section subheading or null",
      "content": "full section content as 2-4 paragraphs of plain text",
      "bullets": ["key point 1", "key point 2", "key point 3"],
      "stats": [
        { "label": "stat label", "value": "stat value", "description": "brief context" }
      ],
      "table": {
        "headers": ["Column 1", "Column 2", "Column 3"],
        "rows": [["row1col1", "row1col2", "row1col3"], ["row2col1", "row2col2", "row2col3"]]
      },
      "callout": "highlighted insight or null",
      "icon": "emoji that represents this section"
    }
  ],
  "executiveSummary": "3-4 paragraph executive summary of the entire plan",
  "shareSubject": "professional email subject line for sharing this plan",
  "shareBody": "complete professional email body for sharing this plan with investors or banks (150-200 words)"
}

SECTION CONTENT RULES:
- cover: Business name, tagline, plan type, date, founder name if provided. Content should be a compelling one-paragraph overview.
- executive-summary: 3-4 paragraphs. Mission, opportunity, solution, traction, team, financials snapshot, funding ask. This is the most important section.
- company-overview: Company history, legal structure, location, mission, vision, values. 2-3 paragraphs.
- problem-solution: Clearly state the problem with market evidence, then describe the solution. Use stats where possible.
- market-analysis: TAM, SAM, SOM breakdown. Industry trends. Target customer personas. Use real-looking market data.
- competitive-analysis: List 3-5 competitors. Comparison table with headers: Competitor, Strengths, Weaknesses, Your Advantage. Explain competitive moat.
- business-model: How the company makes money. Revenue streams, pricing tiers, unit economics. Be specific.
- go-to-market: Phase-by-phase launch strategy. Channels, partnerships, growth levers. Timeline.
- operations: Team structure, key hires, technology stack, supply chain, key processes, milestones.
- financial-projections: Year 1, 2, 3 projections. Revenue, expenses, EBITDA, cash flow. Use table format.
- funding-requirements: Total ask, use of funds breakdown (table), timeline to profitability, exit strategy.
- appendix: Supporting data, team bios, references, glossary.
- traction: Current metrics, customers, revenue, growth rate, key milestones achieved.
- team: Founder and team bios, advisors, key hires planned.
- product-overview / products-services / services-overview / programs-services: Detailed description of offerings, features, benefits, pricing.
- mission-vision: Mission statement, vision statement, core values, theory of change (for nonprofits).
- marketing-strategy: Marketing channels, budget allocation, content strategy, paid acquisition, SEO, partnerships.

STRICT RULES:
- Every section must have real, specific, professional content. Never use placeholder text like [insert name] or [TBD].
- CRITICAL: Return PLAIN TEXT ONLY in all text fields. Never use markdown syntax. No asterisks (**), no underscores (_), no hashes (#), no backticks. Write labels like "Revenue Streams:" not "**Revenue Streams:**".
- bullets array should have 3-6 items per section where applicable. Can be [] if not applicable.
- stats array should have 2-4 items for data-heavy sections. Can be [] if not applicable.
- table should only be included for competitive-analysis, financial-projections, funding-requirements. Set to null for other sections.
- subtitle and callout can be null if not applicable.
- icon must be a single relevant emoji.
- Make the content compelling, investor-ready, and highly professional.
- Match the tone: ${formData.tone || "Professional"}
- Plan purpose is: ${formData.planPurpose || "Investor"} — tailor language accordingly.
`;
}

// ─── ROUTE ───────────────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    // ── Auth + Quota ──
    const usage = await checkAndIncrementUsage("ai-business-plan");

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
      `[business-plan] User ${usage.userId} · ${usage.plan} · ${usage.used}/${usage.limit || "∞"}`
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

    if (!body.businessName || !body.planType) {
      return NextResponse.json(
        { success: false, error: "Business name and plan type are required." },
        { status: 400 }
      );
    }

    // ── Generate ──
    const prompt = buildPrompt(body);
    const result = await generateJSON(prompt);

    // ── Validate ──
    if (!result?.sections || !Array.isArray(result.sections)) {
      throw new Error("AI returned invalid plan structure.");
    }

    return NextResponse.json({
      success: true,
      plan: result,
      usage: {
        used: usage.used,
        limit: usage.limit,
        plan: usage.plan,
      },
    });
  } catch (error) {
    console.error("[business-plan/generate]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}