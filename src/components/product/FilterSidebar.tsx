import { SlidersHorizontal, X } from 'lucide-react';
import type { Category, FoodType } from '@/types';
import { classNames } from '@/utils/format';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'name';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  foodType: FoodType | 'all';
  onFoodTypeChange: (type: FoodType | 'all') => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  open: boolean;
  onClose: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  foodType,
  onFoodTypeChange,
  sort,
  onSortChange,
  open,
  onClose,
}: FilterSidebarProps) {
  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-cream-300 px-5 py-4 lg:hidden">
        <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-maroon-700">
          <SlidersHorizontal className="h-5 w-5" /> Filters
        </h2>
        <button onClick={onClose} aria-label="Close filters" className="flex h-9 w-9 items-center justify-center rounded-lg text-maroon-700 hover:bg-maroon-50">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {/* Categories */}
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brown-500">Categories</h3>
          <div className="space-y-1">
            <FilterButton active={!selectedCategory} onClick={() => onCategoryChange(null)}>
              All items
            </FilterButton>
            {categories.map((cat) => (
              <FilterButton
                key={cat.slug}
                active={selectedCategory === cat.slug}
                onClick={() => onCategoryChange(cat.slug)}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.name}
              </FilterButton>
            ))}
          </div>
        </section>

        {/* Food type */}
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brown-500">Food Preference</h3>
          <div className="flex gap-2">
            <FilterButton active={foodType === 'all'} onClick={() => onFoodTypeChange('all')} compact>
              All
            </FilterButton>
            <FilterButton active={foodType === 'veg'} onClick={() => onFoodTypeChange('veg')} compact>
              <span className="mr-1.5 inline-block h-3 w-3 rounded-sm border-2 border-veg-500" /> Veg
            </FilterButton>
            <FilterButton active={foodType === 'nonveg'} onClick={() => onFoodTypeChange('nonveg')} compact>
              <span className="mr-1.5 inline-block h-3 w-3 rounded-sm border-2 border-nonveg-500" /> Non-Veg
            </FilterButton>
          </div>
        </section>

        {/* Sort */}
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-brown-500">Sort By</h3>
          <div className="space-y-1">
            {SORT_OPTIONS.map((opt) => (
              <FilterButton
                key={opt.value}
                active={sort === opt.value}
                onClick={() => onSortChange(opt.value)}
              >
                {opt.label}
              </FilterButton>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-cream-300 bg-white shadow-card">
          <div className="hidden items-center gap-2 border-b border-cream-300 px-5 py-4 lg:flex">
            <SlidersHorizontal className="h-5 w-5 text-maroon-600" />
            <h2 className="font-serif text-lg font-semibold text-maroon-700">Filters</h2>
          </div>
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={classNames(
          'fixed inset-0 z-50 bg-maroon-900/40 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={classNames(
          'fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] bg-cream-100 shadow-2xl transition-transform lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Filters"
      >
        {content}
      </aside>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
  compact,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex w-full items-center text-left text-sm font-medium transition-colors',
        compact ? 'rounded-lg px-3 py-2' : 'rounded-lg px-3 py-2.5',
        active
          ? 'bg-maroon-50 text-maroon-700'
          : 'text-brown-600 hover:bg-cream-100 hover:text-maroon-600',
      )}
    >
      {children}
    </button>
  );
}
