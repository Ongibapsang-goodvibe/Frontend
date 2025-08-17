import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DeliveryCheck = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null); // 'yes' | 'no'

    const handleDone = () => {
        if (selected === 'yes') navigate('/no-issue');
        if (selected === 'no') navigate('/delivery-complaint');
    };

    return(
        <>
            <Wrapper>
                <h1>배달 잘 받으셨나요?</h1>
                <Button 
                    type="button"
                    className={selected === 'yes' ? 'normal active' : 'normal'}
                    onClick={() => setSelected('yes')}
                >
                    <span>네</span>
                    <img src="blue.svg"/>
                </Button>
                <Button
                    type="button"
                    className={selected === 'no' ? 'normal active' : 'normal'}
                    onClick={() => setSelected('no')}
                >
                    <span>문제가 있어요</span>
                    <img src="red.svg"/>
                </Button>
                <Button
                    type="button"
                    className="done"
                    onClick={handleDone}
                    disabled={!selected}
                >
                    <span>선택완료</span>
                </Button>
            </Wrapper>
        </>
    );
};

export default DeliveryCheck;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 3.38rem;
    margin-bottom: 7.88rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  gap: 1rem;
  cursor: pointer;

  svg { flex-shrink: 0; }

  &.normal{
    border-radius: 0.5rem;
    border: 1px solid #FFF;
    height: 9.375rem;
    margin-bottom: 2.75rem;

    background: linear-gradient(128deg, rgba(255, 255, 255, 0.20) 0.02%, rgba(115, 115, 115, 0.00) 91.11%);
    color: #FFF;
    font-size: 2.25rem;
    font-weight: 600;
  }

  &.normal.active {
    background: #fff;
    color: #000;

    svg path {
      fill: #000; /* active일 때 변경 */
    }
  }

  &.done{
    border-radius: 0.75rem;
    height: 4.5rem;
    margin-top: 3.44rem;

    background: var(--main-color);
    color: #000;
    font-size: 2rem;
    font-weight: 700;
  }
`;