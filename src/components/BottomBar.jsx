import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';

const BottomBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 현재 경로랑 버튼의 route가 같으면 active 상태
  const homeActive       = !!useMatch('/home');
  const eatingMateActive = !!useMatch('/eating-mate/*'); 
  const reportActive     = !!useMatch('/report/*');
  const mypageActive     = !!useMatch('/mypage/*');

  return (
    <Bar role="navigation" aria-label="bottom bar">
      <Button onClick={() => navigate('/home')} $active={homeActive}>
        <div>
          {homeActive ? <HomeIconActive /> : <HomeIcon />}
        </div>
        <span>홈</span>
      </Button>

      <Button onClick={() => navigate('/eating-mate')} $active={eatingMateActive}>
        <div>
          {eatingMateActive ? <EatingMateIconActive /> : <EatingMateIcon />}
        </div>
        <span>밥친구</span>
      </Button>

      <Button onClick={() => navigate('/report/nutrition')} $active={reportActive}>
        <div>
          {reportActive  ? <ReportIconActive /> : <ReportIcon />}
        </div>
        <span>영양 보고서</span>
      </Button>

      <Button onClick={() => navigate('/mypage')} $active={mypageActive}>
        <div>
          {mypageActive ? <MypageIconActive /> : <MypageIcon />}
        </div>
        <span>내 정보</span>
      </Button>
    </Bar>
  );
};

export default BottomBar;

const Bar = styled.nav`
  /* ★ 포지셔닝 없음: .app-wrapper의 grid 3행 중 마지막 행에 그대로 들어감 */
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;               /* 프레임 너비 꽉 채우기 */
  height: 4.8125rem;
  background: var(--background-color);

  /* iOS 홈 인디케이터 안전영역 */
  padding-bottom: env(safe-area-inset-bottom, 0);

  div{
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  height: 3.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  svg { display: block; }

  span{
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.01031rem;
    color: ${({ $active }) => ($active ? 'var(--main-color)' : '#FFF')};
  }
`;

// 아이콘 컴포넌트 분리
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M4.6875 12.4219V26.25C4.6875 26.4986 4.78627 26.7371 4.96209 26.9129C5.1379 27.0887 5.37636 27.1875 5.625 27.1875H11.25V19.2188C11.25 18.8458 11.3982 18.4881 11.6619 18.2244C11.9256 17.9607 12.2833 17.8125 12.6562 17.8125H17.3438C17.7167 17.8125 18.0744 17.9607 18.3381 18.2244C18.6018 18.4881 18.75 18.8458 18.75 19.2188V27.1875H24.375C24.6236 27.1875 24.8621 27.0887 25.0379 26.9129C25.2137 26.7371 25.3125 26.4986 25.3125 26.25V12.4219"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.125 15L15.6381 3.04687C15.3451 2.7375 14.6602 2.73398 14.3619 3.04687L1.875 15M23.4375 10.4883V3.75H20.625V7.79297"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIconActive = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M4.6875 12.4219V26.25C4.6875 26.4986 4.78627 26.7371 4.96209 26.9129C5.1379 27.0887 5.37636 27.1875 5.625 27.1875H11.25V19.2188C11.25 18.8458 11.3982 18.4881 11.6619 18.2244C11.9256 17.9607 12.2833 17.8125 12.6562 17.8125H17.3438C17.7167 17.8125 18.0744 17.9607 18.3381 18.2244C18.6018 18.4881 18.75 18.8458 18.75 19.2188V27.1875H24.375C24.6236 27.1875 24.8621 27.0887 25.0379 26.9129C25.2137 26.7371 25.3125 26.4986 25.3125 26.25V12.4219"
      fill="#FFA83F"/>
    <path d="M4.6875 12.4219V26.25C4.6875 26.4986 4.78627 26.7371 4.96209 26.9129C5.1379 27.0887 5.37636 27.1875 5.625 27.1875H11.25V19.2188C11.25 18.8458 11.3982 18.4881 11.6619 18.2244C11.9256 17.9607 12.2833 17.8125 12.6562 17.8125H17.3438C17.7167 17.8125 18.0744 17.9607 18.3381 18.2244C18.6018 18.4881 18.75 18.8458 18.75 19.2188V27.1875H24.375C24.6236 27.1875 24.8621 27.0887 25.0379 26.9129C25.2137 26.7371 25.3125 26.4986 25.3125 26.25V12.4219"
      stroke="#FFA83F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.125 15L15.6381 3.04687C15.3451 2.7375 14.6602 2.73398 14.3619 3.04687L1.875 15M23.4375 10.4883V3.75H20.625V7.79297"
      fill="#FFA83F"/>
    <path d="M28.125 15L15.6381 3.04687C15.3451 2.7375 14.6602 2.73398 14.3619 3.04687L1.875 15M23.4375 10.4883V3.75H20.625V7.79297"
      stroke="#FFA83F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EatingMateIconActive = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19.3333 1C20.3058 1 21.2384 1.40903 21.9261 2.13712C22.6137 2.8652 23 3.85269 23 4.88235V15.2353C23 16.265 22.6137 17.2525 21.9261 17.9805C21.2384 18.7086 20.3058 19.1176 19.3333 19.1176H13.2222L7.11111 23V19.1176H4.66667C3.69421 19.1176 2.76158 18.7086 2.07394 17.9805C1.38631 17.2525 1 16.265 1 15.2353V4.88235C1 3.85269 1.38631 2.8652 2.07394 2.13712C2.76158 1.40903 3.69421 1 4.66667 1H19.3333Z" fill="#FFA83F" stroke="#FFA83F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11C8 11 9.5 13 12 13C14.5 13 16 11 16 11" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H9.01" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 7H15.01" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EatingMateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19.3333 1C20.3058 1 21.2384 1.40903 21.9261 2.13712C22.6137 2.8652 23 3.85269 23 4.88235V15.2353C23 16.265 22.6137 17.2525 21.9261 17.9805C21.2384 18.7086 20.3058 19.1176 19.3333 19.1176H13.2222L7.11111 23V19.1176H4.66667C3.69421 19.1176 2.76158 18.7086 2.07394 17.9805C1.38631 17.2525 1 16.265 1 15.2353V4.88235C1 3.85269 1.38631 2.8652 2.07394 2.13712C2.76158 1.40903 3.69421 1 4.66667 1H19.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11C8 11 9.5 13 12 13C14.5 13 16 11 16 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H9.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 7H15.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M17.5 2.5H7.5C6.83696 2.5 6.20107 2.76339 5.73223 3.23223C5.26339 3.70107 5 4.33696 5 5V25C5 25.663 5.26339 26.2989 5.73223 26.7678C6.20107 27.2366 6.83696 27.5 7.5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V10L17.5 2.5Z"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 2.5V10H25"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 13.75L15 22.5"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 17.5L20 22.5"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 15.625L10 21.25L10 22.5"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ReportIconActive = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M17.5 2.5H7.5C6.83696 2.5 6.20107 2.76339 5.73223 3.23223C5.26339 3.70107 5 4.33696 5 5V25C5 25.663 5.26339 26.2989 5.73223 26.7678C6.20107 27.2366 6.83696 27.5 7.5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V10L17.5 2.5Z"
      fill="#FFA83F" stroke="#FFA83F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 1.5V10H26"
      stroke="#252525" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M15 13.75L15 22.5"
      stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 17.5L20 22.5"
      stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 15.625L10 21.25L10 22.5"
      stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MypageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 16C17.5913 16 19.1174 15.3679 20.2426 14.2426C21.3679 13.1174 22 11.5913 22 10C22 8.4087 21.3679 6.88258 20.2426 5.75736C19.1174 4.63214 17.5913 4 16 4C14.4087 4 12.8826 4.63214 11.7574 5.75736C10.6321 6.88258 10 8.4087 10 10C10 11.5913 10.6321 13.1174 11.7574 14.2426C12.8826 15.3679 14.4087 16 16 16ZM20 10C20 11.0609 19.5786 12.0783 18.8284 12.8284C18.0783 13.5786 17.0609 14 16 14C14.9391 14 13.9217 13.5786 13.1716 12.8284C12.4214 12.0783 12 11.0609 12 10C12 8.93913 12.4214 7.92172 13.1716 7.17157C13.9217 6.42143 14.9391 6 16 6C17.0609 6 18.0783 6.42143 18.8284 7.17157C19.5786 7.92172 20 8.93913 20 10ZM28 26C28 28 26 28 26 28H6C6 28 4 28 4 26C4 24 6 18 16 18C26 18 28 24 28 26ZM26 25.992C25.998 25.5 25.692 24.02 24.336 22.664C23.032 21.36 20.578 20 16 20C11.422 20 8.968 21.36 7.664 22.664C6.308 24.02 6.004 25.5 6 25.992H26Z" fill="white"/>
  </svg>
);

