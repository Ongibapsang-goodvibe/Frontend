import { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// VITE_API_BASE 기반으로 API URL 강제
const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/+$/, "");
const LOGIN_URL = `${API_BASE}/api/accounts/login/`;

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    // errorPhase: 에러 종류를 구분하는 state
    const [errorPhase, setErrorPhase] = useState("");


    const handleSubmit = async (e) => {
      e.preventDefault(); // 엔터/버튼 제출 시 새로고침 방지

      // 1) 프론트 유효성 검사
      if (!name.trim()) {
        setErrorPhase("nameEmpty");
        return;
      }
      if (password.length !== 6 || !/^\d+$/.test(password)) {
        setErrorPhase("pwInvalid");
        return;
      }

      setErrorPhase(""); // 에러 초기화

      try {
        // 2) 백엔드 요청 (axios)
        const res = await axios.post(LOGIN_URL, { name, password });

        const data = res.data;
        
        // 3) 토큰 저장
        // 로그인 성공 핸들러
        if (data?.token) {
          localStorage.setItem("token", data.token);   // 무조건 갱신
          // (JWT라면 refresh_token도 함께 저장)
        }
        // 4) 유저 정보 저장
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // 5) 이동
        navigate("/landing-page/white");
      } catch (err) {
        // axios는 400/500도 catch로 들어옴
        if (err.response) {
          const { status, data } = err.response;

          if (status === 400) {
            if (Array.isArray(data?.non_field_errors)) {
              setErrorPhase("loginFail");
            } else if (data?.name?.length) {
              setErrorPhase("nameEmpty");
            } else if (data?.password?.length) {
              setErrorPhase("pwInvalid");
            } else {
              setErrorPhase("loginFail");
            }
          } else {
            setErrorPhase("serverError");
          }
        } else {
          // 네트워크 에러 같은 경우
          console.error(err);
          setErrorPhase("serverError");
        }
      }
    };

const errorMessage = (() => {
    switch (errorPhase) {
        case "nameEmpty":
            return (<h3>이름을 입력해주세요.</h3>);

        case "pwInvalid":
            return (<h3>비밀번호는 숫자 6자리여야 합니다.</h3>);

        case "loginFail":
            return (<h3>비밀번호가 올바르지 않습니다.<br />다시 확인해주세요.</h3>);

        case "serverError":
            return (<h3>서버와 연결할 수 없습니다.</h3>);

        default:
            return null;
    }
})();
  
return(
    <Wrapper>
      <h1>
          로그인
      </h1>

      {/* ✅ 엔터 제출 지원 */}
      <form onSubmit={handleSubmit}>
        <h2>이름</h2>
        <Input
            type="text"
            placeholder="눌러서 이름 입력 (예: 홍길동)"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <h2>비밀번호 (6자리 숫자)</h2>
        <Input
            type="password"
            placeholder="눌러서 숫자 6자리 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={6}
            inputMode="numeric"
            pattern="\d*"
        />

        <SubmitButton
            type="submit"
        >
            입력완료
        </SubmitButton>
      </form>

      {errorMessage}
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background-color);

  h1{
    margin-top: 2.88rem;
    margin-bottom: 4.37rem;

    color: #FFF;
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2{
    width: 21.5625rem;

    margin-top: 1.63rem;
    margin-bottom: 0.75rem;
    
    text-align: left;
    color: #FFF;
    font-size: 1.5rem;
    font-weight: 700;
  }

  h3{
    padding: 0;

    text-align: center;
    color: var(--main-color);
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

const Input = styled.input`
  height: 3.87rem;
  width: 21.5625rem;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.06rem;

  border-radius: 0.75rem;
  border: none;
  outline: none;
  background: #FFF;

  text-align: left;
  font-weight: 500;
  font-size: 1.375rem;
  

  &:focus::placeholder {
    color: transparent; /* 포커스될 때 placeholder 색을 투명으로 */
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;

const SubmitButton = styled.button`
  width: 21.5625rem;
  height: 4.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2.94rem;
  margin-bottom: 2.88rem;

  border-radius: 0.75rem;
  border: none;
  background: var(--main-color);

  color: #000;
  font-size: 2rem;
  font-weight: 700;

  cursor: pointer;
`;
