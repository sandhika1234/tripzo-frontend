import Image from "next/image";
import Link from "next/link";
import { Search, BookOpen, MapPin, Car, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import { categories, howItWorks } from "@/lib/data";

const howItWorksIcons = [Search, BookOpen, MapPin, Car];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="main-content">
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative bg-gradient-to-br from-teal-50 via-white to-teal-50 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-teal-100 opacity-40 blur-xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-teal-100 opacity-30 blur-xl" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
              {/* Left Content */}
              <div className="flex-1 w-full lg:max-w-[600px]">
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight text-dark mb-4">
                  India&apos;s #1{" "}
                  <span className="text-teal-600 block">
                    Self-Drive Car Rental
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                  Drive your way. Rent a car, bike, or scooty — no driver
                  needed. Freedom starts here.
                </p>

                <SearchBar />
              </div>

              {/* Right - Hero Image */}
              <div className="flex-1 w-full lg:max-w-[520px]">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100">
                  {/* 
                    ✅ REPLACE THIS: Place your hero vehicle image at:
                    public/images/hero-vehicles.png
                    
                    Recommended: A composite image showing bike + scooty + car + auto 
                    similar to Rapido's hero image style.
                    Dimensions: 800x600px or higher, transparent or light background.
                  */}
                  <Image
                    src="/images/hero-vehicles.png"
                    alt="Self-drive vehicles - bikes, scooties, cars and autos available on Tripzo"
                    fill
                    className="object-contain object-center"
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ BROWSE BY CATEGORY ═══ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-2">
              Browse by Category
            </h2>
            <div className="w-12 h-1 bg-teal-500 rounded-full mb-10" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.id}`}
                  className="group bg-teal-50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-[1.5px] border-transparent hover:border-teal-300 hover:shadow-[0_8px_24px_rgba(13,148,136,0.08)] hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-dark mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500">{cat.tagline}</p>
                    <div className="flex items-center gap-1 mt-3 text-teal-600 text-sm font-semibold">
                      Explore
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Category Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0">
                    {/* 
                      ✅ REPLACE: Place category images at:
                      public/images/categories/bike.png
                      public/images/categories/scooty.png
                      public/images/categories/car.png
                      public/images/categories/auto.png
                      
                      Dimensions: 200x200px, transparent background PNG
                    */}
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark mb-2">
              How It Works
            </h2>
            <div className="w-12 h-1 bg-teal-500 rounded-full mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {howItWorks.map((item, i) => {
                const Icon = howItWorksIcons[i];
                return (
                  <div
                    key={item.step}
                    className="relative bg-white rounded-2xl p-7 text-center border border-gray-100 hover:shadow-[0_8px_32px_rgba(13,148,136,0.08)] hover:-translate-y-1 transition-all"
                  >
                    {/* Step number watermark */}
                    <span className="absolute top-4 right-5 text-4xl font-extrabold text-teal-100 select-none">
                      {item.step}
                    </span>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(13,148,136,0.3)]">
                      <Icon size={28} className="text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ EARN WITH TRIPZO (Supplier CTA) ═══ */}
        <section className="relative bg-gradient-to-br from-teal-800 to-teal-900 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-teal-700 opacity-30" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Left Image */}
              <div className="flex-1 w-full lg:max-w-[480px]">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-700 to-teal-600 border border-teal-600">
                  {/* 
                    ✅ REPLACE: Place supplier promo image at:
                    public/images/earn-with-tripzo.png
                    
                    Recommended: Image of vehicle owners with their vehicles,
                    similar to Rapido's "Earn with Rapido" section.
                    Dimensions: 800x600px
                  */}
                  <Image
                    src="/images/earn-with-tripzo.png"
                    alt="Earn with Tripzo - List your vehicles"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white leading-tight mb-2">
                  Earn with{" "}
                  <span className="text-teal-300 block">Tripzo</span>
                </h2>
                <div className="w-12 h-1 bg-teal-400 rounded-full mb-6" />
                <p className="text-base sm:text-lg text-teal-200 leading-relaxed mb-8 max-w-md">
                  List your vehicle on Tripzo. Rent when you want, earn on your
                  own terms. Join thousands of vehicle owners already earning.
                </p>
                <Link
                  href="/supplier/register"
                  className="inline-flex items-center gap-2.5 bg-teal-400 hover:bg-teal-300 text-teal-900 rounded-xl px-8 py-4 text-base font-bold shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  Start Earning
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
