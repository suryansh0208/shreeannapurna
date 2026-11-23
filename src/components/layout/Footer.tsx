import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/config/site';

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Full Menu', to: '/menu' },
      { label: 'Restaurant Dishes', to: '/restaurant' },
      { label: 'Sweets', to: '/sweets' },
      { label: 'Offers', to: '/offers' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Track Your Order', to: '/track-order' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-maroon-800 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400 text-maroon-800">
                <UtensilsCrossed className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-serif text-lg font-bold">Shree Annapurna</p>
                <p className="text-[11px] uppercase tracking-widest text-gold-300">Restaurant & Sweet</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/70">
              {BUSINESS.tagline}. Order online for home delivery or takeaway.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-700 text-gold-300 transition hover:bg-maroon-600">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href={BUSINESS.social.instagram} aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-700 text-gold-300 transition hover:bg-maroon-600">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={BUSINESS.social.facebook} aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-700 text-gold-300 transition hover:bg-maroon-600">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-300">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-cream-100/70 transition hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-300">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-cream-100/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>{BUSINESS.addressLine1}, {BUSINESS.addressLine2}, {BUSINESS.city}, {BUSINESS.state} — {BUSINESS.pincode}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-cream-100/70">
                <Phone className="h-4 w-4 shrink-0 text-gold-300" />
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="hover:text-gold-300">{BUSINESS.phone}</a>
              </li>
            </ul>
            <p className="mt-4 rounded-lg bg-maroon-700/60 px-3 py-2 text-xs text-cream-100/60">
              {BUSINESS.openingHoursNote}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-maroon-700 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-cream-100/60">
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-cream-100/60">
            <Link to="/privacy-policy" className="hover:text-gold-300">Privacy</Link>
            <Link to="/terms" className="hover:text-gold-300">Terms</Link>
            <Link to="/contact" className="hover:text-gold-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
