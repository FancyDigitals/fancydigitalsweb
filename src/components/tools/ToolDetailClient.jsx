"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import { readOverride } from "@/lib/adminStorage";

const STORAGE_KEY = "tools.index";

/* ===============================
   HELPERS
================================ */

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getTool(index, slug) {
  const list = normalizeArray(index);
  const tool = list.find((t) => t && t.slug === slug);
  if (!tool || tool.published === false) return null;
  return tool;
}

/* ===============================
   COMPONENT
================================ */

export default function ToolDetailClient({ slug, defaultIndex }) {
  const [toolsIndex, setToolsIndex] = useState(defaultIndex);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const override = readOverride(STORAGE_KEY);
    if (override) {
      setToolsIndex(normalizeArray(override));
    }
    setHydrated(true);
  }, []);

  const tool = useMemo(() => {
    return getTool(toolsIndex, slug);
  }, [toolsIndex, slug]);

  /* ===============================
     NOT FOUND
  ================================ */

  if (!tool) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="mx-auto max-w-6xl px-5 pt-40 md:px-10">
          <h1 className="text-3xl font-semibold">Tool not found</h1>
          <p className="mt-3 text-sm text-gray-600">
            {hydrated
              ? "This tool does not exist or is unpublished."
              : "Loading tool data…"}
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-block text-sm font-semibold text-[#075a01]"
          >
            ← Back to tools
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  /* ===============================
     SCHEMA
  ================================ */

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: tool.desc,
    image: tool.image,
    publisher: {
      "@type": "Organization",
      name: "Fancy Digitals",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability:
        tool.status === "Coming Soon"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
    },
  };

  /* ===============================
     RENDER
  ================================ */

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-36 pb-16 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
          {tool.category}
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          {tool.name}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600">
          {tool.desc}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-black/5 px-4 py-1 text-xs font-semibold text-gray-700">
            {tool.status}
          </span>
          <span className="text-sm font-semibold text-[#075a01]">
            Early access available
          </span>
        </div>
      </section>

      {/* VISUAL */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="relative h-[420px] overflow-hidden rounded-3xl border border-black/10 bg-gray-50 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${tool.image})` }}
          />
        </div>
      </section>

      {/* DETAILS */}
      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">What this tool does</h2>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              {normalizeArray(tool.features).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Who it’s for</h2>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              {normalizeArray(tool.whoFor).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#075a01]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
                Built by Fancy Digitals
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Clean UX. Premium execution. Future-ready tooling.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#075a01] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Request a tool
                </Link>

                <Link
                  href="/tools"
                  className="rounded-xl border border-black/10 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-black/5"
                >
                  Back to tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="mx-auto max-w-6xl px-5 pb-32 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-8 py-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:px-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#075a01] to-[#ff914d]" />

          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
              Early Access
            </p>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              Get notified when this tool launches
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Join the waitlist to receive early access and product updates.
            </p>

            <WaitlistForm toolName={tool.name} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
