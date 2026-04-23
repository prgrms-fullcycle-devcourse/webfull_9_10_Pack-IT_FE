// src/features/mypage/components/ReceivedLetterModal.tsx
import { useEffect } from 'react';
import LetterPaper from '../../letter/components/LetterPaper';
import type { LetterItem } from '../../../shared/schemas/letterSchema';

const KW_EMOJI: Record<string, string> = {
  생일: '🎂',
  응원: '💪',
  감사: '🙏',
  사과: '😔',
  고백: '💌',
  화해: '🤝',
};

interface ReceivedLetterModalProps {
  letter: LetterItem | null;
  onClose: () => void;
  onReply: () => void;
  onSavePdf: () => void;
}

export default function ReceivedLetterModal({
  letter,
  onClose,
  onReply,
  onSavePdf,
}: ReceivedLetterModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = letter ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [letter]);

  if (!letter) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{
        background: 'rgba(28,23,20,0.5)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeUp 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-[24px] w-[520px] max-w-full flex flex-col overflow-hidden animate-modal-up"
        style={{
          maxHeight: 'calc(100vh - 48px)',
          boxShadow: '0 32px 80px rgba(28,23,20,0.2)',
        }}
      >
        {/* top bar */}
        <div className="flex items-center justify-between px-5 pt-4 pb-[14px] border-b border-black/[0.08] flex-shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-medium tracking-[0.06em] px-[10px] py-[3px] rounded-[5px]"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'var(--color-rose-pale)',
                color: 'var(--color-rose)',
              }}
            >
              {KW_EMOJI[letter.keyword]} {letter.keyword}
            </span>
            <span
              className="text-[11px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              {letter.createdAt} 수신
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-black/[0.14] flex items-center justify-center text-[15px] cursor-pointer bg-transparent transition-colors hover:bg-[var(--color-cream)] flex-shrink-0 mt-0.5"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <LetterPaper
            theme={letter.theme}
            to={`To. ${letter.to}`}
            content={letter.content}
            from={`From. ${letter.from}`}
            date={letter.createdAt}
            scrollable
          />
        </div>

        {/* footer */}
        <div className="flex gap-[10px] px-6 py-4 border-t border-black/[0.08] flex-shrink-0">
          <button
            onClick={onSavePdf}
            className="flex-1 py-[11px] rounded-[10px] border border-black/[0.14] bg-transparent text-[13px] cursor-pointer transition-all hover:border-[var(--color-ink-soft)] flex items-center justify-center gap-[6px]"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-ink-mid)',
            }}
          >
            ↓ PDF 저장
          </button>
          <button
            onClick={onReply}
            className="flex-[1.5] py-[11px] rounded-[10px] border-none text-[13px] font-medium text-white cursor-pointer transition-all hover:opacity-90 flex items-center justify-center gap-[6px]"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'var(--color-rose)',
              boxShadow: '0 4px 16px rgba(232,82,106,0.3)',
            }}
          >
            💌 답장 쓰기
          </button>
        </div>
      </div>
    </div>
  );
}
