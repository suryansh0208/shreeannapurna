import { Minus, Plus } from 'lucide-react';
import { classNames } from '@/utils/format';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function QuantitySelector({ quantity, onDecrease, onIncrease, size = 'md', className }: QuantitySelectorProps) {
  const btn = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const text = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={classNames('inline-flex items-center gap-1 rounded-xl border border-cream-300 bg-white p-1', className)}>
      <button
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className={classNames(
          'flex items-center justify-center rounded-lg text-maroon-600 transition hover:bg-maroon-50 active:scale-90',
          btn,
        )}
      >
        <Minus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
      <span className={classNames('min-w-6 text-center font-bold text-maroon-700', text)} aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={classNames(
          'flex items-center justify-center rounded-lg text-maroon-600 transition hover:bg-maroon-50 active:scale-90',
          btn,
        )}
      >
        <Plus className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
    </div>
  );
}
