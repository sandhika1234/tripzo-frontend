"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, MapPin, Lock, ArrowRight, Loader2, Car, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "SUPPLIER">("CUSTOMER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name.trim()) return setError("Name is required");
    if (phone.length < 10) return setError("Valid phone number is required");
    if (password.length < 4) return setError("Password must be at least 4 characters");
    setError("");
    setLoading(true);
    const result = await register({ name, email, phone, password, city, role });
    setLoading(false);
    if (result.success) {
      if (role === "SUPPLIER") router.push("/supplier/dashboard");
      else router.push("/");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="bg-teal-600 rounded-2xl px-6 py-2.5 inline-block">
              <span className="text-white font-extrabold text-2xl tracking-tight">tripzo</span>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(13,148,136,0.08)] border border-gray-100 p-7 sm:p-8">
          <h1 className="text-2xl font-extrabold text-dark mb-1">Create Account</h1>
          <p className="text-sm text-gray-400 mb-6">Join Tripzo as a customer or vehicle owner</p>

          {/* Role Selection */}
          <div className="flex gap-3 mb-6">
            {[
              { id: "CUSTOMER" as const, label: "Customer", desc: "Rent vehicles", icon: Users },
              { id: "SUPPLIER" as const, label: "Vehicle Owner", desc: "List & earn", icon: Car },
            ].map((r) => (
              <button key={r.id} onClick={() => setRole(r.id)}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${role === r.id ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-teal-300"}`}>
                <r.icon size={22} className={role === r.id ? "text-teal-600 mb-2" : "text-gray-400 mb-2"} />
                <p className={`text-sm font-bold ${role === r.id ? "text-teal-700" : "text-gray-700"}`}>{r.label}</p>
                <p className="text-xs text-gray-400">{r.desc}</p>
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400">
              <User size={18} className="text-teal-600" />
              <input type="text" placeholder="Full Name *" value={name} onChange={(e) => { setName(e.target.value); setError(""); }} className="w-full text-sm bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400">
              <Mail size={18} className="text-teal-600" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400">
              <Phone size={18} className="text-teal-600" />
              <span className="text-sm font-medium text-gray-500">+91</span>
              <input type="tel" placeholder="Phone Number *" value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }} className="w-full text-sm bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400">
              <Lock size={18} className="text-teal-600" />
              <input type="password" placeholder="Create Password *" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} className="w-full text-sm bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400">
              <MapPin size={18} className="text-teal-600" />
              <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full text-sm bg-transparent outline-none text-gray-700">
                <option value="">Select City</option>
                {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Goa"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

          <button onClick={handleRegister} disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-200 text-white rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2 transition-all mt-5">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account? <Link href="/login" className="text-teal-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
