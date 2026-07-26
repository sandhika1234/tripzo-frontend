"use client";
import { useState } from "react";
import { Save, IndianRupee, Percent, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const [commission, setCommission] = useState("10");
  const [gst, setGst] = useState("18");
  const [minPayout, setMinPayout] = useState("500");
  const [payoutCycle, setPayoutCycle] = useState("weekly");
  const [cancellationWindow, setCancellationWindow] = useState("24");
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-extrabold text-dark mb-6">Platform Settings</h1>

      <div className="space-y-6">
        {/* Commission */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark flex items-center gap-2 mb-4"><Percent size={18} className="text-teal-600" /> Commission & Fees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Platform Commission (%)</label>
              <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">GST Rate (%)</label>
              <input type="number" value={gst} onChange={(e) => setGst(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Payouts */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark flex items-center gap-2 mb-4"><IndianRupee size={18} className="text-teal-600" /> Payout Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Minimum Payout (₹)</label>
              <input type="number" value={minPayout} onChange={(e) => setMinPayout(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Payout Cycle</label>
              <select value={payoutCycle} onChange={(e) => setPayoutCycle(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none bg-transparent">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cancellation */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark flex items-center gap-2 mb-4"><Shield size={18} className="text-teal-600" /> Cancellation Policy</h2>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Free Cancellation Window (hours)</label>
            <input type="number" value={cancellationWindow} onChange={(e) => setCancellationWindow(e.target.value)} className="w-full sm:w-64 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" />
            <p className="text-xs text-gray-400 mt-1.5">Customers can cancel free within this window before pickup</p>
          </div>
        </div>

        {/* Platform */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-dark flex items-center gap-2 mb-4"><Globe size={18} className="text-teal-600" /> Platform Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Platform Name</label><input type="text" defaultValue="Tripzo" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Support Email</label><input type="email" defaultValue="support@tripzo.in" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Support Phone</label><input type="tel" defaultValue="+91 1800 123 4567" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" /></div>
            <div><label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">WhatsApp</label><input type="tel" defaultValue="+91 98765 43210" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-teal-400 focus:outline-none" /></div>
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave} className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all ${saved ? "bg-green-500 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"}`}>
          {saved ? <><Save size={18} /> Saved!</> : <><Save size={18} /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}
