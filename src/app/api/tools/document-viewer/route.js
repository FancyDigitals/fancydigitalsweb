import { NextResponse } from "next/server";
import { checkAndIncrementUsage } from "@/lib/usage";

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.action !== "increment") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const usage = await checkAndIncrementUsage("document-viewer");

    if (!usage.allowed) {
      return NextResponse.json(
        { error: usage.error, limit: usage.limit, used: usage.used },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      usage: { used: usage.used, limit: usage.limit, isPro: usage.isPro },
    });
  } catch (error) {
    console.error("Document viewer usage error:", error);
    return NextResponse.json(
      { error: error.message || "Failed" },
      { status: 500 }
    );
  }
}