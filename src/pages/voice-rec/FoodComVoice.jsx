import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

/* 강조 텍스트 */
const EmOrange = styled.span` color: #FF8040; `;
const EmGray   = styled.span` color: #8A8A8A; `;

/* ====== 유틸 ====== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ====== 컴포넌트 ====== */
const FoodComVoice = () => {
  const navigate = useNavigate();

  const SR =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  // phase: listening(인식중), done(완료), noVoice(실패)
  const [phase, setPhase] = useState("listening");
  const [recognizedText, setRecognizedText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [clicked, setClicked] = useState(false);

  const recogRef = useRef(null);
  const stopperRef = useRef(null);
  const finalRef = useRef("");
  const endedRef = useRef(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!SR) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    const r = new SR();
    r.lang = "ko-KR";
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 1;

    r.onstart = () => {
      finalRef.current = "";
      endedRef.current = false;
      setRecognizedText("");
      setInterimText("");
      setPhase("listening");
      clearTimeout(stopperRef.current);
      stopperRef.current = setTimeout(() => r.stop(), 8000);
    };

    r.onresult = (evt) => {
      if (endedRef.current) return;
      let interim = "";
      for (let i = evt.resultIndex; i < evt.results.length; i++) {
        const phrase = evt.results[i][0].transcript;
        if (evt.results[i].isFinal) {
          finalRef.current += phrase;
        } else {
          interim += phrase;
        }
      }
      setInterimText(interim);
    };

    r.onerror = (e) => {
      console.error("SpeechRecognition error:", e);
      setPhase("noVoice");
      setRecognizedText("");
      setInterimText("");
    };

    r.onend = () => {
      clearTimeout(stopperRef.current);
      setTimeout(() => { endedRef.current = true; }, 50);
    };

    recogRef.current = r;
    startListening();

    return () => {
      clearTimeout(stopperRef.current);
      try { r.stop(); } catch {}
    };
  }, [SR]);

  const startListening = () => {
    if (!SR) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다. (Chrome 권장)");
      return;
    }
    setPhase("listening");
    setRecognizedText("");
    setInterimText("");
    endedRef.current = false;
    try { recogRef.current?.start(); } catch {}
  };

  const isInvalidRecognized = (t) => {
    if (!t) return true;
    const s = String(t).replace(/\s+/g, "").replace(/\u2026/g, "...").toLowerCase();
    return (
      !s ||
      s.includes("인식중") ||
      s.includes("인식실패") ||
      s.includes("인식되지않음") ||
      s.includes("listening") ||
      s.includes("recognizing")
    );
  };

  // ✅ 마이크 버튼 동작: 상태별 분기
  const onMicClick = async () => {
    if (clicked) return;

    // listening이 아니면(= 회색 버튼일 때) → 다시 인식 시작
    if (phase !== "listening") {
        startListening();
        return;
    }

    // listening 중이면 → stop 해서 결과 확정
    setClicked(true);
    try { recogRef.current?.stop(); } catch {}
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

    setClicked(false);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/food-feedback/check");
    }
  };

  const onNotMatch = () => {
    startListening();
  };

  const onMatch = () => {
    // ❌TODO: API 연동 자리 + 경로수정
    console.log("[TO-BE-SENT] recognizedText:", recognizedText);
    navigate("/food-feedback/forwarding");
  };

  // 상태별 문구/버튼 색
  const { title, top, btnClass } = (() => {
    switch (phase) {
      case "listening":
        return {
          title: <>어떤 문제가 있나요?</>,
          top: 
            <>
              할 말이 끝나면<br/>
              <EmOrange>주황색 버튼</EmOrange>을 누르세요.
            </>,
          btnClass: "warn",
        };
      case "done":
        return {
          title: <>이렇게<br />말씀하셨나요?</>,
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
          다시 시도하려면<br/><EmGray>회색 버튼</EmGray>을 누르세요.
        </BottomText>
      );
    }
    if (phase === "done") {
      return (
        <BottomActions>
          <SubButton onClick={onNotMatch}>아니에요</SubButton>
          <SubButton className="yes" onClick={onMatch}>맞아요</SubButton>
        </BottomActions>
      );
    }
    // listening 중
    return (
      <BottomActions>
        <SubButton className="back" onClick={goBack}>돌아가기</SubButton>
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

        <MainButton
          className={btnClass}
          onClick={onMicClick}
          disabled={clicked}
        >
          <img src="/icons/VoiceMic.svg" alt="마이크" />
        </MainButton>

        {renderBottomArea()}
      </Content>
    </Wrapper>
  );
};

export default FoodComVoice;

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

  &.warn { background: var(--main-color); }
  &.neutral { background: #b2b2b2; }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.warn::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 0 0 rgba(248,147,23,0.30);
    animation: ${ringSpread} 1.2s ease-in-out infinite;
  }

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
  &.yes { background: var(--main-color); color: #000; }
`;