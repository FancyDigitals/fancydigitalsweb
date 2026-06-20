import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  FileText,
  Mail,
  Calendar,
  ArrowRight,
  FolderOpen,
  Crown,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "My Projects — Fancy Digitals",
};

const TOOL_INFO = {
  "ai-resume-builder": {
    name: "Resume",
    icon: FileText,
    color: "blue",
    href: "/dashboard/tools/ai-resume-builder",
  },
  "ai-cover-letter": {
    name: "Cover Letter",
    icon: Mail,
    color: "purple",
    href: "/dashboard/tools/ai-cover-letter",
  },
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin?redirect=/dashboard/projects");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const isPro = profile?.plan !== "free";

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalProjects = projects?.length || 0;
  const visibleProjects = isPro ? projects : projects?.slice(0, 3);
  const hiddenCount = isPro ? 0 : Math.max(0, totalProjects - 3);

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          My Projects
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          All your AI-generated resumes and cover letters
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Total Projects
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalProjects}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Resumes
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {projects?.filter((p) => p.tool_slug === "ai-resume-builder").length || 0}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Cover Letters
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {projects?.filter((p) => p.tool_slug === "ai-cover-letter").length || 0}
          </p>
        </div>
      </div>

      {/* Free user limit notice */}
      {!isPro && hiddenCount > 0 && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#075a01]/10 to-[#0a8f01]/10 border border-[#075a01]/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {hiddenCount} {hiddenCount === 1 ? "project" : "projects"} hidden
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Free plan saves only the last 3. Upgrade to access all projects.
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
            className="shrink-0 inline-flex items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-bold hover:opacity-90 active:scale-95 transition"
          >
            Upgrade
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* Projects List */}
      {!projects || projects.length === 0 ? (
        <div className="rounded-2xl bg-white border-2 border-dashed border-gray-200 p-8 sm:p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 mx-auto mb-4">
            <FolderOpen className="h-8 w-8 text-gray-300" />
          </div>
          <p className="font-bold text-gray-900 mb-1">No projects yet</p>
          <p className="text-sm text-gray-500 mb-4">
            Generate your first resume or cover letter to see it here
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/dashboard/tools/ai-resume-builder"
              style={{ background: "linear-gradient(to right, #075a01, #0a8f01)", color: "#fff" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90"
            >
              <FileText className="h-4 w-4" />
              Build Resume
            </Link>
            <Link
              href="/dashboard/tools/ai-cover-letter"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Mail className="h-4 w-4" />
              Write Cover Letter
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleProjects?.map((project) => {
            const tool = TOOL_INFO[project.tool_slug] || TOOL_INFO["ai-resume-builder"];
            const Icon = tool.icon;
            const date = new Date(project.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-white border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-${tool.color}-50`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${tool.color}-600`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm sm:text-base truncate">
                          {project.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                          {tool.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                        <Calendar className="h-3 w-3" />
                        {date}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={tool.href}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition"
                      >
                        Create Similar
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}