import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

/* 강조 텍스트 */
const EmOrange = styled.span` color: #FF8040; `;
const EmGray   = styled.span` color: #8A8A8A; `;

/* ====== 유틸 ====== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ====== 컴포넌트 ====== */
const DeliveryVoice = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // 브라우저 SpeechRecognition 객체
  const SR =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  /**
   * phase 상태
   * - listening: 인식 중(주황 버튼, 파형 애니메)
   * - done: 인식 결과 확정(회색)
   * - noVoice: 인식 실패/권한 거부 등(회색)
   */
  const [phase, setPhase] = useState("listening");
  const [recognizedText, setRecognizedText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [clicked, setClicked] = useState(false);

  // refs
  const recogRef = useRef(null);         // SpeechRecognition 인스턴스
  const finalRef = useRef("");           // 누적 최종 텍스트
  const interimRef = useRef("");         // 최신 interim 텍스트
  const initializedRef = useRef(false);  // 초기화 1회 보장
  const stoppedByClickRef = useRef(false); // 버튼으로 stop했는지 플래그

  // orderId 유효성
  useEffect(() => {
    if (!orderId) navigate("/home");
  }, [orderId, navigate]);

  // SR 초기화 및 이벤트 바인딩
  useEffect(() => {
    if (!SR) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    const r = new SR();
    r.lang = "ko-KR";
    r.interimResults = true;
    r.continuous = true; // 사용자가 멈출 때까지 계속 듣기
    r.maxAlternatives = 1;

    // 마이크 시작될 때마다 기본 상태/변수 초기화
    r.onstart = () => {
      finalRef.current = "";
      interimRef.current = "";
      setRecognizedText("");
      setInterimText("");
      setPhase("listening"); // 주황 버튼
    };

    // 인식 결과 콜백: final은 누적, interim은 ref/상태로 보관
    r.onresult = (evt) => {
      let interim = "";
      for (let i = evt.resultIndex; i < evt.results.length; i++) {
        const phrase = evt.results[i][0].transcript;
        if (evt.results[i].isFinal) {
          finalRef.current += phrase;
        } else {
          interim += phrase;
        }
      }
      interimRef.current = interim;
      setInterimText(interim);
    };

    // 에러: 권한 거부/장치 문제 등
    r.onerror = (e) => {
      console.error("SpeechRecognition error:", e);
      setRecognizedText("");
      setInterimText("");
      setPhase("noVoice"); // 회색
    };

    // 종료: 버튼으로 멈춘 경우만 결과 확정
    r.onend = () => {
      if (stoppedByClickRef.current) {
        const captured = (finalRef.current || interimRef.current || "").trim();
        if (!captured || isInvalidRecognized(captured)) {
          setRecognizedText("");
          setInterimText("");
          setPhase("noVoice");
        } else {
          setRecognizedText(captured);
          setInterimText("");
          setPhase("done");
        }
        stoppedByClickRef.current = false; // 다음 라운드 대비 리셋
      }
    };

    recogRef.current = r;

    // 권한 확인/요청 후 자동 시작
    (async () => {
      try {
        const canQuery = !!(navigator.permissions?.query);
        let state = "prompt";
        if (canQuery) {
          const perm = await navigator.permissions.query({ name: "microphone" });
          state = perm.state; // 'granted' | 'denied' | 'prompt'
        }
        if (state === "denied") {
          setPhase("noVoice");
          return;
        }
        if (state !== "granted") {
          // 권한 요청
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((t) => t.stop());
        }
        startListening();
      } catch (err) {
        console.error("Mic permission error:", err);
        setPhase("noVoice");
      }
    })();

    // 언마운트 시 안전 종료
    return () => {
      try { r.stop(); } catch {}
    };
  }, [SR]);

  // 인식 시작
  const startListening = () => {
    if (!SR) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다. (Chrome 권장)");
      return;
    }
    try {
      recogRef.current?.start();
    } catch (e) {
      console.warn(e);
    }
  };

  // 무효 문구 필터(placeholder 등)
  const isInvalidRecognized = (t) => {
    const s = String(t || "").replace(/\s+/g, "").replace(/\u2026/g, "...").toLowerCase();
    return (
      !s ||
      s.includes("인식중") ||
      s.includes("인식실패") ||
      s.includes("인식되지않음") ||
      s.includes("listening") ||
      s.includes("recognizing")
    );
  };

  // 마이크 버튼
  const onMicClick = async () => {
    if (clicked) return;
    setClicked(true);

    try {
      if (phase !== "listening") {
        // 새 라운드 시작
        startListening();
      } else {
        // 현재 듣는 중이면 stop → 결과 확정
        recogRef.current?.stop();
        await sleep(180);

        const captured = (finalRef.current || interimText || "").trim();
        if (isInvalidRecognized(captured)) {
          setRecognizedText("");
          setInterimText("");
          setPhase("noVoice");
        } else {
          setRecognizedText(captured);
          setInterimText("");
          setPhase("done");
        }
      }
    } finally {
      setClicked(false);
    }
  };

  const goBack = () => {
    navigate(`/delivery-feedback/complaint/${orderId}`);
  };

  const onNotMatch = () => {
    // 결과가 마음에 안 들면 재시작
    setRecognizedText("");
    setInterimText("");
    startListening();
  };

  const onMatch = () => {
    // 다음 화면으로 이동 + 음성 텍스트 전달
    const text = (recognizedText || interimText || "").trim();
    navigate(`/delivery-feedback/forwarding/issue/${orderId}`, {
      state: {
        source: "VOICE",
        text,
      },
    });
  };

  // 상태별 문구/버튼 색
  const { title, top, btnClass } = (() => {
    switch (phase) {
      case "listening":
        return {
          title: <>어떤 문제가 있나요?</>,
          top: (
            <>
              할 말이 끝나면<br />
              <EmOrange>주황색 버튼</EmOrange>을 누르세요.
            </>
          ),
          btnClass: "warn", // 주황
        };
      case "done":
        return {
          title: (
            <>
              이렇게
              <br />말씀하셨나요?
            </>
          ),
          top: <>{recognizedText}</>,
          btnClass: "neutral",
        };
      case "noVoice":
        return {
          title: <>어떤 문제가 있나요?</>,
          top: <>인식되지 않음</>,
          btnClass: "neutral",
        };
      default:
        return { top: "", btnClass: "neutral" };
    }
  })();

  const renderBottomArea = () => {
    if (phase === "noVoice") {
      return (
        <BottomText>
          다시 시도하려면
          <br />
          <EmGray>회색 버튼</EmGray>을 누르세요.
        </BottomText>
      );
    }
    if (phase === "done") {
      return (
        <BottomActions>
          <SubButton onClick={onNotMatch}>아니에요</SubButton>
          <SubButton className="yes" onClick={onMatch}>
            맞아요
          </SubButton>
        </BottomActions>
      );
    }
    // listening 중
    return (
      <BottomActions>
        <SubButton className="back" onClick={goBack}>
          돌아가기
        </SubButton>
      </BottomActions>
    );
  };

  return (
    <Wrapper $phase={phase}>
      <h1>{title}</h1>

      <Content>
        <div className="space">
          <TopText>{top}</TopText>
        </div>

        <MainButton className={btnClass} onClick={onMicClick} disabled={clicked}>
          <img src="/icons/VoiceMic.svg" alt="마이크" />
        </MainButton>

        {renderBottomArea()}
      </Content>
    </Wrapper>
  );
};

