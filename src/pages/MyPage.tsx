import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import BackButton from "../shared/components/ui/BackButton";
import PaginatedLetterList from "../shared/components/layout/PaginatedLetterList";

// 타입 전용 임포트 (verbatimModuleSyntax 대응)
import type { MyPageTab, LetterItem, LetterTheme, LetterKeyword } from "../shared/schemas/letterSchema";
import { useMe } from "../shared/hooks/useMe";
import ConfirmModal from "../shared/components/ui/ConfirmModal";
import {
  getSentLetters,
  getReceivedLetters,
} from "../shared/api/generated/userLetters/userLetters";
import type { SavedLetter } from "../shared/api/generated/model/savedLetter";

function toLetterItem(item: SavedLetter): LetterItem {
  return {
    id: item.id ?? "",
    nanoId: item.id ?? "",
    to: item.receiverName ?? "",
    from: item.senderName ?? "",
    preview: item.content?.slice(0, 50) ?? "",
    content: item.content ?? "",
    keyword: (item.category as LetterKeyword) ?? "감사",
    theme: (item.theme as LetterTheme) ?? 1,
    createdAt: item.publishedAt ?? item.createdAt ?? "",
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

  const { me, isGuest } = useMe();

  const [sentList, setSentList] = useState<LetterItem[]>([]);
  const [sentCount, setSentCount] = useState(0);
  const [sentNextCursor, setSentNextCursor] = useState<string | undefined>(undefined);
  const [sentHasMore, setSentHasMore] = useState(false);
  const sentFetching = useRef(false);

  const [receivedList, setReceivedList] = useState<LetterItem[]>([]);
  const [receivedCount, setReceivedCount] = useState(0);
  const [receivedNextCursor, setReceivedNextCursor] = useState<string | undefined>(undefined);
  const [receivedHasMore, setReceivedHasMore] = useState(false);
  const receivedFetching = useRef(false);

  // 초기 로드 — cursor 없이 첫 페이지 조회, 응답의 nextCursor를 그대로 다음 cursor로 사용
  useEffect(() => {
    let cancelled = false;
    async function fetchFirst() {
      
      const res = await getSentLetters();
      if (cancelled) return;
      const letters = res.data?.letters ?? [];
      
      const seenIds = new Set<string>();
      setSentList(letters.map(toLetterItem).filter(item => !seenIds.has(item.id) && seenIds.add(item.id) !== undefined));
      if (res.meta?.totalCount != null) setSentCount(res.meta.totalCount);
      const next = res.meta?.nextCursor ?? undefined;
      
      setSentNextCursor(next);
      setSentHasMore(!!res.meta?.hasNextPage && next != null);
    }
    fetchFirst();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchFirst() {
      
      const res = await getReceivedLetters({ cursor: undefined });
      if (cancelled) return;
      const letters = res.data?.letters ?? [];
      
      const seenIds = new Set<string>();
      setReceivedList(letters.map(toLetterItem).filter(item => !seenIds.has(item.id) && seenIds.add(item.id) !== undefined));
      if (res.meta?.totalCount != null) setReceivedCount(res.meta.totalCount);
      const next = res.meta?.nextCursor != null ? String(res.meta.nextCursor) : undefined;
      
      setReceivedNextCursor(next);
      setReceivedHasMore(!!res.meta?.hasNextPage && next != null);
    }
    fetchFirst();
    return () => { cancelled = true; };
  }, []);

  // 다음 페이지 로드 — meta.nextCursor만 사용
  const loadMoreSent = useCallback(async () => {
    if (sentFetching.current || !sentHasMore || sentNextCursor == null) return;
    sentFetching.current = true;
    try {
      
      const res = await getSentLetters({ cursor: sentNextCursor });
      const letters = res.data?.letters ?? [];
      
      if (res.meta?.hasNextPage && res.meta?.nextCursor == null) {
        console.warn("[sent] ⚠️ hasNextPage=true 인데 nextCursor 없음 — 백엔드 미반환");
        
      }
      setSentList(prev => {
        const seenIds = new Set(prev.map(i => i.id));
        return [...prev, ...letters.map(toLetterItem).filter(i => !seenIds.has(i.id))];
      });
      const next = res.meta?.nextCursor ?? undefined;
      const hasMore = !!res.meta?.hasNextPage && next != null;
      
      setSentNextCursor(next);
      setSentHasMore(hasMore);
    } catch (e) {
      console.error("[sent] 추가 로드 실패:", e);
      setSentHasMore(false);
    } finally {
      sentFetching.current = false;
    }
  }, [sentHasMore, sentNextCursor]);

  const loadMoreReceived = useCallback(async () => {
    if (receivedFetching.current || !receivedHasMore || receivedNextCursor == null) return;
    receivedFetching.current = true;
    try {
      
      const res = await getReceivedLetters({ cursor: receivedNextCursor });
      const letters = res.data?.letters ?? [];
      
      if (res.meta?.hasNextPage && res.meta?.nextCursor == null) {
        console.warn("[received] ⚠️ hasNextPage=true 인데 nextCursor 없음 — 백엔드 미반환");
      }
      setReceivedList(prev => {
        const seenIds = new Set(prev.map(i => i.id));
        return [...prev, ...letters.map(toLetterItem).filter(i => !seenIds.has(i.id))];
      });
      const next = res.meta?.nextCursor != null ? String(res.meta.nextCursor) : undefined;
      const hasMore = !!res.meta?.hasNextPage && next != null;
      
      setReceivedNextCursor(next);
      setReceivedHasMore(hasMore);
    } catch (e) {
      console.error("[received] 추가 로드 실패:", e);
      setReceivedHasMore(false);
    } finally {
      receivedFetching.current = false;
    }
  }, [receivedHasMore, receivedNextCursor]);

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
  ];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
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
              { n: sentCount, l: "쓴 편지" },
              { n: receivedCount, l: "받은 편지" },
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
                hasMore={sentHasMore}
                onLoadMore={loadMoreSent}
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
                hasMore={receivedHasMore}
                onLoadMore={loadMoreReceived}
              />
            ))}
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
