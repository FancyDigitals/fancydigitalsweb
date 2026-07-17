import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated." },
        { status: 401 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const {
      id,
      title,
      sequenceType,
      tone,
      audience,
      inputData,
      emails,
      strategyNotes,
    } = body;

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { success: false, error: "Emails are required." },
        { status: 400 }
      );
    }

    const payload = {
      user_id: user.id,
      title: title || "Untitled Sequence",
      sequence_type: sequenceType || "Cold Outreach",
      tone: tone || null,
      audience: audience || null,
      input_data: inputData || {},
      emails: emails,
      strategy_notes: strategyNotes || null,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (id) {
      const { data, error } = await supabase
        .from("email_sequences")
        .update(payload)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from("email_sequences")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, sequence: result });
  } catch (error) {
    console.error("[email-sequence/save]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}