import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TalkingEnd = () => {
    const navigate = useNavigate();

    return(
        <>
            <Wrapper>
                <h1>즐거운 대화였어요!<br />
                다음에 또 만나요.</h1>

                <img src="/images/ByeBarbi.png" alt="인사하는 너구리" />

                <Button
                    type="button"
                    className="eating-mate"
                    onClick={()=>navigate("/eating-mate")}
                >
                    다시 대화하기
                </Button>

                <Button
                    type="button"
                    className="home"
                    onClick={()=>navigate("/home")}
                >
                    이 화면 닫기
                </Button>

            </Wrapper>
        </>
    );
};

export default TalkingEnd;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(171deg, #FFF07C -19.79%, #A4D8FC 101.09%);

  h1{
    margin-top: 3.12rem;
    color: var(--background-color);
    font-size: 2.5rem;
    font-weight: 700;
  }

  img{
    margin-top: 1.88rem;
    margin-bottom: 2.75rem;
  }
`;

const Button = styled.button`
  width: 20rem;
  height: 4.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-radius: 0.75rem;

  font-size: 2rem;
  font-weight: 700;

  &.eating-mate{
    background: #424242;
    color: #FFF;
    
    margin-bottom: 1.5rem;
  }

  &.home{
    background: #FFF;
    color: var(--background-color);
  }
`;