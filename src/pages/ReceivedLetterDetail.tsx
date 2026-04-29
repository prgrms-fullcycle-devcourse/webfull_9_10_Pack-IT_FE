// src/pages/ReceivedLetterDetail.tsx
// 받은 편지 상세 — 피그마: 편지지 + 답장 쓰기 + 이미지 저장 + 편지 삭제
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import ConfirmModal from "../shared/components/ui/ConfirmModal";

// TODO: useParams().id → GET /letters/:id API 연동
const MOCK = {
  to: "To. 마음을 담아",
  content: "진심으로 생일을 축하해! 🎂\n오늘 하루도 행복하길 바랄게.",
  from: "From. 소중한 친구",
  date: "2026년 04월 22일",
  primaryColor: "#e8526a",
  bgColor: "linear-gradient(160deg, #fff5f7, #ffe0e8)",
  decoColor: "#f7d4da",
  // 답장 쓰기용 — 피그마: 수신자↔발신자 swap
  replyTo: "소중한 친구",
  replyFrom: "마음을 담아",
};

export default function ReceivedLetterDetail() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[16px] bg-transparent pr-4 border-none cursor-pointer mr-auto"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9L9 17"
              stroke="#5a4f4a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          className="text-[16px] font-bold absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
        >
          편지 상세
        </span>
      </nav>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* 편지지 — 피그마: 내용 전체, 초과 시 스크롤 */}
        <div
          className="rounded-[16px] overflow-hidden border border-black/[0.06] mb-4"
          style={{ boxShadow: "0 4px 20px rgba(28,23,20,0.06)" }}
        >
          <div
            className="h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${MOCK.primaryColor}, #f2956a)`,
            }}
          />
          <div className="px-6 py-5" style={{ background: MOCK.bgColor }}>
            <div
              className="w-[22px] h-px mb-3"
              style={{ background: MOCK.decoColor }}
            />
            <p
              className="text-[14px] italic mb-3"
              style={{
                fontFamily: "var(--font-serif)",
                color: MOCK.primaryColor,
              }}
            >
              {MOCK.to}
            </p>
            <p
              className="text-[16px] leading-[1.85] mb-4 whitespace-pre-line"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink-mid)",
              }}
            >
              {MOCK.content}
            </p>
            <div className="flex justify-between pt-3 border-t border-black/[0.06]">
              <span
                className="text-[12px] italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: MOCK.primaryColor,
                }}
              >
                {MOCK.from}
              </span>
              <span
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                {MOCK.date}
              </span>
            </div>
          </div>
        </div>

        {/* 이미지 저장 + 편지 삭제 — 피그마: 2열 버튼 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth={true}
            onClick={handleImageSave}
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
