"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText, Loader2, Download, AlertCircle, Zap, ArrowLeft, Sparkles,
  Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Plus, Trash2,
  Link2, Globe, Lock, CheckCircle2, Star, ArrowRight, Crown, User, Target,
} from "lucide-react";

const STORAGE_KEY = "fancy_resume_builder_form_v1";
const BASIC_TEMPLATE = "basic";

const COLOR_OPTIONS = [
  { color: "", name: "Default" },
  { color: "#075a01", name: "Green" },
  { color: "#1e3a5f", name: "Navy" },
  { color: "#7c3aed", name: "Purple" },
  { color: "#dc2626", name: "Red" },
  { color: "#ea580c", name: "Orange" },
  { color: "#0369a1", name: "Blue" },
];

const DEFAULT_COLORS = {
  basic: "#111827",
  modern: "#075a01",
  professional: "#1e3a5f",
  creative: "#7c3aed",
  minimal: "#111827",
  tech: "#22c55e",
};

export default function ResumeBuilderClient({ isPro, initialUsage, limit, userEmail, userName, templates }) {
  const loadSaved = () => {
    if (typeof window === "undefined") return null;
    try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : null; } catch { return null; }
  };
  const savedData = loadSaved();

  const [form, setForm] = useState(savedData?.form || {
    fullName: userName || "", email: userEmail || "", phone: "", location: "",
    linkedIn: "", portfolio: "", targetRole: "", yearsExperience: "", summary: "",
    skills: "", jobDescription: "", photo: "",
  });
  const [experiences, setExperiences] = useState(savedData?.experiences || [{ role: "", company: "", duration: "", location: "", description: "" }]);
  const [educations, setEducations] = useState(savedData?.educations || [{ degree: "", school: "", year: "", details: "" }]);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(initialUsage);
  const [selectedTemplate, setSelectedTemplate] = useState(BASIC_TEMPLATE);
  const [accentColor, setAccentColor] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [atsTips, setAtsTips] = useState([]);
  const [jobMatch, setJobMatch] = useState(null);
  const [optimizing, setOptimizing] = useState(false);
