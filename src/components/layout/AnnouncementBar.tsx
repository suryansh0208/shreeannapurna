import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ANNOUNCEMENTS } from '@/config/site';

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ANNOUNCEMENTS.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  if (ANNOUNCEMENTS.length === 0) return null;

  return (
    <div className="relative flex h-9 items-center justify-center overflow-hidden bg-maroon-700 px-10 text-cream-100">
      <button
        aria-label="Previous announcement"
        onClick={() => setIndex((i) => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
        className="absolute left-2 flex h-6 w-6 items-center justify-center rounded-full text-cream-100/70 hover:text-cream-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <p key={index} className="animate-fadeIn truncate text-center text-xs font-medium tracking-wide sm:text-sm">
        {ANNOUNCEMENTS[index]}
      </p>
      <button
        aria-label="Next announcement"
        onClick={() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length)}
        className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-cream-100/70 hover:text-cream-100"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
