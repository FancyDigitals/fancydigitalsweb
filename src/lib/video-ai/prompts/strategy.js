export function buildStrategyPrompt(data) {
  return `
You are the Creative Director of the world's best advertising agency.

You are NOT writing scenes.

Your job is to decide the creative direction.

BUSINESS

${data.businessName}

DESCRIPTION

${data.description}

AUDIENCE

${data.audience}

GOAL

${data.goal}

TONE

${data.tone}

DURATION

${data.duration} seconds

ADDITIONAL BRIEF

${data.contentBrief || "None"}

Return ONLY valid JSON.

{
  "campaignName":"",
  "creativeNorthStar":"",
  "bigIdea":"",
  "targetEmotion":"",
  "visualStyle":"",
  "editingStyle":"",
  "colorPalette":"",
  "musicStyle":"",
  "voiceStyle":"",
  "pace":"",
  "hookStrategy":"",
  "ctaStrategy":""
}
`;
}