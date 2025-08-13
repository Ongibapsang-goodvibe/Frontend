import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
//delivery-feedback
import DeliveryCheck from "./pages/delivery-feedback/DeliveryCheck";
import DeliveryComplaint from "./pages/delivery-feedback/DeliveryComplaint";
import EatingChoice from "./pages/delivery-feedback/EatingChoice";
import IssueForwarding from "./pages/delivery-feedback/IssueForwarding";
//food-health-feedback
import EatingCheck from "./pages/food-health-feedback/EatingCheck";
import FoodSatisfaction from "./pages/food-health-feedback/FoodSatisfaction";
import FoodComplaint from "./pages/food-health-feedback/FoodComplaint";
import HealthCheck from "./pages/food-health-feedback/HealthCheck";
import FeelingCheck from "./pages/food-health-feedback/FeelingCheck";
import HealthForwarding from "./pages/food-health-feedback/HealthForwarding";

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
    /*delivery-feedback*/
    "/delivery-check": { step: 1, total: 2 },
    "/delivery-complaint": { step: 2, total: 2 },
    "/issue-forwarding": { step: 0, total: 0 },
    "/eating-choice": { step: 2, total: 2 },
    /*food-health-feedback*/
    "/eating-check": { step: 1, total: 5 },
    "/food-satisfaction": { step: 2, total: 5 },
    "/food-complaint": { step: 2, total: 5 },
    "/health-check": { step: 3, total: 5 },
    "/feeling-check": { step: 4, total: 5 },
    "/health-forwarding": { step: 5, total: 5 },

  };

  const progress = progressMap[pathname] || { step: 0, total: 0 };

  return (
    <>
      {/* TopBar는 항상 app-container 밖 */}
      <TopBar progress={progress} />

      {/* 콘텐츠 */}
      <main className="app-container">
        <Routes>
          {/* 기본 진입 시 receipt-check로 이동 (추후 홈화면으로 링크)*/}
          <Route path="/" element={<Navigate to="/delivery-check" replace />} />
          {/*delivery-feedback*/}
          <Route path="/delivery-check" element={<DeliveryCheck />} />
          <Route path="/delivery-complaint" element={<DeliveryComplaint />} />
          <Route path="/issue-forwarding" element={<IssueForwarding />} />
          <Route path="/eating-choice" element={<EatingChoice />} />
          {/*food-health-feedback*/}
          <Route path="/eating-check" element={<EatingCheck />} />
          <Route path="/food-satisfaction" element={<FoodSatisfaction />} />
          <Route path="/food-complaint" element={<FoodComplaint />} />
          <Route path="/health-check" element={<HealthCheck />} />
          <Route path="/feeling-check" element={<FeelingCheck />} />
          <Route path="/health-forwarding" element={<HealthForwarding />} />
        </Routes>
      </main>
    </>
  );
}