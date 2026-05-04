// src/pages/MyPage.tsx
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../shared/components/ui/Button";
import { useIntersectionObserver } from "../shared/hooks/useIntersectionObserver";
import { MOCK_SENT } from "../mockData/MockSent.ts";
import { MOCK_RECEIVED } from "../mockData/MockReceived.ts";
import { MOCK_USER } from "../mockData/MockUser.ts";

import type { MyPageTab, LetterItem } from "../shared/schemas/letterSchema";
import BackButton from "../shared/components/ui/BackButton.tsx";
import LetterListItem from "../shared/components/ui/LetterListItem.tsx";

const PAGE_SIZE = 5;

// ── EmptyState: 컴포넌트 외부 선언 (렌더 중 생성 방지) ──
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
  const [sentList, _setSentList] = useState<LetterItem[]>(MOCK_SENT);
  const [receivedList, _setReceivedList] =
    useState<LetterItem[]>(MOCK_RECEIVED);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackSubmit = () => {
    // TODO: 이메일 앱 호출 — 피그마 기획서 기준
  };

  const TABS: { key: MyPageTab; label: string }[] = [
    { key: "sent", label: "내가 쓴 편지" },
    { key: "received", label: "받은 편지" },
    { key: "feedback", label: "건의하기" },
  ];
  const [page, setPage] = useState(1);

  const visibleSentList = useMemo(() => {
    return sentList.slice(0, page * PAGE_SIZE);
  }, [sentList, page]);

  const handleIntersect = useCallback(() => {
    if (visibleSentList.length < sentList.length) {
      setPage((prev) => prev + 1);
    }
  }, [visibleSentList.length, sentList.length]);

  const { targetRef } = useIntersectionObserver({
    //TODO: api 적용 후 로딩 시 다음 데이터 불러오기
    onIntersect: handleIntersect,
    threshold: 0.5,
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV — 피그마: < 버튼(메인) + 새 편지 버튼 */}
      <nav
        className="flex flex-shrink-0 h-[52px] items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
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
        {/* 유저 카드 */}
        <div className="bg-white border-b border-black/[0.08] px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[18px] font-medium"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink)",
              }}
            >
              {MOCK_USER.name}
            </span>
            <Button
              variant="primary"
              size="sm"
              style={{
                background: "var(--color-rose-pale)",
                color: "var(--color-rose)",
                boxShadow: "none",
              }}
              onClick={() => {
                /* TODO: 로그아웃 */
              }}
            >
              로그아웃
            </Button>
          </div>
          {/* 쓴 편지 / 받은 편지 카운트 — 피그마: 2열 */}

          <div className="grid grid-cols-2 gap-3">
            {[
              { n: MOCK_USER.sentCount, l: "쓴 편지" },
              { n: MOCK_USER.receivedCount, l: "받은 편지" },
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

        {/* 탭 바 — 피그마: 3탭 균등 */}
        <div className=" flex bg-white border-b border-black/[0.08] sticky top-0 z-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

        {/* 탭 콘텐츠 */}
        <div className="px-4 py-4">
          {/* ── 내가 쓴 편지 ── */}
          {activeTab === "sent" &&
            (sentList.length === 0 ? (
              <EmptyState
                text="아직 작성한 편지가 없어요"
                subText="소중한 사람에게 첫 편지를 보내보세요."
                onWrite={() => navigate("/write")}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {visibleSentList.map((item) => {
                  return (
                    <LetterListItem
                      key={item.id}
                      item={item}
                      type="sent"
                      onClick={() =>
                        navigate(`/mypage/sent/${item.id}`, {
                          state: { letter: item, activeTab },
                        })
                      }
                    />
                  );
                })}

                {/* [핵심] 레이지 스크롤 타겟: 데이터가 더 있을 때만 노출 */}
                {visibleSentList.length < sentList.length && (
                  <div
                    ref={targetRef}
                    className="flex items-center justify-center py-8 text-[14px]"
                    style={{
                      color: "var(--color-ink-soft)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    마음을 불러오는 중...
                  </div>
                )}
              </div>
            ))}

          {/* ── 받은 편지 ── */}
          {activeTab === "received" &&
            (receivedList.length === 0 ? (
              <EmptyState
                text="아직 받은 편지가 없어요."
                subText="먼저 편지를 써보는 건 어떨까요?"
                onWrite={() => navigate("/write")}
              />
            ) : (
              <div className="flex flex-col gap-2">
                {receivedList.map((item) => {
                  return (
                    <LetterListItem
                      key={item.id}
                      item={item}
                      type="received"
                      onClick={() =>
                        navigate(`/mypage/sent/${item.id}`, {
                          state: { letter: item, activeTab },
                        })
                      }
                    />
                  );
                })}
              </div>
            ))}

          {/* ── 건의하기 ── */}
          {activeTab === "feedback" && (
            <div>
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  fontSize: 24,
                }}
              >
                서비스 개선에 함께해 주세요
              </h2>
              <p
                className="text-[14px] leading-[1.6] mb-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                불편한 점이나 개선 아이디어를 자유롭게 남겨주세요.
                <br />
                소중한 의견 하나 하나 꼼꼼히 읽고 반영할게요.
              </p>

              <div className="mb-1">
                <label
                  className="text-[12px] font-medium"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-rose)",
                  }}
                >
                  내용 <span style={{ color: "var(--color-rose)" }}>*</span>
                </label>
              </div>
              <textarea
                value={feedbackText}
                onChange={(e) => {
                  if (e.target.value.length <= 500)
                    setFeedbackText(e.target.value);
                }}
                placeholder="서비스를 사용하면서 느낀 점을 적어주세요."
                rows={7}
                className="w-full px-4 py-3 rounded-[12px] resize-none outline-none text-[16px] mb-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink)",
                  background: "#fff",
                  border: "1px solid rgba(28,23,20,0.14)",
                  lineHeight: 1.7,
                  minHeight: 200,
                }}
              />
              <div className="flex justify-end mb-5">
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {feedbackText.length} / 500
                </span>
              </div>

              {/* 제출하기 — 피그마: 10자 이상일 때 활성화, 이메일 앱 호출 */}
              <Button
                variant="primary"
                fullWidth
                disabled={feedbackText.trim().length < 10}
                style={{ height: 54, fontSize: 18, borderRadius: 12 }}
                onClick={handleFeedbackSubmit}
              >
                제출하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
