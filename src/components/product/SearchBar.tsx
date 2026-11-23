import { Search, X } from 'lucide-react';
import { classNames } from '@/utils/format';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search dishes, sweets, snacks…', className }: SearchBarProps) {
  return (
    <div className={classNames('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-brown-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search menu"
        className="w-full rounded-xl border border-cream-300 bg-white py-2.5 pl-10 pr-10 text-sm text-brown-700 placeholder:text-brown-400 focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-400 hover:text-maroon-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
