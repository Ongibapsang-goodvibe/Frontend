import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const REVIEWS_URL = '/api/deliveryreview/logs/';
const LABELS = { 2: '너무 늦게 왔어요', 3: '음식이 샜어요', 4: '음식이 다 안 왔어요' };

const IssueForwarding = () => {
  const { orderId } = useParams();
  const { state } = useLocation(); // { initial_label, source, option?, text? }
  const navigate = useNavigate();
  const postedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const derivedOrderId = Number(orderId);

    // orderId 유효성 체크 (NaN/실수 차단)
    if (!Number.isInteger(derivedOrderId)) {
      navigate('/', { replace: true });
      return;
    }
    if (postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const base = {
          initial_label: 'BAD',                 // 불만 전달 플로우라면 BAD 고정 OK
          source: state?.source ?? 'BUTTON',
          order: derivedOrderId,
        };

        if (base.source === 'VOICE') {
          await api.post(REVIEWS_URL, {
            ...base,
            text: (state?.text ?? '').trim(),
          });
        } else {
          const optId = Number(state?.option);
          if (!Number.isInteger(optId)) {
            console.error('option 누락/비정상:', state?.option);
            // 서버가 option 필수라면 여기서 조기 종료 또는 안내
            return;
          }
          await api.post(REVIEWS_URL, {
            ...base,
            option: optId,
            option_label: LABELS[optId] ?? '',
            text: '',
          });
        }
      } catch (e) {
        console.error('이슈 리뷰 저장 실패:',
          e?.response?.status,
          e?.response?.data ?? e
        );
      } finally {
        // 저장 시도 끝난 뒤 5초 후 홈 이동
        timerRef.current = setTimeout(() => {
          navigate('/home', { state: { from: 'food' }, replace: true });
        }, 3000);
      }
    })();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [orderId, state, navigate]);

  return (
    <Wrapper>
      <h1>문제를 전달했어요. <br />
      불편을 드려 <br />죄송합니다.</h1>
      <img src="/images/SadImage.png" alt="슬퍼하는 너구리" />
    </Wrapper>
  );
};

export default IssueForwarding;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #CFCFFF 0%, #A4D8FC 100%);
  h1{ margin-top: 3.38rem; color: var(--background-color); font-size: 2.5rem; font-weight: 700; }
  img{ margin-top: 3rem; }
`;