// src/shared/components/ui/Input.tsx
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  hint?: string;
}

export default function Input({
  label,
  required = false,
  hint,
  className = "",
  style,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-[6px]">
      {label && (
        <label
          className="text-[11px] font-medium tracking-[0.04em]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-rose)" }}
        >
          {label}
          {required && (
            <span className="ml-[4px]" style={{ color: "var(--color-rose)" }}>
              *
            </span>
          )}
        </label>
      )}
      <input
        className={`
          px-[14px] py-[11px] rounded-[10px]
          border border-black/[0.14] text-[14px]
          outline-none transition-all
          focus:border-[var(--color-rose)] focus:bg-white
          placeholder:text-[var(--color-ink-soft)]
          ${className}
        `}
        style={{
          fontFamily: "var(--font-sans)",
          background: "var(--color-cream)",
          color: "var(--color-ink)",
          ...style,
        }}
        {...props}
      />
      {hint && (
        <p
          className="text-[11px]"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-ink-soft)",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
