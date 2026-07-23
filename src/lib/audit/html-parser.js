import * as cheerio from "cheerio";

/**
 * Parse HTML using proper DOM parser (cheerio).
 * Returns accurate, structured website data.
 */
export function parseHTMLStructure(rawHTML, auditedUrl = "") {
  if (!rawHTML || rawHTML.length < 100) return null;

  const $ = cheerio.load(rawHTML);

  // ─── AUDITED DOMAIN (for accurate internal/external link matching) ────────
  let auditedDomain = "";
  try {
    auditedDomain = new URL(auditedUrl).hostname.replace(/^www\./, "");
  } catch {
    auditedDomain = "";
  }

  // ─── DETECT JS-RENDERED / SPA SITES ───────────────────────────────────────
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const rawBodyLength = bodyText.length;
  const hasNextJs = rawHTML.includes("__NEXT_DATA__") || rawHTML.includes("_next/static");
  const hasReactRoot = rawHTML.includes('id="root"') || rawHTML.includes('id="__next"');
  const hasVueApp = rawHTML.includes('id="app"') && rawHTML.includes("Vue");
  const hasAngular = rawHTML.includes("ng-version") || rawHTML.includes("ng-app");
  const isLikelySPA = (rawBodyLength < 500) && (hasNextJs || hasReactRoot || hasVueApp || hasAngular);
  const spaFramework = hasNextJs ? "Next.js" : hasReactRoot ? "React" : hasVueApp ? "Vue" : hasAngular ? "Angular" : null;

  // ─── DETECT CMS / PLATFORM ────────────────────────────────────────────────
  let platform = "Unknown";
  if (rawHTML.includes("wp-content") || rawHTML.includes("wp-includes")) platform = "WordPress";
  else if (rawHTML.includes("cdn.shopify.com") || rawHTML.includes("Shopify.theme")) platform = "Shopify";
  else if (rawHTML.includes("squarespace.com") || rawHTML.includes("static.squarespace")) platform = "Squarespace";
  else if (rawHTML.includes("wixstatic.com") || rawHTML.includes("wix.com")) platform = "Wix";
  else if (rawHTML.includes("webflow.io") || rawHTML.includes("webflow.com")) platform = "Webflow";
  else if (rawHTML.includes("cdn.framer.com")) platform = "Framer";
  else if (hasNextJs) platform = "Next.js";
  else if (hasReactRoot) platform = "React (custom)";
  else if (hasVueApp) platform = "Vue";
  else if (rawHTML.includes("ghost.org") || rawHTML.includes("ghost-url")) platform = "Ghost";
  else if (rawHTML.includes("bubble.io")) platform = "Bubble";

  // ─── META TAGS (order-independent) ────────────────────────────────────────
  const title = $("head title").first().text().trim() || null;
  const metaDesc = $('meta[name="description"]').attr("content")?.trim() || null;
  const metaKeywords = $('meta[name="keywords"]').attr("content")?.trim() || null;
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  const viewport = $('meta[name="viewport"]').attr("content")?.trim() || null;
  const robots = $('meta[name="robots"]').attr("content")?.trim() || null;
  const charset = $("meta[charset]").attr("charset")?.trim() || $('meta[http-equiv="Content-Type"]').attr("content")?.trim() || null;
  const themeColor = $('meta[name="theme-color"]').attr("content")?.trim() || null;
  const langAttr = $("html").attr("lang")?.trim() || null;

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() || null;
  const ogDesc = $('meta[property="og:description"]').attr("content")?.trim() || null;
  const ogImage = $('meta[property="og:image"]').attr("content")?.trim() || null;
  const ogType = $('meta[property="og:type"]').attr("content")?.trim() || null;
  const ogUrl = $('meta[property="og:url"]').attr("content")?.trim() || null;

  // Twitter
  const twitterCard = $('meta[name="twitter:card"]').attr("content")?.trim() || null;
  const twitterTitle = $('meta[name="twitter:title"]').attr("content")?.trim() || null;
  const twitterImage = $('meta[name="twitter:image"]').attr("content")?.trim() || null;

  // Favicon
  const favicon = $('link[rel*="icon"]').attr("href")?.trim() || null;
  const appleTouchIcon = $('link[rel="apple-touch-icon"]').attr("href")?.trim() || null;

  // ─── STRUCTURED DATA (JSON-LD Schema) ─────────────────────────────────────
  const schemaScripts = [];
  const detectedSchemaTypes = new Set();
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const extractTypes = (obj) => {
        if (!obj) return;
        if (Array.isArray(obj)) return obj.forEach(extractTypes);
        if (obj["@type"]) {
          if (Array.isArray(obj["@type"])) obj["@type"].forEach((t) => detectedSchemaTypes.add(t));
          else detectedSchemaTypes.add(obj["@type"]);
        }
        if (obj["@graph"]) extractTypes(obj["@graph"]);
      };
      extractTypes(parsed);
      schemaScripts.push({ valid: true });
    } catch {
      schemaScripts.push({ valid: false });
    }
  });

  // ─── HEADINGS (handles nested tags correctly) ─────────────────────────────
  const h1s = $("h1").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get().filter(Boolean);
  const h2s = $("h2").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get().filter(Boolean).slice(0, 15);
  const h3s = $("h3").map((_, el) => $(el).text().replace(/\s+/g, " ").trim()).get().filter(Boolean).slice(0, 15);
  const h4Count = $("h4").length;
  const h5Count = $("h5").length;
  const h6Count = $("h6").length;

  // Heading hierarchy check
  const hasProperHierarchy = h1s.length === 1 && h2s.length > 0;
  const multipleH1s = h1s.length > 1;
  const noH1 = h1s.length === 0;

  // ─── LINKS (accurate internal vs external using audited domain) ───────────
  const allLinks = [];
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    const text = $(el).text().replace(/\s+/g, " ").trim();
    const rel = $(el).attr("rel")?.trim() || "";
    if (!href || href === "#" || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return;
    }
    allLinks.push({ href, text, rel });
  });

  const internalLinks = [];
  const externalLinks = [];
  const externalDomains = new Set();

  allLinks.forEach((link) => {
    const href = link.href;

    if (href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) {
      internalLinks.push(link);
      return;
    }

    try {
      const linkUrl = new URL(href, auditedUrl || "https://example.com");
      const linkDomain = linkUrl.hostname.replace(/^www\./, "");

      if (!auditedDomain || linkDomain === auditedDomain) {
        internalLinks.push(link);
      } else {
        externalLinks.push({ ...link, domain: linkDomain });
        externalDomains.add(linkDomain);
      }
    } catch {
      // Invalid URL — treat as internal (likely relative)
      internalLinks.push(link);
    }
  });

  const nofollowExternal = externalLinks.filter((l) => l.rel.includes("nofollow")).length;

  // ─── IMAGES (attribute-order safe) ────────────────────────────────────────
  const images = [];
  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || $(el).attr("data-lazy-src") || "";
    const alt = $(el).attr("alt");
    const width = $(el).attr("width");
    const height = $(el).attr("height");
    const loading = $(el).attr("loading");
    if (src) {
      images.push({
        src,
        alt: (alt || "").trim(),
        hasAlt: alt !== undefined,
        altEmpty: (alt || "").trim() === "",
        width,
        height,
        lazy: loading === "lazy",
      });
    }
  });

  const imagesWithoutAlt = images.filter((img) => !img.hasAlt || img.altEmpty).length;
  const imagesWithoutDimensions = images.filter((img) => !img.width || !img.height).length;
  const lazyLoadedImages = images.filter((img) => img.lazy).length;

  // ─── BUTTONS & CTAs ───────────────────────────────────────────────────────
  const buttons = [];
  $("button").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text) buttons.push(text);
  });

  // Real CTA detection: button-styled links AND buttons with action words
  const ctaKeywords = /\b(sign.?up|get.?started|start.?free|try.?free|book|schedule|demo|contact|buy|shop|order|subscribe|download|register|join|apply|request|learn.?more|see.?more|explore|discover)\b/i;
  const ctaLinks = internalLinks
    .filter((link) => ctaKeywords.test(link.text) && link.text.length < 40 && link.text.length > 2)
    .map((link) => link.text)
    .slice(0, 10);

  const ctaButtons = buttons.filter((text) => ctaKeywords.test(text) || text.length < 30);

  // ─── FORMS ────────────────────────────────────────────────────────────────
  const forms = [];
  $("form").each((_, el) => {
    const $form = $(el);
    const action = $form.attr("action") || "";
    const inputs = $form.find("input, textarea, select").length;
    const emailInputs = $form.find('input[type="email"]').length;
    forms.push({ action, inputs, hasEmail: emailInputs > 0 });
  });

  const emailCaptureForms = forms.filter((f) => f.hasEmail).length;

  // ─── TRUST SIGNALS (strict — look for real evidence, not just words) ─────
  // SSL — check actual URL
  const hasSSL = auditedUrl.startsWith("https://");

  // Pricing — look for pricing page/section OR currency + numbers near "month/year/one-time"
  const priceRegex = /(\$|£|€|₦|₹|R\$|₩|¥|C\$|A\$)\s?\d{1,4}(\.\d{2})?\s?(\/|per|\s)?(mo|month|yr|year|week|day)?/i;
  const hasPricingSection = $('*:contains("Pricing"), *:contains("Plans"), *:contains("Choose Plan")').length > 0;
  const hasCurrencyPrices = priceRegex.test(bodyText);
  const hasPricing = hasPricingSection || hasCurrencyPrices;

  // Testimonials — look for actual testimonial structure (blockquotes, review cards, star ratings)
  const hasBlockquotes = $("blockquote").length > 0;
  const hasStarRatings = $('[class*="star"], [class*="rating"]').length > 3;
  const hasTestimonialWords = /"[^"]{40,300}"[\s\S]{0,80}(—|-|by|from)\s*[A-Z]/i.test(bodyText);
  const hasReviewCards = $('[class*="testimonial"], [class*="review"]').length > 0;
  const hasTestimonials = hasBlockquotes || hasStarRatings || hasReviewCards || hasTestimonialWords;

  // Team — actual team section with names
  const hasTeamSection = $('*:contains("Meet the team"), *:contains("Our team"), *:contains("Founders")').length > 0;
  const hasTeamCards = $('[class*="team"], [class*="founder"], [class*="member"]').length > 0;
  const hasTeam = hasTeamSection || hasTeamCards;

  // FAQ — real FAQ structure
  const hasFAQSection = $('*:contains("Frequently Asked"), *:contains("FAQ"), *:contains("F.A.Q")').length > 0;
  const hasAccordions = $('details, [class*="accordion"], [class*="faq"]').length > 2;
  const hasFAQ = hasFAQSection || hasAccordions;

  // Contact info — real contact detection
  const hasEmailInText = /\b[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/.test(bodyText);
  const hasPhoneNumber = /\b(\+\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{3,4}\b/.test(bodyText);
  const hasContactPage = internalLinks.some((l) => /contact|reach|get.?in.?touch/i.test(l.text));
  const hasContactInfo = hasEmailInText || hasPhoneNumber || hasContactPage || emailCaptureForms > 0;

  // Social links — real social platform links
  const socialPlatforms = {
    twitter: false, instagram: false, facebook: false, linkedin: false,
    youtube: false, tiktok: false, github: false, threads: false,
  };
  externalLinks.forEach((link) => {
    const domain = link.domain;
    if (domain.includes("twitter.com") || domain.includes("x.com")) socialPlatforms.twitter = true;
    if (domain.includes("instagram.com")) socialPlatforms.instagram = true;
    if (domain.includes("facebook.com") || domain.includes("fb.com")) socialPlatforms.facebook = true;
    if (domain.includes("linkedin.com")) socialPlatforms.linkedin = true;
    if (domain.includes("youtube.com") || domain.includes("youtu.be")) socialPlatforms.youtube = true;
    if (domain.includes("tiktok.com")) socialPlatforms.tiktok = true;
    if (domain.includes("github.com")) socialPlatforms.github = true;
    if (domain.includes("threads.net")) socialPlatforms.threads = true;
  });
  const socialLinksCount = Object.values(socialPlatforms).filter(Boolean).length;
  const hasSocialLinks = socialLinksCount > 0;

  // Live chat — detect specific chat widgets
  const chatWidgets = {
    tawk: rawHTML.includes("tawk.to") || rawHTML.includes("embed.tawk.to"),
    intercom: rawHTML.includes("widget.intercom.io") || rawHTML.includes("intercom-container"),
    crisp: rawHTML.includes("client.crisp.chat"),
    zendesk: rawHTML.includes("zdassets.com") || rawHTML.includes("zendesk"),
    drift: rawHTML.includes("js.driftt.com"),
    livechat: rawHTML.includes("cdn.livechatinc.com"),
    hubspot: rawHTML.includes("js.hs-scripts.com"),
    freshchat: rawHTML.includes("wchat.freshchat.com"),
    whatsapp: /wa\.me\/|api\.whatsapp\.com|chat\.whatsapp\.com/.test(rawHTML),
  };
  const activeChatWidgets = Object.entries(chatWidgets).filter(([, v]) => v).map(([k]) => k);
  const hasLiveChat = activeChatWidgets.length > 0;

  // Cookie banner
  const hasCookieBanner = rawHTML.includes("cookieconsent") || rawHTML.includes("cookiebot") || rawHTML.includes("gdpr") || rawHTML.includes("onetrust") || /cookie.{0,30}(accept|allow|consent)/i.test(bodyText);

  // Analytics
  const analytics = {
    googleAnalytics: rawHTML.includes("google-analytics.com") || rawHTML.includes("googletagmanager.com") || /gtag\(|GA_MEASUREMENT_ID|UA-\d+/.test(rawHTML),
    metaPixel: rawHTML.includes("facebook.net/en_US/fbevents.js") || /fbq\(/.test(rawHTML),
    hotjar: rawHTML.includes("static.hotjar.com"),
    mixpanel: rawHTML.includes("cdn.mxpnl.com"),
    posthog: rawHTML.includes("posthog"),
    plausible: rawHTML.includes("plausible.io"),
  };
  const activeAnalytics = Object.entries(analytics).filter(([, v]) => v).map(([k]) => k);

  // ─── CONTENT ANALYSIS ────────────────────────────────────────────────────
  // Strip scripts, styles, nav, footer for accurate content read
  const $content = $.load(rawHTML);
  $content("script, style, nav, footer, header, [role='navigation'], [role='banner'], [role='contentinfo'], noscript, iframe").remove();
  const cleanText = $content("body").text().replace(/\s+/g, " ").trim();
  const contentWords = cleanText.split(/\s+/).filter((w) => w.length > 1);
  const wordCount = contentWords.length;

  // Paragraph analysis
  const paragraphs = $("p").map((_, el) => $(el).text().trim()).get().filter((p) => p.length > 20);
  const avgParagraphLength = paragraphs.length > 0
    ? Math.round(paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / paragraphs.length)
    : 0;

  // ─── MOBILE-FRIENDLINESS SIGNALS ────────────────────────────────────────
  const hasViewportMeta = !!viewport;
  const viewportHasWidth = viewport?.includes("width=device-width");
  const viewportBlocksZoom = viewport?.includes("user-scalable=no") || viewport?.includes("maximum-scale=1");
  const hasResponsiveImages = $("img[srcset], picture").length > 0;
  const hasMediaQueries = /@media[^{]*\(/.test(rawHTML);

  // ─── ACCESSIBILITY SIGNALS ──────────────────────────────────────────────
  const inputsWithoutLabels = $("input, select, textarea").filter((_, el) => {
    const $el = $(el);
    const type = $el.attr("type");
    if (type === "hidden" || type === "submit" || type === "button") return false;
    const id = $el.attr("id");
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    const hasAriaLabel = !!$el.attr("aria-label") || !!$el.attr("aria-labelledby");
    return !hasLabel && !hasAriaLabel;
  }).length;

  const buttonsWithoutLabels = $("button").filter((_, el) => {
    const $el = $(el);
    const hasText = $el.text().trim().length > 0;
    const hasAriaLabel = !!$el.attr("aria-label");
    return !hasText && !hasAriaLabel;
  }).length;

  const linksWithoutText = allLinks.filter((l) => !l.text || l.text.length < 2).length;

  return {
    // Platform detection
    platform,
    spa: {
      isLikelySPA,
      framework: spaFramework,
      bodyTextLength: rawBodyLength,
      warning: isLikelySPA ? `This appears to be a JavaScript-rendered ${spaFramework || "SPA"} site. Server-side HTML is minimal — audit accuracy may be reduced without screenshot mode.` : null,
    },

    meta: {
      title, titleLength: title?.length || 0,
      description: metaDesc, descriptionLength: metaDesc?.length || 0,
      keywords: metaKeywords,
      canonical, viewport, robots, charset, themeColor, lang: langAttr,
      ogTitle, ogDescription: ogDesc, ogImage, ogType, ogUrl,
      twitterCard, twitterTitle, twitterImage,
      favicon, appleTouchIcon,
      hasSchema: schemaScripts.length > 0,
      schemaCount: schemaScripts.length,
      validSchemas: schemaScripts.filter((s) => s.valid).length,
      schemaTypes: Array.from(detectedSchemaTypes),
    },

    headings: {
      h1s, h1Count: h1s.length,
      h2s, h2Count: h2s.length,
      h3s, h3Count: h3s.length,
      h4Count, h5Count, h6Count,
      hasProperHierarchy, multipleH1s, noH1,
    },

    links: {
      total: allLinks.length,
      internalCount: internalLinks.length,
      externalCount: externalLinks.length,
      externalDomains: Array.from(externalDomains).slice(0, 15),
      nofollowExternal,
    },

    images: {
      total: images.length,
      withoutAlt: imagesWithoutAlt,
      altCoverage: images.length > 0 ? Math.round(((images.length - imagesWithoutAlt) / images.length) * 100) : 100,
      withoutDimensions: imagesWithoutDimensions,
      lazyLoaded: lazyLoadedImages,
    },

    ctas: {
      buttons: buttons.slice(0, 15),
      buttonCount: buttons.length,
      ctaLinks,
      ctaButtons: ctaButtons.slice(0, 10),
      forms: forms.length,
      emailCaptureForms,
    },

    trustSignals: {
      hasSSL,
      hasPricing,
      hasTestimonials,
      hasBlockquotes,
      hasStarRatings,
      hasTeam,
      hasFAQ,
      hasContactInfo,
      hasEmailInPage: hasEmailInText,
      hasPhoneNumber,
      hasSocialLinks,
      socialPlatforms,
      socialLinksCount,
      hasLiveChat,
      activeChatWidgets,
      hasCookieBanner,
    },

    analytics: {
      hasAnalytics: activeAnalytics.length > 0,
      activeAnalytics,
    },

    mobile: {
      hasViewportMeta,
      viewportHasWidth,
      viewportBlocksZoom,
      hasResponsiveImages,
      hasMediaQueries,
    },

    accessibility: {
      inputsWithoutLabels,
      buttonsWithoutLabels,
      linksWithoutText,
      imagesWithoutAlt,
    },

    content: {
      wordCount,
      paragraphCount: paragraphs.length,
      avgParagraphLength,
      textContent: cleanText.slice(0, 4000),
    },
  };
}

/**
 * Fetch a URL and parse its HTML.
 * Returns null if fetch fails or content is unusable.
 */
export async function fetchAndParseURL(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FancyDigitals-Auditor/2.0; +https://fancydigitals.com.ng)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(12000),
      redirect: "follow",
    });

    if (!res.ok) {
      console.warn(`[Parser] ❌ ${url} returned ${res.status}`);
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("html")) {
      console.warn(`[Parser] ❌ ${url} is not HTML (${contentType})`);
      return null;
    }

    const html = await res.text();
    if (!html || html.length < 100) {
      console.warn(`[Parser] ❌ ${url} returned empty HTML`);
      return null;
    }

    return parseHTMLStructure(html, url);
  } catch (err) {
    console.warn(`[Parser] ❌ ${url} error: ${err.message?.slice(0, 100)}`);
    return null;
  }
}