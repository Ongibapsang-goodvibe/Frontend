import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <Bar role="navigation" aria-label="bottom bar">
      <HomeButton onClick={() => navigate('/home')} aria-label="홈으로">
        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
          <path d="M20.5 40.5V28.5H28.5V40.5H38.5V24.5H44.5L24.5 6.5L4.5 24.5H10.5V40.5H20.5Z" fill="white"/>
        </svg>
      </HomeButton>
    </Bar>
  );
};

export default BottomBar;

const Bar = styled.nav`
  /* ★ 포지셔닝 없음: .app-wrapper의 grid 3행 중 마지막 행에 그대로 들어감 */
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;               /* 프레임 너비 꽉 채우기 */
  height: 4.8125rem;
  background: var(--background-color);

  /* iOS 홈 인디케이터 안전영역 */
  padding-bottom: env(safe-area-inset-bottom, 0);
`;


const HomeButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;          /* 히트 영역 확보 */
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  svg { display: block; }
`;