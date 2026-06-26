"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";

export default function ClientLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/client/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      window.location.href = "/client/dashboard";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075a01]/5 via-white to-[#ff914d]/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Fancy Digitals</span>
          </Link>
          <p className="mt-3 text-sm text-gray-500">Client Portal</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to view your website and leads</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)" }}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 transition shadow-lg"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Don't have access?{" "}
            <span className="text-gray-700 font-semibold">
              Contact the agency that built your website.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}