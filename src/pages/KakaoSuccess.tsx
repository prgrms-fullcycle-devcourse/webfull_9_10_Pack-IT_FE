import { useEffect } from "react";

export default function KakaoSuccess() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage(
        {
          type: "KAKAO_LOGIN_SUCCESS",
        },
        window.location.origin,
      );

      window.close();
    } else {
      alert("로그인 처리 중 오류가 발생했습니다.");
      window.close();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-sm text-gray-500">인증 정보를 확인하고 있습니다...</p>
    </div>
  );
}
