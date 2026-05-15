import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        {
          type: "KAKAO_LOGIN_SUCCESS",
        },
        window.location.origin
      );

      window.close();
    } else {
      alert("로그인 처리 중 오류가 발생했습니다.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FAF6F0]">
      <p className="text-[15px] text-[#333333] font-medium">
        인증 정보를 확인하고 있습니다...
      </p>
    </div>
  );
}
