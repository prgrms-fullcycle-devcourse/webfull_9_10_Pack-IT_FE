import confetti from "canvas-confetti";
import type { LetterKeyword } from "../schemas/letterSchema";

export const HEART_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 30 + i * 5.5,
  delay: i * 0.3,
  duration: 2.5 + (i % 3) * 0.7,
  size: 14 + (i % 3) * 7,
  drift: (i % 2 === 0 ? 1 : -1) * ((i % 3) + 1),
}));

export const PEACE_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 5 + i * 4.5,
  startY: -5 - (i % 4) * 3,
  endY: 110,
  delay: 0,
  duration: 5 + (i % 4) * 1, // 2.5 → 5 로 변경
  size: 3 + (i % 3) * 2,
  color: ["#c4b5fd", "#93c5fd", "#86efac", "#fde68a", "#fca5a5"][i % 5],
  wiggle: (i % 2 === 0 ? 1 : -1) * (2 + (i % 4)),
}));



export const letterOpenEffect = (
  keyword: LetterKeyword,
  setShowHearts: (v: boolean) => void,
  setShowPeace: (v: boolean) => void,
) => {
  switch (keyword) {
    case "생일":
    case "감사":
    case "응원":
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#e8526a", "#f7d4da", "#fbbf24", "#34d399", "#60a5fa"],
      });
      break;
    case "고백":
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 5000);
      break;
    case "사과":
    case "화해":
      setShowPeace(true);
      setTimeout(() => setShowPeace(false), 6000);
      break;
  }
};
