// src/shared/components/ui/ConfirmModal.tsx
import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, onCancel]);

  // 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center px-6"
      style={{ background: "rgba(28,23,20,0.48)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="w-full max-w-[320px] bg-white rounded-[20px] overflow-hidden"
        style={{ boxShadow: "0 24px 60px rgba(28,23,20,0.18)" }}
      >
        {/* 본문 */}
        <div className="px-6 pt-7 pb-6 text-center">
          <h2
            className="text-[17px] font-bold tracking-[-0.01em] mb-2"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-ink)",
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="text-[13px] leading-[1.7]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-soft)",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="flex border-t border-black/[0.08]">
          {/* 취소 */}
          <button
            onClick={onCancel}
            className="flex-1 py-[14px] text-[15px] font-medium border-r border-black/[0.08] transition-colors hover:bg-[var(--color-cream)] cursor-pointer"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
              background: "transparent",
            }}
          >
            {cancelLabel}
          </button>

          {/* 확인 */}
          <button
            onClick={onConfirm}
            className="flex-1 py-[14px] text-[15px] font-medium transition-colors hover:opacity-90 cursor-pointer"
            style={{
              fontFamily: "var(--font-sans)",
              background: "transparent",
              color:
                confirmVariant === "danger" ? "#e53e3e" : "var(--color-rose)",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
