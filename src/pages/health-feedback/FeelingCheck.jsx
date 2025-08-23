import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const HealthCheck = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const { state } = useLocation();
    const [selected, setSelected] = useState(null); // 'yes' | 'no'

    const handleDone = () => {
        if (!orderId || !selected) return;   
        
        navigate(`/health-feedback/forwarding/${orderId}`, {
            state: {
                initial_label: state.initial_label,
                text: state.text,
                option: selected,
            },
        });
    };

    return(
        <>
            <Wrapper>
                <h1>기분은 어떠세요?</h1>

                <Button 
                    type="button"
                    className={selected === 1 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(1)}
                >
                  <img src="/icons/BlueEmoji.svg"/>
                  <span>최고예요!</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 2 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(2)}
                >
                  <img src="/icons/GreenEmoji.svg"/>
                  <span>괜찮아요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 3 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(3)}
                >
                  <img src="/icons/YellowEmoji.svg"/>
                  <span>그냥 그래요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 4 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(4)}
                >
                  <img src="/icons/OrangeEmoji.svg"/>
                  <span>안 좋아요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 5 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(5)}
                >
                  <img src="/icons/RedEmoji.svg"/>
                  <span>나빠요</span>
                </Button>

                <div className="done-container">
                    <Button
                        type="button"
                        className="back"
                        onClick={() => {
                            navigate(`/health-feedback/health-check/${orderId}`);
                        }}
                    >
                        <span>돌아가기</span>
                    </Button>

                    <Button
                        type="button"
                        className="done"
                        onClick={handleDone}
                        disabled={!selected}
                    >
                        <span>선택완료</span>
                    </Button>
                </div>
            </Wrapper>
        </>
    );
};

export default HealthCheck;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 3.38rem;
    margin-bottom: 5.44rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .done-container{
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 1.56rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  cursor: pointer;

  svg { flex-shrink: 0; }

  &.normal{
    border-radius: 0.5rem;
    border: 1px solid #FFF;
    height: 4.375rem;
    width: 20rem;
    margin-bottom: 1.25rem;

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
  &.back {
    border-radius: 0.75rem;
    height: 4.5rem;
    width: 9.4375rem;

    background: var(--button-color);
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
  }
  &.done {
    border-radius: 0.75rem;
    height: 4.5rem;
    width: 9.4375rem;

    background: var(--main-color);
    color: #000;
    font-size: 2rem;
    font-weight: 700;
  }
`;