import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FoodForwarding = () => {
  const navigate = useNavigate();

    return(
        <>
            <Wrapper>
                <h1>남겨주신 답변을<br />
                <span>후기</span>로 남겼어요.</h1>
                <img src="HappyImage.png" alt="행복한 너구리" />
                <Button
                    type="button"
                    className="health-check"
                    onClick={()=>{navigate('/health-check')}}
                >
                    <span>건강 확인하러 가기</span>
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