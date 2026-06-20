import ForgotForm from "./ForgotForm";
import Link from "next/link";

export const metadata = {
  title: "Forgot Password — Fancy Digitals",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-5 py-12">
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
            <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll send you a reset link
            </p>
          </div>

          <ForgotForm />

          <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link href="/signin" className="font-semibold text-[#075a01] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}