import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NoIssue = () => {
    const navigate = useNavigate();

    return(
        <>
            <Wrapper>
                <h1>맛있게 드시고<br />
                몸도 마음도<br />
                <span>든든</span>해지세요!</h1>
                <img src="EatingImage.svg" alt="기뻐하는 너구리" />
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