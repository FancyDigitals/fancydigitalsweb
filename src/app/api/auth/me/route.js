import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPro } from "@/lib/pricing";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ isPro: false, plan: "free" });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    const plan = profile?.plan || "free";

    return NextResponse.json({
      isPro: isPro(plan),
      plan,
    });
  } catch {
    return NextResponse.json({ isPro: false, plan: "free" });
  }
}