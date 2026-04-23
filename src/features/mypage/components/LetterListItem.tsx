// src/features/mypage/components/LetterListItem.tsx
import type { LetterItem } from '../../../shared/schemas/letterSchema';

const THUMB_COLOR: Record<string, string> = {
  rose: '#e8526a', ivory: '#c08040', blue: '#4070c0', paper: '#8a7868',
};
const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  생일: { bg: 'var(--color-rose-pale)', color: 'var(--color-rose)' },
  감사: { bg: 'var(--color-rose-pale)', color: 'var(--color-rose)' },
  고백: { bg: 'var(--color-rose-pale)', color: 'var(--color-rose)' },
  사과: { bg: 'var(--color-rose-pale)', color: 'var(--color-rose)' },
  응원: { bg: 'var(--color-cream-mid)',  color: 'var(--color-ink-soft)' },
  화해: { bg: 'var(--color-cream-mid)',  color: 'var(--color-ink-soft)' },
};
const KW_EMOJI: Record<string, string> = {
  생일: '🎂', 응원: '💪', 감사: '🙏', 사과: '😔', 고백: '💌', 화해: '🤝',
};

interface LetterListItemProps {
  item: LetterItem;
  type?: 'sent' | 'received';
  onDelete?: (id: string) => void;
  onCopyLink?: (url: string) => void;
  onClick?: (item: LetterItem) => void;
}

export default function LetterListItem({ item, type = 'sent', onDelete, onCopyLink, onClick }: LetterListItemProps) {
  const thumbColor = THUMB_COLOR[item.theme] ?? 'var(--color-rose)';
  const tagStyle = TAG_STYLE[item.keyword] ?? TAG_STYLE['응원'];

  return (
    <div
      onClick={() => onClick?.(item)}
      className={`
        group relative bg-white rounded-[16px] border border-black/[0.08]
        px-5 py-[18px] flex items-center gap-4
        transition-all duration-150
        ${onClick ? 'cursor-pointer hover:border-[var(--color-rose-light)] hover:-translate-y-px' : ''}
      `}
    >
      {/* thumb */}
      <div
        className="w-11 flex-shrink-0 rounded-[8px] flex items-center justify-center text-[20px] relative overflow-hidden"
        style={{ height: 54, background: `linear-gradient(150deg, ${thumbColor}22, ${thumbColor}44)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: thumbColor }} />
        ✉
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium truncate mb-[3px]"
           style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}>
          {type === 'sent' ? item.to : `From. ${item.from}`}
        </p>
        <p className={`text-[12px] truncate ${type === 'sent' ? 'mb-[6px]' : ''}`}
           style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
          {item.preview}
        </p>
        {type === 'sent' && item.shareUrl && (
          <button
            onClick={(e) => { e.stopPropagation(); onCopyLink?.(item.shareUrl!); }}
            className="inline-flex items-center gap-1 text-[10px] bg-transparent border-none cursor-pointer underline underline-offset-2 p-0 transition-opacity hover:opacity-70"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-rose)' }}
          >
            🔗 링크 복사
          </button>
        )}
      </div>

      {/* meta */}
      <div className="text-right flex-shrink-0">
        <p className="text-[11px] mb-[6px]"
           style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>
          {item.createdAt}
        </p>
        <span
          className="inline-block text-[10px] font-medium px-[9px] py-[3px] rounded-[5px]"
          style={{ fontFamily: 'var(--font-sans)', background: tagStyle.bg, color: tagStyle.color }}
        >
          {KW_EMOJI[item.keyword]} {item.keyword}
        </span>
      </div>

      {/* del btn */}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-black/[0.14] bg-white flex items-center justify-center text-[12px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:border-[var(--color-rose)]"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
