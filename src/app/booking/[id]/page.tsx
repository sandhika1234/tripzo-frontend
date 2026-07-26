"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Shield,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import { vehicles } from "@/lib/data";

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const vehicle = vehicles.find((v) => v.id === id);
  const [step, setStep] = useState<"details" | "confirm" | "success">("details");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div>
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-2xl font-bold mb-2">Vehicle not found</h2>
            <Link href="/search" className="text-teal-600 font-semibold">
              Browse vehicles →
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Calculate cost
  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000))
    : 1;
  const rentalCost = vehicle.pricePerDay * days;
  const platformFee = Math.round(rentalCost * 0.05);
  const gst = Math.round((rentalCost + platformFee) * 0.18);
  const total = rentalCost + platformFee + gst;

  if (step === "success") {
    return (
      <>
        <Navbar />
        <main className="main-content min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-teal-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-dark mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Your booking for <strong>{vehicle.name}</strong> has been confirmed.
              The vehicle owner has been notified.
            </p>

            <div className="bg-teal-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-semibold text-dark">TRZ-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-semibold text-dark">{vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold text-dark">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/bookings"
                className="block bg-teal-600 text-white rounded-xl py-3 font-semibold hover:bg-teal-700 transition-colors"
              >
                View My Bookings
              </Link>
              <Link
                href="/"
                className="block text-teal-600 font-semibold hover:underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="main-content min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {/* Back */}
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 mb-5 transition-colors"
          >
            <ChevronLeft size={18} /> Back to vehicle
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">
            {step === "details" ? "Complete Your Booking" : "Review & Pay"}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Form */}
            <div className="flex-1">
              {step === "details" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <h2 className="text-lg font-bold text-dark">
                    Select Dates & Time
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        Pickup Date
                      </label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
                        <Calendar size={18} className="text-teal-600" />
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full text-sm bg-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        Pickup Time
                      </label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
                        <Clock size={18} className="text-teal-600" />
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full text-sm bg-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        Return Date
                      </label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
                        <Calendar size={18} className="text-teal-600" />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full text-sm bg-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        Return Time
                      </label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
                        <Clock size={18} className="text-teal-600" />
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="w-full text-sm bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                      Pickup Location
                    </label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                      <MapPin size={18} className="text-teal-600" />
                      <span className="text-sm text-gray-700">
                        {vehicle.location}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("confirm")}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 text-base font-semibold hover:-translate-y-0.5 transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === "confirm" && (
                <div className="space-y-5">
                  {/* Booking Summary */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-dark mb-4">
                      Booking Summary
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pickup</span>
                        <span className="font-medium">{pickupDate || "Not selected"} at {pickupTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Return</span>
                        <span className="font-medium">{returnDate || "Not selected"} at {returnTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-medium">{days} day{days > 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location</span>
                        <span className="font-medium">{vehicle.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-dark mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      {["UPI", "Credit / Debit Card", "Net Banking", "Wallet"].map(
                        (method, i) => (
                          <label
                            key={method}
                            className={`flex items-center gap-3 border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${
                              i === 0
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-teal-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              defaultChecked={i === 0}
                              className="accent-teal-600"
                            />
                            <CreditCard size={18} className="text-gray-500" />
                            <span className="text-sm font-medium">{method}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("details")}
                      className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-4 text-base font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("success")}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 text-base font-semibold hover:-translate-y-0.5 transition-all"
                    >
                      Pay ₹{total.toLocaleString("en-IN")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right - Vehicle Summary */}
            <div className="lg:w-[320px] flex-shrink-0">
              <div className="lg:sticky lg:top-[84px] space-y-5">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="relative aspect-[16/10] bg-teal-50">
                    <Image
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-dark mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {vehicle.brand} · {vehicle.transmission} · {vehicle.fuelType}
                    </p>

                    {/* Price Breakdown */}
                    <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          ₹{vehicle.pricePerDay.toLocaleString("en-IN")} × {days} day{days > 1 ? "s" : ""}
                        </span>
                        <span className="font-medium">
                          ₹{rentalCost.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Platform fee</span>
                        <span className="font-medium">
                          ₹{platformFee.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">GST (18%)</span>
                        <span className="font-medium">
                          ₹{gst.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2.5 border-t border-gray-100">
                        <span className="font-bold text-dark">Total</span>
                        <span className="font-extrabold text-dark text-lg">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security badge */}
                <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 rounded-xl px-4 py-3">
                  <Shield size={18} />
                  <span className="font-medium">
                    Secure payment · 100% refund on cancellation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
