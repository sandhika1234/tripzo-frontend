"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import VehicleCard from "@/components/VehicleCard";
import { vehiclesApi } from "@/lib/api";

const categoryFilters = [
  { id: "all", label: "All" },
  { id: "BIKE", label: "Bikes" },
  { id: "SCOOTY", label: "Scooty" },
  { id: "CAR", label: "Cars" },
  { id: "AUTO", label: "Auto" },
];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category")?.toUpperCase() || "all";
  const locationParam = searchParams.get("location") || "";

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (locationParam) params.city = locationParam;
        if (selectedCategory !== "all") params.category = selectedCategory;
        const res = await vehiclesApi.search(params);
        let sorted = res.vehicles || [];
        if (sortBy === "price_low") sorted.sort((a: any, b: any) => a.pricePerDay - b.pricePerDay);
        else if (sortBy === "price_high") sorted.sort((a: any, b: any) => b.pricePerDay - a.pricePerDay);
        else if (sortBy === "rating") sorted.sort((a: any, b: any) => b.rating - a.rating);
        setVehicles(sorted);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setVehicles([]);
      }
      setLoading(false);
    };
    fetchVehicles();
  }, [selectedCategory, sortBy, locationParam]);

  return (
    <>
      <Navbar />
      <main className="main-content min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-dark">Available Vehicles</h1>
              {locationParam && <p className="text-sm text-gray-500 mt-1">Showing results in <span className="font-medium text-teal-600">{locationParam}</span></p>}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer focus:border-teal-400 focus:outline-none">
                  {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium hover:border-teal-400">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
            {categoryFilters.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id ? "bg-teal-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="h-5 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : vehicles.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-4">{vehicles.length} vehicle{vehicles.length > 1 ? "s" : ""} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {vehicles.map((vehicle: any) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-dark mb-2">No vehicles found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search in a different location.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
