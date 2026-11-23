import { Link } from 'react-router-dom';
import { Home, UtensilsCrossed } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { ButtonLink } from '@/components/ui/Button';

export function NotFoundPage() {
  useSEO({ title: 'Page Not Found', description: 'The page you are looking for does not exist.', path: '/404' });
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="relative">
        <span className="font-serif text-[120px] font-bold leading-none text-maroon-100">404</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <UtensilsCrossed className="h-16 w-16 text-maroon-400" />
        </span>
      </div>
      <h1 className="mt-4 font-serif text-2xl font-bold text-maroon-700">Page Not Found</h1>
      <p className="mt-3 max-w-md text-brown-600">
        The page you're looking for doesn't exist or may have moved. Let's get you back to something delicious.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/" size="lg" leftIcon={<Home className="h-4 w-4" />}>Back to Home</ButtonLink>
        <ButtonLink to="/menu" variant="outline" size="lg">Browse Menu</ButtonLink>
      </div>
      <Link to="/contact" className="mt-6 text-sm text-maroon-600 hover:text-maroon-700">
        Need help? Contact us
      </Link>
    </div>
  );
}
