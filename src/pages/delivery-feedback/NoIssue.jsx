import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';

const REVIEWS_URL = '/api/deliveryreview/logs/';

const NoIssue = () => {
  const { orderId } = useParams();
  const { state } = useLocation() || {};
  const navigate = useNavigate();

  const postedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const derivedOrderId = Number(orderId);

    // orderId 유효성 체크
    if (!Number.isInteger(derivedOrderId)) {
      navigate('/', { replace: true });
      return;
    }
    // 중복 POST 방지
    if (postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const base = {
          initial_label: state?.initial_label ?? 'GOOD', // NoIssue면 보통 GOOD
          source: state?.source ?? 'BUTTON',
          order: derivedOrderId,
        };

        if (base.source === 'VOICE') {
          await api.post(REVIEWS_URL, {
            ...base,
            text: (state?.text ?? '').trim(),
          });
        } else if (Number.isInteger(Number(state?.option))) {
          // 버튼 선택이 존재하는 경우에만 옵션 전송
          const optId = Number(state.option);
          await api.post(REVIEWS_URL, {
            ...base,
            option: optId,
            option_label: state?.option_label ?? '',
            text: '',
          });
        } else {
          // 옵션이 없는 "무이슈" 케이스: 기본 정보만 전송
          await api.post(REVIEWS_URL, {
            ...base,
            text: '',
          });
        }
      } catch (e) {
        console.error('이슈 리뷰 저장 실패:', e?.response?.data || e);
      } finally {
        // 저장 시도 끝난 뒤 5초 후 홈으로
        timerRef.current = setTimeout(() => {
          navigate('/home', { state: { from: 'food' }, replace: true });
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
        <h1>
          맛있게 드시고<br />
          몸도 마음도<br />
          <span>든든</span>해지세요!
        </h1>
        <img src="/images/EatingImage.png" alt="기뻐하는 너구리" />
      </Wrapper>
    </>
  );
};

export default NoIssue;

const Wrapper = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #FFEECF 0%, #FFDDB2 100%);

  h1{
    margin-top: 3.38rem;
    margin-bottom: 1.31rem;
    color: var(--background-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  span{ color: #E75900; }

  img{ margin-top: 3rem; }
`;
