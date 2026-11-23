import { useState, useCallback } from 'react';
import { OFFERS } from '@/config/site';
import type { Offer } from '@/types';

export function useCoupon() {
  const [appliedCoupon, setAppliedCoupon] = useState<Offer | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const applyCoupon = useCallback((code: string, subtotal: number): number => {
    const trimmed = code.trim().toUpperCase();
    const offer = OFFERS.find((o) => o.code === trimmed);
    if (!offer) {
      setAppliedCoupon(null);
      setCouponError('This coupon code is not valid.');
      return 0;
    }
    if (subtotal < offer.minOrder) {
      setAppliedCoupon(null);
      setCouponError(
        `Minimum order of ₹${offer.minOrder} required for ${offer.code}.`,
      );
      return 0;
    }
    let discount = 0;
    if (offer.discountType === 'percent') {
      discount = (subtotal * offer.value) / 100;
      if (offer.maxDiscount) discount = Math.min(discount, offer.maxDiscount);
    } else {
      discount = offer.value;
    }
    setAppliedCoupon(offer);
    setCouponError(null);
    return Math.round(discount);
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError(null);
  }, []);

  return { appliedCoupon, couponError, applyCoupon, removeCoupon };
}
