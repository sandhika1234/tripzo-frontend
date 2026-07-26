// ─── Admin Types ────────────────────────────────────────
export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
  status: "active" | "blocked";
}

export interface AdminSupplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  kycStatus: "pending" | "approved" | "rejected";
  totalVehicles: number;
  totalEarnings: number;
  joinedDate: string;
  status: "active" | "blocked";
}

export interface AdminVehicle {
  id: string;
  name: string;
  category: string;
  supplierName: string;
  city: string;
  pricePerDay: number;
  rating: number;
  status: "active" | "paused" | "pending" | "rejected";
  featured: boolean;
  createdAt: string;
}

export interface AdminBooking {
  id: string;
  customerName: string;
  supplierName: string;
  vehicleName: string;
  pickupDate: string;
  returnDate: string;
  amount: number;
  platformFee: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  platformFee: number;
  method: string;
  status: "success" | "pending" | "failed" | "refunded";
  date: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrder: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: "active" | "expired" | "disabled";
}

export interface SupportTicket {
  id: string;
  customerName: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

// ─── Dashboard Stats ────────────────────────────────────
export const adminDashStats = {
  totalRevenue: 1284500,
  monthlyRevenue: 328500,
  totalBookings: 4562,
  activeBookings: 48,
  totalCustomers: 12840,
  totalSuppliers: 342,
  totalVehicles: 1856,
  pendingApprovals: 23,
  pendingKyc: 8,
  avgRating: 4.5,
  platformFees: 192675,
  refundsThisMonth: 12400,
  conversionRate: 18.4,
  monthlyGrowth: 14.2,
};

// ─── Mock Customers ─────────────────────────────────────
export const adminCustomers: AdminCustomer[] = [
  { id: "C001", name: "Amit Shah", email: "amit@gmail.com", phone: "+919988776655", city: "Bangalore", totalBookings: 12, totalSpent: 28400, joinedDate: "2025-06-10", status: "active" },
  { id: "C002", name: "Priya Mehta", email: "priya@gmail.com", phone: "+919876512345", city: "Mumbai", totalBookings: 8, totalSpent: 15600, joinedDate: "2025-07-22", status: "active" },
  { id: "C003", name: "Rohit Nair", email: "rohit@gmail.com", phone: "+919776655443", city: "Chennai", totalBookings: 23, totalSpent: 52000, joinedDate: "2025-03-15", status: "active" },
  { id: "C004", name: "Sneha Iyer", email: "sneha@gmail.com", phone: "+919665544332", city: "Bangalore", totalBookings: 5, totalSpent: 8900, joinedDate: "2025-09-01", status: "active" },
  { id: "C005", name: "Karan Desai", email: "karan@gmail.com", phone: "+919887766554", city: "Pune", totalBookings: 0, totalSpent: 0, joinedDate: "2026-07-20", status: "blocked" },
  { id: "C006", name: "Ananya Gupta", email: "ananya@gmail.com", phone: "+919123456789", city: "Delhi", totalBookings: 15, totalSpent: 34200, joinedDate: "2025-05-08", status: "active" },
];

// ─── Mock Suppliers ─────────────────────────────────────
export const adminSuppliers: AdminSupplier[] = [
  { id: "S001", name: "Rajesh Kumar", email: "rajesh@gmail.com", phone: "+919876543210", city: "Bangalore", kycStatus: "approved", totalVehicles: 5, totalEarnings: 184500, joinedDate: "2025-06-15", status: "active" },
  { id: "S002", name: "Priya Sharma", email: "priya.s@gmail.com", phone: "+919876543211", city: "Bangalore", kycStatus: "approved", totalVehicles: 8, totalEarnings: 256000, joinedDate: "2025-04-20", status: "active" },
  { id: "S003", name: "Vikram Singh", email: "vikram@gmail.com", phone: "+919876543213", city: "Mumbai", kycStatus: "pending", totalVehicles: 0, totalEarnings: 0, joinedDate: "2026-07-24", status: "active" },
  { id: "S004", name: "Mohammed Rafi", email: "rafi@gmail.com", phone: "+919876543214", city: "Hyderabad", kycStatus: "approved", totalVehicles: 6, totalEarnings: 98000, joinedDate: "2025-08-10", status: "active" },
  { id: "S005", name: "Deepa Nair", email: "deepa@gmail.com", phone: "+919876543215", city: "Chennai", kycStatus: "rejected", totalVehicles: 0, totalEarnings: 0, joinedDate: "2026-07-18", status: "blocked" },
];

// ─── Mock Vehicles ──────────────────────────────────────
export const adminVehicles: AdminVehicle[] = [
  { id: "V001", name: "Royal Enfield Classic 350", category: "bike", supplierName: "Rajesh Kumar", city: "Bangalore", pricePerDay: 800, rating: 4.6, status: "active", featured: true, createdAt: "2025-07-01" },
  { id: "V002", name: "Honda Activa 6G", category: "scooty", supplierName: "Priya Sharma", city: "Bangalore", pricePerDay: 400, rating: 4.4, status: "active", featured: false, createdAt: "2025-07-15" },
  { id: "V003", name: "Maruti Swift ZXi", category: "car", supplierName: "Rajesh Kumar", city: "Bangalore", pricePerDay: 1500, rating: 4.5, status: "paused", featured: false, createdAt: "2025-09-05" },
  { id: "V004", name: "Hyundai Creta SX", category: "car", supplierName: "Vikram Singh", city: "Mumbai", pricePerDay: 2500, rating: 4.8, status: "pending", featured: false, createdAt: "2026-07-20" },
  { id: "V005", name: "KTM Duke 200", category: "bike", supplierName: "Rajesh Kumar", city: "Bangalore", pricePerDay: 1200, rating: 4.7, status: "active", featured: true, createdAt: "2025-08-10" },
  { id: "V006", name: "Bajaj RE Auto", category: "auto", supplierName: "Mohammed Rafi", city: "Hyderabad", pricePerDay: 600, rating: 4.2, status: "active", featured: false, createdAt: "2025-10-01" },
];

// ─── Mock Bookings ──────────────────────────────────────
export const adminBookings: AdminBooking[] = [
  { id: "B001", customerName: "Amit Shah", supplierName: "Rajesh Kumar", vehicleName: "Royal Enfield Classic 350", pickupDate: "2026-08-01", returnDate: "2026-08-03", amount: 1600, platformFee: 160, status: "pending", createdAt: "2026-07-25" },
  { id: "B002", customerName: "Priya Mehta", supplierName: "Rajesh Kumar", vehicleName: "KTM Duke 200", pickupDate: "2026-07-28", returnDate: "2026-07-30", amount: 2400, platformFee: 240, status: "confirmed", createdAt: "2026-07-24" },
  { id: "B003", customerName: "Rohit Nair", supplierName: "Rajesh Kumar", vehicleName: "Maruti Swift ZXi", pickupDate: "2026-07-15", returnDate: "2026-07-18", amount: 4500, platformFee: 450, status: "completed", createdAt: "2026-07-13" },
  { id: "B004", customerName: "Sneha Iyer", supplierName: "Priya Sharma", vehicleName: "Honda Activa 6G", pickupDate: "2026-07-20", returnDate: "2026-07-22", amount: 800, platformFee: 80, status: "completed", createdAt: "2026-07-18" },
  { id: "B005", customerName: "Ananya Gupta", supplierName: "Mohammed Rafi", vehicleName: "Bajaj RE Auto", pickupDate: "2026-07-10", returnDate: "2026-07-11", amount: 600, platformFee: 60, status: "cancelled", createdAt: "2026-07-08" },
  { id: "B006", customerName: "Karan Desai", supplierName: "Vikram Singh", vehicleName: "Hyundai Creta SX", pickupDate: "2026-08-05", returnDate: "2026-08-08", amount: 7500, platformFee: 750, status: "confirmed", createdAt: "2026-07-26" },
];

// ─── Mock Payments ──────────────────────────────────────
export const adminPayments: AdminPayment[] = [
  { id: "P001", bookingId: "B001", customerName: "Amit Shah", amount: 1600, platformFee: 160, method: "UPI", status: "success", date: "2026-07-25" },
  { id: "P002", bookingId: "B002", customerName: "Priya Mehta", amount: 2400, platformFee: 240, method: "Card", status: "success", date: "2026-07-24" },
  { id: "P003", bookingId: "B003", customerName: "Rohit Nair", amount: 4500, platformFee: 450, method: "UPI", status: "success", date: "2026-07-13" },
  { id: "P004", bookingId: "B005", customerName: "Ananya Gupta", amount: 600, platformFee: 60, method: "Net Banking", status: "refunded", date: "2026-07-08" },
  { id: "P005", bookingId: "B006", customerName: "Karan Desai", amount: 7500, platformFee: 750, method: "Card", status: "pending", date: "2026-07-26" },
];

// ─── Mock Coupons ───────────────────────────────────────
export const adminCoupons: AdminCoupon[] = [
  { id: "CP001", code: "FIRST50", description: "50% off first ride", discountType: "percentage", discountValue: 50, minOrder: 500, maxDiscount: 500, usageLimit: 1000, usedCount: 743, validFrom: "2026-01-01", validTo: "2026-12-31", status: "active" },
  { id: "CP002", code: "FLAT200", description: "Flat ₹200 off", discountType: "flat", discountValue: 200, minOrder: 1000, maxDiscount: 200, usageLimit: 500, usedCount: 312, validFrom: "2026-06-01", validTo: "2026-08-31", status: "active" },
  { id: "CP003", code: "WEEKEND25", description: "25% off weekend rentals", discountType: "percentage", discountValue: 25, minOrder: 800, maxDiscount: 300, usageLimit: 2000, usedCount: 2000, validFrom: "2026-01-01", validTo: "2026-06-30", status: "expired" },
];

// ─── Mock Support Tickets ───────────────────────────────
export const adminTickets: SupportTicket[] = [
  { id: "T001", customerName: "Amit Shah", subject: "Vehicle not as described", category: "Vehicle Issue", priority: "high", status: "open", createdAt: "2026-07-25" },
  { id: "T002", customerName: "Sneha Iyer", subject: "Refund not received", category: "Payment", priority: "urgent", status: "in_progress", createdAt: "2026-07-24" },
  { id: "T003", customerName: "Rohit Nair", subject: "Late pickup by supplier", category: "Booking Issue", priority: "medium", status: "resolved", createdAt: "2026-07-20" },
  { id: "T004", customerName: "Priya Mehta", subject: "App login issue", category: "Technical", priority: "low", status: "closed", createdAt: "2026-07-18" },
];