export default DeliveryVoice;

/* ====== 스타일 ====== */
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: ${({ $phase }) => ($phase === "done" ? "1.88rem" : "3.75rem")};
    margin-bottom: ${({ $phase }) => ($phase === "done" ? "2.62rem" : "4.75rem")};
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 35.9375rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  div.space {
    margin-top: 2.19rem;
    height: 6.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const TopText = styled.h2`
  color: var(--background-color);
  font-size: 2rem;
  font-weight: 650;
  word-break: keep-all;
`;

const BottomText = styled.p`
  margin-top: 3.12rem;
  color: var(--background-color);
  font-size: 1.875rem;
  font-weight: 650;
`;

const ringSpread = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(248,147,23,0.30); opacity: .45; }
  50%  { box-shadow: 0 0 0 42px rgba(248,147,23,0.30); opacity: .85; }
  100% { box-shadow: 0 0 0 0 rgba(248,147,23,0.30); opacity: .45; }
`;

const MainButton = styled.button`
  position: relative;
  width: 9.375rem;
  aspect-ratio: 1 / 1;
  margin-top: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--main-color);
  border: none;
  cursor: pointer;

  &.warn { background: var(--main-color); }   /* 주황 */
  &.neutral { background: #b2b2b2; }          /* 회색 */

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* listening(주황)에서만 파동 애니메이션 */
  &.warn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 0 0 rgba(248,147,23,0.30);
    animation: ${ringSpread} 1.2s ease-in-out infinite;
  }

  /* 회색 상태(중간/완료/실패)는 애니 없음 */
  &.neutral::before,
  &.warn:disabled::before {
    animation: none;
    display: none;
  }
`;

const BottomActions = styled.div`
  margin-top: 6.44rem;
  display: flex;
  gap: 1.56rem;
  align-items: center;
`;

const SubButton = styled.button`
  width: 9.4375rem;
  height: 4.375rem;

  border-radius: 0.75rem;
  border: none;
  background: var(--button-color);

  font-size: 2rem;
  font-weight: 700;
  color: #FFF;
  cursor: pointer;

  &.back { width: 20rem; }
  &.yes  { background: var(--main-color); color: #000; }
`;
