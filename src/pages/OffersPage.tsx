import { useSEO } from '@/hooks/useSEO';
import { OFFERS } from '@/config/site';
import { OfferCard } from '@/components/home/OfferCard';
import { ButtonLink } from '@/components/ui/Button';

export function OffersPage() {
  useSEO({ title: 'Offers', description: 'Current offers and coupon codes for Shree Annapurna Restaurant & Sweet.', path: '/offers' });
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gold-600">Save More</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-maroon-700">Offers & Coupons</h1>
        <p className="mx-auto mt-3 max-w-2xl text-brown-600">
          Apply these codes at checkout to save on your favourite dishes and sweets.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-cream-300 bg-white p-6 text-center shadow-card">
        <h2 className="font-serif text-xl font-semibold text-maroon-700">How to use a coupon</h2>
        <ol className="mx-auto mt-4 max-w-md space-y-2 text-left text-sm text-brown-600">
          <li><span className="font-semibold text-maroon-600">1.</span> Add your favourite dishes to the cart.</li>
          <li><span className="font-semibold text-maroon-600">2.</span> Go to the cart or checkout page.</li>
          <li><span className="font-semibold text-maroon-600">3.</span> Enter the coupon code in the coupon field and tap Apply.</li>
          <li><span className="font-semibold text-maroon-600">4.</span> Your discount will be applied to the order total.</li>
        </ol>
        <div className="mt-6">
          <ButtonLink to="/menu" size="lg">Order Now</ButtonLink>
        </div>
      </div>
    </div>
  );
}
