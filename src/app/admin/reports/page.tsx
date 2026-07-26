"use client";
import { BarChart3, TrendingUp, Users, Car, Download } from "lucide-react";
import { adminDashStats } from "@/lib/admin-data";

const monthlyData = [
  { month: "Jan", revenue: 18, bookings: 312 },
  { month: "Feb", revenue: 22, bookings: 398 },
  { month: "Mar", revenue: 25, bookings: 421 },
  { month: "Apr", revenue: 28, bookings: 465 },
  { month: "May", revenue: 31, bookings: 512 },
  { month: "Jun", revenue: 29, bookings: 489 },
  { month: "Jul", revenue: 33, bookings: 548 },
];

export default function AdminReportsPage() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-dark">Reports & Analytics</h1>
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"><Download size={16} /> Export</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Conversion Rate", value: `${adminDashStats.conversionRate}%`, icon: TrendingUp, color: "text-teal-600 bg-teal-50" },
          { label: "Monthly Growth", value: `${adminDashStats.monthlyGrowth}%`, icon: BarChart3, color: "text-blue-600 bg-blue-50" },
          { label: "New Users/Month", value: "1.2K", icon: Users, color: "text-purple-600 bg-purple-50" },
          { label: "Vehicles/Month", value: "+45", icon: Car, color: "text-amber-600 bg-amber-50" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${kpi.color}`}><kpi.icon size={18} /></div>
            <p className="text-2xl font-extrabold text-dark">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h2 className="text-base font-bold text-dark mb-6">Monthly Revenue (₹ Lakhs)</h2>
        <div className="flex items-end gap-3 sm:gap-5 h-48">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-dark">{d.revenue}L</span>
              <div className="w-full rounded-t-lg bg-gradient-to-t from-teal-600 to-teal-400 transition-all hover:from-teal-500 hover:to-teal-300"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} />
              <span className="text-[10px] text-gray-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cities + Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-base font-bold text-dark mb-4">Top Cities</h2>
          {[{ city: "Bangalore", pct: 38 }, { city: "Mumbai", pct: 22 }, { city: "Delhi", pct: 16 }, { city: "Hyderabad", pct: 12 }, { city: "Chennai", pct: 8 }].map((c) => (
            <div key={c.city} className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{c.city}</span><span className="font-semibold text-dark">{c.pct}%</span></div>
              <div className="w-full h-2 bg-gray-100 rounded-full"><div className="h-full bg-teal-500 rounded-full" style={{ width: `${c.pct}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-base font-bold text-dark mb-4">Category Distribution</h2>
          {[{ cat: "Cars", pct: 45, color: "bg-teal-500" }, { cat: "Bikes", pct: 30, color: "bg-blue-500" }, { cat: "Scooty", pct: 18, color: "bg-purple-500" }, { cat: "Auto", pct: 7, color: "bg-amber-500" }].map((c) => (
            <div key={c.cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{c.cat}</span><span className="font-semibold text-dark">{c.pct}%</span></div>
              <div className="w-full h-2 bg-gray-100 rounded-full"><div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
