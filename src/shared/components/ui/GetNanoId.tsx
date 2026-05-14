import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAutuStore } from "../../store/useAuthStore";
import { useGetApiUsersMe } from "../../api/generated/users/users";

interface GetNanoIdProps {
  children: React.ReactNode;
}

export const GetNanoId = ({ children }: GetNanoIdProps) => {
  const location = useLocation();
  const { setLogin, setToken } = useAutuStore();

  const { refetch } = useGetApiUsersMe({
    query: {
      enabled: false,
    },
  });

  const handleFetchGuestInfo = useCallback(async () => {
    try {
      const result = await refetch();

      const serverNanoId = result.data?.data?.nanoId;
      const isKakaoAuth = !!result.data?.data?.kakaoUid;

      const savedToken = sessionStorage.getItem("nanoId");

      if (serverNanoId) {
        if (serverNanoId !== savedToken) {
          sessionStorage.setItem("nanoId", serverNanoId);
        }

        if (isKakaoAuth) {
          setLogin(serverNanoId);
        } else {
          setToken(serverNanoId);
        }
      }
    } catch (err) {
      console.error("사용자 정보를 가져오는 중 오류가 발생했습니다 : ", err);
    }
  }, [refetch, setLogin, setToken]);

  useEffect(() => {
    handleFetchGuestInfo();
  }, [location.pathname, handleFetchGuestInfo]);

  return <>{children}</>;
};
