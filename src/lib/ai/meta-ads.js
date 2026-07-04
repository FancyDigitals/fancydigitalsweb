import { generateJSON } from "@/lib/ai/gemini";

export async function generateMetaAdsStrategy({
  businessName,
  businessDescription,
  productService,
  targetAudience,
  budget,
  campaignGoal,
  pastResults = "",
  brandColor = "",
  location = "",
  additionalContext = "",
}) {
  const prompt = `You are a Meta Ads expert helping a small business owner who has never run ads before. Use simple, plain English. No jargon. No complex terms. Be specific and practical.

CLIENT:
- Business: ${businessName}
- What they do: ${businessDescription}
- Promoting: ${productService}
- Location: ${location || "Nigeria"}
- Budget: ${budget}
- Goal: ${campaignGoal || "get more customers"}
${pastResults ? `- Past results: ${pastResults}` : ""}
${additionalContext ? `- Extra info: ${additionalContext}` : ""}

Return this EXACT JSON. Nothing else. No markdown. No explanation outside the JSON.

{
  "audiences": [
    {
      "name": "Simple name for this group of people (e.g. 'Young Lagos Entrepreneurs')",
      "demographics": {
        "age": "e.g. 25-35",
        "gender": "Everyone / Men / Women",
        "location": "Specific city or region"
      },
      "interests": ["interest 1", "interest 2", "interest 3", "interest 4", "interest 5"],
      "behaviors": ["behavior 1", "behavior 2"],
      "estimatedSize": "e.g. 500K-1M people",
      "budgetAllocation": "e.g. 40% of your budget",
      "whyThisAudience": "One sentence explaining in plain English why these people would buy"
    },
    {
      "name": "Second audience group",
      "demographics": {
        "age": "e.g. 30-45",
        "gender": "Everyone / Men / Women",
        "location": "Specific city or region"
      },
      "interests": ["interest 1", "interest 2", "interest 3", "interest 4", "interest 5"],
      "behaviors": ["behavior 1", "behavior 2"],
      "estimatedSize": "e.g. 300K-600K people",
      "budgetAllocation": "e.g. 35% of your budget",
      "whyThisAudience": "One sentence explaining in plain English why these people would buy"
    },
    {
      "name": "Third audience group",
      "demographics": {
        "age": "e.g. 28-50",
        "gender": "Everyone / Men / Women",
        "location": "Specific city or region"
      },
      "interests": ["interest 1", "interest 2", "interest 3", "interest 4", "interest 5"],
      "behaviors": ["behavior 1", "behavior 2"],
      "estimatedSize": "e.g. 200K-500K people",
      "budgetAllocation": "e.g. 25% of your budget",
      "whyThisAudience": "One sentence explaining in plain English why these people would buy"
    }
  ],
  "adCopy": {
    "headlines": [
      "Short punchy headline (max 8 words)",
      "Second headline option",
      "Third headline option",
      "Fourth headline option",
      "Fifth headline option"
    ],
    "primaryTexts": [
      {
        "hook": "First line that grabs attention (max 20 words)",
        "fullText": "Full ad text. Write it like you are talking to a friend. Tell them the problem, your solution, and tell them what to do next. Keep it under 150 words."
      },
      {
        "hook": "Second attention grabbing first line",
        "fullText": "Second full ad text option. Different angle from the first one."
      },
      {
        "hook": "Third attention grabbing first line",
        "fullText": "Third full ad text option."
      }
    ],
    "ctaButtons": ["Learn More", "Sign Up", "Get Started", "Contact Us", "Shop Now"]
  },
  "creative": {
    "videoHooks": [
      {
        "hook": "Exact words to say in the first 3 seconds of your video to stop people scrolling",
        "type": "Question / Bold Statement / Shock fact",
        "seconds": "0-3s"
      },
      {
        "hook": "Second video hook option",
        "type": "Question / Bold Statement / Shock fact",
        "seconds": "0-3s"
      },
      {
        "hook": "Third video hook option",
        "type": "Question / Bold Statement / Shock fact",
        "seconds": "0-3s"
      }
    ],
    "imageAdConcepts": [
      {
        "title": "Simple name for this ad idea",
        "description": "Describe exactly what the image should look like in plain English",
        "textOverlay": "The exact text to put on the image",
        "colorMood": "Bright / Dark / Clean / Bold",
        "elements": ["element 1", "element 2"]
      },
      {
        "title": "Second image ad idea",
        "description": "Describe exactly what the image should look like",
        "textOverlay": "Exact text for this image",
        "colorMood": "Bright / Dark / Clean / Bold",
        "elements": ["element 1", "element 2"]
      }
    ],
    "carouselStructures": [
      {
        "title": "Simple carousel idea name",
        "cards": [
          "Card 1: What to write/show",
          "Card 2: What to write/show",
          "Card 3: What to write/show",
          "Card 4: What to write/show",
          "Card 5: What to write/show"
        ]
      }
    ]
  },
  "testingPlan": {
    "phase1": {
      "duration": "First 3-5 days",
      "focus": "Test your ads",
      "test": "Plain English explanation of what to do in week 1. What to set up, how many ads to run, what to look for.",
      "budget": "How much to spend per day in plain numbers"
    },
    "phase2": {
      "duration": "Days 6-14",
      "focus": "Find what works",
      "test": "Plain English explanation of what to do in week 2. Which ads to keep, which to stop.",
      "budget": "How much to spend now"
    },
    "phase3": {
      "duration": "Day 15 onwards",
      "focus": "Grow what works",
      "test": "Plain English explanation of how to scale up the winning ads.",
      "budget": "How much to spend as you scale"
    }
  },
  "killMetrics": {
    "afterSpend": "Stop an ad if you spend ₦X with no results",
    "killIf": [
      "Plain English sign that the ad is not working",
      "Another sign the ad is failing",
      "Third sign to stop the ad"
    ],
    "scaleIf": [
      "Plain English sign that the ad is working well",
      "Another sign to spend more on this ad",
      "Third sign of a winning ad"
    ]
  },
  "quickWins": [
    "First thing to do right now before anything else",
    "Second quick action to take today",
    "Third simple thing that will improve results fast"
  ],
  "commonMistakes": [
    "Most common mistake beginners make with Meta ads",
    "Second mistake to avoid",
    "Third mistake to avoid"
  ]
}

RULES:
- Write everything in plain English like you are talking to someone who has never run ads
- Be specific — use actual numbers, actual words, actual examples
- Use ₦ (Naira) for all money amounts
- Reference ${location || "Nigeria"} and ${productService} specifically
- Never use words like: CBO, ABO, ROAS, CPM, CTR, CPC, frequency, attribution — explain the concept in plain words instead
- Return valid JSON only`;

  const result = await generateJSON(prompt);

  if (!result?.audiences || !result?.adCopy) {
    throw new Error("Could not generate your ads plan. Please try again.");
  }

  return result;
}