"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-10 w-20 rounded-xl bg-gray-100 animate-pulse" />;
  }

  if (user) {
    return (
      <Link
        href="/dashboard"
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#075a01] to-[#0a8f01] px-4 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition"
      >
        <span>Dashboard</span>
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href="/signin"
      className="flex items-center gap-2 rounded-xl border-2 border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#075a01]/20 hover:text-[#075a01] transition"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      Sign In
    </Link>
  );
}