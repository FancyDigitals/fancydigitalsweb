import { generateJSON } from "@/lib/ai/gemini";

/* ============================================================
   AD SCRIPT
============================================================ */

export async function generateAdScript({
  businessName,
  description,
  audience,
  goal,
  tone,
  duration = 30,
  contentBrief = "",
  vibe = "",
}) {
  const sceneCount =
    duration === 15 ? 3 :
    duration === 30 ? 5 :
    duration === 60 ? 8 :
    duration === 90 ? 13 :
    duration === 120 ? 17 :
    5;
  const secondsPerScene = Math.floor(duration / sceneCount);

  const toneGuides = {
    bold: "Confident, punchy, aggressive.",
    luxury: "Sophisticated, refined, aspirational.",
    tech: "Clear, precise, benefit-focused.",
    playful: "Fun, witty, casual.",
    energetic: "High-energy, motivational.",
  };

  const briefSection = contentBrief.trim()
    ? `\n\nUSER'S DETAILED BRIEF (FOLLOW THIS CLOSELY):\n${contentBrief.trim()}`
    : "";

  const vibeSection = vibe.trim()
    ? `\n\nVIBE / MOOD: ${vibe.trim()}\nMatch this mood in your word choice, pacing, and energy.`
    : "";

  const prompt = `You are an expert ad copywriter creating a ${duration}-second vertical social media video ad.

BUSINESS: ${businessName}
WHAT WE DO: ${description}
TARGET AUDIENCE: ${audience}
CAMPAIGN GOAL: ${goal}
TONE: ${tone} — ${toneGuides[tone] || toneGuides.bold}${vibeSection}${briefSection}

Create a ${sceneCount}-scene ad script.

STRUCTURE:
1. Scene 1 = Hook headline
2. Middle scenes = Mix of headline + visual scenes for variety
3. Final scene = CTA

SCENE TYPES:
- "headline" — text-focused, small optional image below
- "visual" — image dominates full screen with bold overlay text (use for wow moments, features, benefits)
- "cta" — final call to action

USE VISUAL SCENES when the scene is about SHOWING something impressive (a product, result, feature).
USE HEADLINE SCENES for hooks, statements, transitions.

RULES:
- Each title: max 6 words, punchy
- Each subtitle: max 12 words
- Follow ${tone} tone
- HIGHLIGHT the 1-2 most important words in each title
- Decide if each scene NEEDS a visual image (screenshot, photo, graphic)
- If needsImage=true, describe what image would help in imageIntent (2-4 words)

RULES FOR needsImage:
- Hook scenes: usually text-only (needsImage=false)
- Feature/benefit scenes: usually need image (needsImage=true)
- CTA scenes: usually text-only (needsImage=false)
- Aim for balance — not every scene needs an image

RETURN THIS EXACT JSON:
{
  "hook":"Main headline",

  "creativeDirection":{
      "style":"Apple commercial",
      "editing":"fast cinematic",
      "musicMood":"uplifting",
      "colorGrade":"warm premium",
      "voice":"confident",
      "pacing":"medium"
  },

  "scenes":[
    {
      "type":"headline",

      "duration":5,

      "title":"Build Faster",

      "highlightWords":[
        "Build",
        "Faster"
      ],

      "subtitle":"Launch your business in minutes.",

      "needsImage":false,

      "imageIntent":"",

      "visualType":"text",

      "imagePrompt":"",

      "videoPrompt":"",

      "cameraMotion":"none",

      "cameraAngle":"center",

      "lens":"",

      "lighting":"",

      "transition":"fade",

      "animation":"kinetic",

      "music":"uplifting",

      "soundEffect":"whoosh"
    },

    {
      "type":"visual",

      "duration":5,

      "title":"Beautiful Landing Pages",

      "highlightWords":[
        "Beautiful"
      ],

      "subtitle":"AI builds them instantly.",

      "needsImage":true,

      "imageIntent":"landing page",

      "visualType":"ai_video",

      "imagePrompt":"Modern startup office with premium website displayed on a MacBook Pro, Apple aesthetic, emerald green accents, cinematic lighting, shallow depth of field, ultra realistic.",

      "videoPrompt":"Slow cinematic dolly shot toward a premium MacBook showing an AI landing page builder, warm morning light, Apple commercial style, realistic reflections, depth of field, 4K.",

      "cameraMotion":"push_in",

      "cameraAngle":"eye_level",

      "lens":"50mm",

      "lighting":"golden hour",

      "transition":"zoom",

      "animation":"cinematic",

      "music":"inspiring",

      "soundEffect":"soft whoosh"
    },

    {
      "type":"cta",

      "duration":5,

      "title":"Start Today",

      "highlightWords":[
        "Today"
      ],

      "subtitle":"Build your first project free.",

      "ctaText":"Get Started",

      "ctaUrl":"example.com",

      "needsImage":false,

      "imageIntent":"",

      "visualType":"text",

      "imagePrompt":"",

      "videoPrompt":"",

      "cameraMotion":"none",

      "transition":"fade",

      "animation":"kinetic",

      "music":"epic",

      "soundEffect":"logo reveal"
    }
  ],

  "cta":"Start now"
}

You are not simply writing an ad.

You are directing a premium commercial.

Think like:

• Creative Director
• Hollywood Cinematographer
• Motion Designer
• Commercial Editor
• Award-winning Copywriter

Every scene must feel expensive.

Every visual should look like an Apple keynote,
Nike commercial,
Tesla advertisement,
Stripe launch film,
or Linear product announcement.

Whenever a scene needs visuals, generate BOTH:

imagePrompt

AND

videoPrompt

The videoPrompt should contain:

• subject
• environment
• action
• camera movement
• camera angle
• lighting
• composition
• realism
• atmosphere

Do NOT write generic prompts.

BAD:

"A person using laptop."

GOOD:

"A confident young entrepreneur working on a sleek MacBook Pro inside a modern glass office overlooking the city at sunrise. Slow cinematic push-in shot with soft golden hour lighting, shallow depth of field, Apple commercial style, ultra realistic 4K."

Choose one:

visualType:

"text"
"user_upload"
"stock"
"ai_image"
"ai_video"

Only use ai_video for scenes that truly benefit from motion.

Most scenes should still use ai_image.`;

  const result = await generateJSON(prompt);

  if (!result?.scenes || !Array.isArray(result.scenes)) {
    throw new Error("Invalid ad script structure");
  }

  return result;
}

