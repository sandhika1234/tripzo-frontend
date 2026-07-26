"use client";
import { useState } from "react";
import { Search, Star, Check, X, MoreVertical } from "lucide-react";
import { adminVehicles, AdminVehicle } from "@/lib/admin-data";

const statusStyle: Record<string, string> = { active: "bg-green-50 text-green-600", paused: "bg-amber-50 text-amber-600", pending: "bg-blue-50 text-blue-600", rejected: "bg-red-50 text-red-500" };

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<AdminVehicle[]>(adminVehicles);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = vehicles.filter((v) => {
    const match = v.name.toLowerCase().includes(search.toLowerCase()) || v.supplierName.toLowerCase().includes(search.toLowerCase());
    return tab === "all" ? match : match && v.status === tab;
  });

  const updateStatus = (id: string, status: AdminVehicle["status"]) => { setVehicles((p) => p.map((v) => v.id === id ? { ...v, status } : v)); };
  const toggleFeatured = (id: string) => { setVehicles((p) => p.map((v) => v.id === id ? { ...v, featured: !v.featured } : v)); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark">Vehicles</h1>
          <p className="text-sm text-gray-400">{vehicles.filter((v) => v.status === "pending").length} pending approval</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search vehicles..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>

      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto no-scrollbar">
        {["all", "active", "pending", "paused", "rejected"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? "bg-teal-600 text-white" : "text-gray-500"}`}>{t}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 font-semibold">Vehicle</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Supplier</th>
              <th className="text-center px-5 py-3 font-semibold hidden sm:table-cell">Category</th>
              <th className="text-right px-5 py-3 font-semibold">Price/Day</th>
              <th className="text-center px-5 py-3 font-semibold">Status</th>
              <th className="text-center px-5 py-3 font-semibold w-24">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {v.featured && <Star size={14} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                      <div><p className="font-semibold text-dark">{v.name}</p><p className="text-xs text-gray-400">{v.city}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{v.supplierName}</td>
                  <td className="px-5 py-3.5 text-center capitalize hidden sm:table-cell">{v.category}</td>
                  <td className="px-5 py-3.5 text-right font-medium">₹{v.pricePerDay.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-center"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[v.status]}`}>{v.status}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      {v.status === "pending" && (
                        <>
                          <button onClick={() => updateStatus(v.id, "active")} className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50" title="Approve"><Check size={16} /></button>
                          <button onClick={() => updateStatus(v.id, "rejected")} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50" title="Reject"><X size={16} /></button>
                        </>
                      )}
                      <button onClick={() => toggleFeatured(v.id)} className={`p-1.5 rounded-lg hover:bg-amber-50 ${v.featured ? "text-amber-400" : "text-gray-300"}`} title="Toggle Featured">
                        <Star size={16} className={v.featured ? "fill-amber-400" : ""} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No vehicles found</div>}
      </div>
    </div>
  );
}