const MypageIconActive = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 16C17.5913 16 19.1174 15.3679 20.2426 14.2426C21.3679 13.1174 22 11.5913 22 10C22 8.4087 21.3679 6.88258 20.2426 5.75736C19.1174 4.63214 17.5913 4 16 4C14.4087 4 12.8826 4.63214 11.7574 5.75736C10.6321 6.88258 10 8.4087 10 10C10 11.5913 10.6321 13.1174 11.7574 14.2426C12.8826 15.3679 14.4087 16 16 16ZM20 10C20 11.0609 19.5786 12.0783 18.8284 12.8284C18.0783 13.5786 17.0609 14 16 14C14.9391 14 13.9217 13.5786 13.1716 12.8284C12.4214 12.0783 12 11.0609 12 10C12 8.93913 12.4214 7.92172 13.1716 7.17157C13.9217 6.42143 14.9391 6 16 6C17.0609 6 18.0783 6.42143 18.8284 7.17157C19.5786 7.92172 20 8.93913 20 10ZM28 26C28 28 26 28 26 28H6C6 28 4 28 4 26C4 24 6 18 16 18C26 18 28 24 28 26ZM26 25.992C25.998 25.5 25.692 24.02 24.336 22.664C23.032 21.36 20.578 20 16 20C11.422 20 8.968 21.36 7.664 22.664C6.308 24.02 6.004 25.5 6 25.992H26Z" fill="#FFA83F"/>
    <path d="M26 25.992C25.998 25.5 25.692 24.02 24.336 22.664C23.032 21.36 20.578 20 16 20C11.422 20 8.968 21.36 7.664 22.664C6.308 24.02 6.004 25.5 6 25.992H26Z" fill="#FFA83F"/>
    <path d="M20 10C20 11.0609 19.5786 12.0783 18.8284 12.8284C18.0783 13.5786 17.0609 14 16 14C14.9391 14 13.9217 13.5786 13.1716 12.8284C12.4214 12.0783 12 11.0609 12 10C12 8.93913 12.4214 7.92172 13.1716 7.17157C13.9217 6.42143 14.9391 6 16 6C17.0609 6 18.0783 6.42143 18.8284 7.17157C19.5786 7.92172 20 8.93913 20 10Z" fill="#FFA83F"/>
  </svg>
);
