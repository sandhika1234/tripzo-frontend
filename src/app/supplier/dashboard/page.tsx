"use client";

import Link from "next/link";
import {
  IndianRupee,
  CalendarDays,
  Car,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CircleDot,
} from "lucide-react";
import {
  dashboardStats,
  supplierBookings,
  supplierVehicles,
} from "@/lib/supplier-data";

const statCards = [
  {
    label: "Today's Revenue",
    value: `₹${dashboardStats.todayRevenue.toLocaleString("en-IN")}`,
    icon: IndianRupee,
    trend: "+12%",
    trendUp: true,
    color: "bg-teal-50 text-teal-600",
  },
  {
    label: "Monthly Revenue",
    value: `₹${dashboardStats.monthlyRevenue.toLocaleString("en-IN")}`,
    icon: TrendingUp,
    trend: "+8%",
    trendUp: true,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Total Bookings",
    value: dashboardStats.totalBookings.toString(),
    icon: CalendarDays,
    trend: "+23",
    trendUp: true,
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Fleet Utilization",
    value: `${dashboardStats.fleetUtilization}%`,
    icon: Car,
    trend: "-3%",
    trendUp: false,
    color: "bg-amber-50 text-amber-600",
  },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-blue-50 text-blue-600",
  active: "bg-green-50 text-green-600",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-500",
};

export default function SupplierDashboard() {
  const recentBookings = supplierBookings.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Here&apos;s what&apos;s happening with your fleet today
          </p>
        </div>
        <Link
          href="/supplier/vehicles/add"
          className="hidden sm:flex items-center gap-2 bg-teal-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-teal-700 transition-colors"
        >
          + Add Vehicle
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${
                  stat.trendUp ? "text-green-500" : "text-red-400"
                }`}
              >
                {stat.trendUp ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-dark">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="text-base font-bold text-dark">Recent Bookings</h2>
            <Link
              href="/supplier/bookings"
              className="text-sm text-teal-600 font-medium flex items-center gap-1 hover:underline"
            >
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm flex-shrink-0">
                  {booking.customerName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-dark truncate">
                    {booking.customerName}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {booking.vehicleName} · {booking.pickupDate}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-dark">
                    ₹{booking.amount.toLocaleString("en-IN")}
                  </div>
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                      statusColor[booking.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Vehicle Status */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-base font-bold text-dark mb-4">
              Fleet Overview
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDot size={14} className="text-green-500" />
                  <span className="text-sm text-gray-600">Active</span>
                </div>
                <span className="text-sm font-bold text-dark">
                  {dashboardStats.activeVehicles}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDot size={14} className="text-amber-400" />
                  <span className="text-sm text-gray-600">Paused</span>
                </div>
                <span className="text-sm font-bold text-dark">
                  {dashboardStats.pausedVehicles}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDot size={14} className="text-blue-400" />
                  <span className="text-sm text-gray-600">Pending Approval</span>
                </div>
                <span className="text-sm font-bold text-dark">
                  {dashboardStats.pendingVehicles}
                </span>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mt-5 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">Fleet Utilization</span>
                <span className="text-sm font-bold text-teal-600">
                  {dashboardStats.fleetUtilization}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all"
                  style={{ width: `${dashboardStats.fleetUtilization}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-base font-bold text-dark mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Add Vehicle", href: "/supplier/vehicles/add", icon: Car },
                { label: "Pending", href: "/supplier/bookings", icon: Clock },
                { label: "Earnings", href: "/supplier/earnings", icon: IndianRupee },
                { label: "Reviews", href: "#", icon: Star },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-teal-50 hover:text-teal-600 transition-colors text-gray-500"
                >
                  <action.icon size={20} />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Star size={20} className="fill-amber-300 text-amber-300" />
              <span className="text-2xl font-extrabold">
                {dashboardStats.avgRating}
              </span>
            </div>
            <p className="text-sm text-teal-100">
              Average rating across all vehicles
            </p>
            <p className="text-xs text-teal-200 mt-1">
              Based on {supplierBookings.filter((b) => b.status === "completed").length * 15} reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
