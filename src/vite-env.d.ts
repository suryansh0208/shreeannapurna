/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Razorpay?: new (options: {
    key_id: string;
    amount: number;
    currency: string;
    name: string;
    order_id?: string;
    prefill?: { name?: string; contact?: string; email?: string };
    handler: (response: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => void;
    modal?: { ondismiss?: () => void };
  }) => { open: () => void };
}
