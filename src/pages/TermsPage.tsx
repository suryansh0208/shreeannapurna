import { useSEO } from '@/hooks/useSEO';
import { BUSINESS } from '@/config/site';

export function TermsPage() {
  useSEO({ title: 'Terms & Conditions', description: 'Terms and conditions for ordering from Shree Annapurna Restaurant & Sweet.', path: '/terms' });
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-maroon-700">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-brown-400">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-brown-600 leading-relaxed">
        <Section title="Orders">
          <p>By placing an order on our website, you agree to provide accurate contact and delivery details. Orders are subject to acceptance and availability. We reserve the right to decline or cancel an order if the information provided is incorrect or the delivery address is outside our serviceable area.</p>
        </Section>

        <Section title="Pricing">
          <p>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. Delivery fees, if any, are calculated at checkout. We strive to keep prices accurate; in the event of an error, we will inform you before processing your order.</p>
        </Section>

        <Section title="Payments">
          <p>Online payments are processed securely through Razorpay. Payment confirmation is verified on our backend — we do not mark payments as successful based on frontend callbacks alone. Cash on Delivery orders are marked as unpaid until the amount is collected at the time of delivery.</p>
        </Section>

        <Section title="Delivery & Takeaway">
          <p>Delivery times are estimates and may vary based on location, traffic and order volume. Takeaway orders should be collected within the agreed time. We are not liable for delays caused by factors beyond our control.</p>
        </Section>

        <Section title="Cancellations & Refunds">
          <p>Orders may be cancelled before preparation begins. Once preparation has started, cancellation may not be possible. Refunds, where applicable, will be processed to the original payment method within a reasonable timeframe. Please contact us for any cancellation or refund request.</p>
        </Section>

        <Section title="Food Allergens">
          <p>Our food is prepared in a kitchen that handles nuts, dairy, gluten and other common allergens. If you have a food allergy, please mention it in your order notes and contact us before placing your order. We will do our best to accommodate your request but cannot guarantee a fully allergen-free environment.</p>
        </Section>

        <Section title="Bulk & Party Orders">
          <p>For bulk and party orders, please contact us directly on WhatsApp or phone. Advance notice may be required depending on the order size.</p>
        </Section>

        <Section title="Contact">
          <p>For any questions about these terms, please contact us at {BUSINESS.email} or {BUSINESS.phone}.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl font-semibold text-maroon-700">{title}</h2>
      <div className="mt-2 text-sm">{children}</div>
    </section>
  );
}
