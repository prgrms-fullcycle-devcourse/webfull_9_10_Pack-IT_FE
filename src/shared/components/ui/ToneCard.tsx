// src/shared/components/ui/ToneCard.tsx
// 피그마: 169x69px, 2열 그리드
import type { LetterTone } from '../../schemas/letterSchema';

interface ToneCardProps {
  icon: string;
  label: LetterTone;
  desc: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ToneCard({ icon, label, desc, active = false, onClick, disabled }: ToneCardProps) {
  return (
<button
  onClick={onClick}
  disabled={disabled} // 이 prop이 true일 때 작동합니다
  className={`
    flex items-center gap-[10px] px-[12px] py-[12px] rounded-[12px]
    transition-all duration-150 text-left border
    ${disabled 
      ? 'cursor-not-allowed opacity-60' // 비활성화 시 커서 변경 및 투명도 조절
      : 'cursor-pointer hover:border-[var(--color-rose-light)]'
    }
    ${active && !disabled
      ? 'border-[var(--color-rose)]' 
      : 'border-black/[0.14]'
    }
  `}
  style={{
    // disabled 상태라면 회색 계열로, 아니면 기존 로직 유지
    background: disabled 
      ? '#f3f4f6' // 혹은 비활성화용 변수 (예: var(--color-gray-100))
      : active 
        ? 'var(--color-rose-pale)' 
        : 'var(--color-cream)',
    minHeight: 69,
  }}
>
      <span className="text-[18px] flex-shrink-0">{icon}</span>
      <div className="flex flex-col gap-[2px]">
        <span
          className="text-[16px] font-medium leading-[1.2]"
          style={{
            fontFamily: 'var(--font-sans)',
            color: active ? 'var(--color-rose)' : 'var(--color-ink)',
          }}
        >
          {label}
        </span>
        <span
          className="text-[12px]"
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}
        >
          {desc}
        </span>
      </div>
    </button>
  );
}
