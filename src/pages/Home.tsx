// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/components/layout/Logo';
import BrandFooter from '../shared/components/layout/BrandFooter';
import Button from '../shared/components/ui/Button';
import KakaoLoginButton from '../shared/components/ui/KakaoLoginButton';

interface HomeProps {
  isLoggedIn?: boolean; // TODO: auth 훅으로 교체
}

export default function Home({ isLoggedIn = false }: HomeProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* NAV: h-[60px] */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[60px] flex items-center justify-center border-b border-black/[0.08]"
        style={{
          background: 'rgba(250,247,244,0.88)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-full max-w-[860px] flex items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* 로그인 상태: 로그아웃 + 마이페이지 */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    /* TODO: 로그아웃 */
                  }}
                >
                  로그아웃
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ background: 'var(--color-ink)', boxShadow: 'none' }}
                  onClick={() => navigate('/mypage')}
                >
                  마이페이지
                </Button>
              </>
            ) : (
              <>
                {/* 비로그인: 마이페이지 ghost + 카카오 로그인 */}
                {/* 피그마: nav-actions에 마이페이지 버튼 없음 → 비로그인 시 카카오 로그인만 */}
                <KakaoLoginButton
                  size="sm"
                  onClick={() => {
                    /* TODO: 카카오 로그인 */
                  }}
                >
                  카카오 로그인
                </KakaoLoginButton>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="mt-[60px] min-h-[606px] flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 50% 10%, rgba(232,82,106,0.07) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(232,82,106,0.04) 0%, transparent 60%)
              `,
            }}
          />
          <div className="relative z-10 flex flex-col items-center text-center gap-[42px] px-1">
            {/* eyebrow tag */}
            <div
              className="inline-flex items-center gap-[7px] rounded-full px-[15px] py-[6px] border border-[var(--color-rose-light)]"
              style={{ background: 'var(--color-rose-pale)' }}
            >
              <div
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: 'var(--color-rose)' }}
              />
              <span
                className="text-[12px] font-medium"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-rose)',
                }}
              >
                AI 기술로 빚어낸 마음의 조각
              </span>
            </div>

            {/* title */}
            <div className="flex flex-col gap-5">
              <h1
                className="text-[clamp(36px,5vw,54px)] font-bold leading-[1.22] tracking-[-0.03em]"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-ink)',
                }}
              >
                기다림마저 설레는
                <br />
                <span style={{ color: 'var(--color-rose)' }}>
                  감성 편지 딜리버리
                </span>
              </h1>
              <p
                className="text-[16px] leading-[1.75] max-w-[474px]"
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-ink-mid)',
                }}
              >
                메신저보다 길고, 손편지보다 스마트하게
                <br />
                가장 따뜻한 방식으로 진심을 전하세요.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/write')}
              >
                마음 잇기 시작 →
              </Button>
            </div>
          </div>
        </section>

        <div id="how-it-works" className="max-w-[860px] mx-auto px-6">
          {/* divider */}
          <div className="flex items-center gap-5 my-10">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <span
              className="text-[12px] tracking-[0.08em]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              HOW IT WORKS
            </span>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>

          {/* ── STEPS ── */}
          <section className="pb-20">
            <p
              className="text-[11px] font-medium tracking-[0.1em] uppercase mb-3"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-rose)',
              }}
            >
              사용 방법
            </p>
            <h2
              className="text-[30px] font-bold leading-[1.3] tracking-[-0.02em] mb-12"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
              }}
            >
              단 세 단계로
              <br />
              진심을 전달하세요
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  num: 'STEP 01',
                  icon: '✏️',
                  iconBg: 'var(--color-rose-pale)',
                  name: '편지를 써요',
                  desc: 'AI 키워드와 톤앤매너를 선택하고, 하고 싶은 말을 자유롭게 적어보세요. AI가 더욱 감동적인 문장으로 완성해드려요.',
                },
                {
                  num: 'STEP 02',
                  icon: '🎨',
                  iconBg: '#fff6ee',
                  name: '편지지를 고르고',
                  desc: '4가지 감성 테마 중 마음에 드는 디자인을 골라 나만의 편지를 완성하세요.',
                },
                {
                  num: 'STEP 03',
                  icon: '💌',
                  iconBg: '#f0f7ff',
                  name: '카톡으로 전달해요',
                  desc: '생성된 링크를 카카오톡으로 공유하면, 받는 분이 아름다운 애니메이션과 함께 편지를 열어볼 수 있어요.',
                },
              ].map((s) => (
                <div
                  key={s.num}
                  className="bg-white rounded-[16px] border border-black/[0.08] p-7 transition-all hover:-translate-y-1"
                >
                  <p
                    className="text-[11px] font-bold tracking-[0.08em] mb-4"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--color-rose)',
                    }}
                  >
                    {s.num}
                  </p>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-4"
                    style={{ background: s.iconBg }}
                  >
                    {s.icon}
                  </div>
                  <p
                    className="text-[15px] font-medium mb-2"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-ink)',
                    }}
                  >
                    {s.name}
                  </p>
                  <p
                    className="text-[13px] leading-[1.7]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-ink-soft)',
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section className="pb-20">
            <p
              className="text-[11px] font-medium tracking-[0.1em] uppercase mb-3"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-rose)',
              }}
            >
              주요 기능
            </p>
            <h2
              className="text-[30px] font-bold leading-[1.3] tracking-[-0.02em] mb-8"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
              }}
            >
              잇다만의
              <br />
              특별한 경험
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  tag: 'AI 기반',
                  tagBg: 'var(--color-rose-pale)',
                  tagColor: 'var(--color-rose)',
                  icon: '✨',
                  name: 'AI 톤앤매너 변환',
                  desc: '다정하게 · 격식있게 · 감성적인 · 담백하게 — 사용자가 쓴 초안을 원하는 어조로 자동 변환해드려요.',
                },
                {
                  tag: '감성 디자인',
                  tagBg: 'var(--color-cream-mid)',
                  tagColor: 'var(--color-ink-soft)',
                  icon: '🎨',
                  name: '4가지 편지지 테마',
                  desc: '로즈 · 아이보리 · 페이퍼 · 블루 테마로 감정을 담은 편지지를 선택하세요.',
                },
                {
                  tag: '공유',
                  tagBg: 'var(--color-cream-mid)',
                  tagColor: 'var(--color-ink-soft)',
                  icon: '💬',
                  name: '카카오톡 원터치 공유',
                  desc: '복잡한 설정 없이 카카오톡 링크 한 번으로 편지를 전달하세요.',
                },
                {
                  tag: '보관',
                  tagBg: 'var(--color-cream-mid)',
                  tagColor: 'var(--color-ink-soft)',
                  icon: '🗂️',
                  name: '마이페이지 편지함',
                  desc: '로그인 후 내가 쓴 편지와 받은 편지를 모두 보관하고 언제든 다시 볼 수 있어요.',
                },
              ].map((f) => (
                <div
                  key={f.name}
                  className="bg-white rounded-[16px] border border-black/[0.08] p-7 transition-colors hover:border-[var(--color-rose-light)]"
                >
                  <span
                    className="inline-block text-[10px] font-medium px-[9px] py-[3px] rounded-[6px] mb-[10px]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      background: f.tagBg,
                      color: f.tagColor,
                    }}
                  >
                    {f.tag}
                  </span>
                  <p className="text-[28px] mb-[14px]">{f.icon}</p>
                  <p
                    className="text-[15px] font-medium mb-[6px]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-ink)',
                    }}
                  >
                    {f.name}
                  </p>
                  <p
                    className="text-[13px] leading-[1.7]"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-ink-soft)',
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BAND ── */}
          <section className="pb-24">
            <div
              className="rounded-[24px] px-16 py-14 text-center relative overflow-hidden"
              style={{ background: 'var(--color-ink)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,82,106,0.18) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <h2
                  className="text-[28px] font-bold leading-[1.3] tracking-[-0.02em] text-white mb-3"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  지금 바로 마음을
                  <br />
                  전달해보세요
                </h2>
                {/* cta-band-sub: rgba white/0.55 */}
                <p
                  className="text-[14px] leading-[1.6] mb-8"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  카카오톡 로그인으로 바로 시작할 수 있어요.
                  <br />단 3분이면 특별한 편지가 완성됩니다.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/write')}
                >
                  마음 잇기 시작 →
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <BrandFooter />
    </div>
  );
}
