"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Upload,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Plus,
  X,
  FileText,
} from "lucide-react";

const categoryOptions = [
  { value: "bike", label: "Bike" },
  { value: "scooty", label: "Scooty" },
  { value: "car", label: "Car" },
  { value: "auto", label: "Auto" },
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
  const [pickupAddress, setPickupAddress] = useState("");

  // Features
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Images
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        setImages((prev) => [...prev, file.name]);
      });
    }
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
            Your vehicle listing is under review. It will go live once approved by our team.
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
                setSecurityDeposit(""); setLocation(""); setPickupAddress("");
                setSelectedFeatures([]); setImages([]);
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
        Fill in your vehicle details to create a listing
      </p>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <Car size={18} className="text-teal-600" /> Vehicle Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Vehicle Name *" placeholder="e.g. Royal Enfield Classic 350" value={name} onChange={setName} />
            <InputField label="Brand *" placeholder="e.g. Royal Enfield" value={brand} onChange={setBrand} />
            <InputField label="Model *" placeholder="e.g. Classic 350" value={model} onChange={setModel} />
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
                <option value="">Select fuel type</option>
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
            <InputField label="Seating Capacity *" placeholder="e.g. 5" value={seating} onChange={setSeating} type="number" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              rows={3} placeholder="Describe your vehicle condition, any special notes..."
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <Upload size={18} className="text-teal-600" /> Vehicle Images
          </h2>

          <div className="flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-20 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-xs text-teal-600 font-medium px-2 text-center">
                {img}
                <button
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                  <X size={10} />
                </button>
              </div>
            ))}

            <label className="w-24 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
              <Plus size={20} className="text-gray-400" />
              <span className="text-[10px] text-gray-400 mt-1">Add</span>
              <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-xs text-gray-400">Upload up to 10 photos. First image is the cover.</p>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <IndianRupee size={18} className="text-teal-600" /> Pricing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Price per Day (₹) *" placeholder="e.g. 800" value={pricePerDay} onChange={setPricePerDay} type="number" />
            <InputField label="Price per Hour (₹) *" placeholder="e.g. 100" value={pricePerHour} onChange={setPricePerHour} type="number" />
            <InputField label="Security Deposit (₹) *" placeholder="e.g. 2000" value={securityDeposit} onChange={setSecurityDeposit} type="number" />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark flex items-center gap-2">
            <MapPin size={18} className="text-teal-600" /> Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Area / Locality *" placeholder="e.g. Koramangala, Bangalore" value={location} onChange={setLocation} />
            <InputField label="Full Pickup Address *" placeholder="123, 4th Cross, 5th Block..." value={pickupAddress} onChange={setPickupAddress} />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-base font-bold text-dark">Features</h2>
          <div className="flex flex-wrap gap-2">
            {defaultFeatures.map((f) => (
              <button
                key={f}
                onClick={() => toggleFeature(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedFeatures.includes(f)
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
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
              { label: "RC (Registration Certificate) *", state: rcDoc, setter: setRcDoc },
              { label: "Insurance *", state: insurance, setter: setInsurance },
              { label: "Pollution Certificate", state: pollution, setter: setPollution },
              { label: "Fitness Certificate", state: fitness, setter: setFitness },
            ].map((doc) => (
              <div key={doc.label}>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  {doc.label}
                </label>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
                  {doc.state ? (
                    <span className="flex items-center gap-2 text-teal-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> {doc.state}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <Upload size={16} /> Upload
                    </span>
                  )}
                  <input
                    type="file" className="hidden" accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) doc.setter(file.name);
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 text-base font-semibold hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(13,148,136,0.3)]"
        >
          Submit Vehicle for Review
        </button>
      </div>
    </div>
  );
}

function InputField({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        type={type} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none transition-colors"
      />
    </div>
  );
}
