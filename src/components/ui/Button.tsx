import { Link } from 'react-router-dom';
import { classNames } from '@/utils/format';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-maroon-500 text-cream-100 hover:bg-maroon-600 active:bg-maroon-700 shadow-sm',
  secondary:
    'bg-gold-400 text-maroon-800 hover:bg-gold-300 active:bg-gold-500 shadow-sm',
  outline:
    'border-2 border-maroon-500 text-maroon-700 hover:bg-maroon-50 active:bg-maroon-100',
  ghost: 'text-maroon-700 hover:bg-maroon-50 active:bg-maroon-100',
  gold: 'bg-gradient-to-r from-gold-300 to-gold-400 text-maroon-800 hover:from-gold-400 hover:to-gold-300 shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={classNames(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  );
}
