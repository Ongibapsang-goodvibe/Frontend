import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EatingChoice = () => {
    const navigate = useNavigate();

    return(
        <>
            <Wrapper>
                <h1>맛있게 드세요!</h1>
                <img src="EatingImage.png" alt="기뻐하는 너구리" />
                <div className="btn-container">
                    <Button
                        type="button"
                        className="eating-mate"
                        onClick={() => navigate('/')} //식사벗으로 이동
                    >
                        <span>바비와 대화하며 먹기</span>
                    </Button>

                    <Button
                        type="button"
                        className="home"
                        onClick={() => navigate('/')} //홈으로 이동
                    >
                        <span>조용히 먹을래요</span>
                    </Button>
                </div>
            </Wrapper>
        </>
    );
};

export default EatingChoice;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 5.88rem;
    margin-bottom: 1.31rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }

  img{
    margin-bottom: 1.19rem;
  }

  .btn-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.38rem;
  }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    gap: 1rem;
    cursor: pointer;

    border-radius: 0.75rem;
    height: 4.5rem;

    font-size: 2rem;
    font-weight: 700;
    color: #000;

    &.eating-mate {
        background: var(--main-color);
    }
    
    &.home {
        background: #fff;
    }
`;