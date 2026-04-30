// src/features/letter/components/LetterPaper.tsx
import type { LetterTheme } from "../../../shared/schemas/letterSchema";
import { THEME_MAP } from "../../../shared/schemas/letterSchema";

interface LetterPaperProps {
  theme: LetterTheme;
  to: string;
  content: string;
  from: string;
  date?: string;
  preview?: boolean;
  scrollable?: boolean;
  scrollShare?: boolean;
  className?: string;
}

export default function LetterPaper({
  theme,
  to,
  content,
  from,
  date,
  preview = false,
  className = "",
  scrollable = false,
  scrollShare = false,
}: LetterPaperProps) {
  const t = THEME_MAP[theme];
  const displayPreview = preview
    ? content.slice(0, 46) + (content.length > 46 ? "..." : "")
    : content;

  return (
    <div
      className={`w-full mb-5 rounded-[16px] overflow-hidden border border-black/[0.06] ${className}`}
      style={{ boxShadow: "0 4px 20px rgba(28,23,20,0.06)" }}
    >
      {/* 상단 띠지 */}
      <div className="h-[3px]" style={{ background: t.primaryColor }} />

      {/* 편지지 본문 */}
      <div className="text-left px-6 py-5" style={{ background: t.bgColor }}>
        {/* 장식선 */}
        <div
          className="w-[22px] h-px mb-3"
          style={{ background: t.decoColor }}
        />

        {/* To */}
        <p
          className=" text-[14px] italic mb-3"
          style={{ fontFamily: "var(--font-serif)", color: t.primaryColor }}
        >
          To. {to}
        </p>

        {/* 편지 내용 */}
        <p
          className=" text-[16px] leading-[1.85] mb-4 whitespace-pre-line"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink-mid)",
            ...(scrollable && { maxHeight: 340, overflowY: "auto" }),
            ...(scrollShare && { maxHeight: 200, overflowY: "auto" }),
          }}
        >
          {displayPreview}
        </p>

        {/* From + 날짜 */}
        <div className="flex justify-between items-end pt-3 border-t border-black/[0.06]">
          <span
            className="text-[12px] italic"
            style={{ fontFamily: "var(--font-serif)", color: t.primaryColor }}
          >
            From. {from}
          </span>
          <span
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
