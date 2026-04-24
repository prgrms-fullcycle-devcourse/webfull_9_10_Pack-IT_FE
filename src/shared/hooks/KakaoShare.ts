interface kakaoShareProps {
  id?: string;
  title?: string;
  sender?: string;
}

export const kakaoShare = ({
  id,
  title = "마음을 전해드립니다. Pack-It",
  sender = '누군가', //추후 설정 필요
}: kakaoShareProps) => {
  if (typeof window === "undefined" || !window.Kakao) {
    return;
  }
  const { Kakao } = window;
  const originUrl = window.location.origin;

  if (!Kakao.isInitialized()) {
    Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
  }

  const shareUrl = id ? `${originUrl}/letter/${id}` : originUrl;

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: title,
      description: `${sender}님의 소중한 마음을 담은 편지가 도착했습니다.`,
      imageUrl: `${originUrl}/test.png`,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
  });
};
