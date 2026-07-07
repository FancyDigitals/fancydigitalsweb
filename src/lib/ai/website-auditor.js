import { generateWithGemini } from "@/lib/ai/gemini";
import { fetchAndParseURL } from "@/lib/audit/html-parser";

export async function auditWebsite(url, pageSpeedData, parsedHTML, options = {}) {
  const { competitors = [], messagingApps = [], competitorData = [] } = options;

  // Build competitor context
  const competitorContext = competitorData.length > 0
    ? `COMPETITOR ANALYSIS (we fetched and analyzed these sites):
${competitorData.map((c, i) => `
Competitor ${i + 1}: ${c.url}
- Page Title: ${c.data?.meta?.title || "None"}
- Description: ${c.data?.meta?.description || "None"}
- H1s: ${c.data?.headings?.h1s?.join(", ") || "None"}
- Has Schema: ${c.data?.meta?.hasSchema}
- Has Testimonials: ${c.data?.trustSignals?.hasTestimonials}
- Has Pricing: ${c.data?.trustSignals?.hasPricing}
- Has FAQ: ${c.data?.trustSignals?.hasFAQ}
- Has Live Chat: ${c.data?.trustSignals?.hasLiveChat}
- Word Count: ${c.data?.content?.wordCount}
- Images without alt: ${c.data?.images?.withoutAlt}
- CTAs: ${c.data?.ctas?.ctaLinks?.join(", ") || "None"}
`).join("\n")}`
    : `COMPETITORS: ${competitors.length > 0 ? competitors.join(", ") + " (could not fetch — compare against industry best practices)" : "None provided — compare against industry best practices"}`;

  // Build full page speed context
  const speedContext = pageSpeedData ? `
GOOGLE PAGESPEED SCORES:
- Performance: ${pageSpeedData.performanceScore}/100
- SEO: ${pageSpeedData.seo?.score}/100
- Accessibility: ${pageSpeedData.accessibility?.score}/100
- Best Practices: ${pageSpeedData.bestPractices?.score}/100
- First Contentful Paint: ${pageSpeedData.fcp || "Unknown"}
- Largest Contentful Paint: ${pageSpeedData.lcp || "Unknown"}
- Total Blocking Time: ${pageSpeedData.tbt || "Unknown"}
- Speed Index: ${pageSpeedData.speedIndex || "Unknown"}
- Cumulative Layout Shift: ${pageSpeedData.cls || "Unknown"}

SPEED OPPORTUNITIES (things Google says to fix):
${pageSpeedData.opportunities?.map(o => `- ${o.title}: ${o.description}`).join("\n") || "None detected"}` : "PAGESPEED: Could not fetch";

  // Build structured HTML context
  const htmlContext = parsedHTML ? `
WEBSITE STRUCTURE ANALYSIS:
Page Title: "${parsedHTML.meta?.title || "MISSING"}" (${parsedHTML.meta?.titleLength} chars — ideal is 30-60)
Meta Description: "${parsedHTML.meta?.description || "MISSING"}" (${parsedHTML.meta?.descriptionLength} chars — ideal is 70-160)
Canonical URL: ${parsedHTML.meta?.canonical || "MISSING"}
Viewport Meta: ${parsedHTML.meta?.viewport || "MISSING"}
Robots Meta: ${parsedHTML.meta?.robots || "Not set"}
OG Title: ${parsedHTML.meta?.ogTitle || "MISSING"}
OG Description: ${parsedHTML.meta?.ogDescription || "MISSING"}
OG Image: ${parsedHTML.meta?.ogImage || "MISSING"}
Schema Markup: ${parsedHTML.meta?.hasSchema ? `YES (${parsedHTML.meta?.schemaCount} schemas found)` : "MISSING"}

HEADINGS:
H1s (${parsedHTML.headings?.h1Count}): ${parsedHTML.headings?.h1s?.join(" | ") || "NONE"}
H2s (${parsedHTML.headings?.h2Count}): ${parsedHTML.headings?.h2s?.join(" | ") || "NONE"}
H3s (${parsedHTML.headings?.h3Count}): ${parsedHTML.headings?.h3s?.join(" | ") || "NONE"}

LINKS:
Internal links: ${parsedHTML.links?.internalCount}
External links: ${parsedHTML.links?.externalCount}

IMAGES:
Total images: ${parsedHTML.images?.total}
Images missing alt text: ${parsedHTML.images?.withoutAlt} (${parsedHTML.images?.altCoverage}% have alt text)

CALLS TO ACTION:
Buttons: ${parsedHTML.ctas?.buttons?.join(", ") || "None found"}
CTA Links: ${parsedHTML.ctas?.ctaLinks?.join(", ") || "None found"}
Forms: ${parsedHTML.ctas?.forms}

TRUST SIGNALS DETECTED:
- Pricing section: ${parsedHTML.trustSignals?.hasPricing ? "YES" : "NO"}
- Testimonials/Reviews: ${parsedHTML.trustSignals?.hasTestimonials ? "YES" : "NO"}
- Team section: ${parsedHTML.trustSignals?.hasTeam ? "YES" : "NO"}
- FAQ section: ${parsedHTML.trustSignals?.hasFAQ ? "YES" : "NO"}
- Contact info: ${parsedHTML.trustSignals?.hasContactInfo ? "YES" : "NO"}
- Social media links: ${parsedHTML.trustSignals?.hasSocialLinks ? "YES" : "NO"}
- Live chat: ${parsedHTML.trustSignals?.hasLiveChat ? "YES" : "NO"}
- Cookie/GDPR banner: ${parsedHTML.trustSignals?.hasCookieBanner ? "YES" : "NO"}
- SSL/HTTPS: ${parsedHTML.trustSignals?.hasSSL ? "YES" : "NO"}

CONTENT:
Word count: ${parsedHTML.content?.wordCount} words
Content sample: ${parsedHTML.content?.textContent?.slice(0, 3000)}

MESSAGING APPS USED: ${messagingApps.length > 0 ? messagingApps.join(", ") : "None provided"}` : "HTML STRUCTURE: Could not fetch";

  const prompt = `You are the world's best website auditor — combining the expertise of a top SEO specialist, conversion rate optimizer, UX designer, brand strategist, and growth hacker. You have been given REAL DATA about this website — not guesses.

WEBSITE URL: ${url}

${speedContext}

${htmlContext}

${competitorContext}

Your job is to give the most accurate, specific, and actionable audit possible using ALL the real data above. Do not guess — use the actual data. If the title is missing, say it's missing. If the H1 says something specific, reference it. If the PageSpeed score is 23, reference that exact number.

CRITICAL RULES:
- Use PLAIN ENGLISH. No jargon. Talk like a smart friend.
- Reference ACTUAL DATA from above — specific numbers, actual titles, actual headings
- Every issue: what exactly is wrong (with specifics), why it hurts the business, exactly what to do
- Every fix must be a specific actionable step — not "improve your SEO" but "add a page title that says X"
- Be brutally honest. If something is terrible, say so clearly but kindly
- Innovative ideas must be creative and specific to THIS business

Return ONLY valid JSON. No markdown. No code blocks. Keep text concise.

{
  "websiteName": "detected name",
  "websiteType": "e.g. Portfolio, SaaS, E-commerce, Agency, Blog, Restaurant",
  "websiteIntent": "One plain sentence — what this site does and who it helps.",
  "overallScore": 0-100,
  "overallGrade": "A/B/C/D/F",
  "overallSummary": "3 honest plain sentences using real data. What works. What the biggest problems are. What they need most urgently.",
  "categories": [
    {
      "id": "seo",
      "name": "SEO & Discoverability",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual data — page title length, meta description presence, H1s, schema. Can people find this on Google?",
      "passed": [
        "Specific thing working — reference actual data e.g. 'Your H1 says X which is clear and keyword-rich'"
      ],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific problem with actual data e.g. 'Your page title is 89 characters — Google cuts off at 60'",
          "impact": "Why this specific issue costs them customers or rankings",
          "fix": "Exact specific fix e.g. 'Shorten your page title to: [suggested title under 60 chars]'"
        }
      ]
    },
    {
      "id": "performance",
      "name": "Speed & Loading",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual PageSpeed score and specific metrics like FCP, LCP. How fast does it load?",
      "passed": ["Specific working thing with actual data"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific issue with actual metric e.g. 'Your page takes 4.2s to show content (LCP) — users expect under 2.5s'",
          "impact": "Why this specific speed issue loses visitors",
          "fix": "Specific fix referencing the actual opportunity Google flagged"
        }
      ]
    },
    {
      "id": "mobile",
      "name": "Phone & Tablet Experience",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference viewport meta, mobile PageSpeed data. Does it work well on phones?",
      "passed": ["Specific working thing"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific mobile issue",
          "impact": "Why this makes mobile visitors leave",
          "fix": "Exactly what to fix"
        }
      ]
    },
    {
      "id": "content",
      "name": "Words & Messaging",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual H1s, word count, CTA text. Does the messaging clearly explain the offer?",
      "passed": ["Specific working thing with actual content reference"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific content issue referencing actual text found",
          "impact": "Why this messaging gap loses customers",
          "fix": "Exact suggested copy or structural change"
        }
      ]
    },
    {
      "id": "trust",
      "name": "Trust & Credibility",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual trust signals detected — testimonials YES/NO, team YES/NO, SSL YES/NO etc.",
      "passed": ["Specific trust signal that was detected"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific missing trust signal e.g. 'No testimonials or reviews found on the page'",
          "impact": "Why this missing element makes visitors not trust the business",
          "fix": "Exactly what to add and where"
        }
      ]
    },
    {
      "id": "conversion",
      "name": "Getting People to Act",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual CTAs found, buttons, forms. Is the site guiding visitors to take action?",
      "passed": ["Specific CTA or conversion element that works"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific conversion issue referencing actual buttons/forms found",
          "impact": "Why visitors leave without contacting or buying",
          "fix": "Exact button text, placement, or section to add"
        }
      ]
    },
    {
      "id": "brand",
      "name": "Brand & First Impression",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference OG image, visual consistency signals, first impression from content. Does it feel professional?",
      "passed": ["Specific brand element working"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific brand issue e.g. 'No OG image set — social shares show a blank preview'",
          "impact": "Why this hurts perception and trust",
          "fix": "Exactly what to create or fix"
        }
      ]
    },
    {
      "id": "socialProof",
      "name": "Reviews & Social Proof",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference testimonials detected, social links found. Does it show real people trust this business?",
      "passed": ["Specific social proof element found"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific missing social proof with reference to what was detected",
          "impact": "Why this gap loses sales",
          "fix": "Exactly what to add — type of proof, where on page"
        }
      ]
    },
    {
      "id": "aiVisibility",
      "name": "AI & Modern Search",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference schema count, content depth, structured data. Would AI tools recommend this site?",
      "passed": ["Specific thing helping AI visibility"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific AI visibility gap with reference to actual data e.g. 'No schema markup found — AI tools cannot understand your business type'",
          "impact": "Why they are invisible to AI search",
          "fix": "Exactly what schema type to add and what content to create"
        }
      ]
    },
    {
      "id": "messagingPresence",
      "name": "WhatsApp, Social & Messaging",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference social links detected and messaging apps provided. How well is this business using social to connect?",
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
      "summary": "Reference actual competitor data fetched above. What specific advantages do competitors have?",
      "passed": ["Specific area where this site beats competitors based on actual data"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific competitor advantage with reference to actual competitor data",
          "impact": "Why this gap sends customers to competitors",
          "fix": "Exactly what to add or build to close this gap"
        }
      ]
    }
  ],
  "priorityFixes": [
    { "rank": 1, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific actionable fix", "estimatedImpact": "Measurable improvement expected" },
    { "rank": 2, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific actionable fix", "estimatedImpact": "Measurable improvement expected" },
    { "rank": 3, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific actionable fix", "estimatedImpact": "Measurable improvement expected" },
    { "rank": 4, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific actionable fix", "estimatedImpact": "Measurable improvement expected" },
    { "rank": 5, "severity": "Critical/High/Medium/Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific actionable fix", "estimatedImpact": "Measurable improvement expected" }
  ],
  "quickWins": [
    { "title": "Specific quick win", "description": "Exact one-sentence action referencing real data.", "timeToFix": "e.g. 10 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action referencing real data.", "timeToFix": "e.g. 15 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action referencing real data.", "timeToFix": "e.g. 5 minutes" }
  ],
  "innovativeIdeas": [
    { "title": "Creative specific idea", "description": "Specific idea tailored to this exact business and what we see on their site.", "effort": "Easy/Medium/Hard", "impact": "Specific growth or revenue impact" },
    { "title": "Creative specific idea", "description": "Specific idea tailored to this exact business and what we see on their site.", "effort": "Easy/Medium/Hard", "impact": "Specific growth or revenue impact" },
    { "title": "Creative specific idea", "description": "Specific idea tailored to this exact business and what we see on their site.", "effort": "Easy/Medium/Hard", "impact": "Specific growth or revenue impact" },
    { "title": "Creative specific idea", "description": "Specific idea tailored to this exact business and what we see on their site.", "effort": "Easy/Medium/Hard", "impact": "Specific growth or revenue impact" },
    { "title": "Creative specific idea", "description": "Specific idea tailored to this exact business and what we see on their site.", "effort": "Easy/Medium/Hard", "impact": "Specific growth or revenue impact" }
  ],
  "competitorComparison": {
    "summary": "Specific comparison using actual competitor data fetched",
    "theyWinAt": ["Specific advantage based on actual data"],
    "competitorsWinAt": ["Specific competitor advantage based on actual data"],
    "biggestGap": "The single most important gap based on real competitor data",
    "howToWin": "Specific strategy to beat competitors based on the actual data"
  },
  "missingElements": [
    "Specific missing element referenced from actual data — e.g. 'Schema markup — 0 schemas found, competitors have 3'",
    "Specific missing element",
    "Specific missing element",
    "Specific missing element",
    "Specific missing element"
  ]
}`;

  const result = await generateWithGemini(prompt, { jsonMode: true });
  const cleaned = result.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
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

Return ONLY valid JSON. No markdown. No code blocks.

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
  return JSON.parse(cleaned);
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