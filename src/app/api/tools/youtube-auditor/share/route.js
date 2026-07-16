import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateId() {
  return (
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8)
  );
}

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { channelUrl, data } = body;

    if (!channelUrl || !data) {
      return NextResponse.json(
        { success: false, error: "Missing data" },
        { status: 400 }
      );
    }

    const id = generateId();

    const { error } = await supabase.from("shared_audits").insert({
      id,
      user_id: user.id,
      channel_url: channelUrl,
      channel_title: data.channel?.title || "YouTube Channel",
      data,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      id,
      url: `/audit/${id}`,
    });
  } catch (err) {
    console.error("[share]", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}