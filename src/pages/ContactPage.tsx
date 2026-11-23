import { useState } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { BUSINESS } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { validateMobile } from '@/utils/format';

export function ContactPage() {
  useSEO({ title: 'Contact', description: 'Get in touch with Shree Annapurna Restaurant & Sweet.', path: '/contact' });

  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; mobile?: string } = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    const mobileErr = validateMobile(form.mobile);
    if (mobileErr) errs.mobile = mobileErr;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Build a WhatsApp message — the customer presses Send themselves
      const msg = `Hello Shree Annapurna, my name is ${form.name}. ${form.message}`;
      window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
      setSent(true);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-maroon-700">Get in Touch</h1>
        <p className="mx-auto mt-3 max-w-xl text-brown-600">
          Have a question, a bulk order enquiry, or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact info */}
        <div className="space-y-4">
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Visit Us">
            <p className="text-sm text-brown-600">
              {BUSINESS.addressLine1}<br />
              {BUSINESS.addressLine2}<br />
              {BUSINESS.city}, {BUSINESS.state} — {BUSINESS.pincode}
            </p>
          </ContactCard>

          <ContactCard icon={<Phone className="h-5 w-5" />} title="Call Us">
            <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="text-sm font-medium text-maroon-600 hover:text-maroon-700">
              {BUSINESS.phone}
            </a>
          </ContactCard>

          <ContactCard icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp">
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-maroon-600 hover:text-maroon-700">
              Chat with us — {BUSINESS.phone}
            </a>
            <p className="mt-1 text-xs text-brown-400">You will press Send yourself.</p>
          </ContactCard>

          <ContactCard icon={<Mail className="h-5 w-5" />} title="Email">
            <a href={`mailto:${BUSINESS.email}`} className="text-sm font-medium text-maroon-600 hover:text-maroon-700">
              {BUSINESS.email}
            </a>
          </ContactCard>

          <ContactCard icon={<Clock className="h-5 w-5" />} title="Opening Hours">
            <p className="text-sm text-brown-600">{BUSINESS.openingHoursNote}</p>
          </ContactCard>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-cream-300 bg-white p-6 shadow-card sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="h-14 w-14 text-veg-500" />
              <h2 className="mt-4 font-serif text-xl font-semibold text-maroon-700">Message Ready!</h2>
              <p className="mt-2 max-w-sm text-sm text-brown-600">
                We've opened WhatsApp with your message pre-filled. Please press Send to share it with us.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => { setSent(false); setForm({ name: '', mobile: '', message: '' }); }}>
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-serif text-xl font-semibold text-maroon-700">Send a Message</h2>
              <p className="mt-1 text-sm text-brown-500">Your message will open in WhatsApp for you to send.</p>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-brown-600">Your Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: undefined })); }}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
                  />
                  {errors.name && <span className="mt-1 block text-xs text-nonveg-500">{errors.name}</span>}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-brown-600">Mobile Number</span>
                  <input
                    value={form.mobile}
                    onChange={(e) => { setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })); setErrors((er) => ({ ...er, mobile: undefined })); }}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    className="w-full rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
                  />
                  {errors.mobile && <span className="mt-1 block text-xs text-nonveg-500">{errors.mobile}</span>}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-brown-600">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Your question, enquiry or feedback…"
                    rows={4}
                    className="w-full rounded-xl border border-cream-300 px-3.5 py-2.5 text-sm focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/40"
                  />
                </label>

                <Button type="submit" size="lg" className="w-full" leftIcon={<Send className="h-4 w-4" />}>
                  Send via WhatsApp
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-10 flex min-h-[280px] items-center justify-center rounded-2xl border border-cream-300 bg-cream-100 p-8 text-center">
        <div>
          <MapPin className="mx-auto h-10 w-10 text-gold-500" />
          <p className="mt-3 text-sm text-brown-500">A map will appear here once the Google Maps embed URL is configured.</p>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">{icon}</span>
        <h3 className="font-serif text-base font-semibold text-maroon-700">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
