import { useSEO } from '@/hooks/useSEO';
import { MenuBrowser } from './MenuBrowser';

export function MenuPage() {
  useSEO({ title: 'Menu', description: 'Browse our full menu of North Indian dishes, thalis, sweets, snacks, fast food and beverages.', path: '/menu' });
  return <MenuBrowser title="Our Menu" eyebrow="Order Online" description="Browse all our dishes, sweets, snacks and beverages. Filter by category, food preference, and sort to find your favourites." />;
}
