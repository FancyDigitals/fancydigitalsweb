import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ExternalLink, Palette, Type, Sparkles } from "lucide-react";

export async function generateMetadata({ params }) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("brand_kits")
    .select("business_name, tagline")
    .eq("share_token", params.token)
    .eq("is_public", true)
    .single();

  if (!data) return { title: "Brand Kit | Fancy Digitals" };

  return {
    title: `${data.business_name || "Brand Kit"} | Fancy Digitals`,
    description: data.tagline || "AI-generated brand identity.",
  };
}

export default async function BrandKitSharePage({ params }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("share_token", params.token)
    .eq("is_public", true)
    .single();

  if (!data || error) notFound();

  const kit = data.kit_data || {};
  const primaryColor = kit.colors?.[0]?.hex || "#075a01";
  const secondaryColor = kit.colors?.[1]?.hex || "#0a8f01";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div
        className="py-20 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            AI Brand Kit
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">
            {kit.business_name}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto">
            {kit.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Story */}
        {kit.brand_story && (
          <section>
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Brand Story
            </h2>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {kit.brand_story}
            </p>
          </section>
        )}

        {/* Colors */}
        {kit.colors && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Color Palette
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {kit.colors.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-gray-200"
                >
                  <div className="h-24" style={{ backgroundColor: c.hex }} />
                  <div className="p-3 bg-white">
                    <div className="text-xs font-bold">{c.name}</div>
                    <div className="text-[10px] font-mono text-gray-500 mt-0.5">
                      {c.hex}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Typography */}
        {kit.typography && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-gray-400" />
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Typography
              </h2>
            </div>
            <div className="space-y-4">
              {["heading", "body", "mono"].map((type) => {
                const t = kit.typography[type];
                if (!t) return null;
                return (
                  <div
                    key={type}
                    className="p-5 rounded-2xl border border-gray-200 bg-white"
                  >
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {type} Font
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {t.family}
                    </div>
                    <div
                      className="text-2xl text-gray-900 mt-2"
                      style={{
                        fontFamily: `"${t.family}", sans-serif`,
                        fontWeight: type === "heading" ? 800 : 400,
                      }}
                    >
                      {t.sample}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <h2 className="text-2xl font-black mb-2">
            Create your own brand kit
          </h2>
          <p className="text-white/80 text-sm mb-5">
            Generate a complete brand identity in 60 seconds — free to try.
          </p>
          <a
            href="/dashboard/tools/ai-brand-kit-generator"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Try it free
          </a>
        </div>

        <div className="text-center text-xs text-gray-400">
          Generated with{" "}
          <a href="/" className="text-[#075a01] font-semibold hover:underline">
            Fancy Digitals
          </a>
        </div>
      </div>
    </div>
  );
}