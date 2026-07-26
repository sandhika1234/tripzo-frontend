"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  MapPin,
  IndianRupee,
  CheckCircle2,
  FileText,
  Upload,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const categoryOptions = [
  { value: "BIKE", label: "Bike" },
  { value: "SCOOTY", label: "Scooty" },
  { value: "CAR", label: "Car" },
  { value: "AUTO", label: "Auto" },
];

const fuelOptions = ["Petrol", "Diesel", "CNG", "Electric"];
const transmissionOptions = ["Manual", "Automatic"];
const defaultFeatures = [
  "AC", "Bluetooth", "GPS", "USB Charger", "Helmet Included",
  "Phone Mount", "First Aid Kit", "Spare Tyre", "ABS", "Airbags",
  "Power Steering", "Cruise Control", "Sunroof", "Rain Cover",
  "Saddle Bags", "Tank Bag", "Under-seat Storage", "Reverse Camera",
];

export default function AddVehiclePage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [seating, setSeating] = useState("");
  const [description, setDescription] = useState("");

  // Pricing
  const [pricePerDay, setPricePerDay] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");

  // Location
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");

  // Features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Images - now stores Cloudinary URLs
  const [images, setImages] = useState<string[]>([]);

  // Documents
  const [rcDoc, setRcDoc] = useState("");
  const [insurance, setInsurance] = useState("");
  const [pollution, setPollution] = useState("");
  const [fitness, setFitness] = useState("");

  const toggleFeature = (f: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const uploadDocument = async (file: File, setter: (url: string) => void) => {
    const token = sessionStorage.getItem("tripzo_token");
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await fetch(`${API_URL}/upload/document`, {
        method: "POST",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      const data = await res.json();
      if (data.success) setter(data.url);
    } catch (err) {
      console.error("Document upload failed:", err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !brand || !category || !fuelType || !transmission || !pricePerDay || !location || !city) {
      setError("Please fill all required fields");
      return;
    }
    if (images.length === 0) {
      setError("Please upload at least one vehicle photo");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = sessionStorage.getItem("tripzo_token");
      const res = await fetch(`${API_URL}/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          brand,
          model,
          category,
          fuelType,
          transmission,
          seating: parseInt(seating) || 2,
          description,
          pricePerDay: parseInt(pricePerDay),
          pricePerHour: parseInt(pricePerHour) || 0,
          securityDeposit: parseInt(securityDeposit) || 0,
          location,
          city,
          pickupAddress,
          features: selectedFeatures,
          images,
          rcDocument: rcDoc || null,
          insurance: insurance || null,
          pollutionCert: pollution || null,
          fitnessCert: fitness || null,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || "Failed to add vehicle");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-teal-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-dark mb-2">
            Vehicle Submitted!
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Your vehicle listing is under review. It will go live once approved.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/supplier/vehicles")}
              className="bg-teal-600 text-white rounded-xl py-3 font-semibold hover:bg-teal-700 transition-colors"
            >
              View My Vehicles
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setName(""); setBrand(""); setModel(""); setCategory("");
                setFuelType(""); setTransmission(""); setSeating("");
                setDescription(""); setPricePerDay(""); setPricePerHour("");
                setSecurityDeposit(""); setLocation(""); setCity("");
                setPickupAddress(""); setSelectedFeatures([]); setImages([]);
                setRcDoc(""); setInsurance(""); setPollution(""); setFitness("");
              }}
              className="text-teal-600 font-semibold hover:underline"
            >
              Add Another Vehicle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-1">
        Add New Vehicle
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Take photos of your vehicle and fill in the details
      </p>

      <div className="space-y-6">
        {/* Vehicle Images - REAL UPLOAD */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark flex items-center gap-2 mb-4">
            <Camera size={18} className="text-teal-600" /> Vehicle Photos *
          </h2>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={10}
            label="Take photos or upload from gallery"
          />
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <Car size={18} className="text-teal-600" /> Vehicle Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Vehicle Name *" placeholder="e.g. Royal Enfield Classic 350" value={name} onChange={setName} />
            <InputField label="Brand *" placeholder="e.g. Royal Enfield" value={brand} onChange={setBrand} />
            <InputField label="Model" placeholder="e.g. Classic 350" value={model} onChange={setModel} />
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Category *</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none">
                <option value="">Select category</option>
                {categoryOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Fuel Type *</label>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none">
                <option value="">Select</option>
                {fuelOptions.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Transmission *</label>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none">
                <option value="">Select</option>
                {transmissionOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <InputField label="Seating Capacity" placeholder="e.g. 5" value={seating} onChange={setSeating} type="number" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Description</label>
            <textarea rows={3} placeholder="Describe your vehicle condition, mileage, any special notes..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none resize-none" />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <IndianRupee size={18} className="text-teal-600" /> Pricing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Price per Day (₹) *" placeholder="e.g. 800" value={pricePerDay} onChange={setPricePerDay} type="number" />
            <InputField label="Price per Hour (₹)" placeholder="e.g. 100" value={pricePerHour} onChange={setPricePerHour} type="number" />
            <InputField label="Security Deposit (₹)" placeholder="e.g. 2000" value={securityDeposit} onChange={setSecurityDeposit} type="number" />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <MapPin size={18} className="text-teal-600" /> Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Area / Locality *" placeholder="e.g. Koramangala" value={location} onChange={setLocation} />
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">City *</label>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none">
                <option value="">Select city</option>
                {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Goa"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <InputField label="Full Pickup Address" placeholder="123, 4th Cross, 5th Block..." value={pickupAddress} onChange={setPickupAddress} className="sm:col-span-2" />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark">Features</h2>
          <div className="flex flex-wrap gap-2">
            {defaultFeatures.map((f) => (
              <button key={f} onClick={() => toggleFeature(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedFeatures.includes(f) ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-teal-600"}`}>
                {selectedFeatures.includes(f) && "✓ "}{f}
              </button>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <FileText size={18} className="text-teal-600" /> Vehicle Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "RC (Registration Certificate)", state: rcDoc, setter: setRcDoc },
              { label: "Insurance", state: insurance, setter: setInsurance },
              { label: "Pollution Certificate", state: pollution, setter: setPollution },
              { label: "Fitness Certificate", state: fitness, setter: setFitness },
            ].map((doc) => (
              <div key={doc.label}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{doc.label}</label>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
                  {doc.state ? (
                    <span className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Uploaded
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <Upload size={16} /> Upload
                    </span>
                  )}
                  <input type="file" className="hidden" accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadDocument(file, doc.setter);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{error}</p>}

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white rounded-xl py-4 text-base font-semibold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(13,148,136,0.3)]">
          {loading ? "Submitting..." : "Submit Vehicle for Review"}
        </button>
      </div>
    </div>
  );
}

function Camera({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function InputField({ label, placeholder, value, onChange, type = "text", className = "" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none transition-colors" />
    </div>
  );
}
