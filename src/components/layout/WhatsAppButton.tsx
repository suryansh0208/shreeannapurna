import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS } from '@/config/site';
import { classNames } from '@/utils/format';

export function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);

  const baseMsg = 'Hello Shree Annapurna, I would like to place an order.';
  const href = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(baseMsg)}`;

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
      {showTip && (
        <div className="relative max-w-[220px] animate-fadeIn rounded-2xl bg-white px-4 py-3 shadow-card sm:max-w-[260px]">
          <button
            onClick={() => setShowTip(false)}
            aria-label="Dismiss"
            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-maroon-500 text-cream-100"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-xs font-medium text-brown-700">
            Chat with us on WhatsApp for quick help or to place an order manually.
          </p>
          <p className="mt-1 text-[11px] text-brown-400">
            You will press Send yourself — this is a manual chat, not an automated notification.
          </p>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        onMouseEnter={() => setShowTip(true)}
        className={classNames(
          'flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95',
          'animate-floaty',
        )}
      >
        <MessageCircle className="h-7 w-7" fill="currentColor" />
      </a>
    </div>
  );
}
