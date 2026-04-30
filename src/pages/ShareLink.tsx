// src/pages/ShareLink.tsx
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../shared/components/layout/Logo";
import KakaoShareButton from "../shared/components/ui/KakaoShareButton";
import type { LetterTheme } from "../shared/schemas/letterSchema";
import LetterPaper from "../shared/components/ui/LetterPaper";

const MOCK = {
  to: "To. 소중한 당신에게",
  content: "진심으로 생일을 축하해! 🎂\n오늘 하루도 행복하길 바랄게.",
  from: "From. 마음을 담아",
  date: "2026년 04월 23일",
  password: "1234",
};

export default function ShareLink() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state ?? {};
  // state가 빈값인 경우 기본값 제공
  const theme = (state?.theme ?? 1) as LetterTheme;
  const to = state?.to ?? MOCK.to;
  const from = state?.from ?? MOCK.from;
  const content = state?.content ?? MOCK.content;
  const now = new Date();
  const date = `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, "0")}월 ${String(now.getDate()).padStart(2, "0")}일`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV: 로고 + X버튼 — 피그마 03-링크생성 기준 */}
      <nav
        className="h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Logo />
        <button
          onClick={() => navigate("/mypage")}
          className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M1 1L14 14M14 1L1 14"
              stroke="#131313"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col items-center text-center">
        {/* 성공 마크: 50x50 #edfaf3 */}
        <div
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center mb-5"
          style={{ background: "#edfaf3" }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path
              d="M7 16L13 22L25 10"
              stroke="#2EB872"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 타이틀: Noto Serif KR 24px */}
        <h1
          className="font-bold leading-[1.3] tracking-[-0.02em] mb-3"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink)",
            fontSize: 24,
          }}
        >
          마음이 담긴 링크가
          <br />
          준비되었어요!
        </h1>
        <p
          className="text-[14px] leading-[1.7] mb-7"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-ink-soft)",
          }}
        >
          카카오톡으로 설렘을 전달해보세요.
          <br />
          받는 분은 비밀번호를 입력 후 편지를 열어볼 수 있어요.
        </p>

        {/* 편지 미리보기: 350x183 */}

        <LetterPaper
          theme={theme}
          to={to}
          content={content}
          from={from}
          date={date}
          preview
        />

        {/* 열람용 비밀번호: field 350x92 */}
        <div className="w-full text-left mb-5">
          <p
            className="text-[12px] font-medium mb-2"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-rose)",
            }}
          >
            🔒 열람용 비밀번호
          </p>
          <div
            className="w-full px-4 py-[14px] rounded-[12px]"
            style={{
              background: "var(--color-rose-pale)",
              border: "1px solid var(--color-rose-light)",
            }}
          >
            <span
              className="text-[16px]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink)",
              }}
            >
              {MOCK.password}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 px-5 py-4 ">
        <KakaoShareButton
          fullWidth
          style={{ height: 54, fontSize: 18, borderRadius: 12 }}
        >
          카카오톡으로 보내기
        </KakaoShareButton>
      </div>
    </div>
  );
}