/* ============================================================
   EXPLAINER SCRIPT
============================================================ */

export async function generateExplainerScript({
  topic,
  audience,
  goal,
  duration = 30,
  contentBrief = "",
  vibe = "",
}) {
  const sceneCount =
    duration === 15 ? 3 :
    duration === 30 ? 5 :
    duration === 60 ? 8 :
    duration === 90 ? 13 :
    duration === 120 ? 17 :
    5;
  const secondsPerScene = Math.floor(duration / sceneCount);

  const briefSection = contentBrief.trim()
    ? `\n\nUSER'S DETAILED BRIEF (FOLLOW THIS CLOSELY):\n${contentBrief.trim()}`
    : "";

  const vibeSection = vibe.trim()
    ? `\n\nVIBE / MOOD: ${vibe.trim()}\nMatch this mood in your word choice, pacing, and energy.`
    : "";

  const prompt = `You are an expert explainer video scriptwriter.

Create a ${duration}-second vertical tutorial video.

TOPIC: ${topic}
AUDIENCE: ${audience}
GOAL: ${goal}${vibeSection}${briefSection}

STRUCTURE:
1. Scene 1 = Headline hook
2. Middle scenes = Step-by-step instructions (use "visual" type when showing something on screen)
3. Final scene = CTA

SCENE TYPES:
- "headline" — text-focused intros
- "step" — numbered step with instruction text
- "visual" — full-screen image with bold overlay text (use when showing a specific screen or result)
- "cta" — final call to action

USE VISUAL SCENES for showing specific screens/results.
USE STEP SCENES for numbered instructions.

STYLE:
- Clear, direct, educational
- Each title max 8 words
- Each subtitle max 18 words
- HIGHLIGHT the 1-2 most important words in each title
- Decide if each scene NEEDS a visual image
- If needsImage=true, describe in imageIntent (2-4 words)

RULES FOR needsImage:
- Headline scenes: usually text-only (needsImage=false)
- Step scenes: usually need screenshot (needsImage=true)
- CTA: usually text-only (needsImage=false)

RETURN THIS EXACT JSON:
{
  "hook": "Main headline",
  "scenes": [
    {
      "type": "headline",
      "title": "Main hook",
      "highlightWords": ["word"],
      "subtitle": "Supporting line",
      "needsImage": false,
      "imageIntent": "",
      "duration": ${secondsPerScene}
    },
    {
      "type": "step",
      "stepNumber": 1,
      "title": "Step title",
      "highlightWords": ["key"],
      "subtitle": "What to do",
      "needsImage": true,
      "imageIntent": "signup form",
      "duration": ${secondsPerScene}
    },
    {
      "type": "visual",
      "title": "Watch this",
      "highlightWords": ["watch"],
      "subtitle": "See the result",
      "needsImage": true,
      "imageIntent": "final dashboard view",
      "duration": ${secondsPerScene}
    },
    {
      "type": "cta",
      "title": "Action headline",
      "highlightWords": ["action"],
      "subtitle": "Encouragement",
      "ctaText": "Button text",
      "ctaUrl": "example.com",
      "needsImage": false,
      "imageIntent": "",
      "duration": ${secondsPerScene}
    }
  ],
  "cta": "Final CTA"
}

RULES:
- Valid JSON only, no markdown
- Include stepNumber for step scenes
- CTA scene must include ctaText
- highlightWords must be exact words from title
- imageIntent: descriptive lowercase words (e.g. "login screen", "settings page")`;

  const result = await generateJSON(prompt);

  if (!result?.scenes || !Array.isArray(result.scenes)) {
    throw new Error("Invalid explainer script structure");
  }

  return result;
}