// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WriteLetter from "./pages/WriteLetter";
import ShareLink from "./pages/ShareLink";
import ReceiveLetter from "./pages/ReceiveLetter";
import MyPage from "./pages/MyPage";
import SentLetterDetail from "./pages/SentLetterDetail";
import ReceivedLetterDetail from "./pages/ReceivedLetterDetail";
import ChannelTalk from "./shared/components/ui/ChannelTalk";
import { GetNanoId } from "./shared/components/ui/GetNanoId";
import KakaoSuccess from "./pages/KakaoSuccess";

export default function App() {
  return (
    <>
      <ChannelTalk />
      <div
        className="min-h-screen mx-auto"
        style={{ maxWidth: 390, background: "white" }}
      >
        <GetNanoId>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<WriteLetter />} />
            <Route path="/share" element={<ShareLink />} />
            <Route path="/letter/:letterId" element={<ReceiveLetter />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/sent/:id" element={<SentLetterDetail />} />
            <Route
              path="/mypage/received/:id"
              element={<ReceivedLetterDetail />}
            />
            <Route path="/kakaoauthCheck" element={<KakaoSuccess />} />
          </Routes>
        </GetNanoId>
      </div>
    </>
  );
}
