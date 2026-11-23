import { useSEO } from '@/hooks/useSEO';
import { Leaf, Candy, Truck, ShieldCheck, UtensilsCrossed, Heart, Award, Users } from 'lucide-react';
import { BUSINESS } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';

const VALUES = [
  { icon: Leaf, title: 'Pure Vegetarian', description: 'A fully vegetarian kitchen serving authentic Indian recipes.' },
  { icon: Candy, title: 'Traditional Sweets', description: 'Hand-crafted mithai made in-house with pure ghee.' },
  { icon: ShieldCheck, title: 'Quality & Hygiene', description: 'Clean preparation, quality ingredients and careful packaging.' },
  { icon: Heart, title: 'Made with Care', description: 'Every dish is prepared fresh, the way it would be at home.' },
];

const STATS = [
  { icon: UtensilsCrossed, value: '15+', label: 'Menu Categories' },
  { icon: Award, value: '100%', label: 'Pure Veg Kitchen' },
  { icon: Users, value: 'Many', label: 'Happy Customers' },
  { icon: Truck, value: 'Fast', label: 'Delivery & Takeaway' },
];

export function AboutPage() {
  useSEO({ title: 'About Us', description: 'Learn about Shree Annapurna Restaurant & Sweet — our story, values and what makes us special.', path: '/about' });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-500 text-gold-300">
          <UtensilsCrossed className="h-7 w-7" />
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-maroon-700">About Shree Annapurna</h1>
        <p className="mx-auto mt-3 max-w-2xl text-brown-600">{BUSINESS.tagline}</p>
      </div>

      {/* Story */}
      <section className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="rounded-3xl bg-gradient-to-br from-cream-200 to-gold-100 p-8">
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-white/40">
            <UtensilsCrossed className="h-20 w-20 text-maroon-400" />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-maroon-700">Our Story</h2>
          <p className="mt-4 text-brown-600 leading-relaxed">
            Shree Annapurna Restaurant & Sweet brings the authentic flavours of Indian
            home cooking to your table. Named after Annapurna — the goddess of food and
            nourishment — our kitchen is dedicated to serving wholesome, delicious meals
            and traditional sweets made with care.
          </p>
          <p className="mt-4 text-brown-600 leading-relaxed">
            From rich North Indian curries and fresh tandoor breads to delicate Bengali
            sweets and classic mithai, every dish is prepared fresh using time-honoured
            recipes and quality ingredients. Our pure ghee sweets are made in-house daily.
          </p>
          <p className="mt-4 text-brown-600 leading-relaxed">
            Whether you're ordering a quick lunch, a family dinner, or sweets for a
            celebration, we're here to serve you with warmth and generosity.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-cream-300 bg-white p-6 text-center shadow-card">
            <stat.icon className="mx-auto h-7 w-7 text-gold-500" />
            <p className="mt-3 font-serif text-2xl font-bold text-maroon-700">{stat.value}</p>
            <p className="text-xs text-brown-500">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="mt-16">
        <h2 className="text-center font-serif text-2xl font-bold text-maroon-700">What We Stand For</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-cardHover">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">
                <value.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-maroon-700">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-3xl bg-maroon-800 p-8 text-center text-cream-100 sm:p-12">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Hungry yet?</h2>
        <p className="mx-auto mt-3 max-w-lg text-cream-100/70">
          Explore our menu and order your favourite dishes and sweets for home delivery or takeaway.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink to="/menu" variant="gold" size="lg">Browse Menu</ButtonLink>
          <ButtonLink to="/contact" variant="outline" size="lg" className="border-cream-100/30 text-cream-100 hover:bg-maroon-700">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
