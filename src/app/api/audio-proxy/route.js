import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  // Allowlist trusted CDNs
  const allowed = [
  "cdn.pixabay.com",
  "pixabay.com",
  "assets.mixkit.co",
  "mixkit.co",
  "freesound.org",
];

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!allowed.some((host) => parsed.hostname.endsWith(host))) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(url, {
      headers: {
        // Present as a real browser — Pixabay CDN allows these
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://pixabay.com/",
      },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
        "Content-Length": String(buffer.byteLength),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[audio-proxy]", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}