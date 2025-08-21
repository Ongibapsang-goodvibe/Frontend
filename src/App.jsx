import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled from "styled-components"; 
import LogoBar from "./components/LogoBar";
import ProgressBar from "./components/ProgressBar";
import BottomBar from "./components/BottomBar";

//Home
import Home from "./pages/home/Home";
//mypage
import MyPage from "./pages/mypage/MyPage";
//menu
import SearchResult from "./pages/menu/SearchResult";
import CurrentOrder from './pages/menu/CurrentOrder';
import CurrentConfirm from './pages/menu/CurrentConfirm';
import MenuRecommendation from './pages/menu/MenuRecommendation';
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
//menu-search
import MenuVoice from "./pages/menu-search/MenuVoice";
import MenuText from "./pages/menu-search/MenuText";
//eating-mate
import EatingMate from "./pages/eating-mate/EatingMate";
import TalkingEnd from "./pages/eating-mate/TalkingEnd";
//nutrition
import Nutrition from './pages/nutrition/nutrition';
import NutritionGuard from "./pages/nutrition/NutritionGuard";

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
    "/mypage",
    "/report/nutrition",
    "/nutrition-guard",
  ];

  const showLogo = logoShownRoutes.includes(pathname);

  //BottomBar
  const hiddenRoutes = [
    "/landing-page",
    "/landing-page1",
    "/health-status",
    "/food-recommendation",
    "/order-request",
    "/order-completed",
    "/eating-mate",
    "/eating-mate/end",
    "/nutrition-guard",
    //delivery-feedback
    "/delivery-feedback/forwarding/no-issue",
    "/delivery-feedback/forwarding/issue",
    //food-feedback
    "/food-feedback/forwarding",
    //health-feedback
    "/health-feedback/forwarding",
  ];

  const showBottom = !hiddenRoutes.includes(pathname);

  //ProgressBar 라우트별 progress 값
  const progressMap = {
    /*home*/
    "/home": { step: 0, total: 0 },

    /*mypage*/
    "/mypage": { step: 0, total: 0},

    /*menu*/
    "/search-result": { step: 1, total: 2 },
    "/current-order": { step: 1, total: 3 },
    "/current-confirm": { step: 2, total: 3 },
    "/menu-recommendation": { step: 0, total: 0 },

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
    "/delivery-feedback/check": { step: 1, total: 2 },
    "/delivery-feedback/complaint": { step: 3, total: 4 },
    "/delivery-feedback/forwarding/no-issue": { step: 2, total: 2 },
    "/delivery-feedback/forwarding/issue": { step: 4, total: 4 },

    /*food-feedback*/
    "/food-feedback/check": { step: 1, total: 3 },
    "/food-feedback/satisfaction": { step: 2, total: 3 },
    "/food-feedback/complaint": { step: 2, total: 3 },
    "/food-feedback/forwarding": { step: 3, total: 3 },

    /*health-feedback*/
    "/health-feedback/health-check": { step: 1, total: 3 },
    "/health-feedback/feeling-check": { step: 2, total: 3 },
    "/health-feedback/forwarding": { step: 3, total: 3 },

    /*menu-search*/
    "/menu-search/voice": { step: 0, total: 0 },
    "/menu-search/text": { step: 0, total: 0 },

    /*nutrition*/
    "/report/nutrition": { step: 0, total: 0 },
    "/nutrition-guard": { step: 0, total: 0 },

    /*eating-mate*/
    "/eating-mate": { step: 0, total: 0 },
    "/eating-mate/end": { step: 0, total: 0 },
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
          {/*mypage*/}
          <Route path='/mypage' element={<MyPage />} />
          {/*menu*/}
          <Route path='/search-result' element={<SearchResult />} />
          <Route path='/current-order' element={<CurrentOrder />} />
          <Route path='/current-confirm' element={<CurrentConfirm />} />
          <Route path='/menu-recommendation' element={<MenuRecommendation />} />
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
          <Route path="/delivery-feedback/check" element={<DeliveryCheck />} />
          <Route path="/delivery-feedback/complaint" element={<DeliveryComplaint />} />
          <Route path="/delivery-feedback/forwarding/no-issue" element={<NoIssue />} />
          <Route path="/delivery-feedback/forwarding/issue" element={<IssueForwarding />} />
          {/*food-feedback*/}
          <Route path="/food-feedback/check" element={<FoodCheck />} />
          <Route path="/food-feedback/satisfaction" element={<FoodSatisfaction />} />
          <Route path="/food-feedback/complaint" element={<FoodComplaint />} />
          <Route path="/food-feedback/forwarding" element={<FoodForwarding />} />
          {/*health-feedback*/}
          <Route path="/health-feedback/health-check" element={<HealthCheck />} />
          <Route path="/health-feedback/feeling-check" element={<FeelingCheck />} />
          <Route path="/health-feedback/forwarding" element={<HealthForwarding />} />
          {/*menu-search*/}
          <Route path="/menu-search/voice" element={<MenuVoice />} />
          <Route path="/menu-search/text" element={<MenuText />} />
          {/*nutrition*/}
          <Route path='/report/nutrition' element={<Nutrition />} />
          <Route path='/nutrition-guard' element={<NutritionGuard />} />
          {/*eating-mate*/}
          <Route path="/eating-mate" element={<EatingMate />} />
          <Route path="/eating-mate/end" element={<TalkingEnd />} />
        </Routes>
      </main>

      {/* 3행: BottomBar (있을 때만) */}
      {showBottom && <BottomBar />}
    </>
  );
}
