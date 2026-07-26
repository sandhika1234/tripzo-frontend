"use client";
import { useState } from "react";
import { Plus, Tags, MoreVertical, Pause, Play, Trash2 } from "lucide-react";
import { adminCoupons, AdminCoupon } from "@/lib/admin-data";

const statusStyle: Record<string, string> = { active: "bg-green-50 text-green-600", expired: "bg-gray-100 text-gray-500", disabled: "bg-red-50 text-red-500" };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>(adminCoupons);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleCoupon = (id: string) => {
    setCoupons((p) => p.map((c) => c.id === id ? { ...c, status: c.status === "active" ? "disabled" : "active" } as AdminCoupon : c));
    setMenuOpen(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-dark">Coupons</h1>
        <button className="flex items-center gap-2 bg-teal-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-teal-700"><Plus size={18} /> Create Coupon</button>
      </div>

      <div className="space-y-4">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><Tags size={22} className="text-teal-600" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-dark font-mono">{c.code}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[c.status]}`}>{c.status}</span>
                  </div>
                  <p className="text-sm text-gray-500">{c.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-right">
                  <p className="font-bold text-dark">{c.discountType === "percentage" ? `${c.discountValue}%` : `₹${c.discountValue}`}</p>
                  <p className="text-xs text-gray-400">Max ₹{c.maxDiscount}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-dark">{c.usedCount}/{c.usageLimit}</p>
                  <p className="text-xs text-gray-400">Used</p>
                </div>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)} className="p-2 rounded-lg hover:bg-gray-100"><MoreVertical size={16} className="text-gray-400" /></button>
                  {menuOpen === c.id && (
                    <div className="absolute right-0 top-10 w-40 bg-white rounded-xl border shadow-lg py-1 z-10">
                      <button onClick={() => toggleCoupon(c.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                        {c.status === "active" ? <><Pause size={14} /> Disable</> : <><Play size={14} /> Enable</>}
                      </button>
                      <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
              <span>Min order: ₹{c.minOrder}</span>
              <span>Valid: {c.validFrom} to {c.validTo}</span>
              <span>Usage: {Math.round((c.usedCount / c.usageLimit) * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
