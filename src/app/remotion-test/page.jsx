"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill } from "remotion";

function HelloComposition() {
  return (
    <AbsoluteFill
      style={{
        background: "red",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
        fontWeight: 700,
      }}
    >
      REMOTION OK
    </AbsoluteFill>
  );
}

export default function Page() {
  return (
    <div
      style={{
        padding: 40,
      }}
    >
      <Player
        component={HelloComposition}
        durationInFrames={150}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        controls
        style={{
          width: 400,
          border: "5px solid red",
        }}
      />
    </div>
  );
}