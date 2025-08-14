import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";

//Home
import Home from "./pages/Home";
//Order
import Case1 from "./pages/Case1";
import OrderRequest from './pages/Order/OrderRequest';
import OrderCompleted from './pages/Order/OderCompleted';
import ExpectedTime from './pages/Order/ExpectedTime';
import OrderCancel from './pages/Order/OrderCancel';
//delivery-feedback
import DeliveryCheck from "./pages/delivery-feedback/DeliveryCheck";
import DeliveryComplaint from "./pages/delivery-feedback/DeliveryComplaint";
import EatingChoice from "./pages/delivery-feedback/EatingChoice";
import IssueForwarding from "./pages/delivery-feedback/IssueForwarding";
//food-health-feedback
import EatingCheck from "./pages/food-health-feedback/EatingCheck";
import FoodSatisfaction from "./pages/food-health-feedback/FoodSatisfaction";
import FoodComplaint from "./pages/food-health-feedback/FoodComplaint";
import FoodForwarding from "./pages/food-health-feedback/FoodForwarding";
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
    /*home*/
    "/home": { step: 0, total: 0 },
      
    /*order*/
    "/case1": { step: 1, total: 2 },
    "/orderrequest": { step: 0, total: 0 },
    "/expectedtime": { step: 0, total: 0 },
    "/ordercancel": { step: 0, total: 0 },

    /*delivery-feedback*/
    "/delivery-check": { step: 1, total: 2 },
    "/delivery-complaint": { step: 2, total: 2 },
    "/issue-forwarding": { step: 0, total: 0 },
    "/eating-choice": { step: 2, total: 2 },
    /*food-health-feedback*/
    "/eating-check": { step: 1, total: 3 },
    "/food-satisfaction": { step: 2, total: 3 },
    "/food-complaint": { step: 2, total: 3 },
    "/food-forwarding": { step: 3, total: 3 },
    "/health-check": { step: 1, total: 3 },
    "/feeling-check": { step: 2, total: 3 },
    "/health-forwarding": { step: 3, total: 3 },
  };

  const progress = progressMap[pathname] || { step: 0, total: 0 };

  return (
    <>
      {/* TopBar는 항상 app-container 밖 */}
      <TopBar progress={progress} />

      {/* 콘텐츠 */}
      <main className="app-container">
        <Routes>
          {/* 기본 진입 시 home으로 이동 */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/*home*/}
          <Route path="/home" element={<Home />} />
          {/*order*/}
          <Route path="/case1" element={<Case1 />} />
          <Route path="/orderrequest" element={<OrderRequest />} />
          <Route path="/ordercompleted" element={<OrderCompleted />} />
          <Route path="/expectedtime" element={<ExpectedTime />} />
          <Route path="/ordercancel" element={<OrderCancel />} />
          {/*delivery-feedback*/}
          <Route path="/delivery-check" element={<DeliveryCheck />} />
          <Route path="/delivery-complaint" element={<DeliveryComplaint />} />
          <Route path="/issue-forwarding" element={<IssueForwarding />} />
          <Route path="/eating-choice" element={<EatingChoice />} />
          {/*food-health-feedback*/}
          <Route path="/eating-check" element={<EatingCheck />} />
          <Route path="/food-satisfaction" element={<FoodSatisfaction />} />
          <Route path="/food-complaint" element={<FoodComplaint />} />
          <Route path="/food-forwarding" element={<FoodForwarding />} />
          <Route path="/health-check" element={<HealthCheck />} />
          <Route path="/feeling-check" element={<FeelingCheck />} />
          <Route path="/health-forwarding" element={<HealthForwarding />} />
        </Routes>
      </main>
    </>
  );
}