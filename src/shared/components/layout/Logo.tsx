// src/shared/components/layout/Logo.tsx
import { Link } from 'react-router-dom';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-[6px] no-underline ${className}`}>
      <div
        className="flex items-center justify-center flex-shrink-0 w-[26px] h-[26px] rounded-[7px]"
        style={{ background: 'var(--color-rose)' }}
      >
        <svg width="12" height="11" viewBox="0 0 13 12" fill="none">
          <path d="M6.5 11S1 7.5 1 4A2.8 2.8 0 0 1 6.5 2.2 2.8 2.8 0 0 1 12 4C12 7.5 6.5 11 6.5 11Z" fill="#fff"/>
        </svg>
      </div>
      <span
        className="text-[16px] font-bold tracking-[-0.02em]"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        패킷
      </span>
    </Link>
  );
}
