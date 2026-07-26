"use client";
import { useState } from "react";
import { Search, Check, X, Eye, MoreVertical } from "lucide-react";
import { adminSuppliers, AdminSupplier } from "@/lib/admin-data";

const kycStyle: Record<string, string> = { pending: "bg-amber-50 text-amber-600", approved: "bg-green-50 text-green-600", rejected: "bg-red-50 text-red-500" };

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<AdminSupplier[]>(adminSuppliers);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = suppliers.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    if (tab === "pending_kyc") return matchSearch && s.kycStatus === "pending";
    return matchSearch && s.kycStatus === tab;
  });

  const updateKyc = (id: string, status: "approved" | "rejected") => {
    setSuppliers((p) => p.map((s) => s.id === id ? { ...s, kycStatus: status } : s));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-dark">Suppliers</h1>
          <p className="text-sm text-gray-400">{suppliers.filter((s) => s.kycStatus === "pending").length} pending KYC approvals</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto no-scrollbar">
        {[{ id: "all", label: "All" }, { id: "pending_kyc", label: "Pending KYC" }, { id: "approved", label: "Approved" }, { id: "rejected", label: "Rejected" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-all ${tab === t.id ? "bg-teal-600 text-white" : "text-gray-500 hover:text-teal-600"}`}>{t.label}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold">{s.name.charAt(0)}</div>
                <div>
                  <p className="text-base font-bold text-dark">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.email} · {s.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-right">
                  <p className="text-sm font-bold text-dark">{s.totalVehicles} vehicles</p>
                  <p className="text-xs text-gray-400">₹{s.totalEarnings.toLocaleString("en-IN")} earned</p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${kycStyle[s.kycStatus]}`}>{s.kycStatus === "pending" ? "Pending KYC" : s.kycStatus}</span>
              </div>
            </div>

            {s.kycStatus === "pending" && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50"><Eye size={14} /> View Docs</button>
                <button onClick={() => updateKyc(s.id, "approved")} className="flex items-center gap-1 text-sm text-white bg-teal-600 rounded-lg px-3 py-1.5 hover:bg-teal-700"><Check size={14} /> Approve</button>
                <button onClick={() => updateKyc(s.id, "rejected")} className="flex items-center gap-1 text-sm text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"><X size={14} /> Reject</button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-gray-400">No suppliers found</div>}
      </div>
    </div>
  );
}
