// AI Visibility Scanner — analyzes a URL across 10 key signals
// All checks use FREE APIs and direct page parsing

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const KNOWLEDGE_GRAPH_API = "https://kgsearch.googleapis.com/v1/entities:search";

// ─────────────────────────────────────────────────────────────
// MAIN SCANNER
// ─────────────────────────────────────────────────────────────
export async function scanUrl(rawUrl) {
  const url = normalizeUrl(rawUrl);
  const domain = new URL(url).hostname.replace(/^www\./, "");

  // Run all checks in parallel for speed
  const [html, pagespeed, knowledgeGraph] = await Promise.all([
    fetchHtml(url),
    checkPageSpeed(url),
    checkKnowledgeGraph(domain),
  ]);

  // Parse HTML-based signals
  const meta = parseMeta(html);
  const schema = parseSchema(html);
  const technical = checkTechnical(url, html);
  const content = analyzeContent(html);
  const social = parseSocialLinks(html);
  const ai = analyzeAIFriendliness(html, meta, schema);

  // Calculate individual scores (0-100 each)
  const scores = {
    technicalSEO: scoreTechnical(technical, pagespeed),
    schema: scoreSchema(schema),
    metaTags: scoreMeta(meta),
    content: scoreContent(content),
    performance: scorePerformance(pagespeed),
    mobile: scoreMobile(pagespeed),
    knowledgeGraph: scoreKnowledgeGraph(knowledgeGraph),
    entityClarity: scoreEntity(meta, schema, knowledgeGraph),
    aiReadability: scoreAIReadability(ai),
    trustSignals: scoreTrust(html, meta, social),
  };

  // Calculate overall score (weighted average)
  const overall = calculateOverallScore(scores);

  // Generate recommendations
  const recommendations = generateRecommendations(scores, {
    meta, schema, technical, content, pagespeed, knowledgeGraph, ai, social,
  });

  return {
    url,
    domain,
    overall,
    scores,
    signals: { meta, schema, technical, content, social, ai, knowledgeGraph: !!knowledgeGraph },
    recommendations,
    rawData: { pagespeedSummary: pagespeed?.summary },
  };
}

// ─────────────────────────────────────────────────────────────
// URL NORMALIZATION
// ─────────────────────────────────────────────────────────────
function normalizeUrl(input) {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  // Validate
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }
  return url;
}

// ─────────────────────────────────────────────────────────────
// FETCH HTML
// ─────────────────────────────────────────────────────────────
async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AIVisibilityBot/1.0; +https://fancydigitals.com.ng)",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    throw new Error(`Could not fetch URL: ${err.message}`);
  }
}

