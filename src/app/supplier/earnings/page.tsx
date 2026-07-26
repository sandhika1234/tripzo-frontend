"use client";

import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Download,
  CalendarDays,
} from "lucide-react";
import { supplierEarnings } from "@/lib/supplier-data";

const statusStyle: Record<string, string> = {
  paid: "bg-green-50 text-green-600",
  pending: "bg-amber-50 text-amber-600",
  processing: "bg-blue-50 text-blue-600",
};

export default function EarningsPage() {
  const totalEarned = supplierEarnings.reduce((s, e) => s + e.netAmount, 0);
  const totalPlatformFee = supplierEarnings.reduce((s, e) => s + e.platformFee, 0);
  const pendingAmount = supplierEarnings
    .filter((e) => e.status === "pending")
    .reduce((s, e) => s + e.netAmount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark">
            Earnings
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Track your revenue and payouts
          </p>
        </div>
        <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <IndianRupee size={20} className="text-teal-200" />
            <span className="flex items-center gap-0.5 text-xs font-semibold text-teal-200">
              <ArrowUpRight size={14} /> +12%
            </span>
          </div>
          <div className="text-3xl font-extrabold">
            ₹{totalEarned.toLocaleString("en-IN")}
          </div>
          <p className="text-sm text-teal-200 mt-1">Total Earned</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp size={20} className="text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-dark">
            ₹{pendingAmount.toLocaleString("en-IN")}
          </div>
          <p className="text-sm text-gray-400 mt-1">Pending Payout</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-3">
            <CalendarDays size={20} className="text-purple-500" />
          </div>
          <div className="text-3xl font-extrabold text-dark">
            ₹{totalPlatformFee.toLocaleString("en-IN")}
          </div>
          <p className="text-sm text-gray-400 mt-1">Platform Fees (10%)</p>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="text-base font-bold text-dark">Payout History</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                <th className="text-left px-5 py-3 font-semibold">Booking</th>
                <th className="text-left px-5 py-3 font-semibold">Vehicle</th>
                <th className="text-left px-5 py-3 font-semibold">Date</th>
                <th className="text-right px-5 py-3 font-semibold">Amount</th>
                <th className="text-right px-5 py-3 font-semibold">Fee</th>
                <th className="text-right px-5 py-3 font-semibold">Net</th>
                <th className="text-center px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {supplierEarnings.map((earning) => (
                <tr
                  key={earning.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-dark">
                    {earning.bookingId}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {earning.vehicleName}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{earning.date}</td>
                  <td className="px-5 py-3.5 text-right text-gray-600">
                    ₹{earning.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3.5 text-right text-red-400">
                    -₹{earning.platformFee.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3.5 text-right font-bold text-dark">
                    ₹{earning.netAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                        statusStyle[earning.status]
                      }`}
                    >
                      {earning.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden divide-y divide-gray-50">
          {supplierEarnings.map((earning) => (
            <div key={earning.id} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-dark">
                  {earning.bookingId}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                    statusStyle[earning.status]
                  }`}
                >
                  {earning.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {earning.vehicleName}
              </p>
              <p className="text-xs text-gray-400 mb-2">{earning.date}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  ₹{earning.amount.toLocaleString("en-IN")} - ₹{earning.platformFee.toLocaleString("en-IN")} fee
                </span>
                <span className="text-base font-extrabold text-dark">
                  ₹{earning.netAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-base font-bold text-dark mb-4">
          Bank Account for Payouts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-400">Account Holder</span>
            <p className="font-medium text-dark">Rajesh Kumar</p>
          </div>
          <div>
            <span className="text-gray-400">Bank</span>
            <p className="font-medium text-dark">State Bank of India</p>
          </div>
          <div>
            <span className="text-gray-400">Account No.</span>
            <p className="font-medium text-dark">••••••7890</p>
          </div>
          <div>
            <span className="text-gray-400">IFSC</span>
            <p className="font-medium text-dark">SBIN0001234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
