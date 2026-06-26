import { getUserProfile } from "@/lib/auth/actions";
import { redirect } from "next/navigation";
import ClientsPageClient from "./client";

export const metadata = {
  title: "Clients — Fancy Digitals",
};

export default async function ClientsPage() {
  const profile = await getUserProfile();
  if (!profile) redirect("/signin");
  return <ClientsPageClient />;
}