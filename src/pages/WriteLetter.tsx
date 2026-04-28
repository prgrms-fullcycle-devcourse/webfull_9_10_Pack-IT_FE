// src/pages/WriteLetter.tsx
// 4단계 인라인 step 관리 — Zustand 추가 시 useState 2줄만 교체
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepBar from "../shared/components/layout/StepBar";
import Button from "../shared/components/ui/Button";
import Input from "../shared/components/ui/Input";
import Textarea from "../shared/components/ui/Textarea";
import KeywordChip from "../shared/components/ui/KeywordChip";
import ToneCard from "../shared/components/ui/ToneCard";
import type {
  LetterFormData,
  LetterTone,
} from "../shared/schemas/letterSchema";
import {
  KEYWORD_LIST,
  TONE_LIST,
  THEME_LIST,
  THEME_SWATCH_BG,
} from "../shared/schemas/letterSchema";

const MAX_CONTENT = 500;

// TODO: 실제 AI API 연동으로 교체
const TONE_PREVIEW: Record<LetterTone, string> = {
  다정하게:
    "진심으로 생일 축하해! 🎂 오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다. 항상 곁에 있어줘서 고맙고, 오늘 정말 좋은 하루 보내! ✨",
  격식있게:
    "귀하의 생신을 진심으로 축하드립니다. 그동안 함께하며 쌓아온 소중한 인연에 깊이 감사드리며, 앞으로도 건강하고 행복한 나날이 이어지기를 진심으로 바랍니다.",
  감성적인:
    "너의 생일을 진심으로 축하해. 세상에 네가 온 날이 오늘이라서 참 다행이라는 생각이 들어. 네가 걷는 모든 길에 행복이 내려앉는 하루가 되었으면 좋겠다. 🎂🌙",
  담백하게:
    "생일 축하해. 함께한 시간들 감사하게 생각하고 있어. 오늘도 좋은 하루 보내.",
};

const INITIAL_FORM: LetterFormData = {
  to: "",
  from: "",
  keyword: "생일",
  content: "",
  originalContent: "",
  tone: null,
  password: "",

  theme: "rose",
};

const STEPS = [
  { label: "기본 정보" },
  { label: "편지 작성" },
  { label: "보안 설정" },
  { label: "편지지 선택" },
];

