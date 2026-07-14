import { NextResponse } from "next/server";

import { generateVideoProject } from "@/lib/video-ai/project";

import { renderProject } from "@/remotion/render/renderVideo";

export async function POST(req) {
  try {
    const body = await req.json();

    const project =
      await generateVideoProject(body);

    const file =
      await renderProject(project);

    return NextResponse.json({
      success: true,
      file,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}