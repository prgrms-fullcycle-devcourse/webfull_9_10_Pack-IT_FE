// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WriteLetter from "./pages/WriteLetter";
import ShareLink from "./pages/ShareLink";
import ReceiveLetter from "./pages/ReceiveLetter";
import MyPage from "./pages/MyPage";
import SentLetterDetail from "./pages/SentLetterDetail";
import ReceivedLetterDetail from "./pages/ReceivedLetterDetail";

export default function App() {
  return (
    <div
      className="min-h-screen mx-auto"
      style={{ maxWidth: 390, background: "white" }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<WriteLetter />} />
        <Route path="/share" element={<ShareLink />} />
        <Route path="/letter/:letterId" element={<ReceiveLetter />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/sent/:id" element={<SentLetterDetail />} />
        <Route path="/mypage/received/:id" element={<ReceivedLetterDetail />} />
      </Routes>
    </div>
  );
}
