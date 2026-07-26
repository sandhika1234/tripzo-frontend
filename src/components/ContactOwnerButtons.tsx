"use client";

import { Phone, MessageCircle } from "lucide-react";

interface ContactOwnerProps {
  phone: string;
  whatsapp: string;
  vehicleName: string;
  pickupDate?: string;
  pickupTime?: string;
}

export default function ContactOwnerButtons({
  phone,
  whatsapp,
  vehicleName,
  pickupDate,
  pickupTime,
}: ContactOwnerProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi,\n\nI am interested in booking your vehicle listed on Tripzo.\n\nVehicle: ${vehicleName}\nDate: ${pickupDate || "To be decided"}\nPickup Time: ${pickupTime || "To be decided"}\n\nPlease confirm availability.\n\nThank you.`
  );

  const whatsappUrl = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;
  const callUrl = `tel:${phone}`;

  return (
    <div className="flex gap-3">
      <a
        href={callUrl}
        className="flex-1 flex items-center justify-center gap-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-xl py-3 px-4 text-sm font-semibold hover:bg-teal-100 transition-colors"
      >
        <Phone size={18} />
        Call Owner
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white rounded-xl py-3 px-4 text-sm font-semibold hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
