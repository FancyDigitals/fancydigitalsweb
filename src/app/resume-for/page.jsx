import Link from "next/link";
import { jobRoles } from "@/data/job-roles";
import { Briefcase, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Professional Resume Examples for Every Industry | Fancy Digitals",
  description: "Browse our collection of 50+ AI-optimized resume examples and templates for various job roles. Built by Fancy Digitals.",
};

export default function ResumeHub() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Professional <span className="text-[#075a01]">Resume</span> Examples
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your job role to see AI-optimized resume structures, keywords, and samples designed to pass ATS filters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobRoles.map((role) => (
            <Link
              key={role.slug}
              href={`/resume-for/${role.slug}`}
              className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-[#0a8f01] hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-[#075a01] group-hover:text-white transition-colors text-[#075a01]">
                  <Briefcase size={20} />
                </div>
                <span className="font-medium text-gray-800 group-hover:text-[#075a01]">
                  {role.title} Resume
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-[#075a01]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}