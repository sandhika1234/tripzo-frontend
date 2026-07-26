"use client";
import { Plus, FileText, Eye, Pencil, Trash2 } from "lucide-react";

const blogs = [
  { id: 1, title: "Top 10 Road Trips from Bangalore", status: "published", views: 12400, date: "2026-07-20" },
  { id: 2, title: "Self-Drive vs Cab: Which is Better?", status: "published", views: 8900, date: "2026-07-15" },
  { id: 3, title: "Monsoon Driving Safety Tips", status: "draft", views: 0, date: "2026-07-25" },
  { id: 4, title: "How to Save on Vehicle Rentals", status: "published", views: 5600, date: "2026-07-10" },
];

const seoPages = [
  { title: "Self Drive Car Rental in Bangalore", slug: "/bangalore", status: "live" },
  { title: "Bike Rental in Mumbai", slug: "/mumbai/bikes", status: "live" },
  { title: "Scooty Rental in Goa", slug: "/goa/scooty", status: "draft" },
];

export default function AdminCMSPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-dark">CMS & Blog</h1>
        <button className="flex items-center gap-2 bg-teal-600 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-teal-700"><Plus size={18} /> New Post</button>
      </div>

      {/* Blog Posts */}
      <div className="bg-white rounded-xl border border-gray-100 mb-6">
        <div className="px-5 py-3 border-b border-gray-50"><h2 className="text-sm font-bold text-dark">Blog Posts</h2></div>
        <div className="divide-y divide-gray-50">
          {blogs.map((b) => (
            <div key={b.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
              <FileText size={18} className="text-teal-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-dark truncate">{b.title}</p>
                <p className="text-xs text-gray-400">{b.date} · {b.views.toLocaleString()} views</p>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${b.status === "published" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>{b.status}</span>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100"><Eye size={14} className="text-gray-400" /></button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100"><Pencil size={14} className="text-gray-400" /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 size={14} className="text-red-400" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Pages */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
          <h2 className="text-sm font-bold text-dark">SEO Landing Pages</h2>
          <button className="text-xs text-teal-600 font-medium">+ Add Page</button>
        </div>
        <div className="divide-y divide-gray-50">
          {seoPages.map((p) => (
            <div key={p.slug} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50">
              <div className="flex-1"><p className="text-sm font-semibold text-dark">{p.title}</p><p className="text-xs text-gray-400">{p.slug}</p></div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.status === "live" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
