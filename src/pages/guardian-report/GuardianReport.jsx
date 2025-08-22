import React, { useState, useCallback } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Nutrition from '../nutrition/nutrition';
import HealthReport from "./HealthReport";

const GuardianReport = () => {
  const items = [<Nutrition />, <HealthReport />];

  const [visualIndex, setVisualIndex] = useState(0); // 슬라이더가 향하는 곳
  const [activeIndex, setActiveIndex] = useState(0); // 실제 렌더되는 탭

  // 여러 번 발동/중첩 방지
  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return; // 버블링 방지
    setActiveIndex(visualIndex); // 슬라이더 도착 시 교체
  }, [visualIndex]);

    return (
        <>
            <Wrapper>
                <Nav>
                    <ButtonGroup>
                        {/* 움직이는 배경판 */}
                        <Slider 
                            $count={2}
                            $index={visualIndex}
                            onTransitionEnd={handleTransitionEnd}
                        />

                        <Button
                            type="button"
                            $active={visualIndex === 0}
                            onClick={() => setVisualIndex(0)}
                        >
                            영양 보고서
                        </Button>

                        <Button
                            type="button"
                            $active={visualIndex === 1}
                            onClick={() => setVisualIndex(1)}
                        >
                            건강 보고서
                        </Button>
                    </ButtonGroup>
                </Nav>

                <Frame>
                    <Inner>
                        {items[activeIndex]}
                    </Inner>
                </Frame>
            </Wrapper>
        </>
    );
}

export default GuardianReport;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.div`
  width: 100%;
  height: 3.75rem;
  background: var(--background-color);
  
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  width: 23.06rem;
  height: 2.5rem;
  background: var(--button-color);
  border-radius: 0.625rem;
  overflow: hidden;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background: transparent; /* 배경은 Slider가 담당 */

  font-size: 0.9375rem;
  font-weight: 500;

  cursor: pointer;
  z-index: 1; /* 텍스트는 Slider 위에 */
  color: ${({ $active }) => ($active ? "var(--background-color)" : "#fff")};
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; /* 버튼이 2개니까 절반 */
  height: 100%;
  background: #fff;
  border-radius: 0.625rem;
  transition: transform 0.15s ease;
  transform: ${({ $index }) => `translateX(${$index * 100}%)`};
  z-index: 0;
`;

const Frame = styled.div` 
  width: 100%;
  flex: 1 1 auto;
  min-height: 0; 

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 0.75rem solid var(--background-color);
  border-bottom-width: 1.19rem;
  background: transparent;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;

  display: block;

  border-radius: 0.5rem;
  background: #fff;
  
  overflow-y: auto;               /* 세로 스크롤 역할 */
  overflow-x: hidden;             /* 가로 스크롤 방지 */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;   /* 바운스/체이닝 방지 */
`;