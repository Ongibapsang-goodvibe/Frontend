import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import LogoBar from "./components/LogoBar";
import ProgressBar from "./components/ProgressBar";
import BottomBar from "./components/BottomBar";

//Home
import Home from "./pages/home/Home";
//Login
import Login from "./pages/login/Login";
//mypage
import MyPage from "./pages/mypage/MyPage";
//menu
import SearchResult from "./pages/menu/SearchResult";
import CurrentOrder from './pages/menu/CurrentOrder';
import CurrentCheck from './pages/menu/CurrentCheck';
import MenuRecommendation from './pages/menu/MenuRecommendation';
//Order
import OrderRequest from './pages/order/OrderRequest';
import OrderCompleted from './pages/order/OrderCompleted';
import OrderCancel from './pages/order/OrderCancel';
//initial
import LandingPageBlack from './pages/initial/LandingPageBlack';
import LandingPageWhite from './pages/initial/LandingPageWhite';
import HealthStatus from './pages/initial/HealthStatus';
import HealthResult from './pages/initial/HealthResult';
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
//voice-rec
import DeliveryVoice from "./pages/voice-rec/DeliveryVoice";
import FoodSatVoice from "./pages/voice-rec/FoodSatVoice";
import FoodComVoice from "./pages/voice-rec/FoodComVoice";
import HealthVoice from "./pages/voice-rec/HealthVoice";
import HealthReport from "./pages/guardian-report/HealthReport";
//guardian-report
import GuardianReport from "./pages/guardian-report/GuardianReport";

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

  // 패턴 매칭 유틸
  const isMatch = (patterns, path) =>
    patterns.some((p) => !!matchPath({ path: p, end: true }, path));

  // LogoBar (패턴 기반)
  const logoShownRoutes = [
    "/login",
    "/health-status",
    "/health-status/result",
    "/mypage",
    "/report/nutrition",
    "/guard/report",
  ];

  const showLogo = isMatch(logoShownRoutes, pathname);

  //BottomBar (패턴 기반)
  const hiddenRoutes = [
    "/login",
    "/landing-page/black",
    "/landing-page/white",
    "/health-status",
    "/health-status/result",
    "/order/request",
    "/order/completed",
    "/eating-mate",
    "/eating-mate/end",
    //delivery-feedback
    "/delivery-feedback/forwarding/no-issue/:orderId",
    "/delivery-feedback/forwarding/issue/:orderId",
    //food-feedback
    "/food-feedback/forwarding/:orderId",
    //health-feedback
    "/health-feedback/forwarding/:orderId",
    //guardian-report
    "/guard/report",
  ];

  const showBottom = !isMatch(hiddenRoutes, pathname);

  // 1) ProgressBar 라우트별 정의 (ProgressBar "보여줄" 경로만 작성)
  const progressDefs = [
    /* menu */
    { pattern: "/menu/search/result", value: { step: 1, total: 2 } },
    { pattern: "/menu/current-order", value: { step: 1, total: 3 } },
    { pattern: "/menu/current-order/check", value: { step: 2, total: 3 } },

    /* payment */
    { pattern: "/order/payment", value: { step: 2, total: 2 } },

    /* delivery-feedback */
    { pattern: "/delivery-feedback/check/:orderId", value: { step: 1, total: 2 } },
    { pattern: "/delivery-feedback/complaint/:orderId", value: { step: 3, total: 4 } },
    { pattern: "/delivery-feedback/forwarding/no-issue/:orderId", value: { step: 2, total: 2 } },
    { pattern: "/delivery-feedback/forwarding/issue/:orderId", value: { step: 4, total: 4 } },

    /* food-feedback */
    { pattern: "/food-feedback/check/:orderId", value: { step: 1, total: 3 } },
    { pattern: "/food-feedback/satisfaction/:orderId", value: { step: 2, total: 3 } },
    { pattern: "/food-feedback/complaint/:orderId", value: { step: 2, total: 3 } },
    { pattern: "/food-feedback/forwarding/:orderId", value: { step: 3, total: 3 } },

    /* health-feedback */
    { pattern: "/health-feedback/health-check/:orderId", value: { step: 1, total: 3 } },
    { pattern: "/health-feedback/feeling-check/:orderId", value: { step: 2, total: 3 } },
    { pattern: "/health-feedback/forwarding/:orderId", value: { step: 3, total: 3 } },
  ];

  // 2) 현재 경로에 매칭되는 progress 찾기 (없으면 undefined)
  const matched = progressDefs.find(d => isMatch([d.pattern], pathname));
  const progress = matched?.value;


  return (
    <>
      {/* 1행: LogoBar+ProgressBar (있을 때만) */}
      <div className="top-slot">
        {showLogo ? <LogoBar /> : (progress && progress.total > 0 && <ProgressBar progress={progress} />)}
      </div>

      {/* 2행: Content (스크롤 영역) */}
      <main className="app-container">
        <Routes>
          {/* 기본 진입 시 home으로 이동 */}
          <Route path="/" element={<Navigate to="/landing-page/black" replace />} />
          {/*home*/}
          <Route path="/home" element={<Home />} />
          {/*login*/}
          <Route path="/login" element={<Login />} />
          {/*mypage*/}
          <Route path='/mypage' element={<MyPage />} />
          {/*menu*/}
          <Route path='/menu/search/result' element={<SearchResult />} />
          <Route path='/menu/current-order' element={<CurrentOrder />} />
          <Route path='/menu/current-order/check' element={<CurrentCheck />} />
          <Route path='/menu/recommendation' element={<MenuRecommendation />} />
          {/*order*/}
          <Route path="/order/request" element={<OrderRequest />} />
          <Route path="/order/completed" element={<OrderCompleted />} />
          <Route path="/order/cancel" element={<OrderCancel />} />
          {/*initial*/}
          <Route path='/landing-page/black' element={<LandingPageBlack />} />
          <Route path='/landing-page/white' element={<LandingPageWhite />} />
          <Route path='/health-status' element={<HealthStatus />} />
          <Route path='/health-status/result' element={<HealthResult />} />
          {/*payment*/}
          <Route path='/order/payment' element={<Payment />} />
          {/*review*/}
          <Route path='/menu/review' element={<Review />} />
          {/*delivery-feedback*/}
          <Route path="/delivery-feedback/check/:orderId" element={<DeliveryCheck />} />
          <Route path="/delivery-feedback/complaint/:orderId" element={<DeliveryComplaint />} />
          <Route path="/delivery-feedback/forwarding/no-issue/:orderId" element={<NoIssue />} />
          <Route path="/delivery-feedback/forwarding/issue/:orderId" element={<IssueForwarding />} />
          {/*food-feedback*/}
          <Route path="/food-feedback/check/:orderId" element={<FoodCheck />} />
          <Route path="/food-feedback/satisfaction/:orderId" element={<FoodSatisfaction />} />
          <Route path="/food-feedback/complaint/:orderId" element={<FoodComplaint />} />
          <Route path="/food-feedback/forwarding/:orderId" element={<FoodForwarding />} />
          {/*health-feedback*/}
          <Route path="/health-feedback/health-check/:orderId" element={<HealthCheck />} />
          <Route path="/health-feedback/feeling-check/:orderId" element={<FeelingCheck />} />
          <Route path="/health-feedback/forwarding/:orderId" element={<HealthForwarding />} />
          {/*menu-search*/}
          <Route path="/menu/search/voice" element={<MenuVoice />} />
          <Route path="/menu/search/text" element={<MenuText />} />
          {/*nutrition*/}
          <Route path='/report/nutrition' element={<Nutrition />} />
          {/*eating-mate*/}
          <Route path="/eating-mate" element={<EatingMate />} />
          <Route path="/eating-mate/end" element={<TalkingEnd />} />
          {/*voice-rec*/}
          <Route path="/delivery-feedback/complaint/voice/:orderId" element={<DeliveryVoice />} />
          <Route path="/food-feedback/satisfaction/voice/:orderId" element={<FoodSatVoice />} />
          <Route path="/food-feedback/complaint/voice/:orderId" element={<FoodComVoice />} />
          <Route path="/health-feedback/health-check/voice/:orderId" element={<HealthVoice />} />
          {/*guardian-report*/}
          <Route path="/guard/report" element={<GuardianReport />} />
        </Routes>
      </main>

      {/* 3행: BottomBar (있을 때만) */}
      {showBottom && <BottomBar />}
    </>
  );
}
