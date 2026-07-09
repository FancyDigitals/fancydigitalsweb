import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminAcademyClient from "./client";

export default async function AdminAcademyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== "fancydigitalsng@gmail.com") {
    redirect("/dashboard");
  }

  return <AdminAcademyClient />;
}