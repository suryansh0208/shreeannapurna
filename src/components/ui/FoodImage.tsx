import { classNames } from '@/utils/format';

interface FoodImageProps {
  hue: number;
  accent: string;
  pattern: 'curry' | 'dry' | 'bowl' | 'bread' | 'drink' | 'sweet' | 'plate' | 'fried';
  name: string;
  className?: string;
  rounded?: string;
}

/**
 * Generates an elegant, deterministic plate visual for a product.
 * Uses layered gradients and SVG shapes so the site has reliable,
 * license-free imagery for every dish without external requests.
 */
export function FoodImage({
  hue,
  accent,
  pattern,
  name,
  className,
  rounded = 'rounded-2xl',
}: FoodImageProps) {
  const bg = `hsl(${hue} 70% 92%)`;
  const bgDeep = `hsl(${hue} 55% 78%)`;
  const plate = `hsl(${hue} 25% 96%)`;
  const plateEdge = `hsl(${hue} 20% 86%)`;

  return (
    <div
      className={classNames('relative overflow-hidden', rounded, className)}
      style={{ background: `linear-gradient(135deg, ${bg}, ${bgDeep})` }}
      role="img"
      aria-label={name}
    >
      <PlatePattern pattern={pattern} accent={accent} hue={hue} plate={plate} plateEdge={plateEdge} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
      <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-brown-700 backdrop-blur-sm">
          {name}
        </span>
      </div>
    </div>
  );
}

function PlatePattern({
  pattern,
  accent,
  hue,
  plate,
  plateEdge,
}: {
  pattern: FoodImageProps['pattern'];
  accent: string;
  hue: number;
  plate: string;
  plateEdge: string;
}) {
  const steam = `hsl(${hue} 40% 95%)`;
  const id = `g-${hue}-${pattern}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-plate`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={plate} />
          <stop offset="100%" stopColor={plateEdge} />
        </radialGradient>
        <radialGradient id={`${id}-food`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="100" rx="78" ry="70" fill={`url(#${id}-plate)`} />
      <ellipse cx="100" cy="100" rx="78" ry="70" fill={`url(#${id}-glow)`} />

      {pattern === 'curry' && (
        <g>
          <ellipse cx="100" cy="98" rx="52" ry="40" fill={`url(#${id}-food)`} />
          <ellipse cx="84" cy="88" rx="10" ry="8" fill={steam} opacity="0.5" />
          <ellipse cx="116" cy="104" rx="9" ry="7" fill={steam} opacity="0.45" />
          <ellipse cx="100" cy="92" rx="6" ry="5" fill={steam} opacity="0.4" />
          <path d="M60 70 Q70 58 80 70" stroke={steam} strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />
          <path d="M120 66 Q130 54 140 66" stroke={steam} strokeWidth="2.5" fill="none" opacity="0.35" strokeLinecap="round" />
        </g>
      )}

      {pattern === 'bowl' && (
        <g>
          <path d="M48 92 Q100 150 152 92 Z" fill={`url(#${id}-food)`} />
          <ellipse cx="100" cy="92" rx="52" ry="12" fill={accent} opacity="0.85" />
          <ellipse cx="100" cy="90" rx="40" ry="7" fill={steam} opacity="0.35" />
          <circle cx="86" cy="90" r="3" fill={steam} opacity="0.6" />
          <circle cx="112" cy="92" r="2.5" fill={steam} opacity="0.6" />
        </g>
      )}

      {pattern === 'bread' && (
        <g>
          <ellipse cx="100" cy="110" rx="60" ry="20" fill={`url(#${id}-food)`} />
          <ellipse cx="100" cy="104" rx="58" ry="16" fill={accent} />
          <path d="M48 104 Q60 94 72 104" stroke={steam} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M82 102 Q92 92 102 102" stroke={steam} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M112 104 Q124 94 136 104" stroke={steam} strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>
      )}

      {pattern === 'drink' && (
        <g>
          <path d="M74 58 L126 58 L120 130 Q100 140 80 130 Z" fill={`url(#${id}-food)`} />
          <path d="M74 58 L126 58 L122 70 L78 70 Z" fill={accent} opacity="0.8" />
          <ellipse cx="100" cy="58" rx="26" ry="6" fill={steam} opacity="0.5" />
          <circle cx="92" cy="90" r="4" fill={steam} opacity="0.5" />
          <circle cx="108" cy="100" r="3" fill={steam} opacity="0.4" />
        </g>
      )}

      {pattern === 'sweet' && (
        <g>
          <circle cx="80" cy="100" r="22" fill={`url(#${id}-food)`} />
          <circle cx="120" cy="100" r="22" fill={`url(#${id}-food)`} />
          <circle cx="100" cy="118" r="22" fill={`url(#${id}-food)`} />
          <circle cx="80" cy="100" r="8" fill={steam} opacity="0.5" />
          <circle cx="120" cy="100" r="8" fill={steam} opacity="0.5" />
          <circle cx="100" cy="118" r="8" fill={steam} opacity="0.5" />
        </g>
      )}

      {pattern === 'fried' && (
        <g>
          <path d="M70 130 L100 60 L130 130 Z" fill={`url(#${id}-food)`} />
          <path d="M70 130 L100 60 L130 130 Z" fill="none" stroke={accent} strokeWidth="3" opacity="0.6" />
          <path d="M82 120 L100 80 L118 120" stroke={steam} strokeWidth="2" fill="none" opacity="0.4" />
        </g>
      )}

      {pattern === 'dry' && (
        <g>
          <rect x="56" y="72" width="88" height="56" rx="10" fill={`url(#${id}-food)`} />
          <rect x="56" y="72" width="88" height="56" rx="10" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
          <line x1="64" y1="90" x2="136" y2="90" stroke={steam} strokeWidth="2" opacity="0.3" />
          <line x1="64" y1="106" x2="136" y2="106" stroke={steam} strokeWidth="2" opacity="0.3" />
        </g>
      )}

      {pattern === 'plate' && (
        <g>
          <circle cx="70" cy="95" r="22" fill={`url(#${id}-food)`} />
          <circle cx="130" cy="95" r="22" fill={`url(#${id}-food)`} opacity="0.85" />
          <circle cx="100" cy="120" r="24" fill={`url(#${id}-food)`} opacity="0.75" />
          <rect x="46" y="60" width="40" height="14" rx="7" fill={accent} opacity="0.7" />
          <rect x="114" y="60" width="40" height="14" rx="7" fill={accent} opacity="0.7" />
        </g>
      )}
    </svg>
  );
}
