// src/pages/ReceiveLetter.tsx
// 비밀번호 입력 → 봉투 오픈 전 → 편지 열람 한 파일에서 상태 관리
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../shared/components/layout/Logo";
import Button from "../shared/components/ui/Button";
import { HtmlToImage } from "../shared/utils/HtmlToImage";
import { useGetApiLettersLetterId, useVerifyLetterPassword } from "../shared/api/generated/letters/letters";
import LetterPaper from "../shared/components/ui/LetterPaper";
import type { LetterTheme } from "../shared/schemas/letterSchema";

type Phase = "password" | "before" | "opened";

export default function ReceiveLetter() {
  const navigate = useNavigate();
  const {letterId} = useParams<{letterId: string}>();
  const { data, isLoading } = useGetApiLettersLetterId(letterId ?? "", {
    query: { enabled: !!letterId },
  });
  const {mutate: verifyPassword} = useVerifyLetterPassword();
  

  const letter = data?.data;
  const hasPassword = true; // TODO : API 연동 후 교체
  const [phase, setPhase] = useState<Phase>(
    hasPassword ? "password" : "before",
  );
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  if (!letterId) return null;

  const handlePwSubmit = () => {
    if (!pw) return;

    verifyPassword({letterId:letterId!, data:{password:pw}}, {
      onSuccess: () => {
        setPwError("");
        setPhase('before');

      },
      onError: () => {
        setPwError("비밀번호가 올바르지 않아요. 다시 확인해주세요.");}
    })
  };

  const handleOpen = () => {
    setPhase("opened");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV */}
      <nav
        className="h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <Logo />
        <div
          className="flex items-center px-3 py-1 rounded-full border border-black/[0.14]"
          style={{ background: "var(--color-cream)" }}
        >
          <span
            className="text-[11px] "
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            편지가 도착했어요 💌
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          style={{
            background: "var(--color-ink)",
            boxShadow: "none",
            borderRadius: 8,
          }}
          onClick={() => navigate("/mypage")}
        >
          마이페이지
        </Button>
      </nav>

      {/* ── PHASE: 비밀번호 입력 ── */}
      {phase === "password" && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          <div
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center text-[26px] mb-5"
            style={{
              background: "var(--color-rose-pale)",
              border: "1px solid var(--color-rose-light)",
            }}
          >
            🔒
          </div>
          <h1
            className="font-bold leading-[1.3] mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-ink)",
              fontSize: 24,
            }}
          >
            비밀번호를
            <br />
            입력해주세요
          </h1>
          <p
            className="text-[16px] leading-[1.6] mb-7"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            보내는 분이 설정한 비밀번호를
            <br />
            입력하면 편지를 열어볼 수 있어요.
          </p>

          {/* 비밀번호 입력폼 — 피그마: 280px, 숫자만, 마스킹 안함 */}
          <div className="w-[280px]">
            <input
              type="text"
              inputMode="numeric"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value.replace(/[^0-9]/g, ""));
                setPwError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handlePwSubmit()}
              placeholder="비밀번호 입력"
              className="w-full px-4 py-[14px] rounded-[12px] text-[16px] text-center outline-none mb-3"
              style={{
                background: "var(--color-cream)",
                border: `1px solid ${
                  pwError ? "var(--color-rose)" : "rgba(28,23,20,0.14)"
                }`,
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink)",
              }}
            />
            {pwError && (
              <p
                className="text-[12px] mb-3 text-left"
                style={{
                  color: "var(--color-rose)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {pwError}
              </p>
            )}
            {/* 확인 버튼 — 피그마: 280x54 */}
            <Button
              variant="primary"
              fullWidth
              disabled={!pw}
              style={{ height: 54, fontSize: 18, borderRadius: 12 }}
              onClick={handlePwSubmit}
            >
              확인
            </Button>
          </div>
        </div>
      )}

      {/* ── PHASE: 봉투 오픈 전 ── */}
      {phase === "before" && (
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
          <p
            className="text-[16px] mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            터치해서 마음 열기
          </p>

          {/* SVG 봉투 */}
          <div
            onClick={handleOpen}
            className="cursor-pointer mb-7 transition-transform hover:scale-[1.04] hover:-translate-y-1 active:scale-[0.97]"
            style={{ filter: "drop-shadow(0 12px 40px rgba(232,82,106,0.28))" }}
          >
            <svg width="200" height="148" viewBox="0 0 220 160" fill="none">
              <rect
                x="4"
                y="40"
                width="212"
                height="116"
                rx="12"
                fill="#f4627d"
              />
              <path d="M4 52L110 120L216 52" fill="#e04060" opacity="0.4" />
              <path d="M4 40L110 110L4 156" fill="#c43e55" opacity="0.25" />
              <path d="M216 40L110 110L216 156" fill="#c43e55" opacity="0.25" />
              <path
                d="M4 40Q4 38 6 37L110 10L214 37Q216 38 216 40L110 108Z"
                fill="#f78090"
              />
              <path
                d="M110 62C110 62 100 54 100 48C100 44 104 41 107 43C108.5 44 110 46 110 46C110 46 111.5 44 113 43C116 41 120 44 120 48C120 54 110 62 110 62Z"
                fill="white"
                opacity="0.7"
              />
              <rect
                x="88"
                y="88"
                width="44"
                height="32"
                rx="4"
                fill="white"
                opacity="0.15"
              />
              <path
                d="M88 92L110 106L132 92"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.4"
                fill="none"
              />
            </svg>
          </div>

          <h1
            className="font-normal leading-[1.3] mb-2"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-ink)",
              fontSize: 28,
            }}
          >
            편지가 도착했어요
          </h1>
          <p
            className="text-[16px] leading-[1.6]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            누군가 당신에게 마음을 전했어요.
            <br />
            봉투를 클릭해 열어보세요.
          </p>
        </div>
      )}

      {/* ── PHASE: 편지 열람 ── */}
      {phase === "opened" && (
        <>
          <div className="flex-1 overflow-y-auto px-5 py-6">
            {/* 편지지 */}
            <LetterPaper
              theme={(letter?.theme as LetterTheme) ?? 1}
              to={letter?.receiverName}
              content={letter?.content}
              from={letter?.senderName}
              date={letter?.publishedAt}
            />

            <Button
              variant="ghost"
              size="md"
              fullWidth={true}
              onClick={() => {
                HtmlToImage();
              }}
            >
              이미지 저장
            </Button>
          </div>
          <div className="flex-shrink-0 px-5 py-4 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="xlg"
              fullWidth={true}
              style={{
                borderColor: "var(--color-rose-light)",
                background: "var(--color-rose-pale)",
                color: "var(--color-rose)",
              }}
              onClick={() => {
                // TODO: 편지 보관 (게스트 계정 -> 받은 편지 저장)
              }}
            >
              편지 보관하기
            </Button>
            <Button
              variant="primary"
              size="xlg"
              fullWidth={true}
              onClick={() => navigate("/write")}
            >
              답장 쓰기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
