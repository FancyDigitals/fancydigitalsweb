import { generateWithGemini } from "@/lib/ai/gemini";

export async function generateLessonContent({
  lessonTitle,
  moduleTitle,
  courseTitle,
  courseDescription,
  lessonNumber,
  totalLessons,
  studentAge = null,
}) {
  const ageContext = studentAge
    ? `The student is ${studentAge} years old. Adjust your language, examples, and tone to match this age group. ${
        studentAge < 18
          ? "Use simple language, relatable teen examples, and an encouraging energetic tone."
          : studentAge < 25
          ? "Use modern language, startup and business examples, direct and energetic tone."
          : studentAge < 40
          ? "Use professional conversational language with practical business examples."
          : "Use clear respectful language with practical real-world examples."
      }`
    : "Use conversational, engaging language suitable for a general adult audience.";

  const prompt = `
You are the world's best instructional designer.

You are creating an INTERACTIVE lesson for Fancy Academy.

========================================
COURSE
========================================

Course:
${courseTitle}

Module:
${moduleTitle}

Lesson:
${lessonTitle}

Lesson ${lessonNumber} of ${totalLessons}

${ageContext}

========================================
IMPORTANT
========================================

Do NOT write a blog.

Do NOT write documentation.

Do NOT write a textbook.

Teach one idea at a time.

Every lesson should feel like Duolingo, Brilliant.org and Apple Education combined.

Alternate explanation with interaction.

Keep each block short.

Maximum 120 words per teaching block.

Use modern companies and real-world examples.

Avoid generic examples.

Never repeat yourself.

========================================
VISUAL RULES
========================================

Every lesson MUST contain at least ONE visual block.

Whenever something can be explained visually,
DO NOT write another paragraph.

Instead generate a structured diagram.

Supported layouts:

vertical

horizontal

comparison

tree

cycle

timeline

Maximum nodes: 8

Node title:
1-3 words

Node subtitle:
Maximum 10 words

Connections must reference valid node IDs.

Do NOT generate:

- markdown diagrams
- ascii art
- svg
- html

Return ONLY structured JSON.

========================================
AVAILABLE BLOCK TYPES
========================================

mission

story

concept

visual

business_case

checkpoint

exercise

ai_prompt

summary

challenge

========================================
RETURN THIS JSON
========================================

{
  "mission": {
    "title": "",
    "objective": "",
    "estimatedTime": "${lessonNumber * 3 + 5} minutes"
  },

  "blocks": [

    {
      "type":"story",
      "title":"",
      "content":""
    },

    {
      "type":"concept",
      "title":"",
      "content":""
    },

    {
      "type":"visual",
      "title":"",
      "description":"",

      "diagram":{

        "layout":"vertical",

        "nodes":[
          {
            "id":"1",
            "title":"",
            "subtitle":""
          }
        ],

        "connections":[
          {
            "from":"1",
            "to":"2"
          }
        ]
      }
    },

    {
      "type":"business_case",
      "title":"",
      "scenario":"",
      "solution":"",
      "result":""
    },

    {
      "type":"checkpoint",
      "question":"",
      "answer":""
    },

    {
      "type":"exercise",
      "title":"",
      "instruction":"",
      "expectedOutcome":""
    },

    {
      "type":"ai_prompt",
      "title":"",
      "prompt":"",
      "whyItWorks":""
    }

  ],

  "summary":{
    "points":[]
  },

  "challenge":{
    "title":"",
    "instruction":""
  }

}

Return ONLY valid JSON.

No markdown.

No explanation.

No code fences.
`;

  const result = await generateWithGemini(prompt, {
    jsonMode: true,
  });

  const cleaned = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}