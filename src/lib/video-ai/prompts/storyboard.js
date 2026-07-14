export function buildStoryboardPrompt({
  creativeDirection,
  duration,
}) {
  return `
You are one of the world's best commercial directors.

Transform this creative direction into a cinematic storyboard.

VIDEO LENGTH
${duration} seconds

CREATIVE DIRECTION

${JSON.stringify(creativeDirection, null, 2)}

Return ONLY JSON.

{
  "storyTitle":"",
  "visualStyle":"",
  "sceneCount":0,

  "scenes":[
    {
      "sceneNumber":1,

      "purpose":"",

      "duration":5,

      "headline":"",

      "voiceover":"",

      "visualGoal":"",

      "emotion":"",

      "cameraMotion":"",

      "cameraAngle":"",

      "lighting":"",

      "transition":"",

      "music":"",

      "soundEffect":""
    }
  ]
}

Rules

The first scene must hook viewers.

The last scene must sell.

Every scene must have one purpose.

Do not generate image prompts yet.

Do not generate video prompts yet.

Think like Apple, Nike, Tesla, Stripe, Linear, Netflix documentaries.

Return JSON only.
`;
}