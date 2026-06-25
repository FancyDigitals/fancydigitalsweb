import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";
import { generateJSON } from "@/lib/ai/gemini";
import { createClient } from "@/lib/supabase/server";

const LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  de: "German",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      businessName,
      tagline,
      description,
      audience,
      goal,
      tone,
      features,
      socialProof,
      ctaText,
      includeFaq,
      includePricing,
      includeEmailCapture,
      includeTestimonials,
      includeTeam,
      includeLeadMagnet,
      includeVideo,
      includeFooter,
      language,
      teamMembers,
      pricingTiers,
      faqItems,
      userTestimonials,
      leadMagnetTitle,
      leadMagnetDescription,
      videoUrl,
      videoTitle,
      footerSocials,
      footerAddress,
      footerEmail,
      footerPhone,
    } = body;

    if (!businessName || !description) {
      return NextResponse.json(
        { error: "Business name and description are required" },
        { status: 400 }
      );
    }

    const usage = await checkAndIncrementUsage("ai-landing-page-generator");

    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.error, limit: usage.limit, used: usage.used },
        { status: 403 }
      );
    }

    const lang = LANGUAGES[language] || "English";
    const isEnglish = lang === "English";

    const featuresList = (features || [])
      .filter((f) => f && f.trim())
      .map((f, i) => `${i + 1}. ${f}`)
      .join("\n");

    const teamList = (teamMembers || [])
      .filter((m) => m && (m.name || m.role))
      .map((m, i) => `${i + 1}. ${m.name || "N/A"} — ${m.role || "N/A"}${m.bio ? ` (${m.bio})` : ""}`)
      .join("\n");

    const prompt = `You are a senior conversion copywriter with 15+ years of experience writing landing pages that convert. You write like a real person who deeply understands the audience — NOT like an AI.

⚠️ ABSOLUTE RULES:
1. ONLY use the info provided. Don't invent fake stats, fake testimonials, fake company names, or made-up features.
2. Write copy that sounds like the founder/marketer actually wrote it — confident, specific, human.
3. Match the tone exactly: ${tone || "professional"}.
4. Every word must earn its place. Be specific, not generic.
5. ⚠️ WRITE EVERYTHING IN ${lang.toUpperCase()}. Every single string in the output must be in ${lang}. Translate naturally, not literally.

🚫 BANNED WORDS/PHRASES (sound like AI):
- "Revolutionary", "Game-changing", "Cutting-edge", "Best-in-class"
- "Empower", "Unleash", "Unlock your potential"
- "Seamless", "Robust", "Synergy", "Holistic"
- "Take your X to the next level"
- "Transform your business"
- "Industry-leading solution"
- "Comprehensive suite of tools"
- "Leverage", "Spearhead"

✅ WRITE LIKE THIS INSTEAD:
- Use plain language a 12-year-old understands
- Make specific claims with numbers when possible
- Address the actual pain point, not vague "frustrations"
- Use "you" and "your" — talk to ONE person
- Short sentences. Strong verbs. No filler.

INPUTS:
- Business/Product Name: ${businessName}
- Tagline: ${tagline || "N/A — write one"}
- What it does: ${description}
- Target Audience: ${audience || "N/A"}
- Main Goal: ${goal || "Signup"}
- Tone: ${tone || "Professional"}
- Output Language: ${lang}
- CTA Button Text: ${ctaText || "Get Started"}
- Key Features:
${featuresList || "None provided — extract from description"}
- Social Proof Info: ${socialProof || "N/A — leave testimonial empty if not provided"}
- Include FAQ: ${includeFaq ? `Yes — use the EXACT questions below. If answer is empty, write a real honest answer in ${lang} (2-3 sentences). If answer is provided, polish it for clarity in ${lang} but keep the meaning:\n${(faqItems || []).filter(f => f.q).map((f, i) => `\nQ${i+1}: ${f.q}\nA${i+1}: ${f.a || "[WRITE ANSWER IN " + lang.toUpperCase() + "]"}`).join("\n")}` : "No"}
- Include Pricing: ${includePricing ? `Yes — use the EXACT tiers below. Do NOT invent your own. Just polish wording for features in ${lang} and write better CTAs if user CTAs are weak:\n${(pricingTiers || []).map((t, i) => `\nTier ${i+1}:\n- Name: ${t.name}\n- Price: ${t.price}\n- Period: ${t.period}\n- CTA: ${t.cta}\n- Popular: ${t.popular}\n- Features: ${(t.features || []).filter(f => f).join(" | ")}`).join("\n")}` : "No"}
- Include Email Capture: ${includeEmailCapture ? "Yes" : "No"}
- Include Multiple Testimonials: ${includeTestimonials ? `Yes — Use user-provided testimonials below FIRST. Polish wording in ${lang} but KEEP the same meaning, name, role, company. Then ADD ${Math.max(0, 3 - (userTestimonials || []).filter(t => t.quote || t.name).length)} more realistic-sounding testimonials in ${lang} (use generic names that fit the audience/region, don't impersonate real companies). Total output: 3 testimonials minimum.\n\nUser-provided testimonials:\n${(userTestimonials || []).filter(t => t.quote || t.name).map((t, i) => `\nTestimonial ${i+1}:\n- Quote: ${t.quote || "[write a relevant quote in " + lang + "]"}\n- Name: ${t.name || "[invent realistic name]"}\n- Role: ${t.role || "[invent role]"}\n- Company: ${t.company || "[invent company]"}\n- Has photo: ${t.photo ? "yes" : "no"}`).join("\n") || "(none provided — invent 3 realistic ones)"}` : "No"}
- Include Team Section: ${includeTeam ? `Yes — team members provided:\n${teamList || "None"}` : "No"}
- Include Lead Magnet: ${includeLeadMagnet ? `Yes — Title: "${leadMagnetTitle || "Free Guide"}", Description: "${leadMagnetDescription || "Get our free guide"}"` : "No"}
- Include Video Section: ${includeVideo ? `Yes — Video Title context: "${videoTitle || "See it in action"}"` : "No"}
- Include Custom Footer: ${includeFooter ? "Yes" : "No"}

WRITING RULES:
- Hero headline: 6-10 words. Specific benefit or pain point.
- Subheadline: 1-2 sentences. Explain how/why.
- Problem section: Real pain points the audience feels TODAY.
- Features: Title = benefit (not feature name). Description = what it actually does.
- Benefits: Outcomes the user gets. Specific. Tangible.
- Testimonials (if requested): Write 3 realistic ones IN ${lang}. Use names that fit the audience/region. Each has quote (1-2 sentences), name, role, company.
- Team (if requested): Write a short tagline for each team member from inputs. Don't invent extra members.
- Lead magnet (if requested): Write a compelling reason to download. Specific benefit.
- Video section (if requested): Write a section headline and short description.
- Footer (if requested): Write a short company description.
- Pricing (if requested): 3 tiers — Starter, Pro, Business. Realistic USD prices.
- FAQ (if requested): 5 real questions, honest answers.
- Final CTA: Different angle than hero.

Return JSON only:

{
  "hero": {
    "headline": "string (6-10 words, in ${lang})",
    "subheadline": "string (1-2 sentences, in ${lang})",
    "cta": "${ctaText || "Get Started"}",
    "secondaryCta": "string (in ${lang})"
  },
  "problem": {
    "headline": "string (in ${lang})",
    "points": ["3 specific pain points in ${lang}"]
  },
  "features": [
    { "icon": "string (lucide icon name)", "title": "string in ${lang}", "desc": "string in ${lang}" }
  ],
  "benefits": {
    "headline": "string in ${lang}",
    "items": ["4-5 specific outcomes in ${lang}"]
  },
  "socialProof": {
    "stat1": { "number": "string or empty", "label": "string in ${lang} or empty" },
    "stat2": { "number": "string or empty", "label": "string in ${lang} or empty" },
    "testimonial": { "quote": "string in ${lang} or empty", "name": "string or empty", "role": "string in ${lang} or empty" }
  },
  ${includeTestimonials ? `"testimonials": {
    "headline": "string in ${lang} like 'What people say'",
    "items": [
      { "quote": "string in ${lang}", "name": "string", "role": "string in ${lang}", "company": "string", "photoIndex": "if this matches user-provided testimonial #N (1-based), put N as a number, otherwise null" },
      { "quote": "string in ${lang}", "name": "string", "role": "string in ${lang}", "company": "string", "photoIndex": null },
      { "quote": "string in ${lang}", "name": "string", "role": "string in ${lang}", "company": "string", "photoIndex": null }
    ]
  },` : `"testimonials": null,`}
  ${includeTeam ? `"team": {
    "headline": "string in ${lang} like 'Meet the team'",
    "subheadline": "string in ${lang}",
    "members": [
      ${(teamMembers || []).filter(m => m && (m.name || m.role)).map(m => `{ "name": "${(m.name || "").replace(/"/g, '\\"')}", "role": "${(m.role || "").replace(/"/g, '\\"')}", "bio": "1-2 sentence bio in ${lang} based on '${(m.bio || "").replace(/"/g, '\\"')}'", "photo": "${m.photo || ""}" }`).join(",\n      ")}
    ]
  },` : `"team": null,`}
  ${includeLeadMagnet ? `"leadMagnet": {
    "eyebrow": "string in ${lang} like 'Free Download'",
    "headline": "string in ${lang} (compelling)",
    "subheadline": "string in ${lang} (specific benefit)",
    "bulletPoints": ["3-4 things they get in ${lang}"],
    "buttonText": "string in ${lang} like 'Send me the guide'"
  },` : `"leadMagnet": null,`}
  ${includeVideo ? `"video": {
    "eyebrow": "string in ${lang} like 'Watch'",
    "headline": "string in ${lang}",
    "subheadline": "string in ${lang}"
  },` : `"video": null,`}
  ${includePricing ? `"pricing": [
    ${(pricingTiers || []).map(t => `{ "name": "${(t.name || "").replace(/"/g, '\\"')}", "price": "${(t.price || "").replace(/"/g, '\\"')}", "period": "${t.period || "month"}", "features": [${(t.features || []).filter(f => f).map(f => `"polished version of: ${f.replace(/"/g, '\\"')} (in ${lang})"`).join(", ")}], "cta": "${(t.cta || "Get Started").replace(/"/g, '\\"')}", "popular": ${t.popular ? "true" : "false"} }`).join(",\n    ")}
  ],` : `"pricing": [],`}
  ${includeFaq ? `"faq": [
    ${(faqItems || []).filter(f => f.q).map(f => `{ "q": "${f.q.replace(/"/g, '\\"')}", "a": "${f.a ? `polish this answer in ${lang}: ${f.a.replace(/"/g, '\\"')}` : `write a real honest answer in ${lang} (2-3 sentences)`}" }`).join(",\n    ")}
  ],` : `"faq": [],`}
  ${includeEmailCapture ? `"emailCapture": {
    "headline": "string in ${lang}",
    "subheadline": "string in ${lang}",
    "buttonText": "string in ${lang}",
    "placeholder": "${isEnglish ? "Enter your email" : "string in " + lang}"
  },` : `"emailCapture": null,`}
  ${includeFooter ? `"footer": {
    "tagline": "1-sentence company description in ${lang}",
    "copyright": "© 2025 ${businessName}. ${isEnglish ? "All rights reserved." : "string in " + lang}"
  },` : `"footer": null,`}
  "finalCta": {
    "headline": "string in ${lang} (different angle from hero)",
    "subheadline": "string in ${lang}",
    "cta": "${ctaText || "Get Started"}"
  },
  "seo": {
    "title": "string in ${lang} (50-60 chars, includes business name)",
    "description": "string in ${lang} (140-160 chars, includes main benefit)"
  }
}

Write like a real conversion copywriter. Be specific. Be human. No fluff. No AI tells. Every word in ${lang}.`;

    const pageData = await generateJSON(prompt);

    // Attach user-uploaded testimonial photos by index
    if (includeTestimonials && pageData.testimonials?.items && userTestimonials?.length) {
      const userPhotos = userTestimonials.filter(t => t.quote || t.name).map(t => t.photo || "");
      pageData.testimonials.items = pageData.testimonials.items.map((item) => {
        const idx = item.photoIndex;
        if (typeof idx === "number" && idx >= 1 && idx <= userPhotos.length) {
          return { ...item, photo: userPhotos[idx - 1] || "" };
        }
        return { ...item, photo: "" };
      });
    }

    // Attach static config that AI doesn't need to generate
    if (includeLeadMagnet && pageData.leadMagnet) {
      pageData.leadMagnet.downloadUrl = body.leadMagnetUrl || "";
    }
    if (includeVideo && pageData.video) {
      pageData.video.videoUrl = videoUrl || "";
    }
    if (includeFooter && pageData.footer) {
      pageData.footer.socials = footerSocials || {};
      pageData.footer.address = footerAddress || "";
      pageData.footer.email = footerEmail || "";
      pageData.footer.phone = footerPhone || "";
    }
    pageData._meta = {
      language: language || "en",
      tawkPropertyId: body.tawkPropertyId || "",
      tawkWidgetId: body.tawkWidgetId || "",
    };

    const supabase = await createClient();
    await supabase.from("projects").insert({
      user_id: usage.userId,
      tool_slug: "ai-landing-page-generator",
      title: `${businessName} — Landing Page`,
      prompt: description.slice(0, 200),
      input_data: body,
      output_data: pageData,
    });

    return NextResponse.json({
      success: true,
      page: pageData,
      usage: { used: usage.used, limit: usage.limit, isPro: usage.isPro },
    });
  } catch (error) {
    console.error("Landing page generation error:", error);
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}