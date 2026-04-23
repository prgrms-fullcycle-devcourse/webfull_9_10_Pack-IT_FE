// src/features/letter/components/LetterPaper.tsx
import type { LetterTheme } from '../../../shared/schemas/letterSchema';

interface LetterPaperProps {
  theme: LetterTheme;
  to: string;
  content: string;
  from: string;
  date: string;
  scrollable?: boolean;
  className?: string;
}

export default function LetterPaper({
  theme,
  to,
  content,
  from,
  date,
  scrollable = false,
  className = '',
}: LetterPaperProps) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border border-black/[0.06] ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(28,23,20,0.06)' }}
    >
      {/* 상단 액센트 바 */}
      <div className={`h-[3px] paper-accent-${theme}`} />

      {/* 편지지 본문 */}
      <div className={`paper-${theme} px-9 pt-8 pb-7`}>
        <div className={`w-7 h-px mb-[18px] paper-deco-${theme}`} />
        <p
          className={`text-[14px] italic mb-5 paper-text-${theme}`}
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {to}
        </p>
        <div
          className={`text-[16px] leading-loose mb-7 whitespace-pre-line ${scrollable ? 'max-h-[260px] overflow-y-auto pr-1' : ''}`}
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-ink-mid)',
          }}
        >
          {content}
        </div>
        <div className="flex justify-between items-end pt-[18px] border-t border-black/[0.06]">
          <span
            className={`text-[14px] italic paper-text-${theme}`}
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {from}
          </span>
          <span
            className="text-[14px]"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-ink-soft)',
            }}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
