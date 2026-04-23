// src/shared/components/ui/ToneCard.tsx
import type { LetterTone } from '../../schemas/letterSchema';

interface ToneCardProps {
  icon: string;
  label: LetterTone;
  desc: string;
  active?: boolean;
  onClick?: () => void;
}

export default function ToneCard({
  icon,
  label,
  desc,
  active = false,
  onClick,
}: ToneCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center  gap-[9px] py-[15px] px-[5px] rounded-xl
        cursor-pointer outline-none transition-all duration-150 text-left flex-1 border
        ${active ? 'border-[var(--color-rose)]' : 'border-black/[0.14] hover:border-[var(--color-rose-light)]'}
      `}
      style={{
        background: active ? 'var(--color-rose-pale)' : 'var(--color-cream)',
      }}
    >
      <span className="text-[20px] flex-shrink-0 ml-2">{icon}</span>
      <div className="flex flex-col gap-1">
        <span
          className="text-[12px] font-medium"
          style={{
            fontFamily: 'var(--font-sans)',
            color: active ? 'var(--color-rose)' : 'var(--color-ink)',
          }}
        >
          {label}
        </span>
        <span
          className="text-[10px]"
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-ink-soft)',
          }}
        >
          {desc}
        </span>
      </div>
    </button>
  );
}
