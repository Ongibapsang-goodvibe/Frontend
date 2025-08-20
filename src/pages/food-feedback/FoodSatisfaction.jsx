import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FoodSatisfaction = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null); // 'yes' | 'no'

    const options = [
    { id: 1, label: '좋아하는 음식이에요' },
    { id: 2, label: '간이 딱 맞아요' },
    { id: 3, label: '속이 편해요' },
    ];

    const handleDone = () => {
        const selectedOption = options.find(opt => opt.id === selected);

        if (selected === 4) {
        // 4번(말로 할게요) 선택 시 음성 인식 페이지로 이동
        navigate('/voice-recognition');
        return;
        }
        
        if (selectedOption) {
            console.log(selectedOption.label);
            // 여기에 서버 전송 / API 호출 로직
        }
        navigate('/food-forwarding');
    };

    return(
        <>
            <Wrapper>
                <h1>어떤 점이 좋았나요?</h1>

                <Button 
                    type="button"
                    className={selected === 1 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(1)}
                >
                    <span>좋아하는 음식이에요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 2 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(2)}
                >
                    <span>간이 딱 맞아요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 3 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(3)}
                >
                    <span>속이 편해요</span>
                </Button>

                <Button
                    type="button"
                    className={selected === 4 ? 'normal active' : 'normal'}
                    onClick={() => setSelected(4)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="36" viewBox="0 0 22 36" fill="none">
                        <path d="M4.40002 7.00032C4.40002 5.24991 5.09538 3.57119 6.33312 2.33346C7.57086 1.09574 9.2496 0.400391 11 0.400391C12.7505 0.400391 14.4292 1.09574 15.6669 2.33346C16.9047 3.57119 17.6 5.24991 17.6 7.00032V18.0002C17.6 19.7506 16.9047 21.4293 15.6669 22.6671C14.4292 23.9048 12.7505 24.6001 11 24.6001C9.2496 24.6001 7.57086 23.9048 6.33312 22.6671C5.09538 21.4293 4.40002 19.7506 4.40002 18.0002V7.00032Z" fill="white"/>
                        <path d="M1.1 14.7002C1.39174 14.7002 1.67153 14.8161 1.87782 15.0224C2.08411 15.2287 2.2 15.5084 2.2 15.8002V18.0002C2.2 20.334 3.12714 22.5723 4.77746 24.2226C6.42778 25.8729 8.66609 26.8001 11 26.8001C13.3339 26.8001 15.5722 25.8729 17.2225 24.2226C18.8729 22.5723 19.8 20.334 19.8 18.0002V15.8002C19.8 15.5084 19.9159 15.2287 20.1222 15.0224C20.3285 14.8161 20.6083 14.7002 20.9 14.7002C21.1917 14.7002 21.4715 14.8161 21.6778 15.0224C21.8841 15.2287 22 15.5084 22 15.8002V18.0002C22 20.7271 20.9872 23.3568 19.1579 25.3792C17.3286 27.4015 14.8133 28.6723 12.1 28.945V33.4H18.7C18.9917 33.4 19.2715 33.5159 19.4778 33.7222C19.6841 33.9285 19.8 34.2082 19.8 34.5C19.8 34.7917 19.6841 35.0715 19.4778 35.2778C19.2715 35.4841 18.9917 35.6 18.7 35.6H3.3C3.00826 35.6 2.72847 35.4841 2.52218 35.2778C2.31589 35.0715 2.2 34.7917 2.2 34.5C2.2 34.2082 2.31589 33.9285 2.52218 33.7222C2.72847 33.5159 3.00826 33.4 3.3 33.4H9.9V28.945C7.18671 28.6723 4.67143 27.4015 2.84214 25.3792C1.01285 23.3568 -3.42577e-05 20.7271 8.69014e-10 18.0002V15.8002C8.69014e-10 15.5084 0.115893 15.2287 0.322183 15.0224C0.528473 14.8161 0.808262 14.7002 1.1 14.7002Z" fill="white"/>
                    </svg>
                    <span>말로 할게요</span>
                </Button>

                <div className="done-container">
                    <Button
                        type="button"
                        className="back"
                        onClick={() => navigate('/food-check')}
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

export default FoodSatisfaction;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    margin-top: 3.38rem;
    margin-bottom: 6rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .done-container{
    margin-top: 1.62rem;
    display: flex;
    justify-content: center;
    gap: 1.56rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
  cursor: pointer;

  svg { flex-shrink: 0; }

  &.normal{
    border-radius: 0.5rem;
    border: 1px solid #FFF;
    height: 5.5rem;
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