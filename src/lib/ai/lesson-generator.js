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

The student must interact every 20-40 seconds.

After every concept block, include a checkpoint or interactive block.

Use scenarios, decisions, and real choices — not just reading.

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

story
concept
visual
business_case
checkpoint
exercise
ai_prompt
interactive_story
scenario
quick_fire
timeline
process_flow
comparison

========================================
BLOCK RULES
========================================

Use interactive_story when the concept is best taught through narrative with choices.

Use scenario when the student should make a real business decision and see consequences.

Use quick_fire for fast-paced true/false or single-concept recall (2-4 questions max).

Use timeline when showing historical progression or sequential phases.

Use process_flow when showing a step-by-step system or pipeline.

Use comparison when contrasting two things (old vs new, human vs AI, approach A vs B).

LESSON STRUCTURE RULE:
- Never place two concept blocks in a row.
- Never place two story blocks in a row.
- Always alternate: teach → interact → teach → interact.
- Minimum 2 interactive blocks per lesson (checkpoint, exercise, scenario, quick_fire, interactive_story).

// Extend your existing lesson generator prompt — add these example structures
// to teach Gemini/Groq how to generate each new block type

const INTERACTIVE_BLOCK_EXAMPLES = {

  interactive_story: {
    type: 'interactive_story',
    content: {
      title: 'The Startup Pivot',
      description: 'Navigate a critical product decision',
      icon: '🚀',
      nodes: [
        {
          id: 'start',
          scene: 'Month 3',
          text: 'Your SaaS startup has 200 users but low retention. The team is debating whether to add more features or focus on onboarding.',
          dialogue: {
            character: 'Your Lead Engineer',
            avatar: '👩‍💻',
            text: 'We could ship the dashboard redesign in 2 weeks. Users keep asking for it.'
          },
          choices: [
            {
              text: 'Prioritize the dashboard redesign',
              correct: false,
              nextNode: 'wrong_path',
              outcome: 'You shipped fast but retention stayed flat. Users wanted better onboarding, not more features.'
            },
            {
              text: 'Fix onboarding first, then ship features',
              correct: true,
              nextNode: 'right_path',
              outcome: 'Smart. Fixing onboarding improved 30-day retention by 40% before you shipped anything new.'
            },
            {
              text: 'Talk to 10 churned users before deciding',
              correct: true,
              nextNode: 'right_path',
              outcome: 'Excellent. User interviews revealed onboarding confusion was the primary churn driver.'
            }
          ]
        }
      ]
    }
  },

  scenario: {
    type: 'scenario',
    content: {
      title: 'Product Roadmap Conflict',
      icon: '🎯',
      situation: 'Your top enterprise client wants a custom feature. Building it would take 6 weeks but delay your public roadmap.',
      context: 'You have 3 engineers available and a board review in 8 weeks.',
      stakeholders: [
        { name: 'Enterprise Client', avatar: '🏢', role: 'Paying $200k/yr' },
        { name: 'Board', avatar: '📊', role: 'Expecting roadmap progress' },
        { name: 'Engineering Team', avatar: '⚙️', role: 'At capacity' }
      ],
      metrics: {
        revenue: 75,
        morale: 80,
        product_velocity: 70
      },
      decisions: [
        {
          text: 'Build the custom feature immediately',
          impact: 'high',
          optimal: false,
          metricImpact: { revenue: 10, morale: -20, product_velocity: -25 },
          analysis: 'This secures the client short-term but creates technical debt and slows your roadmap significantly.',
          insight: 'Custom work for one client often creates maintenance burden that slows the whole product.'
        },
        {
          text: 'Decline and explain roadmap priorities',
          impact: 'high',
          optimal: false,
          metricImpact: { revenue: -15, morale: 10, product_velocity: 15 },
          analysis: 'You keep roadmap velocity but risk losing the client. This is defensible but commercially risky.',
          insight: 'Protecting roadmap is valid, but enterprise relationships require more nuance.'
        },
        {
          text: 'Negotiate: build a generalizable version that works for both',
          impact: 'high',
          optimal: true,
          metricImpact: { revenue: 8, morale: 5, product_velocity: -5 },
          analysis: 'This is the optimal decision. You satisfy the client while shipping something that benefits all users.',
          insight: 'The best product decisions turn customer requests into universal features. Always ask: can we build this for everyone?'
        }
      ]
    }
  },

  quick_fire: {
    type: 'quick_fire',
    content: {
      title: 'Product Metrics Mastery',
      description: 'Test your knowledge of key product metrics',
      icon: '⚡',
      questions: [
        {
          question: 'What does "DAU/MAU ratio" measure?',
          difficulty: 'medium',
          explanation: 'DAU/MAU measures stickiness — how often monthly users return daily.',
          options: [
            { text: 'Revenue per user', correct: false },
            { text: 'User stickiness / engagement frequency', correct: true },
            { text: 'Acquisition cost ratio', correct: false },
            { text: 'Retention vs churn', correct: false }
          ]
        },
        {
          question: 'A product has 60% Day-1 retention. Is this good?',
          difficulty: 'hard',
          explanation: 'It depends heavily on the category. Social apps average 25-35%, so 60% is excellent.',
          options: [
            { text: 'Yes, always above 50% is great', correct: false },
            { text: 'No, Day-1 should be above 80%', correct: false },
            { text: 'Depends on product category and benchmarks', correct: true },
            { text: 'Retention metrics don\'t matter at Day-1', correct: false }
          ]
        }
      ]
    }
  },

  timeline: {
    type: 'timeline',
    content: {
      title: 'Evolution of Product Management',
      icon: '📅',
      items: [
        {
          id: 'waterfall',
          year: '1970s',
          era: 'past',
          icon: '📋',
          title: 'Waterfall & Requirements Docs',
          summary: 'Products built from massive specification documents. No iteration.',
          description: 'Product managers wrote exhaustive requirements. Engineers built exactly what was specified, months later. User feedback came only after full launch.',
          impacts: ['Slow cycles', 'No user input', 'High failure rate'],
          stats: [{ value: '18mo+', label: 'Avg release cycle' }, { value: '~40%', label: 'On-spec delivery' }]
        },
        {
          id: 'agile',
          year: '2001',
          era: 'past',
          icon: '🔄',
          title: 'Agile Manifesto',
          summary: 'Iterative development, cross-functional teams, working software over docs.',
          description: 'The Agile Manifesto transformed software development. PMs shifted from spec-writers to collaborative facilitators working in 2-week sprints.',
          impacts: ['Faster iteration', 'User feedback loops', 'Cross-functional teams'],
          quote: { text: 'Working software over comprehensive documentation.', author: 'Agile Manifesto, 2001' }
        },
        {
          id: 'lean',
          year: '2011',
          era: 'present',
          icon: '🚀',
          title: 'Lean Startup & Build-Measure-Learn',
          summary: 'Validate before building. MVPs, hypothesis testing, pivot or persevere.',
          description: 'Eric Ries popularized the concept of validated learning. PMs became hypothesis-driven, using data and experiments to make decisions.',
          impacts: ['MVP culture', 'Data-driven decisions', 'Faster validation'],
          stats: [{ value: '2wk', label: 'Typical MVP cycle' }, { value: '10x', label: 'Faster learning' }]
        },
        {
          id: 'ai',
          year: '2024+',
          era: 'future',
          icon: '🤖',
          title: 'AI-Augmented Product Development',
          summary: 'AI generates features, runs experiments, predicts churn before it happens.',
          description: 'AI tools generate code, analyze user sessions, write copy, and suggest roadmap priorities. The PM role shifts from builder to strategic director.',
          impacts: ['AI co-pilots', 'Predictive analytics', 'Personalization at scale']
        }
      ]
    }
  },

  process_flow: {
    type: 'process_flow',
    content: {
      title: 'How to Run a Product Discovery Sprint',
      icon: '🔍',
      sequential: true,
      steps: [
        {
          title: 'Define the Problem Space',
          icon: '🎯',
          duration: '2 hours',
          description: 'Clearly articulate the user problem you are solving.',
          details: {
            steps: [
              'Write a one-sentence problem statement',
              'Identify who is affected and how often',
              'Quantify the impact with data'
            ],
            note: 'A vague problem leads to a vague solution. Be ruthlessly specific here.',
          }
        },
        {
          title: 'Map the User Journey',
          icon: '🗺️',
          duration: '3 hours',
          description: 'Visualize how users currently experience the problem.',
          details: {
            steps: [
              'Identify all touchpoints in the current flow',
              'Mark pain points and friction areas',
              'Note emotional states at each step'
            ],
            note: 'Include edge cases. Real users rarely follow the happy path.'
          }
        },
        {
          title: 'Generate Solutions',
          icon: '💡',
          duration: '90 min',
          description: 'Brainstorm possible solutions without judgment.',
          details: {
            steps: [
              'Each team member generates 5 ideas solo',
              'Share and combine ideas',
              'Vote on top 3 to prototype'
            ],
            note: 'Quantity over quality at this stage. Wild ideas often contain the kernel of the right answer.'
          }
        },
        {
          title: 'Prototype & Test',
          icon: '🧪',
          duration: '1 day',
          description: 'Build the lightest possible version and get user feedback.',
          details: {
            steps: [
              'Create a clickable prototype in Figma',
              'Run 5 usability tests',
              'Document what worked and what failed'
            ],
            status: 'info',
            statusMessage: 'You only need 5 users to find 85% of usability issues (Nielsen, 1993).'
          }
        }
      ]
    }
  },

  comparison: {
    type: 'comparison',
    content: {
      title: 'B2B vs B2C Product Management',
      icon: '⚖️',
      showVoting: true,
      options: [
        {
          name: 'B2B',
          icon: '🏢',
          subtitle: 'Business customers',
          pros: ['Predictable revenue', 'Deep user relationships', 'Clear ROI metrics'],
          cons: ['Long sales cycles', 'Complex stakeholders', 'Slower iteration'],
          attributes: {
            sales_cycle: 'Months',
            feedback_speed: 3,
            revenue_predictability: 9,
            product_complexity: 8,
            iteration_speed: 4,
            user_empathy: 6
          }
        },
        {
          name: 'B2C',
          icon: '👤',
          subtitle: 'Consumer customers',
          pros: ['Fast feedback loops', 'Viral growth potential', 'Intuition-driven design'],
          cons: ['Price sensitive users', 'High churn', 'Harder to monetize'],
          attributes: {
            sales_cycle: 'Seconds',
            feedback_speed: 9,
            revenue_predictability: 4,
            product_complexity: 5,
            iteration_speed: 9,
            user_empathy: 8
          }
        }
      ],
      attributes: [
        { key: 'feedback_speed', label: 'Feedback Speed', icon: '⚡' },
        { key: 'revenue_predictability', label: 'Revenue Predictability', icon: '💰' },
        { key: 'product_complexity', label: 'Product Complexity', icon: '🧩' },
        { key: 'iteration_speed', label: 'Iteration Speed', icon: '🔄' },
        { key: 'user_empathy', label: 'User Empathy Ease', icon: '❤️' },
      ],
      verdict: {
        title: 'Which is Right for You?',
        text: 'Neither is objectively better. B2B suits those who prefer deep relationships, complex problem-solving, and stable revenue. B2C suits those energized by rapid iteration, scale, and consumer psychology.',
        recommendation: 'Start with B2B if you want revenue stability. Start with B2C if you want rapid learning. Many great PMs eventually do both.'
      }
    }
  }
}

