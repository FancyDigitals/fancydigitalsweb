import { createClient } from "@/lib/supabase/server";
import { notifyGoogleIndexing, notifyGoogleIndexingBatch } from "@/lib/google-indexing";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return null;
  }
  return user;
}

export async function POST(req) {
  const user = await checkAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { url, urls, type = "URL_UPDATED" } = await req.json();

    // Single URL
    if (url) {
      const result = await notifyGoogleIndexing(url, type);
      return Response.json(result);
    }

    // Batch URLs
    if (urls && Array.isArray(urls) && urls.length > 0) {
      const result = await notifyGoogleIndexingBatch(urls, type);
      return Response.json(result);
    }

    return Response.json({ error: "Provide url or urls array" }, { status: 400 });
  } catch (err) {
    console.error("Indexing API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}