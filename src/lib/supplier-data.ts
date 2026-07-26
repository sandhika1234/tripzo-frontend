// ─── Supplier Types ─────────────────────────────────────
export interface SupplierProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
  kycStatus: "pending" | "submitted" | "approved" | "rejected";
  documents: {
    drivingLicense: string | null;
    aadhaar: string | null;
    pan: string | null;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
  } | null;
  gst: string | null;
  joinedDate: string;
}

export interface SupplierVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: "bike" | "scooty" | "car" | "auto";
  fuelType: string;
  transmission: string;
  seating: number;
  pricePerDay: number;
  pricePerHour: number;
  securityDeposit: number;
  rating: number;
  totalTrips: number;
  location: string;
  pickupAddress: string;
  features: string[];
  images: string[];
  description: string;
  status: "active" | "paused" | "pending" | "rejected";
  rcDocument: string | null;
  insurance: string | null;
  pollutionCert: string | null;
  fitnessCert: string | null;
  createdAt: string;
}

export interface SupplierBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  customerPhone: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  amount: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface EarningRecord {
  id: string;
  bookingId: string;
  vehicleName: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  date: string;
  status: "paid" | "pending" | "processing";
}

// ─── Mock Supplier ──────────────────────────────────────
export const supplierProfile: SupplierProfile = {
  id: "s1",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+919876543210",
  avatar: "/images/avatars/supplier-1.jpg",
  verified: true,
  kycStatus: "approved",
  documents: {
    drivingLicense: "DL-uploaded.pdf",
    aadhaar: "Aadhaar-uploaded.pdf",
    pan: "PAN-uploaded.pdf",
  },
  bankDetails: {
    accountName: "Rajesh Kumar",
    accountNumber: "1234567890",
    ifsc: "SBIN0001234",
    bankName: "State Bank of India",
  },
  gst: null,
  joinedDate: "2025-06-15",
};

// ─── Mock Vehicles ──────────────────────────────────────
export const supplierVehicles: SupplierVehicle[] = [
  {
    id: "sv1",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    category: "bike",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: 2,
    pricePerDay: 800,
    pricePerHour: 100,
    securityDeposit: 2000,
    rating: 4.6,
    totalTrips: 234,
    location: "Koramangala, Bangalore",
    pickupAddress: "123, 4th Cross, Koramangala 5th Block",
    features: ["Helmet Included", "Saddle Bags", "Phone Mount", "First Aid Kit"],
    images: ["/images/vehicles/bike-1.jpg"],
    description: "Well-maintained Royal Enfield Classic 350 in excellent condition.",
    status: "active",
    rcDocument: "RC-uploaded.pdf",
    insurance: "Insurance-uploaded.pdf",
    pollutionCert: "PUC-uploaded.pdf",
    fitnessCert: null,
    createdAt: "2025-07-01",
  },
  {
    id: "sv2",
    name: "KTM Duke 200",
    brand: "KTM",
    model: "Duke 200",
    category: "bike",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: 2,
    pricePerDay: 1200,
    pricePerHour: 150,
    securityDeposit: 3000,
    rating: 4.7,
    totalTrips: 145,
    location: "Electronic City, Bangalore",
    pickupAddress: "45, Hosur Road, Electronic City Phase 1",
    features: ["Helmet Included", "Phone Mount", "Tank Bag"],
    images: ["/images/vehicles/bike-3.jpg"],
    description: "Thrilling KTM Duke 200 for an adrenaline-pumping ride.",
    status: "active",
    rcDocument: "RC-uploaded.pdf",
    insurance: "Insurance-uploaded.pdf",
    pollutionCert: "PUC-uploaded.pdf",
    fitnessCert: null,
    createdAt: "2025-08-10",
  },
  {
    id: "sv3",
    name: "Maruti Swift ZXi",
    brand: "Maruti Suzuki",
    model: "Swift ZXi",
    category: "car",
    fuelType: "Petrol",
    transmission: "Manual",
    seating: 5,
    pricePerDay: 1500,
    pricePerHour: 200,
    securityDeposit: 5000,
    rating: 4.5,
    totalTrips: 412,
    location: "Indiranagar, Bangalore",
    pickupAddress: "78, 100 Feet Road, Indiranagar",
    features: ["AC", "Bluetooth", "Power Steering", "ABS", "Airbags"],
    images: ["/images/vehicles/car-1.jpg"],
    description: "Sporty Maruti Swift ZXi with excellent mileage.",
    status: "paused",
    rcDocument: "RC-uploaded.pdf",
    insurance: "Insurance-uploaded.pdf",
    pollutionCert: "PUC-uploaded.pdf",
    fitnessCert: "Fitness-uploaded.pdf",
    createdAt: "2025-09-05",
  },
  {
    id: "sv4",
    name: "Honda Activa 6G",
    brand: "Honda",
    model: "Activa 6G",
    category: "scooty",
    fuelType: "Petrol",
    transmission: "Automatic",
    seating: 2,
    pricePerDay: 400,
    pricePerHour: 60,
    securityDeposit: 1000,
    rating: 4.4,
    totalTrips: 567,
    location: "HSR Layout, Bangalore",
    pickupAddress: "12, Sector 2, HSR Layout",
    features: ["Helmet Included", "USB Charger", "Under-seat Storage"],
    images: ["/images/vehicles/scooty-1.jpg"],
    description: "Smooth and fuel-efficient Honda Activa 6G.",
    status: "pending",
    rcDocument: "RC-uploaded.pdf",
    insurance: null,
    pollutionCert: null,
    fitnessCert: null,
    createdAt: "2026-07-20",
  },
];

