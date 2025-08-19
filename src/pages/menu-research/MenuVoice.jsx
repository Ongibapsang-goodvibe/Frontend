import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

  /* 상태별 UI 문구 / 버튼 라벨 / 버튼 색상 클래스 */
  const EmOrange = styled.span` color: #FF8040; `;
  const EmGray   = styled.span` color: #8A8A8A; `;
  const EmMedium = styled.span` font-weight: 500; `;

/* ====== 유틸 ====== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pickResults = (data) => {
  // API 응답 구조가 다를 수 있으니 방어적으로 처리
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.cards || data.results || data.items || data.data || [];
};
const getAccessToken = () => {
  // 로그인 없이 진행한다면 빈 값 반환
  if (typeof window === "undefined") return "";
  return window.__ACCESS_TOKEN__ || localStorage.getItem("accessToken") || "";
};

/* ====== 컴포넌트 ====== */
const MenuVoice = () => {
  const navigate = useNavigate();

  // 브라우저 SpeechRecognition 객체
  const SR =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  const [phase, setPhase] = useState("listening"); // 상태 단계
  const [displayText, setDisplayText] = useState(""); // 화면 표시용
  const [recognizedText, setRecognizedText] = useState(""); // 최종 인식된 텍스트
  const [loading, setLoading] = useState(false); // 검색 로딩 상태
  const [clicked, setClicked] = useState(false); // 버튼 연타 방지

  const recogRef = useRef(null); // recognition 인스턴스 보관
  const stopperRef = useRef(null); // 자동 stop 타이머
  const finalRef = useRef(""); // 최종 인식 텍스트 누적
  const endedRef = useRef(false); // 인식 종료 플래그
  const initializedRef = useRef(false); // 중복 초기화 방지

  /** ✅ API URL: 무조건 VITE_API_BASE 기반 (상대경로 X, 절대 URL 강제) */
  const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
  const SEARCH_URL = `${API_BASE}/api/restaurants/search/`; // 검색 API
  const RESULTS_URL = "/restaurants/results"; // 검색결과 페이지 경로 (프엔 라우팅)

  useEffect(() => {
    if (!SR) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    // ✅ 음성인식 객체 생성
    const r = new SR();
    r.lang = "ko-KR";
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 1;

    r.onstart = () => {
      finalRef.current = "";
      endedRef.current = false;
      setDisplayText("");
      // 8초 타임아웃 후 자동 stop
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
      // 중간 결과(interim)는 UI에 즉시 안 띄움 (최종만 반영)
    };

    r.onerror = (e) => {
      console.error("SpeechRecognition error:", e);
      setPhase("noVoice");
      setDisplayText("인식되지 않음");
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

  // ✅ 음성 인식 시작
  const startListening = () => {
    if (!SR) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다. (Chrome 권장)");
      return;
    }
    setPhase("listening");
    setRecognizedText("");
    setDisplayText("");
    endedRef.current = false;
    recogRef.current?.start();
  };

  // ✅ 인식된 텍스트가 유효한지 검사
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

  // ✅ 음성 인식 종료 + 검색 API 호출
  const stopListeningAndSearch = async () => {
    try { recogRef.current?.stop(); } catch {}
    await sleep(180);

    const captured = (finalRef.current || displayText || "").trim();
    if (isInvalidRecognized(captured)) {
      setPhase("noVoice");
      setRecognizedText("");
      return;
    }

    setRecognizedText(captured);
    setPhase("processing");
    setLoading(true);

    try {
      const token = getAccessToken();
      const ac = new AbortController();
      const timeoutId = setTimeout(() => ac.abort(), 10000); // 10초 타임아웃

      // ✅ POST 요청 (검색 API)
      const res = await fetch(SEARCH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), // 토큰 있으면 헤더 추가
        },
        body: JSON.stringify({ text: captured, limit: 10 }),
        signal: ac.signal,
      });

      clearTimeout(timeoutId);

      if (res.status === 401 || res.status === 403 || res.status === 204 || res.status >= 500) {
        setPhase("noResult");
        return;
      }
      if (!res.ok) throw new Error("HTTP " + res.status);

      const data = await res.json();
      const list = pickResults(data);

      if (Array.isArray(list) && list.length > 0) {
        // ✅ 검색 결과 페이지로 이동 (프엔 라우팅)
        navigate(`${RESULTS_URL}?q=${encodeURIComponent(captured)}&source=voice`);
      } else {
        setPhase("noResult");
      }
    } catch (e) {
      console.error("Search API error:", e);
      setPhase("noResult");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 버튼 클릭 핸들러
  const onMainButtonClick = () => {
    if (clicked) return;
    if (phase === "listening") {
      setClicked(true);
      Promise.resolve(stopListeningAndSearch()).finally(() => setClicked(false));
    } else {
      startListening();
    }
  };

  // ✅ 상태별 UI 매핑
  const { top, bottom, btnClass } = (() => {
    switch (phase) {
      case "listening":
        return {
          top: (
            <>
              할 말이 끝나면<br/>
              <EmOrange>주황색 버튼</EmOrange>을 누르세요.
            </>
          ),
          bottom: `예) "야채죽", "맛나식당", "두부"`,
          btnClass: "warn",
        };
      case "processing":
        return { top: <>{recognizedText}</>, bottom: loading ? "검색 중…" : "", btnClass: "neutral" };
      case "noVoice":
        return {
          top: "인식되지 않음",
          bottom: <>다시 시도하려면<br/><EmGray>회색 버튼</EmGray>을 누르세요.</>,
          btnClass: "neutral",
        };
      case "noResult":
        return {
          top: <> '{recognizedText}' <EmMedium>의 검색결과 없음</EmMedium> </>,
          bottom: <>다시 시도하려면<br/><EmGray>회색 버튼</EmGray>을 누르세요.</>,
          btnClass: "neutral",
        };
      default:
        return { top: "", bottom: "", btnClass: "neutral" };
    }
  })();

  const isWarn = btnClass === "warn";

  return (
    <Wrapper>
      <h1>
        찾는 음식 (또는 식당)
        <br /> 이름이 뭐예요?
      </h1>

      <Content>
        <div className="space">
          <TopText>{top}</TopText>
        </div>

        {/* ✅ 마이크 버튼 */}
        <MainButton
          className={btnClass}
          onClick={onMainButtonClick}
          disabled={clicked || (phase === "processing" && loading)}
        >
          <img src="/VoiceMic.svg" alt="마이크" />
        </MainButton>

        {/* ✅ 하단 안내 문구 */}
        {bottom && <BottomText className={isWarn ? "warn" : ""}>{bottom}</BottomText>}
      </Content>
    </Wrapper>
  );
};

export default MenuVoice;

/* ====== 스타일 ====== */
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 1.87rem;
    margin-bottom: 2.67rem;
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
    margin-top: 3.44rem;
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
`;

const BottomText = styled.p`
  margin-top: 3.12rem;
  color: var(--background-color);
  font-size: 1.875rem;
  font-weight: 650;

  &.warn {
    margin-top: 5.19rem;
    color: #7B7B7B;
    font-size: 1.5rem;
    font-weight: 650;
  }
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

  &.warn {
    background: var(--main-color);
  }
  &.neutral {
    background: #b2b2b2;
  }

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
    will-change: box-shadow, opacity;
  }

  &.neutral::before,
  &.warn:disabled::before {
    animation: none;
    display: none;
  }
`;
