const API = "https://portal.fancydigitals.com.ng/wp-json/wp/v2";

export async function getPortfolio() {
  try {
    const res = await fetch(
      `${API}/portfolio?_embed&acf_format=standard`,
      {
        next: { revalidate: 60 },
        headers: {
          "Accept": "application/json",
        },
      }
    );

    if (!res.ok) {
      console.warn(`Portfolio fetch failed: ${res.status} ${res.statusText}`);
      return getFallbackPortfolio();
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn("Portfolio endpoint returned non-JSON response");
      return getFallbackPortfolio();
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return getFallbackPortfolio();
    }

    return data;
  } catch (err) {
    console.warn("Portfolio fetch error:", err);
    return getFallbackPortfolio();
  }
}

function getFallbackPortfolio() {
  return [
    {
      id: 1,
      slug: "todma-brand-identity",
      title: { rendered: "TODMA Brand Identity" },
      excerpt: { rendered: "A complete brand identity system including logo design, color palette, typography and brand guidelines." },
      _embedded: {
        "wp:featuredmedia": [{ source_url: "/portfolio/branding.png" }],
        "wp:term": [[{ name: "Branding", taxonomy: "category" }]],
      },
    },
    {
      id: 2,
      slug: "feast-basket-ecommerce",
      title: { rendered: "FeastBasket E-commerce" },
      excerpt: { rendered: "A full-featured e-commerce platform for food delivery with real-time ordering and payment integration." },
      _embedded: {
        "wp:featuredmedia": [{ source_url: "/portfolio/ecommerce.png" }],
        "wp:term": [[{ name: "E-commerce", taxonomy: "category" }]],
      },
    },
    {
      id: 3,
      slug: "sibgahtullah",
      title: { rendered: "Sibgahtullah Islamic Platform" },
      excerpt: { rendered: "A modern Islamic education and community platform featuring lectures, events, and sponsorship management." },
      _embedded: {
        "wp:featuredmedia": [{ source_url: "/portfolio/seo.png" }],
        "wp:term": [[{ name: "Web Development", taxonomy: "category" }]],
      },
    },
  ];
}