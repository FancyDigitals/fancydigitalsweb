export function parseHTMLStructure(rawHTML) {
  if (!rawHTML) return null;

  // Extract meta tags
  const titleMatch = rawHTML.match(/<title[^>]*>([^<]+)<\/title>/i);
  const metaDesc = rawHTML.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const metaKeywords = rawHTML.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i);
  const ogTitle = rawHTML.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
  const ogDesc = rawHTML.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  const ogImage = rawHTML.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  const canonical = rawHTML.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const viewport = rawHTML.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']+)["']/i);
  const robots = rawHTML.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  const schemaMatches = rawHTML.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  // Extract headings
  const h1s = [...rawHTML.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim()).filter(Boolean);
  const h2s = [...rawHTML.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map(m => m[1].trim()).filter(Boolean).slice(0, 10);
  const h3s = [...rawHTML.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi)].map(m => m[1].trim()).filter(Boolean).slice(0, 10);

  // Extract links
  const allLinks = [...rawHTML.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi)];
  const internalLinks = allLinks.filter(m => !m[1].startsWith("http") || m[1].includes(rawHTML.match(/https?:\/\/([^\/]+)/)?.[1] || "")).slice(0, 20);
  const externalLinks = allLinks.filter(m => m[1].startsWith("http")).slice(0, 10);

  // Extract images
  const images = [...rawHTML.matchAll(/<img[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*>/gi)]
    .map(m => ({ src: m[1], alt: m[2] || "" }))
    .slice(0, 20);

  const imagesWithoutAlt = images.filter(img => !img.alt).length;

  // Extract buttons and CTAs
  const buttons = [...rawHTML.matchAll(/<button[^>]*>([^<]+)<\/button>/gi)]
    .map(m => m[1].trim()).filter(Boolean).slice(0, 10);

  const ctaLinks = allLinks
    .filter(m => /contact|get.started|sign.up|register|try|free|buy|book|demo|start/i.test(m[1] + m[2]))
    .map(m => m[2].trim())
    .filter(Boolean)
    .slice(0, 5);

  // Extract forms
  const forms = [...rawHTML.matchAll(/<form[^>]*>/gi)].length;

  // Extract text content (clean)
  const textContent = rawHTML
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000);

  // Check for trust signals
  const hasPricing = /pricing|plans|subscribe|per month|per year|\$\d|\£\d|₦\d/i.test(rawHTML);
  const hasTestimonials = /testimonial|review|said|stars|rating|clients say/i.test(rawHTML);
  const hasTeam = /our team|meet the|founder|ceo|about us/i.test(rawHTML);
  const hasFAQ = /faq|frequently asked|questions/i.test(rawHTML);
  const hasContactInfo = /contact|email|phone|whatsapp|address/i.test(rawHTML);
  const hasSocialLinks = /twitter|instagram|facebook|linkedin|youtube|tiktok/i.test(rawHTML);
  const hasLiveChat = /tawk|intercom|crisp|zendesk|livechat|drift/i.test(rawHTML);
  const hasCookieBanner = /cookie|gdpr|consent/i.test(rawHTML);
  const hasSSL = rawHTML.includes("https://");
  const hasSchema = schemaMatches && schemaMatches.length > 0;

  // Word count
  const wordCount = textContent.split(/\s+/).length;

  return {
    meta: {
      title: titleMatch?.[1]?.trim() || null,
      titleLength: titleMatch?.[1]?.trim().length || 0,
      description: metaDesc?.[1]?.trim() || null,
      descriptionLength: metaDesc?.[1]?.trim().length || 0,
      keywords: metaKeywords?.[1]?.trim() || null,
      ogTitle: ogTitle?.[1]?.trim() || null,
      ogDescription: ogDesc?.[1]?.trim() || null,
      ogImage: ogImage?.[1]?.trim() || null,
      canonical: canonical?.[1]?.trim() || null,
      viewport: viewport?.[1]?.trim() || null,
      robots: robots?.[1]?.trim() || null,
      hasSchema,
      schemaCount: schemaMatches?.length || 0,
    },
    headings: {
      h1s,
      h1Count: h1s.length,
      h2s,
      h2Count: h2s.length,
      h3s,
      h3Count: h3s.length,
    },
    links: {
      internalCount: internalLinks.length,
      externalCount: externalLinks.length,
      externalDomains: externalLinks.map(m => m[1]).slice(0, 5),
    },
    images: {
      total: images.length,
      withoutAlt: imagesWithoutAlt,
      altCoverage: images.length > 0 ? Math.round(((images.length - imagesWithoutAlt) / images.length) * 100) : 0,
    },
    ctas: {
      buttons,
      ctaLinks,
      forms,
    },
    trustSignals: {
      hasPricing,
      hasTestimonials,
      hasTeam,
      hasFAQ,
      hasContactInfo,
      hasSocialLinks,
      hasLiveChat,
      hasCookieBanner,
      hasSSL,
    },
    content: {
      wordCount,
      textContent,
    },
  };
}

export async function fetchAndParseURL(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FancyDigitals-Auditor/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return parseHTMLStructure(html);
  } catch {
    return null;
  }
}