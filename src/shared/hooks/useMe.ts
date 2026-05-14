import { useGetApiUsersMe } from "../api/generated/users/users";

export const useMe = () => {
  const { data, isLoading } = useGetApiUsersMe();
  const me = data?.data;
  const isGuest = me?.userType === "GUEST";
  const isMember = me?.userType === "MEMBER";

  return { me, isGuest, isMember, isLoading };
};
