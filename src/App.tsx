import { Route, Routes } from "react-router-dom";

function HomePage() {
  return (
   <>임시 홈페이지</>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
