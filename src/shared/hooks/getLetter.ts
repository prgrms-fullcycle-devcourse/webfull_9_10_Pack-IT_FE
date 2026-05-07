import {
  useGetLetterDetail,
  useVerifyLetterPassword,
} from "../api/generated/letters/letters";

export const useVerifyLetter = (letterId: string, password: string) => {
  const { mutateAsync, isPending } = useVerifyLetterPassword();

  const verify = async () => {
    try {
      const result = await mutateAsync({
        letterId,
        data: { password: password },
      });
      console.log("결과값 :" + result);
      return "success";
    } catch (error) {
      console.log("에러값 : " + error);
      throw error.error;
    }
  };

  return { verify, isPending };
};

export const useGetLetterData = (letterId: string) => {
  const query = useGetLetterDetail(letterId, { 
    query: { enabled: false } 
  });

  const getLetter = async () => {
    const result = await query.refetch();
    
    if (result.isError) {
      throw result.error; 
    }
    
    return result.data;
  };

  return { getLetter, ...query };
};
