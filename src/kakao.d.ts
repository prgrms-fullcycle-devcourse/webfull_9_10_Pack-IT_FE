interface Kakao {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendDefault: (args: {
        objectType: string;
        content: {
          title: string;
          description: string;
          imageUrl: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        };
      }) => void;
    };
  }
  
  interface Window {
    Kakao: Kakao;
  }