import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, UtensilsCrossed, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
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
];

export function Navbar({ onOpenCart, onOpenMobileNav }: { onOpenCart: () => void; onOpenMobileNav: () => void }) {
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-cream-300 bg-cream-100/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileNav}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-maroon-700 hover:bg-maroon-50 lg:hidden"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Shree Annapurna home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-500 text-gold-300 shadow-sm">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-bold text-maroon-700">Shree Annapurna</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-gold-600">Restaurant & Sweet</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                classNames(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-maroon-50 text-maroon-700'
                    : 'text-brown-600 hover:bg-cream-200 hover:text-maroon-600',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
            aria-label="Call the restaurant"
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-maroon-700 hover:bg-maroon-50 sm:flex"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            onClick={onOpenCart}
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-10 items-center gap-2 rounded-lg bg-maroon-500 px-3 text-cream-100 transition hover:bg-maroon-600"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden text-sm font-semibold sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-maroon-800">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
