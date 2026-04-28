// src/pages/MyPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/components/ui/Button";

import type {
  MyPageTab,
  LetterItem,
  UserInfo,
} from "../shared/schemas/letterSchema";
import { KEYWORD_TAG_COLOR } from "../shared/schemas/letterSchema";

// TODO: API 연동 후 제거
const MOCK_USER: UserInfo = {
  name: "마음을 담아",
  sentCount: 7,
  receivedCount: 1,
};

const MOCK_SENT: LetterItem[] = [
  {
    id: "1",
    to: "To. 소중한 친구",
    from: "마음을 담아",
    preview: "진심으로 생일 축하해! 오늘 하루는...",
    content:
      "진심으로 생일 축하해! 🎂\n\n오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다.",
    keyword: "생일",
    theme: "rose",
    createdAt: "04월 22일",
  },
  {
    id: "2",
    to: "To. 엄마",
    from: "마음을 담아",
    preview: "항상 저를 위해 애써주셔서 감사...",
    content:
      "항상 저를 위해 애써주셔서 감사드려요. 엄마 덕분에 제가 이렇게 잘 자랄 수 있었어요.",
    keyword: "감사",
    theme: "ivory",
    createdAt: "04월 15일",
  },
  {
    id: "3",
    to: "To. 팀원들",
    from: "마음을 담아",
    preview: "함께 고생한 프로젝트가 드디어...",
    content:
      "함께 고생한 프로젝트가 드디어 마무리됐네요. 모두 정말 수고 많으셨어요!",
    keyword: "응원",
    theme: "blue",
    createdAt: "04월 10일",
  },
  {
    id: "4",
    to: "To. 팀원들",
    from: "마음을 담아",
    preview: "함께 고생한 프로젝트가 드디어...",
    content: "",
    keyword: "사과",
    theme: "paper",
    createdAt: "04월 10일",
  },
  {
    id: "5",
    to: "To. 팀원들",
    from: "마음을 담아",
    preview: "함께 고생한 프로젝트가 드디어...",
    content: "",
    keyword: "고백",
    theme: "rose",
    createdAt: "04월 10일",
  },
  {
    id: "6",
    to: "To. 팀원들",
    from: "마음을 담아",
    preview: "함께 고생한 프로젝트가 드디어...",
    content: "",
    keyword: "화해",
    theme: "blue",
    createdAt: "04월 10일",
  },
];

const MOCK_RECEIVED: LetterItem[] = [
  {
    id: "r1",
    to: "소중한 당신에게",
    from: "소중한 친구",
    preview: "진심으로 생일 축하해! 오늘 하루는...",
    content:
      "진심으로 생일 축하해!\n\n우리가 함께한 시간들이 나에게는 큰 선물이야. 항상 곁에 있어줘서 고마워!",
    keyword: "생일",
    theme: "rose",
    createdAt: "04월 22일",
  },
];

const THEME_ACCENT: Record<string, string> = {
  rose: "#e8526a",
  ivory: "#c08040",
  paper: "#8a7868",
  blue: "#4070c0",
};

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
  const [activeTab, setActiveTab] = useState<MyPageTab>("sent");
  const [sentList, setSentList] = useState<LetterItem[]>(MOCK_SENT);
  const [receivedList, setReceivedList] = useState<LetterItem[]>(MOCK_RECEIVED);
  const [feedbackText, setFeedbackText] = useState("");

  const handleFeedbackSubmit = () => {
    // TODO: 이메일 앱 호출 — 피그마 기획서 기준
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
      {/* NAV — 피그마: < 버튼(메인) + 새 편지 버튼 */}
      <nav
        className="flex flex-shrink-0 h-[52px] items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <button
          onClick={() => navigate("/")}
          className="w-8 h-8 flex items-center justify-center text-[16px] bg-transparent pr-4 border-none cursor-pointer"
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
            <button
              onClick={() => {
                /* TODO: 로그아웃 */
              }}
              className="px-4 py-[6px] rounded-[8px] text-[13px] font-medium border-none cursor-pointer"
              style={{
                fontFamily: "var(--font-sans)",
                background: "var(--color-rose-pale)",
                color: "var(--color-rose)",
              }}
            >
              로그아웃
            </button>
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
                {sentList.map((item) => {
                  const tagColor = KEYWORD_TAG_COLOR[item.keyword];
                  const accent =
                    THEME_ACCENT[item.theme] ?? "var(--color-rose)";
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-4 bg-white rounded-[14px] border border-black/[0.08] cursor-pointer"
                      onClick={() => navigate(`/mypage/sent/${item.id}`)}
                    >
                      {/* 편지지 썸네일 */}
                      <div
                        className="w-[40px] h-[50px] rounded-[7px] flex items-center justify-center text-[18px] flex-shrink-0 relative overflow-hidden"
                        style={{ background: `${accent}22` }}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: accent }}
                        />
                        ✉
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[16px] font-medium truncate"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink)",
                          }}
                        >
                          {item.to}
                        </p>
                        <p
                          className="text-[14px] truncate"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {item.preview}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-[12px] mb-1"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {item.createdAt}
                        </p>
                        <span
                          className="text-[12px] font-medium px-2 py-[3px] rounded-[5px]"
                          style={{
                            fontFamily: "var(--font-sans)",
                            background: tagColor.bg,
                            color: tagColor.color,
                          }}
                        >
                          {item.keyword}
                        </span>
                      </div>
                    </div>
                  );
                })}
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
                  const accent =
                    THEME_ACCENT[item.theme] ?? "var(--color-rose)";
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-4 py-4 bg-white rounded-[14px] border border-black/[0.08] cursor-pointer"
                      onClick={() => navigate(`/mypage/received/${item.id}`)}
                    >
                      <div
                        className="w-[40px] h-[50px] rounded-[7px] flex items-center justify-center text-[18px] flex-shrink-0 relative overflow-hidden"
                        style={{ background: `${accent}22` }}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: accent }}
                        />
                        ✉
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[16px] font-medium truncate"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink)",
                          }}
                        >
                          From. {item.from}
                        </p>
                        <p
                          className="text-[14px] truncate"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {item.preview}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-[12px]"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {item.createdAt}
                        </p>
                      </div>
                    </div>
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
