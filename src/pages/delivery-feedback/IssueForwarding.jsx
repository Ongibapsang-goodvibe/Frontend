import React from 'react';
import styled from 'styled-components';

const IssueForwarding = () => {

    return(
        <>
            <Wrapper>
                <h1>문제를 전달했어요. <br />
                불편을 드려 <br />
                죄송합니다.</h1>
                <img src="/images/SadImage.png" alt="슬퍼하는 너구리" />
            </Wrapper>
        </>
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

  h1{
    margin-top: 3.38rem;
    color: var(--background-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  img{
    margin-top: 3rem;
  }
`;