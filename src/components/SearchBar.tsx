"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");

  const handleSearch = () => {
    const params = new URLSearchParams({
      location: location || "Bangalore",
      pickupDate: pickupDate || new Date().toISOString().split("T")[0],
      pickupTime,
      returnDate: returnDate || new Date(Date.now() + 86400000).toISOString().split("T")[0],
      returnTime,
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(13,148,136,0.1),0_1px_4px_rgba(0,0,0,0.06)] p-5 sm:p-6 max-w-[560px]">
      {/* Pickup Location */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-[1.5px] border-gray-200 rounded-xl mb-3 focus-within:border-teal-400 transition-colors">
        <MapPin size={20} className="text-teal-600 flex-shrink-0" />
        <input
          type="text"
          placeholder="Enter Pickup Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-sm sm:text-base text-dark bg-transparent"
        />
      </div>

      {/* Pickup Date + Time */}
      <div className="flex gap-3 mb-3">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-3.5 border-[1.5px] border-gray-200 rounded-xl focus-within:border-teal-400 transition-colors">
          <Calendar size={18} className="text-teal-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] sm:text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              Pickup
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium bg-transparent"
            />
          </div>
        </div>
        <div className="w-[120px] sm:w-[140px] flex items-center gap-2 px-3 py-3.5 border-[1.5px] border-gray-200 rounded-xl focus-within:border-teal-400 transition-colors">
          <Clock size={16} className="text-teal-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] sm:text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              Time
            </label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Return Date + Time */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2.5 px-4 py-3.5 border-[1.5px] border-gray-200 rounded-xl focus-within:border-teal-400 transition-colors">
          <Calendar size={18} className="text-teal-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] sm:text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              Return
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium bg-transparent"
            />
          </div>
        </div>
        <div className="w-[120px] sm:w-[140px] flex items-center gap-2 px-3 py-3.5 border-[1.5px] border-gray-200 rounded-xl focus-within:border-teal-400 transition-colors">
          <Clock size={16} className="text-teal-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-[10px] sm:text-[11px] text-gray-400 font-medium uppercase tracking-wide">
              Time
            </label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-full text-sm text-gray-700 font-medium bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 text-base font-semibold flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] hover:-translate-y-0.5 transition-all"
      >
        <Search size={20} />
        Search Vehicles
      </button>
    </div>
  );
}
