"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "ADMIN") router.push("/admin/dashboard");
      else if (user.role === "SUPPLIER") router.push("/supplier/dashboard");
      else router.push("/");
    }
  }, [isAuthenticated, user, router]);

  const handleLogin = async () => {
    if (phone.length < 10) return setError("Enter a valid 10-digit phone number");
    if (!password) return setError("Enter your password");
    setError("");
    setLoading(true);
    const result = await login(phone, password);
    setLoading(false);
    if (!result.success) setError(result.error || "Login failed");
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
          <p className="text-sm text-gray-500 mt-3">Self-Drive Vehicle Rental Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(13,148,136,0.08)] border border-gray-100 p-7 sm:p-8">
          <h1 className="text-2xl font-extrabold text-dark mb-1">Welcome back</h1>
          <p className="text-sm text-gray-400 mb-7">Login with your phone number & password</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Phone Number</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-teal-400 transition-colors">
                <span className="text-sm font-medium text-gray-500 flex-shrink-0">+91</span>
                <div className="w-px h-5 bg-gray-200" />
                <Phone size={18} className="text-teal-600 flex-shrink-0" />
                <input
                  type="tel" placeholder="Enter 10-digit number" autoFocus
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full text-base font-medium bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Password</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-teal-400 transition-colors">
                <Lock size={18} className="text-teal-600 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"} placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full text-base font-medium bg-transparent outline-none"
                />
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading || phone.length < 10 || !password}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2 transition-all mt-5"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Login <ArrowRight size={18} /></>}
          </button>

          <div className="relative flex items-center my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs text-gray-400 bg-white">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            New to Tripzo? <Link href="/register" className="text-teal-600 font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
