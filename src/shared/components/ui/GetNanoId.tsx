import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAutuStore } from "../../store/useAuthStore";
import { useGetApiUsersMe } from "../../api/generated/users/users";

export const GetNanoId = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { checkedLoggedin: isLoggedin, setLogin, nanoId } = useAutuStore();

  const { refetch } = useGetApiUsersMe({
    query: {
      enabled: false,
    }
  });

  useEffect(() => {
    const savedToken = sessionStorage.getItem("nanoId");

    if (isLoggedin && nanoId && savedToken ) return;

    if (savedToken) {
      setLogin(savedToken);
    } else {
      handleFetchGuestInfo();
    }
  }, [location.pathname]);

  const handleFetchGuestInfo = async () => {
    try {
      const result = await refetch();
      
      const nanoId = result.data?.data?.nanoId;

      if (nanoId) {
        setLogin(nanoId);
        sessionStorage.setItem("nanoId", nanoId);
        console.log("게스트 토큰 발급 및 저장 완료");
      }
    } catch (err) {
      console.error("게스트 정보 가져오기 실패:", err);
    }
  };

  return <>{children}</>;
};
