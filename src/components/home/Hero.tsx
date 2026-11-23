import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Clock } from 'lucide-react';
import { FoodImage } from '@/components/ui/FoodImage';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-100">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-maroon-200/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div className="animate-fadeIn">
          <span className="inline-flex items-center gap-2 rounded-full bg-maroon-50 px-3.5 py-1.5 text-xs font-semibold text-maroon-600">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            Authentic Indian Kitchen & Sweet Shop
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] text-maroon-700 sm:text-5xl lg:text-6xl">
            Taste of tradition,<br />
            <span className="text-gold-500">delivered with love</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-brown-600 sm:text-lg">
            From rich North Indian curries and hot tandoor breads to hand-crafted
            traditional sweets — order online for home delivery or takeaway.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 rounded-xl bg-maroon-500 px-7 py-3.5 text-base font-semibold text-cream-100 shadow-sm transition-all hover:bg-maroon-600 hover:shadow-md"
            >
              Order Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/sweets"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-maroon-500 px-7 py-3.5 text-base font-semibold text-maroon-700 transition-all hover:bg-maroon-50"
            >
              Explore Sweets
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-brown-600">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gold-500" /> Home Delivery
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gold-500" /> Quick Takeaway
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-veg-500">
                <span className="h-2 w-2 rounded-full bg-veg-500" />
              </span>
              Pure Veg Kitchen
            </div>
          </div>
        </div>

        {/* Visual collage */}
        <div className="relative animate-scaleIn">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <FoodImage hue={18} accent="#D9542B" pattern="curry" name="Paneer Butter Masala" className="aspect-square w-full" rounded="rounded-3xl" />
              <FoodImage hue={22} accent="#8B4A1F" pattern="sweet" name="Gulab Jamun" className="aspect-[4/3] w-full" rounded="rounded-3xl" />
            </div>
            <div className="space-y-4 pt-8">
              <FoodImage hue={40} accent="#D98A2B" pattern="bowl" name="Veg Biryani" className="aspect-[4/3] w-full" rounded="rounded-3xl" />
              <FoodImage hue={30} accent="#C2862E" pattern="fried" name="Aloo Samosa" className="aspect-square w-full" rounded="rounded-3xl" />
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-5 py-3 shadow-card">
            <p className="text-center text-xs text-brown-500">
              <span className="block font-serif text-lg font-bold text-maroon-700">15+ Categories</span>
              Food, Sweets, Snacks & Beverages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
