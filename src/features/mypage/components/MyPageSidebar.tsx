// src/features/mypage/components/MyPageSidebar.tsx
import type { MyPageTab, UserInfo } from '../../../shared/schemas/letterSchema';

const MENU: { tab: MyPageTab; icon: string; label: string }[] = [
  { tab: 'sent',     icon: '✉️', label: '내가 쓴 편지' },
  { tab: 'received', icon: '💌', label: '받은 편지' },
  { tab: 'feedback', icon: '💬', label: '건의하기' },
];

interface MyPageSidebarProps {
  user: UserInfo;
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
  onLogout: () => void;
}

export default function MyPageSidebar({ user, activeTab, onTabChange, onLogout }: MyPageSidebarProps) {
  return (
    <aside className="w-[200px] flex-shrink-0 sticky top-[84px]">
      {/* user-card */}
      <div className="bg-white rounded-[20px] border border-black/[0.08] px-5 py-6 mb-3 text-center">
        <div
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center mx-auto mb-3 text-[20px] font-bold text-white"
          style={{ fontFamily: 'var(--font-serif)', background: 'linear-gradient(135deg, var(--color-rose-light), var(--color-rose))' }}
        >
          {user.name.charAt(0)}
        </div>
        <p className="text-[14px] font-medium mb-3"
           style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink)' }}>
          {user.name}
        </p>
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-black/[0.08] mb-3">
          {[{ n: user.sentCount, l: '쓴 편지' }, { n: user.receivedCount, l: '받은 편지' }].map((s, i) => (
            <div key={i} className="rounded-[10px] px-2 py-[10px] text-center"
                 style={{ background: 'var(--color-cream)' }}>
              <p className="text-[18px] font-bold tracking-[-0.02em] mb-0.5"
                 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}>
                {s.n}
              </p>
              <p className="text-[10px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-ink-soft)' }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onLogout}
          className="text-[10px] font-medium px-[9px] py-0.5 rounded-[10px] border-none cursor-pointer"
          style={{ fontFamily: 'var(--font-sans)', background: 'var(--color-rose-pale)', color: 'var(--color-rose)' }}
        >
          로그아웃
        </button>
      </div>

      {/* sidebar-nav */}
      <nav className="bg-white rounded-[16px] border border-black/[0.08] overflow-hidden">
        {MENU.map((item, i) => (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`
              w-full flex items-center gap-[9px] px-4 py-[13px]
              cursor-pointer border-none outline-none text-left transition-colors duration-[120ms]
              ${i < MENU.length - 1 ? 'border-b border-black/[0.08]' : ''}
            `}
            style={{ background: activeTab === item.tab ? 'var(--color-rose-pale)' : 'transparent' }}
          >
            <span className="text-[14px] opacity-80">{item.icon}</span>
            <span
              className={`text-[13px] ${activeTab === item.tab ? 'font-medium' : 'font-normal'}`}
              style={{
                fontFamily: 'var(--font-sans)',
                color: activeTab === item.tab ? 'var(--color-rose)' : 'var(--color-ink-mid)',
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
