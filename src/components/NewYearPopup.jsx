"use client";

import { useEffect, useState } from "react";

/* =====================================================
   CONFIG
===================================================== */

const STORAGE_SEEN = "fancy_new_year_2026_seen";
const STORAGE_NAME = "fancy_visitor_name";

const START_DATE = new Date("2026-01-01T00:00:00");
const END_DATE   = new Date("2026-01-07T23:59:59");
const OPEN_DELAY = 700;

/* =====================================================
   COMPONENT
===================================================== */

export default function NewYearPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("intro"); // intro | name | greet
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const now = new Date();
    if (now < START_DATE || now > END_DATE) return;

    const seen = localStorage.getItem(STORAGE_SEEN);
    const savedName = localStorage.getItem(STORAGE_NAME);

    if (savedName) {
      setName(savedName);
      setStep("greet");
    }

    if (!seen) {
      const timer = setTimeout(() => setOpen(true), OPEN_DELAY);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  function closePopup() {
    localStorage.setItem(STORAGE_SEEN, "true");
    setOpen(false);
  }

  function proceed() {
    setStep("name");
  }

  function submitName(e) {
    e.preventDefault();
    if (!name.trim()) return;

    localStorage.setItem(STORAGE_NAME, name.trim());
    setStep("greet");
  }

  if (!open) return null;

  return (
    <div className="ny-overlay" onClick={closePopup}>
      <div
        className="ny-popup ny-animate-in"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ny-close" onClick={closePopup} aria-label="Close">
          &times;
        </button>

        <div className="ny-glow" />

        {/* INTRO */}
        {step === "intro" && (
          <div>
            <div className="ny-badge">WELCOME TO 2026</div>

            <h2 className="ny-title shimmer">
              A Brighter Year Begins
            </h2>

            <p className="ny-text">
              New goals. New momentum. New possibilities.
              <br />
              Let’s start this year with clarity and intention.
            </p>

            <button className="ny-cta" onClick={proceed}>
              Let’s Begin
            </button>
          </div>
        )}

        {/* NAME */}
        {step === "name" && (
          <form onSubmit={submitName}>
            <h2 className="ny-title">Before we continue…</h2>

            <p className="ny-text">
              Tell us your name so we can make this experience personal.
            </p>

            <input
              className="ny-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <button type="submit" className="ny-cta">
              Enter the New Year
            </button>
          </form>
        )}

        {/* GREETING */}
        {step === "greet" && (
          <div>
            <h2 className="ny-title">
              Welcome to 2026{ name ? `, ${name}` : "" }
            </h2>

            <p className="ny-text">
              This year is about bold ideas, strategic growth,
              and building digital experiences that truly stand out.
            </p>

            <a href="/contact" className="ny-cta">
              Start a Project
            </a>

            <p className="ny-footnote">
              Fancy Digitals • Premium design • Real impact
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
