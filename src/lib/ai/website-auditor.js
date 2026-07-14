import { generateWithGemini } from "@/lib/ai/gemini";
import { fetchAndParseURL } from "@/lib/audit/html-parser";

export async function auditWebsite(url, pageSpeedData, parsedHTML, options = {}) {
  const { competitors = [], messagingApps = [], competitorData = [] } = options;

  // ── Shared context builders (reused across passes) ──────────────────────────

  const speedContext = pageSpeedData ? `
GOOGLE PAGESPEED SCORES:
- Performance: ${pageSpeedData.performanceScore}/100
- SEO: ${pageSpeedData.seo?.score}/100
- Accessibility: ${pageSpeedData.accessibility?.score}/100
- Best Practices: ${pageSpeedData.bestPractices?.score}/100
- FCP: ${pageSpeedData.fcp || "Unknown"}
- LCP: ${pageSpeedData.lcp || "Unknown"}
- TBT: ${pageSpeedData.tbt || "Unknown"}
- Speed Index: ${pageSpeedData.speedIndex || "Unknown"}
- CLS: ${pageSpeedData.cls || "Unknown"}
SPEED OPPORTUNITIES:
${pageSpeedData.opportunities?.map(o => `- ${o.title}: ${o.description}`).join("\n") || "None"}` 
  : "PAGESPEED: Could not fetch";

  const htmlContext = parsedHTML ? `
WEBSITE STRUCTURE:
Title: "${parsedHTML.meta?.title || "MISSING"}" (${parsedHTML.meta?.titleLength} chars)
Meta Description: "${parsedHTML.meta?.description || "MISSING"}" (${parsedHTML.meta?.descriptionLength} chars)
Canonical: ${parsedHTML.meta?.canonical || "MISSING"}
Viewport: ${parsedHTML.meta?.viewport || "MISSING"}
OG Image: ${parsedHTML.meta?.ogImage || "MISSING"}
Schema: ${parsedHTML.meta?.hasSchema ? `YES (${parsedHTML.meta?.schemaCount} found)` : "MISSING"}
H1s (${parsedHTML.headings?.h1Count}): ${parsedHTML.headings?.h1s?.join(" | ") || "NONE"}
H2s (${parsedHTML.headings?.h2Count}): ${parsedHTML.headings?.h2s?.slice(0, 5).join(" | ") || "NONE"}
Internal links: ${parsedHTML.links?.internalCount}
External links: ${parsedHTML.links?.externalCount}
Images total: ${parsedHTML.images?.total} | Missing alt: ${parsedHTML.images?.withoutAlt}
Buttons: ${parsedHTML.ctas?.buttons?.join(", ") || "None"}
Forms: ${parsedHTML.ctas?.forms}
Pricing: ${parsedHTML.trustSignals?.hasPricing ? "YES" : "NO"}
Testimonials: ${parsedHTML.trustSignals?.hasTestimonials ? "YES" : "NO"}
Team: ${parsedHTML.trustSignals?.hasTeam ? "YES" : "NO"}
FAQ: ${parsedHTML.trustSignals?.hasFAQ ? "YES" : "NO"}
SSL: ${parsedHTML.trustSignals?.hasSSL ? "YES" : "NO"}
Social links: ${parsedHTML.trustSignals?.hasSocialLinks ? "YES" : "NO"}
Live chat: ${parsedHTML.trustSignals?.hasLiveChat ? "YES" : "NO"}
Word count: ${parsedHTML.content?.wordCount}
Content sample: ${parsedHTML.content?.textContent?.slice(0, 500)}
Messaging apps: ${messagingApps.length > 0 ? messagingApps.join(", ") : "None"}`
  : "HTML: Could not fetch";

  const competitorContext = competitorData.length > 0
    ? `COMPETITORS ANALYZED:
${competitorData.map((c, i) => `
Competitor ${i + 1}: ${c.url}
- Title: ${c.data?.meta?.title || "None"}
- H1s: ${c.data?.headings?.h1s?.join(", ") || "None"}
- Schema: ${c.data?.meta?.hasSchema}
- Testimonials: ${c.data?.trustSignals?.hasTestimonials}
- Pricing: ${c.data?.trustSignals?.hasPricing}
- FAQ: ${c.data?.trustSignals?.hasFAQ}
- Word Count: ${c.data?.content?.wordCount}
- CTAs: ${c.data?.ctas?.ctaLinks?.join(", ") || "None"}`).join("\n")}`
    : `COMPETITORS: ${competitors.length > 0 ? competitors.join(", ") : "None — use industry best practices"}`;

  const baseContext = `URL: ${url}\n${speedContext}\n${htmlContext}`;

  // ── PASS 1: Core metrics (SEO, Performance, Mobile, Content) ────────────────

  const pass1Prompt = `You are an expert website auditor. Use ONLY the real data below. Be brutally specific.

${baseContext}

Return ONLY valid JSON. No markdown. No truncation. If space runs out, shorten text but never stop early.

{
  "websiteName": "detected name",
  "websiteType": "Portfolio/SaaS/E-commerce/Agency/Blog/Restaurant/etc",
  "websiteIntent": "One sentence — what this site does and who it helps.",
  "overallScore": 0-100,
  "overallGrade": "A/B/C/D/F",
  "overallSummary": "3 honest sentences using real data.",
  "categories": [
    {
      "id": "seo",
      "name": "SEO & Discoverability",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual title, meta, H1s, schema data.",
      "passed": ["Specific working thing with actual data"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific problem with actual data",
          "impact": "Why this costs them rankings",
          "fix": "Exact actionable fix"
        }
      ]
    },
    {
      "id": "performance",
      "name": "Speed & Loading",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual PageSpeed score and LCP/FCP values.",
      "passed": ["Specific working thing"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific issue with actual metric",
          "impact": "Why this speed issue loses visitors",
          "fix": "Specific fix referencing the actual opportunity"
        }
      ]
    },
    {
      "id": "mobile",
      "name": "Phone & Tablet Experience",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference viewport meta, mobile score.",
      "passed": ["Specific working thing"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific mobile issue",
          "impact": "Why mobile visitors leave",
          "fix": "Exactly what to fix"
        }
      ]
    },
    {
      "id": "content",
      "name": "Words & Messaging",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual H1s, word count, CTA text.",
      "passed": ["Specific working thing with actual content"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific issue referencing actual text found",
          "impact": "Why this messaging gap loses customers",
          "fix": "Exact suggested copy or structural change"
        }
      ]
    }
  ]
}`;

  // ── PASS 2: Trust, Conversion, Brand, Social Proof ───────────────────────────

  const pass2Prompt = `You are an expert website auditor. Use ONLY the real data below.

${baseContext}

Return ONLY valid JSON. No markdown. No truncation. Shorten text if needed but never stop early.

{
  "categories": [
    {
      "id": "trust",
      "name": "Trust & Credibility",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual trust signals — testimonials YES/NO, SSL YES/NO, team YES/NO.",
      "passed": ["Specific detected trust signal"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific missing trust signal",
          "impact": "Why visitors do not trust this business",
          "fix": "Exactly what to add and where"
        }
      ]
    },
    {
      "id": "conversion",
      "name": "Getting People to Act",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual CTAs, buttons, forms found.",
      "passed": ["Specific CTA or conversion element working"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific conversion issue referencing actual buttons/forms",
          "impact": "Why visitors leave without acting",
          "fix": "Exact button text, placement, or section to add"
        }
      ]
    },
    {
      "id": "brand",
      "name": "Brand & First Impression",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference OG image, consistency signals, first impression.",
      "passed": ["Specific brand element working"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific brand issue",
          "impact": "Why this hurts perception",
          "fix": "Exactly what to create or fix"
        }
      ]
    },
    {
      "id": "socialProof",
      "name": "Reviews & Social Proof",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference testimonials detected and social links.",
      "passed": ["Specific social proof element found"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific missing social proof",
          "impact": "Why this gap loses sales",
          "fix": "Exactly what to add and where"
        }
      ]
    }
  ]
}`;

  // ── PASS 3: AI Visibility, Messaging, Competitor, Recommendations ────────────

  const pass3Prompt = `You are an expert website auditor. Use ONLY the real data below.

${baseContext}
${competitorContext}

Return ONLY valid JSON. No markdown. No truncation. Shorten text if needed but never stop early.

{
  "categories": [
    {
      "id": "aiVisibility",
      "name": "AI & Modern Search",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference schema count, content depth, structured data.",
      "passed": ["Specific thing helping AI visibility"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific AI visibility gap with actual data",
          "impact": "Why they are invisible to AI search",
          "fix": "Exactly what schema to add and what content to create"
        }
      ]
    },
    {
      "id": "messagingPresence",
      "name": "WhatsApp, Social & Messaging",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference social links detected and messaging apps provided.",
      "passed": ["Specific social element working"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific messaging gap",
          "impact": "Why poor messaging presence loses customers",
          "fix": "Exactly what to set up or improve"
        }
      ]
    },
    {
      "id": "competitorGap",
      "name": "What Competitors Are Doing Better",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual competitor data above.",
      "passed": ["Specific area where this site beats competitors"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific competitor advantage with actual data",
          "impact": "Why this sends customers to competitors",
          "fix": "Exactly what to add to close this gap"
        }
      ]
    }
  ],
  "priorityFixes": [
    { "rank": 1, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 2, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 3, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 4, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 5, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" }
  ],
  "quickWins": [
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data.", "timeToFix": "10 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data.", "timeToFix": "15 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data.", "timeToFix": "5 minutes" }
  ],
  "innovativeIdeas": [
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy/Medium/Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy/Medium/Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy/Medium/Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy/Medium/Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy/Medium/Hard", "impact": "Specific growth impact" }
  ],
  "competitorComparison": {
    "summary": "Specific comparison using actual competitor data",
    "theyWinAt": ["Specific advantage based on actual data"],
    "competitorsWinAt": ["Specific competitor advantage based on actual data"],
    "biggestGap": "The single most important gap",
    "howToWin": "Specific strategy based on actual data"
  },
  "missingElements": [
    "Specific missing element with actual data reference",
    "Specific missing element",
    "Specific missing element",
    "Specific missing element",
    "Specific missing element"
  ]
}`;

  // ── Run all 3 passes in parallel ─────────────────────────────────────────────

  async function runPass(prompt, passName) {
    try {
      const result = await generateWithGemini(prompt, { jsonMode: true });
      const cleaned = result.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      console.log(`[Auditor] ✅ ${passName} complete`);
      return parsed;
    } catch (err) {
      console.error(`[Auditor] ❌ ${passName} failed:`, err.message?.slice(0, 120));
      return null;
    }
  }

  const [pass1Result, pass2Result, pass3Result] = await Promise.all([
    runPass(pass1Prompt, "Pass 1 (SEO/Perf/Mobile/Content)"),
    runPass(pass2Prompt, "Pass 2 (Trust/Conversion/Brand/Social)"),
    runPass(pass3Prompt, "Pass 3 (AI/Messaging/Competitors/Recommendations)"),
  ]);

  if (!pass1Result) {
    throw new Error("Audit failed: core analysis could not be completed. Please try again.");
  }

  // ── Merge all passes into one response ───────────────────────────────────────

  const pass2Categories = pass2Result?.categories || [];
  const pass3Categories = pass3Result?.categories || [];
  const allCategories = [
    ...(pass1Result.categories || []),
    ...pass2Categories,
    ...pass3Categories,
  ];

  return {
    websiteName: pass1Result.websiteName,
    websiteType: pass1Result.websiteType,
    websiteIntent: pass1Result.websiteIntent,
    overallScore: pass1Result.overallScore,
    overallGrade: pass1Result.overallGrade,
    overallSummary: pass1Result.overallSummary,
    categories: allCategories,
    priorityFixes: pass3Result?.priorityFixes || [],
    quickWins: pass3Result?.quickWins || [],
    innovativeIdeas: pass3Result?.innovativeIdeas || [],
    competitorComparison: pass3Result?.competitorComparison || null,
    missingElements: pass3Result?.missingElements || [],
  };
}

