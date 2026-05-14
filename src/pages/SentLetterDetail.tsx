// src/pages/SentLetterDetail.tsx
// 내가 쓴 편지 상세 — 피그마: 편지지 + 편지삭제 + 카카오톡으로 보내기
import { useNavigate, useLocation, useParams } from "react-router-dom";
import KakaoShareButton from "../shared/components/ui/KakaoShareButton";
import BackButton from "../shared/components/ui/BackButton";
import LetterPaper from "../shared/components/ui/LetterPaper";
import type { LetterItem, LetterTheme } from "../shared/schemas/letterSchema";

export default function SentLetterDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: nanoId } = useParams<{ id: string }>();

  const activeTab = location.state?.activeTab ?? "sent";
  const item: LetterItem | undefined = location.state?.item;

  if (!nanoId || !item) {
    navigate("/mypage", { state: { activeTab }, replace: true });
    return null;
  }

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: "var(--color-cream)" }}
    >
      {/* NAV — 피그마: < 편지 상세 */}
      <nav
        className="h-[52px] flex items-center px-5 border-b border-black/[0.08] flex-shrink-0 bg-white"
        style={{ position: "sticky", top: 0, zIndex: 100 }}
      >
        <BackButton
          onClick={() => navigate("/mypage", { state: { activeTab } })}
        />
        <span
          className="text-[16px] font-bold absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
        >
          편지 상세
        </span>
      </nav>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* 편지지 */}
        <LetterPaper
          theme={item.theme as LetterTheme}
          to={item.to}
          content={item.content}
          from={item.from}
          date={item.createdAt}
          className="mb-4"
          scrollable
        />

        
      </div>
      <div className="flex-shrink-0 px-5 py-4">
        <KakaoShareButton
          fullWidth
          style={{
            height: 54,
            fontSize: 18,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          카카오톡으로 보내기
        </KakaoShareButton>
      </div>

      
    </div>
  );
}
