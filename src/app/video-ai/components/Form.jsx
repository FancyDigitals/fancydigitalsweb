"use client";

import GenerateButton from "./GenerateButton";
import LogoUploader from "./LogoUploader";
import AssetUploader from "./AssetUploader";
import AudioUploader from "./AudioUploader";

export default function Form({ video }) {
  const { form, setForm, generateVideo, loading } = video;

  const update = (patch) => setForm({ ...form, ...patch });
  const updateBrand = (patch) =>
    setForm({ ...form, brand: { ...form.brand, ...patch } });

  return (
    <aside
      style={{
        background: "#0A0A0A",
        padding: "clamp(18px, 4vw, 22px) clamp(16px, 4vw, 20px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <div style={eyebrow}>Configure</div>
        <h2 style={heading}>Video brief</h2>
      </div>

      <Field
        label="Business name"
        value={form.businessName}
        onChange={(v) => update({ businessName: v })}
        placeholder="Acme Inc."
      />

      <Field
        label="Description"
        textarea
        value={form.description}
        onChange={(v) => update({ description: v })}
        placeholder="What does your business do?"
      />

      <Field
        label="Target audience"
        value={form.audience}
        onChange={(v) => update({ audience: v })}
        placeholder="Small business owners"
      />

      <Select
        label="Duration"
        value={form.duration}
        options={[15, 30, 60]}
        format={(v) => `${v}s`}
        onChange={(v) => update({ duration: Number(v) })}
      />

      <Select
  label="Theme"
  value={form.theme}
  options={[
    { value: "apple", label: "Apple — Cinematic" },
    { value: "launch", label: "Launch — Product Reveal" },
  ]}
  onChange={(v) => update({ theme: v })}
/>

      <Select
        label="Format"
        value={form.format}
        options={["9:16", "16:9", "1:1"]}
        onChange={(v) => update({ format: v })}
      />

      {/* ================= CREATIVE DIRECTION ================= */}
<div
  style={{
    marginTop: 8,
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div style={eyebrow}>Direction</div>
  <h2 style={{ ...heading, marginBottom: 14 }}>Creative brief</h2>

  <Field
    label="Tell the AI how you want your commercial"
    textarea
    value={form.creativeBrief}
    onChange={(v) => update({ creativeBrief: v })}
    placeholder="e.g. Feel like an Apple keynote. Start with my office, then the team, then the product, ending with the logo. Use slow cinematic camera movement."
  />
</div>

{/* ================= ASSETS ================= */}
<div
  style={{
    marginTop: 8,
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div style={eyebrow}>Assets</div>
  <h2 style={{ ...heading, marginBottom: 14 }}>Your images</h2>

  <AssetUploader
    images={form.uploadedImages || []}
    onChange={(imgs) => update({ uploadedImages: imgs })}
  />
</div>

{/* ================= AUDIO OVERRIDES ================= */}
<div
  style={{
    marginTop: 8,
    paddingTop: 16,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  }}
>
  <div style={eyebrow}>Audio</div>
  <h2 style={{ ...heading, marginBottom: 14 }}>Your audio (optional)</h2>

  <div style={{ marginBottom: 12 }}>
    <label style={labelStyle}>Voiceover</label>
    <AudioUploader
      label="Upload your own voiceover"
      value={form.customVoiceover}
      onChange={(v) => update({ customVoiceover: v })}
      placeholder="Skip AI voice. Use your recording."
    />
  </div>

  <div>
    <label style={labelStyle}>Background music</label>
    <AudioUploader
      label="Upload your own music"
      value={form.customMusic}
      onChange={(v) => update({ customMusic: v })}
      placeholder="Replace the AI-picked track."
    />
  </div>
</div>

      {/* ================= BRAND / LOGO ================= */}
      <div
        style={{
          marginTop: 8,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={eyebrow}>Brand</div>
        <h2 style={{ ...heading, marginBottom: 14 }}>Logo</h2>

        <LogoUploader
          logo={form.brand.logo}
          onChange={(logo) => updateBrand({ logo })}
        />

        {form.brand.logo && (
          <>
            <div style={{ height: 14 }} />

            <PositionGrid
              value={form.brand.logoPosition}
              onChange={(v) => updateBrand({ logoPosition: v })}
            />

            <div style={{ height: 14 }} />

            <Select
              label="Size"
              value={form.brand.logoSize}
              options={["small", "medium", "large"]}
              onChange={(v) => updateBrand({ logoSize: v })}
            />

            <Select
              label="Animation"
              value={form.brand.logoAnimation}
              options={["fade", "scale", "slide-up", "slide-down", "none"]}
              onChange={(v) => updateBrand({ logoAnimation: v })}
            />
          </>
        )}
      </div>

      {video.usageInfo && video.usageInfo.limit && (
  <div
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      background: "rgba(14,122,67,0.08)",
      border: "1px solid rgba(14,122,67,0.2)",
      fontSize: 12,
      color: "#A1A1A1",
      textAlign: "center",
    }}
  >
    <strong style={{ color: "#FAFAFA" }}>
      {video.usageInfo.used}/{video.usageInfo.limit}
    </strong>{" "}
    videos used today ·{" "}
    <a href="/pricing" style={{ color: "#0E7A43", fontWeight: 600 }}>
      Upgrade for more
    </a>
  </div>
)}

      <div style={{ marginTop: 12 }}>
        <GenerateButton loading={loading} onClick={generateVideo} />
      </div>
    </aside>
  );
}

function PositionGrid({ value, onChange }) {
  const positions = [
    "top-left", "top-center", "top-right",
    "center-left", "center", "center-right",
    "bottom-left", "bottom-center", "bottom-right",
  ];

  return (
    <div>
      <label style={labelStyle}>Position</label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
          padding: 8,
          background: "#141414",
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 10,
        }}
      >
        {positions.map((p) => {
          const selected = value === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={p}
              style={{
                aspectRatio: "1 / 1",
                border: selected
                  ? "1.5px solid #0E7A43"
                  : "1px solid rgba(255,255,255,0.06)",
                background: selected
                  ? "rgba(14,122,67,0.15)"
                  : "#0A0A0A",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: alignForPosition(p, "v"),
                justifyContent: alignForPosition(p, "h"),
                padding: 4,
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: selected ? "#0E7A43" : "#555",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function alignForPosition(p, axis) {
  if (axis === "v") {
    if (p.startsWith("top")) return "flex-start";
    if (p.startsWith("bottom")) return "flex-end";
    return "center";
  }
  if (p.endsWith("left")) return "flex-start";
  if (p.endsWith("right")) return "flex-end";
  return "center";
}

function Field({ label, value, onChange, textarea, placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          style={input}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={input}
        />
      )}
    </div>
  );
}

function Select({ label, value, onChange, options, format }) {
  const normalized = options.map((opt) =>
    typeof opt === "object" ? opt : { value: opt, label: opt }
  );

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select
        value={value}
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
        }}
      >
        {normalized.map((item) => (
          <option key={item.value} value={item.value}>
            {format ? format(item.value) : String(item.label).replace(/-/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

const eyebrow = {
  color: "#666",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: 8,
};

const heading = {
  margin: 0,
  color: "#FAFAFA",
  fontSize: 17,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

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
  resize: "vertical",
  fontFamily: "inherit",
  transition: "border-color 0.15s ease",
};