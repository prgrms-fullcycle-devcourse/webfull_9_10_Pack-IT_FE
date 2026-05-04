import { useState, useMemo, useCallback } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import LetterListItem from "../ui/LetterListItem";
import type { LetterItem } from "../../schemas/letterSchema";

interface Props {
  items: LetterItem[];
  type: "sent" | "received";
  onItemClick: (item: LetterItem) => void;
}

const PAGE_SIZE = 5;

export default function PaginatedLetterList({ items, type, onItemClick }: Props) {
  const [page, setPage] = useState(1);

  const visibleItems = useMemo(() => {
    return items.slice(0, page * PAGE_SIZE);
  }, [items, page]);

  const handleIntersect = useCallback(() => {
    if (visibleItems.length < items.length) {
      setPage((prev) => prev + 1);
    }
  }, [visibleItems.length, items.length]);

  const { targetRef } = useIntersectionObserver({
    onIntersect: handleIntersect,
    threshold: 0.5,
  });

  return (
    <div className="flex flex-col gap-2">
      {visibleItems.map((item) => (
        <LetterListItem
          key={item.id}
          item={item}
          type={type}
          onClick={() => onItemClick(item)}
        />
      ))}
      
      {/* 로딩 트리거 */}
      {visibleItems.length < items.length && (
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