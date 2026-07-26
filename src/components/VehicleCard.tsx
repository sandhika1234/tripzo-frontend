"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Fuel, Users, Heart } from "lucide-react";
import { Vehicle } from "@/lib/data";
import { useState } from "react";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(13,148,136,0.12)] hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-teal-50 overflow-hidden">
          {!imgError ? (
            <Image
              src={vehicle.images[0]}
              alt={vehicle.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-teal-300">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              size={18}
              className={liked ? "text-red-500 fill-red-500" : "text-gray-400"}
            />
          </button>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {vehicle.category}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-dark leading-snug line-clamp-1 group-hover:text-teal-700 transition-colors">
              {vehicle.name}
            </h3>
            <div className="flex items-center gap-1 text-sm flex-shrink-0">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-dark">{vehicle.rating}</span>
              <span className="text-gray-400 text-xs">
                ({vehicle.totalTrips})
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Fuel size={12} /> {vehicle.fuelType}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} /> {vehicle.seating} Seats
            </span>
            <span className="capitalize">{vehicle.transmission}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
            <MapPin size={12} />
            <span className="line-clamp-1">{vehicle.location}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-lg font-bold text-dark">
                ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400"> /day</span>
            </div>
            <span className="text-xs text-teal-600 font-medium">
              ₹{vehicle.pricePerHour}/hr
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
