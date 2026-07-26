"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Check,
  X,
  Calendar,
  Clock,
} from "lucide-react";
import { supplierBookings, SupplierBooking } from "@/lib/supplier-data";

const tabs = ["All", "Pending", "Confirmed", "Active", "Completed", "Cancelled"];

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-blue-50 text-blue-600",
  active: "bg-green-50 text-green-600",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-500",
};

export default function SupplierBookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [bookings, setBookings] = useState<SupplierBooking[]>(supplierBookings);

  const filtered =
    activeTab === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeTab.toLowerCase());

  const updateStatus = (id: string, status: SupplierBooking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-1">
        Bookings
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Manage customer booking requests
      </p>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-teal-600 text-white shadow-sm"
                : "text-gray-500 hover:text-teal-600"
            }`}
          >
            {tab}
            {tab === "Pending" && bookings.filter((b) => b.status === "pending").length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {bookings.filter((b) => b.status === "pending").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-sm">
                      {booking.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-dark">
                        {booking.customerName}
                      </h3>
                      <p className="text-xs text-gray-400">{booking.id}</p>
                    </div>
                    <span
                      className={`ml-auto sm:ml-3 text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                        statusStyle[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
                    <p className="font-semibold text-dark">
                      {booking.vehicleName}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-teal-600" />
                        {booking.pickupDate} → {booking.returnDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-teal-600" />
                        {booking.pickupTime} - {booking.returnTime}
                      </span>
                    </div>
                    <p className="text-lg font-extrabold text-dark pt-1">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 sm:w-auto w-full">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-teal-600 text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-teal-700 transition-colors"
                      >
                        <Check size={16} /> Accept
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-red-200 text-red-500 rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-red-50 transition-colors"
                      >
                        <X size={16} /> Reject
                      </button>
                    </>
                  )}

                  {/* Contact Customer */}
                  <div className="flex gap-2">
                    <a
                      href={`tel:${booking.customerPhone}`}
                      className="flex items-center justify-center gap-1 bg-gray-100 text-gray-600 rounded-xl py-2.5 px-3 text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href={`https://wa.me/${booking.customerPhone.replace("+", "")}?text=${encodeURIComponent(
                        `Hi ${booking.customerName}, regarding your Tripzo booking ${booking.id} for ${booking.vehicleName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 bg-green-500 text-white rounded-xl py-2.5 px-3 text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-dark mb-2">
            No {activeTab.toLowerCase()} bookings
          </h3>
          <p className="text-gray-500 text-sm">
            Bookings will appear here when customers make reservations.
          </p>
        </div>
      )}
    </div>
  );
}
