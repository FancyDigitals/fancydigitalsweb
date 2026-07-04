import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OrdersClient from "./client";

export const metadata = {
  title: "Orders | Fancy Digitals Admin",
};

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.email !== ADMIN_EMAIL) redirect("/dashboard");

  return <OrdersClient />;
}