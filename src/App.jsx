import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled from "styled-components"; 
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

  // LogoBar
  const logoShownRoutes = [
    "/login",
    "/health-status",
    "/health-status/result",
    "/mypage",
    "/report/nutrition",
    "/guard/report/nutrition",
    "/guard/report",
  ];

  const showLogo = logoShownRoutes.includes(pathname);

  //BottomBar
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
    "/guard/report/nutrition",
    //delivery-feedback
    "/delivery-feedback/forwarding/no-issue",
    "/delivery-feedback/forwarding/issue",
    //food-feedback
    "/food-feedback/forwarding",
    //health-feedback
    "/health-feedback/forwarding",
    //guardian-report
    "/guard/report",
  ];

  const showBottom = !hiddenRoutes.includes(pathname);

  //ProgressBar 라우트별 progress 값
  const progressMap = {
    /*home*/
    "/home": { step: 0, total: 0 },

    /*login*/
    "/login": { step: 0, total: 0 },

    /*mypage*/
    "/mypage": { step: 0, total: 0},

    /*menu*/
    "/menu/search/result": { step: 1, total: 2 },
    "/menu/current-order": { step: 1, total: 3 },
    "/menu/current-order/check": { step: 2, total: 3 },
    "/menu/recommendation": { step: 0, total: 0 },

    /*order*/
    "/order/completed": { step: 0, total: 0 },
    "/order/request": { step: 0, total: 0 },
    "/order/cancel": { step: 0, total: 0 },

    /*initial*/
    "/landing-page/black": { step: 0, total: 0 },
    "/landing-page/white": { step: 0, total: 0 },
    "/health-status": { step: 0, total: 0 },
    "/health-status/result": { step: 0, total: 0 },

    /*Payment*/
    "/order/payment": { step: 2, total: 2 },

    /*Review */
    "/menu/review": { step: 0, total: 0 },

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
    "/menu/search/voice": { step: 0, total: 0 },
    "/menu/search/text": { step: 0, total: 0 },

    /*nutrition*/
    "/report/nutrition": { step: 0, total: 0 },

    /*eating-mate*/
    "/eating-mate": { step: 0, total: 0 },
    "/eating-mate/end": { step: 0, total: 0 },

    /*voice-rec*/
    "/delivery-feedback/complaint/voice": { step: 0, total: 0 },
    "/food-feedback/satisfaction/voice": { step: 0, total: 0 },
    "/food-feedback/complaint/voice": { step: 0, total: 0 },
    "/health-feedback/health-check/voice": { step: 0, total: 0 },
    "/guard/report": { step: 0, total: 0 },
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
          <Route path="/menu/search/voice" element={<MenuVoice />} />
          <Route path="/menu/search/text" element={<MenuText />} />
          {/*nutrition*/}
          <Route path='/report/nutrition' element={<Nutrition />} />
          {/*eating-mate*/}
          <Route path="/eating-mate" element={<EatingMate />} />
          <Route path="/eating-mate/end" element={<TalkingEnd />} />
          {/*voice-rec*/}
          <Route path="/delivery-feedback/complaint/voice" element={<DeliveryVoice />} />
          <Route path="/food-feedback/satisfaction/voice" element={<FoodSatVoice />} />
          <Route path="/food-feedback/complaint/voice" element={<FoodComVoice />} />
          <Route path="/health-feedback/health-check/voice" element={<HealthVoice />} />
          {/*guardian-report*/}
          <Route path="/guard/report" element={<GuardianReport />} />
        </Routes>
      </main>

      {/* 3행: BottomBar (있을 때만) */}
      {showBottom && <BottomBar />}
    </>
  );
}
