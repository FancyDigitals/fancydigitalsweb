"use client";

import { useState } from "react";
import { Loader2, Lock, Eye, EyeOff, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AcceptInviteClient({ token, clientEmail, clientName }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/client/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to activate account");
        return;
      }

      setDone(true);
      setTimeout(() => {
        window.location.href = "/client/dashboard";
      }, 2000);
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
          <p className="mt-3 text-sm text-gray-500">Client Portal Activation</p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 shadow-xl p-8">
          {done ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Account Activated!</h2>
              <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                Welcome{clientName ? `, ${clientName}` : ""}
              </h1>
              <p className="text-sm text-gray-500 mb-5">
                Set a password to activate your client portal and view your website dashboard.
              </p>

              <div className="rounded-xl bg-[#075a01]/5 border border-[#075a01]/10 px-4 py-3 mb-5">
                <p className="text-xs font-semibold text-gray-700">
                  Logging in as:{" "}
                  <span className="text-[#075a01]">{clientEmail}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      required
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword
                        ? <EyeOff className="h-4 w-4" />
                        : <Eye className="h-4 w-4" />
                      }
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat your password"
                      required
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#075a01] focus:ring-2 focus:ring-[#075a01]/20 transition"
                    />
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
                    <><Loader2 className="h-4 w-4 animate-spin" /> Activating...</>
                  ) : (
                    "Activate My Account"
                  )}
                </button>
              </form>

              <p className="mt-5 text-center text-xs text-gray-400">
                Already activated?{" "}
                <Link href="/client/login" className="font-semibold text-[#075a01] hover:underline">
                  Sign in here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}