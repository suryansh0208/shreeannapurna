import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { ButtonLink, Button } from '@/components/ui/Button';

type Status = 'pending' | 'success' | 'failed' | 'cancelled';

const STATUS_CONFIG: Record<Status, { icon: typeof CheckCircle; title: string; description: string; color: string }> = {
  pending: {
    icon: Clock,
    title: 'Payment Pending',
    description: 'Your payment is being processed. Please wait while we confirm.',
    color: 'text-gold-600',
  },
  success: {
    icon: CheckCircle,
    title: 'Payment Successful',
    description: 'Your payment has been verified and your order is confirmed.',
    color: 'text-veg-600',
  },
  failed: {
    icon: XCircle,
    title: 'Payment Failed',
    description: 'Your payment could not be completed. No money has been deducted.',
    color: 'text-nonveg-500',
  },
  cancelled: {
    icon: AlertCircle,
    title: 'Payment Cancelled',
    description: 'You cancelled the payment. You can try again or choose Cash on Delivery.',
    color: 'text-gold-600',
  },
};

export function PaymentStatusPage() {
  useSEO({ title: 'Payment Status', description: 'Check the status of your payment.', path: '/payment-status' });
  const [params] = useSearchParams();
  const orderId = params.get('orderId') ?? '';
  const status = (params.get('status') ?? 'pending') as Status;
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-cream-300 bg-white p-8 text-center shadow-card sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-100 animate-scaleIn">
          <Icon className={`h-12 w-12 ${config.color}`} />
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-maroon-700">{config.title}</h1>
        <p className="mt-3 text-brown-600">{config.description}</p>

        {orderId && (
          <div className="mt-6 rounded-xl bg-cream-100 px-4 py-3">
            <span className="text-sm text-brown-500">Order ID: </span>
            <span className="font-mono text-sm font-bold text-maroon-700">{orderId}</span>
          </div>
        )}

        {status === 'pending' && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brown-500">
            <RefreshCw className="h-4 w-4 animate-spin" /> Confirming with your bank…
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {status === 'failed' || status === 'cancelled' ? (
            <>
              <ButtonLink to="/checkout" leftIcon={<RefreshCw className="h-4 w-4" />}>Try Again</ButtonLink>
              <ButtonLink to="/cart" variant="outline">Back to Cart</ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink to={`/track-order?orderId=${orderId}`}>Track Order</ButtonLink>
              <ButtonLink to="/" variant="outline">Back to Home</ButtonLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
