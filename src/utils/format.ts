export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function classNames(...parts: Array<string | false | undefined | null>): string {
  return parts.filter(Boolean).join(' ');
}

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SA${ts}${rand}`;
}

export function maskMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, '');
  if (digits.length < 6) return mobile;
  return `${digits.slice(0, 2)}••••${digits.slice(-2)}`;
}

export function validateMobile(mobile: string): string | null {
  const digits = mobile.replace(/\D/g, '');
  if (!digits) return 'Mobile number is required';
  if (digits.length !== 10) return 'Enter a valid 10-digit mobile number';
  if (!/^[6-9]/.test(digits)) return 'Mobile number must start with 6, 7, 8 or 9';
  return null;
}

export function validatePincode(pincode: string): string | null {
  const digits = pincode.replace(/\D/g, '');
  if (!digits) return 'Pincode is required';
  if (digits.length !== 6) return 'Enter a valid 6-digit pincode';
  return null;
}

export function isValidOrderQuery(id: string, phone: string): boolean {
  return id.trim().length >= 6 && phone.replace(/\D/g, '').length === 10;
}
