import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import BackButton from "../shared/components/ui/BackButton";
import PaginatedLetterList from "../shared/components/layout/PaginatedLetterList";

// 타입 전용 임포트 (verbatimModuleSyntax 대응)
import type { MyPageTab, LetterItem, LetterTheme, LetterKeyword } from "../shared/schemas/letterSchema";
import { useMe } from "../shared/hooks/useMe";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import {
  useGetSentLetters,
  useGetReceivedLetters,
} from "../shared/api/generated/user-letters/user-letters";
import type {
  GetSentLetters200DataItem,
} from "../shared/api/generated/model/getSentLetters200DataItem";
import type { SavedLetter } from "../shared/api/generated/model/savedLetter";

// TODO: 백엔드 sentCount/receivedCount 필드 추가 후 useMe로 교체
function toLetterItem(item: GetSentLetters200DataItem | SavedLetter): LetterItem {
  return {
    id: String(item.id ?? ""),
    nanoId: String(item.id ?? ""),
    to: item.receiverName ?? "",
    from: item.senderName ?? "",
    preview: item.content?.slice(0, 50) ?? "",
    content: item.content ?? "",
    keyword: (item.category as LetterKeyword) ?? "감사",
    theme: (item.theme as LetterTheme) ?? 1,
    createdAt: item.createdAt ?? "",
  };
}

interface EmptyStateProps {
  text: string;
  subText: string;
  onWrite: () => void;
}

function EmptyState({ text, subText, onWrite }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2
        className="font-bold mb-2"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--color-ink)",
          fontSize: 24,
        }}
      >
        {text}
      </h2>
      <p
        className="text-[14px] mb-6"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-ink-soft)",
        }}
      >
        {subText}
      </p>
      <Button
        variant="primary"
        style={{
          height: 54,
          fontSize: 18,
          borderRadius: 12,
          padding: "0 32px",
        }}
        onClick={onWrite}
      >
        새로운 마음 잇기
      </Button>
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<MyPageTab>(
    location.state?.activeTab ?? "sent",
  );
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 내 정보 조회
  const { me, isGuest } = useMe();

  // 편지 목록 조회
  const { data: sentData } = useGetSentLetters();
  const { data: receivedData } = useGetReceivedLetters();

  const rawSent = sentData?.data;
  const sentList: LetterItem[] = (
    Array.isArray(rawSent)
      ? rawSent
      : (rawSent as unknown as { letters?: GetSentLetters200DataItem[] })?.letters ?? []
  ).map(toLetterItem);
  const receivedList: LetterItem[] = (receivedData?.data?.letters ?? []).map(toLetterItem);

  const handleLetterClick = (item: LetterItem) => {
    if (activeTab === "sent") {
      navigate(`/mypage/sent/${item.id}`, {
        state: { activeTab, item },
      });
    } else {
      navigate(`/mypage/received/${item.nanoId ?? item.id}`, {
        state: { activeTab, item },
      });
    }
  };

  const handleLogout = () => {
    // TODO : 로그아웃 API 미구현으로 인해 구현예정 얼럿만 표시하고 마이페이지 유지
    window.alert("로그아웃 기능은 추후 구현될 예정입니다.");
  };

  const TABS: { key: MyPageTab; label: string }[] = [
    { key: "sent", label: "내가 쓴 편지" },
    { key: "received", label: "받은 편지" },
    { key: "feedback", label: "건의하기" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      <nav className="flex flex-shrink-0 h-[52px] items-center justify-between px-5 border-b border-black/[0.08] bg-white sticky top-0 z-100">
        <BackButton onClick={() => navigate("/")} />
        <Button
          variant="primary"
          size="sm"
          style={{ borderRadius: 8 }}
          onClick={() => navigate("/write")}
        >
          새 편지
        </Button>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-black/[0.08] px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[18px] font-medium"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink)",
              }}
            >
              {me?.nickname ?? "게스트 사용자"}
            </span>
            <Button
              variant="primary"
              size="sm"
              style={{
                background: "var(--color-rose-pale)",
                color: "var(--color-rose)",
                boxShadow: "none",
              }}
              onClick={() => handleLogout()}
            >
              로그아웃
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { n: sentList.length, l: "쓴 편지" },
              { n: receivedList.length, l: "받은 편지" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-[10px] py-4 text-center"
                style={{ background: "var(--color-cream)" }}
              >
                <span
                  className="block font-bold"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ink)",
                    fontSize: 22,
                  }}
                >
                  {s.n}
                </span>
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex bg-white border-b border-black/[0.08] sticky top-0 z-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                navigate("/mypage", {
                  state: { activeTab: tab.key },
                  replace: true,
                });
              }}
              className="flex-1 py-[12px] text-[14px] font-medium border-none cursor-pointer transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                color:
                  activeTab === tab.key
                    ? "var(--color-rose)"
                    : "var(--color-ink-soft)",
                background: "transparent",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid var(--color-rose)"
                    : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          {activeTab === "sent" &&
            (sentList.length === 0 ? (
              <EmptyState
                text="아직 작성한 편지가 없어요"
                subText="소중한 사람에게 첫 편지를 보내보세요."
                onWrite={() => navigate("/write")}
              />
            ) : (
              <PaginatedLetterList
                items={sentList}
                type="sent"
                onItemClick={handleLetterClick}
              />
            ))}

          {activeTab === "received" &&
            (receivedList.length === 0 ? (
              <EmptyState
                text="아직 받은 편지가 없어요."
                subText="먼저 편지를 써보는 건 어떨까요?"
                onWrite={() => navigate("/write")}
              />
            ) : (
              <PaginatedLetterList
                items={receivedList}
                type="received"
                onItemClick={handleLetterClick}
              />
            ))}

          {activeTab === "feedback" && (
            <div>{/* 생략: 건의하기 폼 구현부 유지 */}</div>
          )}
        </div>
      </div>

      {/* 로그아웃 확인 모달 */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="로그아웃 할까요?"
        description={
          isGuest
            ? "로그아웃 시 모든 데이터가 삭제돼요."
            : "로그아웃 후 다시 로그인할 수 있어요."
        }
        confirmLabel="로그아웃"
        cancelLabel="취소"
        confirmVariant="danger"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
