"use client";

const CAMERA_MOTIONS = [
  "none",
  "zoom-in",
  "zoom-out",
  "pan-left",
  "pan-right",
  "dolly-forward",
  "dolly-back",
  "orbit",
];

const TRANSITIONS = [
  "fade",
  "cut",
  "crossfade",
  "slide",
  "wipe",
  "zoom",
];

const ANIMATIONS = [
  "none",
  "fade",
  "zoom",
  "slide-up",
  "slide-down",
  "scale",
  "blur-in",
];

const COLOR_GRADES = [
  "none",
  "cinematic",
  "warm",
  "cool",
  "vibrant",
  "muted",
  "black-white",
  "vintage",
];

export default function Inspector({ video }) {
  const { selectedScene, updateSelectedScene, sceneIndex, project } = video;

  const hasProject = !!project;
  const hasScene = !!selectedScene;

  return (
    <aside
      style={{
        background: "#0A0A0A",
        overflowY: "auto",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "clamp(18px, 4vw, 22px) clamp(16px, 4vw, 24px)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}
      >
        <div
          style={{
            color: "#666",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Inspector
        </div>
        <h2
          style={{
            margin: 0,
            color: "#FAFAFA",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {hasScene
            ? `Scene ${String(sceneIndex + 1).padStart(2, "0")}`
            : "Scene properties"}
        </h2>
        <p
          style={{
            color: "#888",
            lineHeight: 1.5,
            fontSize: 12,
            fontWeight: 500,
            margin: "6px 0 0",
          }}
        >
          {hasProject
            ? "Changes update the preview instantly."
            : "Generate a video to start editing."}
        </p>
      </div>

      {!hasScene ? (
        <EmptyInspector hasProject={hasProject} />
      ) : (
        <div style={{ padding: "16px clamp(16px, 4vw, 24px) 24px" }}>
          <TextField
            label="Title"
            value={selectedScene.title}
            onChange={(v) => updateSelectedScene({ title: v })}
          />

          <TextField
            label="Subtitle"
            value={selectedScene.subtitle}
            onChange={(v) => updateSelectedScene({ subtitle: v })}
          />

          <TextField
            label="Voiceover"
            textarea
            value={selectedScene.voiceover}
            onChange={(v) => updateSelectedScene({ voiceover: v })}
          />

          <TextField
            label="Caption"
            value={selectedScene.caption}
            onChange={(v) => updateSelectedScene({ caption: v })}
          />

          <NumberField
            label="Duration (seconds)"
            value={selectedScene.duration}
            min={1}
            max={30}
            onChange={(v) => updateSelectedScene({ duration: v })}
          />

          <SelectField
            label="Camera motion"
            value={selectedScene.cameraMotion}
            options={CAMERA_MOTIONS}
            onChange={(v) => updateSelectedScene({ cameraMotion: v })}
          />

          <SelectField
            label="Transition"
            value={selectedScene.transition}
            options={TRANSITIONS}
            onChange={(v) => updateSelectedScene({ transition: v })}
          />

          <SelectField
            label="Animation"
            value={selectedScene.animation}
            options={ANIMATIONS}
            onChange={(v) => updateSelectedScene({ animation: v })}
          />

          <SelectField
            label="Color grade"
            value={selectedScene.colorGrade || "none"}
            options={COLOR_GRADES}
            onChange={(v) => updateSelectedScene({ colorGrade: v })}
          />

          <TextField
            label="Music mood"
            value={selectedScene.music}
            onChange={(v) => updateSelectedScene({ music: v })}
          />
        </div>
      )}
    </aside>
  );
}

function EmptyInspector({ hasProject }) {
  return (
    <div
      style={{
        padding: "40px 24px",
        color: "#666",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 1.6,
      }}
    >
      {hasProject
        ? "Select a scene from the timeline to edit its properties."
        : "No project loaded. Fill the brief and click Generate."}
    </div>
  );
}

function TextField({ label, value, onChange, textarea }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={{ ...input, minHeight: 72, resize: "vertical" }}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={input}
        />
      )}
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="number"
        value={value ?? ""}
        min={min}
        max={max}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!isNaN(n)) onChange(n);
        }}
        style={input}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      <select
        value={value || options[0]}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...input,
          appearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><path d='M3 5l3 3 3-3' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
          paddingRight: 34,
          textTransform: "capitalize",
          cursor: "pointer",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.replace(/-/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "#A1A1A1",
  marginBottom: 6,
  fontWeight: 500,
  fontSize: 12,
};

const input = {
  width: "100%",
  background: "#141414",
  color: "#FAFAFA",
  border: "1px solid rgba(255,255,255,.06)",
  borderRadius: 10,
  padding: "10px 12px",
  outline: "none",
  fontSize: 13,
  fontWeight: 500,
  fontFamily: "inherit",
  transition: "border-color 0.15s ease",
};