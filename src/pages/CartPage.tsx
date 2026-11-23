import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useSEO } from '@/hooks/useSEO';
import { FoodImage } from '@/components/ui/FoodImage';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/ui/States';
import { ButtonLink } from '@/components/ui/Button';
import { formatINR } from '@/utils/format';

export function CartPage() {
  useSEO({ title: 'Cart', description: 'Review your cart and proceed to checkout.', path: '/cart' });
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your cart is empty"
          description="Browse our delicious menu and add your favourite dishes and sweets."
          action={<ButtonLink to="/menu" size="lg">Browse Menu</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon-600 hover:text-maroon-700">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-bold text-maroon-700">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variant ?? ''}`} className="flex gap-4 rounded-2xl border border-cream-300 bg-white p-4 shadow-card">
              <FoodImage
                hue={item.imageHue}
                accent={item.imageAccent}
                pattern={item.imagePattern}
                name={item.name}
                className="h-20 w-20 shrink-0"
                rounded="rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/product/${item.productId}`}>
                    <h3 className="font-serif text-base font-semibold text-maroon-700 hover:text-maroon-500">{item.name}</h3>
                  </Link>
                  <button onClick={() => remove(item.productId, item.variant)} aria-label={`Remove ${item.name}`} className="text-brown-400 transition hover:text-nonveg-500">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                {item.variant && <p className="text-sm text-brown-400">{item.variant}</p>}
                <div className="mt-auto flex items-center justify-between pt-3">
                  <QuantitySelector
                    quantity={item.quantity}
                    onDecrease={() => setQuantity(item.productId, item.variant, item.quantity - 1)}
                    onIncrease={() => setQuantity(item.productId, item.variant, item.quantity + 1)}
                  />
                  <div className="text-right">
                    <p className="text-xs text-brown-400">{formatINR(item.price)} each</p>
                    <p className="font-bold text-maroon-700">{formatINR(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24">
          <CartSummary fulfilment="delivery" showActions />
        </div>
      </div>
    </div>
  );
}
