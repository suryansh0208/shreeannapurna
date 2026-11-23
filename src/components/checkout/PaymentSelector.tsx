import { Wallet, Banknote, Info } from 'lucide-react';
import type { PaymentMethod } from '@/types';
import { classNames } from '@/utils/format';
import { RAZORPAY_KEY_ID } from '@/services/api';

interface PaymentSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export function PaymentSelector({ value, onChange }: PaymentSelectorProps) {
  const razorpayReady = Boolean(RAZORPAY_KEY_ID);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-maroon-700">Payment Method</label>

      <button
        type="button"
        onClick={() => onChange('razorpay')}
        disabled={!razorpayReady}
        className={classNames(
          'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
          value === 'razorpay'
            ? 'border-maroon-500 bg-maroon-50'
            : 'border-cream-300 bg-white hover:border-gold-300',
          !razorpayReady && 'opacity-60',
        )}
      >
        <span className={classNames('flex h-10 w-10 items-center justify-center rounded-lg', value === 'razorpay' ? 'bg-maroon-500 text-cream-100' : 'bg-cream-200 text-maroon-600')}>
          <Wallet className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-maroon-700">Razorpay (Online)</p>
          <p className="text-xs text-brown-500">Pay securely with UPI, cards, net banking & wallets.</p>
        </div>
        <span className={classNames('h-5 w-5 rounded-full border-2', value === 'razorpay' ? 'border-maroon-500 bg-maroon-500' : 'border-cream-300')} />
      </button>

      {!razorpayReady && value === 'razorpay' && (
        <div className="flex items-start gap-2 rounded-lg bg-gold-50 px-3 py-2 text-xs text-brown-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          <span>Online payment requires a configured Razorpay public key and backend order-creation service. Until then, payment cannot be processed.</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => onChange('cod')}
        className={classNames(
          'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
          value === 'cod'
            ? 'border-maroon-500 bg-maroon-50'
            : 'border-cream-300 bg-white hover:border-gold-300',
        )}
      >
        <span className={classNames('flex h-10 w-10 items-center justify-center rounded-lg', value === 'cod' ? 'bg-maroon-500 text-cream-100' : 'bg-cream-200 text-maroon-600')}>
          <Banknote className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-maroon-700">Cash on Delivery</p>
          <p className="text-xs text-brown-500">Pay in cash when your order arrives. Marked unpaid until collected.</p>
        </div>
        <span className={classNames('h-5 w-5 rounded-full border-2', value === 'cod' ? 'border-maroon-500 bg-maroon-500' : 'border-cream-300')} />
      </button>
    </div>
  );
}
