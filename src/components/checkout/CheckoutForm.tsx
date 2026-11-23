import { Truck, Store, MapPin, Phone, User, MessageSquare, CalendarClock } from 'lucide-react';
import type { CheckoutForm as FormType, FulfilmentType } from '@/types';
import { DELIVERY_SLOTS, DELIVERY_ZONES } from '@/config/site';
import { validateMobile, validatePincode, classNames } from '@/utils/format';

interface CheckoutFormProps {
  form: FormType;
  errors: Partial<Record<keyof FormType, string>>;
  onChange: (field: keyof FormType, value: string) => void;
  pincodeStatus: 'idle' | 'checking' | 'serviceable' | 'nonserviceable';
}

export function CheckoutForm({ form, errors, onChange, pincodeStatus }: CheckoutFormProps) {
  const isDelivery = form.fulfilment === 'delivery';

  return (
    <div className="space-y-6">
      {/* Fulfilment */}
      <section className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-maroon-700">Delivery or Takeaway?</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <FulfilmentOption
            active={isDelivery}
            onClick={() => onChange('fulfilment', 'delivery')}
            icon={<Truck className="h-5 w-5" />}
            label="Home Delivery"
            description="Delivered to your address"
          />
          <FulfilmentOption
            active={!isDelivery}
            onClick={() => onChange('fulfilment', 'takeaway')}
            icon={<Store className="h-5 w-5" />}
            label="Takeaway"
            description="Pick up from restaurant"
          />
        </div>
      </section>

      {/* Contact details */}
      <section className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-maroon-700">Contact Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" icon={<User className="h-4 w-4" />} error={errors.name}>
            <input
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Your name"
              className={inputClass(errors.name)}
            />
          </Field>
          <Field label="Mobile Number" icon={<Phone className="h-4 w-4" />} error={errors.mobile}>
            <input
              value={form.mobile}
              onChange={(e) => onChange('mobile', e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
              maxLength={10}
              className={inputClass(errors.mobile)}
            />
          </Field>
        </div>
      </section>

      {/* Address (delivery only) */}
      {isDelivery && (
        <section className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
          <h2 className="font-serif text-lg font-semibold text-maroon-700">Delivery Address</h2>
          <div className="mt-4 space-y-4">
            <Field label="Complete Address" icon={<MapPin className="h-4 w-4" />} error={errors.address}>
              <textarea
                value={form.address}
                onChange={(e) => onChange('address', e.target.value)}
                placeholder="House no, building, street, area"
                rows={3}
                className={inputClass(errors.address)}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Pincode" error={errors.pincode}>
                <input
                  value={form.pincode}
                  onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onBlur={() => {
                    // trigger validation via parent through onChange hook
                  }}
                  placeholder="6-digit pincode"
                  inputMode="numeric"
                  maxLength={6}
                  className={inputClass(errors.pincode)}
                />
                {pincodeStatus === 'checking' && <p className="mt-1 text-xs text-brown-400">Checking serviceability…</p>}
                {pincodeStatus === 'nonserviceable' && (
                  <p className="mt-1 text-xs text-nonveg-500">Sorry, we do not deliver to this pincode yet.</p>
                )}
                {pincodeStatus === 'serviceable' && <p className="mt-1 text-xs text-veg-600">Great — we deliver to your area!</p>}
                {DELIVERY_ZONES.length === 0 && (
                  <p className="mt-1 text-xs text-brown-400">Delivery zones not yet configured — order can still be placed.</p>
                )}
              </Field>
              <Field label="Landmark (optional)">
                <input
                  value={form.landmark}
                  onChange={(e) => onChange('landmark', e.target.value)}
                  placeholder="Near…"
                  className={inputClass(undefined)}
                />
              </Field>
            </div>
          </div>
        </section>
      )}

      {/* Delivery slot */}
      {isDelivery && DELIVERY_SLOTS.length > 0 && (
        <section className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-maroon-700">
            <CalendarClock className="h-5 w-5" /> Delivery Slot
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DELIVERY_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => onChange('deliverySlot', slot)}
                className={classNames(
                  'rounded-xl border px-4 py-2 text-sm font-medium transition',
                  form.deliverySlot === slot
                    ? 'border-maroon-500 bg-maroon-500 text-cream-100'
                    : 'border-cream-300 bg-white text-brown-600 hover:border-gold-300',
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      <section className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
        <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-maroon-700">
          <MessageSquare className="h-5 w-5" /> Order Notes (optional)
        </h2>
        <textarea
          value={form.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Any special instructions for your order"
          rows={2}
          className={inputClass(undefined)}
        />
      </section>
    </div>
  );
}

function FulfilmentOption({
  active,
  onClick,
  icon,
  label,
  description,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all',
        active ? 'border-maroon-500 bg-maroon-50' : 'border-cream-300 bg-white hover:border-gold-300',
      )}
    >
      <span className={classNames('flex h-10 w-10 items-center justify-center rounded-lg', active ? 'bg-maroon-500 text-cream-100' : 'bg-cream-200 text-maroon-600')}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-maroon-700">{label}</p>
        <p className="text-xs text-brown-500">{description}</p>
      </div>
    </button>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-brown-600">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-nonveg-500">{error}</span>}
    </label>
  );
}

function inputClass(error?: string): string {
  return classNames(
    'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-brown-700 placeholder:text-brown-400 focus:outline-none focus:ring-2',
    error
      ? 'border-nonveg-500 focus:ring-nonveg-500/30'
      : 'border-cream-300 focus:border-gold-300 focus:ring-gold-300/40',
  );
}

export { validateMobile, validatePincode };
