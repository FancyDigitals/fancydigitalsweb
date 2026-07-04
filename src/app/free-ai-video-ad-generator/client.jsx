"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import CanvasVideoPlayer from "@/components/CanvasVideoPlayer";
import {
  Video,
  Sparkles,
  ArrowRight,
  Loader2,
  Wand2,
  Upload,
  X,
  Type,
  Image as ImageIcon,
  Layout,
  Megaphone,
  GraduationCap,
  Download,
} from "lucide-react";

/* ============================================================
   CONFIG
============================================================ */

const TONES = [
  { id: "bold", name: "Bold", emoji: "💪" },
  { id: "luxury", name: "Luxury", emoji: "✨" },
  { id: "tech", name: "Tech", emoji: "🚀" },
  { id: "playful", name: "Playful", emoji: "🎨" },
  { id: "energetic", name: "Energetic", emoji: "⚡" },
];

const CONTENT_STYLES = [
  { id: "text-only", label: "Text Only", desc: "Pure animated text", icon: Type },
  { id: "images-only", label: "Images Only", desc: "Visuals only, minimal text", icon: ImageIcon },
  { id: "image-text", label: "Image + Text", desc: "Best of both", icon: Layout, recommended: true },
];

const BACKGROUND_STYLES = [
  { id: "gradient", label: "Gradient", desc: "Smooth color blend", recommended: true },
  { id: "solid", label: "Solid Color", desc: "Clean single color" },
  { id: "pattern", label: "Pattern", desc: "Dots, grid, waves" },
];

const ASPECT_RATIOS = [
  { id: "9:16", label: "9:16", desc: "Reels · TikTok", recommended: true, width: 1080, height: 1920 },
  { id: "16:9", label: "16:9", desc: "YouTube", width: 1920, height: 1080 },
  { id: "1:1", label: "1:1", desc: "Instagram", width: 1080, height: 1080 },
];

const SCENE_LENGTHS = [
  { id: 15, label: "Short", desc: "3–5 scenes · ~15s" },
  { id: 30, label: "Medium", desc: "6–8 scenes · ~30s", recommended: true },
  { id: 60, label: "Long", desc: "10–14 scenes · ~60s" },
  { id: 90, label: "Extended", desc: "15–18 scenes · ~90s" },
  { id: 120, label: "Full", desc: "18–22 scenes · ~2 min" },
];

const FPS = 30;

// Strip markdown from AI output
function cleanTextFront(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .trim();
}

const TEMPLATES_LIST = [
  { id: "modern", name: "Modern", desc: "Bold, kinetic, high-energy", recommended: true },
  { id: "luxury", name: "Luxury", desc: "Elegant serif, gold accents" },
];

/* ============================================================
   COMPONENT
============================================================ */

const STORAGE_KEY = "fancy_video_ad_form_v1";

