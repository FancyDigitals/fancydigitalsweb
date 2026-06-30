import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProjectEditorClient from "./client";

const ADMIN_EMAIL = "fancydigitalsng@gmail.com";

export const metadata = {
  title: "Project Editor | Fancy Digitals Admin",
  robots: { index: false, follow: false },
};

export default async function ProjectEditorPage(props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/signin");
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect("/dashboard");
  }

  const params = await props.params;
  return <ProjectEditorClient projectId={params.id} />;
}