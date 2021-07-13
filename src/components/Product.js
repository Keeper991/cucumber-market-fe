import React from "react";
import styled from "styled-components";

import Image from "../elements/Image";
import Text from "../elements/Text";
import HeartBtn from "./HeartBtn";

import { useDispatch } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

const Product = (props) => {
  const dispatch = useDispatch();

  return (

    <Wrapper onClick={props.onClick}>

      <Container>
        <div>
          <Image shape="square" src={props.src}></Image>
        </div>
        <TextBox>
          <Text size="15px" margin="8px">{props.productName}</Text>
          <Text color="gray" size="13px" margin="8px">{props.insertedAt}</Text>
          <Text size="15px" bold margin="8px">{props.productPrice}</Text>
        </TextBox>
        <HeartBox>
          <HeartBtn
            _onClick={(e) => {
              dispatch(productActions.getLikeToggleAPI());
            }}
            is_like={props.is_like}
          ></HeartBtn>
        </HeartBox>
      </Container>

    </Wrapper>
  );
}

const Wrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: "20px";
      margin: "20px";
      width: 100vw;
`;

const Container = styled.div`
      display: flex;
      justify-content: space-between;
      width: 500px;
      padding: 20px 15px;
      border-bottom: 1px solid #E5E5E5;
      margin: 0px 20px;
      &:last-child{
        margin-bottom: 0px;
      }
`;

const TextBox = styled.div`
      width: 70%;
`;

const HeartBox = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
`;

export default Product;

