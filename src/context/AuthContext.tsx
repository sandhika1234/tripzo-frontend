"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi } from "@/lib/api";

export type UserRole = "CUSTOMER" | "SUPPLIER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  kycStatus?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOtp: (phone: string, code: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  sendOtp: (phone: string) => Promise<{ success: boolean; debug_otp?: string }>;
}

interface RegisterData {
  name: string;
  email?: string;
  phone: string;
  password: string;
  city?: string;
  role?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = sessionStorage.getItem("tripzo_token");
        const storedUser = sessionStorage.getItem("tripzo_user");
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          // Optionally verify token is still valid
          try {
            const profile = await authApi.getProfile();
            setUser(profile);
            sessionStorage.setItem("tripzo_user", JSON.stringify(profile));
          } catch {
            // Token expired — clear
            sessionStorage.removeItem("tripzo_token");
            sessionStorage.removeItem("tripzo_user");
            setUser(null);
          }
        }
      } catch {}
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const persistAuth = (token: string, userData: AuthUser) => {
    sessionStorage.setItem("tripzo_token", token);
    sessionStorage.setItem("tripzo_user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (phone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authApi.login(phone, password);
      if (res.success && res.token) {
        persistAuth(res.token, res.user);
        return { success: true };
      }
      return { success: false, error: "Login failed" };
    } catch (err: any) {
      return { success: false, error: err.message || "Invalid credentials" };
    }
  };

  const sendOtp = async (phone: string): Promise<{ success: boolean; debug_otp?: string }> => {
    try {
      const res = await authApi.sendOtp(phone);
      return { success: true, debug_otp: res.debug_otp };
    } catch {
      return { success: false };
    }
  };

  const loginWithOtp = async (phone: string, code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authApi.verifyOtp(phone, code);
      if (res.success && res.token) {
        persistAuth(res.token, res.user);
        return { success: true };
      }
      return { success: false, error: "Verification failed" };
    } catch (err: any) {
      return { success: false, error: err.message || "Invalid OTP" };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authApi.register(data);
      if (res.success && res.token) {
        persistAuth(res.token, res.user);
        return { success: true };
      }
      return { success: false, error: "Registration failed" };
    } catch (err: any) {
      return { success: false, error: err.message || "Registration failed" };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("tripzo_token");
    sessionStorage.removeItem("tripzo_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, loginWithOtp, register, logout, sendOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
