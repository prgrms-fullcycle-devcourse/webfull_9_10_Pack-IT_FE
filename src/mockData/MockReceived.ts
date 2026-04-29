import type { LetterItem, } from "../shared/schemas/letterSchema";

export const MOCK_RECEIVED: LetterItem[] = [
  {
    id: "r1",
    to: "소중한 당신에게",
    from: "소중한 친구",
    preview: "진심으로 생일 축하해! 오늘 하루는...",
    content: "진심으로 생일 축하해!\n\n우리가 함께한 시간들이 나에게는 큰 선물이야. 항상 곁에 있어줘서 고마워!",
    keyword: "생일",
    theme: "rose",
    createdAt: "04월 22일",
  },
];