// Export for use in your lesson generation prompt builder
export { INTERACTIVE_BLOCK_EXAMPLES }
========================================
RETURN THIS JSON
========================================

{
  "hook": "",
  "whyItMatters": "",
  "learningObjectives": ["", "", ""],

  "mission": {
    "title": "",
    "objective": "",
    "estimatedTime": "${lessonNumber * 3 + 5} minutes"
  },

  "blocks": [

    {
      "type": "story",
      "title": "",
      "story": "",
      "takeaway": ""
    },

    {
      "type": "concept",
      "title": "",
      "content": ""
    },

    {
      "type": "visual",
      "title": "",
      "description": "",
      "diagram": {
        "layout": "vertical",
        "nodes": [
          { "id": "1", "title": "", "subtitle": "" }
        ],
        "connections": [
          { "from": "1", "to": "2" }
        ]
      }
    },

    {
      "type": "business_case",
      "title": "",
      "company": "",
      "scenario": "",
      "solution": "",
      "result": "",
      "metrics": [
        { "label": "", "value": "" }
      ]
    },

    {
      "type": "checkpoint",
      "question": "",
      "choices": ["", "", "", ""],
      "correctIndex": 0,
      "answer": ""
    },

    {
      "type": "exercise",
      "title": "",
      "instruction": "",
      "hints": ["", ""],
      "expectedOutcome": ""
    },

    {
      "type": "ai_prompt",
      "title": "",
      "description": "",
      "prompt": "",
      "variables": [""],
      "whyItWorks": ""
    },

    {
      "type": "interactive_story",
      "title": "",
      "scenes": [
        {
          "id": "s1",
          "text": "",
          "choices": [
            { "label": "", "next": "s2", "feedback": "" },
            { "label": "", "next": "s3", "feedback": "" }
          ]
        },
        {
          "id": "s2",
          "text": "",
          "choices": []
        },
        {
          "id": "s3",
          "text": "",
          "choices": []
        }
      ]
    },

    {
      "type": "scenario",
      "title": "",
      "setup": "",
      "role": "",
      "choices": [
        {
          "label": "",
          "outcome": "",
          "quality": "best"
        },
        {
          "label": "",
          "outcome": "",
          "quality": "good"
        },
        {
          "label": "",
          "outcome": "",
          "quality": "poor"
        }
      ]
    },

    {
      "type": "quick_fire",
      "title": "",
      "questions": [
        {
          "statement": "",
          "answer": true,
          "explanation": ""
        },
        {
          "statement": "",
          "answer": false,
          "explanation": ""
        }
      ]
    },

    {
      "type": "timeline",
      "title": "",
      "description": "",
      "events": [
        {
          "year": "",
          "title": "",
          "description": "",
          "impact": ""
        }
      ]
    },

    {
      "type": "process_flow",
      "title": "",
      "description": "",
      "steps": [
        {
          "number": 1,
          "title": "",
          "description": "",
          "detail": ""
        }
      ]
    },

    {
      "type": "comparison",
      "title": "",
      "description": "",
      "left": {
        "label": "",
        "color": "rose",
        "points": ["", ""]
      },
      "right": {
        "label": "",
        "color": "green",
        "points": ["", ""]
      },
      "verdict": ""
    }

  ],

  "keyTakeaways": ["", "", ""],

  "actionStep": {
    "title": "",
    "instruction": "",
    "whyNow": ""
  },

  "proTip": {
    "tip": "",
    "reason": ""
  },

  "encouragement": "",

  "summary": {
    "points": []
  },

  "challenge": {
    "title": "",
    "instruction": ""
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