import { generateWithGemini } from "@/lib/ai/gemini";

/**
 * Fetch PageSpeed data with retry.
 */
async function fetchPageSpeed(url, strategy = "mobile") {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!apiKey) return null;

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices&key=${apiKey}`;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(endpoint, {
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(60000),
      });
      if (!res.ok) {
        console.warn(`[PageSpeed] ${strategy} attempt ${attempt} → HTTP ${res.status}`);
        if (attempt === 2) return null;
        await new Promise((r) => setTimeout(r, 2000));
        continue;
      }
      const data = await res.json();
      return processPageSpeedResult(data);
    } catch (err) {
      console.warn(`[PageSpeed] ${strategy} attempt ${attempt} failed: ${err.message?.slice(0, 100)}`);
      if (attempt === 2) return null;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  return null;
}

function processPageSpeedResult(result) {
  if (!result?.lighthouseResult) return null;
  const lh = result.lighthouseResult;

  const opportunities = Object.values(lh.audits || {})
    .filter((a) => a?.details?.type === "opportunity" && a.score !== null && a.score < 0.9)
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .slice(0, 8)
    .map((a) => ({
      title: a.title,
      description: a.description?.replace(/\[.*?\]\(.*?\)/g, "").trim(),
      score: a.score,
      savingsMs: a.details?.overallSavingsMs || 0,
    }));

  const diagnostics = Object.values(lh.audits || {})
    .filter((a) => a?.details?.type === "diagnostic" && a.score !== null && a.score < 1)
    .slice(0, 5)
    .map((a) => ({ title: a.title, description: a.description?.replace(/\[.*?\]\(.*?\)/g, "").trim() }));

  return {
    performanceScore: Math.round((lh.categories?.performance?.score || 0) * 100),
    seoScore: Math.round((lh.categories?.seo?.score || 0) * 100),
    accessibilityScore: Math.round((lh.categories?.accessibility?.score || 0) * 100),
    bestPracticesScore: Math.round((lh.categories?.["best-practices"]?.score || 0) * 100),
    fcp: lh.audits?.["first-contentful-paint"]?.displayValue,
    lcp: lh.audits?.["largest-contentful-paint"]?.displayValue,
    tbt: lh.audits?.["total-blocking-time"]?.displayValue,
    cls: lh.audits?.["cumulative-layout-shift"]?.displayValue,
    speedIndex: lh.audits?.["speed-index"]?.displayValue,
    tti: lh.audits?.["interactive"]?.displayValue,
    opportunities,
    diagnostics,
  };
}

/**
 * Run both mobile + desktop PageSpeed in parallel.
 */
export async function fetchDualPageSpeed(url) {
  const [mobile, desktop] = await Promise.all([
    fetchPageSpeed(url, "mobile"),
    fetchPageSpeed(url, "desktop"),
  ]);
  return { mobile, desktop };
}

export async function auditWebsite(url, pageSpeedData, parsedHTML, options = {}) {
  const { competitors = [], messagingApps = [], competitorData = [] } = options;

  // pageSpeedData is now { mobile, desktop } — normalize
  const mobilePS = pageSpeedData?.mobile || null;
  const desktopPS = pageSpeedData?.desktop || null;

  // ─── DATA QUALITY GATE ────────────────────────────────────────────────────
  const dataQuality = {
    hasHTML: !!parsedHTML,
    hasMobilePageSpeed: !!mobilePS,
    hasDesktopPageSpeed: !!desktopPS,
    isSPA: parsedHTML?.spa?.isLikelySPA || false,
    warnings: [],
  };
  if (!parsedHTML) dataQuality.warnings.push("Website HTML could not be fetched or parsed.");
  if (!mobilePS && !desktopPS) dataQuality.warnings.push("Google PageSpeed data unavailable — performance scores are approximate.");
  if (parsedHTML?.spa?.warning) dataQuality.warnings.push(parsedHTML.spa.warning);

  // ─── CONTEXT BUILDERS ────────────────────────────────────────────────────

  const speedContext = (mobilePS || desktopPS) ? `
