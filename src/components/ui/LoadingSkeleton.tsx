import { classNames } from '@/utils/format';

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        'animate-shimmer rounded-lg bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 bg-[length:1000px_100%]',
        className,
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream-300 bg-white">
      <LoadingSkeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-3 w-full" />
        <LoadingSkeleton className="h-3 w-5/6" />
        <div className="flex items-center justify-between pt-2">
          <LoadingSkeleton className="h-6 w-20" />
          <LoadingSkeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
