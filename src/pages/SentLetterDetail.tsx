// src/pages/SentLetterDetail.tsx
// 내가 쓴 편지 상세 — 피그마: 편지지 + 편지삭제 + 카카오톡으로 보내기
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import KakaoShareButton from "../shared/components/ui/KakaoShareButton";
import Button from "../shared/components/ui/Button";
import { type LetterItem } from "../shared/schemas/letterSchema";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";

// TODO: useParams().id → GET /letters/:id API 연동

export default function SentLetterDetail() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const location = useLocation();
  const letter = location.state?.letter as LetterItem;

  if (!letter) {
    navigate(-1);
    return null;
  }

  const handleDelete = () => {
    // TODO: DELETE /letters/:id API 연동
    // 삭제 성공 시 이전화면 이동 + 토스트 "편지를 삭제했습니다"
    navigate(-1);
  };

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
        <BackButton />
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
          theme={letter.theme}
          to={letter.to}
          content={letter.content}
          from={letter.from}
          date={letter.createdAt}
          className="mb-4"
          scrollable
        />

        <Button
          variant="ghost"
          size="md"
          fullWidth={true}
          onClick={() => setShowDeleteConfirm(true)}
        >
          편지 삭제
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
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
