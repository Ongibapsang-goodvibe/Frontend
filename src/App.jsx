function App() {
  return (
    <>
      <h1>온기밥상</h1>
    </>
  )
}

export default App
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import ReceiptCheck from "./pages/delivery-feedback/ReceiptCheck";

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  // 끝 슬래시 제거 (예: '/receipt-check/' -> '/receipt-check')
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  // ✅ 라우트별 progress 값
  const progressMap = {
    "/receipt-check": { step: 1, total: 2 },
  };

  const progress = progressMap[pathname] || { step: 0, total: 0 };

  return (
    <>
      {/* TopBar는 항상 app-container 밖 */}
      <TopBar progress={progress} />

      {/* 콘텐츠 */}
      <main className="app-container">
        <Routes>
          {/* 기본 진입 시 receipt-check로 이동 */}
          <Route path="/" element={<Navigate to="/receipt-check" replace />} />
          <Route path="/receipt-check" element={<ReceiptCheck />} />
        </Routes>
      </main>
    </>
  );
}
