const API = "https://portal.fancydigitals.com.ng/wp-json/wp/v2";

export async function getPortfolio() {
  try {
    const res = await fetch(
      `${API}/portfolio?_embed&acf_format=standard`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      console.warn(`Portfolio fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn("Portfolio endpoint returned non-JSON response");
      return [];
    }

    return res.json();
  } catch (err) {
    console.warn("Portfolio fetch error:", err);
    return [];
  }
}