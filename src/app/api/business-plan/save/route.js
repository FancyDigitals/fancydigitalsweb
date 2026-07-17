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
      industry,
      planType,
      inputData,
      sections,
      executiveSummary,
    } = body;

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, error: "Sections are required." },
        { status: 400 }
      );
    }

    const payload = {
      user_id: user.id,
      title: title || "Untitled Business Plan",
      industry: industry || null,
      document_type: planType || "Full Business Plan",
      input_data: inputData || {},
      sections: sections,
      executive_summary: executiveSummary || null,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (id) {
      // Update existing
      const { data, error } = await supabase
        .from("business_plans")
        .update(payload)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("business_plans")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, plan: result });
  } catch (error) {
    console.error("[business-plan/save]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}