import { NavLink } from 'react-router-dom';
import { X, UtensilsCrossed, Phone } from 'lucide-react';
import { BUSINESS } from '@/config/site';
import { classNames } from '@/utils/format';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/restaurant', label: 'Restaurant' },
  { to: '/sweets', label: 'Sweets' },
  { to: '/offers', label: 'Offers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/track-order', label: 'Track Order' },
];

export function MobileNavbar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={classNames(
          'fixed inset-0 z-50 bg-maroon-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <aside
        className={classNames(
          'fixed left-0 top-0 z-50 flex h-full w-72 max-w-[85%] flex-col bg-cream-100 shadow-2xl transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between border-b border-cream-300 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-500 text-gold-300">
              <UtensilsCrossed className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-sm font-bold text-maroon-700">Shree Annapurna</p>
              <p className="text-[10px] uppercase tracking-widest text-gold-600">Restaurant & Sweet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-maroon-700 hover:bg-maroon-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                classNames(
                  'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-maroon-500 text-cream-100'
                    : 'text-brown-700 hover:bg-cream-200',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-cream-300 px-4 py-4">
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-3 text-sm font-semibold text-maroon-800"
          >
            <Phone className="h-4 w-4" />
            {BUSINESS.phone}
          </a>
        </div>
      </aside>
    </>
  );
}
