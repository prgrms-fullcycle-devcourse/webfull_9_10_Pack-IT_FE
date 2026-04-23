// src/pages/MyPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../shared/components/layout/Logo';
import BrandFooter from '../shared/components/layout/BrandFooter';
import Button from '../shared/components/ui/Button';
import Textarea from '../shared/components/ui/Textarea';
import MyPageSidebar from '../features/mypage/components/MyPageSidebar';
import LetterListItem from '../features/mypage/components/LetterListItem';
import ReceivedLetterModal from '../features/mypage/components/ReceivedLetterModal';
import type { MyPageTab, LetterItem, UserInfo } from '../shared/schemas/letterSchema';

// TODO: API 연동 후 제거
const MOCK_USER: UserInfo = { name: '마음을 담아', sentCount: 3, receivedCount: 1 };

const MOCK_SENT: LetterItem[] = [
  { id: '1', to: 'To. 소중한 친구에게', from: '마음을 담아', preview: '진심으로 생일 축하해! 오늘 하루는 세상에서 네가 가장 행복하고...', content: `진심으로 생일 축하해! 🎂\n\n오늘 하루는 세상에서 네가 가장 행복하고 따뜻한 시간들로만 가득 채웠으면 좋겠다. 항상 곁에 있어줘서 고맙고, 오늘 정말 좋은 하루 보내! ✨`, keyword: '생일', theme: 'rose', createdAt: '2026.04.22', shareUrl: 'https://itda.link/letter/abc1234' },
  { id: '2', to: 'To. 엄마에게', from: '마음을 담아', preview: '항상 저를 위해 애써주셔서 진심으로 감사드려요. 엄마 덕분에...', content: `항상 저를 위해 애써주셔서 진심으로 감사드려요.\n\n엄마 덕분에 제가 이렇게 잘 자랄 수 있었어요. 늘 건강하시고 행복하세요.`, keyword: '감사', theme: 'ivory', createdAt: '2026.04.15', shareUrl: 'https://itda.link/letter/def5678' },
  { id: '3', to: 'To. 팀원들에게', from: '마음을 담아', preview: '함께 고생한 프로젝트가 드디어 마무리됐네요. 모두 정말 수고...', content: `함께 고생한 프로젝트가 드디어 마무리됐네요.\n\n모두 정말 수고 많으셨어요. 앞으로도 함께 좋은 결과 만들어가요!`, keyword: '응원', theme: 'blue', createdAt: '2026.04.10', shareUrl: 'https://itda.link/letter/ghi9012' },
];

const MOCK_RECEIVED: LetterItem[] = [
  { id: 'r1', to: '소중한 당신에게', from: '소중한 친구로부터', preview: '오늘 너의 생일을 정말 축하해. 우리가 함께한 시간들이...', content: `오늘 너의 생일을 정말 축하해.\n\n우리가 함께한 시간들이 나에게는 큰 선물이야. 항상 곁에 있어줘서 고마워!`, keyword: '생일', theme: 'rose', createdAt: '2026.04.20' },
];

// ── 컴포넌트 외부 선언 (렌더 중 생성 방지) ──
interface EmptyStateProps {
  text: string;
  onWrite: () => void;
  onHome: () => void;
}
function EmptyState({ text, onWrite, onHome }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[18px] py-12 text-center">
      <p className="text-[16px] leading-[1.7]"
         style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-mid)' }}>
        {text}
      </p>
      <div className="flex gap-3">
        <Button variant="primary" size="lg" onClick={onWrite}>
          새로운 마음 잇기 →
        </Button>
        <Button variant="secondary" size="lg" onClick={onHome}>
          서비스 둘러보기
        </Button>
      </div>
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MyPageTab>('sent');
  const [sentList, setSentList] = useState<LetterItem[]>(MOCK_SENT);
  const [receivedList, setReceivedList] = useState<LetterItem[]>(MOCK_RECEIVED);
  const [selectedLetter, setSelectedLetter] = useState<LetterItem | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-cream)' }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[62px] flex items-center justify-center border-b border-black/[0.08]"
           style={{ background: 'rgba(250,247,244,0.88)', backdropFilter: 'blur(12px)' }}>
        <div className="w-full max-w-[860px] flex items-center justify-between px-6">
          <Logo />
          <Button variant="primary" size="sm" onClick={() => navigate('/write')}>
            + 새 편지 쓰기
          </Button>
        </div>
      </nav>

      <main className="flex-1 pt-[62px]">
        <div className="max-w-[860px] mx-auto px-6 pt-12 pb-20 grid gap-7"
             style={{ gridTemplateColumns: '200px 1fr', alignItems: 'start' }}>

          <MyPageSidebar
            user={MOCK_USER}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={() => {/* TODO: 로그아웃 */}}
          />

          <div className="min-w-0">

            {/* 내가 쓴 편지 */}
            {activeTab === 'sent' && (
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                  내가 쓴 편지
                </h2>
                {sentList.length === 0
                  ? <EmptyState text={'아직 작성한 편지가 없어요.\n소중한 사람에게 첫 편지를 보내보세요.'} onWrite={() => navigate('/write')} onHome={() => navigate('/')} />
                  : <div className="flex flex-col gap-[10px]">
                      {sentList.map((item) => (
                        <LetterListItem
                          key={item.id} item={item} type="sent"
                          onDelete={(id) => setSentList((p) => p.filter((l) => l.id !== id))}
                          onCopyLink={(url) => navigator.clipboard.writeText(url).catch(() => {})}
                        />
                      ))}
                    </div>
                }
              </div>
            )}

            {/* 받은 편지 */}
            {activeTab === 'received' && (
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                  받은 편지
                </h2>
                {receivedList.length === 0
                  ? <EmptyState text={'아직 받은 편지가 없어요.\n먼저 편지를 써보는 건 어떨까요?'} onWrite={() => navigate('/write')} onHome={() => navigate('/')} />
                  : <div className="flex flex-col gap-[10px]">
                      {receivedList.map((item) => (
                        <LetterListItem
                          key={item.id} item={item} type="received"
                          onDelete={(id) => setReceivedList((p) => p.filter((l) => l.id !== id))}
                          onClick={setSelectedLetter}
                        />
                      ))}
                    </div>
                }
              </div>
            )}

            {/* 건의하기 */}
            {activeTab === 'feedback' && (
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] mb-6"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                  건의하기
                </h2>
                <div className="bg-white rounded-[16px] border border-black/[0.08] p-7">
                  <p className="text-[12px] tracking-[0.06em] uppercase mb-[10px]"
                     style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-rose)' }}>
                    FEEDBACK
                  </p>
                  <p className="text-[14px] font-medium mb-1"
                     style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}>
                    서비스 개선에 함께해주세요
                  </p>
                  <p className="text-[12px] leading-[1.6] mb-5"
                     style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>
                    불편한 점이나 개선 아이디어가 있으시면 자유롭게 남겨주세요.<br />
                    소중한 의견 하나하나 꼼꼼히 읽고 반영할게요.
                  </p>
                  <Textarea
                    placeholder="서비스를 사용하면서 느낀 점을 편하게 적어주세요."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    rows={5}
                    className="mb-3"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 12, minHeight: 100 }}
                  />
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => { setFeedbackText(''); alert('소중한 의견 감사해요!'); }}
                  >
                    제출하기
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <BrandFooter />

      <ReceivedLetterModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onReply={() => { setSelectedLetter(null); navigate('/write'); }}
        onSavePdf={() => alert('PDF 저장 기능은 html2pdf 라이브러리를 통해 구현됩니다.')}
      />
    </div>
  );
}
