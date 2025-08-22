import React from 'react';
import styled from 'styled-components';

const HealthReport = () => {
    const name = "김영철";
    const date = "8월 4일 - 8월 10일";
    const healthCount = 0;
    const feelingDay = "기분 좋은 날";
    const day = "목요일";
    const content = "몸이 축축 처지네";
    const week = [4,5,6,7,8,9,10];
    const emojiMap = {
        "최고예요!": "/icons/BlueEmoji.svg",
        "괜찮아요": "/icons/GreenEmoji.svg",
        "그냥 그래요": "/icons/YellowEmoji.svg",
        "안 좋아요": "/icons/OrangeEmoji.svg",
        "나빠요": "/icons/RedEmoji.svg",
    };

    return (
        <>
            <Wrapper>
                <Top>
                    <Date>{date}</Date>
                    <Title>
                        {name}님의 건강 보고서
                        <img src="/icons/HealthReport.svg"/>
                    </Title>
                </Top>

                <Card className="health">
                    <div>
                        건강 이상징후가<br />
                        <strong>{healthCount}건 감지됐어요.</strong>
                    </div>
                </Card>

                <Health>
                    <div className="title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M8.57502 3.21635L1.51668 14.9997C1.37116 15.2517 1.29416 15.5374 1.29334 15.8284C1.29253 16.1195 1.36793 16.4056 1.51204 16.6585C1.65615 16.9113 1.86396 17.122 2.11477 17.2696C2.36559 17.4171 2.65068 17.4965 2.94168 17.4997H17.0583C17.3494 17.4965 17.6344 17.4171 17.8853 17.2696C18.1361 17.122 18.3439 16.9113 18.488 16.6585C18.6321 16.4056 18.7075 16.1195 18.7067 15.8284C18.7059 15.5374 18.6289 15.2517 18.4834 14.9997L11.425 3.21635C11.2765 2.97144 11.0673 2.76895 10.8177 2.62842C10.5681 2.48789 10.2865 2.41406 10 2.41406C9.71357 2.41406 9.43196 2.48789 9.18235 2.62842C8.93275 2.76895 8.72358 2.97144 8.57502 3.21635Z" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 7.5V10.8333" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 14.167H10.0083" stroke="#E75900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <strong>{day}</strong>에 이렇게 대답한 내역이 있어요.
                    </div>
                    <div className="content" >
                        {content}
                    </div>
                </Health>

                <Card className="feeling">
                    <div>
                        이번 주는 <strong>{feelingDay}</strong>이<br />
                        더 많았네요.
                    </div>
                </Card>

                <Week>
                    <div>
                        월
                        {true ? 
                        <img src={emojiMap["최고예요!"]}/>
                        : <div className="circle">{week[0]}</div>}
                    </div>
                    <div>
                        화
                        {false ? 
                        <img src={emojiMap["최고예요!"]}/>
                        : <div className="circle">{week[1]}</div>}
                    </div>
                    <div>
                        수
                        {true ? 
                        <img src={emojiMap["괜찮아요"]}/>
                        : <div className="circle">{week[2]}</div>}
                    </div>
                    <div>
                        목
                        {true ? 
                        <img src={emojiMap["그냥 그래요"]}/>
                        : <div className="circle">{week[3]}</div>}
                    </div>
                    <div>
                        금
                        {false ? 
                        <img src={emojiMap["최고예요!"]}/>
                        : <div className="circle">{week[4]}</div>}
                    </div>
                    <div>
                        토
                        {true ? 
                        <img src={emojiMap["나빠요"]}/>
                        : <div className="circle">{week[5]}</div>}
                    </div>
                    <div>
                        일
                        {false ? 
                        <img src={emojiMap["최고예요!"]}/>
                        : <div className="circle">{week[6]}</div>}
                    </div>
                </Week>

                <Feeling>
                    <div>
                        <img src="/icons/BlueEmoji.svg"/>
                        : 최고예요!
                    </div>
                    <div>
                        <img src="/icons/GreenEmoji.svg"/>
                        : 괜찮아요
                    </div>
                    <div>
                        <img src="/icons/YellowEmoji.svg"/>
                        : 그냥 그래요
                    </div>
                    <div>
                        <img src="/icons/OrangeEmoji.svg"/>
                        : 안 좋아요
                    </div>
                    <div>
                        <img src="/icons/RedEmoji.svg"/>
                        : 나빠요
                    </div>

                </Feeling>
            </Wrapper>
        </>
    );
}

