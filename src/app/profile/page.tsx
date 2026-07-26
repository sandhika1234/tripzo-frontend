"use client";

import Link from "next/link";
import {
  User,
  CalendarDays,
  Heart,
  Wallet,
  FileText,
  Star,
  Bell,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: CalendarDays, label: "My Bookings", href: "/bookings", badge: "2" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: Wallet, label: "Wallet & Payments", href: "#" },
  { icon: FileText, label: "Documents", href: "#" },
  { icon: Star, label: "My Reviews", href: "#" },
  { icon: Bell, label: "Notifications", href: "#", badge: "5" },
  { icon: MapPin, label: "Saved Addresses", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function ProfilePage() {
  return (
    <>
      <Navbar />

      <main className="main-content min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-[0_4px_12px_rgba(13,148,136,0.3)]">
                G
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-extrabold text-dark">Guest User</h1>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
              <Link
                href="#"
                className="text-sm font-semibold text-teal-600 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Total Rides", value: "12" },
              { label: "Wallet", value: "₹500" },
              { label: "Reviews", value: "4" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center"
              >
                <div className="text-xl font-extrabold text-dark">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
            {menuItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-4 hover:bg-teal-50 transition-colors ${
                  i < menuItems.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                  <item.icon size={18} className="text-teal-600" />
                </div>
                <span className="flex-1 text-sm font-medium text-dark">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="bg-teal-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            ))}
          </div>

          {/* Supplier CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-5 mb-5 text-white">
            <h3 className="text-lg font-bold mb-1">Own a vehicle?</h3>
            <p className="text-sm text-teal-100 mb-3">
              List it on Tripzo and start earning.
            </p>
            <Link
              href="/supplier/register"
              className="inline-block bg-white text-teal-700 text-sm font-semibold rounded-lg px-5 py-2.5 hover:bg-teal-50 transition-colors"
            >
              Become a Supplier
            </Link>
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-2xl py-4 text-sm font-semibold text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
