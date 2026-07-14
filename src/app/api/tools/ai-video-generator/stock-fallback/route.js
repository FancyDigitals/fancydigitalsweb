import { NextResponse } from "next/server";
import { searchStockMedia } from "@/lib/video-ai/stock";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { queries } = await req.json();
    if (!Array.isArray(queries) || queries.length === 0) {
      return NextResponse.json({ url: null });
    }

    const url = await searchStockMedia(queries);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[stock-fallback]", err);
    return NextResponse.json({ url: null }, { status: 500 });
  }
}