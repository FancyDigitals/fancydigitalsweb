import { GoogleAuth } from "google-auth-library";

let cachedAuth = null;

function getAuth() {
  if (cachedAuth) return cachedAuth;

  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Google Indexing API credentials not configured");
  }

  cachedAuth = new GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });

  return cachedAuth;
}

/**
 * Notify Google about a URL update or new URL
 * @param {string} url - Full URL to index
 * @param {"URL_UPDATED" | "URL_DELETED"} type - Notification type
 */
export async function notifyGoogleIndexing(url, type = "URL_UPDATED") {
  try {
    const auth = getAuth();
    const client = await auth.getClient();

    const response = await client.request({
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      data: {
        url,
        type, // URL_UPDATED or URL_DELETED
      },
    });

    return {
      success: true,
      url,
      notifyTime: response.data?.urlNotificationMetadata?.latestUpdate?.notifyTime,
    };
  } catch (error) {
    console.error("Google Indexing API error:", error.message);
    return {
      success: false,
      url,
      error: error.message,
    };
  }
}

/**
 * Notify Google about multiple URLs (batch)
 * Google allows 200 requests/day on free tier
 */
export async function notifyGoogleIndexingBatch(urls, type = "URL_UPDATED") {
  const results = [];

  for (const url of urls) {
    const result = await notifyGoogleIndexing(url, type);
    results.push(result);
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 100));
  }

  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  return {
    total: urls.length,
    successful,
    failed,
    results,
  };
}