import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  add: (product: Product, quantity: number, variantLabel?: string, variantPrice?: number) => void;
  remove: (productId: string, variant?: string) => void;
  setQuantity: (productId: string, variant: string | undefined, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

function itemKey(productId: string, variant?: string): string {
  return `${productId}::${variant ?? ''}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, quantity, variantLabel, variantPrice) => {
        const unitPrice = variantPrice ?? product.price;
        const variant = variantLabel;
        set((state) => {
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.variant) === itemKey(product.id, variant),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          const item: CartItem = {
            productId: product.id,
            name: product.name,
            price: unitPrice,
            quantity,
            variant,
            imageHue: product.imageHue,
            imageAccent: product.imageAccent,
            imagePattern: product.imagePattern,
            categorySlug: product.categorySlug,
          };
          return { items: [...state.items, item] };
        });
      },

      remove: (productId, variant) => {
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.variant) !== itemKey(productId, variant),
          ),
        }));
      },

      setQuantity: (productId, variant, quantity) => {
        if (quantity <= 0) {
          get().remove(productId, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, quantity }
              : i,
          ),
        }));
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'sa-cart' },
  ),
);
