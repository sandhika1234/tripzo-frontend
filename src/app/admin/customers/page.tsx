"use client";
import { useState } from "react";
import { Search, MoreVertical, Ban, CheckCircle2, Mail } from "lucide-react";
import { adminCustomers, AdminCustomer } from "@/lib/admin-data";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>(adminCustomers);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  const toggleBlock = (id: string) => {
    setCustomers((p) => p.map((c) => c.id === id ? { ...c, status: c.status === "active" ? "blocked" : "active" } as AdminCustomer : c));
    setMenuOpen(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark">Customers</h1>
          <p className="text-sm text-gray-400">{customers.length} total customers</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 font-semibold">Customer</th>
              <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">City</th>
              <th className="text-center px-5 py-3 font-semibold">Bookings</th>
              <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Total Spent</th>
              <th className="text-center px-5 py-3 font-semibold">Status</th>
              <th className="text-center px-5 py-3 font-semibold w-12"></th>
            </tr></thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-xs">{c.name.charAt(0)}</div>
                      <div><p className="font-semibold text-dark">{c.name}</p><p className="text-xs text-gray-400">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{c.city}</td>
                  <td className="px-5 py-3.5 text-center font-medium">{c.totalBookings}</td>
                  <td className="px-5 py-3.5 text-right font-medium hidden md:table-cell">₹{c.totalSpent.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${c.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center relative">
                    <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)} className="p-1.5 rounded-lg hover:bg-gray-100"><MoreVertical size={16} className="text-gray-400" /></button>
                    {menuOpen === c.id && (
                      <div className="absolute right-5 top-12 w-40 bg-white rounded-xl border shadow-lg py-1 z-10">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"><Mail size={14} /> Email</button>
                        <button onClick={() => toggleBlock(c.id)} className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${c.status === "active" ? "text-red-500 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}>
                          {c.status === "active" ? <><Ban size={14} /> Block</> : <><CheckCircle2 size={14} /> Unblock</>}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
