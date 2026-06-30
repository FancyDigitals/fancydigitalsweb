"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  CreditCard,
  Settings,
  Globe,
  Users,
  Sparkles,
  Shield,
  Menu,
  X,
  Crown,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth/actions";

export default function MobileBottomNav({ isAdmin, isPro, unseenLeadsCount }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Primary nav (always shown in bottom bar)
  const primaryNav = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Tools", href: "/tools", icon: Wrench },
    { label: "AI Scan", href: "/dashboard/ai-visibility", icon: Sparkles },
    { label: "Pages", href: "/dashboard/landing-pages", icon: Globe, badge: unseenLeadsCount },
  ];

  // Secondary nav (in "More" drawer)
  const moreNav = [
    { label: "Projects", href: "/dashboard/projects", icon: FolderOpen },
    { label: "Clients", href: "/dashboard/clients", icon: Users },
    { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ...(isAdmin ? [{ label: "Admin Panel", href: "/dashboard/admin", icon: Shield }] : []),
  ];

  function isActive(href) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* BOTTOM NAV BAR */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 backdrop-blur-xl lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-5 px-2 pt-2 pb-3">
          {primaryNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1.5 px-1 transition rounded-xl ${
                  active ? "text-[#075a01]" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <div className="relative">
                  <item.icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition-transform`} strokeWidth={active ? 2.5 : 2} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] ${active ? "font-bold" : "font-medium"} leading-none`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* MORE BUTTON */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center gap-1 py-1.5 px-1 transition rounded-xl ${
              drawerOpen ? "text-[#075a01]" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
            <span className="text-[10px] font-medium leading-none">More</span>
          </button>
        </div>
      </nav>

      {/* MORE DRAWER */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          />

          {/* Drawer */}
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl lg:hidden animate-in slide-in-from-bottom duration-300">

            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                {moreNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition ${
                        active
                          ? "bg-[#075a01]/10 text-[#075a01]"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                        active ? "bg-[#075a01] text-white" : "bg-white text-[#075a01] shadow-sm"
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Upgrade Card (if free) */}
            {!isPro && (
              <div className="px-4 pb-3">
                <Link
                  href="/pricing"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#075a01] to-[#0a8f01] text-white"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Upgrade to Pro</p>
                    <p className="text-xs text-white/80">Unlock unlimited generations</p>
                  </div>
                  <span className="text-lg">→</span>
                </Link>
              </div>
            )}

            {/* Sign Out */}
            <div className="px-4 pb-8 pt-2 border-t border-gray-100 mt-2">
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </div>

            {/* Safe area */}
            <div className="h-2" />
          </div>
        </>
      )}
    </>
  );
}