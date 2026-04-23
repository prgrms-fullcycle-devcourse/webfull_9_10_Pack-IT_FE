// src/shared/components/ui/KakaoShareButton.tsx
import type { ButtonHTMLAttributes } from 'react';

interface KakaoShareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

/** 카카오 공식 디자인 가이드 준수
 * - 배경: #FEE500
 * - 텍스트/심볼: #000000
 * - 심볼: 말풍선 모양 필수
 * - border-radius: 12px (rounded-xl)
 */
export default function KakaoShareButton({
  fullWidth = false,
  children = '카카오톡으로 보내기',
  className = '',
  ...props
}: KakaoShareButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-[10px]
        py-[14px] px-5 rounded-xl
        text-[14px] font-medium border-none
        cursor-pointer transition-all hover:opacity-90
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
      style={{
        fontFamily: 'var(--font-sans)',
        backgroundColor: '#FEE500',
        color: '#000000',
      }}
    >
      {/* 카카오 공식 말풍선 심볼 */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0.667C5.373 0.667 0 4.92 0 10.173c0 3.373 2.227 6.333 5.587 8.013L4.133 22.773a.373.373 0 0 0 .547.4l6.227-4.133c.36.027.72.04 1.093.04 6.627 0 12-4.253 12-9.507C24 4.92 18.627.667 12 .667z"
          fill="#000000"
        />
      </svg>
      {children}
    </button>
  );
}