GOOGLE PAGESPEED SCORES (REAL DATA):
${mobilePS ? `
MOBILE:
- Performance: ${mobilePS.performanceScore}/100
- SEO: ${mobilePS.seoScore}/100
- Accessibility: ${mobilePS.accessibilityScore}/100
- Best Practices: ${mobilePS.bestPracticesScore}/100
- FCP (First Contentful Paint): ${mobilePS.fcp || "Unknown"}
- LCP (Largest Contentful Paint): ${mobilePS.lcp || "Unknown"}
- TBT (Total Blocking Time): ${mobilePS.tbt || "Unknown"}
- CLS (Cumulative Layout Shift): ${mobilePS.cls || "Unknown"}
- Speed Index: ${mobilePS.speedIndex || "Unknown"}
- Time to Interactive: ${mobilePS.tti || "Unknown"}` : "MOBILE: Not available"}
${desktopPS ? `
DESKTOP:
- Performance: ${desktopPS.performanceScore}/100
- SEO: ${desktopPS.seoScore}/100
- Accessibility: ${desktopPS.accessibilityScore}/100
- Best Practices: ${desktopPS.bestPracticesScore}/100
- FCP: ${desktopPS.fcp || "Unknown"}
- LCP: ${desktopPS.lcp || "Unknown"}` : "DESKTOP: Not available"}

TOP SPEED OPPORTUNITIES (${mobilePS?.opportunities?.length || 0} found):
${mobilePS?.opportunities?.map((o) => `- ${o.title}${o.savingsMs > 0 ? ` (save ~${Math.round(o.savingsMs)}ms)` : ""}: ${o.description || ""}`).join("\n") || "None"}`
    : "PAGESPEED: NOT AVAILABLE — do not invent performance scores. Use 'Unknown' if referenced.";

  const htmlContext = parsedHTML ? `
WEBSITE STRUCTURE (REAL PARSED DATA):
Platform Detected: ${parsedHTML.platform}
${parsedHTML.spa?.isLikelySPA ? `⚠️ SPA WARNING: ${parsedHTML.spa.warning}` : ""}

META TAGS:
- Title: "${parsedHTML.meta?.title || "MISSING"}" (${parsedHTML.meta?.titleLength} chars — ${parsedHTML.meta?.titleLength >= 30 && parsedHTML.meta?.titleLength <= 60 ? "GOOD" : parsedHTML.meta?.titleLength > 60 ? "TOO LONG" : "TOO SHORT"})
- Meta Description: "${parsedHTML.meta?.description || "MISSING"}" (${parsedHTML.meta?.descriptionLength} chars — ${parsedHTML.meta?.descriptionLength >= 120 && parsedHTML.meta?.descriptionLength <= 160 ? "GOOD" : parsedHTML.meta?.descriptionLength > 160 ? "TOO LONG" : "TOO SHORT"})
- Canonical: ${parsedHTML.meta?.canonical || "MISSING"}
- Viewport: ${parsedHTML.meta?.viewport || "MISSING"}
- Robots: ${parsedHTML.meta?.robots || "Not set (default: index, follow)"}
- HTML Lang: ${parsedHTML.meta?.lang || "MISSING"}
- Favicon: ${parsedHTML.meta?.favicon ? "PRESENT" : "MISSING"}
- Theme Color: ${parsedHTML.meta?.themeColor || "MISSING"}

OPEN GRAPH (Social Sharing):
- OG Title: ${parsedHTML.meta?.ogTitle ? "PRESENT" : "MISSING"}
- OG Description: ${parsedHTML.meta?.ogDescription ? "PRESENT" : "MISSING"}
- OG Image: ${parsedHTML.meta?.ogImage ? "PRESENT" : "MISSING"}
- Twitter Card: ${parsedHTML.meta?.twitterCard || "MISSING"}

STRUCTURED DATA (Schema.org for AI Search):
- Schema Count: ${parsedHTML.meta?.schemaCount || 0}
- Valid Schemas: ${parsedHTML.meta?.validSchemas || 0}
- Schema Types Detected: ${parsedHTML.meta?.schemaTypes?.join(", ") || "NONE"}

