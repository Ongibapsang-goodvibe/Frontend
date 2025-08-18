import React, { useMemo } from "react";
import styled from "styled-components";

const LogoBar = () => {

  return (
    <Wrapper>
        <img src="/LogoBar.svg" alt="온기밥상"/>
    </Wrapper>
  );
};

export default LogoBar;

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.375rem;
  width: 100%;
  background: var(--background-color);
`;