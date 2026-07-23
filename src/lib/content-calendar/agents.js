import { generateJSON } from "@/lib/ai/gemini";

// ─────────────────────────────────────────────
// PLATFORM CONFIGURATIONS
// ─────────────────────────────────────────────
export const PLATFORMS = {
  instagram: { name: "Instagram", charLimit: 2200, bestTimes: ["Tue 7pm", "Wed 11am", "Fri 3pm"] },
  linkedin: { name: "LinkedIn", charLimit: 3000, bestTimes: ["Tue 8am", "Wed 10am", "Thu 9am"] },
  twitter: { name: "Twitter/X", charLimit: 280, bestTimes: ["Mon 9am", "Wed 12pm", "Fri 3pm"] },
  facebook: { name: "Facebook", charLimit: 63206, bestTimes: ["Wed 1pm", "Thu 8am", "Sat 9am"] },
  tiktok: { name: "TikTok", charLimit: 2200, bestTimes: ["Tue 6pm", "Thu 7pm", "Sun 8pm"] },
  youtube: { name: "YouTube", charLimit: 1000, bestTimes: ["Sat 10am", "Sun 12pm"] },
  threads: { name: "Threads", charLimit: 500, bestTimes: ["Mon 8pm", "Wed 9pm"] },
  pinterest: { name: "Pinterest", charLimit: 500, bestTimes: ["Sat 8pm", "Sun 9pm"] },
};

// ─────────────────────────────────────────────
// CONTENT PILLARS (universal marketing framework)
// ─────────────────────────────────────────────
const PILLARS = [
  { id: "educational", name: "Educational", description: "Teach, inform, provide value" },
  { id: "entertaining", name: "Entertaining", description: "Engage, amuse, delight" },
  { id: "inspirational", name: "Inspirational", description: "Motivate, uplift, aspire" },
  { id: "promotional", name: "Promotional", description: "Sell, showcase, convert" },
  { id: "behind_scenes", name: "Behind the Scenes", description: "Humanize, build trust" },
  { id: "user_generated", name: "UGC / Community", description: "Feature customers, build community" },
  { id: "trending", name: "Trending / Newsjacking", description: "Ride the wave" },
];

