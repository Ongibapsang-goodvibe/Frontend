import React from 'react';
import styled from 'styled-components';

const HealthForwarding = () => {

    return(
        <>
            <Wrapper>
                <h1>모든 답변이 끝났어요</h1>
                <h2>다음에 또 뵐게요!</h2>
                <img src="HealthImage.png" alt="하트뿅뿅 너구리" />
            </Wrapper>
        </>
    );
};

export default HealthForwarding;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 6.25rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2{
    margin-bottom: 2.88rem;
    color: #FFF;
    font-size: 2.5rem;
    font-weight: 500;
  }
`;