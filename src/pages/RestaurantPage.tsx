import { useSEO } from '@/hooks/useSEO';
import { MenuBrowser } from './MenuBrowser';
import { CATEGORY_GROUPS } from '@/config/site';

export function RestaurantPage() {
  useSEO({ title: 'Restaurant', description: 'Order North Indian mains, thalis, paneer dishes, dal, rice, roti and family combos.', path: '/restaurant' });
  return (
    <MenuBrowser
      title="Restaurant Dishes"
      eyebrow="From Our Kitchen"
      description="Rich curries, thalis, paneer specials, dal, biryani and fresh tandoor breads — all prepared fresh."
      restrictTo={CATEGORY_GROUPS.restaurant.slugs}
    />
  );
}
