import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const companyLinks = [
  "Home",
  "About Us",
  "Careers",
  "Safety",
  "Blog",
  "Press",
  "Privacy Policy",
];

const legalLinks = [
  "Customer Terms",
  "Owner Terms",
  "Cancellation Policy",
  "Refund Policy",
  "Corporate Affairs",
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Customer App */}
          <div>
            <h4 className="text-sm font-semibold text-teal-300 mb-4">
              Customer App
            </h4>
            <div className="flex flex-col gap-2.5">
              <AppBadge store="google" />
              <AppBadge store="apple" />
            </div>
          </div>

          {/* Owner App */}
          <div>
            <h4 className="text-sm font-semibold text-teal-300 mb-4">
              Owner App
            </h4>
            <AppBadge store="google" />
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-teal-300 mb-4">
              Company
            </h4>
            <div className="flex flex-col gap-1.5">
              {companyLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-gray-400 hover:text-teal-300 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-teal-300 mb-4">Legal</h4>
            <div className="flex flex-col gap-1.5">
              {legalLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-sm text-gray-400 hover:text-teal-300 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-teal-300 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-teal-700 hover:border-teal-600 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Tripzo Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppBadge({ store }: { store: "google" | "apple" }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 flex items-center gap-2 cursor-pointer hover:border-teal-500 transition-colors">
      {store === "google" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.639a1 1 0 010 1.731l-2.834 1.639-2.532-2.532 2.532-2.477zM5.864 3.458L16.8 9.79l-2.302 2.302-8.634-8.634z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      <div>
        <div className="text-[9px] text-gray-400 leading-tight">
          {store === "google" ? "GET IT ON" : "Download on the"}
        </div>
        <div className="text-xs font-semibold leading-tight">
          {store === "google" ? "Google Play" : "App Store"}
        </div>
      </div>
    </div>
  );
}
