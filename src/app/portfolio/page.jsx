import { createAdminClient } from "@/lib/supabase/admin";
import PortfolioClient from "./client";

export const revalidate = 60;

export const metadata = {
  title: "Portfolio | Fancy Digitals",
  description:
    "Selected work across web development, branding, SEO, and digital growth systems built by Fancy Digitals.",
  alternates: {
    canonical: "https://fancydigitals.com.ng/portfolio",
  },
  openGraph: {
    title: "Portfolio | Fancy Digitals",
    description:
      "Selected work across web development, branding, SEO, and digital growth systems.",
    url: "https://fancydigitals.com.ng/portfolio",
    type: "website",
  },
};

export default async function PortfolioPage() {
  const supabase = createAdminClient();

  // Get published projects
  const { data: projects } = await supabase
    .from("portfolio_projects")
    .select("id, slug, title, excerpt, hero_image, client_name, industry, tech_stack, featured, category_id, display_order, published_at")
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("display_order", { ascending: true })
    .order("published_at", { ascending: false });

  // Get categories used by published projects
  const { data: categories } = await supabase
    .from("portfolio_categories")
    .select("id, slug, name");

  return (
    <PortfolioClient
      projects={projects || []}
      categories={categories || []}
    />
  );
}