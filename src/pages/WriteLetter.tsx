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
  LetterTheme,
  LetterTone,
} from "../shared/schemas/letterSchema";
import {
  KEYWORD_LIST,
  TONE_LIST,
  THEME_MAP,
} from "../shared/schemas/letterSchema";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";
import { usePostApiLettersAiGenerate } from "../shared/api/generated/letters/letters";

const MAX_CONTENT = 500;

const INITIAL_FORM: LetterFormData = {
  to: "",
  from: "",
  keyword: "생일",
  content: "",
  originalContent: "",
  tone: null,
  letterPassword: "",
  theme: 1,
};

const STEPS = [
  { label: "기본 정보" },
  { label: "편지 작성" },
  { label: "편지지 선택" },
  { label: "비밀번호" },
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

  // 스텝 상태
  const stepBarSteps = STEPS.map((s, i) => ({
    label: s.label,
    status: (i + 1 < step ? "done" : i + 1 === step ? "active" : "inactive") as
      | "done"
      | "active"
      | "inactive",
  }));

  const { mutate: aiGenerateMutate, isPending } = usePostApiLettersAiGenerate();
  const aiGenerateClick = (selectedTone: LetterTone) => {
    const setOriginContent = form.tone == null ? form.content! : form.originalContent
    setForm((p) => ({
      ...p,
      tone: selectedTone!,
      originalContent: setOriginContent!,
    }));
    aiGenerateMutate(
      {
        data: {
          category: form.keyword!,
          tone: selectedTone,
          draft_content: setOriginContent!,
        },
      },
      {
        onSuccess: (data) => {
          setForm((p) => ({ ...p, content: data!.data!.ai_content as string }));
        },
        onError: (error) => {
          console.error("실패:", error);
        },

    });
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: "white" }}>
      {/* NAV */}
      <nav
        className="h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <BackButton
          onClick={() => {
            goPrev();
          }}
        />
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
                  value={isPending ? "ai가 글 쓰는 중...." :  form.content}
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
                {form.tone && isPending == false ? (
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
                    disabled={isPending}
                    active={form.tone === t.label}
                    onClick={() => {
                      const newTone = (
                        form.tone === t.label ? null : t.label
                      ) as LetterTone | null;
                      if (newTone) {
                        aiGenerateClick(newTone)
                      }
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── STEP 3: 편지지 선택 ── */}
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
                편지지를 골라주세요
              </h1>

              {/* 피그마: 2x2 그리드 */}

              <div className="grid grid-cols-2 gap-3 mb-8">
                {Object.entries(THEME_MAP).map(([key, t]) => {
                  const themeKey = Number(key) as LetterTheme;
                  const active = form.theme === themeKey;
                  return (
                    <div
                      key={themeKey}
                      onClick={() =>
                        setForm((p) => ({ ...p, theme: themeKey }))
                      }
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
                          background: t.bgColor,
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          <div
                            className="h-1 rounded-sm w-full"
                            style={{ background: t.primaryColor, opacity: 0.8 }}
                          />
                          <div
                            className="h-1 rounded-sm w-3/4"
                            style={{ background: t.primaryColor, opacity: 0.6 }}
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

              <LetterPaper
                theme={form.theme}
                to={form.to}
                content={form.content}
                from={form.from}
                preview
              />
            </>
          )}

          {/* ── STEP 4: 비밀번호 ── */}
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
                둘만의 편지로 만들고 싶다면
                <br />
                비밀번호를 설정해보세요
              </h1>

              {/* 비밀번호 입력 — 피그마: 숫자만, 마스킹 안함 */}
              <div className="flex flex-col gap-4 mb-4">
                <Input
                  label="열람 비밀번호(선택)"
                  required
                  placeholder="숫자를 입력해주세요(선택)"
                  inputMode="numeric"
                  type="text"
                  value={form.letterPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setForm((p) => ({ ...p, letterPassword: val }));
                  }}
                />
              </div>

              <div
                className="px-4 py-3 my-3 rounded-[10px] text-[12px] text-center font-medium leading-[1.7]"
                style={{
                  background: "var(--color-rose-pale)",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-rose)",
                }}
              >
                🔒 비밀번호는 받는 분에게도 꼭 알려주세요.
                <br />
                잊어버리면 복구가 어려워요.
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
            disabled={!step2Valid || isPending}
            onClick={goNext}
          >
            다음
          </Button>
        )}
        {step === 3 && (
          <Button
            variant="primary"
            fullWidth
            style={{ height: 54, fontSize: 18, borderRadius: 12 }}
            onClick={goNext}
          >
            다음
          </Button>
        )}
        {step === 4 && (
          <>
            <Button
              variant="primary"
              fullWidth
              style={{ height: 54, fontSize: 18, borderRadius: 12 }}
              onClick={() => {
                // TODO: POST /letters API 연동
                navigate("/share", {
                  state: {
                    theme: form.theme,
                    to: form.to,
                    from: form.from,
                    content: form.content,
                    date: new Date().toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }),
                    letterPassword: form.letterPassword,
                    // TODO : password는 API 연동 후 서버에서 처리
                  },
                });
              }}
            >
              편지 완성하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
