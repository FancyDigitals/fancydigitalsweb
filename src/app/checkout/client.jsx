"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { REGIONAL_PRICING, getRegionForCountry, formatPrice } from "@/lib/pricing";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Shield,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Building,
  Hash,
  User,
  Globe,
  Mail,
} from "lucide-react";

const PLAN_LABELS = {
  pro_monthly: { label: "Pro (Monthly)", tagline: "Unlimited for solo users" },
  pro_yearly: { label: "Pro (Yearly)", tagline: "Unlimited for solo users" },
  agency_monthly: { label: "Agency (Monthly)", tagline: "Manage clients & scale up" },
  agency_yearly: { label: "Agency (Yearly)", tagline: "Manage clients & scale up" },
};

const BANK = {
  name: "Opay",
  accountNumber: "9025648189",
  accountName: "Ismail Olakunle (Fancy Digitals)",
};

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const el = document.createElement("textarea");
          el.value = text;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors"
      style={{
        borderColor: copied ? "#075a01" : "#d1d5db",
        color: copied ? "#075a01" : "#6b7280",
        backgroundColor: copied ? "#f0fdf4" : "white",
      }}
    >
      {copied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
    </button>
  );
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan");

  const [detectedRegion, setDetectedRegion] = useState(null);
  const [detectionLoading, setDetectionLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        const r = getRegionForCountry(data.country);
        setDetectedRegion(r);
      })
      .catch(() => setDetectedRegion("NG"))
      .finally(() => setDetectionLoading(false));
  }, []);

  const planInfo = PLAN_LABELS[planKey];

  // ALWAYS use Naira pricing since we only accept NGN
  const nairaPricing = REGIONAL_PRICING.NG;

  let amount = 0;
  if (planInfo && nairaPricing) {
    if (planKey === "pro_monthly") amount = nairaPricing.monthly;
    else if (planKey === "pro_yearly") amount = nairaPricing.yearly;
    else if (planKey === "agency_monthly") amount = nairaPricing.agencyMonthly;
    else if (planKey === "agency_yearly") amount = nairaPricing.agencyYearly;
  }

  // Invalid plan
  if (!planInfo) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid plan</h1>
          <p className="text-sm text-gray-600 mb-6">
            The plan you selected doesn't exist. Head back to pricing to pick a plan.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#075a01] text-white text-sm font-bold hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pricing
          </Link>
        </div>
      </main>
    );
  }

  // While detecting region
  if (detectionLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
      </main>
    );
  }

  // Not in Nigeria — show coming soon
  if (detectedRegion !== "NG") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-amber-100 mb-4">
              <Globe className="h-7 w-7 text-amber-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              International checkout coming soon
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              We're currently only accepting payments from Nigeria (bank transfer).
              International payments via card and PayPal are on the way.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Want early access?
              </p>
              <p className="text-sm text-gray-700 mb-3">
                Email us and we'll manually set up your plan with a card link.
              </p>
              <a
                href={`mailto:hello@fancydigitals.com.ng?subject=International%20Checkout%20-%20${planInfo.label}&body=Hi,%20I'd%20like%20to%20subscribe%20to%20${planInfo.label}%20but%20I'm%20not%20in%20Nigeria.%20Please%20send%20me%20a%20payment%20link.`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#075a01] hover:underline"
              >
                <Mail className="h-4 w-4" />
                hello@fancydigitals.com.ng
              </a>
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to pricing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          plan: planKey,
          amount,
          currency: "NGN",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setOrder(data.order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ORDER CREATED — Show bank details
  // ═══════════════════════════════════════════════════════════════
  if (order) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16">
        <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] px-4 py-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-white/10 backdrop-blur-sm mb-3">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Order created!
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Just transfer to complete your purchase.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 -mt-6">
          {/* Reference code */}
          <div className="bg-white rounded-2xl border-2 border-amber-400 shadow-lg p-6 mb-4">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-1">
              Your reference code
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">
                {order.reference_code}
              </p>
              <CopyBtn text={order.reference_code} />
            </div>
            <p className="mt-3 text-xs text-gray-600 leading-relaxed">
              <strong>Important:</strong> Put this code in the transfer description/narration. This is how we match your payment to your account.
            </p>
          </div>

          {/* Bank details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Transfer to this account
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Bank</p>
                    <p className="text-sm font-bold text-gray-900">{BANK.name}</p>
                  </div>
                </div>
                <CopyBtn text={BANK.name} />
              </div>

              <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Account number</p>
                    <p className="text-sm font-bold text-gray-900">{BANK.accountNumber}</p>
                  </div>
                </div>
                <CopyBtn text={BANK.accountNumber} />
              </div>

              <div className="flex items-center justify-between gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Account name</p>
                    <p className="text-sm font-bold text-gray-900">{BANK.accountName}</p>
                  </div>
                </div>
                <CopyBtn text={BANK.accountName} />
              </div>

              <div className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-xl font-bold text-[#075a01]">
                    ₦{Number(order.amount).toLocaleString()}
                  </p>
                </div>
                <CopyBtn text={String(order.amount)} />
              </div>
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">What happens next?</p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Transfer with reference <strong>{order.reference_code}</strong></li>
                  <li>We verify within 15 minutes (business hours)</li>
                  <li>You get an email — your plan is activated</li>
                </ol>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Any issues? Email{" "}
            <a href="mailto:hello@fancydigitals.com.ng" className="font-bold text-[#075a01] hover:underline">
              hello@fancydigitals.com.ng
            </a>{" "}
            with reference <strong>{order.reference_code}</strong>
          </p>

          <div className="mt-6">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white"
              style={{ backgroundColor: "#075a01" }}
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // FORM
  // ═══════════════════════════════════════════════════════════════
  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-gradient-to-br from-[#075a01] to-[#0a8f01] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white mb-3"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to pricing
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-white" />
            <h1 className="text-lg sm:text-xl font-bold text-white">Complete your order</h1>
          </div>
          <p className="text-sm text-white/80">
            Fill your details. Get bank info. Transfer. Done.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4">
        {/* Order summary */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#075a01]">
                You're buying
              </p>
              <p className="text-lg font-bold text-gray-900 mt-1">{planInfo.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{planInfo.tagline}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#075a01]">
                ₦{Number(amount).toLocaleString()}
              </p>
              {planKey.includes("yearly") && (
                <p className="text-[10px] text-gray-500">billed yearly</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Your details
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Full name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Bashir Ismail"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Your Fancy Digitals account email. This is what gets upgraded.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">Optional. For faster verification via WhatsApp.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Anything we should know?"
              rows={2}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity disabled:opacity-70"
            style={{ backgroundColor: "#075a01" }}
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" />Creating order...</>
            ) : (
              <>Continue to payment</>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
            <Shield className="h-3 w-3" />
            <span>Secure checkout · 7-day money-back guarantee</span>
          </div>
        </form>
      </div>
    </main>
  );
}