import React from 'react';
import styled from 'styled-components';

const HealthForwarding = () => {

    return(
        <>
            <Wrapper>
                <h1><span>모든</span> 답변이 끝났어요</h1>
                <h2>답변이 보고서에 반영되었어요.</h2>
                <p>*보호자 계정과 연결되어 있는 경우 <br />
                보호자용 보고서에도 반영</p>
                <img src="/LovelyImage.png" alt="하트뿅뿅 너구리" />
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