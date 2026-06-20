import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get IP from request headers (Vercel provides these)
    const country = request.headers.get("x-vercel-ip-country") 
      || request.headers.get("cf-ipcountry") 
      || null;

    if (country) {
      return NextResponse.json({ country });
    }

    // Fallback: free IP geolocation
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || request.headers.get("x-real-ip");

    if (ip) {
      try {
        const res = await fetch(`https://ipapi.co/${ip}/country/`, {
          headers: { "User-Agent": "FancyDigitals/1.0" },
          next: { revalidate: 3600 },
        });
        if (res.ok) {
          const detectedCountry = (await res.text()).trim();
          if (detectedCountry && detectedCountry.length === 2) {
            return NextResponse.json({ country: detectedCountry });
          }
        }
      } catch (e) {
        console.warn("IP geolocation failed:", e);
      }
    }

    return NextResponse.json({ country: "US" });
  } catch (error) {
    return NextResponse.json({ country: "US" });
  }
}