// src/shared/schemas/letterSchema.ts

export type LetterTheme = 1 | 2 | 3 | 4;
export type LetterKeyword = "생일" | "응원" | "감사" | "사과" | "고백" | "화해";
export type LetterTone = "다정하게" | "격식있게" | "감성적인" | "담백하게";
export type MyPageTab = "sent" | "received" | "feedback";

export interface LetterFormData {
  to: string;
  from: string;
  keyword: LetterKeyword | null;
  content: string;
  originalContent: string; // AI 적용 직전 원본 내용 (원본 복구용)
  tone: LetterTone | null;
  letterPassword?: string; // 열람 비밀번호
  theme: LetterTheme;
}

// 키워드별 태그 색상
export const KEYWORD_TAG_COLOR: Record<
  LetterKeyword,
  { bg: string; color: string }
> = {
  생일: { bg: "#fff5f6", color: "#e8526a" },
  응원: { bg: "#f9f9e0", color: "#97750f" },
  감사: { bg: "#f2f9ef", color: "#359216" },
  사과: { bg: "#f8f4ff", color: "#6e48ba" },
  고백: { bg: "#fff5f6", color: "#e8526a" },
  화해: { bg: "#f9f9e0", color: "#97750f" },
};

export interface LetterItem {
  id: string;
  to: string;
  from: string;
  preview: string;
  content: string;
  keyword: LetterKeyword;
  theme: LetterTheme;
  createdAt: string;
  shareUrl?: string;
}

export interface UserInfo {
  name: string;
  sentCount: number;
  receivedCount: number;
}

export const KEYWORD_LIST: { label: LetterKeyword; emoji: string }[] = [
  { label: "생일", emoji: "🎂" },
  { label: "응원", emoji: "💪" },
  { label: "감사", emoji: "🙏" },
  { label: "사과", emoji: "😔" },
  { label: "고백", emoji: "💌" },
  { label: "화해", emoji: "🤝" },
];

export const TONE_LIST: { label: LetterTone; icon: string; desc: string }[] = [
  { label: "다정하게", icon: "🌸", desc: "따뜻하고 친근한" },
  { label: "격식있게", icon: "🎩", desc: "단정하고 예의 바른" },
  { label: "감성적인", icon: "🌙", desc: "시처럼 섬세한" },
  { label: "담백하게", icon: "🍃", desc: "간결하고 솔직한" },
];

export const THEME_MAP: Record<
  LetterTheme,
  {
    label: string;
    sub: string;
    primaryColor: string;
    bgColor: string;
    decoColor: string;
  }
> = {
  1: {
    label: "로즈",
    sub: "따뜻한 핑크",
    primaryColor: "#e8526a",
    bgColor: "linear-gradient(160deg,#fff5f7,#ffe0e8)",
    decoColor: "#f7d4da",
  },
  2: {
    label: "아이보리",
    sub: "부드러운 크림",
    primaryColor: "#c08040",
    bgColor: "linear-gradient(160deg,#fffbf5,#fff0dc)",
    decoColor: "#e0c090",
  },
  3: {
    label: "페이퍼",
    sub: "빈티지 베이지",
    primaryColor: "#8a7868",
    bgColor: "linear-gradient(160deg,#f8f5f0,#ede8e0)",
    decoColor: "#c0b8a8",
  },
  4: {
    label: "블루",
    sub: "차분한 하늘",
    primaryColor: "#4070c0",
    bgColor: "linear-gradient(160deg,#f0f6ff,#e0eeff)",
    decoColor: "#a8c8f0",
  },
};
