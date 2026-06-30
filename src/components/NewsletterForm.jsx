"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterForm({ source = "blog", compact = false }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to subscribe");
      } else {
        setSuccess(data.message || "Subscribed!");
        setEmail("");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-3 text-sm">
        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
        <p className="text-green-800 font-medium">{success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={loading}
        required
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#075a01] disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2.5 bg-[#075a01] text-white rounded-lg text-sm font-semibold hover:bg-[#0a8f01] transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
      {error && (
        <div className="flex items-start gap-1.5 text-xs text-red-600 mt-1.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
}