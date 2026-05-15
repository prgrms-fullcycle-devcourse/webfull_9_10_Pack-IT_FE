import { useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import LetterListItem from "../ui/LetterListItem";
import type { LetterItem } from "../../schemas/letterSchema";

interface Props {
  items: LetterItem[];
  type: "sent" | "received";
  onItemClick: (item: LetterItem) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function PaginatedLetterList({ items, type, onItemClick, hasMore = false, onLoadMore }: Props) {
  const handleIntersect = useCallback(() => {
    if (hasMore && onLoadMore) onLoadMore();
  }, [hasMore, onLoadMore]);

  const { targetRef } = useIntersectionObserver({
    onIntersect: handleIntersect,
    threshold: 0.5,
  });

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <LetterListItem
          key={item.id}
          item={item}
          type={type}
          onClick={() => onItemClick(item)}
        />
      ))}
      {hasMore && (
        <div
          ref={targetRef}
          className="flex items-center justify-center py-8 text-[14px]"
          style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-sans)" }}
        >
          마음을 불러오는 중...
        </div>
      )}
    </div>
  );
}
