"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Building2,
  Upload,
  CheckCircle2,
  ChevronRight,
  Shield,
} from "lucide-react";

type Step = "personal" | "documents" | "bank" | "review";

const steps: { id: Step; label: string; icon: typeof User }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "documents", label: "KYC Documents", icon: FileText },
  { id: "bank", label: "Bank Details", icon: Building2 },
  { id: "review", label: "Review", icon: CheckCircle2 },
];

export default function SupplierRegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [dlFile, setDlFile] = useState<string>("");
  const [aadhaarFile, setAadhaarFile] = useState<string>("");
  const [panFile, setPanFile] = useState<string>("");

  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [gst, setGst] = useState("");

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  const nextStep = () => {
    const next = steps[stepIndex + 1];
    if (next) setCurrentStep(next.id);
  };

  const prevStep = () => {
    const prev = steps[stepIndex - 1];
    if (prev) setCurrentStep(prev.id);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-teal-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-dark mb-2">
            Registration Submitted!
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            Your KYC documents have been submitted for review.
          </p>
          <p className="text-gray-400 text-xs mb-6">
            Our team will verify your documents within 24-48 hours. You&apos;ll receive a notification once approved.
          </p>

          <div className="bg-amber-50 rounded-xl p-4 text-left text-sm text-amber-700 mb-6">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <Shield size={16} />
              KYC Status: Under Review
            </div>
            <p className="text-xs text-amber-600">
              You can start adding vehicles once your KYC is approved.
            </p>
          </div>

          <Link
            href="/supplier/dashboard"
            className="block bg-teal-600 text-white rounded-xl py-3 font-semibold hover:bg-teal-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-dark mb-2">
        Become a Supplier
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Complete your registration to start listing vehicles on Tripzo
      </p>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => i <= stepIndex && setCurrentStep(step.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                step.id === currentStep
                  ? "bg-teal-600 text-white"
                  : i < stepIndex
                  ? "bg-teal-50 text-teal-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <step.icon size={16} />
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step: Personal Info */}
      {currentStep === "personal" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-bold text-dark">Personal Information</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Full Name *
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
              <User size={18} className="text-teal-600" />
              <input
                type="text" placeholder="Enter your full name"
                value={name} onChange={(e) => setName(e.target.value)}
                className="w-full text-sm bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Email *
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
              <Mail size={18} className="text-teal-600" />
              <input
                type="email" placeholder="your@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Phone Number *
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
              <Phone size={18} className="text-teal-600" />
              <input
                type="tel" placeholder="+91 98765 43210"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full text-sm bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              City *
            </label>
            <select
              value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none transition-colors"
            >
              <option value="">Select city</option>
              {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Goa"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step: KYC Documents */}
      {currentStep === "documents" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-bold text-dark">KYC Documents</h2>
          <p className="text-sm text-gray-400">
            Upload clear photos or PDFs of your documents
          </p>

          {[
            { label: "Driving License *", state: dlFile, setter: setDlFile },
            { label: "Aadhaar Card *", state: aadhaarFile, setter: setAadhaarFile },
            { label: "PAN Card *", state: panFile, setter: setPanFile },
          ].map((doc) => (
            <div key={doc.label}>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                {doc.label}
              </label>
              <label className="flex items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all">
                {doc.state ? (
                  <div className="flex items-center gap-2 text-teal-600">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-medium">{doc.state}</span>
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-400">
                      Click to upload
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) doc.setter(file.name);
                  }}
                />
              </label>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={prevStep}
              className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-3.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step: Bank Details */}
      {currentStep === "bank" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-bold text-dark">Bank Details</h2>
          <p className="text-sm text-gray-400">For receiving your payouts</p>

          {[
            { label: "Account Holder Name *", value: accountName, setter: setAccountName, icon: User, placeholder: "Name as on bank account" },
            { label: "Account Number *", value: accountNumber, setter: setAccountNumber, icon: CreditCard, placeholder: "Enter account number" },
            { label: "IFSC Code *", value: ifsc, setter: setIfsc, icon: Building2, placeholder: "e.g. SBIN0001234" },
            { label: "Bank Name *", value: bankName, setter: setBankName, icon: Building2, placeholder: "e.g. State Bank of India" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                {field.label}
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-teal-400 transition-colors">
                <field.icon size={18} className="text-teal-600" />
                <input
                  type="text" placeholder={field.placeholder}
                  value={field.value} onChange={(e) => field.setter(e.target.value)}
                  className="w-full text-sm bg-transparent"
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              GST Number (Optional)
            </label>
            <input
              type="text" placeholder="Enter GST number if applicable"
              value={gst} onChange={(e) => setGst(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-transparent focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-3.5 text-sm font-semibold hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button onClick={nextStep} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all">
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step: Review */}
      {currentStep === "review" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-bold text-dark">Review & Submit</h2>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Personal Info</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-400">Name:</span> <span className="font-medium">{name || "Not provided"}</span></p>
                <p><span className="text-gray-400">Email:</span> <span className="font-medium">{email || "Not provided"}</span></p>
                <p><span className="text-gray-400">Phone:</span> <span className="font-medium">{phone || "Not provided"}</span></p>
                <p><span className="text-gray-400">City:</span> <span className="font-medium">{city || "Not provided"}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Documents</h3>
              <div className="text-sm space-y-1">
                <p className="flex items-center gap-2">
                  {dlFile ? <CheckCircle2 size={14} className="text-green-500" /> : <span className="text-red-400 text-xs">Missing</span>}
                  <span className="text-gray-400">Driving License:</span> <span className="font-medium">{dlFile || "Not uploaded"}</span>
                </p>
                <p className="flex items-center gap-2">
                  {aadhaarFile ? <CheckCircle2 size={14} className="text-green-500" /> : <span className="text-red-400 text-xs">Missing</span>}
                  <span className="text-gray-400">Aadhaar:</span> <span className="font-medium">{aadhaarFile || "Not uploaded"}</span>
                </p>
                <p className="flex items-center gap-2">
                  {panFile ? <CheckCircle2 size={14} className="text-green-500" /> : <span className="text-red-400 text-xs">Missing</span>}
                  <span className="text-gray-400">PAN:</span> <span className="font-medium">{panFile || "Not uploaded"}</span>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">Bank Details</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-400">Account:</span> <span className="font-medium">{accountName || "Not provided"}</span></p>
                <p><span className="text-gray-400">Bank:</span> <span className="font-medium">{bankName || "Not provided"}</span></p>
                <p><span className="text-gray-400">IFSC:</span> <span className="font-medium">{ifsc || "Not provided"}</span></p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-700 rounded-xl py-3.5 text-sm font-semibold hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3.5 text-sm font-semibold transition-all"
            >
              Submit for Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
