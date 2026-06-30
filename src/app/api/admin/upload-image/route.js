import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export async function POST(req) {
  try {
    // Auth check
    const supabaseAuth = await createClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, only admin can upload (we'll expand for writers later)
    if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large. Max 5MB." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      return Response.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const path = `uploads/${filename}`;

    // Upload to Supabase Storage
    const supabase = createAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("content-images")
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return Response.json({ error: "Upload failed" }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("content-images")
      .getPublicUrl(path);

    return Response.json({ url: publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}