"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Star,
  MapPin,
  MoreVertical,
  Pencil,
  Pause,
  Play,
  Trash2,
  Eye,
} from "lucide-react";
import { supplierVehicles, SupplierVehicle } from "@/lib/supplier-data";

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-50", text: "text-green-600", label: "Active" },
  paused: { bg: "bg-amber-50", text: "text-amber-600", label: "Paused" },
  pending: { bg: "bg-blue-50", text: "text-blue-600", label: "Pending" },
  rejected: { bg: "bg-red-50", text: "text-red-500", label: "Rejected" },
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<SupplierVehicle[]>(supplierVehicles);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "active" ? "paused" : "active" }
          : v
      )
    );
    setMenuOpen(null);
  };

  const deleteVehicle = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
    setMenuOpen(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark">
            My Vehicles
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Link
          href="/supplier/vehicles/add"
          className="flex items-center gap-2 bg-teal-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-teal-700 transition-colors"
        >
          <Plus size={18} /> Add Vehicle
        </Link>
      </div>

      {vehicles.length > 0 ? (
        <div className="space-y-4">
          {vehicles.map((vehicle) => {
            const status = statusStyle[vehicle.status];
            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-auto bg-teal-50 flex-shrink-0">
                    <Image
                      src={vehicle.images[0] || "/images/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 192px"
                    />
                    <span
                      className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-dark">
                          {vehicle.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {vehicle.brand} · {vehicle.model} · {vehicle.fuelType} · {vehicle.transmission}
                        </p>
                      </div>

                      {/* Actions Menu */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setMenuOpen(menuOpen === vehicle.id ? null : vehicle.id)
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>

                        {menuOpen === vehicle.id && (
                          <div className="absolute right-0 top-10 w-44 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-10">
                            <Link
                              href={`/supplier/vehicles/${vehicle.id}/edit`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setMenuOpen(null)}
                            >
                              <Pencil size={14} /> Edit Vehicle
                            </Link>
                            <Link
                              href={`/vehicles/${vehicle.id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setMenuOpen(null)}
                            >
                              <Eye size={14} /> View Listing
                            </Link>
                            {(vehicle.status === "active" || vehicle.status === "paused") && (
                              <button
                                onClick={() => toggleStatus(vehicle.id)}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                {vehicle.status === "active" ? (
                                  <><Pause size={14} /> Pause Listing</>
                                ) : (
                                  <><Play size={14} /> Activate Listing</>
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => deleteVehicle(vehicle.id)}
                              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="font-medium text-dark">{vehicle.rating}</span>
                      </span>
                      <span className="text-gray-400">
                        {vehicle.totalTrips} trips
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin size={12} /> {vehicle.location}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
                      <div>
                        <span className="text-lg font-extrabold text-dark">
                          ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-gray-400">/day</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        ₹{vehicle.pricePerHour}/hr
                      </span>
                      <span className="text-sm text-gray-400">
                        Deposit: ₹{vehicle.securityDeposit.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🚗</div>
          <h3 className="text-xl font-bold text-dark mb-2">No vehicles yet</h3>
          <p className="text-gray-500 text-sm mb-4">
            Add your first vehicle to start earning.
          </p>
          <Link
            href="/supplier/vehicles/add"
            className="inline-block bg-teal-600 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-teal-700 transition-colors"
          >
            + Add Vehicle
          </Link>
        </div>
      )}
    </div>
  );
}
