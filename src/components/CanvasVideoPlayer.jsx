"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Download, Loader2, FileVideo } from "lucide-react";
import { CanvasEngine } from "@/lib/video/canvas-engine";
import { getRenderer } from "@/lib/video/templates";

export default function CanvasVideoPlayer({
  scenes = [],
  brandColor = "#075a01",
  contentStyle = "image-text",
  backgroundStyle = "gradient",
  logoUrl = null,
  aspectRatio = "9:16",
  template = "modern",
  autoPlay = true,
}) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const ffmpegRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadError, setDownloadError] = useState("");

  const [converting, setConverting] = useState(false);
  const [convertProgress, setConvertProgress] = useState(0);
  const [ffmpegLoading, setFfmpegLoading] = useState(false);

  const dimensions = {
    "9:16": { width: 1080, height: 1920 },
    "16:9": { width: 1920, height: 1080 },
    "1:1": { width: 1080, height: 1080 },
  };
  const { width, height } = dimensions[aspectRatio] || dimensions["9:16"];

  useEffect(() => {
    if (!canvasRef.current || scenes.length === 0) return;

    const engine = new CanvasEngine(canvasRef.current, {
      width,
      height,
      fps: 30,
      brandColor,
      contentStyle,
      backgroundStyle,
      logoUrl,
      showWatermark: true,
      renderScene: getRenderer(template),
      scenes,
      loop: true,
      onFrame: (elapsed, total) => {
        setProgress(elapsed / total);
      },
    });

    engineRef.current = engine;
    setTotalDuration(engine.totalDuration);

    engine.preload().then(() => {
      setReady(true);
      if (autoPlay) {
        engine.play();
        setPlaying(true);
      }
    });

    return () => {
      engine.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenes, brandColor, contentStyle, backgroundStyle, logoUrl, aspectRatio, template]);

  function togglePlay() {
    if (!engineRef.current) return;
    if (playing) {
      engineRef.current.pause();
      setPlaying(false);
    } else {
      engineRef.current.play();
      setPlaying(true);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Record WebM from canvas
  // ═══════════════════════════════════════════════════════════════
  async function recordWebM() {
    if (!canvasRef.current || !engineRef.current) return null;

    const canvas = canvasRef.current;
    const stream = canvas.captureStream(30);

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 6_000_000,
    });

    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const durationMs = engineRef.current.totalDuration * 1000;

    engineRef.current.pause();
    engineRef.current.reset();
    engineRef.current.play();
    setPlaying(true);

    await new Promise((r) => setTimeout(r, 200));

    recorder.start();

    const startTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setDownloadProgress(pct);
    }, 150);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          recorder.stop();
          recorder.onstop = () => {
            clearInterval(progressTimer);
            const blob = new Blob(chunks, { type: "video/webm" });
            resolve(blob);
          };
          recorder.onerror = reject;
        } catch (e) {
          reject(e);
        }
      }, durationMs + 300);
    });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ═══════════════════════════════════════════════════════════════
  // Download WebM only (fast path)
  // ═══════════════════════════════════════════════════════════════
  async function handleDownloadWebM() {
    setDownloadError("");
    setDownloading(true);
    setDownloadProgress(0);

    try {
      const blob = await recordWebM();
      downloadBlob(blob, `fancy-video-${Date.now()}.webm`);
    } catch (err) {
      console.error("Download error:", err);
      setDownloadError(err.message || "Download failed. Try again.");
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Download MP4 (records WebM, then converts with ffmpeg)
  // ═══════════════════════════════════════════════════════════════
  async function handleDownloadMP4() {
    setDownloadError("");
    setDownloading(true);
    setDownloadProgress(0);

    try {
      // Step 1: Record WebM
      const webmBlob = await recordWebM();
      setDownloading(false);
      setDownloadProgress(0);

      // Step 2: Load FFmpeg if not loaded yet
      setFfmpegLoading(true);
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      if (!ffmpegRef.current) {
        const ffmpeg = new FFmpeg();

        ffmpeg.on("progress", ({ progress }) => {
          const pct = Math.min(100, Math.round(progress * 100));
          setConvertProgress(pct);
        });

        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });

        ffmpegRef.current = ffmpeg;
      }
      setFfmpegLoading(false);

      // Step 3: Convert WebM → MP4
      setConverting(true);
      setConvertProgress(0);

      const ffmpeg = ffmpegRef.current;
      const inputName = "input.webm";
      const outputName = "output.mp4";

      await ffmpeg.writeFile(inputName, await fetchFile(webmBlob));

      // Convert with H.264 codec — WhatsApp/mobile optimized
      const expectedDuration = Math.round(engineRef.current.totalDuration);

await ffmpeg.exec([
  "-fflags", "+genpts",
  "-r", "30",
  "-i", inputName,
  "-c:v", "libx264",
  "-preset", "veryfast",
  "-crf", "20",
  "-profile:v", "high",
  "-level", "4.0",
  "-pix_fmt", "yuv420p",
  "-r", "30",
  "-vsync", "cfr",
  "-t", String(expectedDuration),
  "-movflags", "+faststart",
  "-an",
  outputName,
]);

      const mp4Data = await ffmpeg.readFile(outputName);
      const mp4Blob = new Blob([mp4Data.buffer], { type: "video/mp4" });

      downloadBlob(mp4Blob, `fancy-video-${Date.now()}.mp4`);

      // Cleanup
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      console.error("MP4 conversion error:", err);
      setDownloadError(
        err.message?.includes("SharedArrayBuffer")
          ? "MP4 conversion needs a page refresh. Please reload and try again."
          : err.message || "MP4 conversion failed. Try WebM instead."
      );
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
      setConverting(false);
      setConvertProgress(0);
      setFfmpegLoading(false);
    }
  }

  const maxDisplayWidth =
    aspectRatio === "9:16" ? 360 : aspectRatio === "1:1" ? 480 : 720;

  const isBusy = downloading || converting || ffmpegLoading;

  return (
    <div className="w-full">
      <div
        className="mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl relative"
        style={{ maxWidth: maxDisplayWidth }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4 max-w-lg mx-auto">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#075a01] to-[#0a8f01] transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{(progress * totalDuration).toFixed(1)}s</span>
          <span>{totalDuration.toFixed(1)}s</span>
        </div>
      </div>

      {/* Play/Pause */}
      <div className="mt-4 max-w-lg mx-auto">
        <button
          onClick={togglePlay}
          disabled={!ready || isBusy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          {playing ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Play</>}
        </button>
      </div>

      {/* Download buttons */}
      <div className="mt-3 grid grid-cols-2 gap-3 max-w-lg mx-auto">
        <button
          onClick={handleDownloadWebM}
          disabled={!ready || isBusy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#075a01] bg-white px-4 py-3 text-sm font-bold text-[#075a01] hover:bg-green-50 transition disabled:opacity-50"
        >
          {downloading && !converting && !ffmpegLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {downloadProgress}%
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              WebM
            </>
          )}
        </button>

        <button
          onClick={handleDownloadMP4}
          disabled={!ready || isBusy}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-4 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {ffmpegLoading ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Loading...</>
          ) : converting ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Converting {convertProgress}%</>
          ) : downloading && !converting ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Recording {downloadProgress}%</>
          ) : (
            <>
              <FileVideo className="h-4 w-4" />
              MP4 (recommended)
            </>
          )}
        </button>
      </div>

      {/* Status messages */}
      {downloadError && (
        <div className="mt-3 max-w-lg mx-auto rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {downloadError}
        </div>
      )}

      {downloading && !converting && (
        <p className="mt-3 text-xs text-amber-600 text-center max-w-lg mx-auto">
          ⚠️ Keep this tab open. Recording in real-time.
        </p>
      )}

      {converting && (
        <p className="mt-3 text-xs text-blue-600 text-center max-w-lg mx-auto">
          Converting to MP4 in your browser. This runs offline — no server needed.
        </p>
      )}

      {ffmpegLoading && (
        <p className="mt-3 text-xs text-blue-600 text-center max-w-lg mx-auto">
          Loading video converter (30MB, one-time). Please wait...
        </p>
      )}

      {/* Format guide */}
      <div className="mt-4 max-w-lg mx-auto rounded-xl bg-gray-50 border border-gray-200 p-4">
        <p className="text-xs text-gray-800 font-bold mb-2">
          Which format should I use?
        </p>
        <div className="space-y-1.5 text-xs text-gray-600">
          <p>
            <strong className="text-[#075a01]">MP4</strong> — Works everywhere (Meta Ads, WhatsApp, TikTok, YouTube, Instagram). Recommended.
          </p>
          <p>
            <strong>WebM</strong> — Smaller file, faster download. Works on Facebook, Twitter, YouTube. Not on WhatsApp/Instagram.
          </p>
        </div>
      </div>
    </div>
  );
}