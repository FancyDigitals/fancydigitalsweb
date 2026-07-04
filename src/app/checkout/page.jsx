import { Suspense } from "react";
import CheckoutClient from "./client";

export const metadata = {
  title: "Checkout | Fancy Digitals",
  description: "Complete your purchase and unlock all AI tools.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CheckoutClient />
    </Suspense>
  );
}