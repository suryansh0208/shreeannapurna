import { Link } from 'react-router-dom';
import { Plus, Check, Flame, Star } from 'lucide-react';
import type { Product } from '@/types';
import { FoodImage } from '@/components/ui/FoodImage';
import { QuantitySelector } from './QuantitySelector';
import { useCartStore } from '@/store/cartStore';
import { formatINR, classNames } from '@/utils/format';
import { useState } from 'react';

export function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover">
      <Link to={`/product/${product.id}`} className="relative block">
        <FoodImage
          hue={product.imageHue}
          accent={product.imageAccent}
          pattern={product.imagePattern}
          name={product.name}
          className="aspect-[4/3] w-full"
          rounded="rounded-none"
        />
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold text-maroon-800 shadow-sm">
              <Star className="h-3 w-3 fill-current" /> Bestseller
            </span>
          )}
          {product.todaySpecial && (
            <span className="inline-flex items-center gap-1 rounded-full bg-maroon-500 px-2 py-0.5 text-[10px] font-bold text-cream-100 shadow-sm">
              Today's Special
            </span>
          )}
        </div>
        {/* Veg / Non-veg indicator */}
        <span
          className={classNames(
            'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded border-2 bg-white',
            product.foodType === 'veg' ? 'border-veg-500' : 'border-nonveg-500',
          )}
          aria-label={product.foodType === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
        >
          <span
            className={classNames(
              'h-2.5 w-2.5 rounded-full',
              product.foodType === 'veg' ? 'bg-veg-500' : 'bg-nonveg-500',
            )}
          />
        </span>
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-maroon-900/50">
            <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-maroon-700">Out of stock</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-base font-semibold leading-snug text-maroon-700 transition-colors group-hover:text-maroon-500">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-brown-500">{product.description}</p>

        <div className="mt-2 flex items-center gap-3 text-xs text-brown-400">
          {product.serves && <span>Serves {product.serves}</span>}
          {product.spiceLevel && product.spiceLevel > 1 && (
            <span className="inline-flex items-center gap-0.5 text-nonveg-500">
              {Array.from({ length: product.spiceLevel }).map((_, i) => (
                <Flame key={i} className="h-3 w-3 fill-current" />
              ))}
              Spicy
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-maroon-700">{formatINR(product.price)}</span>
            {product.hasWeightVariants && (
              <span className="text-[11px] text-brown-400">per kg base price</span>
            )}
          </div>

          {added ? (
            <div className="inline-flex items-center gap-1.5 rounded-xl bg-veg-500 px-4 py-2.5 text-sm font-semibold text-white">
              <Check className="h-4 w-4" /> Added
            </div>
          ) : product.available ? (
            <div className="flex items-center gap-2">
              <QuantitySelector
                quantity={qty}
                onDecrease={() => setQty((q) => Math.max(1, q - 1))}
                onIncrease={() => setQty((q) => Math.min(20, q + 1))}
                size="sm"
              />
              <button
                onClick={handleAdd}
                aria-label={`Add ${product.name} to cart`}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-maroon-500 px-3.5 text-sm font-semibold text-cream-100 transition hover:bg-maroon-600 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
          ) : (
            <span className="rounded-xl bg-cream-200 px-4 py-2.5 text-sm font-medium text-brown-400">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
