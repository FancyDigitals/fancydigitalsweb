import SignInForm from "./SignInForm";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In — Fancy Digitals",
  description: "Sign in to your account.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-5 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#075a01]/5 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#ff914d]/5 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] shadow-lg">
              <img src="/logo.png" alt="Fancy Digitals" className="h-6 brightness-0 invert" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Fancy Digitals</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
          </div>

          <Suspense fallback={<div className="h-64" />}>
            <SignInForm />
          </Suspense>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#075a01] hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}