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
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-cream)' }}>

      {/* NAV: 52px — 피그마 기준 */}
      <nav
        className="sticky top-0 z-[100] h-[52px] flex items-center justify-between px-5 border-b border-black/[0.08] flex-shrink-0"
        style={{ background: 'rgba(250,247,244,0.95)', backdropFilter: 'blur(12px)' }}
      >
        <Logo />
        {isLoggedIn ? (
          <Button
            variant="primary"
            size="sm"
            style={{ background: 'var(--color-ink)', boxShadow: 'none', borderRadius: 8 }}
            onClick={() => navigate('/mypage')}
          >
            마이페이지
          </Button>
        ) : (
          <KakaoLoginButton
            size="sm"
            onClick={() => { /* TODO: 카카오 로그인 SDK 연동 */ }}
          >
            카카오 로그인
          </KakaoLoginButton>
        )}
      </nav>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto">

        {/* HERO */}
        <div className="px-5 pt-10 pb-8 text-center">
          {/* eyebrow */}
          <div
            className="inline-flex items-center gap-[6px] rounded-full px-[14px] py-[5px] border border-[var(--color-rose-light)] mb-5"
            style={{ background: 'var(--color-rose-pale)' }}
          >
            <div className="w-[4px] h-[4px] rounded-full" style={{ background: 'var(--color-rose)' }} />
            <span className="text-[12px] font-medium" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-rose)' }}>
              AI 기술로 빚어낸 마음의 조각
            </span>
          </div>

          {/* title: Noto Serif KR 28px — 피그마 기준 */}
          <h1
            className="font-bold leading-[1.25] tracking-[-0.025em] mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)', fontSize: 28 }}
          >
            기다림마저 설레는<br />
            <span style={{ color: 'var(--color-rose)' }}>감성 편지 딜리버리</span>
          </h1>
          <p
            className="leading-[1.7] mb-7"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-mid)', fontSize: 14 }}
          >
            메신저보다 길고, 손편지보다 스마트하게<br />
            가장 따뜻한 방식으로 진심을 전하세요.
          </p>

          {/* CTA: 350x54 #e8526a — 피그마 기준 */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            style={{ height: 54, fontSize: 18, borderRadius: 12 }}
            onClick={() => navigate('/write')}
          >
            마음 잇기 시작
          </Button>
        </div>

        {/* HOW IT WORKS */}
        <div className="flex items-center gap-3 px-5 mb-5">
          <div className="flex-1 h-px bg-black/[0.08]" />
          <span className="text-[12px] tracking-[0.08em]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>HOW IT WORKS</span>
          <div className="flex-1 h-px bg-black/[0.08]" />
        </div>

        {/* STEP 카드 */}
        <div className="px-5 flex flex-col gap-3 mb-6">
          {[
            { num: 'STEP 01', icon: '✏️', iconBg: 'var(--color-rose-pale)', name: '편지를 써요', desc: 'AI 키워드와 톤앤매너를 선택하고, 하고 싶은 말을 자유롭게 적어보세요.' },
            { num: 'STEP 02', icon: '🎨', iconBg: '#fff6ee',               name: '편지지를 고르고', desc: '4가지 감성 테마 중 마음에 드는 디자인을 골라 나만의 편지를 완성하세요.' },
            { num: 'STEP 03', icon: '💌', iconBg: '#f0f7ff',               name: '카톡으로 전달해요', desc: '링크를 카카오톡으로 공유하면, 받는 분이 아름다운 애니메이션과 함께 열어볼 수 있어요.' },
          ].map((s) => (
            <div key={s.num} className="bg-white rounded-[16px] border border-black/[0.08] p-5">
              <p className="text-[12px] font-bold tracking-[0.08em] mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-rose)' }}>{s.num}</p>
              <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-[20px] mb-3" style={{ background: s.iconBg }}>{s.icon}</div>
              <p className="text-[18px] font-medium mb-1" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}>{s.name}</p>
              <p className="text-[14px] leading-[1.6]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* 주요 기능 */}
        <div className="flex items-center gap-3 px-5 mb-5">
          <div className="flex-1 h-px bg-black/[0.08]" />
          <span className="text-[12px] tracking-[0.08em]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-rose)' }}>주요 기능</span>
          <div className="flex-1 h-px bg-black/[0.08]" />
        </div>

        {/* 피그마: 잇다만의 특별한 경험 → 패킷만의 특별한 경험 */}
        <div className="px-5 mb-6">
          <h2 className="font-bold leading-[1.3] tracking-[-0.02em] mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)', fontSize: 30 }}>
            패킷만의<br />특별한 경험
          </h2>
          <div className="flex flex-col gap-3">
            {[
              { tag: 'AI 기반',    tagBg: 'var(--color-rose-pale)', tagColor: 'var(--color-rose)',     icon: '✨', name: 'AI 톤앤매너 변환',    desc: '다정하게 · 격식있게 · 감성적인 · 담백하게 — 사용자가 쓴 초안을 원하는 어조로 자동 변환해드려요.' },
              { tag: '감성 디자인', tagBg: 'var(--color-cream-mid)', tagColor: 'var(--color-ink-soft)', icon: '🎨', name: '4가지 편지지 테마',   desc: '로즈 · 아이보리 · 페이퍼 · 블루 테마로 감정을 담은 편지지를 선택하세요.' },
              { tag: '공유',       tagBg: 'var(--color-cream-mid)', tagColor: 'var(--color-ink-soft)', icon: '💬', name: '카카오톡 원터치 공유', desc: '복잡한 설정 없이 카카오톡 링크 한 번으로 편지를 전달하세요.' },
              { tag: '보관',       tagBg: 'var(--color-cream-mid)', tagColor: 'var(--color-ink-soft)', icon: '🗂️', name: '마이페이지 편지함',   desc: '로그인 후 내가 쓴 편지와 받은 편지를 모두 보관하고 언제든 다시 볼 수 있어요.' },
            ].map((f) => (
              <div key={f.name} className="bg-white rounded-[16px] border border-black/[0.08] p-5">
                <span className="inline-block text-[10px] font-medium px-[9px] py-[3px] rounded-[6px] mb-3" style={{ fontFamily: 'var(--font-sans)', background: f.tagBg, color: f.tagColor }}>{f.tag}</span>
                <p className="text-[28px] mb-3">{f.icon}</p>
                <p className="text-[16px] font-medium mb-1" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}>{f.name}</p>
                <p className="text-[14px] leading-[1.6]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA 밴드 */}
        <div className="px-5 pb-8">
          <div className="rounded-[20px] px-6 py-8 text-center relative overflow-hidden" style={{ background: 'var(--color-ink)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,82,106,0.18), transparent 70%)' }} />
            <div className="relative z-10">
              <h2 className="font-bold leading-[1.3] text-white mb-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 24 }}>
                지금 바로 마음을<br />전달해보세요
              </h2>
              <p className="text-[14px] leading-[1.6] mb-6" style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.55)' }}>
                카카오톡 로그인으로 바로 시작할 수 있어요.
              </p>
              <Button
                variant="primary"
                fullWidth
                style={{ height: 43, fontSize: 16, borderRadius: 12 }}
                onClick={() => navigate('/write')}
              >
                마음 잇기 시작
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BrandFooter />
    </div>
  );
}
