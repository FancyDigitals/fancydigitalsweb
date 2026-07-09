import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.email !== "fancydigitalsng@gmail.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const lessonId = formData.get("lessonId");

    if (!file || !lessonId) {
      return NextResponse.json({ error: "File and lessonId required" }, { status: 400 });
    }

    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const ext = file.name.split(".").pop();
    const fileName = `${lessonId}-${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await admin.storage
      .from("academy-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = admin.storage
      .from("academy-images")
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: urlData.publicUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}