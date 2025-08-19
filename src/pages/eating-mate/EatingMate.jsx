// src/pages/talk/EatingMate.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const STATES = {
  IDLE: "idle",
  LISTENING: "listening",
  THINKING: "thinking",
  SPEAKING: "speaking",
};

const EmOrange = styled.span` color: #E75900; `;

const UI = {
  [STATES.IDLE]: {
    heading: (
      <>
        <EmOrange>캐릭터를 눌러</EmOrange><br />대화를 시작해보세요!
      </>
    ),
    status: <>바비가 기다리는 중 …</>,
    button: "돌아가기",
    btnClass: "neutral", // 회색
    img: "/eating-mate/WaitngBarbi.png",
  },
  [STATES.LISTENING]: {
    heading: (
      <>
        지금<br />말씀해주세요!
      </>
    ),
    status: <>바비가 듣는 중 …</>,
    button: "대화 종료하기",
    btnClass: "warn", // 주황
    img: "/eating-mate/ListeningBarbi.png",
  },
  [STATES.THINKING]: {
    heading: (
      <>
        조금만<br />기다려주세요!
      </>
    ),
    status: <>바비가 생각하는 중 …</>,
    button: "대화 종료하기",
    btnClass: "warn",
    img: "/eating-mate/ThinkingBarbi.png",
  },
  [STATES.SPEAKING]: {
    heading: (
      <>
        바비의 말이<EmOrange>끝나면</EmOrange><br />말씀해주세요.
      </>
    ),
    status: <>바비가 말하는 중 …</>,
    button: "대화 종료하기",
    btnClass: "warn",
    img: "/eating-mate/TalkingBarbi.png",
  },
};

const HOME_ROUTE = "/";
const END_ROUTE = "/conversation-end";

export default function EatingMate({
  state,
  setState,
  onStartListening,
  onStopListening,
  onCancel,
}) {
  const navigate = useNavigate();
  const ui = UI[state] ?? UI[STATES.IDLE];


  // 클릭 전이 제한: IDLE → LISTENING만 허용
  const handleCharacterClick = () => {
    if (state === STATES.IDLE) {
      setState?.(STATES.LISTENING);
      onStartListening?.();
    }
    // LISTENING/THINKING/SPEAKING 전이는 부모에서 자동 처리
  };

  // 하단 버튼 동작
  const handleBottomButton = async () => {
    if (state === STATES.IDLE) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(HOME_ROUTE, { replace: true });
      }
    } else {
      await onCancel?.().catch(() => {});
      navigate(END_ROUTE);
    }
  };

  return (
    <Wrapper>
        <Heading>{ui.heading}</Heading>
        <div>
            <Status>{ui.status}</Status>
        </div>

        <CharButton type="button" onClick={handleCharacterClick}>
            <img src={ui.img} alt="" draggable={false} />
        </CharButton>

        <ActionButton 
          type="button" 
          onClick={handleBottomButton}
          $bgColor={ui.buttonColor}
          $clickable={state === STATES.IDLE}>
            {ui.button}
        </ActionButton>
    </Wrapper>
  );
}

/* ===== styled-components ===== */
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(180deg, #FFEECF 0%, #FFDDB2 100%);

  div{
    width: 20.5rem;
    height: 5.5rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 6.25rem;
    background: #FFF;
  }
`;

const Heading = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 3.12rem;
  margin-bottom: 1.94rem;
`;

const Status = styled.div`
  font-size: 2rem;
  font-weight: 600;
`;

const CharButton = styled.button`
  height: 23.9375rem;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2.06rem;
  margin-bottom: 2.31rem;

  border: none;
  background: transparent; /* 배경색 없애는 용도 */
  padding: 0;
  outline: none;
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
`;

const ActionButton = styled.button`
  width: 20rem;
  height: 4.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;

  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  background: #E75900;

  &.neutral{
    background: #424242;
  }

  &.warn{
    background: #E75900;
  }
`;
