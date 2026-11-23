import { useSEO } from '@/hooks/useSEO';
import { BUSINESS } from '@/config/site';

export function PrivacyPolicyPage() {
  useSEO({ title: 'Privacy Policy', description: 'Privacy policy for Shree Annapurna Restaurant & Sweet.', path: '/privacy-policy' });
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl font-bold text-maroon-700">Privacy Policy</h1>
      <p className="mt-2 text-sm text-brown-400">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-brown-600 leading-relaxed">
        <Section title="Introduction">
          <p>{BUSINESS.name} ("we", "us", "our") respects your privacy and is committed to protecting your personal information. This policy explains how we collect, use and safeguard your data when you use our website and place orders.</p>
        </Section>

        <Section title="Information We Collect">
          <ul className="ml-4 list-disc space-y-1.5">
            <li><strong>Contact details:</strong> name, mobile number, and delivery address when you place an order.</li>
            <li><strong>Order details:</strong> the items you order, quantities, and delivery preferences.</li>
            <li><strong>Payment information:</strong> processed securely through Razorpay. We do not store your card or UPI details on our servers.</li>
            <li><strong>Usage data:</strong> basic browsing information to improve our website experience.</li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <ul className="ml-4 list-disc space-y-1.5">
            <li>To process and deliver your orders.</li>
            <li>To communicate with you about your order status.</li>
            <li>To provide customer support.</li>
            <li>To improve our menu, services and website.</li>
          </ul>
        </Section>

        <Section title="Payment Security">
          <p>Online payments are processed by Razorpay, a PCI-DSS compliant payment gateway. Payment verification is handled on our backend — we never mark a payment as successful based on frontend callbacks alone. Your card and UPI details are handled entirely by Razorpay and are never transmitted to or stored on our servers.</p>
        </Section>

        <Section title="Data Sharing">
          <p>We do not sell or rent your personal information. We may share necessary details with delivery partners to fulfil your order, and with payment processors to complete transactions.</p>
        </Section>

        <Section title="Your Rights">
          <p>You may request access to, correction of, or deletion of your personal information by contacting us. You can also clear your cart and browsing data from your browser at any time.</p>
        </Section>

        <Section title="Contact">
          <p>For any privacy-related questions, please contact us at {BUSINESS.email} or {BUSINESS.phone}.</p>
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
