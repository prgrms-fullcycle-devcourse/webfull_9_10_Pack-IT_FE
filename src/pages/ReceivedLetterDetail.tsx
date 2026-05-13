// src/pages/ReceivedLetterDetail.tsx
// 받은 편지 상세 — 피그마: 편지지 + 답장 쓰기 + 이미지 저장 + 편지 삭제
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";
import type { LetterItem, LetterTheme } from "../shared/schemas/letterSchema";
import { HtmlToImage } from "../shared/utils/HtmlToImage";
import { useQueryClient } from "@tanstack/react-query";
import { useGetLetterDetail } from "../shared/api/generated/letters/letters";
import { getGetApiUsersMeLettersReceivedQueryKey, useDeleteApiUsersMeLettersReceivedLetterId } from "../shared/api/generated/user-letters/user-letters";
import toast from "react-hot-toast";

// TODO: useParams().id → GET /letters/:id API 연동

export default function ReceivedLetterDetail() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();

  // 목록에서 전달받은 nanoId — 상세 조회 및 삭제 API용
  const nanoId = location.state?.nanoId as string | undefined;
  const activeTab = location.state?.activeTab ?? "received";

  // ── 편지 상세 조회 ──
  const { data, isLoading, isError } = useGetLetterDetail(nanoId ?? "", {
    query: { enabled: !!nanoId },
  });
  const letter = data?.data;

  // ── 편지 삭제 ──
  const { mutate: deleteLetter, isPending: isDeleting } =
    useDeleteApiUsersMeLettersReceivedLetterId({
      mutation: {
        onSuccess: () => {
          // 받은 편지 목록 캐시 무효화 → 마이페이지 진입 시 자동 리페치
          queryClient.invalidateQueries({
            queryKey: getGetApiUsersMeLettersReceivedQueryKey(),
          });
          toast("편지를 삭제했습니다");
          navigate("/mypage", { state: { activeTab } });
        },
        onError: () => {
          toast.error("삭제에 실패했어요. 다시 시도해주세요.");
          setShowDeleteConfirm(false);
        },
      },
    });

  // nanoId 없으면 마이페이지로 복귀
  if (!nanoId) {
    navigate("/mypage", { state: { activeTab }, replace: true });
    return null;
  }

   const handleDelete = () => {
     deleteLetter({ letterId: nanoId });
   };

  const handleReply = () => {
    // 수신자 → 발신자, 발신자 → 수신자 swap
    navigate("/write", {
      state: {
        to: letter.senderName,
        from: letter.receiverName,
        returnTo: "/mypage",
      },
    });
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-cream)" }}
      >
        <p
          className="text-[16px]"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-ink-soft)",
          }}
        >
          편지를 불러오는 중이에요...
        </p>
      </div>
    );
  }

  // 에러 상태
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
          theme={letter.theme as LetterTheme}
          to={letter.receiverName ?? ""}
          content={letter.content ?? ""}
          from={letter.senderName ?? ""}
          date={letter.publishedAt ?? ""}
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
            {isDeleting ? "삭제 중..." : "편지 삭제"}
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
