import React from 'react';
import styled from 'styled-components';

const ReceiptCheck = () => {

    return(
        <>
            <Wrapper>
                <h1>Hello Styled Components</h1>
            </Wrapper>
        </>
    );
};

export default ReceiptCheck;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;