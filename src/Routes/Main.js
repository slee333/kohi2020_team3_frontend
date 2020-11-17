import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

// Wrapper: Place everything at center
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;
const Button = styled.button`

`


const MainPage = () => (
    <Wrapper>
        <Helmet>
            <title>Web Calculator | Some Score</title>
        </Helmet>
        <Button></Button>
        <>Hello Main Page!</>
    </Wrapper>
)

export default MainPage