export async function analyzeScreenshots(url, screenshots) {
  console.log(`[UX Audit] Analyzing ${screenshots.length} screenshots for ${url}`);

  const { GoogleGenAI } = await import("@google/genai");

  const GEMINI_KEY_1 = process.env.GEMINI_API_KEY;
  const GEMINI_KEY_2 = process.env.GEMINI_API_KEY_2;
  const keys = GEMINI_KEY_2 ? [GEMINI_KEY_1, GEMINI_KEY_2] : [GEMINI_KEY_1];
  const visionModels = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-flash-8b"];

  const imageParts = screenshots.map((s) => {
    const match = s.data.match(/^data:(image\/[a-z]+);base64,(.+)$/i);
    if (!match) return null;
    return { inlineData: { mimeType: match[1], data: match[2] } };
  }).filter(Boolean);

  const labelList = screenshots.map((s, i) => `Screenshot ${i + 1}: "${s.label}"`).join("\n");

  const prompt = `You are a world-class UX designer, product strategist, and growth expert. You have been given ${screenshots.length} screenshot(s) of a product from ${url}.

SCREENSHOTS PROVIDED:
${labelList}

Study every single pixel of these screenshots. Look at:
- Exact layout and visual hierarchy — what the eye goes to first and why
- Navigation structure — how easy or hard is it to find things
- Every button — its label, color, size, placement, and whether it's clear
- Typography — font sizes, contrast, readability
- Whitespace and breathing room — cramped or spacious
- Color usage — consistent or chaotic
- Empty states — what happens when there's no data
- Form design — how many fields, labels, error states
- Mobile considerations — would this work on a small screen
- Loading states and feedback — does the user know what's happening
- Onboarding — would a brand new user know exactly what to do
- Missing UI elements that the best products in this space always have
- Anything confusing, frustrating, or impressive

Be brutally specific. Reference exactly what you see — actual button labels, actual colors, actual layout problems. Do not give generic advice.

Rules:
- Plain English. Talk like a brilliant designer friend.
- Reference exactly what you see in each screenshot
- Every issue: specific problem, why it frustrates users, exact fix
- Ideas must be specific to this product

Return ONLY STRICT VALID JSON.

Never truncate.
Never omit closing braces.
Never use markdown.
Never use trailing commas.
If you approach the output limit, shorten descriptions instead of stopping. No markdown. No code blocks.

{
  "uxScore": 0-100,
  "uxGrade": "A/B/C/D/F",
  "uxSummary": "3 brutally honest sentences using specific observations. First impression. Biggest strength. Biggest problem.",
  "screenshotInsights": [
    {
      "label": "Exact screenshot label",
      "whatWeSee": "Specific description of exactly what this screen shows — layout, key elements, colors, purpose",
      "strengths": [
        "Specific strength with exact reference e.g. 'The green Start button is large, centered, and immediately visible'"
      ],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific problem with exact reference e.g. 'The navigation has 8 items with no visual hierarchy — all look equally important'",
          "impact": "Exactly how this frustrates or confuses real users",
          "fix": "Exact change to make — specific label, color, position, or element"
        }
      ]
    }
  ],
  "uxIssues": [
    {
      "severity": "Critical/High/Medium/Low",
      "issue": "Overall UX problem seen across multiple screens",
      "impact": "Why this is costing them users or retention",
      "fix": "Exact systematic fix"
    }
  ],
  "uxQuickWins": [
    {
      "title": "Specific quick win referencing actual element seen",
      "description": "Exactly what to change and what it currently says or looks like.",
      "timeToFix": "e.g. 30 minutes"
    }
  ],
  "uxInnovativeIdeas": [
    {
      "title": "Innovative idea specific to this product",
      "description": "Detailed explanation of the idea and exactly why it would work for this specific product based on what we see.",
      "effort": "Easy/Medium/Hard",
      "impact": "Specific user or growth impact"
    }
  ],
  "missingFeatures": [
    "Specific feature missing — reference what the best competing products have that this one doesn't"
  ]
}`;

  const contents = [
    {
      role: "user",
      parts: [
        { text: prompt },
        ...imageParts,
      ],
    },
  ];

  let response = null;
  let lastError = null;

  outer:
  for (const model of visionModels) {
    for (const key of keys) {
      try {
        const aiClient = new GoogleGenAI({ apiKey: key });
        console.log(`[UX Audit] Trying model=${model}`);
        response = await aiClient.models.generateContent({
          model,
          contents,
          config: {
            maxOutputTokens: 16000,
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        });
        console.log(`[UX Audit] Success with model=${model}`);
        break outer;
      } catch (e) {
        lastError = e;
        console.warn(`[UX Audit] Failed model=${model}: ${e.message?.slice(0, 100)}`);
        continue;
      }
    }
  }

  if (!response) throw lastError || new Error("All vision models failed");

  let text = null;
  if (typeof response?.text === "function") text = response.text();
  else if (typeof response?.text === "string") text = response.text;
  else text = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

  if (!text) throw new Error("Empty response from Gemini Vision");

  const cleaned = String(text).replace(/```json/g, "").replace(/```/g, "").trim();
  try {
  try {
  return JSON.parse(cleaned);
} catch (e) {
  console.error(cleaned);
  throw new Error("Gemini returned invalid JSON.");
}
} catch (e) {
  console.error(cleaned);
  throw new Error("Gemini returned invalid JSON.");
}
}

export function getGradeColor(grade) {
  const colors = {
    A: "#075a01",
    B: "#0a8f01",
    C: "#f59e0b",
    D: "#f97316",
    F: "#ef4444",
  };
  return colors[grade] || "#6b7280";
}

export function getSeverityColor(severity) {
  const colors = {
    Critical: "#ef4444",
    High: "#f97316",
    Medium: "#f59e0b",
    Low: "#6b7280",
  };
  return colors[severity] || "#6b7280";
}

export function getSeverityBg(severity) {
  const bgs = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-gray-100 text-gray-600",
  };
  return bgs[severity] || "bg-gray-100 text-gray-600";
}