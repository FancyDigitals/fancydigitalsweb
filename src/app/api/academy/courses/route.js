import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "fancydigitalsng@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: courses } = await admin
      .from("academy_courses")
      .select("*")
      .order("order_index");

    return NextResponse.json({ success: true, courses: courses || [] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}