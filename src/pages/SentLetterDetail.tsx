// src/pages/SentLetterDetail.tsx
// 내가 쓴 편지 상세 — 피그마: 편지지 + 편지삭제 + 카카오톡으로 보내기
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import KakaoShareButton from "../shared/components/ui/KakaoShareButton";
import Button from "../shared/components/ui/Button";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";
import { useDeleteLetter } from "../shared/hooks/useDeleteLetter";
import { useGetLetterDetail } from "../shared/api/generated/letters/letters";
import type { LetterTheme } from "../shared/schemas/letterSchema";

export default function SentLetterDetail() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const location = useLocation();
  const { id: nanoId } = useParams<{ id: string }>();

  const activeTab = location.state?.activeTab ?? "sent";

  // ── 편지 상세 조회 ──
  const { data, isLoading, isError } = useGetLetterDetail(nanoId ?? "", {
    query: { enabled: !!nanoId },
  });
  const letter = data?.data;

  // ── 편지 삭제 ──
  const { deleteLetter, isDeleting } = useDeleteLetter({
    type: "sent",
    nanoId: nanoId ?? "",
    activeTab,
    onError: () => setShowDeleteConfirm(false),
  });

  // nanoId 없으면 마이페이지로 복귀
  if (!nanoId) {
    navigate("/mypage", { state: { activeTab }, replace: true });
    return null;
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-cream)" }}
      >
        <p
          className="text-[16px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-ink-soft)" }}
        >
          편지를 불러오는 중이에요...
        </p>
      </div>
    );
  }

  if (isError || !letter) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--color-cream)" }}
      >
        <p
          className="text-[16px]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-rose)" }}
        >
          편지를 불러오지 못했어요.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate("/mypage", { state: { activeTab } })}
        >
          마이페이지로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV — 피그마: < 편지 상세 */}
      <nav
        className="h-[52px] flex items-center px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <BackButton
          onClick={() => navigate("/mypage", { state: { activeTab } })}
        />
        <span
          className="text-[16px] font-bold absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
        >
          편지 상세
        </span>
      </nav>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* 편지지 */}
        <LetterPaper
          theme={letter.theme as LetterTheme}
          to={letter.receiverName ?? ""}
          content={letter.content ?? ""}
          from={letter.senderName ?? ""}
          date={letter.publishedAt ?? ""}
          className="mb-4"
          scrollable
        />

        <Button
          variant="ghost"
          size="md"
          fullWidth={true}
          disabled={isDeleting}
          onClick={() => setShowDeleteConfirm(true)}
        >
          {isDeleting ? "삭제 중..." : "편지 삭제"}
        </Button>
      </div>
      <div className="flex-shrink-0 px-5 py-4">
        <KakaoShareButton
          fullWidth
          style={{
            height: 54,
            fontSize: 18,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          카카오톡으로 보내기
        </KakaoShareButton>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="편지를 삭제할까요?"
        description="삭제된 편지는 복구할 수 없어요."
        confirmLabel="삭제"
        cancelLabel="취소"
        confirmVariant="danger"
        onConfirm={deleteLetter}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
