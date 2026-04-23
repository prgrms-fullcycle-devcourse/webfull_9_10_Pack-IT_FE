// src/shared/schemas/letterSchema.ts

export type LetterTheme = 'rose' | 'ivory' | 'paper' | 'blue';
export type LetterKeyword = '생일' | '응원' | '감사' | '사과' | '고백' | '화해';
export type LetterTone = '다정하게' | '격식있게' | '감성적인' | '담백하게';
export type MyPageTab = 'sent' | 'received' | 'feedback';

export interface LetterFormData {
  to: string;
  from: string;
  keyword: LetterKeyword | null;
  content: string;
  tone: LetterTone | null;
  theme: LetterTheme;
}

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
  { label: '생일', emoji: '🎂' },
  { label: '응원', emoji: '💪' },
  { label: '감사', emoji: '🙏' },
  { label: '사과', emoji: '😔' },
  { label: '고백', emoji: '💌' },
  { label: '화해', emoji: '🤝' },
];

export const TONE_LIST: { label: LetterTone; icon: string; desc: string }[] = [
  { label: '다정하게', icon: '🌸', desc: '따뜻하고 친근한 말투' },
  { label: '격식있게', icon: '🎩', desc: '단정하고 예의 바른 말투' },
  { label: '감성적인', icon: '🌙', desc: '시처럼 섬세한 말투' },
  { label: '담백하게', icon: '🍃', desc: '간결하고 솔직한 말투' },
];

export const THEME_LIST: {
  value: LetterTheme;
  label: string;
  sub: string;
  accentColor: string;
}[] = [
  { value: 'rose',  label: '로즈',    sub: '따뜻한 핑크',  accentColor: '#c43e55' },
  { value: 'ivory', label: '아이보리', sub: '부드러운 크림', accentColor: '#a07040' },
  { value: 'paper', label: '페이퍼',  sub: '빈티지 베이지', accentColor: '#6a6058' },
  { value: 'blue',  label: '블루',    sub: '차분한 하늘',   accentColor: '#3060a0' },
];

export const THEME_SWATCH_BG: Record<LetterTheme, string> = {
  rose:  'linear-gradient(150deg, #ffe8ec, #ffc8d4)',
  ivory: 'linear-gradient(150deg, #fff8ee, #f5e8d0)',
  paper: 'linear-gradient(150deg, #f0ede8, #ddd8d0)',
  blue:  'linear-gradient(150deg, #eaf3ff, #c8deff)',
};
