import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import ReceiptCheck from "./pages/delivery-feedback/ReceiptCheck";
import Home from "./pages/Home";
import Case1 from "./pages/Case1";
import OrderRequest from './pages/Order/OrderRequest';
import OrderCompleted from './pages/Order/OderCompleted';
import ExpectedTime from './pages/Order/ExpectedTime';
import OrderCancel from './pages/Order/OrderCancel';

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
    "/home": { step: 0, total: 0 },
    "/case1": { step: 1, total: 2 },
    "/orderrequest": { step: 0, total: 0 },
    "/expectedtime": { step: 0, total: 0 },
    "/ordercancel": { step: 0, total: 0 },
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
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/receipt-check" element={<ReceiptCheck />} />
          <Route path="/case1" element={<Case1 />} />
          <Route path="/orderrequest" element={<OrderRequest />} />
          <Route path="/ordercompleted" element={<OrderCompleted />} />
          <Route path="/expectedtime" element={<ExpectedTime />} />
          <Route path="/ordercancel" element={<OrderCancel />} />
        </Routes>
      </main>
    </>
  );
}
