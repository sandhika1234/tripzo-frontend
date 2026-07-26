# Tripzo — Customer Flow (Self-Drive Vehicle Rental)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🖼️ IMPORTANT: Add Your Images

Place the following images in the `public/images/` folder for the app to display properly:

### Hero Section (Homepage right side)
```
public/images/hero-vehicles.png
```
- **What:** A composite image showing bike + scooty + car + auto (similar to Rapido's hero)
- **Size:** 800×600px or higher
- **Format:** PNG with transparent or light background

### Category Cards (Homepage "Browse by Category")
```
public/images/categories/bike.png
public/images/categories/scooty.png
public/images/categories/car.png
public/images/categories/auto.png
```
- **What:** Individual vehicle type illustrations/photos
- **Size:** 200×200px each
- **Format:** PNG with transparent background

### Supplier CTA Section
```
public/images/earn-with-tripzo.png
```
- **What:** Image of vehicle owners (similar to Rapido's "Earn with Rapido")
- **Size:** 800×600px
- **Format:** PNG or JPG

### Vehicle Listing Images (for demo)
```
public/images/vehicles/bike-1.jpg
public/images/vehicles/bike-2.jpg
public/images/vehicles/bike-3.jpg
public/images/vehicles/bike-4.jpg
public/images/vehicles/scooty-1.jpg
public/images/vehicles/scooty-2.jpg
public/images/vehicles/car-1.jpg
public/images/vehicles/car-2.jpg
public/images/vehicles/car-3.jpg
public/images/vehicles/car-4.jpg
public/images/vehicles/auto-1.jpg
public/images/vehicles/auto-2.jpg
```
- **What:** Actual vehicle photos
- **Size:** 800×500px recommended
- **Format:** JPG

> Note: The app has fallback placeholder UI for missing images, so it will still run without them.

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/search` | Search Results (with filters) |
| `/search?category=bike` | Filtered by category |
| `/vehicles/[id]` | Vehicle Details |
| `/booking/[id]` | Booking Flow |
| `/bookings` | My Bookings |
| `/profile` | Profile Dashboard |
| `/wishlist` | Saved Vehicles |

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **Lucide Icons**

---

## Color Theme

- Primary: Teal `#0D9488` (teal-600)
- Dark: `#1a1a2e`
- Background: White `#ffffff`
- Light BG: `#F0FDFA` (teal-50)

---

## Features

- ✅ Fully responsive (mobile-first)
- ✅ SEO metadata on all pages
- ✅ WhatsApp integration (vehicle details)
- ✅ Call owner button
- ✅ Vehicle search with filters
- ✅ Booking flow with payment
- ✅ Bottom navigation (mobile)
- ✅ Wishlist
- ✅ Profile dashboard
- ✅ Sticky navbar
- ✅ Image fallback placeholders
