import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  useDeleteApiUsersMeLettersReceivedLetterId,
  getGetApiUsersMeLettersReceivedQueryKey,
} from "../api/generated/user-letters/user-letters";
import type { MyPageTab } from "../schemas/letterSchema";

interface UseDeleteLetterProps {
  type: "received" | "sent";
  nanoId: string;
  activeTab: MyPageTab;
  onError?: () => void;
}

export function useDeleteLetter({
  type,
  nanoId,
  activeTab,
  onError,
}: UseDeleteLetterProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteReceived, isPending: isDeleting } =
    useDeleteApiUsersMeLettersReceivedLetterId({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetApiUsersMeLettersReceivedQueryKey(),
          });
          toast("편지를 삭제했습니다");
          navigate("/mypage", { state: { activeTab } });
        },
        onError: () => {
          toast.error("삭제에 실패했어요. 다시 시도해주세요.");
          onError?.();
        },
      },
    });

  const deleteLetter = () => {
    if (type === "received") {
      deleteReceived({ letterId: nanoId });
    } else {
      // TODO: DELETE /api/users/me/letters/sent/:id API 연동 대기
      navigate("/mypage", { state: { activeTab }, replace: true });
    }
  };

  return { deleteLetter, isDeleting };
}
