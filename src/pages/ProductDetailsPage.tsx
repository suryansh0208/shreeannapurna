import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, Flame, Leaf, Drumstick, ShoppingBag } from 'lucide-react';
import { api } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { useSEO } from '@/hooks/useSEO';
import { FoodImage } from '@/components/ui/FoodImage';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ButtonLink, Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/States';
import { formatINR, classNames, validateMobile } from '@/utils/format';
import { CATEGORIES, PRODUCTS } from '@/data/mockData';
import type { Product } from '@/types';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  useSEO({ title: 'Product Details', path: `/product/${id}` });

  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const [variantPrice, setVariantPrice] = useState<number | undefined>(undefined);
  const [added, setAdded] = useState(false);

  const add = useCartStore((s) => s.add);

  useEffect(() => {
    if (!id) return;
    setProduct(undefined);
    api.getProduct(id).then((p) => {
      setProduct(p);
      if (p?.hasWeightVariants) {
        setVariant('500g');
        setVariantPrice(Math.round(p.price * 0.52));
      }
    });
  }, [id]);

  if (product === undefined) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingSkeleton className="h-6 w-32" />
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <LoadingSkeleton className="h-96 w-full rounded-3xl" />
          <div className="space-y-4">
            <LoadingSkeleton className="h-8 w-3/4" />
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-4 w-5/6" />
            <LoadingSkeleton className="h-12 w-full" />
            <LoadingSkeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <EmptyState
          icon={<ShoppingBag className="h-7 w-7" />}
          title="Product not found"
          description="This dish may have been removed or is temporarily unavailable."
          action={<ButtonLink to="/menu">Browse Menu</ButtonLink>}
        />
      </div>
    );
  }

  const unitPrice = variantPrice ?? product.price;
  const total = unitPrice * qty;
  const category = CATEGORIES.find((c) => c.slug === product.categorySlug);
  const related = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
  ).slice(0, 4);

  const handleAdd = () => {
    add(product, qty, variant, variantPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon-600 hover:text-maroon-700">
        <ArrowLeft className="h-4 w-4" /> Back to Menu
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <FoodImage
            hue={product.imageHue}
            accent={product.imageAccent}
            pattern={product.imagePattern}
            name={product.name}
            className="aspect-square w-full"
            rounded="rounded-3xl"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            {category && <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-brown-600">{category.emoji} {category.name}</span>}
            <span className={classNames('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', product.foodType === 'veg' ? 'bg-veg-500/10 text-veg-600' : 'bg-nonveg-500/10 text-nonveg-500')}>
              {product.foodType === 'veg' ? <Leaf className="h-3 w-3" /> : <Drumstick className="h-3 w-3" />}
              {product.foodType === 'veg' ? 'Veg' : 'Non-Veg'}
            </span>
            {product.bestseller && <span className="rounded-full bg-gold-400 px-2.5 py-1 text-xs font-bold text-maroon-800">Bestseller</span>}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold text-maroon-700">{product.name}</h1>
          <p className="mt-3 text-base leading-relaxed text-brown-600">{product.description}</p>

          {product.spiceLevel && product.spiceLevel > 1 && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-nonveg-500">
              {Array.from({ length: product.spiceLevel }).map((_, i) => <Flame key={i} className="h-4 w-4 fill-current" />)}
              Spicy
            </div>
          )}

          <div className="mt-6">
            <span className="font-serif text-3xl font-bold text-maroon-700">
              {formatINR(unitPrice)}
            </span>
            {product.hasWeightVariants && <span className="ml-2 text-sm text-brown-400">per {variant ?? '500g'}</span>}
          </div>

          {product.hasWeightVariants && (
            <div className="mt-6">
              <VariantSelector
                basePrice={product.price}
                selected={variant ?? '500g'}
                onSelect={(w, p) => { setVariant(w); setVariantPrice(p); }}
              />
            </div>
          )}

          {/* Quantity & add */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-xl border border-cream-300 bg-white p-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="flex h-9 w-9 items-center justify-center rounded-lg text-maroon-600 hover:bg-maroon-50">
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-8 text-center font-bold text-maroon-700" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="flex h-9 w-9 items-center justify-center rounded-lg text-maroon-600 hover:bg-maroon-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {product.available ? (
              added ? (
                <div className="inline-flex items-center gap-2 rounded-xl bg-veg-500 px-6 py-3 text-sm font-semibold text-white">
                  <Check className="h-5 w-5" /> Added to cart
                </div>
              ) : (
                <Button onClick={handleAdd} size="lg" leftIcon={<ShoppingBag className="h-5 w-5" />}>
                  Add to Cart · {formatINR(total)}
                </Button>
              )
            ) : (
              <span className="rounded-xl bg-cream-200 px-6 py-3 text-sm font-medium text-brown-400">Currently unavailable</span>
            )}
          </div>

          {/* Details */}
          {(product.ingredients || product.serves) && (
            <div className="mt-8 space-y-4 rounded-2xl border border-cream-300 bg-white p-5">
              {product.serves && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Serves</p>
                  <p className="mt-1 text-sm text-brown-600">{product.serves}</p>
                </div>
              )}
              {product.ingredients && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Key Ingredients</p>
                  <p className="mt-1 text-sm text-brown-600">{product.ingredients.join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-maroon-700">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
