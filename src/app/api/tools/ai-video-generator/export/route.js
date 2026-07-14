import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// Allow large project payloads (uploaded voiceovers, etc.)
export const fetchCache = "force-no-store";

const FORMATS = {
  "mp4-vertical": { width: 1080, height: 1920, codec: "h264", ext: "mp4" },
  "mp4-landscape": { width: 1920, height: 1080, codec: "h264", ext: "mp4" },
  "mp4-square": { width: 1080, height: 1080, codec: "h264", ext: "mp4" },
  gif: { width: 720, height: 1280, codec: "gif", ext: "gif" },
};

const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

/**
 * Rewrite any relative /api/audio-proxy URLs into absolute ones
 * pointing at the current dev/production origin, so headless Chrome
 * can fetch them during export.
 */
function absolutizeProject(project, origin) {
  if (!project || !origin) return project;

  const patch = (url) => {
    if (typeof url !== "string") return url;

    // Any relative path → absolute
    if (url.startsWith("/")) return `${origin}${url}`;

    return url;
  };

  // If old project references an external CDN music track, drop it entirely
  // so export doesn't fail on a URL that no longer works
  const isDeadExternalMusic = (url) => {
    if (typeof url !== "string") return false;
    return (
      url.includes("cdn.pixabay.com") ||
      url.includes("pixabay.com/audio") ||
      url.includes("assets.mixkit.co") ||
      url.includes("mixkit.co")
    );
  };

  const next = { ...project };

  if (next.music?.url) {
    if (isDeadExternalMusic(next.music.url)) {
      console.warn(
        "[export] Dropping legacy external music URL:",
        next.music.url
      );
      next.music = null;
    } else {
      next.music = { ...next.music, url: patch(next.music.url) };
    }
  }

  if (Array.isArray(next.scenes)) {
    next.scenes = next.scenes.map((s) => ({
      ...s,
      mediaUrl: patch(s.mediaUrl),
    }));
  }

  return next;
}

export async function POST(req) {
  try {
    const { project, format = "mp4-vertical" } = await req.json();

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Missing project" },
        { status: 400 }
      );
    }

    const config = FORMATS[format];
    if (!config) {
      return NextResponse.json(
        { success: false, error: `Unknown format: ${format}` },
        { status: 400 }
      );
    }

    // Derive the absolute origin so audio/media proxied via /api/... works
    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      `http://localhost:${process.env.PORT || 3000}`;

    const absoluteProject = absolutizeProject(project, origin);

    const timestamp = Date.now();
    const propsPath = path.join(os.tmpdir(), `fd-props-${timestamp}.json`);
    const outputPath = path.join(
      os.tmpdir(),
      `fd-video-${timestamp}.${config.ext}`
    );

    fs.writeFileSync(
      propsPath,
      JSON.stringify({ project: absoluteProject })
    );

    const entry = path.join(process.cwd(), "src", "remotion", "index.jsx");

    const args = [
      "remotion",
      "render",
      entry,
      "FancyDigitalsVideo",
      `"${outputPath}"`,
      `--props="${propsPath}"`,
      `--codec=${config.codec}`,
      `--width=${config.width}`,
      `--height=${config.height}`,
      `--browser-executable="${CHROME_PATH}"`,
      "--timeout=120000",
      "--log=error",
    ];

    await new Promise((resolve, reject) => {
      const proc = spawn("npx", args, {
        shell: true,
        cwd: process.cwd(),
      });

      let stderr = "";
      let stdout = "";

      proc.stdout.on("data", (d) => {
        stdout += d.toString();
      });

      proc.stderr.on("data", (d) => {
        stderr += d.toString();
      });

      proc.on("close", (code) => {
        if (code === 0) resolve();
        else
          reject(
            new Error(
              stderr || stdout || `Render exited with code ${code}`
            )
          );
      });
    });

    const fileBuffer = fs.readFileSync(outputPath);
    fs.unlinkSync(outputPath);
    fs.unlinkSync(propsPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": config.ext === "gif" ? "image/gif" : "video/mp4",
        "Content-Disposition": `attachment; filename="fancy-digitals-${timestamp}.${config.ext}"`,
      },
    });
  } catch (error) {
    console.error("[export]", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}