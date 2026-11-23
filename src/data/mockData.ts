import type { Category, Product } from '@/types';

// ---------------------------------------------------------------------------
// DEMO / MOCK DATA
// ---------------------------------------------------------------------------
// This file contains realistic demo product data for the customer website.
// It is clearly marked as demo data and is loaded through an API adapter
// (src/services/api.ts) so it can be replaced with real backend endpoints
// without rewriting any component.
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
  { slug: 'north-indian', name: 'North Indian', group: 'restaurant', emoji: '🍛', description: 'Rich, aromatic curries and classic North Indian mains' },
  { slug: 'meals', name: 'Meals & Combos', group: 'restaurant', emoji: '🍱', description: 'Complete family meals and value combos' },
  { slug: 'thali', name: 'Thali', group: 'restaurant', emoji: '🍽️', description: 'Hearty platters with a little of everything' },
  { slug: 'paneer', name: 'Paneer Dishes', group: 'restaurant', emoji: '🧀', description: 'Soft paneer in creamy, spiced gravies' },
  { slug: 'dal', name: 'Dal & Lentils', group: 'restaurant', emoji: '🥣', description: 'Slow-cooked lentils and dals' },
  { slug: 'rice', name: 'Rice & Biryani', group: 'restaurant', emoji: '🍚', description: 'Fragrant rice, pulao and biryani' },
  { slug: 'roti', name: 'Roti & Bread', group: 'restaurant', emoji: '🫓', description: 'Fresh tandoor breads and rotis' },
  { slug: 'sweets', name: 'Traditional Sweets', group: 'sweets', emoji: '🍮', description: 'Classic Indian mithai made in pure ghee' },
  { slug: 'bengali-sweets', name: 'Bengali Sweets', group: 'sweets', emoji: '🧁', description: 'Chenna-based Bengali delicacies' },
  { slug: 'dry-sweets', name: 'Dry Sweets', group: 'sweets', emoji: '🍪', description: 'Dry fruit and barfi varieties by weight' },
  { slug: 'samosa', name: 'Samosa', group: 'snacks', emoji: '🥟', description: 'Crispy stuffed samosas' },
  { slug: 'kachori', name: 'Kachori', group: 'snacks', emoji: '🍩', description: 'Flaky, spiced kachoris' },
  { slug: 'snacks', name: 'Snacks', group: 'snacks', emoji: '🥘', description: 'Popular savoury tea-time snacks' },
  { slug: 'fast-food', name: 'Fast Food', group: 'snacks', emoji: '🍔', description: "Quick, filling Indo-Chinese and street food" },
  { slug: 'beverages', name: 'Beverages', group: 'beverages', emoji: '🥤', description: 'Tea, coffee, lassi and refreshing drinks' },
];

