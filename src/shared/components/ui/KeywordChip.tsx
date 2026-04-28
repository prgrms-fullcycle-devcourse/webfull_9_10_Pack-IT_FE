// src/shared/components/ui/KeywordChip.tsx
// 피그마: 108x47px, font 16px, 2열 그리드
import type { LetterKeyword } from '../../schemas/letterSchema';
import { KEYWORD_LIST } from '../../schemas/letterSchema';

interface KeywordChipProps {
  keyword: LetterKeyword;
  active?: boolean;
  onClick?: () => void;
}

export default function KeywordChip({ keyword, active = false, onClick }: KeywordChipProps) {
  const meta = KEYWORD_LIST.find((k) => k.label === keyword);
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-[6px]
        px-[14px] py-[12px] rounded-[12px]
        text-[16px] cursor-pointer outline-none transition-all duration-150 border
        ${active
          ? 'border-transparent text-white'
          : 'border-black/[0.14] hover:border-[var(--color-rose-light)]'
        }
      `}
      style={{
        fontFamily: 'var(--font-sans)',
        background: active ? 'var(--color-rose)' : 'var(--color-cream)',
        color: active ? '#fff' : 'var(--color-ink-mid)',
        boxShadow: active ? '0 2px 10px rgba(232,82,106,0.25)' : 'none',
        minWidth: 108,
        minHeight: 47,
      }}
    >
      <span>{meta?.emoji}</span>
      <span>{keyword}</span>
    </button>
  );
}
