"use client";
import { useState } from "react";
import { adminTickets, SupportTicket } from "@/lib/admin-data";

const priorityStyle: Record<string, string> = { low: "bg-gray-100 text-gray-500", medium: "bg-blue-50 text-blue-600", high: "bg-amber-50 text-amber-600", urgent: "bg-red-50 text-red-500" };
const statusStyle: Record<string, string> = { open: "bg-red-50 text-red-500", in_progress: "bg-blue-50 text-blue-600", resolved: "bg-green-50 text-green-600", closed: "bg-gray-100 text-gray-500" };

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(adminTickets);

  const updateStatus = (id: string, status: SupportTicket["status"]) => {
    setTickets((p) => p.map((t) => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold text-dark mb-1">Support Tickets</h1>
      <p className="text-sm text-gray-400 mb-6">{tickets.filter(t => t.status === "open").length} open tickets</p>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-mono">{t.id}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${priorityStyle[t.priority]}`}>{t.priority}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyle[t.status]}`}>{t.status.replace("_", " ")}</span>
                </div>
                <h3 className="text-base font-bold text-dark">{t.subject}</h3>
                <p className="text-sm text-gray-400">{t.customerName} · {t.category} · {t.createdAt}</p>
              </div>
              <div className="flex gap-2">
                {t.status === "open" && <button onClick={() => updateStatus(t.id, "in_progress")} className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100">Start</button>}
                {t.status === "in_progress" && <button onClick={() => updateStatus(t.id, "resolved")} className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-100">Resolve</button>}
                {(t.status === "resolved") && <button onClick={() => updateStatus(t.id, "closed")} className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200">Close</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
