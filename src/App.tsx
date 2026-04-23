// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WriteLetter from './pages/WriteLetter';
import ShareLink from './pages/ShareLink';
import ReceiveLetter from './pages/ReceiveLetter';
import MyPage from './pages/MyPage';

export default function App() {
  return (
    <Routes>
      <Route path="/"                 element={<Home />} />
      <Route path="/write"            element={<WriteLetter />} />
      <Route path="/share"            element={<ShareLink />} />
      <Route path="/letter/:letterId" element={<ReceiveLetter />} />
      <Route path="/mypage"           element={<MyPage />} />
    </Routes>
  );
}