HEADINGS HIERARCHY:
- H1 Count: ${parsedHTML.headings?.h1Count} ${parsedHTML.headings?.multipleH1s ? "⚠️ MULTIPLE H1s (should be 1)" : parsedHTML.headings?.noH1 ? "⚠️ NO H1" : "✓ GOOD"}
- H1s: ${parsedHTML.headings?.h1s?.slice(0, 3).join(" | ") || "NONE"}
- H2 Count: ${parsedHTML.headings?.h2Count}
- Top H2s: ${parsedHTML.headings?.h2s?.slice(0, 5).join(" | ") || "NONE"}
- H3 Count: ${parsedHTML.headings?.h3Count}

LINKS:
- Total Links: ${parsedHTML.links?.total}
- Internal Links: ${parsedHTML.links?.internalCount}
- External Links: ${parsedHTML.links?.externalCount}
- External Domains Linked: ${parsedHTML.links?.externalDomains?.slice(0, 5).join(", ") || "None"}

IMAGES:
- Total Images: ${parsedHTML.images?.total}
- Missing Alt Text: ${parsedHTML.images?.withoutAlt} (${parsedHTML.images?.altCoverage}% alt coverage)
- Missing Dimensions: ${parsedHTML.images?.withoutDimensions} (causes layout shift)
- Lazy Loaded: ${parsedHTML.images?.lazyLoaded}

CALLS TO ACTION:
- Total Buttons: ${parsedHTML.ctas?.buttonCount}
- CTA Buttons Found: ${parsedHTML.ctas?.ctaButtons?.slice(0, 5).join(" | ") || "NONE"}
- CTA Links Found: ${parsedHTML.ctas?.ctaLinks?.slice(0, 5).join(" | ") || "NONE"}
- Total Forms: ${parsedHTML.ctas?.forms}
- Email Capture Forms: ${parsedHTML.ctas?.emailCaptureForms}

TRUST SIGNALS:
- SSL (HTTPS): ${parsedHTML.trustSignals?.hasSSL ? "YES ✓" : "NO ⚠️"}
- Pricing Info: ${parsedHTML.trustSignals?.hasPricing ? "YES" : "NO"}
- Testimonials: ${parsedHTML.trustSignals?.hasTestimonials ? "YES" : "NO"} ${parsedHTML.trustSignals?.hasBlockquotes ? "(blockquotes)" : ""} ${parsedHTML.trustSignals?.hasStarRatings ? "(star ratings)" : ""}
- Team Section: ${parsedHTML.trustSignals?.hasTeam ? "YES" : "NO"}
- FAQ Section: ${parsedHTML.trustSignals?.hasFAQ ? "YES" : "NO"}
- Contact Info: ${parsedHTML.trustSignals?.hasContactInfo ? "YES" : "NO"} ${parsedHTML.trustSignals?.hasEmailInPage ? "(email)" : ""} ${parsedHTML.trustSignals?.hasPhoneNumber ? "(phone)" : ""}
- Live Chat: ${parsedHTML.trustSignals?.hasLiveChat ? `YES (${parsedHTML.trustSignals?.activeChatWidgets?.join(", ")})` : "NO"}
- Cookie Banner: ${parsedHTML.trustSignals?.hasCookieBanner ? "YES" : "NO"}

SOCIAL PRESENCE:
- Platforms Linked: ${parsedHTML.trustSignals?.socialLinksCount}/8
${Object.entries(parsedHTML.trustSignals?.socialPlatforms || {}).map(([p, has]) => `  - ${p}: ${has ? "YES" : "NO"}`).join("\n")}

ANALYTICS INSTALLED:
${parsedHTML.analytics?.activeAnalytics?.length ? parsedHTML.analytics.activeAnalytics.map((a) => `- ${a}: YES`).join("\n") : "- NONE DETECTED"}

MOBILE FRIENDLINESS:
- Viewport Meta: ${parsedHTML.mobile?.hasViewportMeta ? "YES" : "NO"}
- Correct Viewport (width=device-width): ${parsedHTML.mobile?.viewportHasWidth ? "YES" : "NO"}
- Blocks Zoom: ${parsedHTML.mobile?.viewportBlocksZoom ? "YES ⚠️ (accessibility issue)" : "NO ✓"}
- Responsive Images: ${parsedHTML.mobile?.hasResponsiveImages ? "YES" : "NO"}
- Media Queries: ${parsedHTML.mobile?.hasMediaQueries ? "YES" : "NO"}

