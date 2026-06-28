import { getUserProfile } from "@/lib/auth/actions";
import { signOut } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Globe,
  Users,
  Sparkles,
} from "lucide-react";

export default async function DashboardLayout({ children }) {
  const profile = await getUserProfile();
  const isPro = profile?.plan !== "free";
  const displayName = profile?.full_name || profile?.email?.split("@")[0];

    // Fetch unseen leads count for badge
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let unseenLeadsCount = 0;
  if (user) {
    const { data: userPages } = await supabase
      .from("published_pages")
      .select("id")
      .eq("user_id", user.id);

    const pageIds = (userPages || []).map((p) => p.id);

    if (pageIds.length > 0) {
      const { count } = await supabase
        .from("page_leads")
        .select("id", { count: "exact", head: true })
        .in("page_id", pageIds)
        .eq("is_seen", false);

      unseenLeadsCount = count || 0;
    }
  }
      const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "AI Visibility", href: "/dashboard/ai-visibility", icon: Sparkles },
    { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
    { label: "Landing Pages", href: "/dashboard/landing-pages", icon: Globe, badge: unseenLeadsCount },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 lg:flex lg:flex-row">

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside
        style={{ flexDirection: "column" }}
        className="hidden lg:flex w-64 shrink-0 sticky top-0 h-screen bg-white border-r border-gray-200"
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-gray-100 px-5 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <span className="font-bold text-gray-900">Fancy Digitals</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul style={{ flexDirection: "column" }} className="flex space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Card */}
        {!isPro && (
          <div className="mx-3 mb-3 rounded-xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] p-4 shrink-0">
            <p className="text-sm font-bold text-white">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-white/70">
              Unlimited generations & all tools.
            </p>
            <Link
              href="/pricing"
              className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#075a01] hover:bg-gray-100 transition"
            >
              Upgrade
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {/* User */}
        <div className="border-t border-gray-100 p-3 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#075a01] text-sm font-bold text-white">
              {displayName?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="truncate text-xs text-gray-400">{profile?.email}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${isPro ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
              {isPro ? "Pro" : "Free"}
            </span>
          </div>
          <form action={signOut} className="mt-1">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ===== MAIN COLUMN ===== */}
      <div className="flex-1 min-w-0">

        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-100 bg-white/85 backdrop-blur-xl px-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#075a01] to-[#0a8f01]">
              <img src="/logo.png" alt="" className="h-5 brightness-0 invert" />
            </div>
            <span className="text-sm font-bold text-gray-900">Fancy Digitals</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${isPro ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
              {isPro ? "Pro" : "Free"}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075a01] text-xs font-bold text-white">
              {displayName?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile bottom spacer */}
        <div className="h-16 lg:hidden" />
      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/90 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-2.5 text-gray-400 hover:text-[#075a01] transition relative"
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-white" />
                )}
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}