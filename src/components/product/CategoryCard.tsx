import { Link } from 'react-router-dom';
import type { Category } from '@/types';
import { classNames } from '@/utils/format';

interface CategoryCardProps {
  category: Category;
  count?: number;
  size?: 'sm' | 'md';
}

export function CategoryCard({ category, count, size = 'md' }: CategoryCardProps) {
  return (
    <Link
      to={`/menu?category=${category.slug}`}
      className={classNames(
        'group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-cream-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-cardHover',
        size === 'sm' ? 'p-4' : 'p-6',
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={classNames(
          'relative flex items-center justify-center rounded-2xl bg-cream-100 transition-transform duration-300 group-hover:scale-110',
          size === 'sm' ? 'h-12 w-12 text-2xl' : 'h-16 w-16 text-3xl',
        )}
      >
        {category.emoji}
      </span>
      <h3 className={classNames('relative mt-3 text-center font-semibold text-maroon-700', size === 'sm' ? 'text-sm' : 'text-base')}>
        {category.name}
      </h3>
      {count !== undefined && (
        <p className="relative mt-0.5 text-xs text-brown-400">{count} items</p>
      )}
    </Link>
  );
}
