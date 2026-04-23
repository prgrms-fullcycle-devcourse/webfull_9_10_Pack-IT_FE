// src/shared/components/ui/Textarea.tsx
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  maxLength?: number;
  currentLength?: number;
  /** 하단 progress bar 표시 여부 */
  showProgress?: boolean;
}

export default function Textarea({
  label,
  required = false,
  maxLength,
  currentLength = 0,
  showProgress = false,
  className = '',
  style,
  ...props
}: TextareaProps) {
  const pct = maxLength ? Math.min(100, Math.round((currentLength / maxLength) * 100)) : 0;

  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label
          className="text-[11px] font-medium tracking-[0.04em]"
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}
        >
          {label}
          {required && (
            <span className="ml-[4px]" style={{ color: 'var(--color-rose)' }}>*</span>
          )}
        </label>
      )}

      {/* textarea + charCount */}
      <div className="relative">
        <textarea
          className={`
            w-full p-4 rounded-xl
            border border-black/[0.14] text-[14px] leading-[1.85]
            resize-none outline-none transition-all
            focus:border-[var(--color-rose)] focus:bg-white
            placeholder:text-[var(--color-ink-soft)]
            ${className}
          `}
          style={{
            fontFamily: 'var(--font-serif)',
            background: 'var(--color-cream)',
            color: 'var(--color-ink)',
            ...style,
          }}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <span
            className="absolute bottom-3 right-[14px] text-[11px]"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}
          >
            {currentLength} / {maxLength}
          </span>
        )}
      </div>

      {/* progress bar */}
      {showProgress && maxLength && (
        <div
          className="h-0.5 rounded-sm overflow-hidden"
          style={{ background: 'var(--color-cream-mid)' }}
        >
          <div
            className="h-full rounded-sm transition-all duration-300"
            style={{ width: `${pct}%`, background: 'var(--color-rose)' }}
          />
        </div>
      )}
    </div>
  );
}
