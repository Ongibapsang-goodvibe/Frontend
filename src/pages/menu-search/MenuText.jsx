import { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MenuText = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [showResult, setShowResult] = useState(false); // 검색결과 표시 여부 상태 추가

  /**
   * 사용자가 입력한 `text`로 백엔드 검색 API를 호출한 뒤,
   * - 결과가 1개 이상이면: 검색 결과 페이지(/search-result)로 라우팅
   * - 결과가 없거나(0개), 오류/비정상 응답이면: "검색결과가 없어요" 안내 노출(showResult=true)
   *
   * 로딩/에러 전용 UI는 사용하지 않음.
   */
  const handleSearch = async () => {
    // 1) 입력값이 비어 있거나 공백뿐이면 API 호출하지 않음 (불필요한 트래픽 방지)
    if (!text.trim()) return;

    // 2) 새로운 검색을 시작하므로, 이전에 표시됐을 수 있는 "결과 없음" 안내를 우선 숨김
    setShowResult(false);

    try {
      // (선택) 3) 인증이 필요한 API라면, 로그인 시 저장한 토큰을 꺼내서 Authorization 헤더에 넣는다.
      // 토큰이 필요 없다면 아래 두 줄을 제거해도 됨.
      const token = localStorage.getItem("accessToken");
      // 4) 검색 API 호출 (POST /api/restaurants/search)
      // - headers: JSON 전송을 위해 Content-Type 지정
      // - Authorization: 토큰이 있을 때만 동적으로 추가
      // - body: API 스펙대로 { text, limit } 전송
      const res = await fetch("/api/restaurants/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text, limit: 10 }),
      });

      // 5) 응답 코드 검사
      // - 2xx가 아니면(res.ok === false) 실패로 간주하고 "결과 없음" 처리
      // - (선택) 백엔드가 204 No Content를 줄 수 있다면, JSON 파싱 전에 별도 처리하는 게 안전
      //   if (res.status === 204) { setShowResult(true); return; }
      if (!res.ok) {
        setShowResult(true);
        return;
      }

      // 6) 응답 본문(JSON) 파싱
      //    백엔드 응답 예시:
      //    {
      //      "stage": "menu",
      //      "cards": [ {menu_id, menu_name, ...}, ... ]
      //    }
      const data = await res.json();

      // 7) 결과 배열 안전 추출
      //    - 정상 케이스: data.cards 가 배열
      //    - 혹시 cards가 없거나 null이면 빈 배열로 처리
      const list = Array.isArray(data?.cards) ? data.cards : [];

      // 8) 결과 분기
      if (list.length > 0) {
        // 8-1) 결과가 1개 이상이면 검색 결과 페이지로 이동
        // - state로 결과/검색어/단계를 함께 전달(브라우저 새고고침 시 state는 사라질 수 있음)
        // - 결과 페이지에서 useLocation().state로 접근 가능
        navigate("/menu/search/result", {
          state: { results: list, q: text, stage: data.stage || "menu" },
        });
      } else {
        // 8-2) 결과가 0개면 "검색결과가 없어요" 안내 노출
        setShowResult(true);
      }
    } catch (err) {
      // 9) 네트워크 오류, JSON 파싱 오류 등 예외 상황
      //    요구사항상 에러 UI는 따로 쓰지 않으므로 "결과 없음"으로 통일
      console.error(err);
      setShowResult(true);
    }
  };

  return(
    <Wrapper>
      <h1>
          찾는 음식 (또는 식당)
          <br /> 이름이 뭐예요?
      </h1>

      <div>
        {showResult && <h2><span>검색결과가 없어요.</span><br />
        다시 한번 더 입력해주세요.</h2>}
      </div>

      <h3>예) "야채죽", "맛나식당", "두부"</h3>

      <Input
        type="text"
        value={text}
        placeholder="여기를 눌러 검색을 시작하세요."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <SearchButton
        type="button"
        onClick={handleSearch}
      >
        검색
      </SearchButton>

      <BackButton
        type="button"
        onClick={() => navigate('/home')}
      >
        돌아가기
      </BackButton>
    </Wrapper>
  );
};

export default MenuText;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background-color);

  h1{
    margin-top: 3.37rem;
    color: #FFF;
    font-size: 2.5rem;
    font-weight: 700;
  }

  div{
    height: 4.75rem;
  }

  h2{
    margin-top: 1.75rem;
    color: var(--main-color);
    font-size: 1.5rem;
    font-weight: 600;

    span{
      font-weight: 400;
    }
  }

  h3{
    margin-top: 2.06rem;
    color: #FFF;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const Input = styled.input`
  height: 3.875rem;
  width: 20rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1.44rem 0;
  padding: 0.25rem 0.8125rem;

  border-radius: 0.75rem;
  border: none;
  outline: none;
  background: #FFF;

  font-weight: 500;
  font-size: 1.5rem;
  

  &:focus::placeholder {
    color: transparent; /* 포커스될 때 placeholder 색을 투명으로 */
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;

const SearchButton = styled.button`
  height: 3.875rem;
  width: 20rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.75rem;
  border: none;
  background: var(--main-color);

  color: #000;
  font-size: 2rem;
  font-weight: 700;

  cursor: pointer;
`;

const BackButton = styled.button`
  margin-top: 9.44rem;

  width: 20.5rem;
  height: 4.375rem;

  border-radius: 0.5rem;
  border: none;
  background: var(--button-color);

  color: #fff;
  font-size: 2rem;
  font-weight: 700;

  cursor: pointer;
`;