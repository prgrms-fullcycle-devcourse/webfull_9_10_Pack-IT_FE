// src/pages/ShareLink.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/components/layout/Logo';
import StepBar from '../shared/components/layout/StepBar';
import BrandFooter from '../shared/components/layout/BrandFooter';
import Button from '../shared/components/ui/Button';
import KakaoShareButton from '../shared/components/ui/KakaoShareButton';

// TODO: 라우터 state 또는 전역 상태로 교체
const MOCK_LETTER = {
  to: 'To. 소중한 당신에게',
  body: '진심으로 생일 축하해! 오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다. 항상 곁에 있어줘서 고맙고, 오늘 정말 좋은 하루 보내!',
  from: 'From. 마음을 담아',
  date: '2026년 4월 22일',
  shareUrl: 'https://itda.link/letter/abc1234xyz',
};

export default function ShareLink() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MOCK_LETTER.shareUrl);
    } catch (error) {
      console.log(error);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--color-cream)' }}
    >
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
              { label: '편지 작성 / 편지지 선택', status: 'done' },
              { label: '공유', status: 'active' },
            ]}
          />
        </div>
      </nav>

      <main className="flex-1 pt-[56px] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[860px] flex flex-col items-center">
          {/* success mark */}
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-7 border animate-pop-in"
            style={{
              background: 'var(--color-success-bg)',
              borderColor: '#b8edd0',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M7 16L13 22L25 10"
                stroke="#2EB872"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-check"
              />
            </svg>
          </div>

          <h1
            className="text-[28px] font-bold tracking-[-0.025em] leading-[1.3] text-center mb-[10px] animate-fade-up"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-ink)',
            }}
          >
            마음이 담긴 링크가
            <br />
            준비되었어요!
          </h1>
          <p
            className="text-[16px] leading-[1.7] text-center mb-12 animate-fade-up"
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-ink-soft)',
            }}
          >
            카카오톡으로 설렘을 전달해보세요.
            <br />
            링크를 받은 분은 봉투를 열어 편지를 확인할 수 있어요.
          </p>

          {/* main card: 560px r-[24px] */}
          <div
            className="w-full max-w-[560px] bg-white rounded-[24px] border border-black/[0.08] overflow-hidden animate-fade-up"
            style={{ boxShadow: '0 8px 48px rgba(28,23,20,0.05)' }}
          >
            {/* letter thumb */}
            <div
              className="px-8 py-6 border-b border-black/[0.08] relative"
              style={{ background: 'var(--paper-rose-bg)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: 'var(--paper-rose-accent)' }}
              />
              <div
                className="w-5 h-px mb-[10px] mt-1"
                style={{ background: 'var(--paper-rose-deco)' }}
              />
              <p
                className="text-[14px] italic mb-3"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--paper-rose-color)',
                }}
              >
                {MOCK_LETTER.to}
              </p>
              <p
                className="text-[16px] leading-[1.85] mb-4"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-ink-mid)',
                }}
              >
                {MOCK_LETTER.body}
              </p>
              <div className="flex justify-between pt-3 border-t border-black/[0.06]">
                <span
                  className="text-[14px] italic"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--paper-rose-color)',
                  }}
                >
                  {MOCK_LETTER.from}
                </span>
                <span
                  className="text-[14px]"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  {MOCK_LETTER.date}
                </span>
              </div>
            </div>

            {/* actions-area */}
            <div className="px-8 py-7">
              {/* link row */}
              <div
                className="flex gap-2 mb-5 rounded-xl border border-black/[0.14] pl-4 pr-1 py-1 items-center"
                style={{ background: 'var(--color-cream)' }}
              >
                <span
                  className="flex-1 text-[12px] overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  {MOCK_LETTER.shareUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 px-4 py-2 rounded-[8px] text-[12px] font-medium border cursor-pointer transition-all"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: copied ? 'var(--color-success-bg)' : '#fff',
                    borderColor: copied ? '#b8edd0' : 'rgba(28,23,20,0.14)',
                    color: copied
                      ? 'var(--color-success)'
                      : 'var(--color-ink-mid)',
                  }}
                >
                  {copied ? '복사됨 ✓' : '복사'}
                </button>
              </div>

              {/* or divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-black/[0.08]" />
                <span
                  className="text-[11px]"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-ink-soft)',
                  }}
                >
                  또는
                </span>
                <div className="flex-1 h-px bg-black/[0.08]" />
              </div>

              {/* kakao-btn: 피그마 494x44 p=10,20,10,20 — KakaoShareButton 컴포넌트 사용 */}
              <KakaoShareButton
                fullWidth
                className="mb-3"
                style={{ paddingTop: 10, paddingBottom: 10 }}
                onClick={() => {
                  /* TODO: 카카오 공유 SDK 연동 */
                }}
              >
                카카오톡으로 보내기
              </KakaoShareButton>

              {/* home-btn: 피그마 494x44 r=12 */}
              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => navigate('/')}
              >
                메인으로 돌아가기
              </Button>

              {/* 피그마 신규: notice 박스 제거됨 */}
            </div>
          </div>
        </div>
      </main>

      <BrandFooter />
    </div>
  );
}
