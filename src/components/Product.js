import React from "react";
import styled from "styled-components";
import { Text, Image } from "../elements";
import HeartBtn from "./HeartBtn";
import timeForToday from "../shared/Time";
import Color from "../shared/Color";

const Product = (props) => {
  return (
    <Container onClick={props.onClick}>
      <Column>
        <div>
          <Image shape="square" src={props.images[0]}></Image>
        </div>
        <TextBox>
          <Text>{props.title}</Text>
          <Text color="gray" size="0.8em">
            {timeForToday(props.insertedAt)}
          </Text>
          <Text bold>{parseInt(props.price).toLocaleString("ko-KR")}원</Text>
        </TextBox>
      </Column>
      <HeartBox>
        <HeartBtn noEvent id={props._id} />
      </HeartBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${Color.gray};
  padding: 1em 0;
  @media only screen and (min-width: 800px) {
    padding: 1em;
  }
`;

const Column = styled.div`
  display: flex;
`;

const TextBox = styled.div`
  width: 70%;
  margin-left: 1em;
  & > * {
    margin-bottom: 0.5em;
  }
  & > *:last-child {
    margin-top: 1em;
  }
`;

const HeartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default Product;
