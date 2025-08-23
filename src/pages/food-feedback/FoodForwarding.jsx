import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const REVIEWS_URL = '/api/mealreview/logs/';

const LABELS = {
    1 : '좋아하는 음식이에요',
    2 : '간이 딱 맞아요',
    3 : '속이 편해요',
    4 : '짜요',
    5 : '싱거워요',
    6 : '달아요',
    7 : '느끼해요',
};

const FoodForwarding = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const postedRef = useRef(false);

  useEffect(() => {
    // orderId 없으면 홈으로
    if (!orderId) {
      navigate('/', { replace: true });
      return;
    }
    // 중복 POST 방지
    if (postedRef.current) return;
    postedRef.current = true;

    (async () => {
      try {
        const base = {
          initial_label: state.initial_label,
          source: state.source,
          order: Number(orderId),
        };

        // VOICE: option/option_label 없이 text만 보냄
        if (base.source === 'VOICE') {
          await api.post(REVIEWS_URL, {
            ...base,
            text: (state?.text ?? '').trim(),
          });
        } else {
          // BUTTON: option 필수, option_label은 맵에서 라벨
          const optId = Number(state?.option);
          await api.post(REVIEWS_URL, {
            ...base,
            option: optId,
            option_label: LABELS[optId] ?? '',
            text: '',
          });
        }
      } catch (e) {
        console.error('이슈 리뷰 저장 실패:', e);
      }
    })();
  }, [orderId, state, navigate]);

    return(
        <>
            <Wrapper>
                <h1>남겨주신 답변을<br />
                <span>후기</span>로 남겼어요.</h1>
                <img src="/images/HappyImage.png" alt="행복한 너구리" />
                <Button
                    type="button"
                    className="health-check"
                    onClick={()=>{navigate('/health-feedback/health-check')}}
                >
                    <span>건강 기록하러 가기</span>
                </Button>
            </Wrapper>
        </>
    );
};

export default FoodForwarding;

const Wrapper = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #FFEECF 0%, #FFDDB2 100%);

  h1{
    margin-top: 5.88rem;
    color: var(--background-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  span{
    color: #E75900;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  margin-bottom: 0.5rem;

  cursor: pointer;

  span{
    color: #000;
  }

  &.health-check{
  border-radius: 0.75rem;
  border: 0;
  height: 4.5rem;

  background: var(--main-color);
  color: #000;
  font-size: 2rem;
  font-weight: 700;
  }
`;