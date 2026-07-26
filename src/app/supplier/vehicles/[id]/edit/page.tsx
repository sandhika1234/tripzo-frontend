"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { supplierVehicles } from "@/lib/supplier-data";

export default function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const vehicle = supplierVehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold mb-2">Vehicle not found</h2>
          <Link href="/supplier/vehicles" className="text-teal-600 font-semibold">
            ← Back to vehicles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <Link
        href="/supplier/vehicles"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 mb-4 transition-colors"
      >
        <ChevronLeft size={18} /> Back to vehicles
      </Link>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-1">
        Edit Vehicle
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Update details for {vehicle.name}
      </p>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark">Vehicle Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Vehicle Name" defaultValue={vehicle.name} />
            <Field label="Brand" defaultValue={vehicle.brand} />
            <Field label="Model" defaultValue={vehicle.model} />
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category</label>
              <select defaultValue={vehicle.category} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none">
                <option value="bike">Bike</option>
                <option value="scooty">Scooty</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <Field label="Fuel Type" defaultValue={vehicle.fuelType} />
            <Field label="Transmission" defaultValue={vehicle.transmission} />
            <Field label="Seating" defaultValue={vehicle.seating.toString()} type="number" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              rows={3} defaultValue={vehicle.description}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Price per Day (₹)" defaultValue={vehicle.pricePerDay.toString()} type="number" />
            <Field label="Price per Hour (₹)" defaultValue={vehicle.pricePerHour.toString()} type="number" />
            <Field label="Security Deposit (₹)" defaultValue={vehicle.securityDeposit.toString()} type="number" />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark">Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Area / Locality" defaultValue={vehicle.location} />
            <Field label="Full Pickup Address" defaultValue={vehicle.pickupAddress} />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark mb-3">Features</h2>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((f) => (
              <span key={f} className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                ✓ {f}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/supplier/vehicles"
            className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-3.5 text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={() => alert("Changes saved!")}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
      <input
        type={type} defaultValue={defaultValue}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none transition-colors"
      />
    </div>
  );
}
