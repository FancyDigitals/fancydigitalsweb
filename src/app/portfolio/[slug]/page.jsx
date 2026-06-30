import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import PortfolioSingleClient from "./client";

export const revalidate = 60;

async function getProject(slug) {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

async function getRelated(currentId, categoryId) {
  const supabase = createAdminClient();
  const query = supabase
    .from("portfolio_projects")
    .select("id, slug, title, excerpt, hero_image, client_name, industry")
    .eq("status", "published")
    .neq("id", currentId)
    .limit(3);

  if (categoryId) {
    query.eq("category_id", categoryId);
  }

  const { data } = await query;
  return data || [];
}

export async function generateMetadata(props) {
  const params = await props.params;
  const project = await getProject(params.slug);

  if (!project) {
    return { title: "Project Not Found | Fancy Digitals" };
  }

  return {
    title: `${project.title} | Fancy Digitals Portfolio`,
    description: project.excerpt || `Case study: ${project.title} by Fancy Digitals.`,
    alternates: {
      canonical: `https://fancydigitals.com.ng/portfolio/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.excerpt || "",
      url: `https://fancydigitals.com.ng/portfolio/${project.slug}`,
      type: "article",
      images: project.hero_image ? [{ url: project.hero_image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt || "",
      images: project.hero_image ? [project.hero_image] : [],
    },
  };
}

export default async function PortfolioSinglePage(props) {
  const params = await props.params;
  const project = await getProject(params.slug);

  if (!project) notFound();

  const related = await getRelated(project.id, project.category_id);

  return <PortfolioSingleClient project={project} related={related} />;
}