export const PRODUCTS: Product[] = [
  // --- North Indian ---
  {
    id: 'p001', name: 'Paneer Butter Masala', categorySlug: 'paneer',
    description: 'Soft paneer cubes simmered in a rich tomato-butter gravy with aromatic spices.',
    price: 240, foodType: 'veg', bestseller: true, todaySpecial: false, available: true,
    ingredients: ['Paneer', 'Tomato', 'Butter', 'Cream', 'Garam masala'], serves: '2-3 people',
    imageHue: 18, imageAccent: '#D9542B', imagePattern: 'curry', spiceLevel: 2,
  },
  {
    id: 'p002', name: 'Dal Makhani', categorySlug: 'dal',
    description: 'Black urad dal slow-cooked overnight with butter, cream and tomatoes.',
    price: 180, foodType: 'veg', bestseller: true, available: true,
    ingredients: ['Urad dal', 'Butter', 'Cream', 'Tomato'], serves: '2-3 people',
    imageHue: 28, imageAccent: '#7B4A24', imagePattern: 'bowl', spiceLevel: 1,
  },
  {
    id: 'p003', name: 'Shahi Paneer', categorySlug: 'paneer',
    description: 'Paneer in a royal gravy of cashews, cream and mild aromatic spices.',
    price: 250, foodType: 'veg', available: true,
    ingredients: ['Paneer', 'Cashew', 'Cream'], serves: '2-3 people',
    imageHue: 34, imageAccent: '#E0A24A', imagePattern: 'curry', spiceLevel: 1,
  },
  {
    id: 'p004', name: 'Chana Masala', categorySlug: 'north-indian',
    description: 'Chickpeas cooked in a tangy, spiced onion-tomato masala.',
    price: 160, foodType: 'veg', available: true,
    ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Spices'], serves: '2-3 people',
    imageHue: 42, imageAccent: '#C7852E', imagePattern: 'curry', spiceLevel: 2,
  },
  // --- Meals & Thali ---
  {
    id: 'p005', name: 'Veg Thali', categorySlug: 'thali',
    description: 'A complete platter: two sabzis, dal, rice, 4 rotis, salad, papad and sweet.',
    price: 220, foodType: 'veg', bestseller: true, available: true, serves: '1 person',
    imageHue: 20, imageAccent: '#B5532B', imagePattern: 'plate', spiceLevel: 2,
  },
  {
    id: 'p006', name: 'Family Combo Meal', categorySlug: 'meals',
    description: 'Serves 4: paneer sabzi, dal, jeera rice, 8 rotis, salad, raita and gulab jamun.',
    price: 520, foodType: 'veg', bestseller: true, todaySpecial: true, available: true, serves: '4 people',
    imageHue: 24, imageAccent: '#A8451E', imagePattern: 'plate', spiceLevel: 2,
  },
  {
    id: 'p007', name: 'Mini Meal', categorySlug: 'meals',
    description: 'One sabzi, dal, rice and 3 rotis — a quick, satisfying meal.',
    price: 140, foodType: 'veg', available: true, serves: '1 person',
    imageHue: 30, imageAccent: '#C2651F', imagePattern: 'plate', spiceLevel: 2,
  },
  // --- Dal ---
  {
    id: 'p008', name: 'Dal Tadka', categorySlug: 'dal',
    description: 'Yellow dal tempered with cumin, garlic and dried red chilli.',
    price: 150, foodType: 'veg', available: true,
    ingredients: ['Toor dal', 'Garlic', 'Cumin'], serves: '2-3 people',
    imageHue: 44, imageAccent: '#D9A82E', imagePattern: 'bowl', spiceLevel: 1,
  },
  {
    id: 'p009', name: 'Dal Fry', categorySlug: 'dal',
    description: 'Mixed dal finished with a fragrant onion-tomato tadka.',
    price: 150, foodType: 'veg', available: true, serves: '2-3 people',
    imageHue: 46, imageAccent: '#E0B23A', imagePattern: 'bowl', spiceLevel: 1,
  },
  // --- Rice ---
  {
    id: 'p010', name: 'Veg Biryani', categorySlug: 'rice',
    description: 'Fragrant basmati rice layered with spiced vegetables and saffron.',
    price: 190, foodType: 'veg', bestseller: true, available: true, serves: '2 people',
    imageHue: 40, imageAccent: '#D98A2B', imagePattern: 'bowl', spiceLevel: 2,
  },
  {
    id: 'p011', name: 'Jeera Rice', categorySlug: 'rice',
    description: 'Basmati rice tempered with cumin seeds and ghee.',
    price: 110, foodType: 'veg', available: true, serves: '2 people',
    imageHue: 50, imageAccent: '#E4C24A', imagePattern: 'bowl', spiceLevel: 1,
  },
  {
    id: 'p012', name: 'Veg Pulao', categorySlug: 'rice',
    description: 'Rice cooked with mixed vegetables and whole spices.',
    price: 140, foodType: 'veg', available: true, serves: '2 people',
    imageHue: 48, imageAccent: '#D9B04A', imagePattern: 'bowl', spiceLevel: 1,
  },
  // --- Roti ---
  {
    id: 'p013', name: 'Butter Naan', categorySlug: 'roti',
    description: 'Soft tandoor-baked naan brushed with butter.',
    price: 40, foodType: 'veg', available: true,
    imageHue: 38, imageAccent: '#E4C896', imagePattern: 'bread', spiceLevel: 1,
  },
  {
    id: 'p014', name: 'Tandoori Roti', categorySlug: 'roti',
    description: 'Whole-wheat roti baked in the tandoor.',
    price: 25, foodType: 'veg', available: true,
    imageHue: 30, imageAccent: '#C9A06E', imagePattern: 'bread', spiceLevel: 1,
  },
  {
    id: 'p015', name: 'Laccha Paratha', categorySlug: 'roti',
    description: 'Flaky, layered whole-wheat paratha.',
    price: 45, foodType: 'veg', available: true,
    imageHue: 34, imageAccent: '#D9B27A', imagePattern: 'bread', spiceLevel: 1,
  },
  // --- Traditional Sweets (weight variants) ---
  {
    id: 'p016', name: 'Gulab Jamun', categorySlug: 'sweets',
    description: 'Soft milk-solid dumplings soaked in warm cardamom-saffron syrup.',
    price: 320, foodType: 'veg', bestseller: true, available: true,
    hasWeightVariants: true,
    imageHue: 22, imageAccent: '#8B4A1F', imagePattern: 'sweet',
  },
  {
    id: 'p017', name: 'Rasgulla', categorySlug: 'bengali-sweets',
    description: 'Spongy chenna balls in light sugar syrup — a Bengali classic.',
    price: 340, foodType: 'veg', bestseller: true, available: true,
    hasWeightVariants: true,
    imageHue: 48, imageAccent: '#E8D08A', imagePattern: 'sweet',
  },
  {
    id: 'p018', name: 'Kaju Katli', categorySlug: 'dry-sweets',
    description: 'Thin silver-leafed slices of cashew fudge.',
    price: 720, foodType: 'veg', bestseller: true, available: true,
    hasWeightVariants: true,
    imageHue: 40, imageAccent: '#E4C98A', imagePattern: 'sweet',
  },
  {
    id: 'p019', name: 'Besan Laddu', categorySlug: 'sweets',
    description: 'Roasted gram-flour laddus with ghee and cardamom.',
    price: 380, foodType: 'veg', available: true,
    hasWeightVariants: true,
    imageHue: 42, imageAccent: '#D9A04A', imagePattern: 'sweet',
  },
  {
    id: 'p020', name: 'Sandesh', categorySlug: 'bengali-sweets',
    description: 'Delicate Bengali sweet of fresh chenna and sugar.',
    price: 360, foodType: 'veg', available: true,
    hasWeightVariants: true,
    imageHue: 32, imageAccent: '#E8C28A', imagePattern: 'sweet',
  },
  {
    id: 'p021', name: 'Soan Papdi', categorySlug: 'dry-sweets',
    description: 'Flaky, melt-in-mouth sweet with gram flour, ghee and sugar.',
    price: 300, foodType: 'veg', available: true,
    hasWeightVariants: true,
    imageHue: 44, imageAccent: '#E4C26A', imagePattern: 'sweet',
  },
  // --- Samosa / Kachori ---
  {
    id: 'p022', name: 'Aloo Samosa', categorySlug: 'samosa',
    description: 'Crispy pastry stuffed with spiced potato and peas.',
    price: 25, foodType: 'veg', bestseller: true, available: true,
    imageHue: 30, imageAccent: '#C2862E', imagePattern: 'fried',
  },
  {
    id: 'p023', name: 'Pyaz Kachori', categorySlug: 'kachori',
    description: 'Flaky kachori filled with spiced onion stuffing.',
    price: 30, foodType: 'veg', available: true,
    imageHue: 34, imageAccent: '#B57A2A', imagePattern: 'fried',
  },
  {
    id: 'p024', name: 'Mawa Kachori', categorySlug: 'kachori',
    description: 'A sweet-savoury kachori filled with mawa and nuts.',
    price: 40, foodType: 'veg', todaySpecial: true, available: true,
    imageHue: 28, imageAccent: '#A06A2A', imagePattern: 'fried',
  },
  // --- Snacks ---
  {
    id: 'p025', name: 'Khandvi', categorySlug: 'snacks',
    description: 'Soft rolled gram-flour snack tempered with mustard and coconut.',
    price: 60, foodType: 'veg', available: true,
    imageHue: 46, imageAccent: '#E4C26A', imagePattern: 'dry',
  },
  {
    id: 'p026', name: 'Dhokla', categorySlug: 'snacks',
    description: 'Steamed fermented gram-flour cake, light and spongy.',
    price: 50, foodType: 'veg', available: true,
    imageHue: 50, imageAccent: '#E4C850', imagePattern: 'dry',
  },
  {
    id: 'p027', name: 'Mix Pakora', categorySlug: 'snacks',
    description: 'Assorted vegetable fritters, crisp and golden.',
    price: 55, foodType: 'veg', todaySpecial: true, available: true,
    imageHue: 36, imageAccent: '#C2862E', imagePattern: 'fried',
  },
  // --- Fast Food ---
  {
    id: 'p028', name: 'Veg Hakka Noodles', categorySlug: 'fast-food',
    description: 'Stir-fried noodles with crunchy vegetables and sauces.',
    price: 130, foodType: 'veg', available: true, serves: '1-2 people',
    imageHue: 40, imageAccent: '#C9A05A', imagePattern: 'bowl', spiceLevel: 2,
  },
  {
    id: 'p029', name: 'Veg Manchurian', categorySlug: 'fast-food',
    description: 'Fried vegetable balls tossed in a tangy Indo-Chinese sauce.',
    price: 140, foodType: 'veg', available: true, serves: '1-2 people',
    imageHue: 26, imageAccent: '#A0502A', imagePattern: 'bowl', spiceLevel: 3,
  },
  {
    id: 'p030', name: 'Pav Bhaji', categorySlug: 'fast-food',
    description: 'Spiced mashed-vegetable curry served with buttered pav.',
    price: 110, foodType: 'veg', bestseller: true, available: true, serves: '1 person',
    imageHue: 16, imageAccent: '#B8362A', imagePattern: 'plate', spiceLevel: 2,
  },
  // --- Beverages ---
  {
    id: 'p031', name: 'Masala Chai', categorySlug: 'beverages',
    description: 'Hot Indian tea brewed with milk, ginger and cardamom.',
    price: 25, foodType: 'veg', available: true,
    imageHue: 28, imageAccent: '#9C6A3A', imagePattern: 'drink',
  },
  {
    id: 'p032', name: 'Sweet Lassi', categorySlug: 'beverages',
    description: 'Chilled, creamy sweet yogurt drink.',
    price: 50, foodType: 'veg', available: true,
    imageHue: 48, imageAccent: '#F0E2B0', imagePattern: 'drink',
  },
  {
    id: 'p033', name: 'Salted Buttermilk', categorySlug: 'beverages',
    description: 'Refreshing chaas with cumin, mint and curry leaves.',
    price: 35, foodType: 'veg', available: true,
    imageHue: 54, imageAccent: '#E8DCA0', imagePattern: 'drink',
  },
  {
    id: 'p034', name: 'Filter Coffee', categorySlug: 'beverages',
    description: 'Strong, aromatic South Indian filter coffee.',
    price: 40, foodType: 'veg', available: true,
    imageHue: 22, imageAccent: '#6B4A2A', imagePattern: 'drink',
  },
];
