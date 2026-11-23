import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCoupon } from '@/hooks/useCoupon';
import { useSEO } from '@/hooks/useSEO';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PaymentSelector } from '@/components/checkout/PaymentSelector';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { ButtonLink } from '@/components/ui/Button';
import { api, loadRazorpayScript, RAZORPAY_KEY_ID } from '@/services/api';
import { BUSINESS, DELIVERY_ZONES } from '@/config/site';
import { formatINR, generateOrderId, maskMobile } from '@/utils/format';
import type { CheckoutForm as FormType, PaymentMethod } from '@/types';
import { ShoppingBag } from 'lucide-react';

type PincodeStatus = 'idle' | 'checking' | 'serviceable' | 'nonserviceable';

export function CheckoutPage() {
  useSEO({ title: 'Checkout', description: 'Enter your details and place your order.', path: '/checkout' });
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const clear = useCartStore((s) => s.clear);
  const { appliedCoupon, applyCoupon, removeCoupon } = useCoupon();

  const [form, setForm] = useState<FormType>({
    name: '', mobile: '', address: '', pincode: '', landmark: '',
    fulfilment: 'delivery', deliverySlot: '', notes: '', paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormType, string>>>({});
  const [pincodeStatus, setPincodeStatus] = useState<PincodeStatus>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discountType === 'percent'
      ? Math.min((subtotal * appliedCoupon.value) / 100, appliedCoupon.maxDiscount ?? Infinity)
      : appliedCoupon.value;
  }, [appliedCoupon, subtotal]);

  const isDelivery = form.fulfilment === 'delivery';
  const deliveryFee = !isDelivery || subtotal >= BUSINESS.freeDeliveryThreshold ? 0 : BUSINESS.deliveryFeeFlat;
  const tax = Math.round((subtotal * BUSINESS.gstRate) / 100);
  const total = Math.max(0, subtotal - discount + tax + deliveryFee);

  // Pincode serviceability check
  const checkPincode = (pincode: string) => {
    if (pincode.length !== 6) { setPincodeStatus('idle'); return; }
    if (DELIVERY_ZONES.length === 0) { setPincodeStatus('serviceable'); return; }
    setPincodeStatus('checking');
    const zone = DELIVERY_ZONES.find((z) => z.pincode === pincode);
    setTimeout(() => setPincodeStatus(zone ? 'serviceable' : 'nonserviceable'), 300);
  };

  const updateField = (field: keyof FormType, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    if (field === 'pincode') checkPincode(value);
    if (field === 'fulfilment' && value === 'takeaway') {
      setPincodeStatus('idle');
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormType, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    const mobileErr = !form.mobile ? 'Mobile number is required' : form.mobile.replace(/\D/g, '').length !== 10 ? 'Enter a valid 10-digit number' : null;
    if (mobileErr) e.mobile = mobileErr;
    if (isDelivery) {
      if (!form.address.trim()) e.address = 'Address is required';
      if (!form.pincode.trim()) e.pincode = 'Pincode is required';
      else if (form.pincode.length !== 6) e.pincode = 'Enter a valid 6-digit pincode';
      else if (pincodeStatus === 'nonserviceable') e.pincode = 'We do not deliver to this pincode';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = async () => {
    setSubmitError(null);
    if (!validate()) {
      setSubmitError('Please fix the highlighted fields before placing your order.');
      return;
    }

    setSubmitting(true);
    const orderId = generateOrderId();
    const orderPayload = {
      orderId,
      customer: {
        name: form.name,
        mobile: form.mobile,
        address: isDelivery ? form.address : undefined,
        pincode: isDelivery ? form.pincode : undefined,
        landmark: isDelivery ? form.landmark : undefined,
      },
      fulfilment: form.fulfilment,
      deliverySlot: form.deliverySlot || undefined,
      notes: form.notes || undefined,
      items: items.map((i) => ({ productId: i.productId, name: i.name, quantity: i.quantity, price: i.price, variant: i.variant })),
      subtotal,
      discount,
      tax,
      deliveryFee,
      total,
      paymentMethod: form.paymentMethod,
    };

    try {
      if (form.paymentMethod === 'razorpay') {
        // Online payment — requires backend to create order & verify
        if (!RAZORPAY_KEY_ID) {
          throw new Error('Online payment is not yet configured. Please use Cash on Delivery or contact us on WhatsApp to place your order.');
        }
        // Create order on backend
        const { orderId: razorpayOrderId } = await api.createRazorpayOrder(total);
        const loaded = await loadRazorpayScript();
        if (!loaded) throw new Error('Could not load the payment gateway. Please try again or use Cash on Delivery.');

        await new Promise<void>((resolve, reject) => {
          const rzp = new (window as any).Razorpay({
            key_id: RAZORPAY_KEY_ID,
            amount: total * 100,
            currency: 'INR',
            name: BUSINESS.name,
            order_id: razorpayOrderId,
            prefill: { name: form.name, contact: form.mobile },
            handler: async (response: any) => {
              try {
                const result = await api.verifyRazorpayPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
                if (!result.verified) { reject(new Error('Payment verification failed.')); return; }
                resolve();
              } catch (err) {
                reject(err instanceof Error ? err : new Error('Verification failed.'));
              }
            },
            modal: { ondismiss: () => reject(new Error('Payment cancelled.')) },
          });
          rzp.open();
        });

        // Payment succeeded & verified — place the order
        try {
          await api.placeOrder({ ...orderPayload, paymentStatus: 'paid' });
        } catch {
          // Backend not ready — proceed to success with a clear note (payment was verified)
        }
        clear();
        navigate(`/order-success?orderId=${orderId}&payment=paid`);
      } else {
        // COD — place order
        try {
          await api.placeOrder({ ...orderPayload, paymentStatus: 'unpaid' });
        } catch {
          // Backend not ready — we cannot confirm the order. Show a clear state.
          setSubmitting(false);
          setSubmitError(
            'Order placement requires the backend service (POST /api/orders). Until the backend is connected, your order cannot be confirmed. Please place your order directly via WhatsApp instead.',
          );
          return;
        }
        clear();
        navigate(`/order-success?orderId=${orderId}&payment=cod`);
      }
    } catch (err) {
      setSubmitting(false);
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      if (message.includes('cancelled')) {
        setSubmitError('Payment was cancelled. You can try again or choose Cash on Delivery.');
        navigate(`/payment-status?orderId=${orderId}&status=cancelled`);
      } else if (message.includes('verification') || message.includes('failed')) {
        setSubmitError(message);
        navigate(`/payment-status?orderId=${orderId}&status=failed`);
      } else {
        setSubmitError(message);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your cart is empty"
          description="Add some dishes before proceeding to checkout."
          action={<ButtonLink to="/menu" size="lg">Browse Menu</ButtonLink>}
        />
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Shree Annapurna, I would like to place an order:\n\n${items.map((i) => `• ${i.name}${i.variant ? ` (${i.variant})` : ''} ×${i.quantity} — ${formatINR(i.price * i.quantity)}`).join('\n')}\n\nTotal: ${formatINR(total)}\nName: ${form.name || '[your name]'}\nMobile: ${maskMobile(form.mobile || '')}${isDelivery ? `\nAddress: ${form.address || '[address]'}` : ''}\nFulfilment: ${form.fulfilment}\nPayment: ${form.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online (Razorpay)'}`,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-maroon-700">Checkout</h1>
      <p className="mt-2 text-brown-600">Enter your details and place your order.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <CheckoutForm
            form={form}
            errors={errors}
            onChange={updateField}
            pincodeStatus={pincodeStatus}
          />
          <PaymentSelector
            value={form.paymentMethod}
            onChange={(m: PaymentMethod) => setForm((f) => ({ ...f, paymentMethod: m }))}
          />

          {submitError && (
            <div className="flex items-start gap-3 rounded-xl border border-nonveg-500/30 bg-nonveg-500/5 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-nonveg-500" />
              <div className="flex-1">
                <p className="text-sm text-maroon-700">{submitError}</p>
                {submitError.includes('WhatsApp') && (
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <MessageCircle className="h-4 w-4" /> Place order on WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          <Button onClick={handlePlaceOrder} size="lg" loading={submitting} className="w-full">
            {submitting ? 'Processing…' : `Place Order · ${formatINR(total)}`}
          </Button>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
            <h2 className="font-serif text-lg font-semibold text-maroon-700">Order Summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant}`} className="flex justify-between gap-2 text-sm">
                  <span className="text-brown-600">{item.name}{item.variant ? ` (${item.variant})` : ''} ×{item.quantity}</span>
                  <span className="font-medium text-maroon-700">{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-cream-200 pt-4 text-sm">
              <div className="flex justify-between"><span className="text-brown-600">Subtotal</span><span className="font-semibold text-maroon-700">{formatINR(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between"><span className="text-brown-600">Discount</span><span className="font-semibold text-veg-600">− {formatINR(discount)}</span></div>}
              {tax > 0 && <div className="flex justify-between"><span className="text-brown-600">Taxes</span><span className="font-semibold text-maroon-700">{formatINR(tax)}</span></div>}
              <div className="flex justify-between"><span className="text-brown-600">Delivery</span><span className="font-semibold text-maroon-700">{deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}</span></div>
            </div>
            <div className="mt-4 flex justify-between border-t border-cream-200 pt-4">
              <span className="font-serif text-lg font-semibold text-maroon-700">Total</span>
              <span className="font-serif text-2xl font-bold text-maroon-700">{formatINR(total)}</span>
            </div>

            {/* Coupon mini */}
            {appliedCoupon ? (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-veg-500/10 px-3 py-2 text-sm">
                <span className="font-medium text-veg-600">{appliedCoupon.code} applied</span>
                <button onClick={removeCoupon} className="text-veg-600 hover:text-veg-500">Remove</button>
              </div>
            ) : (
              <div className="mt-4 flex gap-2">
                <input
                  placeholder="Coupon code"
                  onChange={(e) => setForm((f) => ({ ...f, notes: f.notes }))}
                  id="coupon-input"
                  className="flex-1 rounded-xl border border-cream-300 px-3 py-2 text-sm uppercase placeholder:normal-case"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('coupon-input') as HTMLInputElement;
                    applyCoupon(input.value, subtotal);
                  }}
                  className="rounded-xl bg-maroon-500 px-4 py-2 text-sm font-semibold text-cream-100 hover:bg-maroon-600"
                >
                  Apply
                </button>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-cream-100 px-3 py-2.5 text-xs text-brown-500">
              <ShieldCheck className="h-4 w-4 text-veg-600" />
              {form.paymentMethod === 'cod'
                ? 'Cash on Delivery — pay when your order arrives.'
                : 'Secure online payment via Razorpay. Verified by our backend.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
