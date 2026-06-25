import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PublishedPageClient from "./client";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("published_pages")
    .select("page_data, business_name")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) {
    return { title: "Page Not Found" };
  }

  const seo = data.page_data?.seo || {};
  return {
    title: seo.title || `${data.business_name}`,
    description: seo.description || `Visit ${data.business_name}`,
    openGraph: {
      title: seo.title || data.business_name,
      description: seo.description,
    },
  };
}

export default async function PublishedPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: pageRow } = await supabase
    .from("published_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!pageRow) {
    notFound();
  }

  // Increment view count (fire and forget)
  supabase
    .from("published_pages")
    .update({ views: (pageRow.views || 0) + 1 })
    .eq("id", pageRow.id)
    .then(() => {});

  return (
    <PublishedPageClient
      page={pageRow.page_data}
      form={pageRow.form_data}
      pageId={pageRow.id}
      slug={pageRow.slug}
    />
  );
}