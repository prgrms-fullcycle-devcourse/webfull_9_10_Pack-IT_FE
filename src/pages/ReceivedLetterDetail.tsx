// src/pages/ReceivedLetterDetail.tsx
// 받은 편지 상세 — 피그마: 편지지 + 답장 쓰기 + 이미지 저장 + 편지 삭제
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";
import type { LetterItem } from "../shared/schemas/letterSchema";
import { HtmlToImage } from "../shared/utils/HtmlToImage";

// TODO: useParams().id → GET /letters/:id API 연동

export default function ReceivedLetterDetail() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const location = useLocation();
  const letter = location.state?.letter as LetterItem;
  const activeTab = location.state?.activeTab ?? "received";

  if (!letter) {
    navigate(-1);
    return null;
  }

  const handleDelete = () => {
    // TODO: DELETE /letters/:id API 연동
    // 삭제 성공 시 이전화면 이동 + 토스트 "편지를 삭제했습니다"
    navigate(-1);
  };

  const handleImageSave = () => {
    // TODO: 편지지 이미지 저장 (png 형식) — html2canvas 등 활용
    alert("이미지 저장 기능 구현 예정입니다.");
  };

  const handleReply = () => {
    // 피그마: 수신자를 발신자로, 발신자를 수신자로 swap하여 편지쓰기 이동
    // TODO: navigate state로 to/from 전달
    navigate("/write");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV */}
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

      <div className="flex-1 overflow-y-auto px-5 py-6" id="ImageSet">
        {/* 편지지 — 피그마: 내용 전체, 초과 시 스크롤 */}
        <LetterPaper
          theme={letter.theme}
          to={letter.to}
          content={letter.content}
          from={letter.from}
          date={letter.createdAt}
          className="mb-4"
          scrollable
        />

        {/* 이미지 저장 + 편지 삭제 — 피그마: 2열 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth={true}
            onClick={HtmlToImage}
          >
            이미지 저장
          </Button>
          <Button
            variant="ghost"
            size="md"
            fullWidth={true}
            onClick={() => setShowDeleteConfirm(true)}
          >
            편지 삭제
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0 px-5 py-4">
        <Button
          variant="primary"
          fullWidth
          style={{
            height: 54,
            fontSize: 18,
            borderRadius: 12,
            marginBottom: 12,
          }}
          onClick={handleReply}
        >
          답장 쓰기
        </Button>
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
