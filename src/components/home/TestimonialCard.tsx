import { Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
      <Quote className="h-7 w-7 text-gold-400" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brown-600">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-cream-200 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-100 font-serif text-sm font-bold text-maroon-600">
          {testimonial.initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-maroon-700">{testimonial.name}</p>
          <p className="text-xs text-brown-400">{testimonial.location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