ACCESSIBILITY:
- Form Inputs Without Labels: ${parsedHTML.accessibility?.inputsWithoutLabels}
- Buttons Without Text/Labels: ${parsedHTML.accessibility?.buttonsWithoutLabels}
- Links Without Text: ${parsedHTML.accessibility?.linksWithoutText}

CONTENT:
- Word Count (main content): ${parsedHTML.content?.wordCount}
- Paragraph Count: ${parsedHTML.content?.paragraphCount}
- Avg Paragraph Length: ${parsedHTML.content?.avgParagraphLength} words
- Content Sample: "${parsedHTML.content?.textContent?.slice(0, 500)}..."

USER-PROVIDED MESSAGING APPS: ${messagingApps.length > 0 ? messagingApps.join(", ") : "None"}`
    : `WEBSITE HTML: COULD NOT BE FETCHED. Do not invent structure data. Say "Unable to analyze HTML structure" for those categories.`;

  const competitorContext = competitorData.length > 0
    ? `COMPETITORS ANALYZED (REAL DATA):
${competitorData.map((c, i) => {
  const d = c.data;
  if (!d) return `Competitor ${i + 1} (${c.url}): Could not fetch`;
  return `
Competitor ${i + 1}: ${c.url}
- Platform: ${d.platform}
- Title: "${d.meta?.title || "None"}" (${d.meta?.titleLength} chars)
- Meta Description: ${d.meta?.descriptionLength} chars
- H1: "${d.headings?.h1s?.[0] || "None"}"
- Schema Types: ${d.meta?.schemaTypes?.join(", ") || "NONE"}
- Word Count: ${d.content?.wordCount}
- Trust Signals: Pricing=${d.trustSignals?.hasPricing}, Testimonials=${d.trustSignals?.hasTestimonials}, FAQ=${d.trustSignals?.hasFAQ}, Team=${d.trustSignals?.hasTeam}, LiveChat=${d.trustSignals?.hasLiveChat}
- Social Platforms: ${d.trustSignals?.socialLinksCount}/8
- Top CTAs: ${d.ctas?.ctaLinks?.slice(0, 3).join(", ") || "None"}
- Analytics: ${d.analytics?.activeAnalytics?.join(", ") || "None"}`;
}).join("\n")}`
    : `COMPETITORS: ${competitors.length > 0 ? competitors.join(", ") + " (data not fetched)" : "None provided — use industry best practices"}`;

  const dataQualityContext = dataQuality.warnings.length > 0
    ? `\n⚠️ DATA QUALITY WARNINGS:\n${dataQuality.warnings.map((w) => `- ${w}`).join("\n")}\n\nCRITICAL: When data is missing above, EXPLICITLY state "data unavailable" in your response. DO NOT invent scores or details.\n`
    : "";

  const baseContext = `URL: ${url}\n${dataQualityContext}\n${speedContext}\n${htmlContext}`;

  // ─── PROMPTS ─────────────────────────────────────────────────────────────

  const commonInstructions = `
CRITICAL ACCURACY RULES:
1. Use ONLY the real data provided above. Never invent scores, metrics, or details.
2. When PageSpeed data says "NOT AVAILABLE", say "Performance data unavailable — could not measure" instead of guessing.
3. When a trust signal shows "NO" in the data, treat it as confirmed absent.
4. When counts are given (e.g. "H1 Count: 2"), reference exact numbers.
5. Reference actual titles, actual H1s, actual button text — never invent copy.
6. If Website HTML says "COULD NOT BE FETCHED", give the site a warning and skip HTML-based issues.
7. Scores must reflect the actual data — if a site has 90+ PageSpeed AND full trust signals, score high. Do not lowball.
8. CRITICAL: Return PLAIN TEXT ONLY in string values. No markdown. No asterisks. No hashes. No backticks.
9. Return ONLY valid JSON. No markdown fences. No trailing commas.
`;

  const pass1Prompt = `You are an expert website auditor with 15 years of experience.

${baseContext}
${commonInstructions}