// ─────────────────────────────────────────────────────────────
// PAGESPEED CHECK (Google API)
// ─────────────────────────────────────────────────────────────
async function checkPageSpeed(url) {
  const key = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!key) return null;

  try {
    const apiUrl = `${PAGESPEED_API}?url=${encodeURIComponent(url)}&key=${key}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(45000) });
    if (!res.ok) return null;
    const data = await res.json();

    const cats = data.lighthouseResult?.categories || {};
    return {
      performance: Math.round((cats.performance?.score || 0) * 100),
      accessibility: Math.round((cats.accessibility?.score || 0) * 100),
      seo: Math.round((cats.seo?.score || 0) * 100),
      bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
      summary: {
        FCP: data.lighthouseResult?.audits?.["first-contentful-paint"]?.displayValue,
        LCP: data.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue,
        CLS: data.lighthouseResult?.audits?.["cumulative-layout-shift"]?.displayValue,
      },
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// KNOWLEDGE GRAPH CHECK
// ─────────────────────────────────────────────────────────────
async function checkKnowledgeGraph(domain) {
  const key = process.env.GOOGLE_KNOWLEDGE_GRAPH_API_KEY;
  if (!key) return null;

  // Try with domain name as query (e.g. "fancydigitals")
  const query = domain.split(".")[0];

  try {
    const apiUrl = `${KNOWLEDGE_GRAPH_API}?query=${encodeURIComponent(query)}&key=${key}&limit=5`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();

    const items = data.itemListElement || [];
    if (items.length === 0) return null;

    const top = items[0]?.result;
    return {
      found: true,
      name: top?.name,
      types: top?.["@type"],
      description: top?.description,
      score: items[0]?.resultScore,
    };
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// HTML PARSERS
// ─────────────────────────────────────────────────────────────
function parseMeta(html) {
  const title = matchOne(html, /<title[^>]*>([^<]+)<\/title>/i);
  const description = getMetaContent(html, "description");
  const keywords = getMetaContent(html, "keywords");
  const ogTitle = getMetaContent(html, "og:title", true);
  const ogDescription = getMetaContent(html, "og:description", true);
  const ogImage = getMetaContent(html, "og:image", true);
  const twitterCard = getMetaContent(html, "twitter:card", true);
  const canonical = matchOne(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const viewport = getMetaContent(html, "viewport");
  const robots = getMetaContent(html, "robots");
  const lang = matchOne(html, /<html[^>]+lang=["']([^"']+)["']/i);

  return {
    title: title?.trim() || null,
    titleLength: title?.trim().length || 0,
    description: description?.trim() || null,
    descriptionLength: description?.trim().length || 0,
    keywords: keywords || null,
    ogTitle: ogTitle || null,
    ogDescription: ogDescription || null,
    ogImage: ogImage || null,
    twitterCard: twitterCard || null,
    canonical: canonical || null,
    viewport: viewport || null,
    robots: robots || null,
    lang: lang || null,
  };
}

function parseSchema(html) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const m of scripts) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (Array.isArray(parsed)) schemas.push(...parsed);
      else schemas.push(parsed);
    } catch {
      // Skip invalid JSON-LD
    }
  }

  const types = schemas.map((s) => s["@type"]).filter(Boolean).flat();
  return {
    count: schemas.length,
    types,
    hasOrganization: types.some((t) => /Organization|LocalBusiness|Corporation/i.test(t)),
    hasFAQ: types.some((t) => /FAQPage/i.test(t)),
    hasBreadcrumb: types.some((t) => /Breadcrumb/i.test(t)),
    hasArticle: types.some((t) => /Article|BlogPosting/i.test(t)),
    hasProduct: types.some((t) => /Product/i.test(t)),
    hasReview: types.some((t) => /Review|AggregateRating/i.test(t)),
    hasPerson: types.some((t) => /Person/i.test(t)),
    hasWebsite: types.some((t) => /WebSite/i.test(t)),
  };
}

function checkTechnical(url, html) {
  return {
    https: url.startsWith("https://"),
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasLangAttr: /<html[^>]+lang=["']/i.test(html),
    hasCharset: /<meta[^>]+charset=/i.test(html),
    htmlSize: html.length,
  };
}

function analyzeContent(html) {
  // Strip script/style/HTML to count words
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean).length;

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;
  const h3Count = (html.match(/<h3[\s>]/gi) || []).length;
  const imgCount = (html.match(/<img[\s>]/gi) || []).length;
  const imgWithAlt = (html.match(/<img[^>]+alt=["'][^"']+["']/gi) || []).length;
  const internalLinks = (html.match(/<a[^>]+href=["']\//gi) || []).length;
  const externalLinks = (html.match(/<a[^>]+href=["']https?:\/\//gi) || []).length;

  return {
    wordCount: words,
    h1Count,
    h2Count,
    h3Count,
    imgCount,
    imgWithAlt,
    altRatio: imgCount > 0 ? Math.round((imgWithAlt / imgCount) * 100) : 100,
    internalLinks,
    externalLinks,
  };
}

function parseSocialLinks(html) {
  const find = (pattern) => (html.match(pattern) || [])[0] || null;
  return {
    twitter: find(/https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[A-Za-z0-9_]+/i),
    facebook: find(/https?:\/\/(?:www\.)?facebook\.com\/[A-Za-z0-9.\-_]+/i),
    instagram: find(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._]+/i),
    linkedin: find(/https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[A-Za-z0-9.\-_]+/i),
    youtube: find(/https?:\/\/(?:www\.)?youtube\.com\/(?:@|c\/|channel\/|user\/)[A-Za-z0-9.\-_]+/i),
  };
}

function analyzeAIFriendliness(html, meta, schema) {
  return {
    hasStructuredData: schema.count > 0,
    hasFAQ: schema.hasFAQ,
    hasOrganization: schema.hasOrganization,
    hasDescription: !!meta.description && meta.description.length > 50,
    hasClearTitle: !!meta.title && meta.title.length >= 10,
    hasSemanticHeadings: /<h1[\s>][\s\S]*<h2[\s>]/i.test(html),
    hasLanguage: !!meta.lang,
  };
}

// ─────────────────────────────────────────────────────────────
// SCORING FUNCTIONS (each returns 0-100)
// ─────────────────────────────────────────────────────────────
function scoreTechnical(t, ps) {
  let score = 0;
  if (t.https) score += 30;
  if (t.hasViewport) score += 20;
  if (t.hasLangAttr) score += 15;
  if (t.hasCharset) score += 15;
  if (ps?.seo) score += Math.round(ps.seo * 0.2);
  return Math.min(score, 100);
}

function scoreSchema(s) {
  let score = 0;
  if (s.count > 0) score += 20;
  if (s.hasOrganization) score += 25;
  if (s.hasWebsite) score += 10;
  if (s.hasBreadcrumb) score += 10;
  if (s.hasFAQ) score += 15;
  if (s.hasArticle) score += 10;
  if (s.hasReview) score += 10;
  return Math.min(score, 100);
}

function scoreMeta(m) {
  let score = 0;
  if (m.title) score += 15;
  if (m.titleLength >= 30 && m.titleLength <= 60) score += 15;
  if (m.description) score += 15;
  if (m.descriptionLength >= 120 && m.descriptionLength <= 160) score += 15;
  if (m.ogTitle) score += 10;
  if (m.ogDescription) score += 5;
  if (m.ogImage) score += 10;
  if (m.twitterCard) score += 5;
  if (m.canonical) score += 10;
  return Math.min(score, 100);
}

function scoreContent(c) {
  let score = 0;
  if (c.wordCount >= 300) score += 25;
  if (c.wordCount >= 800) score += 15;
  if (c.h1Count === 1) score += 20;
  if (c.h2Count >= 2) score += 15;
  if (c.altRatio >= 80) score += 15;
  if (c.internalLinks >= 5) score += 10;
  return Math.min(score, 100);
}

function scorePerformance(ps) {
  if (!ps) return 50;
  return ps.performance;
}

function scoreMobile(ps) {
  if (!ps) return 50;
  // Combine accessibility + best practices as mobile-friendliness proxy
  return Math.round((ps.accessibility + ps.bestPractices) / 2);
}

function scoreKnowledgeGraph(kg) {
  if (!kg) return 20;
  return Math.min(20 + Math.round((kg.score || 0) / 10), 100);
}

function scoreEntity(m, s, kg) {
  let score = 0;
  if (s.hasOrganization) score += 30;
  if (m.title && m.title.length > 10) score += 15;
  if (m.description && m.description.length > 100) score += 15;
  if (kg) score += 25;
  if (s.hasPerson) score += 10;
  if (m.canonical) score += 5;
  return Math.min(score, 100);
}

function scoreAIReadability(ai) {
  let score = 0;
  if (ai.hasStructuredData) score += 20;
  if (ai.hasFAQ) score += 20;
  if (ai.hasOrganization) score += 15;
  if (ai.hasDescription) score += 15;
  if (ai.hasClearTitle) score += 10;
  if (ai.hasSemanticHeadings) score += 10;
  if (ai.hasLanguage) score += 10;
  return Math.min(score, 100);
}

function scoreTrust(html, m, social) {
  let score = 0;
  const socialCount = Object.values(social).filter(Boolean).length;
  score += Math.min(socialCount * 10, 30);

  if (/privacy|policy/i.test(html)) score += 10;
  if (/terms/i.test(html)) score += 10;
  if (/contact|about/i.test(html)) score += 10;
  if (m.canonical) score += 10;
  if (m.ogImage) score += 10;
  if (html.toLowerCase().includes("https://")) score += 10;
  if (/copyright|©/i.test(html)) score += 10;
  return Math.min(score, 100);
}

function calculateOverallScore(scores) {
  // Weighted average — AI-related signals weighted higher
  const weights = {
    technicalSEO: 1.0,
    schema: 1.4,
    metaTags: 1.0,
    content: 1.2,
    performance: 0.8,
    mobile: 0.8,
    knowledgeGraph: 1.2,
    entityClarity: 1.4,
    aiReadability: 1.5,
    trustSignals: 1.0,
  };
  let total = 0;
  let weightSum = 0;
  for (const [key, score] of Object.entries(scores)) {
    const w = weights[key] || 1;
    total += score * w;
    weightSum += w;
  }
  return Math.round(total / weightSum);
}

// ─────────────────────────────────────────────────────────────
// RECOMMENDATIONS
// ─────────────────────────────────────────────────────────────
function generateRecommendations(scores, signals) {
  const recs = [];

  // Critical
  if (!signals.technical.https) recs.push({ priority: "critical", title: "Enable HTTPS", desc: "Your site is not using HTTPS. AI assistants strongly prefer secure sites.", impact: "high" });
  if (scores.schema < 40) recs.push({ priority: "critical", title: "Add Structured Data (Schema.org)", desc: "AI models rely heavily on JSON-LD schema to understand businesses. Add Organization, Website, and FAQ schema.", impact: "high" });
  if (!signals.meta.title) recs.push({ priority: "critical", title: "Add a page title", desc: "Your page has no <title> tag. This is the #1 signal AI uses.", impact: "high" });
  if (!signals.meta.description) recs.push({ priority: "critical", title: "Add meta description", desc: "Missing meta description. AI uses this for context.", impact: "high" });

  // High
  if (!signals.schema.hasOrganization) recs.push({ priority: "high", title: "Add Organization Schema", desc: "Tell AI exactly who your business is with Organization JSON-LD schema.", impact: "high" });
  if (!signals.knowledgeGraph) recs.push({ priority: "high", title: "Build Knowledge Graph presence", desc: "You're not in Google's Knowledge Graph. Create Wikipedia/Wikidata entries, get press mentions, and add sameAs links.", impact: "high" });
  if (scores.content < 50) recs.push({ priority: "high", title: "Improve content depth", desc: `Your page has only ${signals.content.wordCount} words. AI prefers pages with 800+ words of substantive content.`, impact: "medium" });
  if (signals.content.h1Count !== 1) recs.push({ priority: "high", title: "Use exactly one H1 tag", desc: `Found ${signals.content.h1Count} H1 tags. Use only one for clarity.`, impact: "medium" });

  // Medium
  if (!signals.schema.hasFAQ) recs.push({ priority: "medium", title: "Add FAQ Schema", desc: "FAQ schema is heavily favored by AI assistants for answering user questions.", impact: "high" });
  if (!signals.meta.ogImage) recs.push({ priority: "medium", title: "Add Open Graph image", desc: "Missing og:image meta tag. Important for social sharing and AI link previews.", impact: "low" });
  if (!signals.meta.canonical) recs.push({ priority: "medium", title: "Add canonical URL", desc: "Missing canonical link. Helps AI understand the authoritative version of your page.", impact: "medium" });
  if (signals.content.altRatio < 80) recs.push({ priority: "medium", title: "Add alt text to images", desc: `Only ${signals.content.altRatio}% of images have alt text. AI relies on alt text for visual context.`, impact: "low" });
  const socialCount = Object.values(signals.social).filter(Boolean).length;
  if (socialCount < 3) recs.push({ priority: "medium", title: "Link your social profiles", desc: "AI uses sameAs social links to verify business identity. Add Twitter, LinkedIn, Facebook, etc.", impact: "medium" });

  // Low
  if (scores.performance < 70) recs.push({ priority: "low", title: "Improve page speed", desc: `Performance score is ${scores.performance}. Faster pages get cited more often by AI.`, impact: "medium" });
  if (!signals.meta.twitterCard) recs.push({ priority: "low", title: "Add Twitter Card metadata", desc: "Improves how your links appear when shared.", impact: "low" });

  return recs;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function matchOne(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

function getMetaContent(html, name, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  const regex = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']+)["']`, "i");
  const reversed = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${name}["']`, "i");
  return matchOne(html, regex) || matchOne(html, reversed);
}