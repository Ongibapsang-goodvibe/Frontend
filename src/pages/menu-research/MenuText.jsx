import { useState } from "react";
import styled from 'styled-components';

const MenuText = () => {
    const [text, setText] = useState("");

    const handleSearch = () => {
        if (text.trim()) {
            console.log('${text}');
        // 여기서 API 호출이나 페이지 이동 처리
        }
    };

    return(
        <Wrapper>
            <h1>
                찾는 음식 (또는 식당)
                <br /> 이름이 뭐예요?
            </h1>

            <h2>예) "야채죽", "맛나식당", "두부"</h2>

            <Input
                type="text"
                value={text}
                placeholder="여기를 눌러 검색을 시작하세요."
                onChange={(e) => setText(e.target.value)}
            />
            <Button
                onClick={handleSearch}
            >
                검색
            </Button>
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

  h2{
    margin-top: 8.56rem;
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
  outline: none;
  background: #FFF;
  font-size: 1.5rem;
  font-weight: 500;

  &:focus::placeholder {
    color: transparent; /* 포커스될 때 placeholder 색을 투명으로 */
  }

  &::placeholder {
    font-size: 1.5rem;
    color: rgba(0, 0, 0, 0.25);
  }

  &:focus {
    font-size: 2rem;
    border-color: #000;
  }
`;

const Button = styled.button`
  height: 3.875rem;
  width: 20rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.75rem;
  outline: none;
  background: var(--main-color);

  color: #000;
  font-size: 2rem;
  font-weight: 700;
`;