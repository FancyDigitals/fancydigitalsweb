import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      title,
      business_name,
      tagline,
      industry,
      style,
      personality,
      audience,
      input_data,
      kit_data,
    } = body;

    if (!kit_data) {
      return NextResponse.json(
        { error: "Brand kit data is required" },
        { status: 400 }
      );
    }

    const record = {
      user_id: user.id,
      title: title || `${business_name || "Brand Kit"}`,
      business_name: business_name || "",
      tagline: tagline || "",
      industry: industry || "",
      style: style || "",
      personality: personality || {},
      audience: audience || "",
      input_data: input_data || {},
      kit_data: kit_data,
      updated_at: new Date().toISOString(),
    };

    let data, error;

    if (id) {
      const result = await supabase
        .from("brand_kits")
        .update(record)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();
      data = result.data;
      error = result.error;
    } else {
      const result = await supabase
        .from("brand_kits")
        .insert(record)
        .select()
        .single();
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error("Save error:", error);
      return NextResponse.json(
        { error: "Failed to save brand kit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Save route error:", error);
    return NextResponse.json(
      { error: "Failed to save brand kit" },
      { status: 500 }
    );
  }
}