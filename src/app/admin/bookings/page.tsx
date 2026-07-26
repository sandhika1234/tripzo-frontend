"use client";
import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { adminBookings } from "@/lib/admin-data";

const statusStyle: Record<string, string> = { pending: "bg-amber-50 text-amber-600", confirmed: "bg-blue-50 text-blue-600", active: "bg-green-50 text-green-600", completed: "bg-gray-100 text-gray-600", cancelled: "bg-red-50 text-red-500" };
const tabs = ["All", "Pending", "Confirmed", "Active", "Completed", "Cancelled"];

export default function AdminBookingsPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = adminBookings.filter((b) => {
    const match = b.customerName.toLowerCase().includes(search.toLowerCase()) || b.vehicleName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return tab === "All" ? match : match && b.status === tab.toLowerCase();
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-dark">Bookings</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>

      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-teal-600 text-white" : "text-gray-500"}`}>{t}</button>)}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 font-semibold">Booking</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Customer → Supplier</th>
              <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Vehicle</th>
              <th className="text-center px-5 py-3 font-semibold hidden lg:table-cell">Dates</th>
              <th className="text-right px-5 py-3 font-semibold">Amount</th>
              <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Fee</th>
              <th className="text-center px-5 py-3 font-semibold">Status</th>
            </tr></thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-dark">{b.id}</td>
                  <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell"><span className="font-medium text-dark">{b.customerName}</span> → {b.supplierName}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{b.vehicleName}</td>
                  <td className="px-5 py-3.5 text-center text-gray-500 hidden lg:table-cell"><span className="flex items-center justify-center gap-1"><Calendar size={12} /> {b.pickupDate}</span></td>
                  <td className="px-5 py-3.5 text-right font-bold text-dark">₹{b.amount.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-right text-teal-600 font-medium hidden md:table-cell">₹{b.platformFee}</td>
                  <td className="px-5 py-3.5 text-center"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[b.status]}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No bookings found</div>}
      </div>
    </div>
  );
}
