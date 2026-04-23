// src/shared/components/layout/BrandFooter.tsx
export default function BrandFooter() {
  return (
    <div
      className="w-full flex items-center justify-center gap-[6px] h-[46px] border-t border-black/[0.08]"
      style={{ background: 'rgba(250,247,244,0.9)' }}
    >
      <span className="text-[12px]" style={{ color: 'var(--color-rose)', fontFamily: 'var(--font-sans)' }}>♥</span>
      <span
        className="text-[11px] tracking-[0.08em] uppercase"
        style={{ color: 'var(--color-ink-soft)', fontFamily: 'var(--font-sans)' }}
      >
        Crafted with heart · IT-DA
      </span>
    </div>
  );
}
