import { Tag, Calendar } from 'lucide-react';
import type { Offer } from '@/types';
import { formatINR } from '@/utils/format';

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-gold-200 bg-gradient-to-br from-cream-50 to-gold-50 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-cardHover">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-200/40 blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-maroon-500 text-gold-300">
            <Tag className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-maroon-500 px-3 py-1 font-mono text-xs font-bold tracking-wider text-cream-100">
            {offer.code}
          </span>
        </div>
        <h3 className="mt-4 font-serif text-lg font-semibold text-maroon-700">{offer.title}</h3>
        <p className="mt-2 text-sm text-brown-600">{offer.description}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-brown-400">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Valid till {offer.validUntil}
          </span>
          <span>Min order {formatINR(offer.minOrder)}</span>
        </div>
      </div>
    </article>
  );
}
