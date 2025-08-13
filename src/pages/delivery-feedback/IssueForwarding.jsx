import React from 'react';
import styled from 'styled-components';

const IssueForwarding = () => {

    return(
        <>
            <Wrapper>
                <h1>문제를<br></br>
                전달했어요.</h1>
                <img src="IssueImage.png" alt="슬퍼하는 너구리" />
            </Wrapper>
        </>
    );
};

export default IssueForwarding;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 6.25rem;
    margin-bottom: 6.94rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }
`;