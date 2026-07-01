"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Download, Loader2 } from "lucide-react";
import { CanvasEngine } from "@/lib/video/canvas-engine";
import { getRenderer } from "@/lib/video/templates";

/**
 * Canvas-based video player with playback + WebM download
 *
 * Props:
 * - scenes: array of scene objects
 * - brandColor, contentStyle, backgroundStyle, logoUrl
 * - aspectRatio: "9:16" | "16:9" | "1:1"
 * - onDownloadStart, onDownloadProgress, onDownloadComplete callbacks
 */
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

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadError, setDownloadError] = useState("");

  // Aspect ratio dimensions
  const dimensions = {
    "9:16": { width: 1080, height: 1920 },
    "16:9": { width: 1920, height: 1080 },
    "1:1": { width: 1080, height: 1080 },
  };
  const { width, height } = dimensions[aspectRatio] || dimensions["9:16"];

  // Init engine
  useEffect(() => {
    if (!canvasRef.current || scenes.length === 0) return;

    console.log("Canvas Player template:", template, "renderer:", getRenderer(template)?.name);
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

    // Preload images then autoplay
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

  async function handleDownload() {
    if (!canvasRef.current || !engineRef.current) return;

    setDownloadError("");
    setDownloading(true);
    setDownloadProgress(0);

    try {
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

      // Reset video to start
      engineRef.current.pause();
      engineRef.current.reset();
      engineRef.current.play();
      setPlaying(true);

      // Small delay so first frame renders
      await new Promise((r) => setTimeout(r, 200));

      recorder.start();

      // Progress tracker
      const startTime = Date.now();
      const progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
        setDownloadProgress(pct);
      }, 150);

      // Stop after duration
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            recorder.stop();
            recorder.onstop = () => {
              clearInterval(progressTimer);
              const blob = new Blob(chunks, { type: "video/webm" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `fancy-video-${Date.now()}.webm`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(url), 1000);
              resolve();
            };
            recorder.onerror = reject;
          } catch (e) {
            reject(e);
          }
        }, durationMs + 300);
      });
    } catch (err) {
      console.error("Download error:", err);
      setDownloadError(err.message || "Download failed. Try again.");
    } finally {
      setDownloading(false);
      setDownloadProgress(0);
    }
  }

  // Display sizing (preview at max 720p)
  const maxDisplayWidth =
    aspectRatio === "9:16" ? 360 : aspectRatio === "1:1" ? 480 : 720;

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

      {/* Controls */}
      <div className="mt-4 flex gap-3 max-w-lg mx-auto">
        <button
          onClick={togglePlay}
          disabled={!ready || downloading}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          {playing ? (
            <>
              <Pause className="h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Play
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          disabled={!ready || downloading}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-4 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {downloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Rendering {downloadProgress}%
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download WebM
            </>
          )}
        </button>
      </div>

      {downloadError && (
        <div className="mt-3 max-w-lg mx-auto rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {downloadError}
        </div>
      )}

      {downloading && (
        <p className="mt-3 text-xs text-amber-600 text-center max-w-lg mx-auto">
          ⚠️ Keep this tab open. Recording in real-time.
        </p>
      )}

      {/* MP4 Conversion Notice */}
      <div className="mt-4 max-w-lg mx-auto rounded-xl bg-blue-50 border border-blue-200 p-4">
        <p className="text-xs text-blue-900 font-bold mb-1">
          Need MP4 format for WhatsApp?
        </p>
        <p className="text-xs text-blue-700">
          Convert your WebM to MP4 free at{" "}
          <a
            href="https://cloudconvert.com/webm-to-mp4"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold hover:text-blue-900"
          >
            cloudconvert.com
          </a>{" "}
          in 10 seconds. WebM works on Twitter, YouTube, Instagram, and Facebook directly.
        </p>
      </div>
    </div>
  );
}