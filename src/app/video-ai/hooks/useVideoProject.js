"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";

const HISTORY_LIMIT = 50;

export function useVideoProject() {
  const [project, setProjectState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [progress, setProgress] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const [form, setForm] = useState({
  businessName: "",
  description: "",
  audience: "",
  duration: 30,
  theme: "apple",
  format: "9:16",
  creativeBrief: "",
  uploadedImages: [],
  brand: {
    logo: null,
    logoPosition: "top-left",
    logoSize: "medium",
    logoAnimation: "fade",
  },
  // NEW
  customVoiceover: null, // { name, data (base64) }
  customMusic: null,     // { name, data (base64) }
});

  const playerRef = useRef(null);
  const historyRef = useRef([]);
  const futureRef = useRef([]);
  const skipHistoryRef = useRef(false);
  const [usageInfo, setUsageInfo] = useState(null);

  // ---------- HISTORY ----------
  const pushHistory = useCallback((snapshot) => {
    if (!snapshot) return;
    historyRef.current.push(JSON.stringify(snapshot));
    if (historyRef.current.length > HISTORY_LIMIT) {
      historyRef.current.shift();
    }
    futureRef.current = [];
  }, []);

  const setProject = useCallback(
    (next) => {
      setProjectState((prev) => {
        const resolved =
          typeof next === "function" ? next(prev) : next;

        if (!skipHistoryRef.current && prev) {
          historyRef.current.push(JSON.stringify(prev));
          if (historyRef.current.length > HISTORY_LIMIT) {
            historyRef.current.shift();
          }
          futureRef.current = [];
        }

        skipHistoryRef.current = false;
        return resolved;
      });
    },
    []
  );

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const previous = historyRef.current.pop();
    setProjectState((current) => {
      if (current) {
        futureRef.current.push(JSON.stringify(current));
      }
      skipHistoryRef.current = true;
      return JSON.parse(previous);
    });
  }, []);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current.pop();
    setProjectState((current) => {
      if (current) {
        historyRef.current.push(JSON.stringify(current));
      }
      skipHistoryRef.current = true;
      return JSON.parse(next);
    });
  }, []);

  // ---------- KEYBOARD ----------
  useEffect(() => {
    const handler = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      const key = e.key.toLowerCase();

      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((key === "z" && e.shiftKey) || key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  // ---------- SCENE HELPERS ----------
  const updateScene = useCallback(
    (index, patch) => {
      setProject((prev) => {
        if (!prev) return prev;
        const scenes = [...prev.scenes];
        scenes[index] = { ...scenes[index], ...patch };
        return { ...prev, scenes };
      });
    },
    [setProject]
  );

  const updateSelectedScene = useCallback(
    (patch) => updateScene(sceneIndex, patch),
    [updateScene, sceneIndex]
  );

  const reorderScenes = useCallback(
    (from, to) => {
      setProject((prev) => {
        if (!prev) return prev;
        const scenes = [...prev.scenes];
        const [moved] = scenes.splice(from, 1);
        scenes.splice(to, 0, moved);
        return { ...prev, scenes };
      });
      if (sceneIndex === from) setSceneIndex(to);
    },
    [setProject, sceneIndex]
  );

  // ---------- GENERATION ----------
  const pushProgress = useCallback((label) => {
    setProgress((prev) => [
      ...prev.map((p) => ({ ...p, active: false })),
      { label, active: true, done: false },
    ]);
  }, []);

  const completeProgress = useCallback(() => {
    setProgress((prev) =>
      prev.map((p) => ({ ...p, active: false, done: true }))
    );
  }, []);

  const generateVideo = useCallback(async () => {
  setLoading(true);
  setProgress([]);

  try {
    pushProgress("Understanding your business");
    await new Promise((r) => setTimeout(r, 200));

    pushProgress("Writing storyboard");
    await new Promise((r) => setTimeout(r, 200));

    pushProgress("Creating scenes");
    await new Promise((r) => setTimeout(r, 200));

    pushProgress("Generating images");

    const res = await fetch("/api/tools/ai-video-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: form.businessName,
        description: form.description,
        audience: form.audience,
        duration: form.duration,
        tone: form.theme,
        theme: form.theme,
        aspectRatio: form.format,
        creativeBrief: form.creativeBrief,
        uploadedImages: (form.uploadedImages || []).map((img) => ({
          name: img.name,
          data: img.data,
          role: img.role || "auto",
          note: img.note || "",
        })),
        brand: form.brand?.logo ? form.brand : null,
        customVoiceover: form.customVoiceover?.data || null,
        customMusic: form.customMusic?.data || null,
      }),
    });

    const json = await res.json();

    // Handle quota + auth errors
    if (res.status === 401) {
      window.location.href = "/signin?redirect=/video-ai";
      return;
    }

    if (res.status === 429) {
      setProgress([
        {
          label: json.error || "Daily limit reached. Upgrade to Pro for more.",
          error: true,
          requiresUpgrade: true,
        },
      ]);
      await new Promise((r) => setTimeout(r, 3000));
      return;
    }

    if (!json.success) throw new Error(json.error || "Generation failed");

    pushProgress("Building composition");
    await new Promise((r) => setTimeout(r, 150));

    skipHistoryRef.current = true;
    setProjectState(json.project);
    setSceneIndex(0);

    // Store usage info for UI
    if (json.usage) {
      setUsageInfo(json.usage);
    }

    completeProgress();
    await new Promise((r) => setTimeout(r, 400));
  } catch (err) {
    console.error("[generate]", err);
    setProgress((prev) => [
      ...prev,
      { label: `Error: ${err.message}`, error: true },
    ]);
    await new Promise((r) => setTimeout(r, 1500));
  } finally {
    setLoading(false);
    setTimeout(() => setProgress([]), 500);
  }
}, [form, pushProgress, completeProgress]);

  // ---------- PLAYBACK ----------
  const play = useCallback(() => {
    playerRef.current?.play?.();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pause?.();
    setIsPlaying(false);
  }, []);

  const seekToScene = useCallback(
    (index) => {
      if (!project?.scenes) return;
      const fps = project.fps || 30;
      let frames = 0;
      for (let i = 0; i < index; i++) {
        frames += Math.round((project.scenes[i].duration || 5) * fps);
      }
      playerRef.current?.seekTo?.(frames);
      setCurrentFrame(frames);
      setSceneIndex(index);
    },
    [project]
  );

  const nextScene = useCallback(() => {
    if (!project?.scenes) return;
    const next = Math.min(sceneIndex + 1, project.scenes.length - 1);
    seekToScene(next);
  }, [project, sceneIndex, seekToScene]);

  const prevScene = useCallback(() => {
    const prev = Math.max(sceneIndex - 1, 0);
    seekToScene(prev);
  }, [sceneIndex, seekToScene]);

  // ---------- DERIVED ----------
  const selectedScene = project?.scenes?.[sceneIndex] || null;

  return {
    // state
    project,
    setProject,
    loading,
    setLoading,
    sceneIndex,
    setSceneIndex,
    selectedScene,
    progress,
    form,
    setForm,
    usageInfo,

    // scene ops
    updateScene,
    updateSelectedScene,
    reorderScenes,

    // history
    undo,
    redo,

    // generation
    generateVideo,

    // playback
    playerRef,
    isPlaying,
    setIsPlaying,
    currentFrame,
    setCurrentFrame,
    play,
    pause,
    nextScene,
    prevScene,
    seekToScene,
  };
}