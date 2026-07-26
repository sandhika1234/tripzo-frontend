"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/lib/data";

export default function WishlistPage() {
  // Mock: show first 2 vehicles as "wishlisted"
  const wishlisted = vehicles.slice(0, 2);

  return (
    <>
      <Navbar />

      <main className="main-content min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">
            My Wishlist
          </h1>

          {wishlisted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlisted.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-dark mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Save vehicles you like and they&apos;ll show up here.
              </p>
              <Link
                href="/search"
                className="inline-block bg-teal-600 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-teal-700 transition-colors"
              >
                Explore Vehicles
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
