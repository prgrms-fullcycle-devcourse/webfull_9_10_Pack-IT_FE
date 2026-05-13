// src/shared/components/ui/KakaoLoginButton.tsx
import { useEffect, type ButtonHTMLAttributes } from "react";
import { useGetApiUsersMe } from "../../api/generated/users/users";
import { useAutuStore } from "../../store/useAuthStore";

interface KakaoLoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const SIZE_CLASS = {
  sm: "px-4 py-2 text-[13px] gap-[6px] rounded-xl",
  md: "px-5 py-[14px] text-[14px] gap-[10px] rounded-xl",
  lg: "px-7 py-4 text-[15px] gap-3 rounded-xl",
};

const SYMBOL_SIZE = {
  sm: 16,
  md: 20,
  lg: 22,
};

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_CALLBACK_PATH = "/api/proxy/api/auth/kakao/callback";

export default function KakaoLoginButton({
  size = "md",
  fullWidth = false,
  children = "카카오 로그인",
  className = "",
  disabled,
  ...props
}: KakaoLoginButtonProps) {
  const symbolSize = SYMBOL_SIZE[size];
  const { nanoId, setLogin } = useAutuStore();
  const { refetch } = useGetApiUsersMe({
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "KAKAO_LOGIN_SUCCESS") return;

      const result = await refetch();
      const newNanoId = result.data?.data?.nanoId;

      if (newNanoId) {
        setLogin(newNanoId);
        sessionStorage.setItem("nanoId", newNanoId);
        console.log("카카오 로그인 성공:", newNanoId);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [refetch, setLogin]);

  const kakaoLogin = () => {
    if (!nanoId) return;

    const redirectUri = `${window.location.origin}${KAKAO_CALLBACK_PATH}`;
    const queryString = new URLSearchParams({
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: redirectUri,
      response_type: "code",
      state: nanoId,
    }).toString();

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `${KAKAO_AUTH_URL}?${queryString}`,
      "KakaoLoginPopup",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`,
    );
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center font-medium
        border-none cursor-pointer transition-all hover:opacity-90
        ${SIZE_CLASS[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      style={{
        fontFamily: "var(--font-sans)",
        background: "#FEE500",
        color: "#000000",
        ...props.style,
      }}
      onClick={kakaoLogin}
      disabled={!nanoId || disabled}
    >
      <svg
        width={symbolSize}
        height={symbolSize}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 0.667C5.373 0.667 0 4.92 0 10.173c0 3.373 2.227 6.333 5.587 8.013L4.133 22.773a.373.373 0 0 0 .547.4l6.227-4.133c.36.027.72.04 1.093.04 6.627 0 12-4.253 12-9.507C24 4.92 18.627.667 12 .667z"
          fill="#000000"
        />
      </svg>
      {children}
    </button>
  );
}
