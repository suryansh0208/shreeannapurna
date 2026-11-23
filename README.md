# Shree Annapurna Restaurant & Sweet — Customer Website

A production-quality, customer-facing online food ordering website for **Shree Annapurna Restaurant & Sweet**, India. Built with React, Vite, Tailwind CSS, React Router, and Lucide icons.

## Features

- **Home page** — announcement bar, hero, category grid, bestsellers, today's specials, sweets showcase, restaurant dishes, family combos, why-choose-us, offers, testimonials, location section, and footer.
- **Menu page** — category filters, search, veg/non-veg filter, sorting, product cards, add-to-cart with quantity controls.
- **Restaurant & Sweets pages** — focused browsing of restaurant dishes and sweets respectively.
- **Product details** — full description, ingredients, serves info, spice level, weight-variant selector for sweets (250g / 500g / 1kg), quantity, and add-to-cart.
- **Cart** — editable quantities, remove items, coupon field, delivery fee estimate, discount, and order summary. Persisted across refreshes.
- **Checkout** — customer details, delivery address with pincode serviceability check, fulfilment selector (delivery/takeaway), delivery slot (when configured), order notes, payment selector (Razorpay / COD), and order summary.
- **Order success & payment status** — clear states for pending, success, failed, and cancelled payments.
- **Track order** — order ID + phone lookup with a status timeline (Placed → Confirmed → Preparing → Ready → Out for Delivery → Delivered / Cancelled).
- **Offers, About, Contact, Privacy Policy, Terms, and 404** pages.
- **Floating WhatsApp button** with pre-filled order message (customer presses Send).
- **Responsive, mobile-first design** with premium Indian food brand aesthetic.
- **SEO** — page titles, meta descriptions, semantic HTML, Open Graph tags, canonical links.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router (client-side routing)
- Zustand (cart state, persisted to localStorage)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

The site runs out of the box using demo data. To connect a real backend, see the **Backend Integration** section below.

### Build

```bash
npm run build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of your backend API (e.g. `http://localhost:5000/api`). When unset, the site uses demo data. |
| `VITE_RAZORPAY_KEY_ID` | Razorpay **public** key (`key_id`). Never put the secret key in the frontend. |

## Configuration

All restaurant-specific configuration lives in `src/config/site.ts`:

- **Business details** — name, phone, WhatsApp number, email, address, map links, opening hours.
- **Delivery zones** — array of pincodes with delivery fees and estimated times. Empty by default; add entries to enable pincode-based delivery fee calculation.
- **Delivery slots** — array of time slots shown at checkout when populated.
- **Offers / coupons** — coupon codes, discount types, min order values, and validity.
- **Tax rate (GST)** — percentage applied at checkout. Set to `0` (taxes included) by default.
- **Delivery fee & free-delivery threshold** — default values used when no delivery zone matches.

Demo product data lives in `src/data/mockData.ts` and is clearly marked as demo data.

## Architecture

```
src/
├── components/
│   ├── cart/          # CartDrawer, CartSummary
│   ├── checkout/      # CheckoutForm, PaymentSelector, OrderTimeline
│   ├── home/          # Hero, OfferCard, TestimonialCard
│   ├── layout/        # Navbar, MobileNavbar, Footer, AnnouncementBar, WhatsAppButton
│   ├── product/       # ProductCard, ProductGrid, CategoryCard, SearchBar, FilterSidebar, VariantSelector, QuantitySelector
│   └── ui/            # Button, FoodImage, LoadingSkeleton, States (EmptyState, ErrorState)
├── config/            # Site configuration (business details, offers, delivery zones)
├── data/              # Demo/mock product data
├── hooks/             # useSEO, useCoupon
├── pages/             # All page components
├── services/          # API adapter (swap mock data → real backend here)
├── store/             # Zustand cart store (persisted)
├── types/             # TypeScript types
└── utils/             # Formatting & validation helpers
```

### API Adapter

All data flows through `src/services/api.ts`. Today it returns demo data from `mockData.ts`; when the backend is ready, only this file changes — no component rewrite needed. Set `VITE_API_BASE_URL` to switch from mock to live data.

## Backend Integration

The following backend API endpoints are required to make ordering, payments, and tracking fully functional. The frontend is already wired to call them through the API adapter.

### 1. Products & Categories

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories` | List all categories |
| `GET` | `/products` | List all products |
| `GET` | `/products/:id` | Get a single product |
| `GET` | `/offers` | List active offers/coupons |

### 2. Orders

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/orders` | Place a new order. Body: `{ customer, fulfilment, items, subtotal, discount, tax, deliveryFee, total, paymentMethod, ... }`. Returns `{ orderId }`. |
| `GET` | `/orders/track?id=<orderId>&phone=<phone>` | Look up an order by ID + phone. Returns `{ status, items, total, placedAt }` or `404`. |

**Order status values:** `placed`, `confirmed`, `preparing`, `ready`, `out-for-delivery`, `delivered`, `cancelled`.

### 3. Payments (Razorpay)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/payments/razorpay/order` | Create a Razorpay order. Body: `{ amount }` (in INR). Returns `{ orderId }` (Razorpay order ID). |
| `POST` | `/payments/razorpay/verify` | Verify the payment signature. Body: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`. Returns `{ verified: boolean }`. |

**Important:**
- The backend must create the Razorpay order and verify the signature/webhook. The frontend never marks a payment as successful on its own.
- The Razorpay **secret key** must live only on the backend. The frontend uses only the public `key_id` (`VITE_RAZORPAY_KEY_ID`).
- COD orders must be labelled as **unpaid** until the amount is collected.

### 4. WhatsApp

- **Manual contact:** The WhatsApp button and contact form use `https://wa.me/919241430915` with a pre-filled message. The customer must explicitly press **Send**. This is a manual flow.
- **Automated notifications** (e.g. order confirmation, status updates sent automatically) require the **WhatsApp Business API** integrated on the backend. This is not included in the frontend.

## Important Notes

- **No fake data:** The site does not fabricate reviews, ratings, payment confirmations, live tracking data, prices, or delivery promises. Placeholders are clearly marked and configurable.
- **Demo data is clearly marked** in `src/data/mockData.ts`.
- **Pincode serviceability** checks against configured delivery zones in `src/config/site.ts`. When no zones are configured, orders can still be placed.
- **INR formatting** is used throughout (`Intl.NumberFormat` with `currency: 'INR'`).
- **Every visible button is functional** — no dead links or placeholder buttons.

## License

© Shree Annapurna Restaurant & Sweet. All rights reserved.
