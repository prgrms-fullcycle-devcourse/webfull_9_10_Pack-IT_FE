import type { LetterItem } from "../shared/schemas/letterSchema";

export const MOCK_RECEIVED: LetterItem[] = [
  {
    id: "r1",
    to: "소중한 당신에게",
    from: "친구",
    preview: "진심으로 생일 축하해! 오늘 하루는...",
    content:
      "진심으로 생일 축하해!\n\n우리가 함께한 시간들이 나에게는 큰 선물이야. 항상 곁에 있어줘서 고마워!",
    keyword: "생일",
    theme: 1,
    createdAt: "04월 22일",
  },
  {
    id: "r2",
    to: "선생님에게",
    from: "제자가",
    preview: "안녕하세요 선생님 스승의날로 편지를 보내네요",
    content:
      "진안녕하세요 선생님 스승의날로 편지를 보내네요\n\n덕분에 정신차리고 삶을 살아가고 있어요. 감사의 말씀을 전하고 싶어서 편지를 보내요",
    keyword: "감사",
    theme: 3,
    createdAt: "04월 12일",
  },
];
