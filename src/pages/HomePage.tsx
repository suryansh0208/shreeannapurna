import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Phone, Clock, Leaf, Candy, Truck, ShieldCheck, MessageCircle,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { CategoryCard } from '@/components/product/CategoryCard';
import { ProductCard } from '@/components/product/ProductCard';
import { OfferCard } from '@/components/home/OfferCard';
import { TestimonialCard } from '@/components/home/TestimonialCard';
import { GridSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/States';
import { useSEO } from '@/hooks/useSEO';
import { api } from '@/services/api';
import { CATEGORIES } from '@/data/mockData';
import type { Category, Product } from '@/types';
import { BUSINESS, OFFERS, TESTIMONIALS, WHY_CHOOSE_US } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';

const ICON_MAP: Record<string, typeof Leaf> = {
  Leaf, Candy, Truck, ShieldCheck,
};

export function HomePage() {
  useSEO({ title: 'Home', description: 'Order authentic Indian food, traditional sweets, snacks and combos from Shree Annapurna Restaurant & Sweet. Home delivery and takeaway.', path: '/' });

  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setError(true));
  }, []);

  const bestsellers = products?.filter((p) => p.bestseller).slice(0, 4);
  const specials = products?.filter((p) => p.todaySpecial).slice(0, 4);
  const sweets = products?.filter((p) => ['sweets', 'bengali-sweets', 'dry-sweets'].includes(p.categorySlug)).slice(0, 4);
  const restaurantDishes = products?.filter((p) => ['paneer', 'dal', 'rice', 'north-indian', 'thali'].includes(p.categorySlug)).slice(0, 4);
  const combos = products?.filter((p) => ['meals', 'thali'].includes(p.categorySlug)).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Category grid */}
      <Section className="py-16">
        <SectionHeader
          eyebrow="Browse by craving"
          title="Explore Our Menu"
          description="From hearty North Indian meals to delicate traditional sweets — find exactly what you're in the mood for."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((cat) => (
            <CategoryCard key={cat.slug} category={cat as Category} />
          ))}
        </div>
      </Section>

      {/* Bestsellers */}
      <Section className="bg-cream-50 py-16">
        <SectionHeader eyebrow="Most loved" title="Bestsellers" description="The dishes and sweets our customers order again and again." />
        <ProductSection products={bestsellers} error={error} loading={!products} />
      </Section>

      {/* Today's specials */}
      <Section className="py-16">
        <SectionHeader eyebrow="Fresh today" title="Today's Specials" description="Limited-time dishes prepared fresh by our kitchen today." />
        <ProductSection products={specials} error={error} loading={!products} />
      </Section>

      {/* Sweets showcase */}
      <Section className="bg-maroon-800 py-16 text-cream-100">
        <SectionHeader eyebrow="Made in pure ghee" title="Traditional Sweets" description="Hand-crafted mithai and Bengali sweets, made fresh in our sweet shop." light />
        <ProductSection products={sweets} error={error} loading={!products} light />
        <div className="mt-8 text-center">
          <Link to="/sweets" className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-800 transition hover:bg-gold-300">
            View All Sweets <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Restaurant dishes */}
      <Section className="py-16">
        <SectionHeader eyebrow="From our kitchen" title="Restaurant Dishes" description="Rich curries, biryani, paneer specials and more." />
        <ProductSection products={restaurantDishes} error={error} loading={!products} />
        <div className="mt-8 text-center">
          <Link to="/restaurant" className="inline-flex items-center gap-2 rounded-xl border-2 border-maroon-500 px-6 py-3 text-sm font-semibold text-maroon-700 transition hover:bg-maroon-50">
            View Restaurant Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* Family combos */}
      <Section className="bg-cream-50 py-16">
        <SectionHeader eyebrow="Great value" title="Family Combos" description="Complete meals that serve the whole family, at a great price." />
        <ProductSection products={combos} error={error} loading={!products} />
      </Section>

      {/* Why choose us */}
      <Section className="py-16">
        <SectionHeader eyebrow="Why Shree Annapurna" title="A Kitchen You Can Trust" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Leaf;
            return (
              <div key={item.title} className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-cardHover">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-maroon-700">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Offers */}
      <Section className="bg-cream-50 py-16">
        <SectionHeader eyebrow="Save more" title="Current Offers" description="Apply these codes at checkout to save on your order." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-16">
        <SectionHeader eyebrow="Word from our guests" title="Customer Stories" description="Genuine, verified testimonials will appear here once collected from real customers." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Section>

      {/* Location & contact */}
      <Section className="bg-maroon-800 py-16 text-cream-100">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-maroon-700 px-3.5 py-1.5 text-xs font-semibold text-gold-300">
              <MapPin className="h-3.5 w-3.5" /> Find Us
            </span>
            <h2 className="mt-5 font-serif text-3xl font-bold">Visit Our Restaurant & Sweet Shop</h2>
            <p className="mt-4 max-w-md text-cream-100/70">
              {BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}, {BUSINESS.state} — {BUSINESS.pincode}
            </p>
            <div className="mt-6 space-y-4">
              <ContactRow icon={<Phone className="h-5 w-5" />} label="Call us" value={BUSINESS.phone} href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} />
              <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value={BUSINESS.phone} href={`https://wa.me/${BUSINESS.whatsapp}`} />
              <ContactRow icon={<Clock className="h-5 w-5" />} label="Opening Hours" value={BUSINESS.openingHoursNote} />
            </div>
            <div className="mt-8">
              <ButtonLink to="/contact" variant="gold" size="lg">Contact Us</ButtonLink>
            </div>
          </div>
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-maroon-700 bg-maroon-700/40 p-8 text-center">
            <div>
              <MapPin className="mx-auto h-10 w-10 text-gold-300" />
              <p className="mt-4 text-sm text-cream-100/60">Map will appear here once the Google Maps embed URL is configured.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

// ---- helpers ----------------------------------------------------------------
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={className}><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div></section>;
}

function SectionHeader({ eyebrow, title, description, light }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className={`text-xs font-bold uppercase tracking-widest ${light ? 'text-gold-300' : 'text-gold-600'}`}>{eyebrow}</p>}
      <h2 className={`mt-2 font-serif text-3xl font-bold ${light ? 'text-cream-100' : 'text-maroon-700'}`}>{title}</h2>
      {description && <p className={`mt-3 text-base ${light ? 'text-cream-100/70' : 'text-brown-600'}`}>{description}</p>}
    </div>
  );
}

function ProductSection({ products, error, loading, light }: { products?: Product[]; error: boolean; loading: boolean; light?: boolean }) {
  if (loading) return <GridSkeleton count={4} />;
  if (error || !products) return <ErrorState className={light ? 'bg-maroon-700/30 border-maroon-700' : ''} />;
  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-700 text-gold-300">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider text-cream-100/50">{label}</p>
        <p className="text-sm font-medium text-cream-100">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-block">{content}</a> : <div>{content}</div>;
}
