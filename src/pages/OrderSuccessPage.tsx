import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, Clock, Banknote, CreditCard } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { ButtonLink } from '@/components/ui/Button';
import { BUSINESS } from '@/config/site';

export function OrderSuccessPage() {
  useSEO({ title: 'Order Success', description: 'Your order has been placed successfully.', path: '/order-success' });
  const [params] = useSearchParams();
  const orderId = params.get('orderId') ?? '';
  const payment = params.get('payment') ?? 'cod';
  const isPaid = payment === 'paid';

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-cream-300 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-veg-500/10 animate-scaleIn">
          <CheckCircle className="h-12 w-12 text-veg-500" />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-maroon-700">Order Placed!</h1>
        <p className="mt-3 text-brown-600">
          Thank you for your order. We've received your details and will start preparing your food shortly.
        </p>

        <div className="mt-8 rounded-2xl bg-cream-100 p-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-brown-500">Order ID</span>
            <span className="font-mono text-sm font-bold text-maroon-700">{orderId}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
            <span className="flex items-center gap-2 text-sm text-brown-500">
              {isPaid ? <CreditCard className="h-4 w-4 text-veg-600" /> : <Banknote className="h-4 w-4 text-gold-600" />}
              Payment
            </span>
            <span className={`text-sm font-semibold ${isPaid ? 'text-veg-600' : 'text-gold-600'}`}>
              {isPaid ? 'Paid online' : 'Cash on Delivery (unpaid)'}
            </span>
          </div>
          {!isPaid && (
            <p className="mt-3 text-xs text-brown-400">
              Your order is marked unpaid. Please keep the exact amount ready for delivery.
            </p>
          )}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl bg-gold-50 p-4 text-left">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <p className="text-sm text-brown-600">
            Save your Order ID to track your order. You can check its status anytime from the Track Order page.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink to={`/track-order?orderId=${orderId}`} leftIcon={<Package className="h-4 w-4" />}>
            Track Order
          </ButtonLink>
          <ButtonLink to="/" variant="outline" leftIcon={<Home className="h-4 w-4" />}>
            Back to Home
          </ButtonLink>
        </div>

        <p className="mt-6 text-xs text-brown-400">
          Need help? Call us at{' '}
          <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="font-medium text-maroon-600">
            {BUSINESS.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
