import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const TalkingEnd = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 한 번만 대화 종료 API 호출
  useEffect(() => {
    const endChat = async () => {
      try {
        await api.post('/api/chat/end-chat/'); // 바디 없이 POST, 토큰은 인터셉터로 자동 첨부
      } catch (e) {
        console.error('end_chat 실패:', e?.response?.data || e.message);
      }
    };
    endChat();
  }, []);

  return (
    <Wrapper>
      <h1>즐거운 대화였어요!<br />다음에 또 만나요.</h1>

      <img src="/images/ByeBarbi.png" alt="인사하는 너구리" />

      <Button
        type="button"
        className="eating-mate"
        onClick={() => navigate("/eating-mate")}
      >
        다시 대화하기
      </Button>

      <Button
        type="button"
        className="home"
        onClick={() => {
          try {
            // DOM에 붙은 <audio>가 있을 경우 폴백으로 정지
            Array.from(document.querySelectorAll('audio')).forEach(a => { a.pause(); a.src = ""; });
          } catch {}
          navigate("/home");
        }}
      >
        이 화면 닫기
      </Button>
    </Wrapper>
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