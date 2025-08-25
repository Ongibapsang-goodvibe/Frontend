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
        바비의 말이<EmOrange> 끝나면</EmOrange><br />말씀해주세요.
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

  const isActiveRef = useRef(true);   // 대화 진행 여부 플래그
  const ttsDoneRef = useRef(false);   // TTS 종료 핸들러 1회 보장
  const ttsTimerRef = useRef(null);   // TTS 안전 타이머
  const reqAbortRef = useRef(null);   // STT 요청 취소용 AbortController

  // 페이지 진입시 무조건 IDLE로 리셋 + 언마운트 정리
  useEffect(() => {
    setState(STATES.IDLE);
    return () => {
      isActiveRef.current = false;
      clearTtsTimer();              // 언마운트 시 타이머 정리
      cleanupAudio();
      cleanupRecorder(true);
      clearStopTimer();
      try { reqAbortRef.current?.abort(); } catch {}
      reqAbortRef.current = null;
    };
  }, []);

  const clearTtsTimer = () => {
    if (ttsTimerRef.current) {
      clearTimeout(ttsTimerRef.current);
      ttsTimerRef.current = null;
    }
  };

  const clearStopTimer = () => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  const stopCurrentAudio = () => {
    const a = audioRef.current;
    if (a) {
      try {
        clearTtsTimer();            // 오디오 멈출 때 타이머도 정리
        a.pause();
        a.src = "";                 // 소스 제거
        a.load?.();                 // 로딩 초기화(네트워크/디코딩 중단)
      } catch {}
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
    isActiveRef.current = true; // 혹시 이전 턴에서 false로 떨어져 있었으면 복구

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

      // UI 변경 없이 자동 종료 타이머(예: 5초)
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
      // 브라우저에서는 webm/opus가 일반적 → File로 래핑 후 'audio' 필드로 전송
      const file = new File([audioBlob], "temp_audio.webm", {
        type: audioBlob.type || "audio/webm",
      });
      formData.append("audio", file);

      // 이전 요청 있으면 취소
      if (reqAbortRef.current) {
        try { reqAbortRef.current.abort(); } catch {}
      }
      const controller = new AbortController();
      reqAbortRef.current = controller;

      // Content-Type을 수동 지정하지 말 것(axios가 boundary 자동 설정)
      const res = await api.post("/api/chat/process-audio/", formData, {
        signal: controller.signal,
      });

      const { audio_url } = res.data; // 예: "/media/response.mp3" 또는 "uuid.mp3"
      if (!audio_url) throw new Error("오디오 URL이 없습니다.");

      // 언마운트/종료 후면 무시
      if (!isActiveRef.current) return;

      await playTTS(audio_url);
    } catch (err) {
      // axios 취소
      if (err?.name === "CanceledError" || err?.name === "AbortError") {
        return; // 정상 종료로 간주
      }
      console.error("STT 처리 오류:", err);
      setState(STATES.IDLE);
    } finally {
      reqAbortRef.current = null;
    }
  };

  const playTTS = async (audioUrl) => {
    // 이미 종료/이탈했으면 재생 금지
    if (!isActiveRef.current) return;

    stopCurrentAudio();
    setState(STATES.SPEAKING);

    try {
      // 서버는 파일명만 내려줌 → /media/{uuid}.mp3 로 고정
      const buildMediaUrl = (u) => {
        if (!u) return null;
        const fname = u.trim().split("/").filter(Boolean).pop(); // "xxxx.mp3" or "xxxx"
        const ensured = fname.endsWith(".mp3") ? fname : `${fname}.mp3`;
        if (import.meta.env.DEV) {
          // 로컬: Vite 프록시로 /media/... 사용
          return `/media/${ensured}`;
        } else {
          // 배포: Django serve_audio 뷰로 CORS 허용
          return `/api/chat/media/${ensured}`;
        }
      };

      const finalUrl = buildMediaUrl(audioUrl);

      // 절대 URL을 바로 재생
      const base = (api.defaults.baseURL || "").replace(/\/$/, "");
      const absUrl = import.meta.env.DEV
        ? finalUrl                               // dev: /media/... → Vite 프록시가 대신 요청
        : (finalUrl?.startsWith("http") ? finalUrl : `${base}${finalUrl}`);

      const audio = new Audio(absUrl);
      audio.preload = "auto";
      try { audio.crossOrigin = "anonymous"; } catch {}

      // 재생 직전에도 한 번 더 점검
      if (!isActiveRef.current) return;

      audioRef.current = audio;

      // TTS 종료 → 다음 턴 시작을 1회만 보장하는 함수
      ttsDoneRef.current = false;
      const beginNextTurn = () => {
        if (ttsDoneRef.current) return;
        ttsDoneRef.current = true;
        clearTtsTimer();  // 트리거되면 타이머 정리

        // ✅ UI 전환은 항상 수행 (대화 종료 상태여도 '말하기 종료' → '듣는 중' 반영)
        setState(STATES.LISTENING);
        // 자동 재녹음은 isActiveRef가 true일 때만
        if (!isActiveRef.current) return;
        setTimeout(() => {
          startListening().catch(err =>
            console.error("auto startListening failed:", err)
          );
        }, 0);
      };

      // 기본: ended 한 번만
      audio.addEventListener("ended", beginNextTurn, { once: true });

      // 보조1: 어떤 환경에선 ended 대신 pause만 끝에서 뜰 수 있음
      audio.addEventListener("pause", () => {
        const d = audio.duration;
        if (Number.isFinite(d) && Math.abs(audio.currentTime - d) < 0.1) {
          beginNextTurn();
        }
      });

      // 보조2: timeupdate로 거의 끝에 도달했을 때도 트리거
      audio.addEventListener("timeupdate", () => {
        const d = audio.duration;
        if (Number.isFinite(d) && d > 0 && audio.currentTime >= d - 0.2) {
          beginNextTurn();
        }
      });

      // 폴백 A: loadedmetadata가 떴을 때 duration 기반 타이머
      audio.addEventListener("loadedmetadata", () => {
        const d = audio.duration;
        // 일부 환경에서 Infinity/NaN 이 나옴 → 안전값 사용
        const ms = Number.isFinite(d) && d > 0 ? Math.ceil(d * 1000) + 600 : 15000;
        clearTtsTimer();
        ttsTimerRef.current = setTimeout(beginNextTurn, ms);
      });

      // 폴백 B: 네트워크 이슈로 ended가 누락될 때 대비
      const networkEdgeToEnd = () => {
        const d = audio.duration;
        if (Number.isFinite(d) && d > 0 && audio.currentTime >= d - 0.15) {
          beginNextTurn();
        }
      };
      audio.addEventListener("stalled", networkEdgeToEnd);
      audio.addEventListener("suspend", networkEdgeToEnd);
      audio.addEventListener("waiting", networkEdgeToEnd);

      // 폴백 C: 재생 시작 직후에도 "최종 하드 타이머" 한 겹 더
      const armHardFallback = () => {
        // 이미 메타기반 타이머가 있으면 유지, 없으면 18초 하드컷
        if (!ttsTimerRef.current) {
          ttsTimerRef.current = setTimeout(beginNextTurn, 18000);
        }
      };
      audio.addEventListener("playing", armHardFallback, { once: true });

      audio.addEventListener("error", () => {
        console.error("오디오 재생 오류(event):", absUrl);
        // 실패해도 다음 턴으로(듣기 상태 복귀)
        beginNextTurn();
      });

      await audio.play().catch(err => {
        console.error("audio.play() 실패:", err?.name || err);
        beginNextTurn();
      });

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
        isActiveRef.current = false;  // 이후 ended 콜백에서 재녹음 금지
        stopCurrentAudio();           // 재생 중이면 즉시 멈춤
        clearStopTimer();
        cleanupAudio();
        cleanupRecorder(true);
        try { reqAbortRef.current?.abort(); } catch {}
        reqAbortRef.current = null;
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
