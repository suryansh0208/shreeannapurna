import type { Category, Offer, OrderStatus, Product } from '@/types';
import { CATEGORIES, PRODUCTS } from '@/data/mockData';
import { OFFERS } from '@/config/site';

// ---------------------------------------------------------------------------
// API ADAPTER
// ---------------------------------------------------------------------------
// All components consume data through this service. Today it returns demo
// data from src/data/mockData.ts; when the real Node.js / Express / MongoDB
// backend is ready, only this file changes — components stay untouched.
//
// Set VITE_API_BASE_URL to point at the backend; when unset we fall back to
// mock data so the site runs out of the box.
// ---------------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_MOCK = !API_BASE_URL;

function delay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// ---- Products -------------------------------------------------------------
export const api = {
  async getCategories(): Promise<Category[]> {
    if (USE_MOCK) return delay(CATEGORIES);
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to load categories');
    return res.json();
  },

  async getProducts(): Promise<Product[]> {
    if (USE_MOCK) return delay(PRODUCTS);
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  },

  async getProduct(id: string): Promise<Product | null> {
    if (USE_MOCK) return delay(PRODUCTS.find((p) => p.id === id) ?? null);
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  async getOffers(): Promise<Offer[]> {
    if (USE_MOCK) return delay(OFFERS);
    const res = await fetch(`${API_BASE_URL}/offers`);
    if (!res.ok) throw new Error('Failed to load offers');
    return res.json();
  },

  // ---- Orders -------------------------------------------------------------
  // These endpoints are REQUIRED from the backend. See README for the full
  // contract. They intentionally do not run against mock data for order
  // placement/tracking — those flows surface a clear "backend required"
  // state instead of fabricating data.
  async placeOrder(payload: unknown): Promise<{ orderId: string }> {
    if (USE_MOCK) {
      throw new Error(
        'Order placement requires the backend (POST /api/orders). See README.',
      );
    }
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to place order');
    return res.json();
  },

  async trackOrder(orderId: string, phone: string): Promise<{
    status: OrderStatus;
    items: { name: string; quantity: number }[];
    total: number;
    placedAt: string;
  } | null> {
    if (USE_MOCK) {
      throw new Error(
        'Order tracking requires the backend (GET /api/orders/track). See README.',
      );
    }
    const res = await fetch(
      `${API_BASE_URL}/orders/track?id=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`,
    );
    if (!res.ok) return null;
    return res.json();
  },

  // ---- Payments -----------------------------------------------------------
  // Razorpay order creation MUST happen on the backend. The frontend only
  // receives a server-created order id and opens the checkout.
  async createRazorpayOrder(amount: number): Promise<{ orderId: string }> {
    if (USE_MOCK) {
      throw new Error(
        'Razorpay order creation requires the backend (POST /api/payments/razorpay/order). See README.',
      );
    }
    const res = await fetch(`${API_BASE_URL}/payments/razorpay/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    if (!res.ok) throw new Error('Failed to create payment order');
    return res.json();
  },

  async verifyRazorpayPayment(signature: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ verified: boolean }> {
    if (USE_MOCK) {
      throw new Error(
        'Signature verification requires the backend (POST /api/payments/razorpay/verify). See README.',
      );
    }
    const res = await fetch(`${API_BASE_URL}/payments/razorpay/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signature),
    });
    if (!res.ok) throw new Error('Payment verification failed');
    return res.json();
  },
};

// ---- Razorpay checkout loader --------------------------------------------
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-checkout-js')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as
  | string
  | undefined;
