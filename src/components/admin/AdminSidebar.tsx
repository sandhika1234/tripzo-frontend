"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Briefcase, Car, CalendarDays,
  CreditCard, Tags, BarChart3, FileText, Settings,
  HelpCircle, X, LogOut, Shield,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Suppliers", href: "/admin/suppliers", icon: Briefcase, badge: "8" },
      { label: "Vehicles", href: "/admin/vehicles", icon: Car, badge: "23" },
      { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      { label: "Coupons", href: "/admin/coupons", icon: Tags },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "CMS / Blog", href: "/admin/cms", icon: FileText },
      { label: "Support", href: "/admin/support", icon: HelpCircle, badge: "2" },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-[260px] bg-[#0f172a] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-[60px] px-5 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="bg-teal-500 rounded-lg px-3 py-1">
              <span className="text-white font-extrabold text-base tracking-tight">tripzo</span>
            </div>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">ADMIN</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar">
          {navSections.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-2">
                {section.title}
              </p>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                      isActive
                        ? "bg-teal-500/15 text-teal-400"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Admin</p>
              <p className="text-[10px] text-gray-500">Super Admin</p>
            </div>
            <Shield size={14} className="text-amber-400" />
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut size={18} /> Exit Admin
          </Link>
        </div>
      </aside>
    </>
  );
}
