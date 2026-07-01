"use client";

import { useEffect, useRef } from "react";
import { CanvasEngine } from "@/lib/video/canvas-engine";
import { renderModernScene as renderScene } from "@/lib/video/canvas-renderers";

export default function CanvasTestPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new CanvasEngine(canvasRef.current, {
      width: 1080,
      height: 1920,
      fps: 30,
      brandColor: "#075a01",
      backgroundStyle: "gradient",
      contentStyle: "text-only",
      renderScene,
      scenes: [
        {
          type: "headline",
          title: "Build Landing Pages With AI",
          highlightWords: ["AI"],
          subtitle: "Zero code. Zero designers. Just results.",
          duration: 4,
        },
        {
          type: "step",
          stepNumber: 1,
          title: "Describe Your Business",
          highlightWords: ["Business"],
          subtitle: "One sentence is all we need to get started",
          duration: 4,
        },
        {
          type: "step",
          stepNumber: 2,
          title: "AI Builds Instantly",
          highlightWords: ["Instantly"],
          subtitle: "Complete page in under 60 seconds",
          duration: 4,
        },
        {
          type: "cta",
          title: "Start Building Free",
          highlightWords: ["Free"],
          subtitle: "No credit card required",
          ctaText: "Try It Now",
          ctaUrl: "fancydigitals.com.ng",
          duration: 5,
        },
      ],
    });

    engine.preload().then(() => engine.play());

    return () => engine.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div style={{ maxWidth: 360 }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "auto", borderRadius: 24 }} />
      </div>
    </main>
  );
}