import type {
  CategorySlug,
  DeliveryZone,
  Offer,
  Testimonial,
} from '@/types';

export const BUSINESS = {
  name: 'Shree Annapurna Restaurant & Sweet',
  shortName: 'Shree Annapurna',
  tagline: 'Authentic Indian Food & Traditional Sweets',
  phone: '+91 92414 30915',
  whatsapp: '919241430915',
  email: 'orders@shreeannapurna.example',
  addressLine1: 'Shop No. 12, MG Road',
  addressLine2: '[Add street, area, city]',
  city: '[Add city]',
  state: '[Add state]',
  pincode: '[Add pincode]',
  mapEmbedUrl: '[Add Google Maps embed URL]',
  mapLink: '[Add Google Maps link]',
  openingHoursNote: 'Hours will be displayed when configured by the restaurant.',
  gstRate: 0, // percentage; 0 = taxes included. Update when configured.
  deliveryFeeFlat: 40, // default estimate; actual fee resolved by delivery zone
  freeDeliveryThreshold: 500,
  currency: 'INR',
  social: {
    instagram: '#',
    facebook: '#',
  },
} as const;

export const DELIVERY_ZONES: DeliveryZone[] = [];

export const DELIVERY_SLOTS: string[] = [];

export const CATEGORY_GROUPS: Record<
  'restaurant' | 'sweets' | 'snacks' | 'beverages',
  { label: string; slugs: CategorySlug[] }
> = {
  restaurant: {
    label: 'Restaurant',
    slugs: ['north-indian', 'meals', 'thali', 'paneer', 'dal', 'rice', 'roti'],
  },
  sweets: {
    label: 'Sweets',
    slugs: ['sweets', 'bengali-sweets', 'dry-sweets'],
  },
  snacks: {
    label: 'Snacks',
    slugs: ['samosa', 'kachori', 'snacks', 'fast-food'],
  },
  beverages: {
    label: 'Beverages',
    slugs: ['beverages'],
  },
};

export const WEIGHT_VARIANTS = [
  { weight: '250g', multiplier: 0.28 },
  { weight: '500g', multiplier: 0.52 },
  { weight: '1kg', multiplier: 1 },
];

export const OFFERS: Offer[] = [
  {
    id: 'welcome10',
    code: 'WELCOME10',
    title: '10% off your first order',
    description: 'New customers get 10% off, up to ₹75. Min order ₹300.',
    discountType: 'percent',
    value: 10,
    minOrder: 300,
    maxDiscount: 75,
    validUntil: '[Configure end date]',
  },
  {
    id: 'sweet200',
    code: 'SWEET200',
    title: '₹50 off on sweets above ₹200',
    description: 'Flat ₹50 off on traditional sweets. Min order ₹200.',
    discountType: 'flat',
    value: 50,
    minOrder: 200,
    validUntil: '[Configure end date]',
    applicable: ['sweets', 'bengali-sweets', 'dry-sweets'],
  },
  {
    id: 'combo150',
    code: 'COMBO150',
    title: 'Free delivery on family combos',
    description: 'Free delivery on family combo orders above ₹450.',
    discountType: 'flat',
    value: 40,
    minOrder: 450,
    validUntil: '[Configure end date]',
    applicable: ['meals', 'thali'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: '[Customer name]',
    location: '[City]',
    quote:
      'Share your dining experience here. This placeholder will be replaced with genuine, verified customer testimonials once collected.',
    initials: '★',
  },
  {
    id: 't2',
    name: '[Customer name]',
    location: '[City]',
    quote:
      'Share your dining experience here. This placeholder will be replaced with genuine, verified customer testimonials once collected.',
    initials: '★',
  },
  {
    id: 't3',
    name: '[Customer name]',
    location: '[City]',
    quote:
      'Share your dining experience here. This placeholder will be replaced with genuine, verified customer testimonials once collected.',
    initials: '★',
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'Leaf',
    title: 'Pure Vegetarian Kitchen',
    description:
      'A fully vegetarian kitchen preparing authentic North Indian and regional recipes fresh every day.',
  },
  {
    icon: 'Candy',
    title: 'Traditional Sweets',
    description:
      'Hand-crafted sweets and mithai made in-house using time-honoured recipes and pure ghee.',
  },
  {
    icon: 'Truck',
    title: 'Home Delivery & Takeaway',
    description:
      'Hot, fresh meals delivered to your doorstep or ready for quick pickup at the counter.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Hygienic & Trusted',
    description:
      'Clean, hygienic preparation with quality ingredients and careful packaging for every order.',
  },
];

export const ANNOUNCEMENTS = [
  'Free delivery on orders above ₹500',
  'Fresh traditional sweets made daily in pure ghee',
  'Order online — pay with Razorpay or Cash on Delivery',
];
