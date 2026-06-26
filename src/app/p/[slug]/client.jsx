"use client";

import { useState, useEffect } from "react";
import {
  Sparkles, Zap, Check, CheckCircle2, AlertCircle, Loader2, Mail, Menu, X,
  Download, Phone, MapPin,
} from "lucide-react";

export default function PublishedPageClient({ page, form, pageId, slug }) {
  const brand = form.brandColor || "#075a01";
  const accent = form.brandAccent || "#ff914d";
  const tone = form.tone || "Professional";
  const T = getToneStyles(tone, brand, accent);

  // Centralized tone config — replaces all scattered inline tone checks
const toneConfig = {
  // Hero background
  heroBg:
    tone === "Bold"
      ? { background: brand, color: "#fff" }
      : tone === "Minimal"
      ? { background: "#fff" }
      : tone === "Luxury"
      ? { background: "linear-gradient(180deg, #0a0a0a 0%, #111008 100%)" }
      : tone === "Playful"
      ? { background: `linear-gradient(160deg, ${brand}12 0%, ${accent}18 50%, ${brand}08 100%)` }
      : tone === "Friendly"
      ? { background: `linear-gradient(180deg, ${brand}10 0%, #f8fafc 100%)` }
      : { background: `linear-gradient(180deg, ${brand}08 0%, ${accent}05 100%)` },

  // Brand name color in nav
  brandNameColor:
    tone === "Luxury"
      ? "#e8e0d0"
      : tone === "Minimal"
      ? "#111827"
      : brand,

  // Single testimonial section bg
  testimonialBg:
    tone === "Bold"
      ? { background: brand }
      : tone === "Minimal"
      ? { background: "#fafafa" }
      : tone === "Luxury"
      ? { background: "#0f0f0f" }
      : tone === "Playful"
      ? { background: `linear-gradient(135deg, ${brand}15, ${accent}20)` }
      : tone === "Friendly"
      ? { background: `linear-gradient(135deg, ${brand}08, ${accent}10)` }
      : { background: "#111827" },

  // Single testimonial text color
  testimonialTextColor:
    tone === "Minimal" ? "#111827" : tone === "Luxury" ? "#e8e0d0" : "#fff",

  // Single testimonial author name color
  testimonialAuthorColor:
    tone === "Minimal" ? "text-gray-900" : tone === "Luxury" ? "text-[#e8e0d0]" : "text-white",

  // Single testimonial role color
  testimonialRoleColor:
    tone === "Minimal" ? "text-gray-500" : tone === "Luxury" ? "text-[#6b6055]" : "text-gray-300",

  // Quote mark color
  quoteMarkColor:
    tone === "Minimal" || tone === "Friendly" ? brand : accent,

  // Final CTA section bg
  finalCtaBg:
    tone === "Bold"
      ? { background: "#000" }
      : tone === "Minimal"
      ? { background: "#fafafa" }
      : tone === "Luxury"
      ? { background: "#0a0a0a", borderTop: "1px solid #ffffff10" }
      : tone === "Playful"
      ? { background: `linear-gradient(135deg, ${brand}, ${accent})` }
      : tone === "Friendly"
      ? { background: `linear-gradient(135deg, ${brand}ee, ${accent}cc)` }
      : { background: `linear-gradient(135deg, ${brand}, ${accent})` },

  // Final CTA headline color
  finalCtaHeadlineColor:
    tone === "Minimal"
      ? { color: "#111827" }
      : tone === "Luxury"
      ? { color: "#f5f0e8" }
      : { color: "#fff" },

  // Final CTA subheadline color
  finalCtaSubColor:
    tone === "Minimal"
      ? { color: "#6b7280" }
      : tone === "Luxury"
      ? { color: "#6b6055" }
      : { color: "rgba(255,255,255,0.9)" },

  // Final CTA button
  finalCtaBtn:
    tone === "Bold"
      ? { background: accent, color: "#000" }
      : tone === "Minimal"
      ? { background: brand, color: "#fff" }
      : tone === "Luxury"
      ? { background: "transparent", color: "#e8e0d0", border: "1px solid #ffffff30" }
      : { background: "#fff", color: brand },

  // Feature icon style
  featureIconStyle:
    tone === "Bold"
      ? { background: brand, color: "#fff" }
      : tone === "Luxury"
      ? { background: "transparent", color: "#c9a84c" }
      : tone === "Playful"
      ? { background: `${accent}25`, color: accent }
      : tone === "Friendly"
      ? { background: `${brand}15`, color: brand }
      : { background: `${brand}15`, color: brand },
};

  // Email capture state
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState(""); // Add
const [gender, setGender] = useState(""); // Add
const [city, setCity] = useState(""); // Add
const [state, setState] = useState(""); // Add
const [country, setCountry] = useState(""); // Add
const [intent, setIntent] = useState(""); // Add
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // CTA modal state (when user clicks main CTA button)
  const [showCtaModal, setShowCtaModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

    // Lead magnet email + state
  const [leadMagnetEmail, setLeadMagnetEmail] = useState("");
  const [leadMagnetSubmitting, setLeadMagnetSubmitting] = useState(false);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const [leadMagnetError, setLeadMagnetError] = useState("");

  // Inject Tawk.to chat
  useEffect(() => {
    const propertyId = page._meta?.tawkPropertyId;
    const widgetId = page._meta?.tawkWidgetId;
    if (!propertyId || !widgetId) return;
    if (document.getElementById("tawkto-script")) return;
    const s = document.createElement("script");
    s.id = "tawkto-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.body.appendChild(s);
    return () => {
      const tag = document.getElementById("tawkto-script");
      if (tag) tag.remove();
    };
  }, [page._meta?.tawkPropertyId, page._meta?.tawkWidgetId]);

  async function handleLeadMagnetSubmit(e) {
    e.preventDefault();
    if (!leadMagnetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadMagnetEmail)) {
      setLeadMagnetError("Please enter a valid email");
      return;
    }
    setLeadMagnetSubmitting(true);
    setLeadMagnetError("");
    try {
      const res = await fetch("/api/landing-pages/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, slug, email: leadMagnetEmail, source: "lead-magnet" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLeadMagnetError(data.error || "Submit failed");
        setLeadMagnetSubmitting(false);
        return;
      }
      setLeadMagnetSubmitted(true);
    } catch {
      setLeadMagnetError("Network error");
    }
    setLeadMagnetSubmitting(false);
  }

  async function handleLeadSubmit(e, source = "form") {
    e?.preventDefault?.();
    if (!leadEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
      setSubmitError("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
            const res = await fetch("/api/landing-pages/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId,
          email: leadEmail,
          name: leadName,
          phone: leadPhone,
          gender: gender,
          city: city,
          state: state,
          country: country,
          intent: intent,
          message: `Lead from ${source || "form"}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Submit failed");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      setShowCtaModal(false);
    } catch {
      setSubmitError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  function handleCtaClick() {
    setShowCtaModal(true);
    setSubmitted(false);
    setSubmitError("");
  }

  return (
    <div className={T.body} style={{ fontFamily: T.font, minHeight: "100vh" }} dir={page._meta?.language === "ar" ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className={T.nav}>
        <div className="flex items-center gap-2">
          {form.logo && <img src={form.logo} alt="" className={T.logo} />}
          <span className={T.brandName} style={{ color: toneConfig.brandNameColor }}>{form.businessName}</span>
        </div>

        {/* Desktop CTA */}
        <button onClick={handleCtaClick} className={`${T.navCta} hidden sm:inline-flex`} style={{ background: brand, color: "#fff" }}>
          {page.hero?.cta}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="sm:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 transition"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 sm:hidden" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-sm" style={{ color: brand }}>{form.businessName}</span>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => { setMobileNavOpen(false); handleCtaClick(); }}
              className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition"
              style={{ background: brand }}
            >
              {page.hero?.cta}
            </button>
            <p className="mt-4 text-[10px] text-gray-400 text-center">
              {page.hero?.subheadline?.slice(0, 80)}...
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <div
        className={T.heroWrap}
        style={toneConfig.heroBg}
      >
        {tone === "Professional" && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-sm border border-gray-100 px-3 py-1 text-[10px] font-bold mb-5" style={{ color: brand }}>
            <Sparkles className="h-3 w-3" />
            {form.tagline || "NEW"}
          </div>
        )}
        {tone === "Minimal" && form.tagline && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6">{form.tagline}</p>
        )}
        {tone === "Bold" && form.tagline && (
          <p className="text-xs font-black uppercase tracking-widest mb-5" style={{ color: accent }}>★ {form.tagline} ★</p>
        )}

        <h1 className={T.h1}>{page.hero?.headline}</h1>
        <p className={T.heroSub}>{page.hero?.subheadline}</p>

        <div className={T.heroCtaWrap}>
          <button onClick={handleCtaClick} className={T.heroCtaPrimary} style={tone === "Bold" ? { background: accent, color: "#000" } : { background: brand, color: "#fff" }}>
            {page.hero?.cta} →
          </button>
          {page.hero?.secondaryCta && (
            <button className={T.heroCtaSecondary} style={tone === "Bold" ? { borderColor: "#fff", color: "#fff" } : {}}>
              {page.hero.secondaryCta}
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      {(page.socialProof?.stat1?.number || page.socialProof?.stat2?.number) && (
        <div className={T.statsWrap}>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {page.socialProof.stat1?.number && (
              <div className="text-center">
                <p className={T.statNum} style={{ color: brand }}>{page.socialProof.stat1.number}</p>
                <p className={T.statLabel}>{page.socialProof.stat1.label}</p>
              </div>
            )}
            {page.socialProof.stat2?.number && (
              <div className="text-center">
                <p className={T.statNum} style={{ color: brand }}>{page.socialProof.stat2.number}</p>
                <p className={T.statLabel}>{page.socialProof.stat2.label}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PROBLEM */}
      {page.problem?.headline && (
        <div className={T.sectionPad + " text-center"}>
          <p className={T.eyebrow} style={{ color: accent }}>The Problem</p>
          <h2 className={T.h2}>{page.problem.headline}</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {page.problem.points?.map((p, i) => (
              <div key={i} className={T.problemCard}>
                <div className="h-6 w-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold mb-2">✕</div>
                <p className="text-xs sm:text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      {page.features?.length > 0 && (
        <div className={T.sectionPadAlt}>
          <div className="text-center mb-10">
            <p className={T.eyebrow} style={{ color: brand }}>Features</p>
            <h2 className={T.h2}>Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {page.features.map((f, i) => (
              <div key={i} className={T.featureCard}>
                <div className={T.featureIcon} style={toneConfig.featureIconStyle}>
                  <Zap className="h-4 w-4" />
                </div>
                <p className={T.featureTitle}>{f.title}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BENEFITS */}
      {page.benefits?.headline && (
        <div className={T.sectionPad}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            <div>
              <p className={T.eyebrow} style={{ color: brand }}>Benefits</p>
              <h2 className={T.h2 + " text-left"}>{page.benefits.headline}</h2>
            </div>
            <div className="space-y-2.5">
              {page.benefits.items?.map((b, i) => (
                <div key={i} className={T.benefitItem}>
                  <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: brand }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIAL */}
      {page.socialProof?.testimonial?.quote && (
        <div className={T.testimonialWrap} style={toneConfig.testimonialBg}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl sm:text-5xl leading-none mb-4" style={{ color: tone === "Minimal" ? brand : accent }}>"</div>
            <p className={T.testimonialQuote} style={{ color: toneConfig.quoteMarkColor }}>
              {page.socialProof.testimonial.quote}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: brand }}>
                {page.socialProof.testimonial.name?.[0] || "U"}
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${toneConfig.testimonialAuthorColor}`}>{page.socialProof.testimonial.name}</p>
                <p className={`text-xs ${toneConfig.testimonialRoleColor}`}>{page.socialProof.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      )}

            {/* MULTIPLE TESTIMONIALS */}
      {page.testimonials?.items?.length > 0 && (
        <div className={T.sectionPad}>
          <div className="text-center mb-10">
            <p className={T.eyebrow} style={{ color: brand }}>Testimonials</p>
            <h2 className={T.h2}>{page.testimonials.headline}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {page.testimonials.items.map((t, i) => (
              <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                <div className="text-3xl leading-none mb-2" style={{ color: accent }}>"</div>
                <p className="text-sm text-gray-700 leading-relaxed">{t.quote}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: brand }}>
                    {t.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t.name}</p>
                    <p className="text-[10px] text-gray-500">{t.role}{t.company && ` · ${t.company}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEAM */}
      {page.team?.members?.length > 0 && (
        <div className={T.sectionPadAlt}>
          <div className="text-center mb-10">
            <p className={T.eyebrow} style={{ color: brand }}>Team</p>
            <h2 className={T.h2}>{page.team.headline}</h2>
            {page.team.subheadline && <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">{page.team.subheadline}</p>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {page.team.members.map((m, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 mb-3" style={{ borderColor: `${brand}20` }}>
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: brand }}>
                      {m.name?.[0] || "?"}
                    </div>
                  )}
                </div>
                <p className="text-sm font-bold text-gray-900">{m.name}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">{m.role}</p>
                {m.bio && <p className="text-[10px] sm:text-xs text-gray-600 mt-2 leading-relaxed">{m.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIDEO */}
      {page.video?.headline && page.video?.videoUrl && (
        <div className={T.sectionPad + " text-center"}>
          {page.video.eyebrow && <p className={T.eyebrow} style={{ color: brand }}>{page.video.eyebrow}</p>}
          <h2 className={T.h2}>{page.video.headline}</h2>
          {page.video.subheadline && <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">{page.video.subheadline}</p>}
          <div className="mt-8 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            <iframe
              src={getEmbedUrl(page.video.videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={page.video.headline}
            />
          </div>
        </div>
      )}

      {/* LEAD MAGNET (with working email capture + download link) */}
      {page.leadMagnet?.headline && (
        <div className={T.sectionPadAlt}>
          <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 sm:p-8 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}>
                <Download className="h-10 w-10 text-white mb-3" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">{page.leadMagnet.eyebrow}</p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{page.leadMagnet.headline}</h3>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm text-gray-700 mb-4">{page.leadMagnet.subheadline}</p>
                <ul className="space-y-2 mb-5">
                  {page.leadMagnet.bulletPoints?.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: brand }} />
                      {b}
                    </li>
                  ))}
                </ul>
                {leadMagnetSubmitted ? (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-green-800 mb-2">Here's your download!</p>
                    {page.leadMagnet.downloadUrl ? (
                      <a
                        href={page.leadMagnet.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:opacity-90"
                        style={{ background: brand }}
                      >
                        <Download className="h-4 w-4" />
                        Download Now
                      </a>
                    ) : (
                      <p className="text-xs text-gray-500">Check your email shortly.</p>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleLeadMagnetSubmit} className="space-y-2">
                    <input
                      type="email"
                      value={leadMagnetEmail}
                      onChange={(e) => setLeadMagnetEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={leadMagnetSubmitting}
                      className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg disabled:opacity-50 transition"
                      style={{ background: brand }}
                    >
                      {leadMagnetSubmitting ? <Loader2 className="h-4 w-4 animate-spin inline" /> : page.leadMagnet.buttonText}
                    </button>
                    {leadMagnetError && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {leadMagnetError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICING */}
      {page.pricing?.length > 0 && (
        <div className={T.sectionPadAlt}>
          <div className="text-center mb-10">
            <p className={T.eyebrow} style={{ color: brand }}>Pricing</p>
            <h2 className={T.h2}>Simple pricing</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {page.pricing.map((t2, i) => (
              <div key={i} className={`relative ${T.pricingCard} ${t2.popular ? T.pricingPopular : ""}`} style={t2.popular ? { borderColor: brand } : {}}>
                {t2.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold text-white" style={{ background: brand }}>
                    MOST POPULAR
                  </span>
                )}
                <p className="text-sm font-bold text-gray-900">{t2.name}</p>
                <div className="mt-3">
                  <span className={T.price} style={{ color: brand }}>{t2.price}</span>
                  <span className="text-xs text-gray-500">/{t2.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {t2.features?.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                      <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: brand }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={handleCtaClick} className="mt-5 w-full rounded-xl py-2.5 text-xs font-bold transition" style={t2.popular ? { background: brand, color: "#fff" } : { background: "#f3f4f6", color: "#374151" }}>
                  {t2.cta || "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMAIL CAPTURE (inline) */}
      {page.emailCapture?.headline && (
        <div className={T.sectionPad + " text-center"}>
          <h2 className={T.h2}>{page.emailCapture.headline}</h2>
          <p className="mt-3 text-sm text-gray-600 max-w-md mx-auto">{page.emailCapture.subheadline}</p>

          {submitted ? (
            <div className="mt-6 mx-auto max-w-md rounded-xl bg-green-50 border border-green-200 p-4 flex items-center gap-2 justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-sm font-bold text-green-800">Thanks! We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={(e) => handleLeadSubmit(e, "inline-form")} className="mt-6 mx-auto max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                  placeholder={page.emailCapture.placeholder || "Enter your email"}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-400"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl px-5 py-3 text-sm font-bold text-white disabled:opacity-50 transition"
                  style={{ background: brand }}
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin inline" /> : page.emailCapture.buttonText}
                </button>
              </div>
              {submitError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1 justify-center">
                  <AlertCircle className="h-3 w-3" />
                  {submitError}
                </p>
              )}
            </form>
          )}
        </div>
      )}

      {/* FAQ */}
      {page.faq?.length > 0 && (
        <div className={T.sectionPadAlt}>
          <div className="text-center mb-10">
            <p className={T.eyebrow} style={{ color: brand }}>FAQ</p>
            <h2 className={T.h2}>Questions, answered</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-2">
            {page.faq.map((f, i) => (
              <details key={i} className={T.faqItem}>
                <summary className="flex items-center justify-between text-sm font-bold text-gray-900 list-none cursor-pointer">
                  {f.q}
                  <span className="text-lg leading-none group-open:rotate-45 transition-transform" style={{ color: brand }}>+</span>
                </summary>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* FINAL CTA */}
      {page.finalCta?.headline && (
        <div
          className={T.finalCtaWrap}
          style={toneConfig.finalCtaBg}
        >
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className={T.finalH2} style={toneConfig.finalCtaHeadlineColor}>
              {page.finalCta.headline}
            </h2>
            <p className={T.finalSub} style={toneConfig.finalCtaSubColor}>
              {page.finalCta.subheadline}
            </p>
            <button onClick={handleCtaClick} className="mt-6 rounded-xl px-7 py-3 text-sm font-bold shadow-xl hover:scale-105 transition" style={toneConfig.finalCtaBtn}>
              {page.finalCta.cta} →
            </button>
          </div>
        </div>
      )}

            {/* CUSTOM FOOTER or default */}
      {page.footer ? (
        <div className="px-5 sm:px-10 py-10 pb-24 sm:pb-8 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: accent }}>{form.businessName}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{page.footer.tagline}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Contact</p>
              <div className="space-y-1.5 text-xs text-gray-300">
                {page.footer.email && <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" /><a href={`mailto:${page.footer.email}`} className="hover:underline">{page.footer.email}</a></p>}
                {page.footer.phone && <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" /><a href={`tel:${page.footer.phone}`} className="hover:underline">{page.footer.phone}</a></p>}
                {page.footer.address && <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{page.footer.address}</p>}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Follow</p>
              <div className="flex flex-wrap gap-2">
                {page.footer.socials?.twitter && <a href={page.footer.socials.twitter} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Twitter</a>}
                {page.footer.socials?.instagram && <a href={page.footer.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Instagram</a>}
                {page.footer.socials?.linkedin && <a href={page.footer.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">LinkedIn</a>}
                {page.footer.socials?.facebook && <a href={page.footer.socials.facebook} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-[10px] font-bold transition">Facebook</a>}
              </div>
            </div>
          </div>
          <p className="mt-6 pt-4 border-t border-white/10 text-[10px] text-gray-500 text-center">
            {page.footer.copyright} · Built with{" "}
            <a href="https://fancydigitals.com.ng/tools/ai-landing-page-generator" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: accent }}>
              Fancy Digitals
            </a>
          </p>
        </div>
      ) : (
        <div className="px-5 sm:px-10 py-8 pb-24 sm:pb-8 text-center border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-500 font-semibold">{form.businessName}</p>
          <p className="mt-1 text-[10px] text-gray-400">
            © 2025 · Built with{" "}
            <a href="https://fancydigitals.com.ng/tools/ai-landing-page-generator" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: brand }}>
              Fancy Digitals
            </a>
          </p>
        </div>
      )}

      {/* Sticky mobile bottom CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl p-3 safe-area-inset-bottom">
        <button
          onClick={handleCtaClick}
          className="w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg active:scale-95 transition"
          style={{ background: brand }}
        >
          {page.hero?.cta} →
        </button>
      </div>

      {/* CTA MODAL (universal popup for every CTA click) */}
      {showCtaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => !submitting && setShowCtaModal(false)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">You're in!</h3>
                <p className="text-sm text-gray-600 mb-5">Thanks for signing up. We'll be in touch shortly.</p>
                <button
                  onClick={() => setShowCtaModal(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <div
                    style={{ background: `linear-gradient(135deg, ${brand}, ${accent})` }}
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                  >
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{page.hero?.cta}</h3>
                  <p className="text-sm text-gray-500 mt-1">Drop your details and we'll get back to you.</p>
                </div>

                <form onSubmit={(e) => handleLeadSubmit(e, "cta-modal")} className="space-y-3">
  {/* Universal Fields */}
  <input type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Full Name" className={inputClass} required />
  <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="Email Address" className={inputClass} required />
  <input type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="Phone Number" className={inputClass} required />

  {/* Extended Fields (Only if enabled) */}
  {page._meta?.includeExtendedLeadForm && (
    <>
      <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputClass} required />
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className={inputClass} required />
      </div>
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className={inputClass} required />
      <textarea value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="What do you intend to do with our brand?" className={inputClass + " resize-none"} rows={2} required />
    </>
  )}

  {submitError && <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{submitError}</p>}
  
  <button type="submit" disabled={submitting} className="w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg" style={{ background: brand }}>
    {submitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : page.hero?.cta}
  </button>
</form>

                <button
                  onClick={() => setShowCtaModal(false)}
                  className="w-full mt-2 rounded-xl py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ TONE DESIGN SYSTEM (mirror of generator) ============
function getToneStyles(tone, brand, accent) {
  const professional = {
    body: "bg-white text-gray-900",
    font: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    nav: "flex items-center justify-between px-5 py-4 border-b border-gray-100",
    logo: "h-7 w-7 rounded-lg object-contain",
    brandName: "font-bold text-sm",
    navCta: "rounded-lg px-3 py-1.5 text-xs font-bold",
    text: "#111827",
    heroWrap: "px-5 sm:px-10 py-12 sm:py-20 text-center",
    h1: "text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight max-w-3xl mx-auto",
    heroSub: "mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed",
    heroCtaWrap: "mt-6 flex flex-col sm:flex-row items-center justify-center gap-2",
    heroCtaPrimary: "w-full sm:w-auto rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition",
    heroCtaSecondary: "w-full sm:w-auto rounded-xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition",
    statsWrap: "px-5 sm:px-10 py-6 border-b border-gray-100 bg-gray-50/50",
    statNum: "text-2xl sm:text-3xl font-extrabold",
    statLabel: "text-[10px] sm:text-xs font-semibold text-gray-500 mt-1",
    sectionPad: "px-5 sm:px-10 py-12 sm:py-16",
    sectionPadAlt: "px-5 sm:px-10 py-12 sm:py-16 bg-gray-50/50 border-y border-gray-100",
    eyebrow: "text-[10px] font-bold uppercase tracking-widest mb-2",
    h2: "text-xl sm:text-3xl font-extrabold tracking-tight",
    problemCard: "rounded-2xl border border-red-100 bg-red-50/30 p-4 text-left",
    featureCard: "rounded-2xl bg-white p-4 sm:p-5 border border-gray-100 hover:border-gray-200 hover:shadow-md transition",
    featureIcon: "h-9 w-9 rounded-xl flex items-center justify-center mb-3",
    featureTitle: "text-sm font-bold text-gray-900",
    benefitItem: "flex items-start gap-3 rounded-xl bg-gray-50 p-3",
    testimonialWrap: "px-5 sm:px-10 py-12 sm:py-16 text-white",
    testimonialQuote: "text-base sm:text-xl font-medium leading-relaxed",
    pricingCard: "rounded-2xl p-5 bg-white border border-gray-100",
    pricingPopular: "shadow-xl border-2",
    price: "text-3xl font-extrabold",
    faqItem: "group rounded-xl bg-white border border-gray-100 p-4 cursor-pointer",
    finalCtaWrap: "px-5 sm:px-10 py-12 sm:py-20 text-center relative overflow-hidden",
    finalH2: "text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto",
    finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto",
  };

  if (tone === "Bold") {
    return {
      ...professional,
      font: "'Inter', system-ui, sans-serif",
      body: "bg-white text-black",
      nav: "flex items-center justify-between px-5 py-5 border-b-2 border-black bg-white",
      brandName: "font-black text-base uppercase tracking-tight",
      navCta: "rounded-none px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black",
      heroWrap: "px-5 sm:px-10 py-16 sm:py-28 text-center",
      h1: "text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter max-w-4xl mx-auto uppercase",
      heroSub: "mt-5 text-base sm:text-lg font-medium max-w-xl mx-auto leading-snug opacity-90",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-8 py-4 text-sm font-black uppercase tracking-wider shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border-2 px-8 py-4 text-sm font-black uppercase tracking-wider transition",
      statsWrap: "px-5 sm:px-10 py-8 border-y-2 border-black bg-yellow-100",
      statNum: "text-3xl sm:text-5xl font-black tracking-tighter",
      statLabel: "text-[10px] sm:text-xs font-black uppercase tracking-widest mt-1",
      sectionPad: "px-5 sm:px-10 py-16 sm:py-24",
      sectionPadAlt: "px-5 sm:px-10 py-16 sm:py-24 bg-black text-white border-y-4 border-black",
      eyebrow: "text-xs font-black uppercase tracking-[0.3em] mb-3",
      h2: "text-3xl sm:text-5xl font-black tracking-tighter uppercase",
      problemCard: "rounded-none border-2 border-black bg-white p-5 text-left shadow-[4px_4px_0_rgba(0,0,0,1)]",
      featureCard: "rounded-none bg-white p-5 sm:p-6 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition",
      featureIcon: "h-12 w-12 rounded-none flex items-center justify-center mb-3 border-2 border-black",
      featureTitle: "text-base font-black text-gray-900 uppercase",
      benefitItem: "flex items-start gap-3 rounded-none border-2 border-black bg-white p-4",
      testimonialWrap: "px-5 sm:px-10 py-16 sm:py-24",
      testimonialQuote: "text-xl sm:text-3xl font-black leading-tight tracking-tight",
      pricingCard: "rounded-none p-6 bg-white border-2 border-black",
      pricingPopular: "shadow-[6px_6px_0_rgba(0,0,0,1)]",
      price: "text-4xl sm:text-5xl font-black tracking-tighter",
      faqItem: "group rounded-none bg-white border-2 border-black p-4 cursor-pointer",
      finalH2: "text-3xl sm:text-5xl font-black tracking-tighter uppercase max-w-3xl mx-auto",
      finalSub: "mt-4 text-sm sm:text-base font-medium max-w-xl mx-auto",
    };
  }

  if (tone === "Minimal") {
    return {
      ...professional,
      font: "'Georgia', 'Times New Roman', serif",
      body: "bg-white text-gray-900",
      nav: "flex items-center justify-between px-6 sm:px-12 py-6 border-b border-gray-100",
      brandName: "font-normal text-base tracking-wide",
      navCta: "rounded-none px-4 py-2 text-xs font-medium tracking-wider uppercase",
      heroWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center",
      h1: "text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-6 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-normal",
      heroCtaWrap: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-80 transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border-b border-gray-900 px-2 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-70 transition",
      statsWrap: "px-6 sm:px-12 py-12 border-b border-gray-100",
      statNum: "text-4xl sm:text-5xl font-normal tracking-tight",
      statLabel: "text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mt-2",
      sectionPad: "px-6 sm:px-12 py-20 sm:py-28",
      sectionPadAlt: "px-6 sm:px-12 py-20 sm:py-28 border-y border-gray-100",
      eyebrow: "text-[10px] font-medium tracking-[0.3em] uppercase mb-4 text-gray-400",
      h2: "text-2xl sm:text-4xl font-normal tracking-tight",
      problemCard: "border-l-2 border-gray-200 bg-transparent pl-5 py-2 text-left",
      featureCard: "p-5 sm:p-6 border-t border-gray-100 hover:border-gray-300 transition",
      featureIcon: "h-8 w-8 flex items-center justify-center mb-4",
      featureTitle: "text-base font-normal text-gray-900 tracking-tight",
      benefitItem: "flex items-start gap-3 border-b border-gray-100 py-3",
      testimonialWrap: "px-6 sm:px-12 py-20 sm:py-28",
      testimonialQuote: "text-xl sm:text-2xl font-normal italic leading-relaxed",
      pricingCard: "p-6 border-t-2 border-gray-100",
      pricingPopular: "border-t-2",
      price: "text-4xl font-normal tracking-tight",
      faqItem: "group border-b border-gray-100 py-5 cursor-pointer",
      finalCtaWrap: "px-6 sm:px-12 py-20 sm:py-32 text-center relative overflow-hidden",
      finalH2: "text-3xl sm:text-5xl font-normal tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-4 text-base max-w-xl mx-auto font-normal",
    };
  }

    if (tone === "Playful") {
    return {
      ...professional,
      font: "'Nunito', 'Poppins', system-ui, sans-serif",
      body: "bg-white text-gray-900",
      nav: "flex items-center justify-between px-5 py-4 border-b-2 border-yellow-200 bg-white",
      brandName: "font-extrabold text-sm",
      navCta: "rounded-full px-4 py-1.5 text-xs font-extrabold",
      heroWrap: "px-5 sm:px-10 py-14 sm:py-24 text-center",
      h1: "text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed",
      heroCtaWrap: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200",
      heroCtaSecondary: "w-full sm:w-auto rounded-full border-2 px-8 py-3.5 text-sm font-extrabold text-gray-700 hover:bg-gray-50 transition",
      statsWrap: "px-5 sm:px-10 py-8 border-y-2 border-yellow-100 bg-yellow-50",
      statNum: "text-3xl sm:text-4xl font-extrabold",
      statLabel: "text-[10px] sm:text-xs font-bold text-gray-500 mt-1",
      sectionPad: "px-5 sm:px-10 py-14 sm:py-20",
      sectionPadAlt: "px-5 sm:px-10 py-14 sm:py-20 bg-orange-50/40 border-y-2 border-orange-100",
      eyebrow: "text-[10px] font-extrabold uppercase tracking-widest mb-2",
      h2: "text-2xl sm:text-4xl font-extrabold tracking-tight",
      problemCard: "rounded-3xl border-2 border-red-100 bg-red-50 p-5 text-left",
      featureCard: "rounded-3xl bg-white p-5 sm:p-6 border-2 border-gray-100 hover:border-orange-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-200",
      featureIcon: "h-11 w-11 rounded-2xl flex items-center justify-center mb-3",
      featureTitle: "text-sm font-extrabold text-gray-900",
      benefitItem: "flex items-start gap-3 rounded-2xl bg-orange-50 p-3.5 border border-orange-100",
      testimonialWrap: "px-5 sm:px-10 py-14 sm:py-20",
      testimonialQuote: "text-base sm:text-xl font-bold leading-relaxed",
      pricingCard: "rounded-3xl p-6 bg-white border-2 border-gray-100",
      pricingPopular: "shadow-2xl border-2 scale-[1.03]",
      price: "text-4xl font-extrabold",
      faqItem: "group rounded-2xl bg-white border-2 border-gray-100 p-4 cursor-pointer hover:border-orange-200 transition",
      finalCtaWrap: "px-5 sm:px-10 py-14 sm:py-24 text-center relative overflow-hidden",
      finalH2: "text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto",
    };
  }

  if (tone === "Friendly") {
    return {
      ...professional,
      font: "'Inter', system-ui, sans-serif",
      body: "bg-slate-50 text-gray-900",
      nav: "flex items-center justify-between px-5 py-4 bg-white shadow-sm",
      brandName: "font-bold text-sm",
      navCta: "rounded-xl px-4 py-1.5 text-xs font-bold",
      heroWrap: "px-5 sm:px-10 py-14 sm:py-22 text-center",
      h1: "text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight max-w-3xl mx-auto",
      heroSub: "mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-loose",
      heroCtaWrap: "mt-7 flex flex-col sm:flex-row items-center justify-center gap-3",
      heroCtaPrimary: "w-full sm:w-auto rounded-2xl px-7 py-3 text-sm font-bold text-white shadow-md hover:shadow-lg hover:opacity-95 transition",
      heroCtaSecondary: "w-full sm:w-auto rounded-2xl border border-gray-200 px-7 py-3 text-sm font-semibold text-gray-600 hover:bg-white transition",
      statsWrap: "px-5 sm:px-10 py-8 bg-white shadow-sm border-y border-gray-100",
      statNum: "text-2xl sm:text-3xl font-bold",
      statLabel: "text-[10px] sm:text-xs font-semibold text-gray-400 mt-1",
      sectionPad: "px-5 sm:px-10 py-12 sm:py-18",
      sectionPadAlt: "px-5 sm:px-10 py-12 sm:py-18 bg-white border-y border-gray-100",
      eyebrow: "text-[10px] font-bold uppercase tracking-widest mb-2",
      h2: "text-xl sm:text-3xl font-bold tracking-tight",
      problemCard: "rounded-2xl border border-red-100 bg-red-50/50 p-4 text-left shadow-sm",
      featureCard: "rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition",
      featureIcon: "h-10 w-10 rounded-xl flex items-center justify-center mb-3",
      featureTitle: "text-sm font-bold text-gray-900",
      benefitItem: "flex items-start gap-3 rounded-xl bg-slate-50 p-3 border border-gray-100",
      testimonialWrap: "px-5 sm:px-10 py-12 sm:py-18",
      testimonialQuote: "text-base sm:text-lg font-medium leading-relaxed",
      pricingCard: "rounded-2xl p-5 bg-white border border-gray-100 shadow-sm",
      pricingPopular: "shadow-xl border-2",
      price: "text-3xl font-bold",
      faqItem: "group rounded-xl bg-white border border-gray-100 p-4 cursor-pointer shadow-sm hover:shadow transition",
      finalCtaWrap: "px-5 sm:px-10 py-14 sm:py-22 text-center relative overflow-hidden",
      finalH2: "text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl mx-auto",
      finalSub: "mt-3 text-sm sm:text-base max-w-xl mx-auto text-gray-500",
    };
  }

  if (tone === "Luxury") {
    return {
      ...professional,
      font: "'Cormorant Garamond', 'Didot', 'Georgia', serif",
      body: "bg-[#0a0a0a] text-[#e8e0d0]",
      nav: "flex items-center justify-between px-6 sm:px-14 py-6 border-b border-[#ffffff12] bg-[#0a0a0a]",
      brandName: "font-light text-sm tracking-[0.25em] uppercase text-[#e8e0d0]",
      navCta: "rounded-none px-5 py-2 text-[10px] font-light tracking-[0.3em] uppercase border border-[#e8e0d030]",
      text: "#e8e0d0",
      heroWrap: "px-6 sm:px-14 py-24 sm:py-40 text-center",
      h1: "text-3xl sm:text-5xl lg:text-7xl font-light leading-[1.1] tracking-[0.02em] max-w-4xl mx-auto text-[#f5f0e8]",
      heroSub: "mt-6 text-sm sm:text-base text-[#9a9080] max-w-xl mx-auto leading-loose font-light tracking-wide",
      heroCtaWrap: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
      heroCtaPrimary: "w-full sm:w-auto rounded-none px-10 py-4 text-[10px] font-light tracking-[0.4em] uppercase hover:opacity-80 transition-opacity duration-300",
      heroCtaSecondary: "w-full sm:w-auto rounded-none border border-[#ffffff30] px-10 py-4 text-[10px] font-light tracking-[0.4em] uppercase text-[#9a9080] hover:text-[#e8e0d0] hover:border-[#ffffff60] transition duration-300",
      statsWrap: "px-6 sm:px-14 py-12 border-y border-[#ffffff10] bg-[#0f0f0f]",
      statNum: "text-3xl sm:text-5xl font-extralight tracking-tight text-[#f5f0e8]",
      statLabel: "text-[10px] font-light tracking-[0.3em] uppercase text-[#6b6055] mt-2",
      sectionPad: "px-6 sm:px-14 py-20 sm:py-32",
      sectionPadAlt: "px-6 sm:px-14 py-20 sm:py-32 bg-[#0f0f0f] border-y border-[#ffffff08]",
      eyebrow: "text-[9px] font-light tracking-[0.5em] uppercase mb-4 text-[#6b6055]",
      h2: "text-2xl sm:text-4xl font-light tracking-wide text-[#f5f0e8]",
      problemCard: "border-l border-[#ffffff15] bg-transparent pl-6 py-3 text-left",
      featureCard: "p-6 sm:p-8 border-t border-[#ffffff08] hover:border-[#ffffff20] bg-transparent transition duration-300",
      featureIcon: "h-8 w-8 flex items-center justify-center mb-5",
      featureTitle: "text-sm font-light tracking-widest text-[#e8e0d0] uppercase",
      benefitItem: "flex items-start gap-4 border-b border-[#ffffff08] py-4",
      testimonialWrap: "px-6 sm:px-14 py-20 sm:py-32 bg-[#0f0f0f]",
      testimonialQuote: "text-lg sm:text-2xl font-light italic leading-relaxed tracking-wide text-[#e8e0d0]",
      pricingCard: "p-8 border border-[#ffffff10] bg-[#0f0f0f]",
      pricingPopular: "border border-[#c9a84c50] shadow-[0_0_40px_rgba(201,168,76,0.08)]",
      price: "text-4xl font-extralight tracking-tight text-[#f5f0e8]",
      faqItem: "group border-b border-[#ffffff08] py-6 cursor-pointer hover:border-[#ffffff20] transition duration-300",
      finalCtaWrap: "px-6 sm:px-14 py-24 sm:py-40 text-center relative overflow-hidden bg-[#0a0a0a]",
      finalH2: "text-2xl sm:text-5xl font-light tracking-wide max-w-3xl mx-auto text-[#f5f0e8]",
      finalSub: "mt-5 text-sm max-w-xl mx-auto font-light tracking-wide text-[#6b6055]",
    };
  }

  return professional;
}

function getEmbedUrl(url) {
  if (!url) return "";
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}