// ─────────────────────────────────────────────
// AGENT 1: STRATEGIC PLANNER
// Analyzes brand and produces content strategy
// ─────────────────────────────────────────────
export async function runStrategicPlanner({
  brand_name,
  industry,
  audience,
  tone,
  goal,
  platforms,
  duration_days,
}) {
  const platformList = platforms
    .map((p) => PLATFORMS[p]?.name || p)
    .join(", ");

  const prompt = `You are a world-class Content Strategist at a top social media agency.

BRAND: ${brand_name || "Brand"}
INDUSTRY: ${industry || "General"}
TARGET AUDIENCE: ${audience || "General"}
BRAND TONE: ${tone || "Professional"}
CAMPAIGN GOAL: ${goal || "Grow engagement and awareness"}
PLATFORMS: ${platformList}
CALENDAR DURATION: ${duration_days} days

Analyze this and return a strategic content plan.

CRITICAL: Return PLAIN TEXT only inside JSON. No markdown, no asterisks, no hashes.

{
  "strategy_summary": "2-3 sentence overall strategy",
  "audience_insights": "2 sentences about what this audience wants to see",
  "content_mix": {
    "educational": 30,
    "entertaining": 20,
    "inspirational": 15,
    "promotional": 20,
    "behind_scenes": 10,
    "user_generated": 5
  },
  "recommended_themes": [
    { "name": "Theme name", "description": "1 sentence explanation" }
  ],
  "posting_frequency": "Recommended posts per week per platform",
  "reasoning": "3 sentences on why this strategy fits this brand"
}

The content_mix percentages MUST total 100. Recommend 4-6 themes tailored to this specific brand.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 2: PLANNING MODE — Full calendar generation
// ─────────────────────────────────────────────
export async function runPlanningGenerator({
  brand_name,
  industry,
  audience,
  tone,
  goal,
  platforms,
  duration_days,
  start_date,
  strategy,
  include_hashtags = true,
  include_image_prompts = true,
}) {
  const platformDetails = platforms
    .map((p) => {
      const cfg = PLATFORMS[p];
      return `${cfg.name} (${cfg.charLimit} chars max)`;
    })
    .join(", ");

  const prompt = `You are a senior social media content creator generating a ${duration_days}-day content calendar.

BRAND: ${brand_name}
INDUSTRY: ${industry}
AUDIENCE: ${audience}
TONE: ${tone}
GOAL: ${goal}
PLATFORMS: ${platformDetails}
START DATE: ${start_date}

STRATEGY (follow this):
${JSON.stringify(strategy, null, 2)}

Generate EXACTLY ${duration_days} days of content. For each day, create 1 post per platform selected.

Distribute content pillars according to the strategy content_mix ratios.

CRITICAL: Return PLAIN TEXT only inside JSON. No markdown, no asterisks, no hashes, no backticks.

{
  "posts": [
    {
      "id": "post-1",
      "day": 1,
      "date": "YYYY-MM-DD",
      "platform": "instagram",
      "pillar": "educational",
      "post_type": "carousel",
      "hook": "Scroll-stopping opening line",
      "caption": "Full caption text (respect platform char limit)",
      "cta": "Clear call to action",
      "hashtags": ["hashtag1", "hashtag2"],
      "image_prompt": "Detailed image prompt for AI image generation",
      "best_time": "Tuesday 7pm",
      "char_count": 280,
      "status": "draft",
      "notes": "Optional strategic note for the user"
    }
  ]
}

RULES:
- post_type must be one of: image, carousel, video, reel, story, text, link
- pillar must match one of: educational, entertaining, inspirational, promotional, behind_scenes, user_generated, trending
- status is always "draft"
- Vary hooks, angles, and formats — no two posts should feel identical
- Reference specific brand/industry insights, not generic content
- Each caption must be genuinely publishable, not placeholder
- ${include_hashtags ? "Include 5-15 relevant hashtags per post" : "Do not include hashtags"}
- ${include_image_prompts ? "Include detailed image_prompt for each post" : "Set image_prompt to empty string"}
- Date increments by 1 day starting from ${start_date}

Generate ${duration_days} × ${platforms.length} = ${duration_days * platforms.length} total posts.`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 3: REPURPOSING MODE — One source → multi-platform week
// ─────────────────────────────────────────────
export async function runRepurposingGenerator({
  source_content,
  source_type,
  brand_name,
  audience,
  tone,
  platforms,
  duration_days,
  start_date,
}) {
  const platformDetails = platforms
    .map((p) => `${PLATFORMS[p].name} (${PLATFORMS[p].charLimit} chars max)`)
    .join(", ");

  const prompt = `You are an expert content repurposer. Turn ONE piece of source content into a full ${duration_days}-day multi-platform content calendar.

SOURCE CONTENT (${source_type || "text"}):
"""
${source_content}
"""

BRAND: ${brand_name || "Brand"}
AUDIENCE: ${audience || "General"}
TONE: ${tone || "Professional"}
PLATFORMS: ${platformDetails}
DURATION: ${duration_days} days
START DATE: ${start_date}

Extract EVERY angle, insight, quote, statistic, and story from the source content and turn each into distinct social posts.

CRITICAL: Return PLAIN TEXT only inside JSON. No markdown.

{
  "source_summary": "1 sentence describing the source",
  "extracted_angles": [
    { "angle": "Key insight or angle", "post_type_suggestion": "Best format" }
  ],
  "posts": [
    {
      "id": "post-1",
      "day": 1,
      "date": "YYYY-MM-DD",
      "platform": "instagram",
      "pillar": "educational",
      "post_type": "carousel",
      "hook": "Scroll-stopping opening",
      "caption": "Full adapted caption for this platform",
      "cta": "Call to action",
      "hashtags": ["hashtag1"],
      "image_prompt": "Detailed image prompt",
      "best_time": "Tuesday 7pm",
      "char_count": 280,
      "status": "draft",
      "source_angle": "Which insight from the source this post uses",
      "notes": "Strategic note"
    }
  ]
}

RULES:
- Extract 5-10 distinct angles from the source
- Distribute across the ${duration_days} days and ${platforms.length} platforms
- Each post should feel native to its platform, not copy-pasted
- Adapt tone, length, and style to platform culture
- Total posts: ${duration_days * platforms.length}
- Date increments by 1 day starting from ${start_date}`;

  return await generateJSON(prompt);
}

// ─────────────────────────────────────────────
// AGENT 4: CAMPAIGN MODE — Coordinated multi-post campaign
// ─────────────────────────────────────────────
export async function runCampaignGenerator({
  campaign_type,
  campaign_details,
  brand_name,
  industry,
  audience,
  tone,
  platforms,
  duration_days,
  start_date,
  launch_date,
}) {
  const platformDetails = platforms
    .map((p) => `${PLATFORMS[p].name} (${PLATFORMS[p].charLimit} chars max)`)
    .join(", ");

  const prompt = `You are a campaign strategist at a top marketing agency. Build a coordinated ${duration_days}-day social media campaign.

CAMPAIGN TYPE: ${campaign_type}
CAMPAIGN DETAILS: ${campaign_details}
BRAND: ${brand_name}
INDUSTRY: ${industry || "General"}
AUDIENCE: ${audience}
TONE: ${tone}
PLATFORMS: ${platformDetails}
DURATION: ${duration_days} days
START DATE: ${start_date}
LAUNCH DATE: ${launch_date || start_date}

Structure the campaign in phases:
- TEASE (before launch) — mysterious hints, build curiosity
- REVEAL (near launch) — announcement, key benefits
- LAUNCH (launch day) — big splash, urgency, CTAs
- SUSTAIN (after launch) — social proof, testimonials, conversion
- RETARGET (final days) — last chance, urgency, FOMO

CRITICAL: Return PLAIN TEXT only inside JSON. No markdown.

{
  "campaign_arc": {
    "tease_days": 2,
    "reveal_days": 2,
    "launch_days": 1,
    "sustain_days": 2,
    "retarget_days": 1
  },
  "key_message": "The one thing this campaign must communicate",
  "posts": [
    {
      "id": "post-1",
      "day": 1,
      "date": "YYYY-MM-DD",
      "platform": "instagram",
      "phase": "tease",
      "pillar": "promotional",
      "post_type": "image",
      "hook": "Scroll-stopping opening",
      "caption": "Full campaign-optimized caption",
      "cta": "Phase-appropriate CTA",
      "hashtags": ["campaignHashtag"],
      "image_prompt": "Detailed image prompt",
      "best_time": "Tuesday 7pm",
      "char_count": 280,
      "status": "draft",
      "notes": "Why this post at this moment"
    }
  ]
}

RULES:
- Every post must serve the campaign arc (know its phase)
- Include a consistent campaign hashtag across all posts
- Total posts: ${duration_days * platforms.length}
- Date increments by 1 day starting from ${start_date}
- CTAs escalate as campaign progresses toward launch`;

  return await generateJSON(prompt);
}