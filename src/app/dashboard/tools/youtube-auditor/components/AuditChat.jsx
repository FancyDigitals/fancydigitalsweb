"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SUGGESTED = [
  "What should I post next to grow fastest?",
  "Why aren't my views converting to subscribers?",
  "How do I fix my thumbnail strategy?",
  "What's blocking me from monetization?",
];

export default function AuditChat({ auditData, isPro }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    const nextMessages = [...messages, { role: "user", content: q }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tools/youtube-auditor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          auditData,
          history: messages,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Chat failed");

      setMessages([
        ...nextMessages,
        { role: "assistant", content: json.reply },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isPro) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-red-900/40 rounded-2xl p-6 sm:p-8 text-white border border-white/10 overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-400/30 px-3 py-1 text-[10px] font-bold text-amber-200 uppercase tracking-wider mb-4">
            Pro Feature
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Chat with your audit
          </h3>
          <p className="text-white/70 text-sm sm:text-base mb-5 max-w-lg">
            Ask anything about your channel. Get strategic answers based on your
            actual data — like having a YouTube consultant on call 24/7.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {SUGGESTED.map((s, i) => (
              <div
                key={i}
                className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70"
              >
                “{s}”
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition text-sm"
          >
            Upgrade to Pro
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">Ask Your Audit</h3>
          <p className="text-xs text-gray-500">
            Strategic answers based on your channel data
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto"
      >
        {messages.length === 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-3">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="text-left text-xs sm:text-sm bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-100 rounded-lg px-3 py-2.5 text-gray-700 hover:text-red-700 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 sm:gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 shrink-0 flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gray-900 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-900 rounded-bl-sm"
              }`}
            >
              {m.content.split("\n").map((line, j) => (
                <p key={j} className={j > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-orange-600 shrink-0 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your channel..."
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl transition shrink-0"
            aria-label="Send"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}