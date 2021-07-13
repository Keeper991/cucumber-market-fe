import React from "react";
import styled from "styled-components";
import { Text, Button } from "../elements";

const Header = (props) => {

  return (
    <>
      <Wrapper>
        <Container>
          <Text margin="0px" size="24px" bold>
            오이마켓
          </Text>
          <Button width="50px" bgColor="white" margin="0px" padding="0px">로그인</Button>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  padding: 15px 15px;
  border-bottom: 1px solid #E5E5E5;
`;

export default Header;