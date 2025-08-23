import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../api';

const REVIEWS_URL = '/api/deliveryreview/logs/';

const NoIssue = () => {
    const { orderId } = useParams();
    const postedRef = useRef(false);

    useEffect(() => {
      if (!orderId) {
        console.warn('orderId가 없습니다.');
        return;
      }
      if (postedRef.current) return;
      postedRef.current = true;

      (async () => {
        try {
          await api.post(REVIEWS_URL, {
            initial_label: 'GOOD',
            source: 'BUTTON',
            order: Number(orderId),
            option: 1,
            option_label: '',
            text: '',
          });
        } catch (e) {
          console.error('GOOD 리뷰 저장 실패:', e);
        }
      })();
    }, [orderId]);


    return(
        <>
            <Wrapper>
                <h1>맛있게 드시고<br />
                몸도 마음도<br />
                <span>든든</span>해지세요!</h1>
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

  span{
    color: #E75900;
  }

  img{
    margin-top: 3rem;
  }
`;