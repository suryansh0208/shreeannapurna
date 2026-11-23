import { Tag, X, Truck, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useCoupon } from '@/hooks/useCoupon';
import { BUSINESS } from '@/config/site';
import { formatINR, classNames } from '@/utils/format';
import { ButtonLink } from '@/components/ui/Button';

interface CartSummaryProps {
  fulfilment?: 'delivery' | 'takeaway';
  pincode?: string;
  showActions?: boolean;
}

export function CartSummary({ fulfilment = 'delivery', pincode, showActions = true }: CartSummaryProps) {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const { appliedCoupon, couponError, applyCoupon, removeCoupon } = useCoupon();
  const [code, setCode] = useState('');

  const discount = appliedCoupon
    ? appliedCoupon.discountType === 'percent'
      ? Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount ?? Infinity)
      : appliedCoupon.value
    : 0;

  const isDelivery = fulfilment === 'delivery';
  const deliveryFee =
    !isDelivery || subtotal === 0
      ? 0
      : subtotal >= BUSINESS.freeDeliveryThreshold
        ? 0
        : pincode
          ? null // unknown zone — shown as estimate pending
          : BUSINESS.deliveryFeeFlat;

  const tax = Math.round((subtotal * BUSINESS.gstRate) / 100);
  const total = Math.max(0, subtotal - discount + tax + (deliveryFee ?? 0));

  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
      <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-maroon-700">
        <ShoppingBag className="h-5 w-5" /> Order Summary
      </h2>

      <div className="mt-4 space-y-2 text-sm">
        <Row label={`Subtotal (${items.reduce((s, i) => s + i.quantity, 0)} items)`} value={formatINR(subtotal)} />
        {discount > 0 && (
          <Row label={`Discount (${appliedCoupon?.code})`} value={`− ${formatINR(discount)}`} accent="text-veg-600" />
        )}
        {BUSINESS.gstRate > 0 && <Row label={`Taxes (${BUSINESS.gstRate}%)`} value={formatINR(tax)} />}
        {isDelivery ? (
          deliveryFee === null ? (
            <Row label="Delivery fee" value="Check at checkout" muted />
          ) : deliveryFee === 0 ? (
            <Row label="Delivery fee" value="FREE" accent="text-veg-600" />
          ) : (
            <Row label="Delivery fee (estimate)" value={formatINR(deliveryFee)} muted />
          )
        ) : (
          <Row label="Pickup" value="No delivery fee" muted />
        )}
      </div>

      {/* Coupon */}
      <div className="mt-4 border-t border-cream-200 pt-4">
        {appliedCoupon ? (
          <div className="flex items-center justify-between rounded-xl bg-veg-500/10 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-veg-600">
              <Tag className="h-4 w-4" /> {appliedCoupon.code} applied
            </span>
            <button onClick={removeCoupon} aria-label="Remove coupon" className="text-veg-600 hover:text-veg-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Coupon code"
                aria-label="Coupon code"
                className="flex-1 rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm uppercase placeholder:normal-case focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
              />
              <button
                onClick={() => {
                  const d = applyCoupon(code, subtotal);
                  if (d > 0) setCode('');
                }}
                className="rounded-xl bg-maroon-500 px-4 py-2.5 text-sm font-semibold text-cream-100 transition hover:bg-maroon-600"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="mt-2 text-xs text-nonveg-500">{couponError}</p>}
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
        <span className="font-serif text-base font-semibold text-maroon-700">Total</span>
        <span className="font-serif text-2xl font-bold text-maroon-700">
          {deliveryFee === null ? formatINR(total) + '*' : formatINR(total)}
        </span>
      </div>
      {deliveryFee === null && (
        <p className="mt-1 text-xs text-brown-400">*Final delivery fee confirmed at checkout for your area.</p>
      )}

      {showActions && (
        <div className="mt-5 space-y-3">
          <ButtonLink to="/checkout" className="w-full" size="lg">Proceed to Checkout</ButtonLink>
          <ButtonLink to="/menu" variant="ghost" className="w-full">Continue Shopping</ButtonLink>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-cream-100 px-3 py-2 text-xs text-brown-500">
        <Truck className="h-4 w-4 text-gold-600" />
        Free delivery on orders above {formatINR(BUSINESS.freeDeliveryThreshold)}
      </div>
    </div>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className={classNames(muted ? 'text-brown-400' : 'text-brown-600')}>{label}</span>
      <span className={classNames('font-semibold', accent ?? 'text-maroon-700', muted && !accent && 'text-brown-500')}>{value}</span>
    </div>
  );
}
