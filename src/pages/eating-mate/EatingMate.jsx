// src/pages/talk/EatingMate.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export const STATES = {
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
    img: "/images/WaitingBarbi.png",
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
    img: "/images/ListeningBarbi.png",
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
    img: "/images/ThinkingBarbi.png",
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
    img: "/images/TalkingBarbi.png",
  },
};

export default function EatingMate() {
  const navigate = useNavigate();
  const [state, setState] = useState(STATES.IDLE);

  // --- TalkPage 로직 내장 ---
  const audioRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const stopTimerRef = useRef(null);

  // 페이지 진입시 무조건 IDLE로 리셋 + 언마운트 정리
  useEffect(() => {
    setState(STATES.IDLE);
    return () => {
      cleanupAudio();
      cleanupRecorder(true);
      clearStopTimer();
    };
  }, []);

  const clearStopTimer = () => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  const stopCurrentAudio = () => {
    const a = audioRef.current;
    if (a) {
      try { a.pause(); } catch {}
      audioRef.current = null;
    }
  };

  const cleanupAudio = () => {
    stopCurrentAudio();
  };

  const cleanupRecorder = (stopStream = false) => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    } catch {}
    mediaRecorderRef.current = null;
    chunksRef.current = [];

    if (stopStream && mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
  };

  // 🎤 녹음 시작 (IDLE → LISTENING)
  const startListening = async () => {
    stopCurrentAudio();
    clearStopTimer();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        await handleStopListening(blob);
      };

      setState(STATES.LISTENING);
      mr.start();

      // UI 변경 없이 자동 종료 타이머(예: 5초) — 별도 UI 추가 없이 동작만
      stopTimerRef.current = setTimeout(() => {
        stopListening();
      }, 5000);
    } catch (err) {
      console.error("마이크 시작 실패:", err);
      setState(STATES.IDLE);
    }
  };

  // 🧨 녹음 종료
  const stopListening = () => {
    clearStopTimer();
    const mr = mediaRecorderRef.current;
    if (mr && mr.state === "recording") {
      try { mr.stop(); } catch {}
    } else {
      setState(STATES.IDLE);
    }
  };

  // 🔊 STT → TTS
  const handleStopListening = async (audioBlob) => {
    setState(STATES.THINKING);
    cleanupRecorder(true);

    try {
      // 방어: 빈 녹음 방지
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error("녹음된 오디오가 비어 있습니다.");
      }

      const formData = new FormData();
      // 서버 예시가 mp3지만, 브라우저에선 webm/opus가 일반적입니다.
      // 변환은 클라이언트에서 어렵기 때문에 파일명만 맞춰 주거나(간단 체크 우회),
      // 백엔드에서 webm도 허용하도록 하세요.
      // ⇒ Blob을 File로 래핑 + 일반적 필드명 'audio' 사용
      const file = new File([audioBlob], "temp_audio.webm", {
        type: audioBlob.type || "audio/webm",
      });
      formData.append("audio", file);

      // Content-Type을 수동 지정하지 말 것(axios가 boundary 자동 설정)
      const res = await api.post("/api/chat/process_audio/", formData);

      const { audio_url } = res.data; // 예: "/media/response.mp3"
      if (!audio_url) throw new Error("오디오 URL이 없습니다.");

      await playTTS(audio_url);
    } catch (err) {
      console.error("STT 처리 오류:", err);
      setState(STATES.IDLE);
    }
  };

  const playTTS = async (audioUrl) => {
    stopCurrentAudio();
    setState(STATES.SPEAKING);

    try {
      // 토큰 포함해서 blob으로 받기 (api 인스턴스가 Authorization 헤더 자동 부착)
      // 상대경로가 올 수 있어 /api 접두사 및 끝 슬래시 보정
      const fixedUrl = audioUrl.startsWith("http")
        ? audioUrl
        : `/api${audioUrl.replace(/\/+$/, "")}/`;

      const res = await api.get(fixedUrl, { responseType: "blob" });
      const blobUrl = URL.createObjectURL(res.data); // Blob -> 재생 URL

      const audio = new Audio(blobUrl);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setState(STATES.LISTENING);
        // 자동 재녹음
        startListening();
      });
      audio.addEventListener("error", () => setState(STATES.IDLE));

      await audio.play();
    } catch (err) {
      console.error("오디오 재생 오류:", err);
      setState(STATES.IDLE);
    }
  };

  // --- 기존 UI 동작 그대로 ---
  // 클릭 전이 제한: IDLE → LISTENING만 허용 (UI 변경 없음)
  const handleCharacterClick = () => {
    if (state === STATES.IDLE) {
      startListening();
    }
    // LISTENING/THINKING/SPEAKING 전이는 내부 로직이 처리
  };

  const canGoBackInApp = () => {
    try {
      const ref = document.referrer;
      if (!ref) return false;
      const sameOrigin = new URL(ref).origin === window.location.origin;
      return sameOrigin;
    } catch {
      return false;
    }
  };

  // 하단 버튼 동작
  const handleBottomButton = async () => {
    if (state === STATES.IDLE) {
      if (canGoBackInApp()) {
        navigate(-1);
      } else {
        navigate("/home", { replace: true }); // ← 외부에서 진입했으면 홈으로
      }
    } else {
      // 대화 종료: 리소스 정리 후 종료화면
      try {
        clearStopTimer();
        cleanupAudio();
        cleanupRecorder(true);
      } catch {}
      navigate("/eating-mate/end");
    }
  };

  const ui = UI[state] ?? UI[STATES.IDLE];

  return (
    <Wrapper>
      <Heading>{ui.heading}</Heading>
      <Status>{ui.status}</Status>

      <CharButton
        type="button"
        onClick={handleCharacterClick}
        $clickable={state === STATES.IDLE}   // 기존 그대로 유지
      >
        <img src={ui.img} alt="" draggable={false} />
      </CharButton>

      <ActionButton
        type="button"
        onClick={handleBottomButton}
        className={ui.btnClass}
      >
        {ui.button}
      </ActionButton>
    </Wrapper>
  );
}

/* ===== styled-components (원본 그대로) ===== */
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(180deg, #FFEECF 0%, #FFDDB2 100%);
`;

const Heading = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--background-color);

  margin-top: 3.12rem;
  margin-bottom: 1.94rem;
`;

const Status = styled.div`
  width: 20.5rem;
  height: 5.5rem;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6.25rem;
  background: #FFF;

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