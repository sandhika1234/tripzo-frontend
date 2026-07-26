"use client";

import { Menu, Bell } from "lucide-react";

interface SupplierHeaderProps {
  onMenuClick: () => void;
}

export default function SupplierHeader({ onMenuClick }: SupplierHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/97 backdrop-blur-md border-b border-gray-100 h-[60px] flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={22} className="text-dark" />
      </button>

      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-gray-400">Welcome back,</h2>
        <p className="text-base font-bold text-dark -mt-0.5">Rajesh Kumar</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm lg:hidden">
          R
        </div>
      </div>
    </header>
  );
}
