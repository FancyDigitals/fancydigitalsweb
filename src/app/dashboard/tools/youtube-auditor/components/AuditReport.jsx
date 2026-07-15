"use client";

export default function AuditReport({ result }) {
  const { channel, insights } = result;
  const m = channel.metrics;

  return (
    <div className="space-y-6">
      {/* ===== CHANNEL HEADER ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start gap-4">
          {channel.thumbnail && (
            <img
              src={channel.thumbnail}
              alt={channel.title}
              className="w-16 h-16 rounded-full border-2 border-gray-100"
            />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900">
              {channel.title}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {channel.customUrl || channel.country || ""} · Since{" "}
              {new Date(channel.publishedAt).getFullYear()}
            </p>
            {insights?.headline && (
              <p className="mt-3 text-sm text-gray-700 font-medium leading-relaxed">
                {insights.headline}
              </p>
            )}
          </div>
          {insights?.overallScore != null && (
            <ScoreDisplay score={insights.overallScore} />
          )}
        </div>
      </div>

      {/* ===== KEY METRICS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Subscribers"
          value={fmt(channel.subscribers)}
          hint={channel.subscribers >= 1000 ? "Monetization eligible ✓" : `${1000 - channel.subscribers} to go`}
        />
        <MetricCard
          label="Total views"
          value={fmt(channel.totalViews)}
          hint={`${channel.videoCount} videos`}
        />
        <MetricCard
          label="Avg views"
          value={fmt(m.avgViews)}
          hint={`View/sub: ${m.viewToSubRatio?.toFixed(2)}`}
        />
        <MetricCard
          label="Uploads/mo"
          value={m.uploadsPerMonth}
          hint={`${Math.round(m.daysSinceLatest || 0)} days since last`}
        />
      </div>

      {/* ===== MONETIZATION PROGRESS ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Monetization Progress
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <ProgressRing
            label="Subscribers"
            current={channel.subscribers}
            target={m.monetization.subsThreshold}
            progress={m.monetization.subsProgress}
          />
          <ProgressRing
            label="Watch hours (est)"
            current={m.estimatedWatchHours}
            target={m.monetization.watchThreshold}
            progress={m.monetization.watchProgress}
          />
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">
            ETA to monetization
          </div>
          <div className="text-lg font-bold text-gray-900">
            {m.monetization.eta}
          </div>
        </div>
      </div>

      {/* ===== SCORE BREAKDOWN ===== */}
      {insights?.scoreBreakdown && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Score Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(insights.scoreBreakdown).map(([k, v]) => (
              <ScoreBar key={k} label={humanize(k)} value={v} />
            ))}
          </div>
        </div>
      )}

      {/* ===== SUMMARY ===== */}
      {insights?.summary && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
            Executive Summary
          </div>
          <p className="text-gray-800 leading-relaxed">{insights.summary}</p>
        </div>
      )}

      {/* ===== STRENGTHS / WEAKNESSES / RED FLAGS ===== */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ListCard
            title="Strengths"
            items={insights.strengths}
            color="green"
            icon="✓"
          />
          <ListCard
            title="Weaknesses"
            items={insights.weaknesses}
            color="amber"
            icon="⚠"
          />
          <ListCard
            title="Red Flags"
            items={insights.redFlags}
            color="red"
            icon="✕"
          />
        </div>
      )}

      {/* ===== ACTION PLAN ===== */}
      {insights?.actionPlan?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Prioritized Action Plan
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Do these in order. Top items have the highest impact.
          </p>
          <div className="space-y-3">
            {insights.actionPlan.map((item, i) => (
              <ActionCard key={i} item={item} index={i + 1} />
            ))}
          </div>
        </div>
      )}

      {/* ===== CONTENT STRATEGY ===== */}
      {insights?.contentStrategy && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Content Strategy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StrategyBlock
              label="Your niche"
              value={insights.contentStrategy.niche}
            />
            <StrategyBlock
              label="Sweet spot"
              value={insights.contentStrategy.sweetSpot}
            />
            <StrategyBlock
              label="What works"
              value={insights.contentStrategy.sweetSpot}
              hidden
            />
            <StrategyBlock
              label="Avoid"
              value={insights.contentStrategy.avoid}
            />
          </div>

          {insights.contentStrategy.nextVideoIdeas?.length > 0 && (
            <>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                Video Ideas to Ship Next
              </div>
              <div className="space-y-2">
                {insights.contentStrategy.nextVideoIdeas.map((idea, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="text-sm text-gray-800 font-medium">
                      {idea}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ===== TOP PERFORMERS ===== */}
      {m.topVideos?.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top 5 Performers
          </h3>
          <div className="space-y-2">
            {m.topVideos.map((v, i) => (
              <VideoRow key={v.id} video={v} rank={i + 1} />
            ))}
          </div>
        </div>
      )}

      {/* ===== SEO UPGRADES ===== */}
      {insights?.seoUpgrades && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            SEO Upgrades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(insights.seoUpgrades).map(([k, v]) => (
              <div key={k} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {humanize(k)}
                </div>
                <div className="text-sm text-gray-800 leading-relaxed">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== NEXT MILESTONE ===== */}
      {insights?.nextMilestone && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
          <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
            Next Milestone
          </div>
          <div className="text-2xl font-bold mb-3">
            {insights.nextMilestone.target}
          </div>
          <p className="text-sm text-white/80 leading-relaxed mb-3">
            {insights.nextMilestone.howToReach}
          </p>
          <div className="text-xs text-white/60">
            Estimated timeframe: {insights.nextMilestone.estimatedTimeframe}
          </div>
        </div>
      )}
    </div>
  );
}

// ================ SUB-COMPONENTS ================

function fmt(n) {
  if (!n) return "0";
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function humanize(k) {
  return k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim();
}

function ScoreDisplay({ score }) {
  const color =
    score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600";
  const bg =
    score >= 80 ? "bg-green-50" : score >= 60 ? "bg-amber-50" : "bg-red-50";
  return (
    <div className={`flex-shrink-0 ${bg} rounded-2xl px-4 py-3 text-center`}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
        Score
      </div>
      <div className={`text-3xl font-black ${color}`}>{score}</div>
    </div>
  );
}

function MetricCard({ label, value, hint }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}

function ProgressRing({ label, current, target, progress }) {
  const clamped = Math.min(100, progress);
  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#f3f4f6"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#dc2626"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - clamped / 100)}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl font-black text-gray-900">
            {Math.round(clamped)}%
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </div>
      <div className="text-sm text-gray-700 mt-1">
        {fmt(current)} / {fmt(target)}
      </div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  const color =
    value >= 80 ? "bg-green-500" : value >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold text-gray-700">{label}</div>
        <div className="text-xs font-bold text-gray-900">{value}</div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ListCard({ title, items, color, icon }) {
  if (!items?.length) return null;
  const styles = {
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    red: "bg-red-50 border-red-200 text-red-900",
  };
  return (
    <div className={`rounded-2xl border p-5 ${styles[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h4 className="font-bold">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed flex items-start gap-2">
            <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-current opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionCard({ item, index }) {
  const priorityStyle = {
    critical: { bg: "bg-red-100", text: "text-red-700", label: "CRITICAL" },
    high: { bg: "bg-amber-100", text: "text-amber-700", label: "HIGH" },
    medium: { bg: "bg-blue-100", text: "text-blue-700", label: "MEDIUM" },
    low: { bg: "bg-gray-100", text: "text-gray-700", label: "LOW" },
  }[item.priority] || { bg: "bg-gray-100", text: "text-gray-700", label: "TASK" };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-sm text-gray-700">
        {index}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}
          >
            {priorityStyle.label}
          </span>
        </div>
        <div className="font-bold text-gray-900 text-sm mb-1">
          {item.action}
        </div>
        <div className="text-xs text-gray-600 mb-1">
          <strong>Why:</strong> {item.why}
        </div>
        <div className="text-xs text-green-700">
          <strong>Impact:</strong> {item.impact}
        </div>
      </div>
    </div>
  );
}

function StrategyBlock({ label, value, hidden }) {
  if (hidden) return null;
  return (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </div>
      <div className="text-sm text-gray-800 leading-relaxed">{value}</div>
    </div>
  );
}

function VideoRow({ video, rank }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition"
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
        {rank}
      </div>
      {video.thumbnail && (
        <img
          src={video.thumbnail}
          alt=""
          className="w-24 h-14 rounded object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 truncate">
          {video.title}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {fmt(video.views)} views · {fmt(video.likes)} likes
        </div>
      </div>
    </a>
  );
}