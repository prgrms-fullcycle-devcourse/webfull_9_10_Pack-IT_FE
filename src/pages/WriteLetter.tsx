// src/pages/WriteLetter.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/components/layout/Logo';
import StepBar from '../shared/components/layout/StepBar';
import Button from '../shared/components/ui/Button';
import Input from '../shared/components/ui/Input';
import Textarea from '../shared/components/ui/Textarea';
import KeywordChip from '../shared/components/ui/KeywordChip';
import ToneCard from '../shared/components/ui/ToneCard';
import ThemeSelectModal from '../features/letter/components/ThemeSelectModal';
import type {
  LetterFormData,
  LetterTone,
} from '../shared/schemas/letterSchema';
import { KEYWORD_LIST, TONE_LIST } from '../shared/schemas/letterSchema';

const MAX_CONTENT = 500;

// TODO: 실제 AI API 연동으로 교체
const TONE_PREVIEW: Record<LetterTone, string> = {
  다정하게:
    '진심으로 생일 축하해! 🎂 오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다. 항상 곁에 있어줘서 고맙고, 오늘 정말 좋은 하루 보내! ✨',
  격식있게:
    '귀하의 생신을 진심으로 축하드립니다. 그동안 함께하며 쌓아온 소중한 인연에 깊이 감사드리며, 앞으로도 건강하고 행복한 나날이 이어지기를 진심으로 바랍니다.',
  감성적인:
    '너의 생일을 진심으로 축하해. 세상에 네가 온 날이 오늘이라서 참 다행이라는 생각이 들어. 네가 걷는 모든 길에 행복이 내려앉는 하루가 되었으면 좋겠다. 🎂🌙',
  담백하게:
    '생일 축하해. 함께한 시간들 감사하게 생각하고 있어. 오늘도 좋은 하루 보내.',
};

