"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Download, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Safety", href: "/safety" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/97 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-teal-600 rounded-xl px-5 py-2">
              <span className="text-white font-extrabold text-xl tracking-tight">
                tripzo
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                  i === 0
                    ? "text-teal-700 border-b-2 border-teal-600 pb-1"
                    : "text-gray-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              /* Logged In - User Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 bg-teal-50 rounded-xl px-3 py-2 hover:bg-teal-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-dark max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-sm font-bold text-dark truncate">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.phone || user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded capitalize">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} /> My Profile
                    </Link>

                    {user.role === "supplier" && (
                      <Link
                        href="/supplier/dashboard"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Download size={16} /> Supplier Dashboard
                      </Link>
                    )}

                    {user.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Download size={16} /> Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <>
                <Link
                  href="/login"
                  className="hidden md:block text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hidden md:flex items-center gap-2 bg-dark text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-[68px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-slide-in">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg px-3 py-3 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {!isAuthenticated && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-base font-semibold text-teal-600 border border-teal-200 rounded-xl py-3 hover:bg-teal-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="text-center text-base font-semibold text-white bg-dark rounded-xl py-3 hover:bg-teal-800 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isAuthenticated && user && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 text-red-500 border border-red-200 rounded-xl py-3 text-sm font-semibold hover:bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
