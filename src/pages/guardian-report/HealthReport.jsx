import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import api from "../../api";
import axios from "axios";

const DAY_KO = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];

// 백엔드 무드코드 → 한글 라벨
const moodCodeToKorean = {
  GREAT: "최고인 날",
  FINE: "괜찮은 날",
  SOSO: "그냥 그런 날",
  BAD: "안 좋은 날",
  TERRIBLE: "나쁜 날",
};
// 무드코드 → 아이콘 경로
const moodCodeToIcon = {
  GREAT: "/icons/BlueEmoji.svg",
  FINE: "/icons/GreenEmoji.svg",
  SOSO: "/icons/YellowEmoji.svg",
  BAD: "/icons/OrangeEmoji.svg",
  TERRIBLE: "/icons/RedEmoji.svg",
};

function toKSTDate(d) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date;
}

function formatRangeKorean(startISO, endISO) {
  if (!startISO || !endISO) return "기간 정보 없음";
  const s = toKSTDate(startISO);
  const e = toKSTDate(endISO);
  const [a, b] = s <= e ? [s, e] : [e, s];
  const sTxt = `${a.getMonth() + 1}월 ${a.getDate()}일`;
  const eTxt = `${b.getMonth() + 1}월 ${b.getDate()}일`;
  return `${sTxt} - ${eTxt}`;
}

function getWeekDates(startISO) {
  if (!startISO) return [];
  const start = toKSTDate(startISO);
  const day = start.getDay(); // 0=일,1=월...
  const diffToMonday = (day + 6) % 7; // 일(0)->6, 월(1)->0
  const monday = new Date(start);
  monday.setDate(start.getDate() - diffToMonday);

  const arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    arr.push(d);
  }
  return arr;
}

