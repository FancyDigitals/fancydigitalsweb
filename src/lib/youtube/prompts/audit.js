/**
 * Build the audit prompt. Feeds channel + metrics to Claude,
 * gets back a structured JSON report.
 */
export function buildAuditPrompt({ channel, videos }) {
  const m = channel.metrics;

  const topVideosText = m.topVideos
    ?.map(
      (v, i) =>
        `  ${i + 1}. "${v.title}" · ${v.views.toLocaleString()} views · ${v.likes.toLocaleString()} likes`
    )
    .join("\n") || "None";

  const worstVideosText = m.worstVideos
    ?.map(
      (v, i) =>
        `  ${i + 1}. "${v.title}" · ${v.views.toLocaleString()} views`
    )
    .join("\n") || "None";

  const recentTitles = (videos || [])
    .slice(0, 20)
    .map((v, i) => `  ${i + 1}. "${v.title}"`)
    .join("\n");

  return `
You are a senior YouTube growth strategist. You've helped 500+ channels reach monetization and 100+ channels cross 100K subs.

You are auditing this channel. Return a structured JSON report with real, specific, actionable insights — never generic advice.

============================================
CHANNEL DATA
============================================

Name: ${channel.title}
Handle: ${channel.customUrl || "N/A"}
Country: ${channel.country || "Unknown"}
Channel age: ${m.channelAgeYears} years
Description: ${channel.description?.slice(0, 400) || "None"}
Topics: ${channel.topics?.slice(-3).map(t => t.split("/").pop()).join(", ") || "Unknown"}

Subscribers: ${channel.subscribers.toLocaleString()}
Total video views (lifetime): ${channel.totalViews.toLocaleString()}
Total videos published: ${channel.videoCount}

============================================
RECENT PERFORMANCE (last ${videos?.length || 0} videos)
============================================

Average views per video: ${m.avgViews?.toLocaleString()}
Average likes per video: ${m.avgLikes?.toLocaleString()}
Average comments per video: ${m.avgComments?.toLocaleString()}
Average video length: ${m.avgDurationFormatted}
View-to-subscriber ratio: ${m.viewToSubRatio?.toFixed(2)} (${
    m.viewToSubRatio > 0.1 ? "healthy" : m.viewToSubRatio > 0.05 ? "average" : "weak"
  })
Like ratio: ${m.likeRatio?.toFixed(2)}% (${
    m.likeRatio > 5 ? "great" : m.likeRatio > 2 ? "average" : "low"
  })
Comment ratio: ${m.commentRatio?.toFixed(3)}%

Upload cadence: ${m.uploadsPerMonth} videos/month
Days since last upload: ${Math.round(m.daysSinceLatest || 0)}

============================================
MONETIZATION STATUS
============================================

Monetizable: ${m.monetization.monetizable ? "YES" : "NO"}
Subscriber progress: ${m.monetization.subsProgress.toFixed(1)}% (${channel.subscribers}/1,000)
Watch hours progress: ${m.monetization.watchProgress.toFixed(1)}% (est. ${m.estimatedWatchHours.toLocaleString()}/4,000)
Estimated ETA to monetization: ${m.monetization.eta}

============================================
CONTENT HEALTH
============================================

Title patterns:
- Average title length: ${m.titleAnalysis.avgLength} chars (${
    m.titleAnalysis.tooShort ? "TOO SHORT" : m.titleAnalysis.tooLong ? "TOO LONG" : "healthy"
  })
- Uses numbers: ${m.titleAnalysis.usesNumbers}
- Uses questions: ${m.titleAnalysis.usesQuestions}
- Uses brackets [/()]: ${m.titleAnalysis.usesBrackets}
- Overuses ALL CAPS: ${m.titleAnalysis.overusesCaps ? "YES (bad)" : "no"}

Descriptions:
- Average length: ${m.descriptionAnalysis.avgLength} chars (${
    m.descriptionAnalysis.tooShort ? "TOO SHORT — kills SEO" : "adequate"
  })
- Empty/thin: ${m.descriptionAnalysis.empty}
- Has links: ${m.descriptionAnalysis.hasLinks}
- Has timestamps: ${m.descriptionAnalysis.hasTimestamps}

Tags:
- Average per video: ${m.tagAnalysis.avgTags} (${
    m.tagAnalysis.underused ? "UNDERUSED" : "healthy"
  })
- Videos with zero tags: ${m.tagAnalysis.withoutTags}

============================================
TOP 5 PERFORMERS
============================================
${topVideosText}

============================================
BOTTOM 5 PERFORMERS
============================================
${worstVideosText}

============================================
RECENT 20 TITLES
============================================
${recentTitles}

============================================
OUTPUT — STRICT JSON
============================================

Return ONLY this JSON structure. No markdown. No commentary. Every field must be filled with SPECIFIC insight based on the data above — never generic.

{
  "overallScore": 0-100,
  "scoreBreakdown": {
    "contentQuality": 0-100,
    "seoHealth": 0-100,
    "engagement": 0-100,
    "consistency": 0-100,
    "monetizationReadiness": 0-100
  },
  "headline": "One-sentence blunt verdict of this channel's current state (e.g. 'A promising tech channel stuck in the sub-1K plateau because uploads dropped from weekly to monthly.')",
  "summary": "3-4 sentence executive summary. Direct. What's working, what's not, biggest opportunity.",

  "strengths": [
    "Specific strength 1 (reference actual data)",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "weaknesses": [
    "Specific weakness 1 (reference actual data)",
    "Specific weakness 2",
    "Specific weakness 3",
    "Specific weakness 4"
  ],
  "redFlags": [
    "Critical issue 1 that's actively hurting growth",
    "Critical issue 2"
  ],

  "monetizationPlan": {
    "currentStatus": "Not eligible | Nearly there | Eligible",
    "gapAnalysis": "One paragraph explaining exactly what's blocking monetization and the fastest path to close it",
    "monthsToGoal": "Realistic estimate with reasoning"
  },

  "actionPlan": [
    { "priority": "critical", "action": "Do X specifically", "why": "Because Y", "impact": "Expected impact" },
    { "priority": "critical", "action": "...", "why": "...", "impact": "..." },
    { "priority": "high", "action": "...", "why": "...", "impact": "..." },
    { "priority": "high", "action": "...", "why": "...", "impact": "..." },
    { "priority": "high", "action": "...", "why": "...", "impact": "..." },
    { "priority": "medium", "action": "...", "why": "...", "impact": "..." },
    { "priority": "medium", "action": "...", "why": "...", "impact": "..." },
    { "priority": "medium", "action": "...", "why": "...", "impact": "..." },
    { "priority": "low", "action": "...", "why": "...", "impact": "..." },
    { "priority": "low", "action": "...", "why": "...", "impact": "..." }
  ],

  "contentStrategy": {
    "niche": "What niche this channel is actually in (based on titles + topics)",
    "sweetSpot": "The type of video this channel does BEST — reference top performers",
    "avoid": "Types of videos that consistently underperform for this channel",
    "nextVideoIdeas": [
      "Specific video idea 1 (title-ready)",
      "Specific video idea 2",
      "Specific video idea 3",
      "Specific video idea 4",
      "Specific video idea 5"
    ]
  },

  "seoUpgrades": {
    "titleFixes": "Specific advice for this channel's title style",
    "descriptionFixes": "Specific advice based on their current descriptions",
    "tagFixes": "Specific advice based on tag usage",
    "thumbnailAdvice": "General thumbnail advice (we don't see thumbnails yet)"
  },

  "uploadCadenceAdvice": "Specific advice on upload frequency for this channel's current stage",

  "nextMilestone": {
    "target": "Next realistic milestone (e.g. '1,000 subscribers', '10K subs', 'Monetization')",
    "howToReach": "Concrete path to reach it",
    "estimatedTimeframe": "Realistic timeframe"
  }
}

Rules:
- NO generic advice. Every insight must reference specific data from above.
- Score honestly. If the channel is weak, say so.
- If a top performer exists, tell them to make more like it — reference by name.
- Action plan must have 10 items, prioritized correctly.
- Return valid JSON only. No fences.
`;
}