// ─── Mock Bookings ──────────────────────────────────────
export const supplierBookings: SupplierBooking[] = [
  {
    id: "SB-001",
    vehicleId: "sv1",
    vehicleName: "Royal Enfield Classic 350",
    customerName: "Amit Shah",
    customerPhone: "+919988776655",
    pickupDate: "2026-08-01",
    returnDate: "2026-08-03",
    pickupTime: "10:00",
    returnTime: "10:00",
    amount: 1600,
    status: "pending",
    createdAt: "2026-07-25",
  },
  {
    id: "SB-002",
    vehicleId: "sv2",
    vehicleName: "KTM Duke 200",
    customerName: "Priya Mehta",
    customerPhone: "+919876512345",
    pickupDate: "2026-07-28",
    returnDate: "2026-07-30",
    pickupTime: "09:00",
    returnTime: "18:00",
    amount: 2400,
    status: "confirmed",
    createdAt: "2026-07-24",
  },
  {
    id: "SB-003",
    vehicleId: "sv1",
    vehicleName: "Royal Enfield Classic 350",
    customerName: "Karan Desai",
    customerPhone: "+919887766554",
    pickupDate: "2026-07-20",
    returnDate: "2026-07-22",
    pickupTime: "08:00",
    returnTime: "20:00",
    amount: 1600,
    status: "completed",
    createdAt: "2026-07-18",
  },
  {
    id: "SB-004",
    vehicleId: "sv3",
    vehicleName: "Maruti Swift ZXi",
    customerName: "Rohit Nair",
    customerPhone: "+919776655443",
    pickupDate: "2026-07-15",
    returnDate: "2026-07-18",
    pickupTime: "11:00",
    returnTime: "11:00",
    amount: 4500,
    status: "completed",
    createdAt: "2026-07-13",
  },
  {
    id: "SB-005",
    vehicleId: "sv2",
    vehicleName: "KTM Duke 200",
    customerName: "Sneha Iyer",
    customerPhone: "+919665544332",
    pickupDate: "2026-07-10",
    returnDate: "2026-07-11",
    pickupTime: "10:00",
    returnTime: "10:00",
    amount: 1200,
    status: "cancelled",
    createdAt: "2026-07-08",
  },
];

// ─── Mock Earnings ──────────────────────────────────────
export const supplierEarnings: EarningRecord[] = [
  {
    id: "E-001",
    bookingId: "SB-003",
    vehicleName: "Royal Enfield Classic 350",
    amount: 1600,
    platformFee: 160,
    netAmount: 1440,
    date: "2026-07-22",
    status: "paid",
  },
  {
    id: "E-002",
    bookingId: "SB-004",
    vehicleName: "Maruti Swift ZXi",
    amount: 4500,
    platformFee: 450,
    netAmount: 4050,
    date: "2026-07-18",
    status: "paid",
  },
  {
    id: "E-003",
    bookingId: "SB-002",
    vehicleName: "KTM Duke 200",
    amount: 2400,
    platformFee: 240,
    netAmount: 2160,
    date: "2026-07-30",
    status: "pending",
  },
];

// ─── Dashboard Stats ────────────────────────────────────
export const dashboardStats = {
  todayRevenue: 2400,
  monthlyRevenue: 32850,
  totalBookings: 791,
  activeVehicles: 2,
  pausedVehicles: 1,
  pendingVehicles: 1,
  pendingRequests: 1,
  upcomingRentals: 2,
  avgRating: 4.6,
  fleetUtilization: 72,
};
