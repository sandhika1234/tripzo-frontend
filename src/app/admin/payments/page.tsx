"use client";
import { adminPayments } from "@/lib/admin-data";
import { Download } from "lucide-react";

const statusStyle: Record<string, string> = { success: "bg-green-50 text-green-600", pending: "bg-amber-50 text-amber-600", failed: "bg-red-50 text-red-500", refunded: "bg-purple-50 text-purple-600" };

export default function AdminPaymentsPage() {
  const totalCollected = adminPayments.filter(p => p.status === "success").reduce((s, p) => s + p.amount, 0);
  const totalFees = adminPayments.filter(p => p.status === "success").reduce((s, p) => s + p.platformFee, 0);
  const totalRefunded = adminPayments.filter(p => p.status === "refunded").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-dark">Payments</h1>
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"><Download size={16} /> Export</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5"><p className="text-xs text-gray-400 mb-1">Total Collected</p><p className="text-2xl font-extrabold text-dark">₹{totalCollected.toLocaleString("en-IN")}</p></div>
        <div className="bg-white rounded-xl border border-gray-100 p-5"><p className="text-xs text-gray-400 mb-1">Platform Fees</p><p className="text-2xl font-extrabold text-teal-600">₹{totalFees.toLocaleString("en-IN")}</p></div>
        <div className="bg-white rounded-xl border border-gray-100 p-5"><p className="text-xs text-gray-400 mb-1">Refunds</p><p className="text-2xl font-extrabold text-red-500">₹{totalRefunded.toLocaleString("en-IN")}</p></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 font-semibold">ID</th>
              <th className="text-left px-5 py-3 font-semibold">Customer</th>
              <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Booking</th>
              <th className="text-center px-5 py-3 font-semibold hidden md:table-cell">Method</th>
              <th className="text-right px-5 py-3 font-semibold">Amount</th>
              <th className="text-right px-5 py-3 font-semibold hidden md:table-cell">Fee</th>
              <th className="text-center px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Date</th>
            </tr></thead>
            <tbody>
              {adminPayments.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3.5 font-medium text-dark">{p.id}</td>
                  <td className="px-5 py-3.5 text-gray-600">{p.customerName}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{p.bookingId}</td>
                  <td className="px-5 py-3.5 text-center text-gray-500 hidden md:table-cell">{p.method}</td>
                  <td className="px-5 py-3.5 text-right font-bold text-dark">₹{p.amount.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3.5 text-right text-teal-600 hidden md:table-cell">₹{p.platformFee}</td>
                  <td className="px-5 py-3.5 text-center"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[p.status]}`}>{p.status}</span></td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