const HealthReport = () => {
  const [report, setReport] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");

    const controller = new AbortController();
    Promise.all([
      api.get(`/api/accounts/user/`, { signal: controller.signal }),
      api.get(`/api/healthcare/h_report/`, { signal: controller.signal }),
    ])
      .then(([userRes, repRes]) => {
        setUsername(userRes?.data?.username || "");
        setReport(repRes?.data || null);
      })
      .catch((e) => {
        if (axios.isCancel?.(e) || e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
        console.error(e);
        setErr("건강 리포트를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // 표시용 파생값
  const dateRange = useMemo(
    () => formatRangeKorean(report?.period_start, report?.period_end),
    [report]
  );
  const healthCount = report?.bad_count ?? 0;

  const feelingDayText = useMemo(() => {
    if (!report?.dominant_mood) return "???";
    return moodCodeToKorean[report.dominant_mood] || "???";
  }, [report]);

  // 텍스트 카드: bad_logs(최신순, 공백 제거) + weekday_bad_texts(보조) / 중복 제거
  const textCards = useMemo(() => {
    if (!report) return [];

    const seen = new Set(); // "요일|텍스트" 중복 방지
    const cards = [];

    if (Array.isArray(report.bad_logs)) {
      const withText = report.bad_logs
        .filter(l => (l.text || "").trim().length > 0)
        .map(l => {
          const d = new Date(l.created_at);
          const dayKo = DAY_KO[d.getDay()];
          const text = l.text.trim();
          return { id: l.id, dayKo, text, createdAt: d };
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      for (const item of withText) {
        const key = `${item.dayKo}|${item.text}`;
        if (!seen.has(key)) {
          seen.add(key);
          cards.push(item);
        }
      }
    }

    if (report.weekday_bad_texts && typeof report.weekday_bad_texts === "object") {
      for (const [dayKo, arr] of Object.entries(report.weekday_bad_texts)) {
        (arr || []).forEach(t => {
          const text = (t || "").trim();
          if (!text) return;
          const key = `${dayKo}|${text}`;
          if (!seen.has(key)) {
            seen.add(key);
            cards.push({ id: null, dayKo, text, createdAt: null });
          }
        });
      }
    }

    return cards;
  }, [report]);

  // 주간 달력 데이터
  const weekDates = useMemo(() => getWeekDates(report?.period_start), [report?.period_start]);

  // 요일 고정 + 날짜 표시 / 무드가 있으면 아이콘
  const weekSlots = useMemo(() => {
    const short = ['월','화','수','목','금','토','일'];
    const full  = ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'];
    const moods = report?.weekday_moods || {};
    return short.map((label, idx) => {
      const dateObj = weekDates[idx];
      const dateNumRaw = dateObj ? dateObj.getDate() : null;
      const dateNum = Number.isFinite(dateNumRaw) ? dateNumRaw : null;
      const dayFull = full[idx];
      const moodCode = moods[dayFull];
      const icon = moodCode ? moodCodeToIcon[moodCode] : null;
      return { label, dateNum, moodCode, icon };
    });
  }, [weekDates, report?.weekday_moods]);

  return (
    <>
      <Wrapper>
        {loading && <InlineNote>불러오는 중…</InlineNote>}
        {!loading && err && <ErrorNote>{err}</ErrorNote>}

        <Top>
          <DateBadge>{dateRange}</DateBadge>
          <Title>
            {username || "사용자"}님의 건강 보고서
            <img src="/icons/HealthReport.svg" alt="건강 보고서 아이콘" />
          </Title>
        </Top>

        <Card className="health">
          <div>
            건강 이상징후가<br />
            <strong>{healthCount}건 감지됐어요.</strong>
          </div>
        </Card>

        {/* 텍스트 카드: 텍스트 있는 경우만 렌더 */}
        {textCards.length > 0 && textCards.map((c) => {
          const fallback = `${c.dayKo}|${c.text}`;
          const key = c.id ? `log-${c.id}` : `wt-${fallback}`;
          return (
            <Health key={key}>
              <div className="title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M8.57502 3.21635L1.51668 14.9997C1.37116 15.2517 1.29416 15.5374 1.29334 15.8284C1.29253 16.1195 1.36793 16.4056 1.51204 16.6585C1.65615 16.9113 1.86396 17.122 2.11477 17.2696C2.36559 17.4171 2.65068 17.4965 2.94168 17.4997H17.0583C17.3494 17.4965 17.6344 17.4171 17.8853 17.2696C18.1361 17.122 18.3439 16.9113 18.488 16.6585C18.6321 16.4056 18.7075 16.1195 18.7067 15.8284C18.7059 15.5374 18.6289 15.2517 18.4834 14.9997L11.425 3.21635C11.2765 2.97144 11.0673 2.76895 10.8177 2.62842C10.5681 2.48789 10.2865 2.41406 10 2.41406C9.71357 2.41406 9.43196 2.48789 9.18235 2.62842C8.93275 2.76895 8.72358 2.97144 8.57502 3.21635Z" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 7.5V10.8333" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14.167H10.0083" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <strong>{c.dayKo}</strong>에 이렇게 대답한 내역이 있어요.
              </div>
              <div className="content">{c.text}</div>
            </Health>
          );
        })}

        <Card className="feeling">
          <div>
            이번 주는 <strong>{feelingDayText}</strong>이<br />
            더 많았네요.
          </div>
        </Card>

        <Week>
          {weekSlots.map(({ label, dateNum, icon, moodCode }) => (
            <div key={label}>
              {label}
              {icon ? (
                <img src={icon} alt={`${label} ${moodCodeToKorean[moodCode] || '기분'}`} />
              ) : (
                <div className="circle">{dateNum ?? '-'}</div>
              )}
            </div>
          ))}
        </Week>

        <Feeling>
          <div><img src="/icons/BlueEmoji.svg" alt="최고예요 아이콘"/> : 최고예요!</div>
          <div><img src="/icons/GreenEmoji.svg" alt="괜찮아요 아이콘"/> : 괜찮아요</div>
          <div><img src="/icons/YellowEmoji.svg" alt="그냥 그래요 아이콘"/> : 그냥 그래요</div>
          <div><img src="/icons/OrangeEmoji.svg" alt="안 좋아요 아이콘"/> : 안 좋아요</div>
          <div><img src="/icons/RedEmoji.svg" alt="나빠요 아이콘"/> : 나빠요</div>
        </Feeling>
      </Wrapper>
    </>
  );
}

export default HealthReport;

/* ===================== styled-components ===================== */

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const InlineNote = styled.div`
  padding: 8px 12px;
`;

const ErrorNote = styled.div`
  color: #b00020;
  background: #fff3f3;
  padding: 10px 12px;
  border: 1px solid #ffd8d8;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const Top = styled.div`
  height: 11.0625rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.94rem;
  padding-top: 2rem;
  background: #4BA3E0;
`;

const DateBadge = styled.div`
  width: 11rem;
  height: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.38rem;
  border-radius: 6.25rem;
  background: #FFF;
  color: #55565A;
  font-size: 1rem;
  font-weight: 600;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 0.38rem;
  gap: 0.63rem;
  color: #FFF;
  font-size: 1.75rem;
  font-weight: 700;

  img {
    width: 28px;
    height: 28px;
  }
`;

const Card = styled.div`
  width: 21.19rem;
  height: 6.88rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1.19rem;
  border-radius: 0.625rem;
  border: 1px solid #D9D9D9;
  background: #FFFAEA;
  color: #424242;
  font-size: 1.5rem;
  font-weight: 600;

  strong { font-weight: 700; }
  div { flex: 1; text-align: left; }

  &.health { margin-top: -2.69rem; }
`;

const Health = styled.div`
  width: 21.19rem;
  min-height: 12.19rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 0.625rem;
  border: 1px solid #FF8040;
  background: rgba(255, 235, 210, 0.20);

  svg { margin-right: 0.62rem; }
  div.title {
    width: 17.6875rem;
    margin-top: 1.31rem;
    margin-bottom: 0.63rem;
    display: flex;
    align-items: center;
    color: #E75900;
    font-size: 0.9375rem;
    font-weight: 500;
  }
  strong { color: #E75900; font-size: 0.9375rem; font-weight: 700; }

  div.content {
    width: 17.6875rem;
    min-height: 6.8125rem;
    padding: 0.94rem 1.25rem;
    border-radius: 0.3125rem;
    background: #FFF;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25) inset;
    text-align: left;
    color: #000;
    font-size: 1.25rem;
    font-weight: 600;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

const Week = styled.div`
  width: 21.19rem;
  height: 6.13006rem;
  display: flex;
  gap: 0.54rem;
  padding: 0 0.65rem;
  padding-top: 0.9rem;
  margin-bottom: 1rem;
  border-radius: 0.59513rem;
  border: 0.952px solid #CFCFCF;
  background: #FFF;
  box-shadow: 0 0 2.381px 0 #D1D5DB;
  color: #5D5D5D;
  font-size: 0.95225rem;
  font-weight: 600;

  div { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }

  div.circle {
    width: 2.38063rem;
    height: 2.38063rem;
    border-radius: 50%;
    background: rgba(217, 217, 217, 0.30);
    display: flex; justify-content: center; align-items: center;
    color: #D2D2D2;
    font-size: 1.19031rem;
  }

  img { width: 2.38063rem; height: 2.38063rem; }
`;

const Feeling = styled.div`
  width: 21.19rem;
  height: 10.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.19rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.88rem; 
  border-radius: 0.625rem;
  background: rgba(217, 217, 217, 0.30);
  color: #6B7280;
  font-size: 1rem;
  font-weight: 600;

  img { width: 1.09375rem; height: 1.09375rem; }
  div { display: flex; align-items: center; gap: 0.31rem; }
`;
