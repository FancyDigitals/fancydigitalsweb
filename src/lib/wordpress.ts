const API = "https://portal.fancydigitals.com.ng/wp-json/wp/v2";

export async function getPortfolio() {
  const res = await fetch(`${API}/portfolio`, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}