export default HealthReport;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #fff;
`;

const Top = styled.div`
  height: 11.0625rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 0.94rem;
  padding-top: 2rem;

  background: #4BA3E0;
`;

const Date = styled.div`
  width: 11rem;
  height: 1.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.38rem;

  border-radius: 6.25rem;
  background: #FFF;

  color: #55565A;
  font-size: 1rem;
  font-weight: 600;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-top: 0.5rem;
  margin-left: 0.38rem;
  gap: 0.63rem;
  
  color: #FFF;
  font-size: 1.75rem;
  font-weight: 700;
`;

const Card = styled.div`
  width: 21.19rem;
  height: 6.88rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  margin-bottom: 1rem;
  padding: 0 1.19rem;

  border-radius: 0.625rem;
  border: 1px solid #D9D9D9;
  background: #FFFAEA;

  color: #424242;
  font-size: 1.5rem;
  font-weight: 600;
  strong{
    font-weight: 700;
  }

  div {
    flex: 1;
    text-align: left;
  }

  &.health{
    margin-top: -2.69rem;
  }
`;

const Health = styled.div`
  width: 21.19rem;
  height: 12.19rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 1rem;

  border-radius: 0.625rem;
  border: 1px solid #FF8040;
  background: rgba(255, 235, 210, 0.20);


  svg{
    margin-right: 0.62rem;
  }
  div.title{
    width: 17.6875rem;

    margin-top: 1.31rem;
    margin-bottom: 0.63rem;
    display: flex;
    align-items: center;

    color: #E75900;
    font-size: 0.9375rem;
    font-weight: 500;
  }
  strong{
    color: #E75900;
    font-size: 0.9375rem;
    font-weight: 700;
  }

  div.content{
    width: 17.6875rem;
    height: 6.8125rem;

    padding: 0.94rem 1.25rem;
    border-radius: 0.3125rem;
    background: #FFF;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25) inset;

    text-align: left;
    color: #000;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const Week = styled.div`
  width: 21.19rem;
  height: 6.13006rem;

  display: flex;
  gap: 0.54rem;

  padding: 0 0.65rem;
  padding-top: 0.9rem;
  margin-bottom: 1rem;

  border-radius: 0.59513rem;
  border: 0.952px solid #CFCFCF;
  background: #FFF;
  box-shadow: 0 0 2.381px 0 #D1D5DB;

  color: #5D5D5D;
  font-size: 0.95225rem;
  font-weight: 600;

  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  div.circle{
    width: 2.38063rem;
    height: 2.38063rem;
    border-radius: 50%;
    background: rgba(217, 217, 217, 0.30);

    display: flex;
    justify-content: center;
    align-items: center;

    color: #D2D2D2;
    font-size: 1.19031rem;
  }

  img{
    width: 2.38063rem;
    height: 2.38063rem;
  }
`;

const Feeling = styled.div`
  width: 21.19rem;
  height: 10.0625rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.19rem;

  margin-bottom: 1rem;
  padding: 0.5rem 0.88rem; 

  border-radius: 0.625rem;
  background: rgba(217, 217, 217, 0.30);

  color: #6B7280;
  font-size: 1rem;
  font-weight: 600;

  img{
    width: 1.09375rem;
    height: 1.09375rem;
  }

  div{
    display: flex;
    align-items: center;
    gap: 0.31rem;
  }
`;