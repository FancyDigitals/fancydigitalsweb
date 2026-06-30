import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    const supabaseAuth = await createClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      return Response.json({ error: `Invalid file type: ${file.type}` }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `uploads/${filename}`;

    const supabase = createAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("content-images")
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      console.error("=== SUPABASE UPLOAD ERROR ===");
      console.error("Message:", uploadError.message);
      console.error("Name:", uploadError.name);
      console.error("Full:", JSON.stringify(uploadError, null, 2));
      return Response.json({
        error: `Storage: ${uploadError.message}`,
        details: uploadError
      }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from("content-images")
      .getPublicUrl(path);

    return Response.json({ url: publicUrl, path: uploadData?.path });
  } catch (err) {
    console.error("=== UPLOAD CRASH ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    return Response.json({
      error: err.message || "Server error",
    }, { status: 500 });
  }
}