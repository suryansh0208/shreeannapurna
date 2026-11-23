import { useSEO } from '@/hooks/useSEO';
import { MenuBrowser } from './MenuBrowser';
import { CATEGORY_GROUPS } from '@/config/site';

export function SweetsPage() {
  useSEO({ title: 'Sweets', description: 'Order traditional Indian sweets, Bengali sweets and dry sweets by weight. Made in pure ghee.', path: '/sweets' });
  return (
    <MenuBrowser
      title="Traditional Sweets"
      eyebrow="Made in Pure Ghee"
      description="Hand-crafted mithai, Bengali sweets and dry fruit sweets — available by weight (250g, 500g, 1kg)."
      restrictTo={CATEGORY_GROUPS.sweets.slugs}
    />
  );
}
