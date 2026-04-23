// src/shared/components/ui/KeywordChip.tsx
import type { LetterKeyword } from '../../schemas/letterSchema';
import { KEYWORD_LIST } from '../../schemas/letterSchema';

interface KeywordChipProps {
  keyword: LetterKeyword;
  active?: boolean;
  onClick?: () => void;
}

export default function KeywordChip({
  keyword,
  active = false,
  onClick,
}: KeywordChipProps) {
  const meta = KEYWORD_LIST.find((k) => k.label === keyword);
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-[5px] px-4 py-[10px] rounded-full
        text-[13px] cursor-pointer outline-none transition-all duration-150 border
        ${active ? 'border-transparent' : 'border-black/[0.14] hover:border-[var(--color-rose-light)]'}
      `}
      style={{
        fontFamily: 'var(--font-sans)',
        background: active ? 'var(--color-rose)' : 'var(--color-cream)',
        color: active ? '#fff' : 'var(--color-ink-mid)',
        boxShadow: active ? '0 2px 10px rgba(232,82,106,0.25)' : 'none',
      }}
    >
      <span>{meta?.emoji}</span>
      <span>{keyword}</span>
    </button>
  );
}
