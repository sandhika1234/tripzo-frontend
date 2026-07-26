"use client";

import Link from "next/link";
import {
  IndianRupee, Users, Briefcase, Car, CalendarDays,
  TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight,
  Clock, Star, AlertTriangle,
} from "lucide-react";
import { adminDashStats, adminBookings, adminSuppliers } from "@/lib/admin-data";

const stats = [
  { label: "Total Revenue", value: `₹${(adminDashStats.totalRevenue / 100000).toFixed(1)}L`, icon: IndianRupee, trend: "+14.2%", up: true, color: "bg-teal-50 text-teal-600" },
  { label: "Monthly Revenue", value: `₹${(adminDashStats.monthlyRevenue / 1000).toFixed(0)}K`, icon: TrendingUp, trend: "+8.6%", up: true, color: "bg-blue-50 text-blue-600" },
  { label: "Total Bookings", value: adminDashStats.totalBookings.toLocaleString(), icon: CalendarDays, trend: "+234", up: true, color: "bg-purple-50 text-purple-600" },
  { label: "Active Bookings", value: adminDashStats.activeBookings.toString(), icon: Clock, trend: "+5", up: true, color: "bg-green-50 text-green-600" },
  { label: "Customers", value: (adminDashStats.totalCustomers / 1000).toFixed(1) + "K", icon: Users, trend: "+12%", up: true, color: "bg-indigo-50 text-indigo-600" },
  { label: "Suppliers", value: adminDashStats.totalSuppliers.toString(), icon: Briefcase, trend: "+18", up: true, color: "bg-amber-50 text-amber-600" },
  { label: "Vehicles", value: (adminDashStats.totalVehicles / 1000).toFixed(1) + "K", icon: Car, trend: "+45", up: true, color: "bg-cyan-50 text-cyan-600" },
  { label: "Platform Fees", value: `₹${(adminDashStats.platformFees / 1000).toFixed(0)}K`, icon: IndianRupee, trend: "+10%", up: true, color: "bg-emerald-50 text-emerald-600" },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-blue-50 text-blue-600",
  active: "bg-green-50 text-green-600",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-500",
};

const kycColor: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-green-50 text-green-600",
  rejected: "bg-red-50 text-red-500",
};

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark">Admin Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Platform overview & analytics</p>
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon size={18} />
              </div>
              <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${s.up ? "text-green-500" : "text-red-400"}`}>
                {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.trend}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-dark">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Link href="/admin/suppliers" className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
          <AlertTriangle size={20} className="text-amber-500" />
          <div>
            <p className="text-sm font-bold text-amber-700">{adminDashStats.pendingKyc} Pending KYC</p>
            <p className="text-xs text-amber-500">Suppliers awaiting verification</p>
          </div>
        </Link>
        <Link href="/admin/vehicles" className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
          <Car size={20} className="text-blue-500" />
          <div>
            <p className="text-sm font-bold text-blue-700">{adminDashStats.pendingApprovals} Vehicle Approvals</p>
            <p className="text-xs text-blue-500">Listings awaiting review</p>
          </div>
        </Link>
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
          <Star size={20} className="text-green-500" />
          <div>
            <p className="text-sm font-bold text-green-700">{adminDashStats.avgRating} Avg Rating</p>
            <p className="text-xs text-green-500">{adminDashStats.conversionRate}% conversion rate</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <h2 className="text-sm font-bold text-dark">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-teal-600 font-medium flex items-center gap-1">View all <ChevronRight size={12} /></Link>
          </div>
          <div className="divide-y divide-gray-50">
            {adminBookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-dark truncate">{b.customerName} → {b.supplierName}</p>
                  <p className="text-xs text-gray-400 truncate">{b.vehicleName} · {b.pickupDate}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-dark">₹{b.amount.toLocaleString("en-IN")}</p>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColor[b.status]}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier KYC + Quick Stats */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <h2 className="text-sm font-bold text-dark">Supplier KYC</h2>
              <Link href="/admin/suppliers" className="text-xs text-teal-600 font-medium flex items-center gap-1">View all <ChevronRight size={12} /></Link>
            </div>
            <div className="divide-y divide-gray-50">
              {adminSuppliers.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">{s.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.city}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${kycColor[s.kycStatus]}`}>{s.kycStatus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Split */}
          <div className="bg-[#0f172a] rounded-xl p-5 text-white">
            <h3 className="text-sm font-bold mb-4">Revenue Split</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Supplier Payouts</span>
                  <span className="font-semibold">₹{((adminDashStats.totalRevenue - adminDashStats.platformFees) / 100000).toFixed(1)}L</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full"><div className="h-full bg-teal-400 rounded-full" style={{ width: "85%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Platform Fees</span>
                  <span className="font-semibold">₹{(adminDashStats.platformFees / 1000).toFixed(0)}K</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full"><div className="h-full bg-amber-400 rounded-full" style={{ width: "15%" }} /></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Refunds</span>
                  <span className="font-semibold text-red-400">₹{(adminDashStats.refundsThisMonth / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full"><div className="h-full bg-red-400 rounded-full" style={{ width: "3%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
