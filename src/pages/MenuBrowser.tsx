import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import type { Category, FoodType, Product } from '@/types';
import { api } from '@/services/api';
import { CATEGORIES } from '@/data/mockData';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SearchBar } from '@/components/product/SearchBar';
import { FilterSidebar } from '@/components/product/FilterSidebar';
import { GridSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorState } from '@/components/ui/States';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'name';

interface MenuBrowserProps {
  title: string;
  eyebrow?: string;
  description?: string;
  /** restrict product pool to these category slugs; omit for all */
  restrictTo?: string[];
}

export function MenuBrowser({ title, eyebrow, description, restrictTo }: MenuBrowserProps) {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [foodType, setFoodType] = useState<FoodType | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('popular');

  const initialCategory = params.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory && (!restrictTo || restrictTo.includes(initialCategory)) ? initialCategory : null,
  );

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setError(true));
  }, []);

  // Keep URL in sync
  useEffect(() => {
    if (selectedCategory) setParams({ category: selectedCategory }, { replace: true });
    else if (params.has('category')) setParams({}, { replace: true });
  }, [selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const categories = useMemo<Category[]>(() => {
    if (!restrictTo) return CATEGORIES;
    return CATEGORIES.filter((c) => restrictTo.includes(c.slug));
  }, [restrictTo]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products;

    if (restrictTo) {
      list = list.filter((p) => restrictTo.includes(p.categorySlug));
    }
    if (selectedCategory) {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }
    if (foodType !== 'all') {
      list = list.filter((p) => p.foodType === foodType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }

    const sorted = [...list];
    switch (sort) {
      case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:
        sorted.sort((a, b) => Number(b.bestseller ?? 0) - Number(a.bestseller ?? 0));
    }
    return sorted;
  }, [products, selectedCategory, foodType, search, sort, restrictTo]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-gold-600">{eyebrow}</p>}
        <h1 className="mt-2 font-serif text-4xl font-bold text-maroon-700">{title}</h1>
        {description && <p className="mx-auto mt-3 max-w-2xl text-brown-600">{description}</p>}
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} className="flex-1" />
        <button
          onClick={() => setFiltersOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm font-medium text-maroon-700 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          foodType={foodType}
          onFoodTypeChange={setFoodType}
          sort={sort}
          onSortChange={setSort}
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        <div className="min-w-0 flex-1">
          {error ? (
            <ErrorState onRetry={() => { setError(false); api.getProducts().then(setProducts).catch(() => setError(true)); }} />
          ) : !products ? (
            <GridSkeleton count={8} />
          ) : (
            <>
              <p className="mb-4 text-sm text-brown-500">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
              <ProductGrid products={filtered} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
