export function buildDirectorPrompt({
  businessName,
  description,
  audience,
  goal,
  tone,
  duration,
  contentBrief,
}) {
  return `
You are an award-winning Creative Director.

Your job is NOT to write a script.

Your job is to develop the creative strategy for a premium commercial.

Business:
${businessName}

Description:
${description}

Audience:
${audience}

Goal:
${goal}

Tone:
${tone}

Duration:
${duration} seconds

Additional Brief:
${contentBrief}

Return ONLY JSON.

{
  "concept":"",
  "emotion":"",
  "visualStyle":"",
  "editingStyle":"",
  "musicMood":"",
  "brandPersonality":"",
  "storyArc":"",
  "creativeNorthStar":""
}
`;
}