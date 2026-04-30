// src/features/mypage/components/LetterListItem.tsx
import type { LetterItem } from "../../schemas/letterSchema";
import {
  KEYWORD_TAG_COLOR,
  KEYWORD_LIST,
  THEME_MAP,
} from "../../schemas/letterSchema";

interface LetterListItemProps {
  item: LetterItem;
  type?: "sent" | "received";
  onClick?: (item: LetterItem) => void;
}

export default function LetterListItem({
  item,
  type = "sent",
  onClick,
}: LetterListItemProps) {
  const thumbColor = THEME_MAP[item.theme]?.primaryColor ?? "var(--color-rose)";
  const tagStyle = KEYWORD_TAG_COLOR[item.keyword];
  const emoji = KEYWORD_LIST.find((k) => k.label === item.keyword)?.emoji ?? "";

  return (
    <div
      onClick={() => onClick?.(item)}
      className={`
        flex items-center gap-3 px-4 py-4 bg-white rounded-[14px] border border-black/[0.08] cursor-pointer
      `}
    >
      {/* thumb */}
      <div
        className="w-[40px] h-[50px] rounded-[7px] flex items-center justify-center text-[18px] flex-shrink-0 relative overflow-hidden"
        style={{
          background: `${thumbColor}22`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: thumbColor }}
        />
        ✉
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[16px] font-medium truncate"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-ink)" }}
        >
          {type === "sent" ? item.to : `From. ${item.from}`}
        </p>
        <p
          className={`text-[14px] truncate `}
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-ink-soft)",
          }}
        >
          {item.preview}
        </p>
      </div>

      {/* meta */}
      <div className="text-right flex-shrink-0">
        <p
          className="text-[12px] mb-1"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-ink-soft)",
          }}
        >
          {item.createdAt}
        </p>
        <span
          className="text-[12px] font-medium px-2 py-[3px] rounded-[5px]"
          style={{
            fontFamily: "var(--font-sans)",
            background: tagStyle.bg,
            color: tagStyle.color,
          }}
        >
          {emoji} {item.keyword}
        </span>
      </div>
    </div>
  );
}