export default function VideoAdGeneratorClient() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("ad");
  const [loaded, setLoaded] = useState(false);

  const [form, setForm] = useState({
    template: "modern",
    businessName: "",
    description: "",
    topic: "",
    audience: "",
    goal: "",
    contentBrief: "",
    vibe: "",
    tone: "bold",
    duration: 30,
    brandColor: "#075a01",
    contentStyle: "image-text",
    backgroundStyle: "gradient",
    aspectRatio: "9:16",
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);

  // ─── LOAD saved form on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) {
          // Merge saved with defaults — ensures new fields like template stay set
          setForm((prev) => ({ ...prev, ...parsed.form }));
        }
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.screenshotLabels && Array.isArray(parsed.screenshotLabels)) {
          // Restore only labels (images need re-upload)
          setScreenshots(
            parsed.screenshotLabels.map((label) => ({
              data: null,
              label,
              needsReupload: true,
            }))
          );
        }
      }
    } catch (err) {
      console.warn("Failed to load saved form:", err);
    }
    setLoaded(true);
  }, []);

  // ─── SAVE form whenever it changes
  useEffect(() => {
    if (!loaded) return;
    try {
      const toSave = {
        form,
        mode,
        screenshotLabels: screenshots
          .filter((s) => s.label)
          .map((s) => s.label),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.warn("Failed to save form:", err);
    }
  }, [form, mode, screenshots, loaded]);

  function clearSavedForm() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setForm({
      businessName: "",
      description: "",
      topic: "",
      audience: "",
      goal: "",
      tone: "bold",
      duration: 30,
      brandColor: "#075a01",
      contentStyle: "image-text",
      backgroundStyle: "gradient",
      aspectRatio: "9:16",
    });
    setMode("ad");
    setLogoPreview(null);
    setScreenshots([]);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async function handleLogoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setLogoPreview(base64);
  }

  async function handleScreenshotsUpload(e) {
    const files = Array.from(e.target.files || []);
    const converted = await Promise.all(
      files.map(async (file) => ({
        data: await toBase64(file),
        label: "",
      }))
    );
    setScreenshots((prev) => [...prev, ...converted]);
  }

  function updateScreenshotLabel(index, label) {
    setScreenshots((prev) =>
      prev.map((s, i) => (i === index ? { ...s, label } : s))
    );
  }

  function removeScreenshot(index) {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleGenerate() {
    setError("");

    if (mode === "ad") {
      if (!form.businessName.trim() || !form.description.trim()) {
        setError("Please fill in your business name and description");
        return;
      }
    } else {
      if (!form.topic.trim()) {
        setError("Please describe what your tutorial is about");
        return;
      }
    }

    setGenerating(true);
    setStep(2);

    try {
      const res = await fetch("/api/tools/ai-video-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          mode,
          logoUrl: logoPreview,
          uploadedImages: screenshots,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");

      setResult(data.project);
      setStep(3);
    } catch (err) {
      setError(err.message);
      setStep(1);
    } finally {
      setGenerating(false);
    }
  }

  async function handleRender() {
    setRenderError("");
    setRendering(true);
    setRenderProgress(0);

    try {
      if (!playerContainerRef.current) {
        throw new Error("Player not ready");
      }

      // Auto-play the player
      const playButton = playerContainerRef.current.querySelector("button");
      if (playButton) playButton.click();

      // Wait a moment for playback to start
      await new Promise((r) => setTimeout(r, 500));

      const durationMs = totalDurationSec * 1000;

      const blob = await renderVideoToWebM(
        playerContainerRef.current,
        durationMs,
        (pct) => setRenderProgress(pct)
      );

      const filename = `fancy-video-${Date.now()}.webm`;
      downloadBlob(blob, filename);
    } catch (err) {
      console.error("Render error:", err);
      setRenderError(err.message || "Rendering failed. Try again.");
    } finally {
      setRendering(false);
      setRenderProgress(0);
    }
  }

  function reset() {
    setResult(null);
    setStep(1);
    setRenderError("");
  }

  // Calculate total duration from scenes
  const totalDurationSec = result?.scenes?.reduce(
    (sum, s) => sum + (s.duration || 5),
    0
  ) || 30;

  // Get dimensions from aspect ratio
  const aspectData = ASPECT_RATIOS.find((a) => a.id === form.aspectRatio) || ASPECT_RATIOS[0];

  return (
    <main className="min-h-screen bg-white">

      {/* ============ HERO ============ */}
      <section className="relative px-4 pt-28 pb-8 sm:px-6 sm:pt-36 sm:pb-12 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#075a01]/5 via-white to-white" />
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-[#075a01]/10 blur-3xl" />
        <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-[#ff914d]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 mb-5 text-xs font-bold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            FREE — No Signup Required
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            AI Video Generator
            <br />
            <span className="bg-gradient-to-r from-[#075a01] to-[#0a8f01] bg-clip-text text-transparent">
              Premium Motion Graphics
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Create scroll-stopping ads or step-by-step tutorial videos with animated text, motion graphics, and your own visuals.
          </p>
        </div>
      </section>

      {/* ============ GENERATOR ============ */}
      <section className="px-4 pb-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">

          {/* ============ STEP 1: FORM ============ */}
          {step === 1 && (
            <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-xl p-6 sm:p-10 space-y-8">

              {/* ─── MODE SELECTOR ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  What are you making?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode("ad")}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      mode === "ad"
                        ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Megaphone className={`h-6 w-6 mb-2 ${mode === "ad" ? "text-[#075a01]" : "text-gray-500"}`} />
                    <p className="font-bold text-gray-900">Ad Video</p>
                    <p className="text-xs text-gray-500 mt-1">Promote your business or product</p>
                  </button>
                  <button
                    onClick={() => setMode("explainer")}
                    className={`p-5 rounded-2xl border-2 text-left transition-all ${
                      mode === "explainer"
                        ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <GraduationCap className={`h-6 w-6 mb-2 ${mode === "explainer" ? "text-[#075a01]" : "text-gray-500"}`} />
                    <p className="font-bold text-gray-900">Tutorial / How-To</p>
                    <p className="text-xs text-gray-500 mt-1">Explain a step-by-step process</p>
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* ─── AD MODE FIELDS ─── */}
              {mode === "ad" && (
                <div className="space-y-5 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Fancy Digitals"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      What does your business do? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g. AI-powered platform that helps startups build landing pages, resumes, and marketing tools"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        name="audience"
                        value={form.audience}
                        onChange={handleChange}
                        placeholder="e.g. startup founders"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Campaign Goal
                      </label>
                      <input
                        type="text"
                        name="goal"
                        value={form.goal}
                        onChange={handleChange}
                        placeholder="e.g. drive signups"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01]"
                      />
                    </div>
                  </div>

                                    <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Detailed Content Brief (Optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Tell AI exactly what you want in the video — scenes, order, key messages, features to highlight. The more detail, the better.
                    </p>
                    <textarea
                      name="contentBrief"
                      value={form.contentBrief}
                      onChange={handleChange}
                      rows={5}
                      placeholder="e.g. Start with the problem: freelancers waste hours writing proposals. Then show our AI proposal generator. Highlight the templates feature. End with a 50% off launch discount code FANCY50."
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10 resize-none"
                    />
                  </div>

                                    <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Video Vibe (Optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Describe the mood or feel. AI adjusts word choice, pacing, and style.
                    </p>
                    <input
                      type="text"
                      name="vibe"
                      value={form.vibe}
                      onChange={handleChange}
                      placeholder="e.g. cinematic movie trailer, cozy morning coffee, high-energy gym"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Pick Your Tone
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {TONES.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => setForm({ ...form, tone: tone.id })}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            form.tone === tone.id
                              ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-1">{tone.emoji}</div>
                          <p className="text-xs font-bold text-gray-900">{tone.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── EXPLAINER MODE FIELDS ─── */}
              {mode === "explainer" && (
                <div className="space-y-5 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      What is the tutorial about? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g. How to create a landing page on Fancy Digitals in 3 steps"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Be specific. AI will generate step-by-step instructions.
                    </p>
                  </div>

                                    <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Detailed Content Brief (Optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Add extra context — specific steps, tools to mention, order of instructions, tips. The more detail, the better the tutorial.
                    </p>
                    <textarea
                      name="contentBrief"
                      value={form.contentBrief}
                      onChange={handleChange}
                      rows={5}
                      placeholder="e.g. Show the signup screen first, then the dashboard. Mention that everything is free. Include a step about connecting Google Analytics. End with a link to our help docs."
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10 resize-none"
                    />
                  </div>

                                    <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Video Vibe (Optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Describe the mood or feel. AI adjusts word choice, pacing, and style.
                    </p>
                    <input
                      type="text"
                      name="vibe"
                      value={form.vibe}
                      onChange={handleChange}
                      placeholder="e.g. friendly and casual, professional corporate, fun and energetic"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Who is this for?
                      </label>
                      <input
                        type="text"
                        name="audience"
                        value={form.audience}
                        onChange={handleChange}
                        placeholder="e.g. beginners"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Video Goal
                      </label>
                      <input
                        type="text"
                        name="goal"
                        value={form.goal}
                        onChange={handleChange}
                        placeholder="e.g. teach how to sign up"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base focus:outline-none focus:border-[#075a01]"
                      />
                    </div>
                  </div>
                </div>
              )}

                            {/* ─── TEMPLATE PICKER ─── */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Visual Template
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Choose the visual style of your video
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATES_LIST.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, template: t.id })}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        form.template === t.id
                          ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {t.recommended && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── CONTENT STYLE ─── */}
              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Content Style
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  What should appear on screen?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CONTENT_STYLES.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setForm({ ...form, contentStyle: s.id })}
                        className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                          form.contentStyle === s.id
                            ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {s.recommended && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                            RECOMMENDED
                          </span>
                        )}
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${form.contentStyle === s.id ? "text-[#075a01]" : "text-gray-500"}`} />
                        <p className="text-sm font-bold text-gray-900">{s.label}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{s.desc}</p>
                      </button>
                    );
                  })}
                </div>
                {form.contentStyle === "images-only" && screenshots.length === 0 && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    No uploads? We'll auto-fetch stock images for you.
                  </p>
                )}
              </div>

              {/* ─── BACKGROUND STYLE ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Background Style
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Behind everything on screen
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {BACKGROUND_STYLES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setForm({ ...form, backgroundStyle: b.id })}
                      className={`p-4 rounded-xl border-2 text-center transition-all relative ${
                        form.backgroundStyle === b.id
                          ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {b.recommended && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                      <p className="text-sm font-bold text-gray-900">{b.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{b.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── ASPECT RATIO ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Video Format
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Where will you post this video?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {ASPECT_RATIOS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setForm({ ...form, aspectRatio: a.id })}
                      className={`p-3 rounded-xl border-2 text-center transition-all relative ${
                        form.aspectRatio === a.id
                          ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {a.recommended && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                      <p className="text-lg font-black text-gray-900">{a.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{a.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── SCENE LENGTH ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Video Length
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Longer videos have more scenes
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SCENE_LENGTHS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setForm({ ...form, duration: d.id })}
                      className={`p-3 rounded-xl border-2 text-center transition-all relative ${
                        form.duration === d.id
                          ? "border-[#075a01] bg-[#075a01]/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {d.recommended && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ff914d] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                      <p className="text-lg font-black text-gray-900">{d.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{d.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── BRAND COLOR ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Brand Color
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Used for accents, buttons, and animations
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="brandColor"
                    value={form.brandColor}
                    onChange={handleChange}
                    className="h-14 w-20 rounded-xl border-2 border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="brandColor"
                    value={form.brandColor}
                    onChange={handleChange}
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-base font-mono focus:outline-none focus:border-[#075a01]"
                  />
                </div>
              </div>

              {/* ─── LOGO UPLOAD ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Upload Your Logo (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Appears in the corner of every scene
                </p>

                {!logoPreview ? (
                  <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 cursor-pointer hover:border-[#075a01] hover:bg-[#075a01]/5 transition">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="text-sm font-bold text-gray-700">Click to upload logo</p>
                    <p className="text-xs text-gray-500">PNG or JPG · Max 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                    <img src={logoPreview} alt="Logo" className="h-20 w-20 object-contain rounded-lg bg-white p-2" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">Logo uploaded</p>
                      <button
                        onClick={() => setLogoPreview(null)}
                        className="text-xs text-red-600 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ─── SCREENSHOTS UPLOAD ─── */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Upload Screenshots / Images (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Product screenshots, photos, or graphics. Leave empty to auto-fetch stock images.
                </p>

                <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 cursor-pointer hover:border-[#075a01] hover:bg-[#075a01]/5 transition">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm font-bold text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-500">Multiple allowed · PNG or JPG</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleScreenshotsUpload}
                    className="hidden"
                  />
                </label>

                {screenshots.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {screenshots.map((img, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <img
                          src={img.data}
                          alt=""
                          className="h-16 w-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={img.label}
                            onChange={(e) => updateScreenshotLabel(idx, e.target.value)}
                            placeholder="Label this image (e.g. dashboard)"
                            className="w-full text-sm rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:border-[#075a01]"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            Helps AI place image in matching scene
                          </p>
                        </div>
                        <button
                          onClick={() => removeScreenshot(idx)}
                          className="bg-red-500 text-white rounded-full p-1.5 shadow-sm hover:bg-red-600 shrink-0"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              

              {/* ─── CLEAR + GENERATE ─── */}
              <button
                onClick={clearSavedForm}
                type="button"
                className="w-full text-sm text-gray-500 hover:text-red-600 transition"
              >
                Clear saved form
              </button>

              {/* ─── GENERATE BUTTON ─── */}
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-6 py-4 text-base font-bold text-white shadow-lg hover:opacity-90 active:scale-95 transition disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Generate My Video
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* ============ STEP 2: GENERATING ============ */}
          {step === 2 && (
            <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-xl p-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
                <Loader2 className="h-10 w-10 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Creating your video...
              </h2>
              <p className="text-sm text-gray-500">
                Writing the script and building your scenes
              </p>
            </div>
          )}

                    {/* ============ STEP 3: RESULT ============ */}
          {step === 3 && result && (
            <div className="space-y-6">

              {/* Success header */}
              <div className="rounded-3xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-bold text-sm">YOUR VIDEO IS READY</p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {cleanTextFront(result.hook || result.scenes?.[0]?.title || "")}
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  {result.scenes.length} scenes · {totalDurationSec}s · {form.aspectRatio}
                </p>
              </div>

              {/* Live preview with download */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Video className="h-5 w-5 text-[#075a01]" />
                  Live Preview
                </h3>

                <CanvasVideoPlayer
                  scenes={result.scenes}
                  brandColor={result.brandColor}
                  contentStyle={result.contentStyle}
                  backgroundStyle={result.backgroundStyle}
                  logoUrl={result.logoUrl}
                  aspectRatio={form.aspectRatio}
                  template={form.template}
                />
              </div>

              {/* Scene breakdown */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Scene-by-Scene Breakdown
                </h3>
                <div className="space-y-3">
                  {result.scenes.map((scene, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#075a01] text-white font-bold">
                        {scene.stepNumber || idx + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        {scene.type && (
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                            {scene.type}
                          </p>
                        )}
                        <p className="font-bold text-gray-900 text-lg">
                          {cleanTextFront(scene.title || scene.text || "")}
                        </p>
                        {scene.subtitle && (
                          <p className="text-sm text-gray-600 mt-1">{cleanTextFront(scene.subtitle)}</p>
                        )}
                        <p className="text-[10px] text-gray-400 mt-2">Duration: {scene.duration}s</p>
                      </div>
                      {scene.imageUrl && (
                        <img
                          src={scene.imageUrl}
                          alt=""
                          className="h-16 w-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={reset}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-base font-bold text-gray-700 hover:bg-gray-50 transition"
              >
                Create Another Video
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}