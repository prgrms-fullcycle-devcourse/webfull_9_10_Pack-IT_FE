// src/shared/hooks/useIntersectionObserver.ts
import { useEffect, useRef } from 'react';

interface Props {
  onIntersect: () => void;
  threshold?: number;
}

export function useIntersectionObserver({ onIntersect, threshold = 0.5 }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { threshold }
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, threshold]);

  return { targetRef };
}