const [optimizeSuccess, setOptimizeSuccess] = useState(false);

  const remaining = isPro ? "∞" : Math.max(0, limit - usage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, experiences, educations })); } catch (e) { console.warn(e); }
  }, [form, experiences, educations]);

  function updateField(key, value) { setForm((prev) => ({ ...prev, [key]: value })); }
  function handlePhotoUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Photo must be less than 2MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => updateField("photo", reader.result);
    reader.readAsDataURL(file);
  }
  function removePhoto() { updateField("photo", ""); }
  function updateExperience(i, k, v) { const u = [...experiences]; u[i][k] = v; setExperiences(u); }
  function addExperience() { setExperiences([...experiences, { role: "", company: "", duration: "", location: "", description: "" }]); }
  function removeExperience(i) { if (experiences.length > 1) setExperiences(experiences.filter((_, x) => x !== i)); }
  function updateEducation(i, k, v) { const u = [...educations]; u[i][k] = v; setEducations(u); }
  function addEducation() { setEducations([...educations, { degree: "", school: "", year: "", details: "" }]); }
  function removeEducation(i) { if (educations.length > 1) setEducations(educations.filter((_, x) => x !== i)); }

  function calculateATSScore(r) {
    let score = 0; const tips = [];
    if (r.summary && r.summary.length > 50) score += 15; else tips.push("Add a strong professional summary (50+ words)");
    if (r.skills?.length >= 8) score += 15; else if (r.skills?.length >= 5) { score += 10; tips.push("Add more relevant skills (aim for 8-12)"); } else tips.push("Add at least 8 relevant skills for ATS detection");
    const verbs = ["led","built","developed","managed","increased","reduced","launched","improved","designed","created","optimized","implemented","achieved","delivered"];
    const allB = r.experience?.flatMap((e) => e.bullets || []).join(" ").toLowerCase() || "";
    const vc = verbs.filter((v) => allB.includes(v)).length;
    if (vc >= 5) score += 15; else if (vc >= 3) score += 10; else tips.push("Use more action verbs (led, built, developed, increased, launched)");
    if (/\d+%|\$\d+|\d+\+?\s*(users|customers|projects|teams|people|x)/i.test(allB)) score += 15; else tips.push("Add quantifiable metrics (e.g. 'increased revenue by 40%')");
    const contacts = [r.contact?.email, r.contact?.phone].filter(Boolean).length;
    if (contacts >= 2) score += 10; else tips.push("Add email AND phone for complete contact info");
    if (r.experience?.length >= 2) score += 10; else if (r.experience?.length === 1) score += 5;
    if (r.education?.length >= 1) score += 10;
    const dates = r.experience?.map((e) => e.duration).filter(Boolean).length || 0;
    if (dates >= 1) score += 10; else tips.push("Include dates for all experience entries");
    return { score: Math.min(100, score), tips };
  }

  function calculateJobMatch(r, jd) {
    if (!jd || jd.trim().length < 50) return null;
    const stop = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","must","shall","can","need","we","you","your","our","their","this","that","these","those","as","from","about","into","through","during","before","after","above","below","between","under","over","such","all","any","each","every","some","many","more","most","other","another","no","not","only","own","same","than","too","very","just","also","well","team","work","role","job","position","company","candidate","ideal"]);
    const words = jd.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !stop.has(w));
    const wc = {}; words.forEach((w) => { wc[w] = (wc[w] || 0) + 1; });
    const keywords = Object.entries(wc).filter(([w, c]) => c >= 2 || w.length >= 6).map(([w]) => w).slice(0, 30);
    const text = [r.summary || "", r.title || "", ...(r.skills || []), ...(r.experience?.flatMap((e) => [e.role, e.company, ...(e.bullets || [])]) || []), ...(r.education?.flatMap((e) => [e.degree, e.school]) || [])].join(" ").toLowerCase();
    const matched = [], missing = [];
    keywords.forEach((kw) => { if (text.includes(kw)) matched.push(kw); else missing.push(kw); });
    const total = keywords.length;
    return { score: total > 0 ? Math.round((matched.length / total) * 100) : 0, matched: matched.slice(0, 15), missing: missing.slice(0, 10), totalKeywords: total };
  }

  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true); setError(""); setResume(null); setAtsScore(null); setAtsTips([]); setJobMatch(null);
    let tplToUse = selectedTemplate;
    if (!isPro && templates.find((t) => t.id === selectedTemplate)?.pro) tplToUse = BASIC_TEMPLATE;
    try {
      const res = await fetch("/api/tools/ai-resume-builder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, experiences, educations, template: tplToUse }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Generation failed"); setLoading(false); return; }
      setResume(data.resume); setUsage(data.usage.used);
      const { score, tips } = calculateATSScore(data.resume); setAtsScore(score); setAtsTips(tips);
      if (form.jobDescription && form.jobDescription.length > 50) { setJobMatch(calculateJobMatch(data.resume, form.jobDescription)); } else setJobMatch(null);
      setTimeout(() => {
        const el = document.getElementById("resume-result"); if (!el) return;
        const yOffset = window.innerWidth < 1024 ? -70 : -20;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);
    } catch (err) { setError("Network error. Please try again."); } finally { setLoading(false); }
  }

  async function handleOptimizeResume() {
  if (!isPro) {
    alert("Resume optimization is a Pro feature.");
    return;
  }
  if (!resume || !form.jobDescription) {
    alert("Generate a resume with a job description first.");
    return;
  }

  setOptimizing(true);
  setOptimizeSuccess(false);

  try {
    const res = await fetch("/api/tools/ai-resume-optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume,
        jobDescription: form.jobDescription,
        missingKeywords: jobMatch?.missing || [],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Optimization failed");
      setOptimizing(false);
      return;
    }

    setResume(data.resume);

    // Recalculate scores with optimized resume
    const { score, tips } = calculateATSScore(data.resume);
    setAtsScore(score);
    setAtsTips(tips);

    if (form.jobDescription) {
      setJobMatch(calculateJobMatch(data.resume, form.jobDescription));
    }

    setOptimizeSuccess(true);
    setTimeout(() => setOptimizeSuccess(false), 5000);

    // Scroll to result
    setTimeout(() => {
      const el = document.getElementById("resume-result");
      if (!el) return;
      const yOffset = window.innerWidth < 1024 ? -70 : -20;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 200);
  } catch (err) {
    alert("Network error. Please try again.");
  } finally {
    setOptimizing(false);
  }
}

  async function handleDownload(format = "html") {
    if (format === "pdf") {
      if (!isPro) { alert("PDF download is a Pro feature. Upgrade to unlock."); return; }
      const html = generateResumeHTML(resume, isPro, selectedTemplate, accentColor);
      const w = window.open("", "_blank");
      if (!w) { alert("Please allow pop-ups to download PDF"); return; }
      w.document.write(html); w.document.close();
      w.onload = () => setTimeout(() => w.print(), 250);
      return;
    }
    const html = generateResumeHTML(resume, isPro, selectedTemplate, accentColor);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${resume.fullName.replace(/\s+/g, "_")}_Resume.html`;
    a.click(); URL.revokeObjectURL(url);
  }

  function handlePrint() { window.print(); }
  function handleSelectTemplate(id) {
    const tpl = templates.find((t) => t.id === id);
    if (tpl?.pro && !isPro) return;
    setSelectedTemplate(id);
  }

  const inputClass = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <>
      {loading && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-50 bg-gradient-to-r from-[#075a01] to-[#0a8f01] text-white p-3 shadow-lg animate-slide-down">
          <div className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /><p className="text-sm font-bold">Crafting your resume...</p></div>
        </div>
      )}

      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div style={{ background: "linear-gradient(to bottom right, #075a01, #0a8f01)" }} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">AI Resume Builder</h1>
            <p className="text-xs sm:text-sm text-gray-500">Professional ATS-optimized resumes in 30 seconds</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <Zap className="h-4 w-4 text-[#075a01]" />
          <span className="text-gray-600">
            {isPro ? <span className="font-semibold text-[#075a01]">Pro — Unlimited</span> : <><span className="font-bold text-gray-900">{remaining}</span> of <span className="font-semibold">{limit}</span> remaining today</>}
          </span>
        </div>
        {!isPro && <Link href="/pricing" className="text-xs font-bold text-[#075a01] hover:underline">Upgrade →</Link>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleGenerate} className="rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-sm space-y-6">
          {/* Personal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Personal Information</h3>
            <div>
              <label className={labelClass}>Profile Photo <span className="text-xs text-gray-400">(optional)</span></label>
              <div className="flex items-center gap-3">
                {form.photo ? (
                  <div className="relative">
                    <img src={form.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover border-2 border-gray-200" />
                    <button type="button" onClick={removePhoto} className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-600">×</button>
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 border-2 border-dashed border-gray-300"><User className="h-6 w-6 text-gray-400" /></div>
                )}
                <div className="flex-1">
                  <label className="cursor-pointer inline-block">
                    <span className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">{form.photo ? "Change Photo" : "Upload Photo"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <p className="text-[10px] text-gray-400 mt-1">JPG/PNG, max 2MB. Skip if applying in US/UK.</p>
                </div>
              </div>
            </div>
            <div><label className={labelClass}>Full Name *</label><input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} required placeholder="John Doe" className={inputClass} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@email.com" className={inputClass} /></div>
              <div><label className={labelClass}>Phone</label><input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+234 800 000 0000" className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Location</label><input value={form.location} onChange={(e) => updateField("location", e.target.value)} placeholder="Lagos, Nigeria" className={inputClass} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className={labelClass}><span className="flex items-center gap-1"><Link2 className="h-3 w-3" /> LinkedIn</span></label><input value={form.linkedIn} onChange={(e) => updateField("linkedIn", e.target.value)} placeholder="linkedin.com/in/yourname" className={inputClass} /></div>
              <div><label className={labelClass}><span className="flex items-center gap-1"><Globe className="h-3 w-3" /> Portfolio</span></label><input value={form.portfolio} onChange={(e) => updateField("portfolio", e.target.value)} placeholder="yourwebsite.com" className={inputClass} /></div>
            </div>
          </div>

          {/* Career */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Career Target</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className={labelClass}>Target Role *</label><input value={form.targetRole} onChange={(e) => updateField("targetRole", e.target.value)} required placeholder="e.g. Senior Frontend Developer" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Years of Experience</label>
                <select value={form.yearsExperience} onChange={(e) => updateField("yearsExperience", e.target.value)} className={inputClass}>
                  <option value="">Select...</option><option value="Less than 1 year">Less than 1 year</option><option value="1-2 years">1-2 years</option><option value="3-5 years">3-5 years</option><option value="5-7 years">5-7 years</option><option value="7-10 years">7-10 years</option><option value="10+ years">10+ years</option><option value="15+ years">15+ years</option>
                </select>
              </div>
            </div>
            <div><label className={labelClass}>Professional Summary <span className="text-xs text-gray-400">(optional)</span></label><textarea value={form.summary} onChange={(e) => updateField("summary", e.target.value)} rows={3} placeholder="Let AI write this for you, or paste your own" className={inputClass} /></div>
          </div>

          {/* Experience */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Work Experience</h3>
              <button type="button" onClick={addExperience} className="flex items-center gap-1 text-xs font-bold text-[#075a01] hover:underline"><Plus className="h-3 w-3" /> Add Job</button>
            </div>
            {experiences.map((exp, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-4 space-y-3 relative">
                {experiences.length > 1 && <button type="button" onClick={() => removeExperience(i)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>}
                <p className="text-xs font-bold text-gray-500">Job #{i + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Role / Title" className={inputClass} />
                  <input value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Company" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} placeholder="e.g. Jan 2022 - Present" className={inputClass} />
                  <input value={exp.location} onChange={(e) => updateExperience(i, "location", e.target.value)} placeholder="Location" className={inputClass} />
                </div>
                <textarea value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} rows={3} placeholder="What did you do? Achievements, metrics..." className={inputClass} />
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><GraduationCap className="h-3 w-3" /> Education</h3>
              <button type="button" onClick={addEducation} className="flex items-center gap-1 text-xs font-bold text-[#075a01] hover:underline"><Plus className="h-3 w-3" /> Add Education</button>
            </div>
            {educations.map((edu, i) => (
              <div key={i} className="rounded-xl border border-gray-100 p-4 space-y-3 relative">
                {educations.length > 1 && <button type="button" onClick={() => removeEducation(i)} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>}
                <p className="text-xs font-bold text-gray-500">Education #{i + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="e.g. BSc Computer Science" className={inputClass} />
                  <input value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} placeholder="e.g. University of Lagos" className={inputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input value={edu.year} onChange={(e) => updateEducation(i, "year", e.target.value)} placeholder="e.g. 2018 - 2022" className={inputClass} />
                  <input value={edu.details} onChange={(e) => updateEducation(i, "details", e.target.value)} placeholder="GPA, honors (optional)" className={inputClass} />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Award className="h-3 w-3" /> Skills</h3>
            <textarea value={form.skills} onChange={(e) => updateField("skills", e.target.value)} rows={2} placeholder="e.g. React, Node.js, TypeScript, Team Leadership" className={inputClass} />
            <p className="text-xs text-gray-400">Comma-separated. AI may add relevant skills.</p>
          </div>

          {/* Job Description */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Tailor to a Job (Optional)</h3>
            <textarea value={form.jobDescription} onChange={(e) => updateField("jobDescription", e.target.value)} rows={4} placeholder="Paste job description for ATS keyword optimization..." className={inputClass} />
          </div>

          {/* Template Selector */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Choose Template</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {templates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                const isLocked = tpl.pro && !isPro;
                return (
                  <button key={tpl.id} type="button" onClick={() => handleSelectTemplate(tpl.id)} className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${isSelected ? "border-[#075a01] bg-[#075a01]/5" : isLocked ? "border-gray-200 bg-gray-50 opacity-70" : "border-gray-200 hover:border-gray-300"}`}>
                    <div className="h-8 w-6 rounded border mb-2" style={{ backgroundColor: tpl.accent }} />
                    <p className="text-xs font-bold text-gray-900">{tpl.name}</p>
                    <p className="text-[10px] text-gray-500">{tpl.description}</p>
                    {isLocked && <div className="absolute top-1.5 right-1.5"><Lock className="h-3 w-3 text-gray-400" /></div>}
                    {isSelected && !isLocked && <div className="absolute top-1.5 right-1.5"><CheckCircle2 className="h-4 w-4 text-[#075a01]" /></div>}
                    {tpl.pro && !isLocked && <div className="absolute top-1.5 left-1.5"><Star className="h-3 w-3 text-amber-500 fill-current" /></div>}
                  </button>
                );
              })}
            </div>
            {!isPro && (
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5">
                <Crown className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900"><strong>5 premium templates</strong> are Pro-only. <Link href="/pricing" className="font-bold underline">Upgrade to unlock</Link></p>
              </div>
            )}
          </div>

          {/* Color Picker */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Accent Color</h3>
              {!isPro && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Pro</span>}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {COLOR_OPTIONS.map((opt) => {
                const isSelected = accentColor === opt.color;
                const isLocked = !isPro && opt.color !== "";
                return (
                  <button key={opt.color || "default"} type="button" onClick={() => !isLocked && setAccentColor(opt.color)} disabled={isLocked} title={isLocked ? `${opt.name} (Pro)` : opt.name}
                    className={`relative h-10 w-full rounded-lg border-2 transition-all ${isSelected ? "border-gray-900 scale-110" : isLocked ? "border-gray-200 opacity-50 cursor-not-allowed" : "border-gray-200 hover:scale-105"}`}
                    style={{ background: opt.color || "linear-gradient(135deg, #6b7280, #9ca3af)" }}>
                    {isSelected && <CheckCircle2 className="absolute top-1 right-1 h-3 w-3 text-white drop-shadow" />}
                    {isLocked && <Lock className="absolute top-1 right-1 h-3 w-3 text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>
            {!isPro && <p className="text-xs text-gray-500"><Link href="/pricing" className="text-[#075a01] font-bold hover:underline">Upgrade to Pro</Link> to customize colors</p>}
            {isPro && accentColor && <p className="text-xs text-gray-500">Custom color applied. <button type="button" onClick={() => setAccentColor("")} className="text-[#075a01] font-bold hover:underline">Reset</button></p>}
          </div>

          <button type="submit" disabled={loading || !form.fullName || !form.targetRole}
            style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating Resume...</> : <><Sparkles className="h-4 w-4" /> Generate My Resume</>}
          </button>

          <button type="button" onClick={() => { if (confirm("Clear all form data?")) { localStorage.removeItem(STORAGE_KEY); window.location.reload(); } }}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition mt-2">
            <Trash2 className="h-3 w-3" /> Clear saved form data
          </button>
        </form>

        {/* RESULT */}
        <div id="resume-result" className="lg:sticky lg:top-6 lg:self-start scroll-mt-20">
          {!resume && !loading && !error && (
            <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mb-4"><FileText className="h-8 w-8 text-gray-300" /></div>
              <p className="font-bold text-gray-900 mb-1">Your resume will appear here</p>
              <p className="text-sm text-gray-500">Fill out the form and click Generate</p>
            </div>
          )}
          {loading && (
            <div className="rounded-2xl bg-white border border-gray-100 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[400px] shadow-sm">
              <Loader2 className="h-12 w-12 text-[#075a01] animate-spin mb-4" />
              <p className="font-bold text-gray-900 mb-1">Crafting your resume...</p>
              <p className="text-sm text-gray-500">Analyzing keywords, optimizing for ATS</p>
            </div>
          )}
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-red-800 mb-1">Generation Failed</p>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes("limit") && <Link href="/pricing" className="mt-3 inline-block text-sm font-bold text-red-700 underline">Upgrade to Pro for Unlimited →</Link>}
                </div>
              </div>
            </div>
          )}
          {resume && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <button onClick={handlePrint} className="flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <FileText className="h-4 w-4" /><span className="hidden sm:inline">Print</span>
                </button>
                <button onClick={() => handleDownload("html")} className="flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                  <Download className="h-4 w-4" /><span className="hidden sm:inline">HTML</span>
                </button>
                <button onClick={() => handleDownload("pdf")} style={{ background: isPro ? "linear-gradient(to right, #075a01, #0a8f01)" : "#e5e7eb", color: isPro ? "#fff" : "#9ca3af", cursor: isPro ? "pointer" : "not-allowed" }}
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold hover:opacity-90 active:scale-[0.98] transition" title={isPro ? "Download as PDF" : "PDF is a Pro feature"}>
                  {isPro ? <Download className="h-4 w-4" /> : <Lock className="h-4 w-4" />}<span className="hidden sm:inline">PDF</span>
                </button>
              </div>

              {atsScore !== null && (
                <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#075a01]" /><h3 className="text-sm font-bold text-gray-900">ATS Compatibility Score</h3></div>
                    <span className={`text-lg font-bold ${atsScore >= 80 ? "text-green-600" : atsScore >= 60 ? "text-amber-600" : "text-red-600"}`}>{atsScore}/100</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-3">
                    <div className={`h-full rounded-full transition-all ${atsScore >= 80 ? "bg-green-500" : atsScore >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${atsScore}%` }} />
                  </div>
                  {atsScore >= 80 ? (
                    <p className="text-xs text-green-700 flex items-start gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />Excellent! Your resume is well-optimized for ATS systems.</p>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Suggestions to improve:</p>
                      <ul className="space-y-1">{atsTips.map((tip, i) => <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5"><AlertCircle className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />{tip}</li>)}</ul>
                    </>
                  )}
                </div>
              )}

              {jobMatch && (
  <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-purple-600" />
        <h3 className="text-sm font-bold text-gray-900">Job Match Score</h3>
        {!isPro && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Pro Preview</span>}
      </div>
      <span className={`text-lg font-bold ${jobMatch.score >= 75 ? "text-green-600" : jobMatch.score >= 50 ? "text-amber-600" : "text-red-600"}`}>{jobMatch.score}%</span>
    </div>

    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden mb-3">
      <div className={`h-full rounded-full transition-all ${jobMatch.score >= 75 ? "bg-green-500" : jobMatch.score >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${jobMatch.score}%` }} />
    </div>

    {optimizeSuccess && (
      <div className="mb-3 rounded-lg bg-green-50 border border-green-200 p-2.5 flex items-start gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
        <p className="text-xs text-green-800">
          <strong>Resume optimized!</strong> Your match score should now be higher.
        </p>
      </div>
    )}

    {jobMatch.matched.length > 0 && (
      <div className="mb-3">
        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">✓ Matched Keywords ({jobMatch.matched.length})</p>
        <div className="flex flex-wrap gap-1">
          {jobMatch.matched.slice(0, isPro ? 15 : 5).map((kw, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">{kw}</span>
          ))}
          {!isPro && jobMatch.matched.length > 5 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-400 font-semibold">+{jobMatch.matched.length - 5} more (Pro)</span>
          )}
        </div>
      </div>
    )}

    {jobMatch.missing.length > 0 && (
      <div className="mb-3">
        <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">✗ Missing Keywords ({jobMatch.missing.length})</p>
        <div className="flex flex-wrap gap-1">
          {jobMatch.missing.slice(0, isPro ? 10 : 3).map((kw, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-600 font-semibold border border-red-100">{kw}</span>
          ))}
          {!isPro && jobMatch.missing.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-400 font-semibold">+{jobMatch.missing.length - 3} more (Pro)</span>
          )}
        </div>
      </div>
    )}

    {/* AI AUTO-FIX BUTTON */}
    {jobMatch.score < 90 && jobMatch.missing.length > 0 && (
      <div className="mt-4 pt-4 border-t border-gray-100">
        {isPro ? (
          <button
            onClick={handleOptimizeResume}
            disabled={optimizing}
            style={{
              background: optimizing
                ? "#9ca3af"
                : "linear-gradient(to right, #7c3aed, #ec4899)",
              color: "#ffffff",
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed transition-all"
          >
            {optimizing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI is optimizing your resume...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Auto-Fix My Resume (AI)
              </>
            )}
          </button>
        ) : (
          <Link
            href="/pricing"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-100 hover:bg-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition-all border-2 border-dashed border-gray-300"
          >
            <Lock className="h-4 w-4" />
            Unlock AI Auto-Fix (Pro)
          </Link>
        )}
        <p className="mt-2 text-[10px] text-gray-500 text-center">
          {isPro
            ? "AI will rewrite your resume to naturally include missing keywords"
            : "Pro users can auto-optimize resumes to match any job in seconds"}
        </p>
      </div>
    )}

    {jobMatch.score >= 90 && (
      <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-2.5 flex items-start gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
        <p className="text-xs text-green-800">
          <strong>Excellent match!</strong> Your resume is well-aligned with this job.
        </p>
      </div>
    )}
  </div>
)}

              <div id="resume-print" className="rounded-2xl bg-white border border-gray-100 p-6 sm:p-8 shadow-sm print:shadow-none print:border-none">
                {!isPro && (
                  <div className="mb-4 rounded-xl bg-gradient-to-r from-[#075a01]/10 to-[#0a8f01]/10 border border-[#075a01]/20 p-3 print:hidden">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-[#075a01] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">Want premium templates & no footer?</p>
                        <Link href="/pricing" className="text-xs font-bold text-[#075a01] hover:underline">See Pro features →</Link>
                      </div>
                    </div>
                  </div>
                )}
                {selectedTemplate === "basic" && <BasicTemplate resume={resume} accent={accentColor} />}
                {selectedTemplate === "modern" && <ModernTemplate resume={resume} accent={accentColor} />}
                {selectedTemplate === "professional" && <ProfessionalTemplate resume={resume} accent={accentColor} />}
                {selectedTemplate === "creative" && <CreativeTemplate resume={resume} accent={accentColor} />}
                {selectedTemplate === "minimal" && <MinimalTemplate resume={resume} accent={accentColor} />}
                {selectedTemplate === "tech" && <TechTemplate resume={resume} accent={accentColor} />}
              </div>

              <div className="rounded-xl bg-[#075a01]/10 border border-[#075a01]/20 p-4 print:hidden">
                <div className="flex items-start gap-3">
                  <div style={{ background: "linear-gradient(to bottom right, #075a01, #0a8f01)" }} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"><Sparkles className="h-5 w-5 text-white" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">Need a matching cover letter?</p>
                    <p className="text-xs text-gray-600 mt-0.5">We'll auto-fill it from this resume.</p>
                  </div>
                  <Link href="/dashboard/tools/ai-cover-letter?from=resume" style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }} className="shrink-0 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold hover:opacity-90 active:scale-95 transition">
                    Generate <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #resume-print, #resume-print * { visibility: visible; }
          #resume-print { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </>
  );
}

