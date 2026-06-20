import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const FREE_DAILY_LIMITS = {
  "ai-resume-builder": 3,
  "ai-cover-letter": 3,
  "ai-business-name": 5,
  "ai-bio-generator": 5,
  "ai-landing-page": 2,
  "default": 5,
};

// Anonymous users get 1 free per day per IP
const ANON_DAILY_LIMIT = 1;

export function getLimitForTool(toolSlug) {
  return FREE_DAILY_LIMITS[toolSlug] || FREE_DAILY_LIMITS.default;
}

// ============================================
// AUTHENTICATED USERS (logged in)
// ============================================
export async function checkUsage(toolSlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { allowed: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  if (profile.plan !== "free") return { allowed: true };

  const today = new Date().toISOString().split("T")[0];
  const limit = getLimitForTool(toolSlug);

  const { data } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("tool_slug", toolSlug)
    .eq("date", today)
    .maybeSingle();

  const currentCount = data?.count || 0;
  if (currentCount >= limit) return { allowed: false, remaining: 0 };
  return { allowed: true, remaining: limit - currentCount };
}

export async function incrementUsage(toolSlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];

  const { data } = await supabase
    .from("usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("tool_slug", toolSlug)
    .eq("date", today)
    .maybeSingle();

  if (data) {
    await supabase.from("usage").update({ count: data.count + 1 }).eq("id", data.id);
  } else {
    await supabase.from("usage").insert({
      user_id: user.id,
      tool_slug: toolSlug,
      count: 1,
      date: today,
    });
  }
}

export async function checkAndIncrementUsage(toolSlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { allowed: false, error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan !== "free";
  const today = new Date().toISOString().split("T")[0];
  const limit = getLimitForTool(toolSlug);

  const { data: usage } = await supabase
    .from("usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("tool_slug", toolSlug)
    .eq("date", today)
    .maybeSingle();

  const currentCount = usage?.count || 0;

  if (!isPro && currentCount >= limit) {
    return {
      allowed: false,
      error: `Daily limit reached (${limit}/day on Free plan). Upgrade to Pro for unlimited access.`,
      limit,
      used: currentCount,
    };
  }

  if (usage) {
    await supabase.from("usage").update({ count: currentCount + 1 }).eq("id", usage.id);
  } else {
    await supabase.from("usage").insert({
      user_id: user.id,
      tool_slug: toolSlug,
      count: 1,
      date: today,
    });
  }

  return {
    allowed: true,
    used: currentCount + 1,
    limit: isPro ? null : limit,
    userId: user.id,
    isPro,
  };
}

export async function getTodayUsage(toolSlug) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("usage")
    .select("count")
    .eq("user_id", user.id)
    .eq("tool_slug", toolSlug)
    .eq("date", today)
    .maybeSingle();
  return data?.count || 0;
}

// ============================================
// ANONYMOUS USERS (no login) — rate-limited by IP
// ============================================
export async function checkAnonymousUsage(toolSlug, ipAddress) {
  if (!ipAddress) {
    return { allowed: false, error: "Cannot identify request" };
  }

  // Use service role to bypass RLS for anonymous tracking
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const today = new Date().toISOString().split("T")[0];
  const ipKey = `${ipAddress}_${toolSlug}_${today}`;

  // Check usage from anonymous_usage table
  const { data: existing } = await supabaseAdmin
    .from("anonymous_usage")
    .select("*")
    .eq("ip_key", ipKey)
    .maybeSingle();

  const currentCount = existing?.count || 0;

  if (currentCount >= ANON_DAILY_LIMIT) {
    return {
      allowed: false,
      error: `You've used your free generation today. Sign up free to get 3 per day, or upgrade to Pro for unlimited.`,
      requiresSignup: true,
      used: currentCount,
      limit: ANON_DAILY_LIMIT,
    };
  }

  // Increment
  if (existing) {
    await supabaseAdmin
      .from("anonymous_usage")
      .update({ count: currentCount + 1 })
      .eq("ip_key", ipKey);
  } else {
    await supabaseAdmin.from("anonymous_usage").insert({
      ip_key: ipKey,
      ip_address: ipAddress,
      tool_slug: toolSlug,
      date: today,
      count: 1,
    });
  }

  return {
    allowed: true,
    used: currentCount + 1,
    limit: ANON_DAILY_LIMIT,
    isAnonymous: true,
  };
}