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
      <div>
        <Image shape="square" src={props.src}></Image>
      </div>
      <Box>
        <Text
          size="15px"
          margin="8px"
        >{props.productName}</Text>
        <Text
          size="15px"
          bold
          margin="8px"
        >{props.productPrice}</Text>
      </Box>
      <HeartBtn
        _onClick={(e) => {
          dispatch(productActions.getLikeToggleAPI());
        }}
        is_like={props.is_like}
      ></HeartBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: "20px";
`;

const Box = styled.div`
  
`;


export default Product;

