import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ContentClient from "./client";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export const metadata = {
  title: "Content Manager | Fancy Digitals Admin",
  robots: { index: false, follow: false },
};

export default async function ContentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin");
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect("/dashboard");
  }

  return <ContentClient />;
}