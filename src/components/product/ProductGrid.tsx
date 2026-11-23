import type { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/ui/States';
import { Search } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-7 w-7" />}
        title="No dishes found"
        description="Try adjusting your filters or search keywords to find what you're craving."
        action={<ButtonLink to="/menu" variant="outline">View full menu</ButtonLink>}
      />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
