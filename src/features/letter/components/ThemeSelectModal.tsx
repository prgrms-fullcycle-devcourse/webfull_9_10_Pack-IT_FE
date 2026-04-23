// src/features/letter/components/ThemeSelectModal.tsx
import { useEffect } from 'react';
import type {
  LetterTheme,
  LetterFormData,
} from '../../../shared/schemas/letterSchema';
import {
  THEME_LIST,
  THEME_SWATCH_BG,
} from '../../../shared/schemas/letterSchema';

interface ThemeSelectModalProps {
  isOpen: boolean;
  selectedTheme: LetterTheme;
  formData: Pick<LetterFormData, 'to' | 'from' | 'content'>;
  onSelect: (theme: LetterTheme) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ThemeSelectModal({
  isOpen,
  selectedTheme,
  formData,
  onSelect,
  onConfirm,
  onClose,
}: ThemeSelectModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      style={{
        background: 'rgba(28,23,20,0.48)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeUp 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-[24px] w-[780px] max-w-full flex flex-col overflow-hidden animate-modal-up"
        style={{
          maxHeight: 'calc(100vh - 48px)',
          boxShadow: '0 24px 80px rgba(28,23,20,0.18)',
        }}
      >
        {/* header */}
        <div className="flex items-start justify-between px-8 pt-6 pb-5 border-b border-black/[0.08] flex-shrink-0">
          <div>
            <p
              className="text-[10px] font-medium tracking-[0.1em] uppercase mb-[5px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-rose)',
              }}
            >
              Step 02
            </p>
            <p
              className="text-[20px] font-bold tracking-[-0.02em] mb-[3px]"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
              }}
            >
              편지지를 골라주세요
            </p>
            <p
              className="text-[12px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              따뜻한 마음을 담을 배경을 선택하세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-black/[0.14] flex items-center justify-center text-[15px] cursor-pointer bg-transparent transition-colors hover:bg-[var(--color-cream)] flex-shrink-0 mt-0.5"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div
          className="grid flex-1 min-h-0"
          style={{ gridTemplateColumns: '1fr 260px' }}
        >
          {/* left */}
          <div className="px-8 pt-7 pb-[46px] border-r border-black/[0.08] overflow-y-auto">
            <p
              className="text-[11px] font-medium tracking-[0.08em] uppercase mb-[14px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-rose)',
              }}
            >
              편지지 디자인
            </p>
            <div className="grid grid-cols-4 gap-[10px] mb-6">
              {THEME_LIST.map((t) => {
                const sel = selectedTheme === t.value;
                return (
                  <div
                    key={t.value}
                    onClick={() => onSelect(t.value)}
                    className="rounded-xl overflow-hidden cursor-pointer transition-all duration-[180ms] border-2 relative"
                    style={{
                      background: THEME_SWATCH_BG[t.value],
                      borderColor: sel ? 'var(--color-rose)' : 'transparent',
                      boxShadow: sel
                        ? '0 0 0 3px var(--color-rose-pale), 0 6px 20px rgba(232,82,106,0.15)'
                        : undefined,
                    }}
                  >
                    <div
                      className="h-20 relative overflow-hidden"
                      style={{
                        background: THEME_SWATCH_BG[t.value],
                      }}
                    >
                      <div className="absolute bottom-[10px] left-[10px] right-[10px] flex flex-col gap-1">
                        {[100, 70, 50].map((w, i) => (
                          <div
                            key={i}
                            className="h-0.5 rounded-sm opacity-30"
                            style={{
                              width: `${w}%`,
                              background: t.accentColor,
                            }}
                          />
                        ))}
                      </div>
                      {sel && (
                        <div
                          className="absolute top-[7px] right-[7px] w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] text-white"
                          style={{ background: 'var(--color-rose)' }}
                        >
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="px-[10px] py-2 bg-white border-t border-black/[0.08]">
                      <p
                        className="text-[11px] font-medium mb-px"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          color: sel ? 'var(--color-rose)' : 'var(--color-ink)',
                        }}
                      >
                        {t.label}
                      </p>
                      <p
                        className="text-[9px]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          color: 'var(--color-ink-soft)',
                        }}
                      >
                        {t.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* right: preview */}
          <div className="p-6 pl-5 flex flex-col">
            <p
              className="text-[11px] font-medium tracking-[0.08em] uppercase mb-3"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              디자인 미리보기
            </p>
            <div
              className={`flex-1 rounded-[14px] border border-black/[0.06] overflow-hidden transition-all duration-300 min-h-[260px] paper-${selectedTheme}`}
            >
              <div className={`h-0.5 paper-accent-${selectedTheme}`} />
              <div className="p-5 pb-4">
                <div className={`w-5 h-px mb-3 paper-deco-${selectedTheme}`} />
                <p
                  className={`text-[11px] italic mb-[10px] paper-text-${selectedTheme}`}
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {formData.to ? `To. ${formData.to}` : 'To. 소중한 당신에게'}
                </p>
                <p
                  className="text-[11px] leading-[1.85] mb-4 whitespace-pre-line"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-ink-mid)',
                  }}
                >
                  {formData.content || '편지 내용이 여기에 표시됩니다.'}
                </p>
                <div className="flex justify-between pt-3 border-t border-black/[0.05]">
                  <span
                    className={`text-[10px] italic paper-text-${selectedTheme}`}
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {formData.from
                      ? `From. ${formData.from}`
                      : 'From. 마음을 담아'}
                  </span>
                  <span
                    className="text-[9px]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-ink-soft)',
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end px-8 py-[18px] border-t border-black/[0.08] flex-shrink-0">
          <button
            onClick={onConfirm}
            className="px-8 py-3 rounded-xl text-[14px] font-medium text-white border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'var(--color-rose)',
              boxShadow: '0 4px 16px rgba(232,82,106,0.3)',
            }}
          >
            선택 완료 →
          </button>
        </div>
      </div>
    </div>
  );
}
