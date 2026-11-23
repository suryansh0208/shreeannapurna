import type { ReactNode } from 'react';
import { classNames } from '@/utils/format';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-white/60 px-6 py-16 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-200 text-maroon-400">
          {icon}
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold text-maroon-700">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-brown-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this right now. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center rounded-2xl border border-maroon-200 bg-maroon-50 px-6 py-16 text-center',
        className,
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-maroon-100 text-maroon-500">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      </div>
      <h3 className="font-serif text-xl font-semibold text-maroon-700">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-brown-500">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-maroon-500 px-5 py-2.5 text-sm font-semibold text-cream-100 transition hover:bg-maroon-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}
