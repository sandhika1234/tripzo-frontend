"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarDays,
  IndianRupee,
  User,
  Plus,
  X,
  LogOut,
  BadgeCheck,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Vehicles", href: "/supplier/vehicles", icon: Car },
  { label: "Add Vehicle", href: "/supplier/vehicles/add", icon: Plus },
  { label: "Bookings", href: "/supplier/bookings", icon: CalendarDays },
  { label: "Earnings", href: "/supplier/earnings", icon: IndianRupee },
  { label: "Profile", href: "/supplier/profile", icon: User },
];

interface SupplierSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function SupplierSidebar({ mobileOpen, onClose }: SupplierSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-gray-100">
          <Link href="/supplier/dashboard" className="flex items-center gap-2">
            <div className="bg-teal-600 rounded-xl px-4 py-1.5">
              <span className="text-white font-extrabold text-lg tracking-tight">
                tripzo
              </span>
            </div>
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
              Owner
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Supplier Info */}
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-dark truncate">
                  Rajesh Kumar
                </span>
                <BadgeCheck size={14} className="text-teal-500 flex-shrink-0" />
              </div>
              <span className="text-xs text-gray-400">Verified Owner</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/supplier/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-dark"
                }`}
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={isActive ? "text-teal-600" : ""}
                />
                {item.label}
                {item.label === "Bookings" && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    1
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Back to Tripzo
          </Link>
        </div>
      </aside>
    </>
  );
}