Return ONLY valid JSON:
{
  "websiteName": "detected business/website name",
  "websiteType": "Portfolio | SaaS | E-commerce | Agency | Blog | Restaurant | Local Business | Personal | Marketplace | Other",
  "websiteIntent": "One clear sentence: what this site does and who it serves.",
  "overallScore": 0-100,
  "overallGrade": "A/B/C/D/F",
  "overallSummary": "3 honest sentences using actual data references (real title, real scores, real gaps).",
  "categories": [
    {
      "id": "seo",
      "name": "SEO & Discoverability",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference exact title length, meta description length, H1 count, schema types found.",
      "passed": ["Specific working thing with real data references"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific problem citing actual data (e.g. 'Meta description is 210 characters — will be truncated in Google search')",
          "impact": "Concrete business/ranking impact",
          "fix": "Exact actionable fix"
        }
      ]
    },
    {
      "id": "performance",
      "name": "Speed & Loading",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference actual mobile + desktop PageSpeed scores and Core Web Vitals.",
      "passed": ["Real working thing"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific PageSpeed issue with actual metric value",
          "impact": "Why this loses visitors",
          "fix": "Specific fix referencing the exact PageSpeed opportunity"
        }
      ]
    },
    {
      "id": "mobile",
      "name": "Phone & Tablet Experience",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference viewport meta, mobile PageSpeed score, responsive signals.",
      "passed": ["Specific working thing"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
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
      "summary": "Reference actual H1s, word count, paragraph structure, CTA text.",
      "passed": ["Specific working thing with actual content quotes"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific issue quoting actual text found",
          "impact": "Why this messaging gap loses customers",
          "fix": "Exact suggested copy or structural change"
        }
      ]
    }
  ]
}`;

  const pass2Prompt = `You are an expert website auditor.

${baseContext}
${commonInstructions}

