"use client";

import Workspace from "./components/Workspace";

export default function VideoAIPage() {
  return (
    <main
      style={{
        width: "100%",
        maxWidth: 1920,
        margin: "0 auto",
        padding: "96px 24px 48px",
        boxSizing: "border-box",
      }}
    >
      <Workspace />
    </main>
  );
}