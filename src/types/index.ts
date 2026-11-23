export type FoodType = 'veg' | 'nonveg';

export type CategorySlug =
  | 'north-indian'
  | 'meals'
  | 'thali'
  | 'paneer'
  | 'dal'
  | 'rice'
  | 'roti'
  | 'sweets'
  | 'bengali-sweets'
  | 'dry-sweets'
  | 'samosa'
  | 'kachori'
  | 'snacks'
  | 'fast-food'
  | 'beverages';

export interface Category {
  slug: CategorySlug;
  name: string;
  group: 'restaurant' | 'sweets' | 'snacks' | 'beverages';
  emoji: string;
  description: string;
}

export interface WeightVariant {
  weight: string; // e.g. "250g"
  multiplier: number; // relative to base price for 1kg
}

export interface Product {
  id: string;
  name: string;
  categorySlug: CategorySlug;
  description: string;
  price: number; // base price in INR
  foodType: FoodType;
  bestseller?: boolean;
  todaySpecial?: boolean;
  available: boolean;
  hasWeightVariants?: boolean;
  variants?: WeightVariant[];
  ingredients?: string[];
  serves?: string;
  imageHue: number; // 0-360 for generated visual
  imageAccent: string; // accent color for the food visual
  imagePattern: 'curry' | 'dry' | 'bowl' | 'bread' | 'drink' | 'sweet' | 'plate' | 'fried';
  spiceLevel?: 1 | 2 | 3;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number; // unit price (resolved variant price)
  quantity: number;
  variant?: string; // weight label if applicable
  imageHue: number;
  imageAccent: string;
  imagePattern: Product['imagePattern'];
  categorySlug: CategorySlug;
}

export type FulfilmentType = 'delivery' | 'takeaway';
export type PaymentMethod = 'razorpay' | 'cod';

export interface CheckoutForm {
  name: string;
  mobile: string;
  address: string;
  pincode: string;
  landmark: string;
  fulfilment: FulfilmentType;
  deliverySlot: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  completed: boolean;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percent' | 'flat';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  validUntil: string; // ISO date placeholder
  applicable?: CategorySlug[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  initials: string;
}

export interface DeliveryZone {
  pincode: string;
  area: string;
  fee: number;
  estimatedMinutes: number;
}
