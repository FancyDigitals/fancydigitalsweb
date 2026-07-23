"use client";

import { useState, useCallback } from "react";
import {
  Save,
  Share2,
  Download,
  Copy,
  Check,
  X,
  ExternalLink,
  Palette,
  Type,
  MessageSquare,
  Award,
  Layers,
  Lock,
  Sparkles,
  Package,
  RefreshCw,
  ImageIcon,
} from "lucide-react";
import { buildBrandKitZip, downloadBrandKitZip } from "@/lib/brand-kit/zip-builder";

// ─────────────────────────────────────────────
// COLOR SWATCH
// ─────────────────────────────────────────────
function ColorSwatch({ color }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 group">
      <div
        className="h-24 relative cursor-pointer transition-transform group-hover:scale-105"
        style={{ backgroundColor: color.hex }}
        onClick={copy}
      >
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? (
            <div className="bg-white/90 rounded-full p-1">
              <Check className="w-3 h-3 text-green-600" />
            </div>
          ) : (
            <div className="bg-white/90 rounded-full p-1">
              <Copy className="w-3 h-3 text-gray-700" />
            </div>
          )}
        </div>
      </div>
      <div className="p-3 bg-white">
        <div className="text-xs font-bold text-gray-900">{color.name}</div>
        <div className="text-[10px] font-mono text-gray-500 mt-0.5">{color.hex}</div>
        {color.usage && (
          <div className="text-[10px] text-gray-400 mt-1 leading-tight line-clamp-2">
            {color.usage}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// AI LOGO CARD (real PNG image)
// ─────────────────────────────────────────────
function LogoImageCard({ imgData, meta, businessName, index }) {
  const download = () => {
    const a = document.createElement("a");
    a.href = imgData;
    a.download = `${(businessName || "brand").toLowerCase().replace(/\s+/g, "-")}-logo-${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const name = meta?.name || `Logo Concept ${index + 1}`;
  const type = meta?.type || "AI-generated logo mark";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden group">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 relative">
        <img
          src={imgData}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-3 border-t border-gray-100">
        <div className="text-xs font-bold text-gray-900 mb-0.5">{name}</div>
        <div className="text-[10px] text-gray-500 mb-2">{type}</div>

        <button
          type="button"
          onClick={download}
          className="w-full flex items-center justify-center gap-1 text-[10px] font-bold text-white bg-gray-900 hover:bg-gray-800 px-2 py-1.5 rounded-lg transition-colors"
        >
          <Download className="w-3 h-3" />
          Download PNG
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGO PREVIEW (initials-based wordmark/lockup)
// ─────────────────────────────────────────────
function LogoPreview({ businessName, primaryColor, secondaryColor, type = "combination" }) {
  const initials = (businessName || "Brand")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");

  if (type === "wordmark") {
    return (
      <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200 p-8 min-h-[120px]">
        <span
          className="text-3xl font-black tracking-tight"
          style={{ color: primaryColor }}
        >
          {businessName}
        </span>
      </div>
    );
  }

  if (type === "icon") {
    return (
      <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200 p-8 min-h-[120px]">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
          style={{ backgroundColor: primaryColor, color: secondaryColor || "#fff" }}
        >
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 bg-white rounded-xl border border-gray-200 p-8 min-h-[120px]">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
        style={{ backgroundColor: primaryColor, color: secondaryColor || "#fff" }}
      >
        {initials}
      </div>
      <span
        className="text-2xl font-black tracking-tight"
        style={{ color: primaryColor }}
      >
        {businessName}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// EDITABLE FIELD
// ─────────────────────────────────────────────
function EditableField({ value, onSave, className = "", multiline = false, placeholder = "" }) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value || "");

  const commit = () => {
    onSave(temp);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div
        onClick={() => {
          setTemp(value || "");
          setEditing(true);
        }}
        className={`cursor-text rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all p-2 ${className}`}
      >
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {multiline ? (
        <textarea
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 bg-white border border-[#075a01] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 ${className}`}
          autoFocus
        />
      ) : (
        <input
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className={`w-full px-3 py-2 bg-white border border-[#075a01] rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#075a01]/20 ${className}`}
          autoFocus
        />
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={commit}
          className="text-xs font-semibold text-white bg-[#075a01] px-3 py-1.5 rounded-lg"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-xs text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PREVIEW
// ─────────────────────────────────────────────
export default function BrandKitPreview({
  data,
  savedId,
  onSaved,
  userIsPro,
  canExportZip,
}) {
  const [kit, setKit] = useState(data || {});
  const [currentId, setCurrentId] = useState(savedId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBuildingZip, setIsBuildingZip] = useState(false);
  const [zipError, setZipError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const primaryColor = kit.colors?.[0]?.hex || "#075a01";
  const secondaryColor = kit.colors?.[1]?.hex || "#0a8f01";

  // ─── Update helper ───
  const updateField = useCallback(
    async (path, value) => {
      setKit((prev) => {
        const next = { ...prev };
        const keys = path.split(".");
        let cursor = next;
        for (let i = 0; i < keys.length - 1; i++) {
          cursor[keys[i]] = { ...(cursor[keys[i]] || {}) };
          cursor = cursor[keys[i]];
        }
        cursor[keys[keys.length - 1]] = value;
        return next;
      });

      if (currentId) {
        try {
          const updatedKit = { ...kit };
          const keys = path.split(".");
          let cursor = updatedKit;
          for (let i = 0; i < keys.length - 1; i++) {
            cursor[keys[i]] = { ...(cursor[keys[i]] || {}) };
            cursor = cursor[keys[i]];
          }
          cursor[keys[keys.length - 1]] = value;

          await fetch("/api/brand-kit/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: currentId,
              kit_data: updatedKit,
              business_name: updatedKit.business_name,
            }),
          });
        } catch {}
      }
    },
    [currentId, kit]
  );

  // ─── Save ───
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/brand-kit/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentId,
          title: kit.business_name || "Brand Kit",
          business_name: kit.business_name || "",
          tagline: kit.tagline || "",
          industry: kit.industry || "",
          style: kit.style || "",
          kit_data: kit,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCurrentId(json.data.id);
        onSaved?.(json.data.id);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {}
    setIsSaving(false);
  };

  // ─── Share ───
  const handleShare = async () => {
    if (!currentId) await handleSave();
    setIsSharing(true);
    try {
      const res = await fetch("/api/brand-kit/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentId }),
      });
      const json = await res.json();
      if (json.success) {
        setShareUrl(json.shareUrl);
        setShowShareModal(true);
      }
    } catch {}
    setIsSharing(false);
  };

  // ─── ZIP Download ───
  const handleDownloadZip = async () => {
    if (!canExportZip) return;
    setZipError("");
    setIsBuildingZip(true);
    try {
      const blob = await buildBrandKitZip(kit);
      downloadBrandKitZip(blob, kit.business_name);
    } catch (err) {
      console.error(err);
      setZipError("Failed to build ZIP. Please try again.");
    } finally {
      setIsBuildingZip(false);
    }
  };

  const SECTIONS = [
    { id: "overview", label: "Overview", icon: Award },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "logos", label: "Logos", icon: Sparkles },
    { id: "voice", label: "Brand Voice", icon: MessageSquare },
    { id: "assets", label: "Assets", icon: Layers },
  ];

  const hasRealLogos = kit.logo_images && kit.logo_images.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        <span className="text-sm font-semibold text-gray-800">
          {kit.business_name || "Brand Kit"}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>

          {canExportZip ? (
            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={isBuildingZip}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 px-3 py-1.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
            >
              {isBuildingZip ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Building ZIP...
                </>
              ) : (
                <>
                  <Package className="w-3.5 h-3.5" />
                  Download ZIP
                </>
              )}
            </button>
          ) : (
            <a
              href="/pricing"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              Pro: ZIP Download
            </a>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-3 py-1.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {isSaving ? "Saving..." : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {zipError && (
        <div className="bg-red-50 border-b border-red-100 px-5 py-2 text-xs text-red-700">
          {zipError}
        </div>
      )}

      {/* Section tabs */}
      <div className="flex gap-1 px-4 sm:px-5 py-2 border-b border-gray-100 overflow-x-auto">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const active = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                active
                  ? "bg-[#075a01] text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6 max-h-[800px] overflow-y-auto">
        {/* OVERVIEW */}
        {activeSection === "overview" && (
          <>
            <div
              className="rounded-2xl p-8 text-center border"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                borderColor: primaryColor,
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                {kit.business_name}
              </h2>
              <p className="text-white/80 text-sm sm:text-base">
                {kit.tagline}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Brand Story
              </h3>
              <EditableField
                value={kit.brand_story}
                onSave={(v) => updateField("brand_story", v)}
                multiline
                className="text-sm text-gray-700 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Mission
                </h3>
                <EditableField
                  value={kit.mission}
                  onSave={(v) => updateField("mission", v)}
                  className="text-sm text-gray-700"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Vision
                </h3>
                <EditableField
                  value={kit.vision}
                  onSave={(v) => updateField("vision", v)}
                  className="text-sm text-gray-700"
                />
              </div>
            </div>

            {kit.values && kit.values.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Values
                </h3>
                <div className="space-y-2">
                  {kit.values.map((v, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="font-bold text-sm text-gray-900">
                        {typeof v === "string" ? v : v.title}
                      </div>
                      {typeof v === "object" && v.description && (
                        <div className="text-xs text-gray-600 mt-1">
                          {v.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* COLORS */}
        {activeSection === "colors" && kit.colors && (
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Color Palette
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Click any color to copy hex code.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {kit.colors.map((c, i) => (
                <ColorSwatch key={i} color={c} />
              ))}
            </div>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {activeSection === "typography" && kit.typography && (
          <div className="space-y-6">
            {["heading", "body", "mono"].map((type) => {
              const t = kit.typography[type];
              if (!t) return null;
              return (
                <div key={type} className="p-5 rounded-2xl border border-gray-200 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {type} Font
                      </span>
                      <h4 className="text-lg font-bold text-gray-900 mt-0.5">
                        {t.family}
                      </h4>
                    </div>
                    <a
                      href={`https://fonts.google.com/specimen/${(t.family || "").replace(/\s+/g, "+")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#075a01] font-medium flex items-center gap-1 hover:underline"
                    >
                      Google Fonts
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{t.usage}</p>
                  <div
                    className="text-2xl text-gray-900"
                    style={{
                      fontFamily: `"${t.family}", ${type === "mono" ? "monospace" : "sans-serif"}`,
                      fontWeight: type === "heading" ? 800 : 400,
                    }}
                  >
                    {t.sample}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LOGOS */}
        {activeSection === "logos" && (
          <div className="space-y-6">
            {/* AI Logo Concepts — REAL PNG IMAGES */}
{hasRealLogos ? (
  <div>
    <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        AI Logo Concepts
      </h3>
      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-2 py-0.5 rounded-full">
        PNG • REAL AI LOGOS
      </span>
    </div>
    {kit.logo_preference && (
      <p className="text-[11px] text-[#075a01] font-semibold mb-2">
        Style: {kit.logo_preference}
      </p>
    )}
    <p className="text-xs text-gray-500 mb-4">
      Three unique {kit.logo_preference?.toLowerCase() || "logo"} concepts generated by AI, tailored to your business. Download as PNG for immediate use, or refine further in Figma, Photoshop, or Illustrator.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {kit.logo_images.map((imgData, i) => (
        <LogoImageCard
          key={i}
          imgData={imgData}
          meta={kit.logo_concepts_meta?.[i]}
          businessName={kit.business_name}
          index={i}
        />
      ))}
    </div>
  </div>
) : (
  <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center">
    <ImageIcon className="w-8 h-8 text-amber-600 mx-auto mb-2" />
    <p className="text-sm font-bold text-amber-900 mb-1">
      Logo images unavailable
    </p>
    <p className="text-xs text-amber-800">
      The image AI is temporarily busy. Your brand kit is still ready below. Try regenerating in a minute for logo concepts.
    </p>
  </div>
)}

            {/* Wordmark / Combination lockups (initials-based, guaranteed correct spelling) */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Brand Name Lockups
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Text-based logo variations with your business name — guaranteed correct spelling.
              </p>
              <div className="space-y-3">
                <LogoPreview
                  businessName={kit.business_name}
                  primaryColor={primaryColor}
                  secondaryColor="#ffffff"
                  type="combination"
                />
                <LogoPreview
                  businessName={kit.business_name}
                  primaryColor={primaryColor}
                  type="wordmark"
                />
                <LogoPreview
                  businessName={kit.business_name}
                  primaryColor={primaryColor}
                  secondaryColor="#ffffff"
                  type="icon"
                />
              </div>
            </div>

            {/* AI Prompts for external generators */}
            {kit.logo_prompts && kit.logo_prompts.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Prompts for Midjourney / DALL-E / Canva AI
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Want more variations? Paste these into any other AI image tool.
                </p>
                <div className="space-y-2">
                  {kit.logo_prompts.map((p, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-gray-200 bg-gray-50 relative group"
                    >
                      <p className="text-xs text-gray-700 italic leading-relaxed pr-8">
                        {p}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(p)}
                        className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VOICE */}
        {activeSection === "voice" && kit.brand_voice && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Voice Description
              </h3>
              <EditableField
                value={kit.brand_voice.description}
                onSave={(v) => updateField("brand_voice.description", v)}
                multiline
                className="text-sm text-gray-700 leading-relaxed"
              />
            </div>

            {kit.brand_voice.adjectives && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Voice Adjectives
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {kit.brand_voice.adjectives.map((a, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-[#075a01]/10 text-[#075a01] font-semibold rounded-full border border-[#075a01]/20"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {kit.brand_voice.dos && (
                <div>
                  <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                    Do
                  </h3>
                  <ul className="space-y-1.5">
                    {kit.brand_voice.dos.map((d, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-700 pl-4 relative before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {kit.brand_voice.donts && (
                <div>
                  <h3 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                    Don't
                  </h3>
                  <ul className="space-y-1.5">
                    {kit.brand_voice.donts.map((d, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-700 pl-4 relative before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-red-500 before:rounded-full"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ASSETS */}
        {activeSection === "assets" && (
          <div className="space-y-5">
            {kit.taglines && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Tagline Variations
                </h3>
                <div className="space-y-2">
                  {kit.taglines.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-gray-200 bg-white flex items-center justify-between group"
                    >
                      <span className="text-sm text-gray-700">{t}</span>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(t)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-700"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {kit.social_bios && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Social Media Bios
                </h3>
                <div className="space-y-3">
                  {Object.entries(kit.social_bios).map(([platform, bio]) => (
                    <div
                      key={platform}
                      className="p-3 rounded-xl border border-gray-200 bg-white"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-700">
                          {platform}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(bio)}
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!canExportZip && (
        <div className="px-5 py-4 border-t border-gray-100 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">
                Get the complete ZIP with Pro
              </p>
              <p className="text-xs text-gray-600">
                Logos, colors, fonts, templates, business cards, brand guidelines — all in one download.
              </p>
            </div>
            <a
              href="/pricing"
              className="flex-shrink-0 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              Upgrade
            </a>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Share your brand kit
              </h3>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Anyone with this link can view your brand kit.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#075a01] px-4 py-2 rounded-xl hover:opacity-90 transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-3 text-sm text-[#075a01] font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
        </div>
      )}
    </div>
  );
}