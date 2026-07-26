// ─── Vehicle Types ──────────────────────────────────────
export type VehicleCategory = "bike" | "scooty" | "car" | "auto";

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  fuelType: string;
  transmission: string;
  seating: number;
  pricePerDay: number;
  pricePerHour: number;
  securityDeposit: number;
  rating: number;
  totalTrips: number;
  totalReviews: number;
  location: string;
  city: string;
  features: string[];
  images: string[];
  supplier: {
    id: string;
    name: string;
    phone: string;
    whatsapp: string;
    avatar: string;
    rating: number;
    totalVehicles: number;
    verified: boolean;
  };
  available: boolean;
  description: string;
}

// ─── Mock Vehicles ──────────────────────────────────────
export const vehicles: Vehicle[] = [
  {
    id: "v1",
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
    totalReviews: 89,
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    features: ["Helmet Included", "Saddle Bags", "Phone Mount", "First Aid Kit"],
    images: ["/images/vehicles/bike-1.jpg", "/images/vehicles/bike-2.jpg"],
    supplier: {
      id: "s1",
      name: "Rajesh Kumar",
      phone: "+919876543210",
      whatsapp: "919876543210",
      avatar: "/images/avatars/supplier-1.jpg",
      rating: 4.7,
      totalVehicles: 5,
      verified: true,
    },
    available: true,
    description:
      "Well-maintained Royal Enfield Classic 350 in excellent condition. Perfect for city rides and weekend getaways. Recently serviced with new tyres.",
  },
  {
    id: "v2",
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
    totalReviews: 203,
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    features: ["Helmet Included", "USB Charger", "Under-seat Storage"],
    images: ["/images/vehicles/scooty-1.jpg", "/images/vehicles/scooty-2.jpg"],
    supplier: {
      id: "s2",
      name: "Priya Sharma",
      phone: "+919876543211",
      whatsapp: "919876543211",
      avatar: "/images/avatars/supplier-2.jpg",
      rating: 4.8,
      totalVehicles: 8,
      verified: true,
    },
    available: true,
    description:
      "Smooth and fuel-efficient Honda Activa 6G. Ideal for daily commutes and running errands. Well maintained with regular servicing.",
  },
  {
    id: "v3",
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
    totalReviews: 156,
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    features: ["AC", "Bluetooth", "Power Steering", "ABS", "Airbags", "Spare Tyre"],
    images: ["/images/vehicles/car-1.jpg", "/images/vehicles/car-2.jpg"],
    supplier: {
      id: "s3",
      name: "Amit Patel",
      phone: "+919876543212",
      whatsapp: "919876543212",
      avatar: "/images/avatars/supplier-3.jpg",
      rating: 4.6,
      totalVehicles: 12,
      verified: true,
    },
    available: true,
    description:
      "Sporty Maruti Swift ZXi with excellent mileage and smooth handling. Perfect for city drives and short road trips. Fully insured.",
  },
  {
    id: "v4",
    name: "Hyundai Creta SX",
    brand: "Hyundai",
    model: "Creta SX",
    category: "car",
    fuelType: "Diesel",
    transmission: "Automatic",
    seating: 5,
    pricePerDay: 2500,
    pricePerHour: 350,
    securityDeposit: 8000,
    rating: 4.8,
    totalTrips: 189,
    totalReviews: 98,
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    features: [
      "AC",
      "Sunroof",
      "Touchscreen",
      "Bluetooth",
      "Reverse Camera",
      "Cruise Control",
      "ABS",
      "6 Airbags",
    ],
    images: ["/images/vehicles/car-3.jpg", "/images/vehicles/car-4.jpg"],
    supplier: {
      id: "s4",
      name: "Vikram Singh",
      phone: "+919876543213",
      whatsapp: "919876543213",
      avatar: "/images/avatars/supplier-4.jpg",
      rating: 4.9,
      totalVehicles: 3,
      verified: true,
    },
    available: true,
    description:
      "Premium Hyundai Creta SX(O) with panoramic sunroof and automatic transmission. Top-notch comfort for long drives. Impeccably maintained.",
  },
  {
    id: "v5",
    name: "Bajaj RE Auto",
    brand: "Bajaj",
    model: "RE Compact",
    category: "auto",
    fuelType: "CNG",
    transmission: "Manual",
    seating: 4,
    pricePerDay: 600,
    pricePerHour: 80,
    securityDeposit: 1500,
    rating: 4.2,
    totalTrips: 320,
    totalReviews: 112,
    location: "Jayanagar, Bangalore",
    city: "Bangalore",
    features: ["CNG Kit", "Rain Cover", "First Aid Kit"],
    images: ["/images/vehicles/auto-1.jpg", "/images/vehicles/auto-2.jpg"],
    supplier: {
      id: "s5",
      name: "Mohammed Rafi",
      phone: "+919876543214",
      whatsapp: "919876543214",
      avatar: "/images/avatars/supplier-5.jpg",
      rating: 4.5,
      totalVehicles: 6,
      verified: true,
    },
    available: true,
    description:
      "Reliable Bajaj RE Auto in great condition. Runs on CNG for cost-effective rides. Perfect for short trips within the city.",
  },
  {
    id: "v6",
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
    totalReviews: 67,
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    features: ["Helmet Included", "Phone Mount", "Tank Bag"],
    images: ["/images/vehicles/bike-3.jpg", "/images/vehicles/bike-4.jpg"],
    supplier: {
      id: "s1",
      name: "Rajesh Kumar",
      phone: "+919876543210",
      whatsapp: "919876543210",
      avatar: "/images/avatars/supplier-1.jpg",
      rating: 4.7,
      totalVehicles: 5,
      verified: true,
    },
    available: true,
    description:
      "Thrilling KTM Duke 200 for an adrenaline-pumping ride. Well maintained with fresh tyres and recent service. Grab your helmet and go!",
  },
];

// ─── Categories ─────────────────────────────────────────
export const categories = [
  {
    id: "bike",
    name: "Bikes",
    tagline: "Freedom on two wheels",
    image: "/images/categories/bike.png",
  },
  {
    id: "scooty",
    name: "Scooty",
    tagline: "Easy city rides",
    image: "/images/categories/scooty.png",
  },
  {
    id: "car",
    name: "Cars",
    tagline: "Comfort for every trip",
    image: "/images/categories/car.png",
  },
  {
    id: "auto",
    name: "Auto",
    tagline: "Everyday convenience",
    image: "/images/categories/auto.png",
  },
];

// ─── Cities ─────────────────────────────────────────────
export const cities = [
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Goa",
  "Kochi",
];

// ─── How It Works ───────────────────────────────────────
export const howItWorks = [
  {
    step: 1,
    title: "Search",
    description: "Enter your location, pickup & return date to find vehicles near you",
    icon: "Search",
  },
  {
    step: 2,
    title: "Book",
    description: "Pick a vehicle, review details, and confirm your booking online or via WhatsApp",
    icon: "BookOpen",
  },
  {
    step: 3,
    title: "Pickup",
    description: "Head to the pickup point and collect your vehicle with valid documents",
    icon: "MapPin",
  },
  {
    step: 4,
    title: "Drive & Return",
    description: "Enjoy your ride and return the vehicle at the scheduled time & location",
    icon: "Car",
  },
];
