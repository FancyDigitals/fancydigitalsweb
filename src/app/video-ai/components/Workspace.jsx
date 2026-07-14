"use client";

import { useVideoProject } from "../hooks/useVideoProject";

import Form from "./Form";
import Preview from "./Preview";
import Inspector from "./Inspector";
import Timeline from "./Timeline";
import LoadingOverlay from "./LoadingOverlay";

import "./workspace.css";

export default function Workspace() {
  const video = useVideoProject();

  return (
    <>
      <LoadingOverlay
        show={video.loading}
        progress={video.progress}
      />

      <section className="video-workspace">
        <Form video={video} />
        <Preview video={video} />
        <Inspector video={video} />
        <Timeline video={video} />
      </section>
    </>
  );
}