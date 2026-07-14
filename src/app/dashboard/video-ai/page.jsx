"use client";

import { useState } from "react";

import VideoSidebar from "@/components/video-ai/VideoSidebar";
import VideoPreview from "@/components/video-ai/VideoPreview";
import SceneInspector from "@/components/video-ai/SceneInspector";

export default function VideoAIPage() {
  const [project, setProject] = useState(null);

  const [selectedScene, setSelectedScene] =
    useState(0);

  return (
    <main
      style={{
        display: "grid",

        gridTemplateColumns:
"380px minmax(900px,1fr) 420px",

        height: "100vh",

        background:"#050505",

        overflow: "hidden",
      }}
    >
      <VideoSidebar
        project={project}
        setProject={setProject}
      />

      <VideoPreview
        project={project}
        selectedScene={selectedScene}
      />

      <SceneInspector
        project={project}
        selectedScene={selectedScene}
        setProject={setProject}
      />
    </main>
  );
}