export default function WriteLetter() {
  const navigate = useNavigate();
  // ── 마이그레이션 포인트: Zustand 추가 시 아래 2줄만 교체 ──
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<LetterFormData>(INITIAL_FORM);
  // ──────────────────────────────────────────────────────────

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => scrollRef.current?.scrollTo({ top: 0 });

  const goNext = () => {
    setStep((s) => (s < 4 ? ((s + 1) as 1 | 2 | 3 | 4) : s));
    scrollToTop();
  };
  const goPrev = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }
    setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
    scrollToTop();
  };

  // 유효성 검사
  const step1Valid =
    form.to.trim() !== "" && form.from.trim() !== "" && form.keyword !== null;
  const step2Valid = form.content.trim() !== "";
  const step3Valid = form.password.trim() !== "";

  // 스텝 상태
  const stepBarSteps = STEPS.map((s, i) => ({
    label: s.label,
    status: (i + 1 < step ? "done" : i + 1 === step ? "active" : "inactive") as
      | "done"
      | "active"
      | "inactive",
  }));

  return (
    <div className="h-screen flex flex-col" style={{ background: "white" }}>
      {/* NAV */}
      <nav
        className="h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <button
          onClick={goPrev}
          className="w-8 h-8 flex items-center justify-center text-[var(--color-ink-mid)] bg-transparent pr-4 border-none cursor-pointer"
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
        <StepBar steps={stepBarSteps} />
        <div className="w-8" />
      </nav>

      {/* 스크롤 영역 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="px-5 pt-6 pb-[100px]">
          {/* ── STEP 1: 기본 정보 ── */}
          {step === 1 && (
            <>
              <h1
                className="font-bold leading-[1.3] tracking-[-0.02em] mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  fontSize: 24,
                }}
              >
                기본 정보를 입력해주세요
              </h1>

              {/* 수신자 · 발신자 */}
              <div className="flex flex-col gap-4 mb-6">
                <Input
                  label="To. 받는 분"
                  required
                  placeholder="편지를 받을 분의 이름을 적어주세요"
                  value={form.to}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, to: e.target.value }))
                  }
                />
                <Input
                  label="From. 보내는 분"
                  required
                  placeholder="마음을 담아"
                  value={form.from}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, from: e.target.value }))
                  }
                />
              </div>

              {/* 구분선 */}
              <div
                className="h-[12px] -mx-5 mb-5"
                style={{ background: "var(--color-cream-mid)" }}
              />

              {/* AI 키워드 */}
              <div
                className="inline-flex items-center px-3 py-1 rounded-full mb-3"
                style={{
                  background: "var(--color-rose-pale)",
                  fontSize: 12,
                  color: "var(--color-rose)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                AI 키워드
              </div>
              <p
                className="text-[18px] font-medium mb-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink)",
                }}
              >
                어떤 마음을 담고 싶으세요?
              </p>
              <p
                className="text-[14px] mb-5"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                키워드를 선택하면 AI가 아이디어를 제공해드려요.
              </p>
              {/* 피그마: 3열 그리드 */}
              <div className="grid grid-cols-3 gap-2">
                {KEYWORD_LIST.map((k) => (
                  <KeywordChip
                    key={k.label}
                    keyword={k.label}
                    active={form.keyword === k.label}
                    onClick={() => setForm((p) => ({ ...p, keyword: k.label }))}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── STEP 2: 편지 작성 ── */}
          {step === 2 && (
            <>
              <h1
                className="font-bold leading-[1.3] tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  fontSize: 24,
                }}
              >
                하고 싶은 말을 <br /> 자유롭게 적어보세요
              </h1>

              {/* 편지 내용 입력 */}
              <div className="relative mb-1">
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    e.target.value.length <= MAX_CONTENT &&
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  placeholder="오늘 너의 생일을 정말 축하해. 우리가 함께한 시간들이..."
                  rows={8}
                  showProgress={false}
                  style={{
                    minHeight: 240,
                    fontSize: 16,
                    background: "var(--color-cream)",
                    border: "1px solid rgba(28,23,20,0.14)",
                    borderRadius: 12,
                    padding: "16px",
                  }}
                />
              </div>

              {/* 글자수 + 원본 복구 버튼 — 피그마: 입력칸 우측 하단 */}
              <div className="flex items-center justify-between mb-6">
                {/* 원본으로 되돌리기: AI 적용 후에만 표시 */}
                {form.tone && form.originalContent ? (
                  <button
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        content: p.originalContent,
                        tone: null,
                        originalContent: "",
                      }))
                    }
                    className="flex items-center gap-1 text-[13px] bg-transparent border-none cursor-pointer"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2 8C2 4.686 4.686 2 8 2C10.032 2 11.822 3.013 12.928 4.572M14 8C14 11.314 11.314 14 8 14C5.968 14 4.178 12.987 3.072 11.428"
                          stroke="#9c9189"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 2L13.5 4.5L11 4.5"
                          stroke="#9c9189"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>{" "}
                    원본으로 되돌리기
                  </button>
                ) : (
                  <div />
                )}
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {form.content.length} / {MAX_CONTENT}
                </span>
              </div>

              {/* 구분선 */}
              <div
                className="h-[12px] -mx-5 mb-5"
                style={{ background: "var(--color-cream-mid)" }}
              />

              {/* AI 톤앤매너 */}
              <div
                className="inline-flex items-center px-3 py-1 rounded-full mb-3"
                style={{
                  background: "var(--color-rose-pale)",
                  fontSize: 12,
                  color: "var(--color-rose)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                AI 톤앤매너
              </div>
              <p
                className="text-[18px] font-medium mb-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink)",
                }}
              >
                어떤 어조로 다듬어 드릴까요?
              </p>
              <p
                className="text-[14px] mb-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                선택한 어조로 ai가 다듬어 드릴게요.
              </p>

              {/* 피그마: 2열 그리드, 169x69px */}
              <div className="grid grid-cols-2 gap-2">
                {TONE_LIST.map((t) => (
                  <ToneCard
                    key={t.label}
                    icon={t.icon}
                    label={t.label}
                    desc={t.desc}
                    active={form.tone === t.label}
                    onClick={() => {
                      const newTone = (
                        form.tone === t.label ? null : t.label
                      ) as LetterTone | null;
                      if (newTone) {
                        // TODO: 실제 AI API 연동 — 현재는 mock
                        setForm((p) => ({
                          ...p,
                          tone: newTone,
                          originalContent: p.originalContent || p.content, // 최초 원본 저장
                          content: TONE_PREVIEW[newTone],
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── STEP 3: 보안 설정 ── */}
          {step === 3 && (
            <>
              <h1
                className="font-bold leading-[1.3] tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  fontSize: 24,
                }}
              >
                열람 비밀번호를
                <br />
                설정해주세요
              </h1>

              {/* 비밀번호 입력 — 피그마: 숫자만, 마스킹 안함 */}
              <div className="flex flex-col gap-4 mb-4">
                <Input
                  label="열람 비밀번호"
                  required
                  placeholder="숫자를 입력해주세요"
                  inputMode="numeric"
                  type="text"
                  value={form.password}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setForm((p) => ({ ...p, password: val }));
                  }}
                />
              </div>

              <p
                className="text-[14px] leading-[1.7] mb-6"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                편지를 받는 분이 이 비밀번호를 입력해야 해요.
                <br />
                비밀번호와 함께 편지를 전달해 주세요.
              </p>
            </>
          )}

          {/* ── STEP 4: 편지지 선택 ── */}
          {step === 4 && (
            <>
              <h1
                className="font-bold leading-[1.3] tracking-[-0.02em] mb-5"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink)",
                  fontSize: 24,
                }}
              >
                편지지를 골라주세요
              </h1>

              {/* 피그마: 2x2 그리드 */}

              <div className="grid grid-cols-2 gap-3 mb-8">
                {THEME_LIST.map((t) => {
                  const active = form.theme === t.value;
                  return (
                    <div
                      key={t.value}
                      onClick={() => setForm((p) => ({ ...p, theme: t.value }))}
                      className="flex rounded-[12px] overflow-hidden cursor-pointer bg-white transition-all"
                      style={{
                        height: 96,
                        border: active
                          ? "2px solid var(--color-rose)"
                          : "2px solid rgba(28,23,20,0.08)",
                      }}
                    >
                      {/* 좌측 스와치 */}
                      <div
                        className="flex-shrink-0 flex flex-col justify-end p-2"
                        style={{
                          width: 77,
                          background: THEME_SWATCH_BG[t.value],
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          <div
                            className="h-1 rounded-sm w-full"
                            style={{ background: t.accentColor, opacity: 0.8 }}
                          />
                          <div
                            className="h-1 rounded-sm w-3/4"
                            style={{ background: t.accentColor, opacity: 0.6 }}
                          />
                        </div>
                      </div>

                      {/* 우측 텍스트 */}
                      <div className="flex flex-col justify-center px-3">
                        <p
                          className="text-[16px] font-medium"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: active
                              ? "var(--color-rose)"
                              : "var(--color-ink)",
                          }}
                        >
                          {t.label}
                        </p>
                        <p
                          className="text-[12px]"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {t.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* 미리보기 */}
              <p
                className="text-[12px] mb-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-soft)",
                }}
              >
                미리보기
              </p>
              <div
                className="rounded-[16px] overflow-hidden border border-black/[0.06] mb-6"
                style={{ boxShadow: "0 4px 20px rgba(28,23,20,0.06)" }}
              >
                <div
                  className="h-[3px]"
                  style={{
                    background: THEME_LIST.find((t) => t.value === form.theme)
                      ?.accentColor,
                  }}
                />
                <div
                  className="px-6 py-5"
                  style={{ background: THEME_SWATCH_BG[form.theme] }}
                >
                  <div
                    className="w-[22px] h-px mb-3"
                    style={{ background: "var(--color-rose-light)" }}
                  />
                  <p
                    className="text-[14px] italic mb-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: THEME_LIST.find((t) => t.value === form.theme)
                        ?.accentColor,
                    }}
                  >
                    To. {form.to || "소중한 당신에게"}
                  </p>
                  <p
                    className="text-[16px] leading-[1.85] mb-4 line-clamp-2"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--color-ink-mid)",
                    }}
                  >
                    {form.content.slice(0, 50)}
                    {form.content.length > 50 ? "…" : ""}
                  </p>
                  <div className="flex justify-between pt-3 border-t border-black/[0.06]">
                    <span
                      className="text-[12px] italic"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: THEME_LIST.find((t) => t.value === form.theme)
                          ?.accentColor,
                      }}
                    >
                      From. {form.from || "마음을 담아"}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 하단 버튼 바 */}
      <div className="flex-shrink-0 px-5 py-4 ">
        {step === 1 && (
          <Button
            variant="primary"
            fullWidth
            style={{ height: 54, fontSize: 18, borderRadius: 12 }}
            disabled={!step1Valid}
            onClick={goNext}
          >
            다음
          </Button>
        )}
        {step === 2 && (
          <Button
            variant="primary"
            fullWidth
            style={{ height: 54, fontSize: 18, borderRadius: 12 }}
            disabled={!step2Valid}
            onClick={goNext}
          >
            다음
          </Button>
        )}
        {step === 3 && (
          <>
            <div
              className="px-4 py-3 my-3 rounded-[10px] text-[12px] text-center font-medium leading-[1.7]"
              style={{
                background: "var(--color-rose-pale)",
                fontFamily: "var(--font-sans)",
                color: "var(--color-rose)",
              }}
            >
              🔒 비밀번호는 암호화되어 저장되며 패킷팀도 알 수 없어요.
              <br />
              비밀번호를 잊으면 복구가 불가능하니 꼭 기억해주세요.
            </div>
            <Button
              variant="primary"
              fullWidth
              style={{ height: 54, fontSize: 18, borderRadius: 12 }}
              disabled={!step3Valid}
              onClick={goNext}
            >
              다음
            </Button>
          </>
        )}
        {step === 4 && (
          <Button
            variant="primary"
            fullWidth
            style={{ height: 54, fontSize: 18, borderRadius: 12 }}
            onClick={() => {
              // TODO: POST /letters API 연동
              navigate("/share");
            }}
          >
            편지 완성하기
          </Button>
        )}
      </div>
    </div>
  );
}