Return ONLY valid JSON:
{
  "categories": [
    {
      "id": "trust",
      "name": "Trust & Credibility",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference exact trust signals found — SSL YES/NO, testimonials YES/NO, team YES/NO, contact info YES/NO, live chat platform if detected.",
      "passed": ["Specific detected trust signal"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific missing trust signal (only flag signals that data confirms are missing)",
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
      "summary": "Reference actual CTA buttons found, form count, email capture presence.",
      "passed": ["Specific CTA element working — quote actual button/link text"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
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
      "summary": "Reference OG image presence, favicon, theme color, consistency signals.",
      "passed": ["Specific brand element working"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific brand issue with data reference",
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
      "summary": "Reference testimonial detection (blockquotes, star ratings) and social platforms found.",
      "passed": ["Specific social proof element found"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific missing social proof",
          "impact": "Why this gap loses sales",
          "fix": "Exactly what to add and where"
        }
      ]
    }
  ]
}`;

  const pass3Prompt = `You are an expert website auditor.

${baseContext}
${competitorContext}
${commonInstructions}

Return ONLY valid JSON:
{
  "categories": [
    {
      "id": "aiVisibility",
      "name": "AI & Modern Search",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference exact schema count, schema types detected, content depth, word count.",
      "passed": ["Specific thing helping AI visibility"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific AI visibility gap with actual data",
          "impact": "Why they are invisible to AI search (ChatGPT, Gemini, Perplexity)",
          "fix": "Exactly what schema to add (name the schema type) and what content to create"
        }
      ]
    },
    {
      "id": "messagingPresence",
      "name": "WhatsApp, Social & Messaging",
      "score": 0-100,
      "grade": "A/B/C/D/F",
      "summary": "Reference exact social platforms detected (list which ones YES/NO) and messaging apps provided.",
      "passed": ["Specific social element working"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific messaging/social gap with data",
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
      "summary": "Reference specific competitor data above by URL. If no competitors provided, say 'No competitors provided for direct comparison'.",
      "passed": ["Specific area where this site beats or matches competitors (with data)"],
      "issues": [
        {
          "severity": "Critical | High | Medium | Low",
          "issue": "Specific competitor advantage with actual data (e.g. 'Competitor X has 5 schema types, this site has 0')",
          "impact": "Why this sends customers to competitors",
          "fix": "Exactly what to add to close this gap"
        }
      ]
    }
  ],
  "priorityFixes": [
    { "rank": 1, "severity": "Critical | High | Medium | Low", "category": "Category name", "issue": "Specific issue with actual data", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 2, "severity": "Critical | High | Medium | Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 3, "severity": "Critical | High | Medium | Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 4, "severity": "Critical | High | Medium | Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" },
    { "rank": 5, "severity": "Critical | High | Medium | Low", "category": "Category name", "issue": "Specific issue", "fix": "Specific fix", "estimatedImpact": "Measurable improvement" }
  ],
  "quickWins": [
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data reference.", "timeToFix": "10 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data reference.", "timeToFix": "15 minutes" },
    { "title": "Specific quick win", "description": "Exact one-sentence action with real data reference.", "timeToFix": "5 minutes" }
  ],
  "innovativeIdeas": [
    { "title": "Creative specific idea", "description": "Specific to this exact business and their detected industry.", "effort": "Easy | Medium | Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy | Medium | Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy | Medium | Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy | Medium | Hard", "impact": "Specific growth impact" },
    { "title": "Creative specific idea", "description": "Specific to this exact business.", "effort": "Easy | Medium | Hard", "impact": "Specific growth impact" }
  ],
  "competitorComparison": {
    "summary": "Specific comparison using actual competitor data (name URLs). If no competitors, say 'No competitors analyzed'.",
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

  // ─── RUN PASSES IN PARALLEL ──────────────────────────────────────────────

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

  const allCategories = [
    ...(pass1Result.categories || []),
    ...(pass2Result?.categories || []),
    ...(pass3Result?.categories || []),
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
    dataQuality,
  };
}

// ─── SCREENSHOT UX ANALYSIS (unchanged, kept for compatibility) ─────────────

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

Study every single pixel. Look at layout, visual hierarchy, navigation, buttons, typography, whitespace, color, empty states, form design, mobile considerations, loading states, onboarding, missing UI elements, and anything confusing or impressive.

Be brutally specific. Reference exactly what you see. Do not give generic advice.

Rules:
- Plain English. Talk like a brilliant designer friend.
- Reference exactly what you see in each screenshot
- Every issue: specific problem, why it frustrates users, exact fix
- Ideas must be specific to this product

Return ONLY STRICT VALID JSON. Never truncate. Never use markdown.

{
  "uxScore": 0-100,
  "uxGrade": "A/B/C/D/F",
  "uxSummary": "3 brutally honest sentences using specific observations.",
  "screenshotInsights": [
    {
      "label": "Exact screenshot label",
      "whatWeSee": "Specific description of what this screen shows",
      "strengths": ["Specific strength with exact reference"],
      "issues": [
        {
          "severity": "Critical/High/Medium/Low",
          "issue": "Specific problem with exact reference",
          "impact": "Exactly how this frustrates users",
          "fix": "Exact change to make"
        }
      ]
    }
  ],
  "uxIssues": [
    {
      "severity": "Critical/High/Medium/Low",
      "issue": "Overall UX problem seen across screens",
      "impact": "Why this is costing them users",
      "fix": "Exact systematic fix"
    }
  ],
  "uxQuickWins": [
    { "title": "Specific quick win", "description": "Exactly what to change.", "timeToFix": "e.g. 30 minutes" }
  ],
  "uxInnovativeIdeas": [
    { "title": "Innovative idea specific to this product", "description": "Detailed explanation.", "effort": "Easy/Medium/Hard", "impact": "Specific impact" }
  ],
  "missingFeatures": [
    "Specific feature missing — reference what competing products have"
  ]
}`;

  const contents = [{ role: "user", parts: [{ text: prompt }, ...imageParts] }];

  let response = null;
  let lastError = null;

  outer:
  for (const model of visionModels) {
    for (const key of keys) {
      try {
        const aiClient = new GoogleGenAI({ apiKey: key });
        console.log(`[UX Audit] Trying model=${model}`);
        response = await aiClient.models.generateContent({
          model, contents,
          config: { maxOutputTokens: 16000, temperature: 0.3, responseMimeType: "application/json" },
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
    return JSON.parse(cleaned);
  } catch (e) {
    console.error(cleaned);
    throw new Error("Gemini returned invalid JSON.");
  }
}

export function getGradeColor(grade) {
  const colors = { A: "#075a01", B: "#0a8f01", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return colors[grade] || "#6b7280";
}

export function getSeverityColor(severity) {
  const colors = { Critical: "#ef4444", High: "#f97316", Medium: "#f59e0b", Low: "#6b7280" };
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