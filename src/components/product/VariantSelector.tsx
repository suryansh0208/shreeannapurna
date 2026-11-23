import { classNames } from '@/utils/format';
import { WEIGHT_VARIANTS } from '@/config/site';
import { formatINR } from '@/utils/format';

interface VariantSelectorProps {
  basePrice: number; // price for 1kg
  selected: string;
  onSelect: (weight: string, price: number) => void;
  className?: string;
}

export function VariantSelector({ basePrice, selected, onSelect, className }: VariantSelectorProps) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brown-500">Select weight</p>
      <div className="flex flex-wrap gap-2">
        {WEIGHT_VARIANTS.map((v) => {
          const price = Math.round(basePrice * v.multiplier);
          const active = selected === v.weight;
          return (
            <button
              key={v.weight}
              onClick={() => onSelect(v.weight, price)}
              className={classNames(
                'rounded-xl border px-3.5 py-2 text-sm font-medium transition-all',
                active
                  ? 'border-maroon-500 bg-maroon-500 text-cream-100 shadow-sm'
                  : 'border-cream-300 bg-white text-brown-600 hover:border-gold-300 hover:bg-cream-50',
              )}
            >
              <span className="block">{v.weight}</span>
              <span className={classNames('block text-xs', active ? 'text-cream-100/80' : 'text-brown-400')}>
                {formatINR(price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
