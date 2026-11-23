import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { FoodImage } from '@/components/ui/FoodImage';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { ButtonLink } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { formatINR, classNames } from '@/utils/format';
import { BUSINESS } from '@/config/site';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);
  const subtotal = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const freeDeliveryLeft = Math.max(0, BUSINESS.freeDeliveryThreshold - subtotal);

  return (
    <>
      <div
        className={classNames(
          'fixed inset-0 z-50 bg-maroon-900/40 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={classNames(
          'fixed right-0 top-0 z-50 flex h-full w-[420px] max-w-[92%] flex-col bg-cream-100 shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Your cart"
      >
        <div className="flex items-center justify-between border-b border-cream-300 bg-white px-5 py-4">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-maroon-700">
            <ShoppingBag className="h-5 w-5" /> Your Cart
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="flex h-9 w-9 items-center justify-center rounded-lg text-maroon-700 hover:bg-maroon-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center p-6">
            <EmptyState
              icon={<ShoppingBag className="h-7 w-7" />}
              title="Your cart is empty"
              description="Add some delicious dishes and sweets to get started."
              action={<ButtonLink to="/menu" onClick={onClose}>Browse Menu</ButtonLink>}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant ?? ''}`} className="flex gap-3 rounded-xl border border-cream-200 bg-white p-3">
                  <FoodImage
                    hue={item.imageHue}
                    accent={item.imageAccent}
                    pattern={item.imagePattern}
                    name={item.name}
                    className="h-16 w-16 shrink-0"
                    rounded="rounded-lg"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-maroon-700">{item.name}</h4>
                      <button
                        onClick={() => remove(item.productId, item.variant)}
                        aria-label={`Remove ${item.name}`}
                        className="text-brown-400 transition hover:text-nonveg-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {item.variant && <p className="text-xs text-brown-400">{item.variant}</p>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantitySelector
                        quantity={item.quantity}
                        onDecrease={() => setQuantity(item.productId, item.variant, item.quantity - 1)}
                        onIncrease={() => setQuantity(item.productId, item.variant, item.quantity + 1)}
                        size="sm"
                      />
                      <span className="text-sm font-bold text-maroon-700">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {freeDeliveryLeft > 0 && (
              <div className="px-4 pb-2 text-center text-xs text-brown-500">
                Add {formatINR(freeDeliveryLeft)} more for free delivery!
              </div>
            )}

            <div className="border-t border-cream-300 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brown-600">Subtotal</span>
                <span className="text-lg font-bold text-maroon-700">{formatINR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-brown-400">Taxes and delivery calculated at checkout.</p>
              <div className="mt-4 flex gap-3">
                <ButtonLink to="/cart" onClick={onClose} variant="outline" className="flex-1">View Cart</ButtonLink>
                <ButtonLink to="/checkout" onClick={onClose} className="flex-1">Checkout</ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
