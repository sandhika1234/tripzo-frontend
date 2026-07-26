"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building2,
  Shield,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Pencil,
} from "lucide-react";
import { supplierProfile } from "@/lib/supplier-data";

const kycStatusStyle: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  approved: { bg: "bg-green-50", text: "text-green-600", icon: CheckCircle2 },
  pending: { bg: "bg-amber-50", text: "text-amber-600", icon: Clock },
  submitted: { bg: "bg-blue-50", text: "text-blue-600", icon: Clock },
  rejected: { bg: "bg-red-50", text: "text-red-500", icon: Shield },
};

export default function SupplierProfilePage() {
  const kyc = kycStatusStyle[supplierProfile.kycStatus];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-6">
        My Profile
      </h1>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {supplierProfile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-dark">
                {supplierProfile.name}
              </h2>
              {supplierProfile.verified && (
                <BadgeCheck size={20} className="text-teal-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">
              Member since {new Date(supplierProfile.joinedDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors">
            <Pencil size={14} /> Edit
          </button>
        </div>
      </div>

      {/* KYC Status */}
      <div className={`rounded-2xl p-5 mb-5 ${kyc.bg}`}>
        <div className="flex items-center gap-2 mb-1">
          <kyc.icon size={18} className={kyc.text} />
          <span className={`text-sm font-bold capitalize ${kyc.text}`}>
            KYC Status: {supplierProfile.kycStatus}
          </span>
        </div>
        <p className={`text-xs ${kyc.text} opacity-80`}>
          {supplierProfile.kycStatus === "approved"
            ? "Your identity has been verified. You can list vehicles."
            : "Your documents are being reviewed by our team."}
        </p>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
        <h3 className="text-base font-bold text-dark mb-4">
          Personal Information
        </h3>
        <div className="space-y-4">
          {[
            { icon: User, label: "Full Name", value: supplierProfile.name },
            { icon: Mail, label: "Email", value: supplierProfile.email },
            { icon: Phone, label: "Phone", value: supplierProfile.phone },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                <item.icon size={16} className="text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-dark">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
        <h3 className="text-base font-bold text-dark mb-4">
          KYC Documents
        </h3>
        <div className="space-y-3">
          {[
            { label: "Driving License", value: supplierProfile.documents.drivingLicense },
            { label: "Aadhaar Card", value: supplierProfile.documents.aadhaar },
            { label: "PAN Card", value: supplierProfile.documents.pan },
          ].map((doc) => (
            <div
              key={doc.label}
              className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-teal-600" />
                <span className="text-sm font-medium text-dark">
                  {doc.label}
                </span>
              </div>
              {doc.value ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <CheckCircle2 size={14} /> Uploaded
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-500">
                  Not uploaded
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-5">
        <h3 className="text-base font-bold text-dark mb-4">
          Bank Details
        </h3>
        {supplierProfile.bankDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: User, label: "Account Holder", value: supplierProfile.bankDetails.accountName },
              { icon: Building2, label: "Bank", value: supplierProfile.bankDetails.bankName },
              { icon: FileText, label: "Account No.", value: `••••••${supplierProfile.bankDetails.accountNumber.slice(-4)}` },
              { icon: Building2, label: "IFSC", value: supplierProfile.bankDetails.ifsc },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <item.icon size={16} className="text-teal-600" />
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-medium text-dark">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No bank details added yet.</p>
        )}
      </div>

      {/* GST */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-base font-bold text-dark mb-2">GST Number</h3>
        <p className="text-sm text-gray-500">
          {supplierProfile.gst || "Not provided (optional)"}
        </p>
      </div>
    </div>
  );
}
