import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const REVIEWS_URL = '/api/healthcare/logs/';

const LABELS = {
  1: 'GREAT',     // 최고예요!
  2: 'FINE',      // 괜찮아요
  3: 'SOSO',      // 그냥 그래요
  4: 'BAD',       // 안 좋아요
  5: 'TERRIBLE',  // 나빠요
};

const HealthForwarding = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const postedRef = useRef(false);
  const timerRef = useRef(null); // ← 타이머 ref 추가

  useEffect(() => {
    const derivedOrderId = Number(orderId);

    // orderId 유효성(숫자) 확인
    if (!Number.isInteger(derivedOrderId)) {
      navigate('/', { replace: true });
      return;
    }
    // 중복 POST 방지
    if (postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const optId = Number(state?.option);
        await api.post(REVIEWS_URL, {
          initial_label: state?.initial_label,      // 없으면 백엔드 기본값 사용
          order: derivedOrderId,
          text: state?.text ?? '',
          mood_label: LABELS[optId] ?? '',          // optId 없으면 빈 문자열
        });
      } catch (e) {
        console.error('건강 리뷰 저장 실패:', e?.response?.status, e?.response?.data ?? e);
      } finally {
        // 저장 성공/실패 관계없이 5초 후 홈으로 이동
        timerRef.current = setTimeout(() => {
          navigate('/home', { state: { from: 'health' }, replace: true });
        }, 3000);
      }
    })();

    // 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [orderId, state, navigate]);

  return (
    <>
      <Wrapper>
        <h1><span>모든</span> 답변이 끝났어요</h1>
        <h2>답변이 보고서에 반영되었어요.</h2>
        <p>*보호자 계정과 연결되어 있는 경우 <br />보호자용 보고서에도 반영</p>
        <img src="/images/LovelyImage.png" alt="하트뿅뿅 너구리" />
      </Wrapper>
    </>
  );
};

export default HealthForwarding;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #FFEECF 0%, #FFDDB2 100%);

  h1{
    margin-top: 3.37rem;
    color: var(--background-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  span{
    color: #E75900;
  }

  h2{
    margin-bottom: 0.37rem;
    color: var(--background-color);
    font-size: 1.5rem;
    font-weight: 500;
  }

  p{
    margin-top: 3.31rem;
    color: rgba(0, 0, 0, 0.35);
    font-size: 1.25rem;
    font-weight: 500;
  }

  img{
    margin-top: 1.19rem;
  }
`;