export default function WriteLetter() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LetterFormData>({
    to: '',
    from: '마음을 담아',
    keyword: '생일',
    content: '',
    tone: null,
    theme: 'rose',
  });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream)' }}>
      {/* NAV: h-[56px] */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[56px] flex items-center justify-center border-b border-black/[0.08]"
        style={{
          background: 'rgba(250,247,244,0.88)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-full max-w-[860px] flex items-center justify-between px-6">
          <Logo />
          <StepBar
            steps={[
              { label: '편지 작성 / 편지지 선택', status: 'active' },
              { label: '공유', status: 'inactive' },
            ]}
          />
        </div>
      </nav>

      <div className="pt-[56px]">
        <div className="max-w-[860px] mx-auto px-6 pt-12 pb-[120px]">
          {/* page-header */}
          <div className="mb-10">
            <p
              className="text-[11px] font-medium tracking-[0.1em] uppercase mb-[10px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-rose)',
              }}
            >
              Step 01
            </p>
            <h1
              className="text-[26px] font-bold tracking-[-0.02em] leading-[1.3] mb-[6px]"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
              }}
            >
              편지를 써보세요
            </h1>
            <p
              className="text-[14px] leading-[1.6]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              AI가 당신의 서툰 문장을 다듬어 드릴게요.
            </p>
          </div>

          {/* 카드 1: 수신자·발신자 + AI 키워드 */}
          <div className="bg-white rounded-[20px] border border-black/[0.08] overflow-hidden mb-3">
            {/* ── 수신자 · 발신자 ── */}
            <div className="px-9 py-8 border-b border-black/[0.08]">
              <p
                className="text-[11px] font-medium tracking-[0.08em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-rose)',
                }}
              >
                수신자 · 발신자
              </p>
              <div className="grid grid-cols-2 gap-[14px]">
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
            </div>

            {/* ── AI 키워드 ── */}
            <div className="px-9 py-8">
              <p
                className="text-[11px] font-medium tracking-[0.08em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-rose)',
                }}
              >
                AI 키워드
              </p>
              <p
                className="text-[15px] font-medium mb-1"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink)',
                }}
              >
                어떤 마음을 담고 싶으세요?
                <span
                  className="ml-[6px] text-[15px]"
                  style={{ color: 'var(--color-rose)' }}
                >
                  *
                </span>
              </p>
              <p
                className="text-[12px] leading-[1.6] mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                키워드를 선택하면 AI가 편지 내용에 대한 아이디어를 제공해드려요.
              </p>
              <div className="flex gap-2 flex-wrap">
                {KEYWORD_LIST.map((k) => (
                  <KeywordChip
                    key={k.label}
                    keyword={k.label}
                    active={form.keyword === k.label}
                    onClick={() => setForm((p) => ({ ...p, keyword: k.label }))}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 카드 2: 편지 내용 — overflow 허용해서 Tip이 카드 밖으로 나올 수 있게 */}
          <div className="bg-white rounded-[20px] border border-black/[0.08] mb-3 relative">
            <div className="px-9 py-8">
              <p
                className="text-[11px] font-medium tracking-[0.08em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-rose)',
                }}
              >
                편지 내용
              </p>
              <p
                className="text-[15px] font-medium mb-1"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink)',
                }}
              >
                하고 싶은 말을 자유롭게 적어보세요
                <span
                  className="ml-[6px] text-[15px]"
                  style={{ color: 'var(--color-rose)' }}
                >
                  *
                </span>
              </p>
              <p
                className="text-[12px] leading-[1.6] mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                초안을 바탕으로 AI가 더욱 아름다운 문장으로 완성해드려요.
              </p>

              {/* textarea: relative 기준 */}
              <div className="relative">
                <Textarea
                  placeholder="편지지 초안 내용을 작성해보세요"
                  value={form.content}
                  onChange={(e) =>
                    e.target.value.length <= MAX_CONTENT &&
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  rows={8}
                  maxLength={MAX_CONTENT}
                  currentLength={form.content.length}
                  showProgress={false}
                  style={{ minHeight: 220 }}
                />

                {/* Tip 박스: textarea 우측 바깥으로 absolute */}
                <div
                  className="absolute top-0 text-[12px] leading-[1.7] px-4 py-[14px] rounded-[10px] border-l-2"
                  style={{
                    left: 'calc(100% + 16px)',
                    width: 220,
                    background: 'var(--color-rose-pale)',
                    borderColor: 'var(--color-rose-light)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-ink-mid)',
                  }}
                >
                  <p
                    className="text-[10px] font-medium tracking-[0.06em] uppercase mb-1"
                    style={{ color: 'var(--color-rose)' }}
                  >
                    ✦ Tip
                  </p>
                  구체적인 에피소드나 추억을 언급하면 더욱 감동적인 편지가
                  됩니다.
                  <br />
                  <br />
                  예: "작년 우리가 함께 갔던 카페가 생각나…"
                </div>
              </div>
            </div>
          </div>

          {/* 카드 3: AI 톤앤매너 */}
          <div className="bg-white rounded-[20px] border border-black/[0.08] overflow-hidden">
            <div className="px-9 py-8">
              <p
                className="text-[11px] font-medium tracking-[0.08em] uppercase mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-rose)',
                }}
              >
                AI 톤앤매너
              </p>
              <p
                className="text-[15px] font-medium mb-1"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink)',
                }}
              >
                어떤 어조로 다듬어 드릴까요?
              </p>
              <p
                className="text-[12px] leading-[1.6] mb-4"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink-soft)',
                }}
              >
                사용자가 직접 쓴 초안을 바탕으로 어조를 변환해드려요.
              </p>

              {/* tone-grid: 4열 */}
              <div className="grid grid-cols-4 gap-[10px] mb-5">
                {TONE_LIST.map((t) => (
                  <ToneCard
                    key={t.label}
                    icon={t.icon}
                    label={t.label}
                    desc={t.desc}
                    active={form.tone === t.label}
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        tone:
                          p.tone === t.label ? null : (t.label as LetterTone),
                      }))
                    }
                  />
                ))}
              </div>

              {/* previewBox
                  피그마 신규:
                  - 기본(미선택): #faf7f4 배경 + ✦ 아이콘 + 안내 텍스트
                  - 선택 시: #fff5f6 배경 + AI 미리보기 텍스트 */}
              <div
                className="rounded-xl border border-black/[0.08] p-[18px] min-h-[80px] transition-colors duration-200"
                style={{
                  background: form.tone
                    ? 'var(--color-rose-pale)'
                    : 'var(--color-cream)',
                }}
              >
                {form.tone ? (
                  <>
                    <p
                      className="text-[10px] font-medium mb-2"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--color-rose)',
                      }}
                    >
                      AI 미리보기
                    </p>
                    <p
                      className="text-[13px] leading-[1.85]"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--color-ink-mid)',
                      }}
                    >
                      {TONE_PREVIEW[form.tone]}
                    </p>
                  </>
                ) : (
                  /* 피그마 신규 기본값: ✦ + 안내문 */
                  <div className="flex flex-col items-center justify-center gap-2 py-2 text-center">
                    <span className="text-[20px]" style={{ color: '#a7a7a7' }}>
                      ✦
                    </span>
                    <p
                      className="text-[13px] leading-[1.7]"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'var(--color-ink-mid)',
                      }}
                    >
                      톤을 선택하지 않으면 직접 쓴 그대로 전달돼요.
                      <br />
                      원하신다면 위에서 톤을 선택해보세요.
                    </p>
                  </div>
                )}
              </div>

              {/* 적용 버튼: 톤 선택 시만 표시 */}
              {form.tone && (
                <div className="flex justify-end mt-3">
                  <Button
                    variant="outline-rose"
                    size="sm"
                    onClick={() =>
                      setForm((p) => ({ ...p, content: TONE_PREVIEW[p.tone!] }))
                    }
                  >
                    이 내용으로 적용하기 →
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: h-[77px] */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] h-[77px] flex items-center justify-center px-6 border-t border-black/[0.08]"
        style={{
          background: 'rgba(250,247,244,0.95)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-full max-w-[860px] flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-[13px] bg-transparent border-none cursor-pointer py-[10px] transition-opacity hover:opacity-70"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-ink-soft)',
            }}
          >
            ← 이전으로
          </button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setModalOpen(true)}
          >
            편지지 고르기 →
          </Button>
        </div>
      </div>

      <ThemeSelectModal
        isOpen={modalOpen}
        selectedTheme={form.theme}
        formData={{ to: form.to, from: form.from, content: form.content }}
        onSelect={(theme) => setForm((p) => ({ ...p, theme }))}
        onConfirm={() => {
          setModalOpen(false);
          navigate('/share');
        }}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
