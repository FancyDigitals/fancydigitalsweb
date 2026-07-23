"use client";

import { useState, useEffect } from "react";
import {
  Shield, Plus, Trash2, Save, ChevronDown, ChevronUp,
  Check, Loader2, Lock,
} from "lucide-react";

const TONE_OPTIONS = [
  "Professional", "Casual", "Playful", "Bold", "Inspirational",
  "Educational", "Humorous", "Luxurious", "Minimalist", "Empathetic",
];

const EMPTY_BRAND = {
  name: "",
  industry: "",
  audience: "",
  tone: "",
  voice_notes: "",
  colors: "",
  avoid: "",
};

export default function BrandVault({ userPlan, brandVaultSlots, onSelectBrand }) {
  const [brands,    setBrands]   = useState([]);
  const [loading,   setLoading]  = useState(true);
  const [saving,    setSaving]   = useState(false);
  const [open,      setOpen]     = useState(false);
  const [creating,  setCreating] = useState(false);
  const [form,      setForm]     = useState(EMPTY_BRAND);
  const [savedMsg,  setSavedMsg] = useState("");
  const [error,     setError]    = useState("");

  const canUse    = brandVaultSlots > 0;
  const slotsLeft = brandVaultSlots === Infinity
    ? "∞"
    : Math.max(0, brandVaultSlots - brands.length);

  /* ── Load brands ── */
  useEffect(() => {
    if (!canUse) { setLoading(false); return; }
    fetch("/api/brand-vault")
      .then((r) => r.json())
      .then((d) => { if (d.success) setBrands(d.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [canUse]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  /* ── Save brand ── */
  const handleSave = async () => {
    if (!form.name.trim()) { setError("Brand name is required"); return; }
    setSaving(true);
    setError("");
    try {
      const res  = await fetch("/api/brand-vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setBrands((prev) => [data.data, ...prev]);
        setForm(EMPTY_BRAND);
        setCreating(false);
        setSavedMsg("Brand saved!");
        setTimeout(() => setSavedMsg(""), 2500);
      } else {
        setError(data.error || "Failed to save brand");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setSaving(false);
  };

  /* ── Delete brand ── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this brand from the vault?")) return;
    try {
      await fetch(`/api/brand-vault?id=${id}`, { method: "DELETE" });
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } catch {}
  };

  /* ── Select brand → inject into form ── */
  const handleSelect = (brand) => {
    onSelectBrand?.({
      brand_name: brand.name,
      industry:   brand.industry,
      audience:   brand.audience,
      tone:       brand.tone,
    });
    setSavedMsg(`"${brand.name}" loaded into form`);
    setTimeout(() => setSavedMsg(""), 2500);
    setOpen(false);
  };

  if (!canUse) {
    return (
      <div className="rounded-2xl border border-dashed border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
            <Lock className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800">Brand Vault — Pro Feature</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Save brand profiles and auto-fill forms. Upgrade to Pro for 3 slots, Agency for unlimited.
            </p>
          </div>
          <a href="/pricing" className="ml-auto shrink-0 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition">
            Upgrade
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition text-left"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#075a01]/10 shrink-0">
          <Shield className="h-4 w-4 text-[#075a01]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800">Brand Vault</p>
          <p className="text-xs text-gray-500">
            {brands.length} saved · {slotsLeft} slots remaining
          </p>
        </div>
        {savedMsg && <span className="text-xs font-semibold text-[#075a01]">{savedMsg}</span>}
        {open ? <ChevronUp className="h-4 w-4 text-gray-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4 space-y-4">
          {/* Saved brands */}
          {loading ? (
            <div className="flex items-center gap-2 py-4 justify-center text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs">Loading brands...</span>
            </div>
          ) : brands.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-3">No brands saved yet.</p>
          ) : (
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 hover:border-[#075a01]/20 transition group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{brand.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {[brand.industry, brand.tone].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelect(brand)}
                    className="shrink-0 rounded-lg bg-[#075a01] px-2.5 py-1.5 text-[10px] font-bold text-white hover:bg-[#064c01] transition opacity-0 group-hover:opacity-100"
                  >
                    Use
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add new brand */}
          {!creating ? (
            <button
              onClick={() => setCreating(true)}
              disabled={slotsLeft === 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-2.5 text-xs font-bold text-gray-500 hover:border-[#075a01] hover:text-[#075a01] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" />
              {slotsLeft === 0 ? "Vault full — upgrade for more slots" : "Save new brand"}
            </button>
          ) : (
            <div className="rounded-xl border border-[#075a01]/20 bg-[#075a01]/5 p-4 space-y-3">
              <p className="text-xs font-black uppercase tracking-wider text-[#075a01]">New Brand Profile</p>

              {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="vault-label">Brand Name *</label>
                  <input value={form.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Acme Inc."
                    className="vault-input" />
                </div>
                <div>
                  <label className="vault-label">Industry</label>
                  <input value={form.industry} onChange={(e) => set("industry", e.target.value)}
                    placeholder="E-commerce, SaaS..."
                    className="vault-input" />
                </div>
              </div>

              <div>
                <label className="vault-label">Target Audience</label>
                <input value={form.audience} onChange={(e) => set("audience", e.target.value)}
                  placeholder="Who is your ideal customer?"
                  className="vault-input" />
              </div>

              <div>
                <label className="vault-label">Brand Tone</label>
                <select value={form.tone} onChange={(e) => set("tone", e.target.value)} className="vault-input">
                  <option value="">Select tone...</option>
                  {TONE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="vault-label">Voice Notes (Optional)</label>
                <textarea value={form.voice_notes} onChange={(e) => set("voice_notes", e.target.value)}
                  rows={2} placeholder="Anything specific about how this brand communicates..."
                  className="vault-input resize-none" />
              </div>

              <div>
                <label className="vault-label">Topics / Keywords to Avoid (Optional)</label>
                <input value={form.avoid} onChange={(e) => set("avoid", e.target.value)}
                  placeholder="e.g. competitors, politics, religion"
                  className="vault-input" />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 rounded-xl bg-[#075a01] px-4 py-2 text-xs font-bold text-white hover:bg-[#064c01] disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  {saving ? "Saving..." : "Save Brand"}
                </button>
                <button
                  onClick={() => { setCreating(false); setForm(EMPTY_BRAND); setError(""); }}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .vault-label {
          display: block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #374151;
          margin-bottom: 5px;
        }
        .vault-input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #d1fae5;
          background: white;
          padding: 7px 11px;
          font-size: 13px;
          color: #111827;
          outline: none;
        }
        .vault-input:focus {
          border-color: #075a01;
          box-shadow: 0 0 0 3px rgba(7,90,1,0.08);
        }
      `}</style>
    </div>
  );
}