"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Fuel,
  Users,
  Cog,
  Shield,
  ChevronLeft,
  Heart,
  Share2,
  Check,
  BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ContactOwnerButtons from "@/components/ContactOwnerButtons";
import { vehicles } from "@/lib/data";

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const vehicle = vehicles.find((v) => v.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-2xl font-bold mb-2">Vehicle not found</h2>
            <p className="text-gray-500 mb-4">
              The vehicle you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/search"
              className="text-teal-600 font-semibold hover:underline"
            >
              Browse all vehicles →
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="main-content bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-teal-600 mb-4 transition-colors"
          >
            <ChevronLeft size={18} /> Back to results
          </button>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Column - Images & Details */}
            <div className="flex-1 lg:max-w-[640px]">
              {/* Main Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-teal-50 mb-3">
                {!imgError ? (
                  <Image
                    src={vehicle.images[activeImg] || vehicle.images[0]}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                    priority
                    onError={() => setImgError(true)}
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-teal-300">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={20}
                      className={
                        liked ? "text-red-500 fill-red-500" : "text-gray-500"
                      }
                    />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
                    <Share2 size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mb-6">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImg(i);
                      setImgError(false);
                    }}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImg === i
                        ? "border-teal-500"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${vehicle.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>

              {/* Vehicle Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-1">
                      {vehicle.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {vehicle.brand} · {vehicle.model}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-lg">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span className="text-base font-bold text-dark">
                      {vehicle.rating}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({vehicle.totalReviews})
                    </span>
                  </div>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { icon: Fuel, label: vehicle.fuelType },
                    { icon: Cog, label: vehicle.transmission },
                    { icon: Users, label: `${vehicle.seating} Seats` },
                    { icon: MapPin, label: vehicle.city },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5"
                    >
                      <Icon size={16} className="text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {vehicle.description}
                </p>

                {/* Features */}
                <h3 className="text-base font-bold text-dark mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 text-sm text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg"
                    >
                      <Check size={14} /> {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pickup Location */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-dark mb-3">
                  Pickup Location
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-teal-600 flex-shrink-0" />
                  {vehicle.location}
                </div>
                {/* Map placeholder */}
                <div className="mt-4 w-full h-40 rounded-xl bg-teal-50 flex items-center justify-center text-sm text-teal-400">
                  Map integration coming soon
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Booking */}
            <div className="lg:w-[380px] flex-shrink-0">
              <div className="lg:sticky lg:top-[84px] space-y-5">
                {/* Pricing Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                    Pricing
                  </h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-extrabold text-dark">
                      ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-400">/day</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-5">
                    ₹{vehicle.pricePerHour}/hr · Deposit: ₹
                    {vehicle.securityDeposit.toLocaleString("en-IN")}
                  </p>

                  <Link
                    href={`/booking/${vehicle.id}`}
                    className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center rounded-xl py-4 text-base font-semibold shadow-[0_4px_16px_rgba(13,148,136,0.3)] hover:-translate-y-0.5 transition-all mb-4"
                  >
                    Book Now
                  </Link>

                  <ContactOwnerButtons
                    phone={vehicle.supplier.phone}
                    whatsapp={vehicle.supplier.whatsapp}
                    vehicleName={vehicle.name}
                  />
                </div>

                {/* Supplier Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                    Vehicle Owner
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg">
                      {vehicle.supplier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-dark">
                          {vehicle.supplier.name}
                        </span>
                        {vehicle.supplier.verified && (
                          <BadgeCheck
                            size={18}
                            className="text-teal-500 fill-teal-100"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star
                          size={12}
                          className="text-amber-400 fill-amber-400"
                        />
                        {vehicle.supplier.rating} ·{" "}
                        {vehicle.supplier.totalVehicles} vehicles
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-teal-600 bg-teal-50 rounded-lg px-3 py-2">
                    <Shield size={16} />
                    <span className="font-medium">
                      KYC Verified · Documents Checked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
