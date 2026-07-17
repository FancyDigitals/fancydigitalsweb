import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, title, documentType, theme, inputData, slides, emailBody, logo, logoPosition } = body;

    if (!title || !documentType || !slides?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Merge logo + logoPosition into input_data so they persist
    const mergedInputData = {
      ...(inputData || {}),
      ...(logo !== undefined ? { logo } : {}),
      ...(logoPosition !== undefined ? { logoPosition } : {}),
    };

    // ── Upsert (update if id provided, insert if new) ──
    let result;

    if (id) {
      const { data, error } = await supabase
        .from("pitch_decks")
        .update({
          title,
          document_type: documentType,
          theme,
          input_data: mergedInputData,
          slides,
          email_body: emailBody || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from("pitch_decks")
        .insert({
          user_id: user.id,
          title,
          document_type: documentType,
          theme,
          input_data: mergedInputData,
          slides,
          email_body: emailBody || null,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, deck: result });
  } catch (error) {
    console.error("[pitch-deck/save]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}