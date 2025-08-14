import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled from "styled-components"; 
import LogoBar from "./components/LogoBar";
import ProgressBar from "./components/ProgressBar";
import BottomBar from "./components/BottomBar";

//Home
import Home from "./pages/home/Home";
//menu
import SearchResult from "./pages/menu/SearchResult";
import CurrentOrder from './pages/menu/CurrentOrder';
import CurrentConfirm from './pages/menu/CurrentConfirm';
import MenuRecommentadion from './pages/menu/MenuRecommendation';
//Order
import OrderRequest from './pages/order/OrderRequest';
import OrderCompleted from './pages/order/OrderCompleted';
import OrderCancel from './pages/order/OrderCancel';
//initial
import LandingPage from './pages/initial/LandingPage';
import LandingPage1 from './pages/initial/LandingPage1';
import HealthStatus from './pages/initial/HealthStatus';
import FoodRecommendation from './pages/initial/FoodRecommendation';
//Payment
import Payment from './pages/payment/Payment';
//Review
import Review from './pages/review/Review';
//delivery-feedback
import DeliveryCheck from "./pages/delivery-feedback/DeliveryCheck";
import NoIssue from "./pages/delivery-feedback/NoIssue";
import DeliveryComplaint from "./pages/delivery-feedback/DeliveryComplaint";
import IssueForwarding from "./pages/delivery-feedback/IssueForwarding";
//food-feedback
import FoodCheck from "./pages/food-feedback/FoodCheck";
import FoodSatisfaction from "./pages/food-feedback/FoodSatisfaction";
import FoodComplaint from "./pages/food-feedback/FoodComplaint";
import FoodForwarding from "./pages/food-feedback/FoodForwarding";
//health-feedback
import HealthCheck from "./pages/health-feedback/HealthCheck";
import FeelingCheck from "./pages/health-feedback/FeelingCheck";
import HealthForwarding from "./pages/health-feedback/HealthForwarding";
//voice-research
import VoiceOrder from "./pages/voice-research/VoiceOrder";

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

  // LogoBar
  const logoShownRoutes = [
    "/health-status",
    "/food-recommendation",
  ];
  const showLogo = logoShownRoutes.includes(pathname);

  //BottomBar
  const hiddenRoutes = [
    "/landing-page",
    "/landing-page1",
    "/health-status",
    "/food-recommendation",
    "/order-request",
    "/order-completed"
  ];
  const showBottom = !hiddenRoutes.includes(pathname);

  //ProgressBar 라우트별 progress 값
  const progressMap = {
    /*home*/
    "/home": { step: 0, total: 0 },

    /*menu*/
    "/search-result": { step: 1, total: 2 },
    "/current-order": { step: 1, total: 3 },
    "/current-confirm": { step: 2, total: 3 },
    "/menu-recommendation": { step: 1, total: 3 },

    /*order*/
    "/order-completed": { step: 0, total: 0 },
    "/order-request": { step: 0, total: 0 },
    "/order-cancel": { step: 0, total: 0 },

    /*initial*/
    "/landing-page": { step: 0, total: 0 },
    "/landing-page1": { step: 0, total: 0 },
    "/health-status": { step: 0, total: 0 },
    "/food-recommendation": { step: 0, total: 0 },

    /*Payment*/
    "/payment": { step: 2, total: 2 },

    /*Review */
    "/review": { step: 0, total: 0 },

    /*delivery-feedback*/
    "/delivery-check": { step: 1, total: 2 },
    "/no-issue": { step: 2, total: 2 },
    "/delivery-complaint": { step: 3, total: 4 },
    "/issue-forwarding": { step: 4, total: 4 },
    /*food-health-feedback*/
    "/food-check": { step: 1, total: 3 },
    "/food-satisfaction": { step: 2, total: 3 },
    "/food-complaint": { step: 2, total: 3 },
    "/food-forwarding": { step: 3, total: 3 },
    "/health-check": { step: 1, total: 3 },
    "/feeling-check": { step: 2, total: 3 },
    "/health-forwarding": { step: 3, total: 3 },

    /*voice-research*/
    "/voice-order": { step: 0, total: 0 },
  };

  const progress = progressMap[pathname] || { step: 0, total: 0 };

  return (
    <>
      {/* 1행: LogoBar (있을 때만) */}
      <div className="top-slot">
        {showLogo ? <LogoBar /> : <ProgressBar progress={progress} />}
      </div>

      {/* 2행: Content (스크롤 영역) */}
      <main className="app-container">
        <Routes>
          {/* 기본 진입 시 home으로 이동 */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/*home*/}
          <Route path="/home" element={<Home />} />
          {/*menu*/}
          <Route path='/search-result' element={<SearchResult />} />
          <Route path='/current-order' element={<CurrentOrder />} />
          <Route path='/current-confirm' element={<CurrentConfirm />} />
          <Route path='/menu-recommendation' element={<MenuRecommentadion />} />
          {/*order*/}
          <Route path="/order-request" element={<OrderRequest />} />
          <Route path="/order-completed" element={<OrderCompleted />} />
          <Route path="/order-cancel" element={<OrderCancel />} />
          {/*initial*/}
          <Route path='/landing-page' element={<LandingPage />} />
          <Route path='/landing-page1' element={<LandingPage1 />} />
          <Route path='/health-status' element={<HealthStatus />} />
          <Route path='/food-recommendation' element={<FoodRecommendation />} />
          {/*payment*/}
          <Route path='/payment' element={<Payment />} />
          {/*review*/}
          <Route path='/review' element={<Review />} />
          {/*delivery-feedback*/}
          <Route path="/delivery-check" element={<DeliveryCheck />} />
          <Route path="/no-issue" element={<NoIssue />} />
          <Route path="/delivery-complaint" element={<DeliveryComplaint />} />
          <Route path="/issue-forwarding" element={<IssueForwarding />} />
          {/*food-feedback*/}
          <Route path="/food-check" element={<FoodCheck />} />
          <Route path="/food-satisfaction" element={<FoodSatisfaction />} />
          <Route path="/food-complaint" element={<FoodComplaint />} />
          <Route path="/food-forwarding" element={<FoodForwarding />} />
          {/*health-feedback*/}
          <Route path="/health-check" element={<HealthCheck />} />
          <Route path="/feeling-check" element={<FeelingCheck />} />
          <Route path="/health-forwarding" element={<HealthForwarding />} />
          {/*voice-research*/}
          <Route path="/voice-order" element={<VoiceOrder />} />
        </Routes>
      </main>

      {/* 3행: BottomBar (있을 때만) */}
      {showBottom && <BottomBar />}
    </>
  );
}