/* ============================ HELPERS ============================ */
function hexWithAlpha(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `${hex}${a}`;
}

/* ============================ BASIC TEMPLATE ============================ */
function BasicTemplate({ resume, accent }) {
  const color = accent || "#111827";
  const photo = resume.photo;
  return (
    <div className="bg-white text-gray-900">
      <div className="flex items-start gap-5 pb-5 mb-5 border-b-2" style={{ borderColor: color }}>
        {photo && <img src={photo} alt={resume.fullName} className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 shrink-0" />}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">{resume.fullName}</h2>
          <p className="text-base text-gray-600 mt-1">{resume.title}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[13px] text-gray-600">
            {resume.contact?.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{resume.contact.email}</span>}
            {resume.contact?.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{resume.contact.phone}</span>}
            {resume.contact?.location && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{resume.contact.location}</span>}
            {resume.contact?.linkedIn && <span className="flex items-center gap-1.5"><Link2 className="h-3 w-3" />{resume.contact.linkedIn}</span>}
            {resume.contact?.portfolio && <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" />{resume.contact.portfolio}</span>}
          </div>
        </div>
      </div>
      {resume.summary && (
        <div className="mb-5">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color }}>Professional Summary</h3>
          <p className="text-[13px] text-gray-700 leading-[1.7]">{resume.summary}</p>
        </div>
      )}
      {resume.experience?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3 pb-1 border-b border-gray-300" style={{ color }}>Experience</h3>
          <div className="space-y-4">
            {resume.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline gap-3"><p className="font-bold text-[14px] text-gray-900">{exp.role}</p><p className="text-xs text-gray-500 whitespace-nowrap">{exp.duration}</p></div>
                <p className="text-[13px] text-gray-700 italic mb-1.5">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                <ul className="space-y-1 pl-4">{exp.bullets?.map((b, j) => <li key={j} className="text-[12.5px] text-gray-700 leading-[1.65] list-disc list-outside">{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.education?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3 pb-1 border-b border-gray-300" style={{ color }}>Education</h3>
          <div className="space-y-2">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline gap-3">
                <div className="flex-1 min-w-0"><p className="font-bold text-[13px] text-gray-900">{edu.degree}</p><p className="text-[12px] text-gray-600">{edu.school}{edu.details ? ` · ${edu.details}` : ""}</p></div>
                <p className="text-xs text-gray-500 whitespace-nowrap">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.skills?.length > 0 && (
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2 pb-1 border-b border-gray-300" style={{ color }}>Skills</h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {resume.skills.map((s, i) => <span key={i} className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-700">{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ MODERN TEMPLATE ============================ */
function ModernTemplate({ resume, accent }) {
  const color = accent || "#075a01";
  const photo = resume.photo;
  return (
    <div className="bg-white">
      <div className="pb-6 mb-6 border-b-4" style={{ borderColor: color }}>
        <div className="flex items-start gap-5">
          {photo && <img src={photo} alt={resume.fullName} className="h-24 w-24 rounded-full object-cover shrink-0" style={{ boxShadow: `0 0 0 4px ${hexWithAlpha(color, 0.2)}` }} />}
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">{resume.fullName}</h2>
            <p className="text-base mt-1 font-semibold uppercase tracking-wider" style={{ color }}>{resume.title}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[12px] text-gray-600">
              {resume.contact?.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" style={{ color }} />{resume.contact.email}</span>}
              {resume.contact?.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" style={{ color }} />{resume.contact.phone}</span>}
              {resume.contact?.location && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" style={{ color }} />{resume.contact.location}</span>}
              {resume.contact?.linkedIn && <span className="flex items-center gap-1.5"><Link2 className="h-3 w-3" style={{ color }} />{resume.contact.linkedIn}</span>}
              {resume.contact?.portfolio && <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" style={{ color }} />{resume.contact.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>
      {resume.summary && <div className="mb-6"><h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color }}>Profile</h3><p className="text-[13px] text-gray-700 leading-[1.75]">{resume.summary}</p></div>}
      {resume.experience?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color }}>Professional Experience</h3>
          <div className="space-y-5">
            {resume.experience.map((exp, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-gray-200">
                <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full" style={{ background: color }} />
                <div className="flex justify-between items-baseline gap-3"><p className="font-bold text-[14px] text-gray-900">{exp.role}</p><p className="text-xs font-medium text-gray-500 whitespace-nowrap">{exp.duration}</p></div>
                <p className="text-[13px] font-semibold mt-0.5" style={{ color }}>{exp.company}{exp.location && <span className="text-gray-500 font-normal"> · {exp.location}</span>}</p>
                <ul className="mt-2 space-y-1">{exp.bullets?.map((b, j) => <li key={j} className="text-[12.5px] text-gray-700 leading-[1.65] pl-3 relative"><span className="absolute left-0 top-[7px] h-1 w-1 rounded-full bg-gray-400" />{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.education?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color }}>Education</h3>
          <div className="space-y-2">
            {resume.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline gap-3">
                <div className="flex-1 min-w-0"><p className="font-bold text-[13px] text-gray-900">{edu.degree}</p><p className="text-[12px] text-gray-600">{edu.school}{edu.details && <span> · {edu.details}</span>}</p></div>
                <p className="text-xs font-medium text-gray-500 whitespace-nowrap">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.skills?.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color }}>Core Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((s, i) => <span key={i} className="text-[11px] px-2.5 py-1 rounded-md font-semibold border" style={{ background: hexWithAlpha(color, 0.08), color, borderColor: hexWithAlpha(color, 0.15) }}>{s}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ PROFESSIONAL TEMPLATE ============================ */
function ProfessionalTemplate({ resume, accent }) {
  const color = accent || "#1e3a5f";
  const photo = resume.photo;
  return (
    <div className="bg-white -m-6 sm:-m-8">
      <div className="text-white px-6 sm:px-8 py-6" style={{ background: color }}>
        <div className="flex items-start gap-5">
          {photo && <img src={photo} alt={resume.fullName} className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20 shrink-0" />}
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold tracking-tight">{resume.fullName}</h2>
            <p className="text-sm mt-1 uppercase tracking-[0.2em] font-semibold" style={{ color: hexWithAlpha("#ffffff", 0.75) }}>{resume.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px]" style={{ color: hexWithAlpha("#ffffff", 0.85) }}>
              {resume.contact?.email && <span>{resume.contact.email}</span>}
              {resume.contact?.phone && <span>· {resume.contact.phone}</span>}
              {resume.contact?.location && <span>· {resume.contact.location}</span>}
              {resume.contact?.linkedIn && <span>· {resume.contact.linkedIn}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {resume.summary && <div className="mb-5"><h3 className="text-[10px] font-bold uppercase tracking-[0.2em] pb-1 mb-2 border-b-2" style={{ color, borderColor: color }}>Executive Summary</h3><p className="text-[13px] text-gray-700 leading-[1.7]">{resume.summary}</p></div>}
          {resume.experience?.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] pb-1 mb-3 border-b-2" style={{ color, borderColor: color }}>Professional Experience</h3>
              <div className="space-y-4">
                {resume.experience.map((exp, i) => (
                  <div key={i}>
                    <p className="font-bold text-[13px] text-gray-900">{exp.company}</p>
                    <div className="flex justify-between items-baseline gap-3"><p className="text-[12px] italic font-semibold" style={{ color }}>{exp.role}</p><p className="text-[11px] text-gray-500 whitespace-nowrap">{exp.duration}</p></div>
                    {exp.location && <p className="text-[10px] text-gray-500 italic">{exp.location}</p>}
                    <ul className="mt-1.5 space-y-1 pl-4">{exp.bullets?.map((b, j) => <li key={j} className="text-[12px] text-gray-700 leading-[1.65] list-disc list-outside" style={{ color: "#374151" }}>{b}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1">
          {resume.contact?.portfolio && <div className="mb-5"><h3 className="text-[10px] font-bold uppercase tracking-[0.2em] pb-1 mb-2 border-b-2" style={{ color, borderColor: color }}>Portfolio</h3><p className="text-[11px] text-gray-700 break-all">{resume.contact.portfolio}</p></div>}
          {resume.education?.length > 0 && (
            <div className="mb-5">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] pb-1 mb-2 border-b-2" style={{ color, borderColor: color }}>Education</h3>
              <div className="space-y-2.5">
                {resume.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-[12px] font-bold text-gray-900 leading-tight">{edu.degree}</p>
                    <p className="text-[11px] text-gray-600">{edu.school}</p>
                    <p className="text-[10px] text-gray-500">{edu.year}</p>
                    {edu.details && <p className="text-[10px] text-gray-500 italic">{edu.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {resume.skills?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] pb-1 mb-2 border-b-2" style={{ color, borderColor: color }}>Core Competencies</h3>
              <div className="space-y-1.5">
                {resume.skills.map((s, i) => <div key={i} className="text-[11px] text-gray-700 flex items-center gap-1.5"><span className="h-1 w-1 rounded-full shrink-0" style={{ background: color }} />{s}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================ CREATIVE TEMPLATE ============================ */
function CreativeTemplate({ resume, accent }) {
  const color = accent || "#7c3aed";
  const color2 = accent || "#ec4899";
  const photo = resume.photo;
  return (
    <div className="bg-white">
      <div className="rounded-2xl p-6 mb-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color2} 100%)` }}>
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4">
          {photo && <img src={photo} alt={resume.fullName} className="h-24 w-24 rounded-full object-cover ring-4 ring-white/30 shrink-0" />}
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold tracking-tight leading-tight">{resume.fullName}</h2>
            <p className="text-base text-white/90 mt-1 font-medium">{resume.title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-white/85">
              {resume.contact?.email && <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{resume.contact.email}</span>}
              {resume.contact?.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{resume.contact.phone}</span>}
              {resume.contact?.location && <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{resume.contact.location}</span>}
            </div>
          </div>
        </div>
      </div>
      {resume.summary && <div className="mb-6"><h3 className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color }}><span className="h-1 w-6 rounded-full" style={{ background: `linear-gradient(to right, ${color}, ${color2})` }} />About Me</h3><p className="text-[13px] text-gray-700 leading-[1.75]">{resume.summary}</p></div>}
      {resume.experience?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color }}><span className="h-1 w-6 rounded-full" style={{ background: `linear-gradient(to right, ${color}, ${color2})` }} />Experience</h3>
          <div className="space-y-3">
            {resume.experience.map((exp, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ borderColor: hexWithAlpha(color, 0.2), background: `linear-gradient(135deg, ${hexWithAlpha(color, 0.04)}, ${hexWithAlpha(color2, 0.04)})` }}>
                <div className="flex justify-between items-baseline gap-3 mb-1"><p className="font-bold text-[14px] text-gray-900">{exp.role}</p><p className="text-[11px] font-semibold whitespace-nowrap" style={{ color }}>{exp.duration}</p></div>
                <p className="text-[12px] font-semibold mb-2" style={{ color: color2 }}>@ {exp.company}{exp.location && <span className="text-gray-500 font-normal"> · {exp.location}</span>}</p>
                <ul className="space-y-1">
                  {exp.bullets?.map((b, j) => <li key={j} className="text-[12.5px] text-gray-700 leading-[1.65] pl-4 relative"><span className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-full" style={{ background: `linear-gradient(135deg, ${color}, ${color2})` }} />{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.education?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color }}><span className="h-1 w-6 rounded-full" style={{ background: `linear-gradient(to right, ${color}, ${color2})` }} />Education</h3>
          <div className="space-y-3">
            {resume.education.map((edu, i) => (
              <div key={i} className="rounded-xl border p-4" style={{ borderColor: hexWithAlpha(color, 0.2), background: `linear-gradient(135deg, ${hexWithAlpha(color, 0.04)}, ${hexWithAlpha(color2, 0.04)})` }}>
                <div className="flex justify-between items-baseline gap-3">
                  <div className="flex-1 min-w-0"><p className="font-bold text-[13px] text-gray-900">{edu.degree}</p><p className="text-[12px] text-gray-600">{edu.school}{edu.details && <span> · {edu.details}</span>}</p></div>
                  <p className="text-[11px] font-semibold whitespace-nowrap" style={{ color }}>{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.skills?.length > 0 && (
        <div>
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color }}><span className="h-1 w-6 rounded-full" style={{ background: `linear-gradient(to right, ${color}, ${color2})` }} />Superpowers</h3>
          <div className="rounded-xl border p-4" style={{ borderColor: hexWithAlpha(color, 0.2), background: `linear-gradient(135deg, ${hexWithAlpha(color, 0.04)}, ${hexWithAlpha(color2, 0.04)})` }}>
            <div className="flex flex-wrap gap-1.5">
              {resume.skills.map((s, i) => <span key={i} className="text-[11px] px-3 py-1.5 rounded-full text-white font-semibold" style={{ background: `linear-gradient(135deg, ${color}, ${color2})` }}>{s}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ MINIMAL TEMPLATE ============================ */
function MinimalTemplate({ resume, accent }) {
  const color = accent || "#111827";
  const photo = resume.photo;
  return (
    <div className="bg-white text-gray-900 font-light">
      <div className="mb-10 pb-6 border-b border-gray-200 flex items-start gap-5">
        {photo && <img src={photo} alt={resume.fullName} className="h-20 w-20 rounded-full object-cover grayscale shrink-0" />}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl font-extralight tracking-tight leading-tight" style={{ color }}>{resume.fullName}</h2>
          <p className="text-sm text-gray-500 mt-1.5">{resume.title}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-3 text-[10px] text-gray-500">
            {resume.contact?.email && <span>{resume.contact.email}</span>}
            {resume.contact?.phone && <span>· {resume.contact.phone}</span>}
            {resume.contact?.location && <span>· {resume.contact.location}</span>}
            {resume.contact?.linkedIn && <span>· {resume.contact.linkedIn}</span>}
          </div>
        </div>
      </div>
      {resume.summary && <div className="mb-10"><p className="text-[13px] text-gray-700 leading-[1.85] italic">{resume.summary}</p></div>}
      {resume.experience?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.3em] mb-5 font-medium" style={{ color }}>Experience</h3>
          <div className="space-y-6">
            {resume.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-12 gap-4">
                <div className="col-span-3"><p className="text-[11px] text-gray-400">{exp.duration}</p>{exp.location && <p className="text-[10px] text-gray-400 mt-0.5">{exp.location}</p>}</div>
                <div className="col-span-9">
                  <p className="text-[13px] font-medium text-gray-900">{exp.role}</p>
                  <p className="text-[11px] text-gray-500 mb-2">{exp.company}</p>
                  <ul className="space-y-1">{exp.bullets?.map((b, j) => <li key={j} className="text-[12px] text-gray-700 leading-[1.7]">— {b}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.education?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-[10px] uppercase tracking-[0.3em] mb-5 font-medium" style={{ color }}>Education</h3>
          <div className="space-y-3">
            {resume.education.map((edu, i) => (
              <div key={i} className="grid grid-cols-12 gap-4">
                <p className="text-[11px] text-gray-400 col-span-3">{edu.year}</p>
                <div className="col-span-9"><p className="text-[12px] font-medium text-gray-900">{edu.degree}</p><p className="text-[11px] text-gray-500">{edu.school}{edu.details && <span className="italic"> · {edu.details}</span>}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {resume.skills?.length > 0 && <div><h3 className="text-[10px] uppercase tracking-[0.3em] mb-3 font-medium" style={{ color }}>Skills</h3><p className="text-[12px] text-gray-700 leading-[1.8]">{resume.skills.join("  ·  ")}</p></div>}
    </div>
  );
}

/* ============================ TECH TEMPLATE ============================ */
function TechTemplate({ resume, accent }) {
  const color = accent || "#22c55e";
  const photo = resume.photo;
  return (
    <div className="bg-white -m-6 sm:-m-8" style={{ fontFamily: "'Menlo', 'Monaco', monospace" }}>
      <div className="bg-[#0f172a] rounded-t-xl px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <p className="text-[10px] text-gray-400 ml-2 truncate">~/resume/{resume.fullName?.toLowerCase().replace(/\s+/g, "-")}.json</p>
      </div>
      <div className="bg-[#0f172a] text-gray-100 p-5 sm:p-6 rounded-b-xl text-[11.5px] leading-[1.7] overflow-x-auto">
        {photo && (
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-700">
            <img src={photo} alt={resume.fullName} className="h-16 w-16 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${hexWithAlpha(color, 0.4)}` }} />
            <div><p className="font-bold" style={{ color }}>{resume.fullName}</p><p className="text-gray-400 text-[10px]">{resume.title}</p></div>
          </div>
        )}
        {!photo && (
          <>
            <p className="mb-1"><span className="text-[#f472b6]">const</span> <span style={{ color }}>name</span> <span className="text-[#a78bfa]">=</span> <span className="text-[#fbbf24]">"{resume.fullName}"</span>;</p>
            <p className="mb-3"><span className="text-[#f472b6]">const</span> <span style={{ color }}>role</span> <span className="text-[#a78bfa]">=</span> <span className="text-[#fbbf24]">"{resume.title}"</span>;</p>
          </>
        )}
        <div className="mb-4">
          <p><span className="text-[#f472b6]">const</span> <span style={{ color }}>contact</span> <span className="text-[#a78bfa]">=</span> {"{"}</p>
          <div className="ml-4">
            {resume.contact?.email && <p><span className="text-[#60a5fa]">email</span>: <span className="text-[#fbbf24]">"{resume.contact.email}"</span>,</p>}
            {resume.contact?.phone && <p><span className="text-[#60a5fa]">phone</span>: <span className="text-[#fbbf24]">"{resume.contact.phone}"</span>,</p>}
            {resume.contact?.location && <p><span className="text-[#60a5fa]">location</span>: <span className="text-[#fbbf24]">"{resume.contact.location}"</span>,</p>}
            {resume.contact?.linkedIn && <p><span className="text-[#60a5fa]">linkedin</span>: <span className="text-[#fbbf24]">"{resume.contact.linkedIn}"</span>,</p>}
            {resume.contact?.portfolio && <p><span className="text-[#60a5fa]">github</span>: <span className="text-[#fbbf24]">"{resume.contact.portfolio}"</span></p>}
          </div>
          <p>{"}"};</p>
        </div>
        {resume.summary && <div className="mb-4"><p className="text-[#64748b]">/**</p><p className="text-[#94a3b8] pl-2">* {resume.summary}</p><p className="text-[#64748b]">*/</p></div>}
        {resume.experience?.length > 0 && (
          <div className="mb-4">
            <p><span className="text-[#f472b6]">const</span> <span style={{ color }}>experience</span> <span className="text-[#a78bfa]">=</span> [</p>
            <div className="ml-4 space-y-2 mt-1">
              {resume.experience.map((exp, i) => (
                <div key={i}>
                  <p>{"{"}</p>
                  <div className="ml-4">
                    <p><span className="text-[#60a5fa]">role</span>: <span className="text-[#fbbf24]">"{exp.role}"</span>,</p>
                    <p><span className="text-[#60a5fa]">company</span>: <span className="text-[#fbbf24]">"{exp.company}"</span>,</p>
                    <p><span className="text-[#60a5fa]">duration</span>: <span className="text-[#fbbf24]">"{exp.duration}"</span>,</p>
                    {exp.location && <p><span className="text-[#60a5fa]">location</span>: <span className="text-[#fbbf24]">"{exp.location}"</span>,</p>}
                    <p><span className="text-[#60a5fa]">achievements</span>: [</p>
                    <div className="ml-4">{exp.bullets?.map((b, j) => <p key={j} className="text-[#94a3b8] break-words">"{b}",</p>)}</div>
                    <p>]</p>
                  </div>
                  <p>{"},"}</p>
                </div>
              ))}
            </div>
            <p>];</p>
          </div>
        )}
        {resume.education?.length > 0 && (
          <div className="mb-4">
            <p><span className="text-[#f472b6]">const</span> <span style={{ color }}>education</span> <span className="text-[#a78bfa]">=</span> [</p>
            <div className="ml-4">{resume.education.map((edu, i) => <p key={i}><span className="text-[#fbbf24]">"{edu.degree}, {edu.school} ({edu.year})"</span>,</p>)}</div>
            <p>];</p>
          </div>
        )}
        {resume.skills?.length > 0 && (
          <div>
            <p><span className="text-[#f472b6]">const</span> <span style={{ color }}>skills</span> <span className="text-[#a78bfa]">=</span> [</p>
            <div className="ml-4 break-words">{resume.skills.map((s, i) => <span key={i}><span className="text-[#fbbf24]">"{s}"</span>{i < resume.skills.length - 1 ? ", " : ""}</span>)}</div>
            <p>];</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ HTML GENERATORS ============================ */
function generateResumeHTML(resume, isPro, templateId, accent) {
  const photo = resume.photo;
  const footer = isPro ? "" : `<div class="footer">Built with <a href="https://fancydigitals.com.ng">Fancy Digitals AI Resume Builder</a></div>`;
  switch (templateId) {
    case "modern": return modernHTML(resume, photo, footer, accent);
    case "professional": return professionalHTML(resume, photo, footer, accent);
    case "creative": return creativeHTML(resume, photo, footer, accent);
    case "minimal": return minimalHTML(resume, photo, footer, accent);
    case "tech": return techHTML(resume, photo, footer, accent);
    case "basic":
    default: return basicHTML(resume, photo, footer, accent);
  }
}

const PRINT_RESET = `* { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } @media print { @page { margin: 15mm; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }`;

function basicHTML(resume, photo, footer, accent) {
  const color = accent || "#111827";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1f2937; line-height: 1.5; background: white; }
.header { display: flex; gap: 20px; align-items: flex-start; border-bottom: 2px solid ${color}; padding-bottom: 16px; margin-bottom: 20px; }
.photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb; flex-shrink: 0; }
.header-info { flex: 1; }
h1 { font-size: 28px; color: #111827; }
.title { color: #6b7280; font-size: 16px; margin-top: 4px; }
.contact { color: #6b7280; font-size: 12px; margin-top: 10px; display: flex; flex-wrap: wrap; gap: 16px; }
h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid #d1d5db; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px; color: ${color}; }
.exp { margin: 12px 0; }
.exp-header { display: flex; justify-content: space-between; gap: 12px; }
.exp-role { font-weight: bold; font-size: 13px; }
.exp-date { color: #6b7280; font-size: 12px; }
.exp-company { color: #6b7280; font-style: italic; font-size: 12px; margin: 2px 0 6px; }
ul { margin: 4px 0; padding-left: 20px; }
li { font-size: 12px; line-height: 1.65; margin-bottom: 3px; color: #374151; }
.summary { font-size: 12.5px; line-height: 1.7; color: #374151; }
.skills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
.skill { background: #f3f4f6; padding: 4px 10px; border-radius: 4px; font-size: 11px; color: #374151; }
.edu { display: flex; justify-content: space-between; margin: 6px 0; gap: 12px; }
.edu-degree { font-weight: bold; font-size: 13px; }
.edu-school { color: #6b7280; font-size: 12px; }
.edu-year { color: #6b7280; font-size: 12px; white-space: nowrap; }
.footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="header">${photo ? `<img src="${photo}" class="photo" alt="" />` : ""}<div class="header-info"><h1>${resume.fullName||""}</h1><p class="title">${resume.title||""}</p><div class="contact">${resume.contact?.email?`<span>${resume.contact.email}</span>`:""}${resume.contact?.phone?`<span>${resume.contact.phone}</span>`:""}${resume.contact?.location?`<span>${resume.contact.location}</span>`:""}${resume.contact?.linkedIn?`<span>${resume.contact.linkedIn}</span>`:""}${resume.contact?.portfolio?`<span>${resume.contact.portfolio}</span>`:""}</div></div></div>
${resume.summary?`<h2>Professional Summary</h2><p class="summary">${resume.summary}</p>`:""}
${resume.experience?.length>0?`<h2>Experience</h2>${resume.experience.map(e=>`<div class="exp"><div class="exp-header"><span class="exp-role">${e.role||""}</span><span class="exp-date">${e.duration||""}</span></div><p class="exp-company">${e.company||""}${e.location?" · "+e.location:""}</p><ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join("")}</ul></div>`).join("")}`:""}
${resume.education?.length>0?`<h2>Education</h2>${resume.education.map(e=>`<div class="edu"><div><div class="edu-degree">${e.degree||""}</div><div class="edu-school">${e.school||""}${e.details?" · "+e.details:""}</div></div><div class="edu-year">${e.year||""}</div></div>`).join("")}`:""}
${resume.skills?.length>0?`<h2>Skills</h2><div class="skills">${resume.skills.map(s=>`<span class="skill">${s}</span>`).join("")}</div>`:""}
${footer}</body></html>`;
}

function modernHTML(resume, photo, footer, accent) {
  const color = accent || "#075a01";
  const c20 = `${color}33`;
  const c14 = `${color}24`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1f2937; line-height: 1.5; background: white; }
.header { display: flex; gap: 20px; align-items: flex-start; border-bottom: 6px solid ${color}; padding-bottom: 20px; margin-bottom: 24px; }
.photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 4px ${c20}; flex-shrink: 0; }
.header-info { flex: 1; }
h1 { font-size: 32px; color: #111827; letter-spacing: -0.5px; }
.title { color: ${color}; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px; }
.contact { color: #6b7280; font-size: 12px; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 20px; }
h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: ${color}; font-weight: bold; margin-top: 24px; margin-bottom: 12px; }
.summary { font-size: 13px; line-height: 1.75; color: #374151; }
.exp { margin: 16px 0; padding-left: 20px; border-left: 2px solid #e5e7eb; position: relative; }
.exp::before { content: ""; position: absolute; left: -5px; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: ${color}; }
.exp-header { display: flex; justify-content: space-between; gap: 12px; }
.exp-role { font-weight: bold; font-size: 14px; color: #111827; }
.exp-date { color: #6b7280; font-size: 12px; font-weight: 500; }
.exp-company { color: ${color}; font-weight: 600; font-size: 13px; margin-top: 2px; }
.exp-location { color: #6b7280; font-weight: normal; }
ul { margin: 8px 0 0; padding-left: 18px; }
li { font-size: 12.5px; line-height: 1.65; margin-bottom: 4px; color: #374151; }
.edu { display: flex; justify-content: space-between; gap: 12px; margin: 8px 0; }
.edu-degree { font-weight: bold; font-size: 13px; }
.edu-school { color: #6b7280; font-size: 12px; margin-top: 2px; }
.edu-year { color: #6b7280; font-size: 12px; font-weight: 500; white-space: nowrap; }
.skills { display: flex; flex-wrap: wrap; gap: 6px; }
.skill { background: ${c14}; color: ${color}; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; border: 1px solid ${color}40; }
.footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="header">${photo ? `<img src="${photo}" class="photo" alt="" />` : ""}<div class="header-info"><h1>${resume.fullName||""}</h1><p class="title">${resume.title||""}</p><div class="contact">${resume.contact?.email?`<span>${resume.contact.email}</span>`:""}${resume.contact?.phone?`<span>${resume.contact.phone}</span>`:""}${resume.contact?.location?`<span>${resume.contact.location}</span>`:""}${resume.contact?.linkedIn?`<span>${resume.contact.linkedIn}</span>`:""}${resume.contact?.portfolio?`<span>${resume.contact.portfolio}</span>`:""}</div></div></div>
${resume.summary?`<h2>Profile</h2><p class="summary">${resume.summary}</p>`:""}
${resume.experience?.length>0?`<h2>Professional Experience</h2>${resume.experience.map(e=>`<div class="exp"><div class="exp-header"><span class="exp-role">${e.role||""}</span><span class="exp-date">${e.duration||""}</span></div><p class="exp-company">${e.company||""}${e.location?` <span class="exp-location">· ${e.location}</span>`:""}</p><ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join("")}</ul></div>`).join("")}`:""}
${resume.education?.length>0?`<h2>Education</h2>${resume.education.map(e=>`<div class="edu"><div><div class="edu-degree">${e.degree||""}</div><div class="edu-school">${e.school||""}${e.details?" · "+e.details:""}</div></div><div class="edu-year">${e.year||""}</div></div>`).join("")}`:""}
${resume.skills?.length>0?`<h2>Core Skills</h2><div class="skills">${resume.skills.map(s=>`<span class="skill">${s}</span>`).join("")}</div>`:""}
${footer}</body></html>`;
}

function professionalHTML(resume, photo, footer, accent) {
  const color = accent || "#1e3a5f";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; color: #1f2937; line-height: 1.5; background: white; }
.header-bar { background: ${color}; color: white; padding: 28px 40px; display: flex; gap: 20px; align-items: flex-start; }
.photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 4px rgba(255,255,255,0.2); flex-shrink: 0; }
.header-info { flex: 1; }
h1 { font-size: 30px; letter-spacing: -0.5px; }
.title { color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; margin-top: 6px; }
.contact { color: rgba(255,255,255,0.85); font-size: 11px; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 16px; }
.body { padding: 30px 40px; display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
h2 { font-size: 10px; text-transform: uppercase; letter-spacing: 2.5px; color: ${color}; font-weight: bold; border-bottom: 2px solid ${color}; padding-bottom: 4px; margin-bottom: 10px; }
.section { margin-bottom: 20px; }
.summary { font-size: 12.5px; line-height: 1.7; color: #374151; }
.exp { margin: 12px 0; }
.exp-company { font-weight: bold; font-size: 13px; color: #111827; }
.exp-header { display: flex; justify-content: space-between; gap: 8px; }
.exp-role { color: ${color}; font-style: italic; font-weight: 600; font-size: 12px; }
.exp-date { color: #6b7280; font-size: 11px; white-space: nowrap; }
.exp-location { color: #6b7280; font-style: italic; font-size: 10px; }
ul { margin: 6px 0 0; padding-left: 18px; }
li { font-size: 12px; line-height: 1.65; color: #374151; margin-bottom: 3px; }
li::marker { color: ${color}; }
.sidebar-section { margin-bottom: 20px; }
.edu-item { margin: 10px 0; }
.edu-degree { font-weight: bold; font-size: 12px; color: #111827; line-height: 1.3; }
.edu-school { color: #6b7280; font-size: 11px; margin-top: 2px; }
.edu-year { color: #6b7280; font-size: 10px; }
.skill-list { display: flex; flex-direction: column; gap: 4px; }
.skill-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #374151; }
.skill-item::before { content: ""; width: 4px; height: 4px; border-radius: 50%; background: ${color}; }
.footer { margin: 30px 40px 0; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="header-bar">${photo ? `<img src="${photo}" class="photo" alt="" />` : ""}<div class="header-info"><h1>${resume.fullName||""}</h1><p class="title">${resume.title||""}</p><div class="contact">${resume.contact?.email?`<span>${resume.contact.email}</span>`:""}${resume.contact?.phone?`<span>· ${resume.contact.phone}</span>`:""}${resume.contact?.location?`<span>· ${resume.contact.location}</span>`:""}${resume.contact?.linkedIn?`<span>· ${resume.contact.linkedIn}</span>`:""}</div></div></div>
<div class="body">
<div>
${resume.summary?`<div class="section"><h2>Executive Summary</h2><p class="summary">${resume.summary}</p></div>`:""}
${resume.experience?.length>0?`<div class="section"><h2>Professional Experience</h2>${resume.experience.map(e=>`<div class="exp"><div class="exp-company">${e.company||""}</div><div class="exp-header"><span class="exp-role">${e.role||""}</span><span class="exp-date">${e.duration||""}</span></div>${e.location?`<div class="exp-location">${e.location}</div>`:""}<ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join("")}</ul></div>`).join("")}</div>`:""}
</div>
<div>
${resume.contact?.portfolio?`<div class="sidebar-section"><h2>Portfolio</h2><p style="font-size:11px;color:#374151;word-break:break-all;">${resume.contact.portfolio}</p></div>`:""}
${resume.education?.length>0?`<div class="sidebar-section"><h2>Education</h2>${resume.education.map(e=>`<div class="edu-item"><div class="edu-degree">${e.degree||""}</div><div class="edu-school">${e.school||""}</div><div class="edu-year">${e.year||""}</div>${e.details?`<div class="edu-year" style="font-style:italic;">${e.details}</div>`:""}</div>`).join("")}</div>`:""}
${resume.skills?.length>0?`<div class="sidebar-section"><h2>Core Competencies</h2><div class="skill-list">${resume.skills.map(s=>`<div class="skill-item">${s}</div>`).join("")}</div></div>`:""}
</div></div>
${footer}</body></html>`;
}

function creativeHTML(resume, photo, footer, accent) {
  const color = accent || "#7c3aed";
  const color2 = accent || "#ec4899";
  const cBorder = `${color}33`;
  const cBg = `${color}0F`;
  const c2Bg = `${color2}0F`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 30px; color: #1f2937; line-height: 1.5; background: white; }
.hero { background: linear-gradient(135deg, ${color} 0%, ${color2} 100%); color: white; padding: 28px; border-radius: 16px; margin-bottom: 24px; display: flex; gap: 18px; align-items: flex-start; }
.photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 4px rgba(255,255,255,0.3); flex-shrink: 0; }
.hero-info { flex: 1; }
h1 { font-size: 30px; letter-spacing: -0.5px; }
.title { color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500; margin-top: 4px; }
.contact { color: rgba(255,255,255,0.85); font-size: 11px; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 14px; }
h2 { font-size: 14px; font-weight: bold; color: ${color}; margin-top: 24px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
h2::before { content: ""; display: inline-block; width: 24px; height: 4px; border-radius: 2px; background: linear-gradient(to right, ${color}, ${color2}); }
.summary { font-size: 13px; line-height: 1.75; color: #374151; }
.exp, .edu-card, .skills-card { background: linear-gradient(135deg, ${cBg}, ${c2Bg}); border: 1px solid ${cBorder}; border-radius: 12px; padding: 16px; margin: 12px 0; }
.exp-header { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
.exp-role { font-weight: bold; font-size: 14px; color: #111827; }
.exp-date { color: ${color}; font-size: 11px; font-weight: 600; }
.exp-company { color: ${color2}; font-weight: 600; font-size: 12px; margin-bottom: 8px; }
.exp-location { color: #6b7280; font-weight: normal; }
ul { margin: 0; padding-left: 18px; }
li { font-size: 12.5px; line-height: 1.65; color: #374151; margin-bottom: 4px; }
li::marker { color: ${color}; }
.edu { display: flex; justify-content: space-between; gap: 12px; }
.edu-degree { font-weight: bold; font-size: 13px; }
.edu-school { color: #6b7280; font-size: 12px; margin-top: 2px; }
.edu-year { color: ${color}; font-size: 11px; font-weight: 600; white-space: nowrap; }
.skills { display: flex; flex-wrap: wrap; gap: 6px; }
.skill { background: linear-gradient(135deg, ${color}, ${color2}); color: white; padding: 6px 14px; border-radius: 999px; font-size: 11px; font-weight: 600; }
.footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="hero">${photo ? `<img src="${photo}" class="photo" alt="" />` : ""}<div class="hero-info"><h1>${resume.fullName||""}</h1><p class="title">${resume.title||""}</p><div class="contact">${resume.contact?.email?`<span>${resume.contact.email}</span>`:""}${resume.contact?.phone?`<span>· ${resume.contact.phone}</span>`:""}${resume.contact?.location?`<span>· ${resume.contact.location}</span>`:""}</div></div></div>
${resume.summary?`<h2>About Me</h2><p class="summary">${resume.summary}</p>`:""}
${resume.experience?.length>0?`<h2>Experience</h2>${resume.experience.map(e=>`<div class="exp"><div class="exp-header"><span class="exp-role">${e.role||""}</span><span class="exp-date">${e.duration||""}</span></div><p class="exp-company">@ ${e.company||""}${e.location?` <span class="exp-location">· ${e.location}</span>`:""}</p><ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join("")}</ul></div>`).join("")}`:""}
${resume.education?.length>0?`<h2>Education</h2>${resume.education.map(e=>`<div class="edu-card"><div class="edu"><div><div class="edu-degree">${e.degree||""}</div><div class="edu-school">${e.school||""}${e.details?" · "+e.details:""}</div></div><div class="edu-year">${e.year||""}</div></div></div>`).join("")}`:""}
${resume.skills?.length>0?`<h2>Superpowers</h2><div class="skills-card"><div class="skills">${resume.skills.map(s=>`<span class="skill">${s}</span>`).join("")}</div></div>`:""}
${footer}</body></html>`;
}

function minimalHTML(resume, photo, footer, accent) {
  const color = accent || "#111827";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 50px; color: #1f2937; line-height: 1.5; background: white; font-weight: 300; }
.header { display: flex; gap: 20px; align-items: flex-start; padding-bottom: 24px; border-bottom: 1px solid #e5e7eb; margin-bottom: 36px; }
.photo { width: 75px; height: 75px; border-radius: 50%; object-fit: cover; filter: grayscale(100%); flex-shrink: 0; }
.header-info { flex: 1; }
h1 { font-size: 28px; font-weight: 200; letter-spacing: -0.5px; color: ${color}; }
.title { color: #6b7280; font-size: 14px; margin-top: 6px; font-weight: 300; }
.contact { color: #6b7280; font-size: 10px; margin-top: 12px; display: flex; flex-wrap: wrap; gap: 12px; }
h2 { font-size: 10px; text-transform: uppercase; letter-spacing: 4px; color: ${color}; font-weight: 500; margin-top: 32px; margin-bottom: 18px; }
.summary { font-size: 13px; line-height: 1.85; color: #374151; font-style: italic; margin-bottom: 32px; }
.exp { display: grid; grid-template-columns: 1fr 3fr; gap: 16px; margin: 18px 0; }
.exp-date-col { color: #9ca3af; font-size: 11px; }
.exp-location { color: #9ca3af; font-size: 10px; margin-top: 2px; }
.exp-role { font-size: 13px; font-weight: 500; color: #111827; }
.exp-company { color: #6b7280; font-size: 11px; margin-bottom: 8px; }
.exp-bullets { font-size: 12px; line-height: 1.7; color: #374151; }
.exp-bullet { margin-bottom: 4px; }
.edu { display: grid; grid-template-columns: 1fr 3fr; gap: 16px; margin: 10px 0; }
.edu-year { color: #9ca3af; font-size: 11px; }
.edu-degree { font-size: 12px; font-weight: 500; color: #111827; }
.edu-school { color: #6b7280; font-size: 11px; }
.skills-text { font-size: 12px; color: #374151; line-height: 1.8; }
.footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="header">${photo ? `<img src="${photo}" class="photo" alt="" />` : ""}<div class="header-info"><h1>${resume.fullName||""}</h1><p class="title">${resume.title||""}</p><div class="contact">${resume.contact?.email?`<span>${resume.contact.email}</span>`:""}${resume.contact?.phone?`<span>· ${resume.contact.phone}</span>`:""}${resume.contact?.location?`<span>· ${resume.contact.location}</span>`:""}${resume.contact?.linkedIn?`<span>· ${resume.contact.linkedIn}</span>`:""}</div></div></div>
${resume.summary?`<p class="summary">${resume.summary}</p>`:""}
${resume.experience?.length>0?`<h2>Experience</h2>${resume.experience.map(e=>`<div class="exp"><div class="exp-date-col">${e.duration||""}${e.location?`<div class="exp-location">${e.location}</div>`:""}</div><div><div class="exp-role">${e.role||""}</div><div class="exp-company">${e.company||""}</div><div class="exp-bullets">${(e.bullets||[]).map(b=>`<div class="exp-bullet">— ${b}</div>`).join("")}</div></div></div>`).join("")}`:""}
${resume.education?.length>0?`<h2>Education</h2>${resume.education.map(e=>`<div class="edu"><div class="edu-year">${e.year||""}</div><div><div class="edu-degree">${e.degree||""}</div><div class="edu-school">${e.school||""}${e.details?` · ${e.details}`:""}</div></div></div>`).join("")}`:""}
${resume.skills?.length>0?`<h2>Skills</h2><p class="skills-text">${resume.skills.join("  ·  ")}</p>`:""}
${footer}</body></html>`;
}

function techHTML(resume, photo, footer, accent) {
  const color = accent || "#22c55e";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${resume.fullName} - Resume</title><style>
${PRINT_RESET}
body { font-family: 'Menlo', 'Monaco', 'Consolas', monospace; max-width: 800px; margin: 0 auto; padding: 20px; background: white; line-height: 1.6; }
.terminal { background: #0f172a; border-radius: 12px; overflow: hidden; }
.titlebar { background: #1e293b; padding: 8px 14px; display: flex; align-items: center; gap: 8px; }
.dots { display: flex; gap: 5px; }
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-red { background: #ef4444; }
.dot-yellow { background: #eab308; }
.dot-green { background: #22c55e; }
.filename { color: #94a3b8; font-size: 11px; margin-left: 8px; }
.code { padding: 20px; color: #e5e7eb; font-size: 12px; line-height: 1.75; }
.photo-block { display: flex; gap: 14px; align-items: center; padding-bottom: 14px; border-bottom: 1px solid #334155; margin-bottom: 14px; }
.photo { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 2px ${color}66; }
.photo-info { flex: 1; }
.photo-name { color: ${color}; font-weight: bold; font-size: 14px; }
.photo-title { color: #94a3b8; font-size: 11px; }
.pink { color: #f472b6; }
.accent-c { color: ${color}; }
.blue { color: #60a5fa; }
.yellow { color: #fbbf24; }
.purple { color: #a78bfa; }
.gray { color: #64748b; }
.light-gray { color: #94a3b8; }
.indent { padding-left: 20px; }
.comment { color: #64748b; }
.footer { margin-top: 20px; padding: 12px; text-align: center; color: #9ca3af; font-size: 10px; }
.footer a { color: #075a01; text-decoration: none; font-weight: bold; }
</style></head><body>
<div class="terminal">
<div class="titlebar"><div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div><div class="filename">~/resume/${(resume.fullName||"resume").toLowerCase().replace(/\s+/g,"-")}.json</div></div>
<div class="code">
${photo ? `<div class="photo-block"><img src="${photo}" class="photo" /><div class="photo-info"><div class="photo-name">${resume.fullName||""}</div><div class="photo-title">${resume.title||""}</div></div></div>` : `<div><span class="pink">const</span> <span class="accent-c">name</span> <span class="purple">=</span> <span class="yellow">"${resume.fullName||""}"</span>;</div><div style="margin-bottom:12px;"><span class="pink">const</span> <span class="accent-c">role</span> <span class="purple">=</span> <span class="yellow">"${resume.title||""}"</span>;</div>`}
<div><span class="pink">const</span> <span class="accent-c">contact</span> <span class="purple">=</span> {</div>
<div class="indent">
${resume.contact?.email?`<div><span class="blue">email</span>: <span class="yellow">"${resume.contact.email}"</span>,</div>`:""}
${resume.contact?.phone?`<div><span class="blue">phone</span>: <span class="yellow">"${resume.contact.phone}"</span>,</div>`:""}
${resume.contact?.location?`<div><span class="blue">location</span>: <span class="yellow">"${resume.contact.location}"</span>,</div>`:""}
${resume.contact?.linkedIn?`<div><span class="blue">linkedin</span>: <span class="yellow">"${resume.contact.linkedIn}"</span>,</div>`:""}
${resume.contact?.portfolio?`<div><span class="blue">github</span>: <span class="yellow">"${resume.contact.portfolio}"</span></div>`:""}
</div>
<div style="margin-bottom:12px;">};</div>
${resume.summary?`<div class="comment">/**</div><div class="light-gray indent">* ${resume.summary}</div><div class="comment" style="margin-bottom:12px;">*/</div>`:""}
${resume.experience?.length>0?`<div><span class="pink">const</span> <span class="accent-c">experience</span> <span class="purple">=</span> [</div>${resume.experience.map(e=>`<div class="indent">{<div class="indent"><div><span class="blue">role</span>: <span class="yellow">"${e.role||""}"</span>,</div><div><span class="blue">company</span>: <span class="yellow">"${e.company||""}"</span>,</div><div><span class="blue">duration</span>: <span class="yellow">"${e.duration||""}"</span>,</div>${e.location?`<div><span class="blue">location</span>: <span class="yellow">"${e.location}"</span>,</div>`:""}<div><span class="blue">achievements</span>: [</div><div class="indent">${(e.bullets||[]).map(b=>`<div class="light-gray">"${b}",</div>`).join("")}</div><div>]</div></div>},</div>`).join("")}<div style="margin-bottom:12px;">];</div>`:""}
${resume.education?.length>0?`<div><span class="pink">const</span> <span class="accent-c">education</span> <span class="purple">=</span> [</div><div class="indent">${resume.education.map(e=>`<div><span class="yellow">"${e.degree||""}, ${e.school||""} (${e.year||""})"</span>,</div>`).join("")}</div><div style="margin-bottom:12px;">];</div>`:""}
${resume.skills?.length>0?`<div><span class="pink">const</span> <span class="accent-c">skills</span> <span class="purple">=</span> [${resume.skills.map(s=>`<span class="yellow">"${s}"</span>`).join(", ")}];</div>`:""}
</div></div>
${footer}</body></html>`;
}