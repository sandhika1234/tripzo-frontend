"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const tabs = ["Upcoming", "Active", "Completed", "Cancelled"];

// Mock bookings
const mockBookings = [
  {
    id: "TRZ-102938",
    vehicleName: "Maruti Swift ZXi",
    location: "Indiranagar, Bangalore",
    pickupDate: "2026-08-01",
    returnDate: "2026-08-03",
    amount: 3540,
    status: "upcoming",
  },
  {
    id: "TRZ-098172",
    vehicleName: "Honda Activa 6G",
    location: "HSR Layout, Bangalore",
    pickupDate: "2026-07-20",
    returnDate: "2026-07-22",
    amount: 944,
    status: "completed",
  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const filtered = mockBookings.filter(
    (b) => b.status === activeTab.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <main className="main-content min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">
            My Bookings
          </h1>

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-teal-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((booking) => (
                <Link
                  key={booking.id}
                  href="#"
                  className="block bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-dark">
                        {booking.vehicleName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {booking.id}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                        booking.status === "upcoming"
                          ? "bg-blue-50 text-blue-600"
                          : booking.status === "active"
                          ? "bg-green-50 text-green-600"
                          : booking.status === "completed"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-teal-600" />
                      {booking.pickupDate} → {booking.returnDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin size={14} className="text-teal-600" />
                    {booking.location}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-base font-bold text-dark">
                      ₹{booking.amount.toLocaleString("en-IN")}
                    </span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-dark mb-2">
                No {activeTab.toLowerCase()} bookings
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                When you book a vehicle, it will appear here.
              </p>
              <Link
                href="/search"
                className="inline-block bg-teal-600 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-teal-700 transition-colors"
              >
                Browse Vehicles
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
