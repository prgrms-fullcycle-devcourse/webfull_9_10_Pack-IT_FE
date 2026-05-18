import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  useDeleteSavedLetter,
  getGetSentLettersQueryKey,
  getGetReceivedLettersQueryKey,
} from "../api/generated/userLetters/userLetters";
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

  const { mutate: deleteSaved, isPending: isDeleting } =
    useDeleteSavedLetter({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey:
              type === "sent"
                ? getGetSentLettersQueryKey()
                : getGetReceivedLettersQueryKey(),
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
    deleteSaved({ letterId: nanoId });
  };

  return { deleteLetter, isDeleting };
}
