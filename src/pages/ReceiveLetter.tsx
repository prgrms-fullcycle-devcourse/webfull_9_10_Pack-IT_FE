// src/pages/ReceiveLetter.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/components/layout/Logo';
import BrandFooter from '../shared/components/layout/BrandFooter';
import Button from '../shared/components/ui/Button';
import LetterPaper from '../features/letter/components/LetterPaper';

// TODO: useParams().letterId → GET /letters/:id API 연동
const MOCK_LETTER = {
  to: 'To. 소중한 당신에게',
  content: `진심으로 생일 축하해! 🎂\n\n오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다. 맛있는 것도 많이 먹고, 주변 사람들에게 축하도 듬뿍 받는 최고의 날이 되길 바랄게.\n\n항상 곁에 있어줘서 고맙고, 오늘 정말 좋은 하루 보내! ✨`,
  from: 'From. 마음을 담아',
  date: '2026년 4월 22일',
  theme: 'rose' as const,
};

const CONFETTI_COLORS = [
  '#e8526a',
  '#f2956a',
  '#f7d4da',
  '#a8d5a2',
  '#85b7eb',
  '#f4c475',
];

export default function ReceiveLetter() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => setShowConfetti(true), 300);
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[64px] flex items-center justify-center border-b border-black/[0.08]"
        style={{
          background: 'rgba(250,247,244,0.92)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-full max-w-[860px] flex items-center justify-between px-6">
          <Logo />
          <div
            className="px-[14px] py-[5px] rounded-full border border-black/[0.14]"
            style={{ background: 'var(--color-cream)' }}
          >
            <span
              className="text-[12px]"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              편지가 도착했어요 💌
            </span>
          </div>
        </div>
      </nav>

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              // 폭죽 내리는 애니메이션 연출 추후 에러 수정필요
              style={{
                left: `${Math.random() * 100}%`,
                width: `${5 + Math.random() * 6}px`,
                height: `${5 + Math.random() * 6}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                background: CONFETTI_COLORS[i % 6],
                animation: `confettiFall ${2.5 + Math.random() * 2.5}s linear ${Math.random() * 2}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(232,82,106,0.07) 0%, transparent 70%)',
        }}
      />

      <main className="flex-1 pt-[64px] flex flex-col items-center justify-center px-6 py-16 relative z-[2]">
        {/* 봉투 상태 */}
        {!opened && (
          <div className="flex flex-col items-center animate-fade-up">
            <p
              className="text-[14px] mb-7 tracking-[0.02em] animate-pulse-soft"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              클릭해서 마음 열기
            </p>
            <div
              onClick={handleOpen}
              className="cursor-pointer transition-transform duration-200 hover:scale-[1.04] hover:-translate-y-1 active:scale-[0.97]"
              style={{
                filter: 'drop-shadow(0 16px 48px rgba(232,82,106,0.25))',
              }}
            >
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
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
                <path
                  d="M216 40L110 110L216 156"
                  fill="#c43e55"
                  opacity="0.25"
                />
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
              className="text-[28px] font-normal tracking-[-0.02em] mt-8 mb-[6px]"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ink)',
              }}
            >
              편지가 도착했어요
            </h1>
            <p
              className="text-[16px] leading-[1.6] text-center"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              누군가 당신에게 마음을 전했어요.
              <br />
              봉투를 클릭해 열어보세요.
            </p>
          </div>
        )}

        {/* 편지 열림 상태 */}
        {opened && (
          <div className="w-full max-w-[560px] flex flex-col items-center animate-fade-up">
            <LetterPaper
              theme={MOCK_LETTER.theme}
              to={MOCK_LETTER.to}
              content={MOCK_LETTER.content}
              from={MOCK_LETTER.from}
              date={MOCK_LETTER.date}
              scrollable
            />

            {/* action row */}
            <div className="grid grid-cols-3 gap-[10px] w-full mt-4 mb-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() =>
                  alert(
                    'PDF 저장 기능은 html2pdf 라이브러리를 통해 구현됩니다.',
                  )
                }
              >
                ↓ PDF 저장
              </Button>
              <Button
                variant="outline-rose"
                size="md"
                onClick={() => alert('로그인 후 받은 편지함에 보관됩니다.')}
              >
                🗂 보관하기
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/write')}
              >
                💌 답장 쓰기
              </Button>
            </div>

            <p
              className="text-[11px] text-center"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-ink-soft)',
              }}
            >
              보관하기는 로그인 후 이용할 수 있어요.
            </p>
          </div>
        )}
      </main>

      <BrandFooter />
    </div>
  );
}
