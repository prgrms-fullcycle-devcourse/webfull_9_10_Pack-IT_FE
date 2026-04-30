import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  onClick?: () => void;
}

// 기본 navigate(-1)
export default function BackButton({ onClick }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={onClick ?? (() => navigate(-1))}
      className="w-8 h-8 flex items-center justify-center text-[16px] bg-transparent pr-4 border-none cursor-pointer"
    >
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
        <path
          d="M9 1L1 9L9 17"
          stroke="#5a4f4a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
