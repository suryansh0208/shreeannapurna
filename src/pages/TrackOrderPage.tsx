import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, AlertCircle, Loader2, Info } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { OrderTimeline } from '@/components/checkout/OrderTimeline';
import { Button, ButtonLink } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { api } from '@/services/api';
import { isValidOrderQuery, formatINR, classNames } from '@/utils/format';
import { BUSINESS } from '@/config/site';
import type { OrderStatus } from '@/types';

export function TrackOrderPage() {
  useSEO({ title: 'Track Order', description: 'Track the status of your order.', path: '/track-order' });
  const [params] = useSearchParams();
  const [orderId, setOrderId] = useState(params.get('orderId') ?? '');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ status: OrderStatus; items: { name: string; quantity: number }[]; total: number; placedAt: string } | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const preId = params.get('orderId');
    if (preId && phone.replace(/\D/g, '').length === 10) {
      handleTrack();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTrack = async () => {
    setError(null);
    setNotFound(false);
    setResult(null);

    if (!isValidOrderQuery(orderId, phone)) {
      setError('Please enter a valid Order ID and 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.trackOrder(orderId.trim(), phone.replace(/\D/g, ''));
      if (!data) {
        setNotFound(true);
      } else {
        setResult(data);
      }
    } catch (err) {
      // Backend not available — show a clear state, never fake data
      setError(
        err instanceof Error && err.message.includes('backend')
          ? 'Order tracking requires the backend service. Until it is connected, live order status is unavailable. Please call or WhatsApp us for updates.'
          : 'Could not fetch your order. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-50 text-maroon-600">
          <Package className="h-7 w-7" />
        </span>
        <h1 className="mt-4 font-serif text-3xl font-bold text-maroon-700">Track Your Order</h1>
        <p className="mt-2 text-brown-600">Enter your Order ID and mobile number to see the latest status.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brown-600">Order ID</span>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. SA8KX3PQ"
              className="w-full rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brown-600">Mobile Number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile"
              inputMode="numeric"
              className="w-full rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-nonveg-500/5 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-nonveg-500" />
            <p className="text-sm text-maroon-700">{error}</p>
          </div>
        )}

        <Button onClick={handleTrack} loading={loading} className="mt-4 w-full" size="lg" leftIcon={!loading ? <Search className="h-4 w-4" /> : undefined}>
          {loading ? 'Looking up…' : 'Track Order'}
        </Button>

        {error && error.includes('backend') && (
          <div className="mt-4 flex flex-col gap-2 rounded-xl bg-cream-100 p-4 text-center">
            <p className="text-sm text-brown-600">Call or WhatsApp us for your order status:</p>
            <div className="flex justify-center gap-3">
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="rounded-lg bg-maroon-500 px-4 py-2 text-sm font-semibold text-cream-100">Call {BUSINESS.phone}</a>
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {notFound && (
        <div className="mt-6">
          <EmptyState
            icon={<AlertCircle className="h-7 w-7" />}
            title="Order not found"
            description="We could not find an order with these details. Please check your Order ID and mobile number and try again."
          />
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between border-b border-cream-200 pb-4">
            <div>
              <p className="text-xs text-brown-400">Order ID</p>
              <p className="font-mono text-lg font-bold text-maroon-700">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-brown-400">Placed on</p>
              <p className="text-sm font-medium text-brown-600">{result.placedAt}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Items</p>
            {result.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-brown-600">{item.name} ×{item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-cream-200 pt-2 text-sm font-semibold">
              <span className="text-brown-600">Total</span>
              <span className="text-maroon-700">{formatINR(result.total)}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-cream-200 pt-6">
            <h2 className="mb-4 font-serif text-lg font-semibold text-maroon-700">Order Status</h2>
            <OrderTimeline status={result.status} />
          </div>
        </div>
      )}

      {!result && !notFound && !error && !loading && (
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-gold-50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
          <p className="text-sm text-brown-600">
            Your Order ID was shown on the order confirmation page and is also in your order confirmation. Enter it above along with the mobile number you used at checkout.
          </p>
        </div>
      )}
    </div>
  );
}
