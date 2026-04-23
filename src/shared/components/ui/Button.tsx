// src/shared/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-rose' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_STYLE: Record<ButtonVariant, { className: string; style: React.CSSProperties }> = {
  primary: {
    className: 'text-white border-none hover:opacity-90 hover:-translate-y-px active:scale-[0.98]',
    style: { background: 'var(--color-rose)', boxShadow: '0 4px 20px rgba(232,82,106,0.3)' },
  },
  secondary: {
    className: 'bg-white border border-black/[0.14] hover:border-[var(--color-ink-soft)] hover:-translate-y-px',
    style: { color: 'var(--color-ink-mid)' },
  },
  ghost: {
    className: 'bg-transparent border border-black/[0.14] hover:border-[var(--color-rose)] hover:opacity-80',
    style: { color: 'var(--color-ink-mid)' },
  },
  'outline-rose': {
    className: 'bg-transparent border hover:bg-[var(--color-rose)] hover:text-white',
    style: { borderColor: 'var(--color-rose)', color: 'var(--color-rose)' },
  },
  danger: {
    className: 'text-white border-none hover:opacity-90',
    style: { background: '#e53e3e' },
  },
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'px-4 py-[7px] text-[12px] rounded-[8px]',
  md: 'px-6 py-[10px] text-[13px] rounded-[10px]',
  lg: 'px-7 py-4 text-[15px] rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const v = VARIANT_STYLE[variant];

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium cursor-pointer outline-none
        transition-all duration-150
        ${SIZE_CLASS[size]}
        ${v.className}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ fontFamily: 'var(--font-sans)', ...v.style, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
